import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { POST } from '../route';
import { NextRequest } from 'next/server';
import { parseEmailToWO } from '@/lib/intake/parseEmailToWO';

// Mock dependencies
vi.mock('@/lib/db', () => ({
  db: {
    insert: vi.fn(() => ({
      values: vi.fn(() => ({
        onConflictDoUpdate: vi.fn(() => ({
          returning: vi.fn(() => Promise.resolve([{ jobId: 'EMAIL-123' }]))
        }))
      }))
    }))
  }
}));

vi.mock('@/lib/schema', () => ({
  jobs: {
    jobId: 'jobs.jobId'
  }
}));

vi.mock('@/lib/intake/parseEmailToWO', () => ({
  parseEmailToWO: vi.fn()
}));

describe('POST /api/intake/email', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv };
    process.env.EMAIL_INBOUND_TOKEN = 'test-secret-token';
    process.env.GOOGLE_GENERATIVE_AI_API_KEY = 'fake-key';
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  const createRequest = (body: any, token: string | null = 'test-secret-token') => {
    return new NextRequest('http://localhost:3000/api/intake/email', {
      method: 'POST',
      headers: token ? { 'x-email-token': token } : {},
      body: JSON.stringify(body)
    });
  };

  it('returns 500 if EMAIL_INBOUND_TOKEN is not configured on server', async () => {
    delete process.env.EMAIL_INBOUND_TOKEN;
    const req = createRequest({ messageId: '123' });
    const res = await POST(req);
    expect(res.status).toBe(500);
  });

  it('returns 401 if x-email-token header is missing', async () => {
    const req = createRequest({ messageId: '123' }, null);
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it('returns 401 if x-email-token header is incorrect', async () => {
    const req = createRequest({ messageId: '123' }, 'wrong-token');
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it('returns 400 if messageId is missing', async () => {
    const req = createRequest({ subject: 'Test' });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('calls parseEmailToWO and returns 200 on valid payload', async () => {
    const mockResult = {
      job: { jobId: 'WO-1' },
      isLaphamForm: false,
      senderType: 'Property Manager',
      senderEmail: 'test@example.com'
    };
    (parseEmailToWO as any).mockResolvedValue(mockResult);

    const payload = {
      subject: 'Leaking pipe',
      bodyText: 'Water everywhere',
      sender: 'manager@property.com',
      messageId: 'msg-999'
    };

    const req = createRequest(payload);
    const res = await POST(req);
    
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.job.jobId).toBe('WO-1');

    expect(parseEmailToWO).toHaveBeenCalledWith({
      subject: 'Leaking pipe',
      bodyText: 'Water everywhere',
      messageId: 'msg-999',
      sender: 'manager@property.com',
    });
  });

  it('inserts raw email as WO if parseEmailToWO throws (fallback)', async () => {
    (parseEmailToWO as any).mockRejectedValue(new Error('AI parsing failed'));

    const payload = {
      subject: 'Bad Email',
      bodyText: 'Gibberish',
      sender: 'manager@property.com',
      messageId: 'msg-fail'
    };

    const req = createRequest(payload);
    const res = await POST(req);
    
    // Fallback still returns 200 so webhook doesn't continuously retry
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.note).toBe('Fallback used due to AI error');
  });
});
