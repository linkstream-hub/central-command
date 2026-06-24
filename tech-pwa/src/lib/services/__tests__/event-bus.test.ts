import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { EventBus, type WorkOrderEvent } from '../event-bus';
import { db } from '@/lib/db';
import { workflowEvents } from '@/lib/schema';
import { eq } from 'drizzle-orm';

const originalFetch = global.fetch;

const mockEmailSend = vi.fn().mockResolvedValue({ id: 'mock-email-id' });
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(function() {
    return {
      emails: { send: mockEmailSend },
    };
  }),
}));

describe('EventBus.publish()', () => {
  const MOCK_WEBHOOK_URL = 'https://n8n.example.com/webhook/test';
  
  const testEvent: WorkOrderEvent = {
    type: 'WcCodeMissing',
    jobId: 'TEST-123',
    propertyAddress: '123 Test St',
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    process.env.N8N_EVENT_BUS_URL = MOCK_WEBHOOK_URL;
    // Fix fetch mock to passthrough neon db queries
    global.fetch = vi.fn().mockImplementation((...args: Parameters<typeof fetch>) => {
      const url = args[0]?.toString() || '';
      if (url.includes('n8n.example.com')) {
        return Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({}) } as Response);
      }
      return originalFetch(...args);
    });
    
    // Cleanup any leaked test events just in case
    await db.delete(workflowEvents).where(eq(workflowEvents.type, 'WcCodeMissing'));
  });

  afterEach(async () => {
    // Cleanup
    await db.delete(workflowEvents).where(eq(workflowEvents.type, 'WcCodeMissing'));
  });

  it('inserts row with status=delivered when webhook 200s', async () => {
    const result = await EventBus.publish(testEvent);

    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error('Expected ok');

    const eventId = result.value.eventId;
    expect(eventId).toBeDefined();

    // Verify row in DB
    const rows = await db.select().from(workflowEvents).where(eq(workflowEvents.id, eventId));
    expect(rows).toHaveLength(1);
    expect(rows[0].status).toBe('delivered');
    expect(rows[0].deliveredAt).not.toBeNull();
    expect(rows[0].type).toBe('WcCodeMissing');
    expect(JSON.parse(rows[0].payload)).toEqual(testEvent);

    expect(global.fetch).toHaveBeenCalledWith(
      MOCK_WEBHOOK_URL,
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    );
  });

  it('inserts row with status=pending (not error) when webhook fails — delivery eventual', async () => {
    vi.mocked(global.fetch).mockImplementation(async (...args: Parameters<typeof fetch>) => {
      const url = args[0]?.toString() || '';
      if (url.includes('n8n.example.com')) {
        throw new Error('Network error');
      }
      return originalFetch(...args);
    });

    const result = await EventBus.publish(testEvent);

    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error('Expected ok');

    const eventId = result.value.eventId;

    // Verify row in DB
    const rows = await db.select().from(workflowEvents).where(eq(workflowEvents.id, eventId));
    expect(rows).toHaveLength(1);
    expect(rows[0].status).toBe('pending');
    expect(rows[0].deliveredAt).toBeNull();
  });

  it('returns DB_WRITE_FAILED when DB insert throws', async () => {
    // Mock db.insert to throw
    const originalInsert = db.insert;
    db.insert = vi.fn().mockImplementation(() => {
      throw new Error('Fake DB Error');
    });

    try {
      const result = await EventBus.publish(testEvent);

      expect(result.ok).toBe(false);
      if (result.ok) throw new Error('Expected error');

      expect(result.error.code).toBe('DB_WRITE_FAILED');
      expect(result.error.error).toContain('Fake DB Error');

      // Verify Resend email was called
      expect(mockEmailSend).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'brandon@aptmaintenanceinc.com',
          subject: expect.stringContaining('DB_WRITE_FAILED: WcCodeMissing'),
        })
      );
    } finally {
      db.insert = originalInsert;
    }
  });

  it('inserts row with status=pending and returns eventId on immediate delivery success', async () => {
    // This is tested in 'status=delivered when webhook 200s' but let's test a case where
    // N8N_EVENT_BUS_URL is empty
    process.env.N8N_EVENT_BUS_URL = '';
    
    const result = await EventBus.publish(testEvent);

    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error('Expected ok');

    const eventId = result.value.eventId;

    // Verify row in DB
    const rows = await db.select().from(workflowEvents).where(eq(workflowEvents.id, eventId));
    expect(rows).toHaveLength(1);
    expect(rows[0].status).toBe('pending');
    
    // We can't use not.toHaveBeenCalled() because Neon DB driver uses fetch internally.
    // Instead we check it wasn't called with the webhook URL.
    const calls = vi.mocked(global.fetch).mock.calls;
    const webhookCalls = calls.filter((c) => c[0]?.toString().includes('n8n.example.com'));
    expect(webhookCalls).toHaveLength(0);
  });
});
