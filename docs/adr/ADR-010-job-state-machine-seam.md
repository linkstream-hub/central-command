# ADR-010: Job State Machine Seam — Unified Transition Gateway

**Status:** Accepted  
**Date:** 2026-06-17  
**Deciders:** Brandon Bittner  

---

## Context

ADR-004 defines an 8-state FSM for Work Order status with explicit gates (PTE required before scheduling, tech + date + time required for `Scheduled`). However, the enforcement of these rules is fragmented across four independent call sites with no unified entry point:

1. **`lib/dal/jobs.ts:updateJob()`** — enforces PTE gate only
2. **`app/api/jobs/[jobId]/route.ts`** — calls `resolveJobStatus()` for auto-transition; fires email side effects
3. **`app/api/field/clock-in/route.ts`** — sets `In Progress` directly with no FSM validation
4. **`app/api/field/job/complete/route.ts`** — sets `Complete` directly with no FSM validation

`lib/job-transitions.ts` exists but most callers do not use it. Deletion test: removing `job-transitions.ts` would not prevent clock-in or complete from setting illegal states — those routes bypass it entirely.

Consequences of the fragmented state:
- A job in `Needs Review` can be clocked into `In Progress` via the field route
- A job can transition to `Complete` without passing through `In Progress`
- Adding a new state or gate requires editing 4+ files with no single source of authority
- `job-transitions.test.ts` tests logic that most callers ignore

---

## Decision

Introduce `JobStateService` as the single seam for all Work Order status transitions.

**Interface:**

```ts
type JobTransitionEvent =
  | { type: 'UpdateFields'; updates: Partial<JobUpdate> }
  | { type: 'ClockIn' }
  | { type: 'Complete' }
  | { type: 'Archive' }

type TransitionError =
  | { code: 'INVALID_TRANSITION'; from: JobStatus; attempted: JobStatus }
  | { code: 'PTE_REQUIRED'; jobId: string }
  | { code: 'JOB_NOT_FOUND'; jobId: string }
  | { code: 'MISSING_FIELDS'; required: string[] }

// Result<T, E> — no throws
transition(
  jobId: string,
  event: JobTransitionEvent
): Promise<Result<{ job: Job; transitionEvent: JobTransitionEvent }, TransitionError>>
```

**What the seam owns:**
- Reads current job state via `DAL.getJobById()`
- Validates event is legal for current state (full 8-state transition table)
- Enforces PTE gate for `UpdateFields` targeting `Ready to Schedule` or `Scheduled`
- Enforces required-fields gate for `Scheduled` (tech + date + time)
- Applies auto-promotion: `UpdateFields` with all three fields → promotes to `Scheduled`
- Writes new state via new narrow DAL method `DAL.updateJobStatus()`
- Returns `Result<{ job, transitionEvent }, TransitionError>` — no side effects beyond DB write

**What the seam does NOT own:**
- Email sending (belongs to EventBus — ADR-010 pairs with ADR-011 once event publishing seam is built)
- n8n webhook calls (same)
- Arbitrary field updates unrelated to state (dispatcher edits to notes, WC code, etc. — those stay in `updateJob()`)

**DAL boundary:**

A new narrow method `DAL.updateJobStatus(jobId, status, relatedFields?)` is added. This method only writes status + fields that carry state-machine meaning (`tech`, `scheduledDate`, `scheduledTime`, `dispatchSentAt`). `updateJob()` is deleted in Phase 17 — it was dead code (no live callers; see ADR-012). The PATCH route calls `db.update(jobs)` directly for non-FSM field edits.

**Error model:**

`Result<T, E>` — callers pattern-match on error code, return appropriate HTTP status. No try/catch propagation.

```
INVALID_TRANSITION  → 409 Conflict
PTE_REQUIRED        → 422 Unprocessable Entity
JOB_NOT_FOUND       → 404 Not Found
MISSING_FIELDS      → 422 Unprocessable Entity
```

**File location:** `tech-pwa/src/domain/job/job-state.ts`

**Domain layer rule:** `domain/` contains pure business logic only. No Next.js imports (`next/headers`, `next/server`, etc.), no direct DB calls, no HTTP concerns. DAL access goes through the injected `DAL` interface. ESLint enforces this boundary — see ADR-014.

**Reference implementation:** `open-fsm/packages/core/src/services/job.service.ts` — same stack (TypeScript + Drizzle + Postgres). Port `VALID_TRANSITIONS` map and test suite. Do not rebuild from scratch.

---

## What This ADR Does Not Change

- The 8 states defined in ADR-004 are unchanged
- The PTE gate logic is unchanged — only its location moves from DAL into the seam
- `updateJob()` in the DAL is deleted (dead code — see ADR-012), not preserved
- Communications (email, n8n) remain out of scope for this seam — they belong in the event publishing seam (Candidate 2 from the architecture review)

---

## Consequences

**Positive:**
- Single entry point for all status changes — illegal transitions impossible regardless of which route calls
- Adding a new state requires editing one file (`job-state.ts`) instead of 4+
- `job-transitions.test.ts` now covers all callers by testing the seam directly
- `Result<T, E>` error model forces callers to handle both paths at compile time
- Clock-in on a `Needs Review` job returns `INVALID_TRANSITION` instead of silently corrupting state

**Negative / Constraints:**
- Three API routes must be updated to call the seam (`PATCH /jobs/:id`, `POST /field/clock-in`, `POST /field/job/complete`)
- Email triggers currently inline in `PATCH /jobs/:id` must be temporarily preserved there until ADR-011 (event publishing seam) ships — do not delete them during this sprint
- `open-fsm` reference implementation uses `InvalidStateTransitionError` (thrown) not `Result<T,E>` — adapt the transition table and tests but use `Result` for the error model
