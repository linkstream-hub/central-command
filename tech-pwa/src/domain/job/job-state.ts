/**
 * domain/job/job-state.ts
 *
 * Pure TypeScript — no Next.js imports, no DB calls, no side effects.
 * Single source of truth for the APT 6-state work-order FSM (ADR-004, ADR-010).
 *
 * Design principles:
 *  - The transition table is a first-class exported constant (JOB_STATE_MACHINE).
 *  - The service is injected with a DAL interface — no concrete db references.
 *  - Every method returns Result<T, JobStateError> — no throws at the domain layer.
 *  - Introspection methods (getValidEvents, canTransition) expose the FSM to callers
 *    so that UIs can disable buttons and tests can assert machine structure.
 */

// ─── Branded primitives ──────────────────────────────────────────────────────

export type JobId = string & { readonly _brand: 'JobId' };
export type TechId = string & { readonly _brand: 'TechId' };
export type SchedulingToken = string & { readonly _brand: 'SchedulingToken' };

/** Narrow a raw string to a branded JobId. Throws if blank. */
export function toJobId(raw: string): JobId {
  if (!raw.trim()) throw new TypeError('JobId cannot be blank');
  return raw as JobId;
}

export function toTechId(raw: string): TechId {
  if (!raw.trim()) throw new TypeError('TechId cannot be blank');
  return raw as TechId;
}

// ─── State ───────────────────────────────────────────────────────────────────

export type JobState =
  | 'Needs Info'
  | 'Awaiting Tenant'
  | 'Ready to Schedule'
  | 'Scheduled'
  | 'In Progress'
  | 'Complete';

/** All six states as a tuple — useful for exhaustiveness checks and iteration. */
export const JOB_STATES = [
  'Needs Info',
  'Awaiting Tenant',
  'Ready to Schedule',
  'Scheduled',
  'In Progress',
  'Complete',
] as const satisfies readonly JobState[];

// ─── WO type ─────────────────────────────────────────────────────────────────

/**
 * Determines intake evaluation path — NOT a status.
 * Stored on the job record as a tag, displayed in the dispatch UI.
 */
export type WoType = 'maintenance' | 'turnover' | 'inspection';

// ─── Arrival window ──────────────────────────────────────────────────────────

export type ArrivalWindow = 'morning' | 'afternoon' | 'late_afternoon';

// ─── Events (discriminated union) ────────────────────────────────────────────

/**
 * ADVANCE — dispatcher fills missing fields.
 * Payload carries the resolved pteGranted value so the FSM can branch.
 */
export type AdvanceEvent = {
  type: 'ADVANCE';
  payload: {
    jobId: JobId;
    /** Fields that were filled, keyed to the missingFields array values. */
    filledFields: string[];
    pteGranted: 'Yes' | 'No' | 'Not Required';
    woType: WoType;
  };
};

/**
 * REQUEST_TENANT_SCHEDULING — fields filled, PTE not granted, woType=maintenance.
 * CC fires SMS + email automatically after this transition.
 */
export type RequestTenantSchedulingEvent = {
  type: 'REQUEST_TENANT_SCHEDULING';
  payload: {
    jobId: JobId;
    tenantEmail: string;
    schedulingToken: SchedulingToken;
  };
};

/** TENANT_SUBMITTED — tenant submits scheduling page. */
export type TenantSubmittedEvent = {
  type: 'TENANT_SUBMITTED';
  payload: {
    jobId: JobId;
    proposedDate: string;        // ISO date
    proposedWindow: ArrivalWindow;
    schedulingToken: SchedulingToken;
  };
};

/** TENANT_LINK_EXPIRED — 48h no response; Dispatcher must phone tenant. */
export type TenantLinkExpiredEvent = {
  type: 'TENANT_LINK_EXPIRED';
  payload: {
    jobId: JobId;
    schedulingToken: SchedulingToken;
  };
};

/** SCHEDULE — dispatcher assigns tech + date + arrival window. */
export type ScheduleEvent = {
  type: 'SCHEDULE';
  payload: {
    jobId: JobId;
    techId: TechId;
    scheduledDate: string;       // ISO date e.g. '2026-06-20'
    scheduledWindow: ArrivalWindow;
  };
};

/**
 * RESCHEDULE — requires new tenant coordination.
 * Sends a new scheduling link; transitions Scheduled → Awaiting Tenant.
 */
export type RescheduleEvent = {
  type: 'RESCHEDULE';
  payload: {
    jobId: JobId;
    newSchedulingToken: SchedulingToken;
    tenantEmail: string;
  };
};

/** CLOCK_IN — tech clocks in at the job site. */
export type ClockInEvent = {
  type: 'CLOCK_IN';
  payload: {
    jobId: JobId;
    techId: TechId;
    clockedInAt: string;         // ISO timestamp
  };
};

/** COMPLETE — tech submits completion attestation. */
export type CompleteEvent = {
  type: 'COMPLETE';
  payload: {
    jobId: JobId;
    techId: TechId;
    attestedAt: string;          // ISO timestamp
    notes?: string;
  };
};

/** The full event union — every caller sends exactly one of these. */
export type JobEvent =
  | AdvanceEvent
  | RequestTenantSchedulingEvent
  | TenantSubmittedEvent
  | TenantLinkExpiredEvent
  | ScheduleEvent
  | RescheduleEvent
  | ClockInEvent
  | CompleteEvent;

/** Narrow type extracting just the event type string literal. */
export type JobEventType = JobEvent['type'];

// ─── Result type ─────────────────────────────────────────────────────────────

export type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E };

// ─── Error union ─────────────────────────────────────────────────────────────

export type JobStateError =
  | { code: 'INVALID_TRANSITION'; from: JobState; attempted: JobEventType }
  | { code: 'PTE_REQUIRED'; jobId: JobId }
  | { code: 'JOB_NOT_FOUND'; jobId: JobId }
  | { code: 'MISSING_FIELDS'; required: string[] }
  | { code: 'INVALID_TOKEN'; jobId: JobId; token: SchedulingToken }
  | { code: 'TOKEN_EXPIRED'; jobId: JobId; expiredAt: string };

// ─── Job domain model ────────────────────────────────────────────────────────

/**
 * Domain representation of a job — intentionally overlaps with the DB-layer Job
 * type from lib/types.ts but is the FSM's source of truth. The DAL maps to this.
 *
 * Fields relevant to state-machine decisions only. Non-FSM fields (address, RM, etc.)
 * are outside this interface's concern.
 */
export interface JobStateRecord {
  jobId: JobId;
  state: JobState;
  woType: WoType;
  pteGranted: 'Yes' | 'No' | 'Not Required';
  assignedTechId: TechId | null;
  scheduledDate: string | null;
  scheduledWindow: ArrivalWindow | null;
  missingFields: string[];
  schedulingToken: SchedulingToken | null;
  schedulingTokenExpiresAt: string | null;   // ISO timestamp
  tenantProposedDate: string | null;
  tenantProposedWindow: ArrivalWindow | null;
  clockedInAt: string | null;
  completedAt: string | null;
  tenantEmail: string;
}

// ─── Transition table types ───────────────────────────────────────────────────

/**
 * A single row in the FSM transition table.
 * `guard` is optional — some transitions are unconditional, others require
 * runtime checks that the service evaluates before applying the transition.
 */
export interface TransitionDefinition<E extends JobEvent = JobEvent> {
  from: JobState;
  to: JobState;
  event: E['type'];
  /** Human-readable description — drives tooltip copy in the dispatch UI. */
  description: string;
  /**
   * Hard gates: if guard returns a non-null string the service returns
   * INVALID_TRANSITION. The string is the diagnostic reason (internal — not
   * surfaced to end users).
   *
   * Omit when the transition is unconditional given the `from` state.
   */
  guard?: (job: JobStateRecord, event: E) => string | null;
}

/**
 * The transition table — a readonly tuple indexed by [state][event] lookup.
 * Exported as a constant so tests, UIs, and n8n route builders can all
 * inspect the machine without importing the service implementation.
 */
export type JobStateMachine = readonly TransitionDefinition[];

// ─── JOB_STATE_MACHINE constant ──────────────────────────────────────────────

/**
 * The canonical transition table for the APT 6-state work-order FSM.
 * Every entry describes exactly one (from, event) → to arc.
 *
 * Implementation note: guards are intentionally pure functions — they receive
 * snapshot data only and have no side effects. Side effects (email, SMS, n8n
 * webhooks) are returned via TransitionResult.sideEffects, not encoded here.
 */
export const JOB_STATE_MACHINE: JobStateMachine = [
  // ── Needs Info exits ────────────────────────────────────────────────────────
  {
    from: 'Needs Info',
    to: 'Awaiting Tenant',
    event: 'REQUEST_TENANT_SCHEDULING',
    description: 'Fields filled, PTE not granted, maintenance WO — CC fires scheduling outreach.',
    guard: (job, _event) => {
      if (job.pteGranted !== 'No') return 'REQUEST_TENANT_SCHEDULING requires pteGranted = No';
      if (job.woType !== 'maintenance') return 'REQUEST_TENANT_SCHEDULING only valid for woType = maintenance';
      if (job.missingFields.length > 0) return `Cannot schedule outreach — missing fields: ${job.missingFields.join(', ')}`;
      return null;
    },
  },
  {
    from: 'Needs Info',
    to: 'Ready to Schedule',
    event: 'ADVANCE',
    description: 'Dispatcher fills missing fields; PTE granted or not required — job is ready.',
    guard: (job, event) => {
      const remaining = job.missingFields.filter(
        (f) => !(event as AdvanceEvent).payload.filledFields.includes(f),
      );
      if (remaining.length > 0) return `Still missing: ${remaining.join(', ')}`;
      const pte = (event as AdvanceEvent).payload.pteGranted;
      if (pte === 'No') return 'PTE not granted — use REQUEST_TENANT_SCHEDULING instead';
      return null;
    },
  },

  // ── Awaiting Tenant exits ────────────────────────────────────────────────────
  {
    from: 'Awaiting Tenant',
    to: 'Ready to Schedule',
    event: 'TENANT_SUBMITTED',
    description: 'Tenant submits scheduling page — proposed date/window pre-filled.',
    guard: (job, event) => {
      const e = event as TenantSubmittedEvent;
      if (job.schedulingToken !== e.payload.schedulingToken) return 'Token mismatch';
      if (
        job.schedulingTokenExpiresAt &&
        new Date(e.payload.proposedDate) > new Date(job.schedulingTokenExpiresAt)
      ) {
        return 'Token has expired';
      }
      return null;
    },
  },
  {
    from: 'Awaiting Tenant',
    to: 'Needs Info',
    event: 'TENANT_LINK_EXPIRED',
    description: '48h no response — dispatcher must phone tenant.',
  },

  // ── Ready to Schedule exits ──────────────────────────────────────────────────
  {
    from: 'Ready to Schedule',
    to: 'Scheduled',
    event: 'SCHEDULE',
    description: 'Dispatcher assigns tech + date + arrival window.',
    guard: (job, event) => {
      const e = event as ScheduleEvent;
      if (!e.payload.techId) return 'techId required';
      if (!e.payload.scheduledDate) return 'scheduledDate required';
      if (!e.payload.scheduledWindow) return 'scheduledWindow required';
      if (job.pteGranted === 'No') return 'PTE must be granted before scheduling';
      return null;
    },
  },

  // ── Scheduled exits ──────────────────────────────────────────────────────────
  {
    from: 'Scheduled',
    to: 'In Progress',
    event: 'CLOCK_IN',
    description: 'Tech clocks in at the job site.',
    guard: (_job, event) => {
      const e = event as ClockInEvent;
      if (!e.payload.clockedInAt) return 'clockedInAt timestamp required';
      return null;
    },
  },
  {
    from: 'Scheduled',
    to: 'Awaiting Tenant',
    event: 'RESCHEDULE',
    description: 'Reschedule requires new tenant coordination — new scheduling link issued.',
    guard: (_job, event) => {
      const e = event as RescheduleEvent;
      if (!e.payload.newSchedulingToken) return 'newSchedulingToken required';
      if (!e.payload.tenantEmail) return 'tenantEmail required';
      return null;
    },
  },

  // ── In Progress exits ────────────────────────────────────────────────────────
  {
    from: 'In Progress',
    to: 'Complete',
    event: 'COMPLETE',
    description: 'Tech submits completion attestation.',
    guard: (_job, event) => {
      const e = event as CompleteEvent;
      if (!e.payload.attestedAt) return 'attestedAt timestamp required';
      return null;
    },
  },
] as const;

// ─── Side effects (declared, not executed) ───────────────────────────────────

/**
 * Side effects the service declares after a valid transition.
 * The caller (API route, n8n webhook handler) is responsible for
 * executing them in order. The domain layer never fires I/O directly.
 */
export type SideEffect =
  | { type: 'SEND_SCHEDULING_OUTREACH'; jobId: JobId; tenantEmail: string; token: SchedulingToken }
  | { type: 'SEND_CONFIRMATION'; jobId: JobId; tenantEmail: string; scheduledDate: string; scheduledWindow: ArrivalWindow }
  | { type: 'SEND_RESCHEDULE_LINK'; jobId: JobId; tenantEmail: string; token: SchedulingToken }
  | { type: 'NOTIFY_DISPATCHER_LINK_EXPIRED'; jobId: JobId }
  | { type: 'START_TIME_RECORD'; jobId: JobId; techId: TechId; clockedInAt: string }
  | { type: 'CLOSE_TIME_RECORD'; jobId: JobId; techId: TechId; attestedAt: string };

// ─── Transition result ───────────────────────────────────────────────────────

/**
 * Returned on a successful transition.
 * `previous` + `next` give callers a full audit trail without reading back from the DB.
 */
export interface TransitionResult {
  jobId: JobId;
  previous: JobState;
  next: JobState;
  appliedEvent: JobEventType;
  /** Ordered list of declared side effects — caller executes these. */
  sideEffects: readonly SideEffect[];
  /** Snapshot of the job record after the transition (before DB write). */
  updatedJob: JobStateRecord;
}

// ─── DAL interface (injected) ────────────────────────────────────────────────

/**
 * The only database surface the service touches.
 * The real implementation is jobsRepository in lib/dal/jobs.ts.
 * Tests inject a fake.
 */
export interface JobStateDAL {
  getJobById(jobId: string): Promise<
    | { success: true; job: JobStateRecord }
    | { success: false; error: 'JOB_NOT_FOUND' }
  >;

  updateJob(
    jobId: string,
    updates: Partial<JobStateRecord>,
  ): Promise<
    | { success: true }
    | { success: false; error: string }
  >;
}

// ─── Service interface ───────────────────────────────────────────────────────

/**
 * JobStateService — the single authoritative entry point for all WO state mutations.
 *
 * Hard gates (ADR-004 §Hard Gates):
 *   CLOCK_IN    → valid from Scheduled only
 *   COMPLETE    → valid from In Progress only
 *   SCHEDULE    → valid from Ready to Schedule only
 *   ADVANCE     → valid from Needs Info only
 *
 * No API route, tech app, or n8n workflow may bypass this service to mutate status.
 */
export interface JobStateService {
  /**
   * Apply a domain event to a job.
   *
   * 1. Loads job via DAL.
   * 2. Looks up the matching transition in JOB_STATE_MACHINE.
   * 3. Evaluates the guard (if any).
   * 4. Writes the new state via DAL.
   * 5. Returns TransitionResult with declared side effects.
   *
   * Returns INVALID_TRANSITION if (from, event.type) has no arc in the machine.
   * Returns JOB_NOT_FOUND if the DAL cannot locate the job.
   * Returns MISSING_FIELDS / PTE_REQUIRED for guard failures specific to those errors.
   */
  transition(
    event: JobEvent,
  ): Promise<Result<TransitionResult, JobStateError>>;

  /**
   * Return the set of events legally fireable from a given state.
   * Used by the dispatch UI to enable/disable action buttons without
   * coupling the UI to the transition table directly.
   */
  getValidEvents(state: JobState): readonly JobEventType[];

  /**
   * Return true if `event` is a valid transition from `state`.
   * Synchronous — reads JOB_STATE_MACHINE only, no I/O.
   */
  canTransition(state: JobState, event: JobEventType): boolean;

  /**
   * Return the TransitionDefinition for (state, event), or undefined if no arc exists.
   * Useful for rendering guard-specific help text in the UI.
   */
  getTransition(
    state: JobState,
    event: JobEventType,
  ): TransitionDefinition | undefined;

  /**
   * Return all states that can reach `target` via any event.
   * Used by tests to assert FSM completeness and by the dispatch UI
   * to highlight the path back from a terminal state.
   */
  getPredecessors(target: JobState): readonly JobState[];

  /**
   * Return all states reachable from `source` via any event.
   */
  getSuccessors(source: JobState): readonly JobState[];

  /**
   * Return the full transition table.
   * Primarily for testing and tooling — same reference as JOB_STATE_MACHINE.
   */
  readonly machine: JobStateMachine;
}

// ─── Factory ─────────────────────────────────────────────────────────────────

function applyEvent(
  job: JobStateRecord,
  event: JobEvent,
  nextState: JobState,
): JobStateRecord {
  const base: JobStateRecord = { ...job, state: nextState };
  switch (event.type) {
    case 'ADVANCE':
      return {
        ...base,
        pteGranted: event.payload.pteGranted,
        woType: event.payload.woType,
        missingFields: [],
      };
    case 'REQUEST_TENANT_SCHEDULING':
      return {
        ...base,
        schedulingToken: event.payload.schedulingToken,
        tenantEmail: event.payload.tenantEmail,
      };
    case 'TENANT_SUBMITTED':
      return {
        ...base,
        tenantProposedDate: event.payload.proposedDate,
        tenantProposedWindow: event.payload.proposedWindow,
      };
    case 'TENANT_LINK_EXPIRED':
      return { ...base, schedulingToken: null, schedulingTokenExpiresAt: null };
    case 'SCHEDULE':
      return {
        ...base,
        assignedTechId: event.payload.techId,
        scheduledDate: event.payload.scheduledDate,
        scheduledWindow: event.payload.scheduledWindow,
      };
    case 'RESCHEDULE':
      return {
        ...base,
        schedulingToken: event.payload.newSchedulingToken,
        tenantEmail: event.payload.tenantEmail,
        assignedTechId: null,
        scheduledDate: null,
        scheduledWindow: null,
      };
    case 'CLOCK_IN':
      return { ...base, clockedInAt: event.payload.clockedInAt };
    case 'COMPLETE':
      return { ...base, completedAt: event.payload.attestedAt };
  }
}

function declareSideEffects(
  job: JobStateRecord,
  event: JobEvent,
): readonly SideEffect[] {
  switch (event.type) {
    case 'CLOCK_IN':
      return [
        {
          type: 'START_TIME_RECORD',
          jobId: job.jobId,
          techId: event.payload.techId,
          clockedInAt: event.payload.clockedInAt,
        },
      ];
    case 'COMPLETE':
      return [
        {
          type: 'CLOSE_TIME_RECORD',
          jobId: job.jobId,
          techId: event.payload.techId,
          attestedAt: event.payload.attestedAt,
        },
      ];
    case 'REQUEST_TENANT_SCHEDULING':
      return [
        {
          type: 'SEND_SCHEDULING_OUTREACH',
          jobId: job.jobId,
          tenantEmail: event.payload.tenantEmail,
          token: event.payload.schedulingToken,
        },
      ];
    case 'RESCHEDULE':
      return [
        {
          type: 'SEND_RESCHEDULE_LINK',
          jobId: job.jobId,
          tenantEmail: event.payload.tenantEmail,
          token: event.payload.newSchedulingToken,
        },
      ];
    case 'SCHEDULE':
      return [
        {
          type: 'SEND_CONFIRMATION',
          jobId: job.jobId,
          tenantEmail: job.tenantEmail,
          scheduledDate: event.payload.scheduledDate,
          scheduledWindow: event.payload.scheduledWindow,
        },
      ];
    case 'TENANT_LINK_EXPIRED':
      return [{ type: 'NOTIFY_DISPATCHER_LINK_EXPIRED', jobId: job.jobId }];
    default:
      return [];
  }
}

export function createJobStateService(dal: JobStateDAL): JobStateService {
  return {
    get machine() {
      return JOB_STATE_MACHINE;
    },

    canTransition(state: JobState, event: JobEventType): boolean {
      return JOB_STATE_MACHINE.some((t) => t.from === state && t.event === event);
    },

    getValidEvents(state: JobState): readonly JobEventType[] {
      return JOB_STATE_MACHINE.filter((t) => t.from === state).map((t) => t.event);
    },

    getTransition(
      state: JobState,
      event: JobEventType,
    ): TransitionDefinition | undefined {
      return JOB_STATE_MACHINE.find((t) => t.from === state && t.event === event);
    },

    getPredecessors(target: JobState): readonly JobState[] {
      return [
        ...new Set(
          JOB_STATE_MACHINE.filter((t) => t.to === target).map((t) => t.from),
        ),
      ];
    },

    getSuccessors(source: JobState): readonly JobState[] {
      return [
        ...new Set(
          JOB_STATE_MACHINE.filter((t) => t.from === source).map((t) => t.to),
        ),
      ];
    },

    async transition(
      event: JobEvent,
    ): Promise<Result<TransitionResult, JobStateError>> {
      const jobId = event.payload.jobId;

      const fetched = await dal.getJobById(jobId);
      if (!fetched.success) {
        return { ok: false, error: { code: 'JOB_NOT_FOUND', jobId } };
      }
      const job = fetched.job;

      const arc = JOB_STATE_MACHINE.find(
        (t) => t.from === job.state && t.event === event.type,
      );
      if (!arc) {
        return {
          ok: false,
          error: { code: 'INVALID_TRANSITION', from: job.state, attempted: event.type },
        };
      }

      if (arc.guard) {
        const reason = arc.guard(job, event);
        if (reason !== null) {
          return {
            ok: false,
            error: { code: 'INVALID_TRANSITION', from: job.state, attempted: event.type },
          };
        }
      }

      const updatedJob = applyEvent(job, event, arc.to);
      const writeResult = await dal.updateJob(jobId, updatedJob);
      if (!writeResult.success) {
        return {
          ok: false,
          error: { code: 'INVALID_TRANSITION', from: job.state, attempted: event.type },
        };
      }

      return {
        ok: true,
        value: {
          jobId,
          previous: job.state,
          next: arc.to,
          appliedEvent: event.type,
          sideEffects: declareSideEffects(job, event),
          updatedJob,
        },
      };
    },
  };
}
