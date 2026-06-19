# Phase 17: Job State Machine Seam

**Branch:** `feat/phase-17-job-state-machine`  
**Spec date:** 2026-06-17  
**ADR:** `docs/adr/ADR-010-job-state-machine-seam.md`  
**Scope constraint:** Touch only files listed in task list. Do not refactor adjacent code or remove email triggers from PATCH route. `updateJob()` is deleted (dead code per ADR-012) — not modified.

---

## Objective

Introduce `JobStateService` as the single seam for all Work Order status transitions. All routes that set job status must go through this seam. Clock-in and complete routes currently bypass FSM entirely — this sprint closes that gap.

---

## Reference

Before writing any code, read:
- `open-fsm/packages/core/src/services/job.service.ts` — port `VALID_TRANSITIONS` map and test patterns
- `docs/adr/ADR-004-work-order-status-lifecycle.md` — the 8-state FSM definition
- `docs/adr/ADR-010-job-state-machine-seam.md` — this sprint's decision record
- `tech-pwa/src/lib/job-transitions.ts` — current (incomplete) transition logic to absorb
- `tech-pwa/src/lib/dal/jobs.ts` — PTE gate to migrate into seam
- `tech-pwa/src/app/api/jobs/[jobId]/route.ts` — auto-transition + email logic
- `tech-pwa/src/app/api/field/clock-in/route.ts` — direct status set to migrate
- `tech-pwa/src/app/api/field/job/complete/route.ts` — direct status set to migrate

---

## Task List

### Task 1 — Branch gate
```
git branch --show-current
# must output: feat/phase-17-job-state-machine

git ls-remote --heads origin feat/phase-17-job-state-machine
# must be non-empty

git log main..HEAD --oneline
# if empty on pre-existing branch → rebase first
```
Evidence: paste output of all three commands.

---

### Task 2 — Read open-fsm reference
Read `open-fsm/packages/core/src/services/job.service.ts` in full.  
Evidence: paste the `VALID_TRANSITIONS` map from that file as confirmation you read it.

---

### Task 3 — Create `TransitionError` and `JobTransitionEvent` types

**File:** `tech-pwa/src/lib/types/job-transitions.ts` (new file)

Define:
```ts
export type JobTransitionEvent =
  | { type: 'UpdateFields'; updates: Partial<JobUpdate> }
  | { type: 'ClockIn' }
  | { type: 'Complete' }
  | { type: 'Archive' }

export type TransitionError =
  | { code: 'INVALID_TRANSITION'; from: JobStatus; attempted: JobStatus }
  | { code: 'PTE_REQUIRED'; jobId: string }
  | { code: 'JOB_NOT_FOUND'; jobId: string }
  | { code: 'MISSING_FIELDS'; required: string[] }
```

Also define `Result<T, E>` if not already present in the codebase (check `lib/` first).  
Evidence: file created, `npx tsc --noEmit` exits 0.

---

### Task 4 — Add `DAL.updateJobStatus()` and delete dead `updateJob()`

**File:** `tech-pwa/src/lib/dal/jobs.ts`

**4a — Add new export:**
```ts
export async function updateJobStatus(
  jobId: string,
  status: JobStatus,
  relatedFields?: {
    tech?: string | null
    scheduledDate?: string | null
    scheduledTime?: string | null
    dispatchSentAt?: string | null
  }
): Promise<Job>
```

Only writes `status` + the four state-machine-relevant fields.

**4b — Delete `jobsRepository.updateJob()`:**  
The method has zero live callers (confirmed: ADR-012). Delete the entire function and its field-mapping block. Also remove the `updateJob` key from the `jobsRepository` export object if it was the only remaining key — if other methods remain, just remove `updateJob`.

Evidence: `updateJobStatus` exported, `updateJob` absent from file, `npx tsc --noEmit` exits 0.

---

### Task 5 — Create `JobStateService`

**File:** `tech-pwa/src/lib/services/job-state.ts` (new file)

Implement:
```ts
export async function transition(
  jobId: string,
  event: JobTransitionEvent
): Promise<Result<{ job: Job; transitionEvent: JobTransitionEvent }, TransitionError>>
```

Logic sequence:
1. `DAL.getJobById(jobId)` → if null → return `{ err: { code: 'JOB_NOT_FOUND', jobId } }`
2. Compute target status from event type + current state using `VALID_TRANSITIONS` map (ported from open-fsm)
3. If transition not in `VALID_TRANSITIONS[currentStatus]` → return `{ err: { code: 'INVALID_TRANSITION', from, attempted } }`
4. If `UpdateFields` targeting `Ready to Schedule` or `Scheduled` and `pteGranted` is not `'Yes'` or `'Not Required'` → return `{ err: { code: 'PTE_REQUIRED', jobId } }`
5. If `UpdateFields` and computed status is `Scheduled` but tech/date/time missing → return `{ err: { code: 'MISSING_FIELDS', required: [...] } }`
6. Auto-promote: if `UpdateFields` sets all of tech + scheduledDate + scheduledTime and current status is `Ready to Schedule` → target becomes `Scheduled`
7. `DAL.updateJobStatus(jobId, targetStatus, relatedFields)` → return `{ ok: { job, transitionEvent: event } }`

Evidence: file created, `npx tsc --noEmit` exits 0.

---

### Task 6 — Update `PATCH /api/jobs/[jobId]`

**File:** `tech-pwa/src/app/api/jobs/[jobId]/route.ts`

Replace inline PTE gate + `resolveJobStatus()` call with `JobStateService.transition()`.  
Pattern-match on `TransitionError` codes → return appropriate HTTP status.  
**PRESERVE** existing email trigger calls (`sendTenantScheduledEmail`, `sendPteCoordinationEmail`) — do not remove. They stay inline until ADR-011 ships.  
Evidence: route updated, `npx tsc --noEmit` exits 0, old `resolveJobStatus()` call removed.

---

### Task 7 — Update `POST /api/field/clock-in`

**File:** `tech-pwa/src/app/api/field/clock-in/route.ts`

Replace direct `status = 'In Progress'` DB set with:
```ts
const result = await transition(jobId, { type: 'ClockIn' })
if (!result.ok) {
  // INVALID_TRANSITION → 409, JOB_NOT_FOUND → 404
}
```
Evidence: route updated, direct status set removed, `npx tsc --noEmit` exits 0.

---

### Task 8 — Update `POST /api/field/job/complete`

**File:** `tech-pwa/src/app/api/field/job/complete/route.ts`

Replace direct `status = 'Complete'` DB set with:
```ts
const result = await transition(jobId, { type: 'Complete' })
if (!result.ok) { ... }
```
Evidence: route updated, direct status set removed, `npx tsc --noEmit` exits 0.

---

### Task 9 — Expand `job-transitions.test.ts`

**File:** `tech-pwa/src/lib/job-transitions.test.ts`

Replace existing `resolveJobStatus()` tests with `transition()` tests. Cover:

| Test | Event | Current Status | Expected |
|------|-------|----------------|----------|
| Legal clock-in | `ClockIn` | `Scheduled` | `ok: { job.status = 'In Progress' }` |
| Illegal clock-in | `ClockIn` | `Needs Review` | `err: INVALID_TRANSITION` |
| PTE gate blocks | `UpdateFields` → `Ready to Schedule` | `Needs Review`, pteGranted=null | `err: PTE_REQUIRED` |
| PTE gate passes | `UpdateFields` → `Ready to Schedule` | `Needs Review`, pteGranted='Yes' | `ok` |
| Auto-promote fires | `UpdateFields` with tech+date+time | `Ready to Schedule` | `ok: { job.status = 'Scheduled' }` |
| Missing fields block | `UpdateFields` without time | `Ready to Schedule` | `err: MISSING_FIELDS` |
| Complete on non-InProgress | `Complete` | `Scheduled` | `err: INVALID_TRANSITION` |
| Archive terminal | `Archive` | `Complete` | `ok: { job.status = 'Archived' }` |

Mock DAL (`getJobById`, `updateJobStatus`) — no real DB in unit tests.  
Evidence: all 8 tests pass, `npx tsc --noEmit` exits 0.

---

### Task 10 — TypeScript + diff + push (STOP)

```bash
npx tsc --noEmit
# must exit 0 — zero errors

git diff main...HEAD > artifacts/ag_diff.txt
git add artifacts/ag_diff.txt
git commit -m "chore: add Phase 17 diff artifact"
git push
```

Post diff to Claude Code. **STOP. Wait for diff review.**

Evidence: paste `npx tsc --noEmit` output (must be empty/zero errors) + confirm push succeeded.

---

### Task 11 — Test sprint (STOP)

Run test suite against the 8 new unit tests + any existing tests in scope:
```bash
npx vitest run tech-pwa/src/lib/job-transitions.test.ts
```

Save results:
```bash
npx vitest run tech-pwa/src/lib/job-transitions.test.ts > artifacts/ag_test_results.txt 2>&1
```

Manual smoke test (dev server running):
1. Load a job in `Scheduled` status → clock in via TechPWA → confirm status moves to `In Progress`
2. Attempt to clock in a `Needs Review` job → confirm 409 response
3. Dispatcher sets tech + date + time on `Ready to Schedule` job → confirm auto-promotes to `Scheduled`

Document each with: **expected → actual** (exact text or screenshot description).

Post test results to Claude Code. **STOP. Wait for test review.**

---

### Task 12 — Merge

Only after Claude Code "Clear to merge."  
```bash
gh pr merge --squash
```

---

## Out of Scope

- Removing email triggers from PATCH route (waits for ADR-011 event publishing seam)
- `source: 'neon' as const` field removal — deferred to `chore/remove-neon-source-field` PR post Phase 17 (ADR-012)
- Stats computation duplication (Candidate 4 — separate sprint)
- Any UI changes to job status chips or filters
- `createManualJob()` — initialization, not a transition. Status set conditionally: `Scheduled` if tech+date present, else `Ready to Schedule`. Correct behavior; do not route through FSM (ADR-012)
