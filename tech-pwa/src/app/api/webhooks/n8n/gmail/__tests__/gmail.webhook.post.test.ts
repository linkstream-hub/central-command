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
      pteGranted: 'Yes',
      senderType: 'Resident Manager',
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

  describe('Phase 23: Lapham Integration', () => {
    it('Lapham email skips Gemini and maps fields directly', async () => {
      // Test 1: Lapham email skips Gemini
      const { generateObject } = await import('ai');
      const msgId = `msg-lapham-${Date.now()}`;
      const laphamBody = `Submitted values are:
Name: John Doe
Property: 123 Main St
Unit: 4B
Description: Leaking sink`;
      const req = makeRequest(
        { gmailMsgId: msgId, sender: 'website@laphamcompany.com', subject: 'New Request', bodyText: laphamBody },
        { 'DASHBOARD_API_KEY': TEST_API_KEY }
      );
      
      const res = await POST(req);
      expect(res.status).toBe(200);
      createdJobIds.push(`EMAIL-${msgId}`);

      expect(generateObject).not.toHaveBeenCalled();

      const dbJob = await db.select().from(jobs).where(eq(jobs.jobId, `EMAIL-${msgId}`)).limit(1);
      expect(dbJob[0].description).toBe('Leaking sink');
      expect(dbJob[0].address).toBe('123 Main St');
    });

    it('Lapham email sets emailType correctly based on keywords', async () => {
      // Test 2: Lapham email sets emailType correctly
      const msgId = `msg-lapham-type-${Date.now()}`;
      const laphamBody = `Submitted values are:
Property: 456 Elm St
Description: Tenant move out turnover needs painting`;
      const req = makeRequest(
        { gmailMsgId: msgId, sender: 'website@laphamcompany.com', subject: 'turnover', bodyText: laphamBody },
        { 'DASHBOARD_API_KEY': TEST_API_KEY }
      );
      
      const res = await POST(req);
      expect(res.status).toBe(200);
      createdJobIds.push(`EMAIL-${msgId}`);

      const dbJob = await db.select().from(jobs).where(eq(jobs.jobId, `EMAIL-${msgId}`)).limit(1);
      expect(dbJob[0].emailType).toBe('turnover');
    });

    it('Lapham email with property match merges access codes', async () => {
      // Test 3: Lapham email with property match merges access codes
      const msgId = `msg-lapham-access-${Date.now()}`;
      
      const [prop] = await db.insert(properties).values({
        address: '789 Pine St',
        unit: '',
        addressKey: '789 pine st||',
        city: 'Oakland',
        state: 'CA',
        orgId: 'APT-CA',
        accessInfo: '1234',
      }).returning();
      createdPropIds.push(prop.id);

      const laphamBody = `Submitted values are:
Property: 789 Pine St
Permission to Enter: 5678 is the lockbox code`;
      const req = makeRequest(
        { gmailMsgId: msgId, sender: 'website@laphamcompany.com', subject: 'Maint', bodyText: laphamBody },
        { 'DASHBOARD_API_KEY': TEST_API_KEY }
      );
      
      const res = await POST(req);
      expect(res.status).toBe(200);
      createdJobIds.push(`EMAIL-${msgId}`);

      const updatedProp = await db.select().from(properties).where(eq(properties.id, prop.id)).limit(1);
      expect(updatedProp[0].accessInfo).toContain('1234');
      expect(updatedProp[0].accessInfo).toContain('5678');
    });

    it('Non-Lapham email still uses Gemini', async () => {
      // Test 4: Non-Lapham email still uses Gemini
      const { generateObject } = await import('ai');
      const msgId = `msg-gemini-${Date.now()}`;
      const req = makeRequest(
        { gmailMsgId: msgId, sender: 'tenant@example.com', subject: 'Fix my toilet', bodyText: 'It is broken' },
        { 'DASHBOARD_API_KEY': TEST_API_KEY }
      );

      const res = await POST(req);
      expect(res.status).toBe(200);
      createdJobIds.push(`EMAIL-${msgId}`);

      expect(generateObject).toHaveBeenCalled();
    });
  });

  describe('Parse quality fixes', () => {
    it('captures rmEmail from sender header when property not found', async () => {
      const msgId = `msg-rmemail-${Date.now()}`;
      const req = makeRequest(
        { gmailMsgId: msgId, sender: '"Joy Gim" <maintenance@laphamcompany.com>', subject: 'sub', bodyText: 'text' },
        { 'DASHBOARD_API_KEY': TEST_API_KEY }
      );
      const res = await POST(req);
      expect(res.status).toBe(200);
      createdJobIds.push(`EMAIL-${msgId}`);

      const dbJob = await db.select().from(jobs).where(eq(jobs.jobId, `EMAIL-${msgId}`)).limit(1);
      expect(dbJob[0].rmEmail).toBe('maintenance@laphamcompany.com');
    });

    it('stores pte column from Lapham pteGranted field', async () => {
      const msgId = `msg-lapham-pte-${Date.now()}`;
      const laphamBody = `Submitted values are:
Name: Jane Smith
Property: 321 Oak Ave
Unit: 2A
Permission to Enter: Permission to enter my dwelling while I am not there
Description: Leaking pipe`;
      const req = makeRequest(
        { gmailMsgId: msgId, sender: 'website@laphamcompany.com', subject: 'Maint Request', bodyText: laphamBody },
        { 'DASHBOARD_API_KEY': TEST_API_KEY }
      );
      const res = await POST(req);
      expect(res.status).toBe(200);
      createdJobIds.push(`EMAIL-${msgId}`);

      const dbJob = await db.select().from(jobs).where(eq(jobs.jobId, `EMAIL-${msgId}`)).limit(1);
      expect(dbJob[0].pte).toBe('Yes');
    });

    it('stores pte column from Gemini pteGranted field', async () => {
      const msgId = `msg-gemini-pte-${Date.now()}`;
      const req = makeRequest(
        { gmailMsgId: msgId, sender: 'rm@example.com', subject: 'Fix sink', bodyText: 'tenant gave permission' },
        { 'DASHBOARD_API_KEY': TEST_API_KEY }
      );
      const res = await POST(req);
      expect(res.status).toBe(200);
      createdJobIds.push(`EMAIL-${msgId}`);

      const dbJob = await db.select().from(jobs).where(eq(jobs.jobId, `EMAIL-${msgId}`)).limit(1);
      expect(dbJob[0].pte).toBe('Yes'); // mock returns pteGranted: 'Yes'
    });

    it('returns parsed metadata alongside job in response', async () => {
      const msgId = `msg-parsed-${Date.now()}`;
      const req = makeRequest(
        { gmailMsgId: msgId, sender: '"Alice" <alice@pm.com>', subject: 'sub', bodyText: 'text' },
        { 'DASHBOARD_API_KEY': TEST_API_KEY }
      );
      const res = await POST(req);
      expect(res.status).toBe(200);
      createdJobIds.push(`EMAIL-${msgId}`);

      const json = await res.json();
      expect(json.parsed).toBeDefined();
      expect(json.parsed.senderEmail).toBe('alice@pm.com');
      expect(typeof json.parsed.isLaphamForm).toBe('boolean');
      expect(json.parsed.senderType).toBeDefined();
    });

    it('returns parsed.isLaphamForm=true for Lapham emails', async () => {
      const msgId = `msg-lapham-parsed-${Date.now()}`;
      const laphamBody = `Submitted values are:
Property: 100 Test St
Description: Broken door`;
      const req = makeRequest(
        { gmailMsgId: msgId, sender: 'website@laphamcompany.com', subject: 'Maint', bodyText: laphamBody },
        { 'DASHBOARD_API_KEY': TEST_API_KEY }
      );
      const res = await POST(req);
      expect(res.status).toBe(200);
      createdJobIds.push(`EMAIL-${msgId}`);

      const json = await res.json();
      expect(json.parsed.isLaphamForm).toBe(true);
    });
  });

  describe('P0.2b: initial status', () => {
    it('newly created job has status Needs Info (not Needs Review)', async () => {
      const msgId = `msg-status-${Date.now()}`;
      const req = makeRequest(
        { gmailMsgId: msgId, sender: 'rm@example.com', subject: 'sub', bodyText: 'text' },
        { 'DASHBOARD_API_KEY': TEST_API_KEY }
      );
      const res = await POST(req);
      expect(res.status).toBe(200);
      createdJobIds.push(`EMAIL-${msgId}`);

      const dbJob = await db.select().from(jobs).where(eq(jobs.jobId, `EMAIL-${msgId}`)).limit(1);
      expect(dbJob[0].status).toBe('Needs Info');
    });
  });
});
