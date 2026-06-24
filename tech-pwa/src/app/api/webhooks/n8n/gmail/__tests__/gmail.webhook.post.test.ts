import { describe, it, expect, beforeAll, vi, afterEach } from 'vitest';
import { NextRequest } from 'next/server';

vi.mock('@/auth', () => ({ auth: vi.fn().mockResolvedValue(null) }));
vi.mock('@ai-sdk/google', () => ({
  google: vi.fn().mockReturnValue('mocked-gemini-model'),
}));

vi.mock('ai', () => ({
  generateObject: vi.fn().mockResolvedValue({
    object: {
      address: '507 Magnolia Ave',
      unit: '',
      city: 'Oakland',
      description: 'Broken faucet in kitchen',
      category: 'Plumbing',
      priority: '4-STANDARD',
      tenantName: 'Jane Doe',
      tenantPhone: '510-555-1234',
      tenantEmail: 'jane@example.com',
      emailType: 'adhoc_workorder',
      notes: '',
    }
  })
}));

import { db } from '@/lib/db';
import { jobs, properties } from '@/lib/schema';
import { eq, inArray } from 'drizzle-orm';
import { POST } from '../route';

describe('POST /api/webhooks/n8n/gmail', () => {
  const TEST_API_KEY = 'test-dashboard-key';
  let createdJobIds: string[] = [];
  let createdPropIds: number[] = [];

  beforeAll(() => {
    process.env.DASHBOARD_API_KEY = TEST_API_KEY;
    process.env.GOOGLE_GENERATIVE_AI_API_KEY = 'test-google-key';
  });

  afterEach(async () => {
    if (createdJobIds.length > 0) {
      await db.delete(jobs).where(inArray(jobs.jobId, createdJobIds));
      createdJobIds = [];
    }
    if (createdPropIds.length > 0) {
      await db.delete(properties).where(inArray(properties.id, createdPropIds));
      createdPropIds = [];
    }
  });

  function makeRequest(body: Record<string, unknown>, headers: Record<string, string> = {}) {
    return new NextRequest('http://localhost/api/webhooks/n8n/gmail', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
    });
  }

  it('returns 401 without DASHBOARD_API_KEY header', async () => {
    const req = makeRequest({ gmailMsgId: 'msg-1' });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it('returns 400 if gmailMsgId missing', async () => {
    const req = makeRequest(
      { sender: 'a@b.com', subject: 'sub', bodyText: 'text' },
      { 'DASHBOARD_API_KEY': TEST_API_KEY }
    );
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('sets jobId to EMAIL-{gmailMsgId}', async () => {
    const msgId = `msg-jobid-${Date.now()}`;
    const req = makeRequest(
      { gmailMsgId: msgId, sender: 'a@b.com', subject: 'sub', bodyText: 'text' },
      { 'DASHBOARD_API_KEY': TEST_API_KEY }
    );
    const res = await POST(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    
    expect(json.job.jobId).toBe(`EMAIL-${msgId}`);
    createdJobIds.push(`EMAIL-${msgId}`);
  });

  it('stores gmailMsgId on the created job', async () => {
    const msgId = `msg-store-${Date.now()}`;
    const req = makeRequest(
      { gmailMsgId: msgId, sender: 'a@b.com', subject: 'sub', bodyText: 'text' },
      { 'DASHBOARD_API_KEY': TEST_API_KEY }
    );
    const res = await POST(req);
    expect(res.status).toBe(200);
    createdJobIds.push(`EMAIL-${msgId}`);

    const dbJob = await db.select().from(jobs).where(eq(jobs.jobId, `EMAIL-${msgId}`)).limit(1);
    expect(dbJob[0].gmailMsgId).toBe(msgId);
  });

  it('upserts on gmailMsgId — second POST does not create duplicate', async () => {
    const msgId = `msg-dedup-${Date.now()}`;
    const req1 = makeRequest(
      { gmailMsgId: msgId, sender: 'a@b.com', subject: 'sub', bodyText: 'text' },
      { 'DASHBOARD_API_KEY': TEST_API_KEY }
    );
    const res1 = await POST(req1);
    expect(res1.status).toBe(200);
    createdJobIds.push(`EMAIL-${msgId}`);

    const req2 = makeRequest(
      { gmailMsgId: msgId, sender: 'a@b.com', subject: 'sub', bodyText: 'text' },
      { 'DASHBOARD_API_KEY': TEST_API_KEY }
    );
    const res2 = await POST(req2);
    expect(res2.status).toBe(200);

    const dbJobs = await db.select().from(jobs).where(eq(jobs.jobId, `EMAIL-${msgId}`));
    expect(dbJobs.length).toBe(1);
  });

  it('populates rmName from properties table when address matches', async () => {
    const msgId = `msg-prop-${Date.now()}`;
    const [prop] = await db.insert(properties).values({
      address: '507 Magnolia Ave',
      unit: '',
      addressKey: '507 magnolia ave||',
      city: 'Oakland',
      state: 'CA',
      rmName: 'Sarah Kim',
      orgId: 'APT-CA',
    }).returning();
    createdPropIds.push(prop.id);

    const req = makeRequest(
      { gmailMsgId: msgId, sender: 'a@b.com', subject: 'sub', bodyText: 'text' },
      { 'DASHBOARD_API_KEY': TEST_API_KEY }
    );
    const res = await POST(req);
    expect(res.status).toBe(200);
    createdJobIds.push(`EMAIL-${msgId}`);

    const dbJob = await db.select().from(jobs).where(eq(jobs.jobId, `EMAIL-${msgId}`)).limit(1);
    expect(dbJob[0].rmName).toBe('Sarah Kim');
  });

  it('falls back to sender name when property not found', async () => {
    const msgId = `msg-fallback-${Date.now()}`;
    const req = makeRequest(
      { gmailMsgId: msgId, sender: '"Joy Gim" <maintenance@laphamcompany.com>', subject: 'sub', bodyText: 'text' },
      { 'DASHBOARD_API_KEY': TEST_API_KEY }
    );
    const res = await POST(req);
    expect(res.status).toBe(200);
    createdJobIds.push(`EMAIL-${msgId}`);

    const dbJob = await db.select().from(jobs).where(eq(jobs.jobId, `EMAIL-${msgId}`)).limit(1);
    expect(dbJob[0].rmName).toBe('Joy Gim');
  });
});
