import { describe, test, expect, vi } from 'vitest';
import {
  JOB_STATE_MACHINE,
  toJobId,
  toTechId,
  createJobStateService,
  type JobStateDAL,
  type JobStateRecord,
  type SchedulingToken,
} from '../job-state';

// ── Fixtures ──────────────────────────────────────────────────────────────────

const JOB_ID = toJobId('job-001');
const TECH_ID = toTechId('tech-042');

function makeJob(overrides: Partial<JobStateRecord> = {}): JobStateRecord {
  return {
    jobId: JOB_ID,
    state: 'Scheduled',
    woType: 'maintenance',
    pteGranted: 'Yes',
    assignedTechId: TECH_ID,
    scheduledDate: '2026-06-20',
    scheduledWindow: 'morning',
    missingFields: [],
    schedulingToken: null,
    schedulingTokenExpiresAt: null,
    tenantProposedDate: null,
    tenantProposedWindow: null,
    clockedInAt: null,
    completedAt: null,
    tenantEmail: 'tenant@example.com',
    ...overrides,
  };
}

function makeDal(job: JobStateRecord): JobStateDAL {
  return {
    getJobById: vi.fn().mockResolvedValue({ success: true, job }),
    updateJob: vi.fn().mockResolvedValue({ success: true }),
  };
}

// ── Layer 1: Topology (JOB_STATE_MACHINE — zero I/O) ─────────────────────────

describe('JOB_STATE_MACHINE topology', () => {
  function exitsFrom(state: string) {
    return JOB_STATE_MACHINE.filter((t) => t.from === state).map((t) => t.event);
  }

  test('has exactly 8 arcs', () => {
    expect(JOB_STATE_MACHINE).toHaveLength(8);
  });

  test('Needs Info exits: ADVANCE | REQUEST_TENANT_SCHEDULING', () => {
    expect(exitsFrom('Needs Info').sort()).toEqual(
      ['ADVANCE', 'REQUEST_TENANT_SCHEDULING'].sort(),
    );
  });

  test('Awaiting Tenant exits: TENANT_SUBMITTED | TENANT_LINK_EXPIRED', () => {
    expect(exitsFrom('Awaiting Tenant').sort()).toEqual(
      ['TENANT_LINK_EXPIRED', 'TENANT_SUBMITTED'].sort(),
    );
  });

  test('Ready to Schedule exits: SCHEDULE only', () => {
    expect(exitsFrom('Ready to Schedule')).toEqual(['SCHEDULE']);
  });

  test('Scheduled exits: CLOCK_IN | RESCHEDULE', () => {
    expect(exitsFrom('Scheduled').sort()).toEqual(['CLOCK_IN', 'RESCHEDULE'].sort());
  });

  test('In Progress exits: COMPLETE only', () => {
    expect(exitsFrom('In Progress')).toEqual(['COMPLETE']);
  });

  test('Complete is terminal (0 exits)', () => {
    expect(exitsFrom('Complete')).toHaveLength(0);
  });
});

// ── Layer 2: Synchronous introspection ────────────────────────────────────────

describe('JobStateService — synchronous introspection', () => {
  const svc = createJobStateService(makeDal(makeJob()));

  test('canTransition: valid arc returns true', () => {
    expect(svc.canTransition('Scheduled', 'CLOCK_IN')).toBe(true);
  });

  test('canTransition: invalid arc returns false', () => {
    expect(svc.canTransition('Needs Info', 'CLOCK_IN')).toBe(false);
  });

  test('getValidEvents: Scheduled returns CLOCK_IN and RESCHEDULE', () => {
    expect([...svc.getValidEvents('Scheduled')].sort()).toEqual(
      ['CLOCK_IN', 'RESCHEDULE'].sort(),
    );
  });

  test('getPredecessors: Complete reachable only from In Progress', () => {
    expect([...svc.getPredecessors('Complete')]).toEqual(['In Progress']);
  });

  test('getSuccessors: Awaiting Tenant leads to Ready to Schedule and Needs Info', () => {
    expect([...svc.getSuccessors('Awaiting Tenant')].sort()).toEqual(
      ['Needs Info', 'Ready to Schedule'].sort(),
    );
  });
});

// ── Layer 3: Service.transition() ─────────────────────────────────────────────

describe('JobStateService.transition()', () => {
  test('tracer bullet: Scheduled → In Progress via CLOCK_IN', async () => {
    const job = makeJob({ state: 'Scheduled' });
    const dal = makeDal(job);
    const svc = createJobStateService(dal);

    const result = await svc.transition({
      type: 'CLOCK_IN',
      payload: { jobId: JOB_ID, techId: TECH_ID, clockedInAt: '2026-06-20T09:00:00Z' },
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.previous).toBe('Scheduled');
    expect(result.value.next).toBe('In Progress');
    expect(result.value.appliedEvent).toBe('CLOCK_IN');
  });

  test('JOB_NOT_FOUND when DAL cannot locate job', async () => {
    const dal: JobStateDAL = {
      getJobById: vi.fn().mockResolvedValue({ success: false, error: 'JOB_NOT_FOUND' }),
      updateJob: vi.fn(),
    };
    const svc = createJobStateService(dal);

    const result = await svc.transition({
      type: 'CLOCK_IN',
      payload: { jobId: JOB_ID, techId: TECH_ID, clockedInAt: '2026-06-20T09:00:00Z' },
    });

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error.code).toBe('JOB_NOT_FOUND');
  });

  test('INVALID_TRANSITION: CLOCK_IN fired from Needs Info', async () => {
    const job = makeJob({ state: 'Needs Info' });
    const dal = makeDal(job);
    const svc = createJobStateService(dal);

    const result = await svc.transition({
      type: 'CLOCK_IN',
      payload: { jobId: JOB_ID, techId: TECH_ID, clockedInAt: '2026-06-20T09:00:00Z' },
    });

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error.code).toBe('INVALID_TRANSITION');
  });

  test('INVALID_TRANSITION: ADVANCE with unfilled required fields', async () => {
    const job = makeJob({ state: 'Needs Info', missingFields: ['address', 'unit'] });
    const dal = makeDal(job);
    const svc = createJobStateService(dal);

    const result = await svc.transition({
      type: 'ADVANCE',
      payload: {
        jobId: JOB_ID,
        filledFields: ['address'],
        pteGranted: 'Yes',
        woType: 'maintenance',
      },
    });

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error.code).toBe('INVALID_TRANSITION');
  });

  test('INVALID_TRANSITION: REQUEST_TENANT_SCHEDULING on turnover WO', async () => {
    const job = makeJob({
      state: 'Needs Info',
      woType: 'turnover',
      pteGranted: 'No',
      missingFields: [],
    });
    const dal = makeDal(job);
    const svc = createJobStateService(dal);

    const result = await svc.transition({
      type: 'REQUEST_TENANT_SCHEDULING',
      payload: {
        jobId: JOB_ID,
        tenantEmail: 'tenant@example.com',
        schedulingToken: 'tok-abc' as SchedulingToken,
      },
    });

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error.code).toBe('INVALID_TRANSITION');
  });

  test("INVALID_TRANSITION: any event from 'Needs Review' (legacy state absent from FSM)", async () => {
    // 'Needs Review' was removed from the FSM; all such WOs were migrated to 'Needs Info'.
    // This proves the FSM correctly rejects transitions from a state that no longer exists.
    const job = makeJob({ state: 'Needs Review' as unknown as typeof JOB_STATE_MACHINE[number]['from'] });
    const dal = makeDal(job);
    const svc = createJobStateService(dal);

    const result = await svc.transition({
      type: 'CLOCK_IN',
      payload: { jobId: JOB_ID, techId: TECH_ID, clockedInAt: '2026-06-20T09:00:00Z' },
    });

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error.code).toBe('INVALID_TRANSITION');
  });

  test('side effects: START_TIME_RECORD declared on CLOCK_IN', async () => {
    const job = makeJob({ state: 'Scheduled' });
    const dal = makeDal(job);
    const svc = createJobStateService(dal);

    const result = await svc.transition({
      type: 'CLOCK_IN',
      payload: { jobId: JOB_ID, techId: TECH_ID, clockedInAt: '2026-06-20T09:00:00Z' },
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const effect = result.value.sideEffects.find((e) => e.type === 'START_TIME_RECORD');
    expect(effect).toBeDefined();
    expect(effect?.type).toBe('START_TIME_RECORD');
  });
});
