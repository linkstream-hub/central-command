import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { NextRequest } from 'next/server';
import { db } from '../../../../../lib/db';
import { jobs, employees, timeRecords } from '../../../../../lib/schema';
import { eq } from 'drizzle-orm';
import * as crypto from 'crypto';
import { POST } from '../route';

describe('POST /api/field/clock-in', () => {
  const testToken = crypto.randomUUID();
  const testTokenHash = crypto.createHash('sha256').update(testToken).digest('hex');
  const employeeBadge = 'TEST_CLK_TECH';

  beforeAll(async () => {
    // Setup test user
    await db.insert(employees).values({
      badge: employeeBadge,
      name: 'Test Tech Clock',
      role: 'Tech',
      sessionToken: testTokenHash,
      tokenExpiry: new Date(Date.now() + 1000 * 60 * 60 * 24),
      isActive: true,
      orgId: 'APT-CA',
    });
  });

  afterAll(async () => {
    await db.delete(timeRecords).where(eq(timeRecords.techId, employeeBadge));
    await db.delete(employees).where(eq(employees.badge, employeeBadge));
  });

  it('transitions Scheduled -> In Progress and creates time record', async () => {
    const jobId = `test-clk-in-${Date.now()}`;
    await db.insert(jobs).values({
      jobId,
      status: 'Scheduled',
      tech: employeeBadge,
      orgId: 'APT-CA',
    });

    const req = new NextRequest('http://localhost/api/field/clock-in', {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${testToken}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ jobId, lat: 37, lng: -122 }),
    });

    const res = await POST(req);
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.recordId).toBeDefined();

    // Verify DB
    const dbJob = await db.select().from(jobs).where(eq(jobs.jobId, jobId)).limit(1);
    expect(dbJob[0].status).toBe('In Progress');

    const tr = await db.select().from(timeRecords).where(eq(timeRecords.recordId, json.recordId)).limit(1);
    expect(tr[0].status).toBe('active');
    expect(tr[0].techId).toBe(employeeBadge);

    await db.delete(jobs).where(eq(jobs.jobId, jobId));
  });

  it('rejects clock-in when job is Needs Info (409)', async () => {
    const jobId = `test-clk-in-bad-${Date.now()}`;
    await db.insert(jobs).values({
      jobId,
      status: 'Needs Info',
      tech: employeeBadge,
      orgId: 'APT-CA',
    });

    const req = new NextRequest('http://localhost/api/field/clock-in', {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${testToken}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ jobId }),
    });

    const res = await POST(req);
    const json = await res.json();
    expect(res.status).toBe(409);
    expect(json.success).toBe(false);
    expect(json.message).toContain('Needs Info');

    await db.delete(jobs).where(eq(jobs.jobId, jobId));
  });
});
