import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { NextRequest } from 'next/server';
import { db } from '../../../../../../lib/db';
import { jobs, employees, timeRecords, jobPerformanceHistory } from '../../../../../../lib/schema';
import { eq } from 'drizzle-orm';
import * as crypto from 'crypto';
import { POST } from '../route';

describe('POST /api/field/job/complete', () => {
  const testToken = crypto.randomUUID();
  const testTokenHash = crypto.createHash('sha256').update(testToken).digest('hex');
  const employeeBadge = 'TEST_CMP_TECH';

  beforeAll(async () => {
    await db.insert(employees).values({
      badge: employeeBadge,
      name: 'Test Tech Complete',
      role: 'Tech',
      sessionToken: testTokenHash,
      tokenExpiry: new Date(Date.now() + 1000 * 60 * 60 * 24),
      isActive: true,
      orgId: 'APT-CA',
    });
  });

  afterAll(async () => {
    await db.delete(jobPerformanceHistory).where(eq(jobPerformanceHistory.techName, 'Test Tech Complete'));
    await db.delete(timeRecords).where(eq(timeRecords.techId, employeeBadge));
    await db.delete(employees).where(eq(employees.badge, employeeBadge));
  });

  it('transitions In Progress -> Complete and records history', async () => {
    const jobId = `test-cmp-${Date.now()}`;
    await db.insert(jobs).values({
      jobId,
      status: 'In Progress',
      tech: employeeBadge,
      address: '123 Test St',
      category: 'maintenance',
      orgId: 'APT-CA',
    });

    const recordId = `tr-${Date.now()}`;
    await db.insert(timeRecords).values({
      recordId,
      jobId,
      techId: employeeBadge,
      status: 'active',
      orgId: 'APT-CA',
    });

    const req = new NextRequest('http://localhost/api/field/job/complete', {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${testToken}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ recordId, jobId }),
    });

    const res = await POST(req);
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.success).toBe(true);

    // Verify DB
    const dbJob = await db.select().from(jobs).where(eq(jobs.jobId, jobId)).limit(1);
    expect(dbJob[0].status).toBe('Complete');

    const tr = await db.select().from(timeRecords).where(eq(timeRecords.recordId, recordId)).limit(1);
    expect(tr[0].status).toBe('complete');

    const hist = await db.select().from(jobPerformanceHistory).where(eq(jobPerformanceHistory.jobId, jobId)).limit(1);
    expect(hist[0]).toBeDefined();

    await db.delete(jobs).where(eq(jobs.jobId, jobId));
  });

  it('rejects complete when job is Scheduled (409)', async () => {
    const jobId = `test-cmp-bad-${Date.now()}`;
    await db.insert(jobs).values({
      jobId,
      status: 'Scheduled',
      tech: employeeBadge,
      orgId: 'APT-CA',
    });

    const req = new NextRequest('http://localhost/api/field/job/complete', {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${testToken}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ recordId: 'dummy-record', jobId }),
    });

    const res = await POST(req);
    const json = await res.json();
    expect(res.status).toBe(409);
    expect(json.success).toBe(false);
    expect(json.message).toContain('Scheduled');

    await db.delete(jobs).where(eq(jobs.jobId, jobId));
  });
});
