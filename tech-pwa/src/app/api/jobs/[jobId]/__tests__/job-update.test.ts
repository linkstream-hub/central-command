import { describe, it, expect, beforeEach } from 'vitest';
import { db } from '../../../../../lib/db';
import { jobs } from '../../../../../lib/schema';
import { eq } from 'drizzle-orm';
import { apply } from '../job-update';
import { FakeSideEffectExecutor } from '../../../../../lib/side-effects/fake-executor';

describe('JobUpdate Module - apply()', () => {
  let executor: FakeSideEffectExecutor;

  beforeEach(() => {
    executor = new FakeSideEffectExecutor();
  });

  const setupJob = async (jobId: string, overrides: Partial<typeof jobs.$inferInsert>) => {
    await cleanupJob(jobId);
    await db.insert(jobs).values({
      jobId,
      orgId: 'APT-CA',
      ...overrides,
    });
  };

  const cleanupJob = async (jobId: string) => {
    await db.delete(jobs).where(eq(jobs.jobId, jobId));
  };

  it('1. returns NO_OP for empty body', async () => {
    const result = await apply('j1', {}, { isApiKeyAuth: false }, executor);
    expect(result).toEqual({ ok: true, value: { type: 'NO_OP' } });
    expect(executor.executed.length).toBe(0);
  });

  it('2. returns NO_OP for unrecognized fields only', async () => {
    const result = await apply('j2', { foo: 'bar' }, { isApiKeyAuth: false }, executor);
    expect(result).toEqual({ ok: true, value: { type: 'NO_OP' } });
    expect(executor.executed.length).toBe(0);
  });

  it('3. FSM SCHEDULE - success', async () => {
    const jobId = 'j3';
    await setupJob(jobId, { status: 'Ready to Schedule', pte: 'Yes' });

    const result = await apply(
      jobId,
      { assignedTech: 'T01', scheduledDate: '2026-06-25', scheduledTime: 'morning' },
      { isApiKeyAuth: false },
      executor
    );

    expect(result).toEqual({ ok: true, value: { type: 'UPDATED' } });
    const dbJob = await db.select().from(jobs).where(eq(jobs.jobId, jobId)).limit(1);
    expect(dbJob[0].status).toBe('Scheduled');
    expect(executor.executed).toContainEqual(expect.objectContaining({ type: 'SEND_CONFIRMATION' }));

    await cleanupJob(jobId);
  });

  it('4. FSM SCHEDULE - incomplete', async () => {
    const jobId = 'j4';
    await setupJob(jobId, { status: 'Ready to Schedule', pte: 'Yes' });

    const result = await apply(
      jobId,
      { assignedTech: 'T01' },
      { isApiKeyAuth: false },
      executor
    );

    expect(result).toEqual({
      ok: false,
      error: { code: 'SCHEDULE_INCOMPLETE', missing: ['scheduledDate', 'scheduledTime'] }
    });

    await cleanupJob(jobId);
  });

  it('5. FSM_VIOLATION', async () => {
    const jobId = 'j5';
    await setupJob(jobId, { status: 'Ready to Schedule', pte: 'No' }); // pte=No blocks schedule

    const result = await apply(
      jobId,
      { assignedTech: 'T01', scheduledDate: '2026-06-25', scheduledTime: 'morning' },
      { isApiKeyAuth: false },
      executor
    );

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe('FSM_VIOLATION');
    expect(executor.executed.length).toBe(0);

    await cleanupJob(jobId);
  });

  it('6. Non-FSM field update', async () => {
    const jobId = 'j6';
    await setupJob(jobId, { status: 'Needs Info' });

    const result = await apply(
      jobId,
      { rmName: 'John', notes: 'Test notes' },
      { isApiKeyAuth: false },
      executor
    );

    expect(result).toEqual({ ok: true, value: { type: 'UPDATED' } });
    const dbJob = await db.select().from(jobs).where(eq(jobs.jobId, jobId)).limit(1);
    expect(dbJob[0].rmName).toBe('John');
    expect(dbJob[0].notes).toBe('Test notes');
    expect(executor.executed.length).toBe(0);

    await cleanupJob(jobId);
  });

  it('7. Non-FSM status change', async () => {
    const jobId = 'j7';
    await setupJob(jobId, { status: 'Scheduled' });

    const result = await apply(
      jobId,
      { status: 'In Progress' },
      { isApiKeyAuth: false },
      executor
    );

    expect(result).toEqual({ ok: true, value: { type: 'UPDATED' } });
    const dbJob = await db.select().from(jobs).where(eq(jobs.jobId, jobId)).limit(1);
    expect(dbJob[0].status).toBe('In Progress');

    await cleanupJob(jobId);
  });

  it('8. isApiKeyAuth suppresses effects', async () => {
    const jobId = 'j8';
    await setupJob(jobId, { status: 'Ready to Schedule', pte: 'Yes' });

    const result = await apply(
      jobId,
      { assignedTech: 'T01', scheduledDate: '2026-06-25', scheduledTime: 'morning' },
      { isApiKeyAuth: true },
      executor
    );

    expect(result).toEqual({ ok: true, value: { type: 'UPDATED' } });
    const dbJob = await db.select().from(jobs).where(eq(jobs.jobId, jobId)).limit(1);
    expect(dbJob[0].status).toBe('Scheduled');
    expect(executor.executed.length).toBe(0); // Supressed!

    await cleanupJob(jobId);
  });

  it('9. JOB_NOT_FOUND', async () => {
    const result = await apply('unknown-job', { notes: 'hello' }, { isApiKeyAuth: false }, executor);
    expect(result).toEqual({ ok: false, error: { code: 'JOB_NOT_FOUND' } });
  });

  it('10. Executor throws -> warning', async () => {
    const jobId = 'j10';
    await setupJob(jobId, { status: 'Ready to Schedule', pte: 'Yes' });

    executor.shouldThrow = true;

    const result = await apply(
      jobId,
      { assignedTech: 'T01', scheduledDate: '2026-06-25', scheduledTime: 'morning' },
      { isApiKeyAuth: false },
      executor
    );

    expect(result.ok).toBe(true);
    if (result.ok && result.value.type === 'UPDATED') {
      expect(result.value.warning).toBeDefined(); // Warning is set
    }

    const dbJob = await db.select().from(jobs).where(eq(jobs.jobId, jobId)).limit(1);
    expect(dbJob[0].status).toBe('Scheduled'); // DB update still succeeded

    await cleanupJob(jobId);
  });

  // ─── C1 dual-seam RED tests ──────────────────────────────────────────────────
  // These fail before C1 changes land. They define the contract.

  it('11. RtS job with existing tech+date+time — notes update must NOT auto-schedule', async () => {
    const jobId = 'j11';
    await setupJob(jobId, {
      status: 'Ready to Schedule',
      tech: 'T01',
      scheduledDate: '2026-06-25',
      scheduledTime: 'morning',
    });

    const result = await apply(jobId, { notes: 'new note' }, { isApiKeyAuth: false }, executor);

    expect(result).toEqual({ ok: true, value: { type: 'UPDATED' } });
    const dbJob = await db.select().from(jobs).where(eq(jobs.jobId, jobId)).limit(1);
    expect(dbJob[0].status).toBe('Ready to Schedule');
    expect(executor.executed.length).toBe(0);

    await cleanupJob(jobId);
  });

  it('12. Direct { status: Scheduled } without tech+date+time — must return SCHEDULE_INCOMPLETE', async () => {
    const jobId = 'j12';
    await setupJob(jobId, { status: 'Needs Info' });

    const result = await apply(jobId, { status: 'Scheduled' }, { isApiKeyAuth: false }, executor);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe('SCHEDULE_INCOMPLETE');
    }
    const dbJob = await db.select().from(jobs).where(eq(jobs.jobId, jobId)).limit(1);
    expect(dbJob[0].status).toBe('Needs Info');

    await cleanupJob(jobId);
  });

  it('13. PTE Required status change — must NOT fire side effects', async () => {
    const jobId = 'j13';
    await setupJob(jobId, { status: 'Needs Info', tenantEmail: 'tenant@test.com' });

    const result = await apply(jobId, { status: 'PTE Required' }, { isApiKeyAuth: false }, executor);

    expect(result).toEqual({ ok: true, value: { type: 'UPDATED' } });
    const dbJob = await db.select().from(jobs).where(eq(jobs.jobId, jobId)).limit(1);
    expect(dbJob[0].status).toBe('PTE Required');
    expect(executor.executed.length).toBe(0);

    await cleanupJob(jobId);
  });
});
