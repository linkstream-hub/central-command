import { describe, it, expect, beforeAll } from 'vitest';
import { NextRequest } from 'next/server';
import { db } from '../../../../lib/db';
import { jobs } from '../../../../lib/schema';
import { eq } from 'drizzle-orm';
import { PATCH } from '../route';

describe('PATCH /api/jobs/[jobId]', () => {
  const TEST_API_KEY = 'test-dashboard-key';

  beforeAll(() => {
    process.env.DASHBOARD_API_KEY = TEST_API_KEY;
  });

  it('transitions Ready to Schedule -> Scheduled when tech+date+time provided', async () => {
    const jobId = `test-patch-sch-${Date.now()}`;
    await db.insert(jobs).values({
      jobId,
      status: 'Ready to Schedule',
      orgId: 'APT-CA',
    });

    const req = new NextRequest(`http://localhost/api/jobs/${jobId}`, {
      method: 'PATCH',
      headers: {
        'x-api-key': TEST_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        assignedTech: 'T01',
        scheduledDate: '2026-06-25',
        scheduledTime: 'morning',
      }),
    });

    const res = await PATCH(req, { params: Promise.resolve({ jobId }) });
    const json = await res.json();
    
    expect(res.status).toBe(200);
    expect(json.success).toBe(true);

    const dbJob = await db.select().from(jobs).where(eq(jobs.jobId, jobId)).limit(1);
    expect(dbJob[0].status).toBe('Scheduled');
    expect(dbJob[0].tech).toBe('T01');
    expect(dbJob[0].scheduledDate).toBe('2026-06-25');
    expect(dbJob[0].scheduledTime).toBe('morning');

    await db.delete(jobs).where(eq(jobs.jobId, jobId));
  });
});
