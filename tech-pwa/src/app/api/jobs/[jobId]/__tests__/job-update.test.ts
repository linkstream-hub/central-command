/**
 * RED tests for JobUpdate.apply() — run BEFORE implementing job-update.ts.
 * All tests must fail with "Cannot find module '../job-update'" until implementation exists.
 *
 * Tests hit the real Neon dev DB. No DB mocking — that masks real failures.
 * SideEffectExecutor is faked — external comms (email, EventBus) must not fire in tests.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { db } from '@/lib/db';
import { jobs } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { apply } from '../job-update';
import type { SideEffectExecutor } from '../job-update';
import type { SideEffect } from '@/domain/job/job-state';

// ── Test double ───────────────────────────────────────────────────────────────

class FakeSideEffectExecutor implements SideEffectExecutor {
  executed: SideEffect[] = [];
  private _shouldThrow = false;

  throwOnNext() {
    this._shouldThrow = true;
  }

  async execute(effect: SideEffect): Promise<void> {
    if (this._shouldThrow) throw new Error('External service unavailable');
    this.executed.push(effect);
  }
}

// ── Fixtures ──────────────────────────────────────────────────────────────────

const ORG = 'APT-CA';

function jobId() {
  return `test-ju-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('JobUpdate.apply()', () => {
  let jid: string;
  let executor: FakeSideEffectExecutor;

  beforeEach(() => {
    jid = jobId();
    executor = new FakeSideEffectExecutor();
  });

  afterEach(async () => {
    await db.delete(jobs).where(eq(jobs.jobId, jid));
  });

  // ── NO_OP ──────────────────────────────────────────────────────────────────

  it('returns NO_OP when body is empty', async () => {
    await db.insert(jobs).values({ jobId: jid, status: 'Needs Info', orgId: ORG });

    const result = await apply(jid, {}, { isApiKeyAuth: false }, executor);

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.type).toBe('NO_OP');
    expect(executor.executed).toHaveLength(0);
  });

  it('returns NO_OP when body has only unrecognized fields', async () => {
    await db.insert(jobs).values({ jobId: jid, status: 'Needs Info', orgId: ORG });

    const result = await apply(jid, { unrecognized: 'field', another: 42 }, { isApiKeyAuth: false }, executor);

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.type).toBe('NO_OP');
    expect(executor.executed).toHaveLength(0);
  });

  // ── FSM SCHEDULE path ──────────────────────────────────────────────────────

  it('transitions RtS → Scheduled when tech + date + time provided and PTE granted', async () => {
    await db.insert(jobs).values({
      jobId: jid,
      status: 'Ready to Schedule',
      orgId: ORG,
      pte: 'Yes',
      tenantEmail: 'tenant@example.com',
    });

    const result = await apply(
      jid,
      { assignedTech: 'T01', scheduledDate: '2026-06-25', scheduledTime: 'morning' },
      { isApiKeyAuth: false },
      executor,
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.type).toBe('UPDATED');

    const row = await db.select().from(jobs).where(eq(jobs.jobId, jid)).limit(1);
    expect(row[0].status).toBe('Scheduled');
    expect(row[0].tech).toBe('T01');
    expect(row[0].scheduledDate).toBe('2026-06-25');
    expect(row[0].scheduledTime).toBe('morning');

    const confirmation = executor.executed.find(e => e.type === 'SEND_CONFIRMATION');
    expect(confirmation).toBeDefined();
  });

  // ── SCHEDULE_INCOMPLETE ────────────────────────────────────────────────────

  it('returns SCHEDULE_INCOMPLETE when tech provided but date and time absent from body and DB', async () => {
    await db.insert(jobs).values({
      jobId: jid,
      status: 'Ready to Schedule',
      orgId: ORG,
      // no scheduledDate, no scheduledTime in DB
    });

    const result = await apply(
      jid,
      { assignedTech: 'T01' }, // no date or time
      { isApiKeyAuth: false },
      executor,
    );

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error.code).toBe('SCHEDULE_INCOMPLETE');
    expect(executor.executed).toHaveLength(0);
  });

  it('returns SCHEDULE_INCOMPLETE when date provided but tech absent from body and DB', async () => {
    await db.insert(jobs).values({
      jobId: jid,
      status: 'Ready to Schedule',
      orgId: ORG,
    });

    const result = await apply(
      jid,
      { scheduledDate: '2026-06-25', scheduledTime: 'morning' }, // no tech
      { isApiKeyAuth: false },
      executor,
    );

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error.code).toBe('SCHEDULE_INCOMPLETE');
  });

  // ── FSM_VIOLATION ──────────────────────────────────────────────────────────

  it('returns FSM_VIOLATION when pteGranted is No on RtS job', async () => {
    await db.insert(jobs).values({
      jobId: jid,
      status: 'Ready to Schedule',
      orgId: ORG,
      pte: 'No',
    });

    const result = await apply(
      jid,
      { assignedTech: 'T01', scheduledDate: '2026-06-25', scheduledTime: 'morning' },
      { isApiKeyAuth: false },
      executor,
    );

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error.code).toBe('FSM_VIOLATION');
    expect(executor.executed).toHaveLength(0);

    // DB status must not have changed
    const row = await db.select().from(jobs).where(eq(jobs.jobId, jid)).limit(1);
    expect(row[0].status).toBe('Ready to Schedule');
  });

  // ── Non-FSM field update ───────────────────────────────────────────────────

  it('updates non-FSM fields without calling executor', async () => {
    await db.insert(jobs).values({ jobId: jid, status: 'Needs Info', orgId: ORG });

    const result = await apply(
      jid,
      { rmName: 'John Smith', notes: 'Dripping faucet in bathroom' },
      { isApiKeyAuth: false },
      executor,
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.type).toBe('UPDATED');
    expect(executor.executed).toHaveLength(0);

    const row = await db.select().from(jobs).where(eq(jobs.jobId, jid)).limit(1);
    expect(row[0].rmName).toBe('John Smith');
    expect(row[0].notes).toBe('Dripping faucet in bathroom');
  });

  // ── Non-FSM status change (resolveJobStatus path) ─────────────────────────

  it('applies status change via resolveJobStatus for non-willSchedule transitions', async () => {
    await db.insert(jobs).values({ jobId: jid, status: 'Scheduled', orgId: ORG });

    const result = await apply(
      jid,
      { status: 'In Progress' },
      { isApiKeyAuth: false },
      executor,
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.type).toBe('UPDATED');

    const row = await db.select().from(jobs).where(eq(jobs.jobId, jid)).limit(1);
    expect(row[0].status).toBe('In Progress');
  });

  // ── isApiKeyAuth suppresses executor ──────────────────────────────────────

  it('does not call executor when isApiKeyAuth is true even on FSM transition', async () => {
    await db.insert(jobs).values({
      jobId: jid,
      status: 'Ready to Schedule',
      orgId: ORG,
      pte: 'Yes',
      tenantEmail: 'tenant@example.com',
    });

    const result = await apply(
      jid,
      { assignedTech: 'T01', scheduledDate: '2026-06-25', scheduledTime: 'morning' },
      { isApiKeyAuth: true },
      executor,
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.type).toBe('UPDATED');

    // DB transition happened
    const row = await db.select().from(jobs).where(eq(jobs.jobId, jid)).limit(1);
    expect(row[0].status).toBe('Scheduled');

    // Executor was never called
    expect(executor.executed).toHaveLength(0);
  });

  // ── JOB_NOT_FOUND ──────────────────────────────────────────────────────────

  it('returns JOB_NOT_FOUND when jobId does not exist in DB', async () => {
    const result = await apply(
      'nonexistent-job-id-xyz',
      { rmName: 'Test' },
      { isApiKeyAuth: false },
      executor,
    );

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error.code).toBe('JOB_NOT_FOUND');
  });

  // ── Executor throws → warning (not failure) ────────────────────────────────

  it('returns UPDATED with warning when executor throws but DB write succeeded', async () => {
    await db.insert(jobs).values({
      jobId: jid,
      status: 'Ready to Schedule',
      orgId: ORG,
      pte: 'Yes',
      tenantEmail: 'tenant@example.com',
    });
    executor.throwOnNext();

    const result = await apply(
      jid,
      { assignedTech: 'T01', scheduledDate: '2026-06-25', scheduledTime: 'morning' },
      { isApiKeyAuth: false },
      executor,
    );

    // Module returns success — DB write completed before executor threw
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.type).toBe('UPDATED');
    expect(result.value.warning).toBeDefined();
    expect(typeof result.value.warning).toBe('string');

    // Status persisted despite executor failure
    const row = await db.select().from(jobs).where(eq(jobs.jobId, jid)).limit(1);
    expect(row[0].status).toBe('Scheduled');
  });
});
