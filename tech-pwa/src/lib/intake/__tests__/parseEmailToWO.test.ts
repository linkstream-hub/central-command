import { describe, it, expect, beforeAll, vi, afterEach } from 'vitest';

vi.mock('@ai-sdk/google', () => ({
  google: vi.fn().mockReturnValue('mocked-gemini-model'),
}));

vi.mock('ai', () => ({
  generateObject: vi.fn().mockResolvedValue({
    object: {
      address: '999 Test Ave',
      unit: '1',
      city: 'Oakland',
      description: 'Leaking pipe under sink',
      category: 'Plumbing',
      priority: '4-STANDARD',
      tenantName: 'Test Tenant',
      tenantPhone: '510-555-0001',
      tenantEmail: 'tenant@test.com',
      emailType: 'adhoc_workorder',
      pteGranted: 'Yes',
      senderType: 'Resident Manager',
      notes: '',
    }
  })
}));

import { db } from '@/lib/db';
import { jobs, properties } from '@/lib/schema';
import { eq, inArray } from 'drizzle-orm';
import { parseEmailToWO } from '../parseEmailToWO';

describe('parseEmailToWO()', () => {
  let createdJobIds: string[] = [];
  let createdPropIds: number[] = [];

  beforeAll(() => {
    process.env.GOOGLE_GENERATIVE_AI_API_KEY = 'test-google-key';
  });

  afterEach(async () => {
    vi.clearAllMocks();
    if (createdJobIds.length > 0) {
      await db.delete(jobs).where(inArray(jobs.jobId, createdJobIds));
      createdJobIds = [];
    }
    if (createdPropIds.length > 0) {
      await db.delete(properties).where(inArray(properties.id, createdPropIds));
      createdPropIds = [];
    }
  });

  it('creates a WO and returns job + metadata for non-Lapham email', async () => {
    const msgId = `parse-test-${Date.now()}`;
    const result = await parseEmailToWO({
      subject: 'Sink broken',
      bodyText: 'The sink is leaking',
      messageId: msgId,
      sender: '"Jane PM" <pm@example.com>',
    });

    createdJobIds.push(`EMAIL-${msgId}`);

    expect(result.job.jobId).toBe(`EMAIL-${msgId}`);
    expect(result.job.status).toBe('Needs Info');
    expect(result.isLaphamForm).toBe(false);
    expect(result.senderEmail).toBe('pm@example.com');
    expect(result.senderType).toBeDefined();
  });

  it('calls Gemini for non-Lapham email', async () => {
    const { generateObject } = await import('ai');
    const msgId = `parse-gemini-${Date.now()}`;

    await parseEmailToWO({
      subject: 'Fix needed',
      bodyText: 'Please fix the door',
      messageId: msgId,
      sender: 'rm@example.com',
    });
    createdJobIds.push(`EMAIL-${msgId}`);

    expect(generateObject).toHaveBeenCalled();
  });

  it('skips Gemini for Lapham sender and maps fields', async () => {
    const { generateObject } = await import('ai');
    const msgId = `parse-lapham-${Date.now()}`;
    const laphamBody = `Submitted values are:
Name: Alice Tenant
Property: 444 Oak St
Unit: 3B
Description: Broken window latch
Permission to Enter: Yes`;

    const result = await parseEmailToWO({
      subject: 'Maintenance Request',
      bodyText: laphamBody,
      messageId: msgId,
      sender: 'website@laphamcompany.com',
    });
    createdJobIds.push(`EMAIL-${msgId}`);

    expect(generateObject).not.toHaveBeenCalled();
    expect(result.isLaphamForm).toBe(true);
    expect(result.job.address).toBe('444 Oak St');
    expect(result.job.description).toBe('Broken window latch');
  });

  it('stores messageId in gmailMsgId column', async () => {
    const msgId = `parse-msgid-${Date.now()}`;
    const result = await parseEmailToWO({
      subject: 'Test',
      bodyText: 'Test body',
      messageId: msgId,
      sender: 'rm@example.com',
    });
    createdJobIds.push(`EMAIL-${msgId}`);

    const dbJob = await db.select().from(jobs).where(eq(jobs.jobId, `EMAIL-${msgId}`)).limit(1);
    expect(dbJob[0].gmailMsgId).toBe(msgId);
    expect(result.job.gmailMsgId).toBe(msgId);
  });

  it('upserts — second call with same messageId does not create duplicate', async () => {
    const msgId = `parse-dedup-${Date.now()}`;
    await parseEmailToWO({ subject: 'S1', bodyText: 'B1', messageId: msgId, sender: 'a@b.com' });
    await parseEmailToWO({ subject: 'S2', bodyText: 'B2', messageId: msgId, sender: 'a@b.com' });
    createdJobIds.push(`EMAIL-${msgId}`);

    const dbJobs = await db.select().from(jobs).where(eq(jobs.jobId, `EMAIL-${msgId}`));
    expect(dbJobs.length).toBe(1);
  });
});
