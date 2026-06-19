# Phase 17: Job State Machine Seam — Remaining Tasks

**Branch:** `feat/phase-17-job-state-machine`  
**Spec date:** 2026-06-19 (revised — supersedes 2026-06-17 version)  
**ADRs:** ADR-010 (domain location), ADR-014 (boundary rule)  
**Status:** Domain layer COMPLETE. This spec covers only what remains.

---

## What Is Already Done — Do Not Redo

```
tech-pwa/src/domain/job/job-state.ts       ← COMPLETE. 18/18 tests GREEN.
tech-pwa/src/domain/job/__tests__/job-state.test.ts  ← COMPLETE. Do not modify.
```

The `job-state.ts` file contains:
- 6-state `JobState` discriminated union
- 8-arc `JOB_STATE_MACHINE` constant (pure — no side effects)
- `createJobStateService(dal: JobStateDAL)` factory
- `Result<T,E>` type, `JobStateError` union
- `SideEffect` declarations (returned, not executed)
- Branded `JobId`, `TechId`, `SchedulingToken`
- `JobStateDAL` interface (injected — no concrete DB in domain/)

**Read `tech-pwa/src/domain/job/job-state.ts` in full before writing a single line of code.**

---

## Scope Constraint

Touch ONLY the files listed in this spec's task list. Do not:
- Modify `job-state.ts` or `job-state.test.ts`
- Remove existing email trigger calls from PATCH route (Phase 21)
- Refactor adjacent code outside the listed files
- Add new dependencies beyond what's specified
- Create files not listed here

---

## What Remains (this sprint)

1. ESLint boundary rule (ADR-014)
2. `domain/job/index.ts` — narrow public API
3. `lib/dal/job-state-dal.ts` — DAL adapter
4. Refactor `POST /api/field/clock-in` → `CLOCK_IN` transition
5. Refactor `POST /api/field/job/complete` → `COMPLETE` transition
6. Refactor `PATCH /api/jobs/[jobId]` → `SCHEDULE` transition (RtS→Scheduled only)
7. `tsc --noEmit` → diff → STOP
8. Test sprint → STOP
9. Merge after Claude Code clear

---

## Schema Reference (read before writing DAL adapter)

The Neon `jobs` table columns relevant to the FSM:

```typescript
// From tech-pwa/src/lib/schema.ts — pgTable('jobs', {...})
jobId: text('job_id')           // → JobStateRecord.jobId
status: text('status')          // → JobStateRecord.state  (same string values)
pte: text('pte')                // → JobStateRecord.pteGranted ('Yes'|'No'|null→'Not Required')
tech: text('tech')              // → JobStateRecord.assignedTechId
scheduledDate: text('scheduled_date')  // → JobStateRecord.scheduledDate
scheduledTime: text('scheduled_time')  // → JobStateRecord.scheduledWindow (ArrivalWindow)
tenantEmail: text('tenant_email')      // → JobStateRecord.tenantEmail
trackingToken: text('tracking_token')  // → JobStateRecord.schedulingToken
emailType: text('email_type')          // → JobStateRecord.woType (derive)
category: text('category')             // → JobStateRecord.woType (derive, fallback)
```

Columns NOT in the current schema (use null/[] defaults for now):
- `missingFields` → `[]`
- `schedulingTokenExpiresAt` → `null`
- `tenantProposedDate` → `null`
- `tenantProposedWindow` → `null`
- `clockedInAt` → `null` (lives in `timeRecords` table)
- `completedAt` → `null` (lives in `timeRecords` table)

---

## Task 1 — Branch Gate

```bash
git branch --show-current
# must output: feat/phase-17-job-state-machine

git ls-remote --heads origin feat/phase-17-job-state-machine
# must be non-empty

git log main..HEAD --oneline
# must show at least 1 commit (the initial domain files commit)
```

Evidence: paste exact output of all three commands.

---

## Task 2 — ESLint Boundary Rule (ADR-014)

**File to modify:** `tech-pwa/eslint.config.mjs`

Add two config blocks inside the `defineConfig([...])` array, after the existing `globalIgnores` block:

```javascript
// ADR-014 Block 1: domain/ must not import infrastructure
{
  files: ['src/domain/**/*.ts', 'src/domain/**/*.tsx'],
  rules: {
    'no-restricted-imports': ['error', {
      patterns: [
        { group: ['next', 'next/*'], message: 'domain/ must not import Next.js — ADR-014' },
        { group: ['next-auth', 'next-auth/*'], message: 'domain/ must not import next-auth — ADR-014' },
        { group: ['@/lib/db', '@/lib/db/*'], message: 'domain/ must not import Drizzle instance — ADR-014' },
        { group: ['@/lib/schema', '@/lib/schema/*'], message: 'domain/ must not import Drizzle schema — ADR-014' },
        { group: ['react', 'react/*'], message: 'domain/ must not import React — ADR-014' },
      ],
    }],
  },
},

// ADR-014 Block 2: callers must use domain/job index, not internals
{
  files: ['src/app/**/*.ts', 'src/app/**/*.tsx', 'src/lib/**/*.ts', 'src/components/**/*.ts', 'src/components/**/*.tsx'],
  rules: {
    'no-restricted-imports': ['error', {
      patterns: [
        {
          group: ['@/domain/job/job-state', '**/domain/job/job-state'],
          message: 'Import from @/domain/job (index), not @/domain/job/job-state directly — ADR-014',
        },
      ],
    }],
  },
},
```

Acceptance criteria:
- `npm run lint` exits 0 on existing codebase
- Manually verify: temporarily add `import { db } from '@/lib/db'` to `domain/job/job-state.ts` → lint must error → revert

Evidence: paste `npm run lint` output (zero errors or pre-existing errors only — no new ones).

---

## Task 3 — domain/job/index.ts (Narrow Public API)

**File to create:** `tech-pwa/src/domain/job/index.ts`

This is the ONLY file callers import from. Pocock deep-module principle: the public API is narrower than the implementation.

```typescript
// Narrow public API for domain/job — ADR-014 (Pocock deep-module pattern).
// All callers: import from '@/domain/job'
// Never: import from '@/domain/job/job-state' directly

export type {
  JobId,
  TechId,
  SchedulingToken,
  JobState,
  WoType,
  ArrivalWindow,
  JobEvent,
  JobEventType,
  AdvanceEvent,
  RequestTenantSchedulingEvent,
  TenantSubmittedEvent,
  TenantLinkExpiredEvent,
  ScheduleEvent,
  RescheduleEvent,
  ClockInEvent,
  CompleteEvent,
  Result,
  JobStateError,
  JobStateRecord,
  TransitionResult,
  SideEffect,
  JobStateService,
  JobStateDAL,
  TransitionDefinition,
  JobStateMachine,
} from './job-state';

export {
  toJobId,
  toTechId,
  JOB_STATES,
  JOB_STATE_MACHINE,
  createJobStateService,
} from './job-state';
```

Evidence: file created. `npx tsc --noEmit` exits 0.

---

## Task 4 — DAL Adapter

**File to create:** `tech-pwa/src/lib/dal/job-state-dal.ts`

This bridges the Neon `jobs` schema to the `JobStateDAL` interface. No domain logic here — pure mapping.

```typescript
import { db } from '@/lib/db';
import { jobs } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import type {
  JobStateDAL,
  JobStateRecord,
  JobId,
  TechId,
  SchedulingToken,
  ArrivalWindow,
  WoType,
} from '@/domain/job';

function mapPte(raw: string | null | undefined): 'Yes' | 'No' | 'Not Required' {
  if (raw === 'Yes') return 'Yes';
  if (raw === 'No') return 'No';
  return 'Not Required';
}

function mapWoType(emailType: string | null | undefined, category: string | null | undefined): WoType {
  const tag = (emailType ?? category ?? '').toLowerCase();
  if (tag.includes('turnover')) return 'turnover';
  if (tag.includes('inspection')) return 'inspection';
  return 'maintenance';
}

function mapArrivalWindow(raw: string | null | undefined): ArrivalWindow | null {
  if (raw === 'morning' || raw === 'afternoon' || raw === 'late_afternoon') return raw;
  return null;
}

function mapToJobStateRecord(row: typeof jobs.$inferSelect): JobStateRecord {
  return {
    jobId: row.jobId as JobId,
    state: (row.status ?? 'Needs Info') as JobStateRecord['state'],
    woType: mapWoType(row.emailType, row.category),
    pteGranted: mapPte(row.pte),
    assignedTechId: row.tech ? (row.tech as TechId) : null,
    scheduledDate: row.scheduledDate ?? null,
    scheduledWindow: mapArrivalWindow(row.scheduledTime),
    missingFields: [],               // not stored in current schema
    schedulingToken: row.trackingToken ? (row.trackingToken as SchedulingToken) : null,
    schedulingTokenExpiresAt: null,  // column does not exist yet
    tenantProposedDate: null,        // column does not exist yet
    tenantProposedWindow: null,      // column does not exist yet
    clockedInAt: null,               // lives in timeRecords, not jobs
    completedAt: null,               // lives in timeRecords, not jobs
    tenantEmail: row.tenantEmail ?? '',
  };
}

export function makeJobStateDAL(): JobStateDAL {
  return {
    async getJobById(jobId: string) {
      const rows = await db
        .select()
        .from(jobs)
        .where(eq(jobs.jobId, jobId))
        .limit(1);
      if (!rows[0]) return { success: false, error: 'JOB_NOT_FOUND' as const };
      return { success: true, job: mapToJobStateRecord(rows[0]) };
    },

    async updateJob(jobId: string, updates: Partial<JobStateRecord>) {
      const patch: Partial<typeof jobs.$inferInsert> = {};
      if (updates.state !== undefined)           patch.status = updates.state;
      if (updates.pteGranted !== undefined)      patch.pte = updates.pteGranted;
      if (updates.assignedTechId !== undefined)  patch.tech = updates.assignedTechId ?? null;
      if (updates.scheduledDate !== undefined)   patch.scheduledDate = updates.scheduledDate ?? null;
      if (updates.scheduledWindow !== undefined) patch.scheduledTime = updates.scheduledWindow ?? null;
      if (updates.tenantEmail !== undefined)     patch.tenantEmail = updates.tenantEmail;
      if (updates.schedulingToken !== undefined) patch.trackingToken = updates.schedulingToken ?? null;

      if (Object.keys(patch).length === 0) return { success: true };
      await db.update(jobs).set(patch).where(eq(jobs.jobId, jobId));
      return { success: true };
    },
  };
}
```

Evidence: file created. `npx tsc --noEmit` exits 0.

---

## Task 5 — Refactor POST /api/field/clock-in/route.ts

**File:** `tech-pwa/src/app/api/field/clock-in/route.ts`

**What changes:** Replace the direct `db.update(jobs).set({ status: 'In Progress' })` call with an FSM `CLOCK_IN` transition. The time record insert stays — it executes the `START_TIME_RECORD` side effect declared by the FSM.

**Add imports at top:**
```typescript
import { createJobStateService, toJobId, toTechId } from '@/domain/job';
import { makeJobStateDAL } from '@/lib/dal/job-state-dal';
```

**Replace the body after `const { jobId, lat, lng } = parsed.data;`:**

```typescript
const recordId = crypto.randomUUID();
const now = new Date();
const todayLA = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/Los_Angeles',
  year: 'numeric', month: '2-digit', day: '2-digit',
}).format(now);

// FSM transition — validates Scheduled → In Progress, writes status via DAL
const svc = createJobStateService(makeJobStateDAL());
const result = await svc.transition({
  type: 'CLOCK_IN',
  payload: {
    jobId: toJobId(jobId),
    techId: toTechId(session.badge),
    clockedInAt: now.toISOString(),
  },
});

if (!result.ok) {
  const { error } = result;
  if (error.code === 'JOB_NOT_FOUND')
    return NextResponse.json({ success: false, message: 'Job not found' }, { status: 404 });
  if (error.code === 'INVALID_TRANSITION')
    return NextResponse.json(
      { success: false, message: `Cannot clock in: job is currently ${error.from}` },
      { status: 409 }
    );
  return NextResponse.json({ success: false, message: 'Transition failed' }, { status: 400 });
}

// Execute START_TIME_RECORD side effect — insert time record
await db.insert(timeRecords).values({
  recordId,
  jobId,
  techId: session.badge,
  techName: session.name,
  employeeId: session.employeeId,
  clockIn: now,
  status: 'active',
  date: todayLA,
  latIn: lat ?? null,
  lngIn: lng ?? null,
  orgId: 'APT-CA',
});

return NextResponse.json({ success: true, recordId, clockInTime: now.toISOString() });
```

**Remove:** The old `await db.update(jobs).set({ status: 'In Progress' }).where(eq(jobs.jobId, jobId))` line.

**Remove unused import:** `eq` from drizzle-orm (if no longer used in the file after removing the status update).

Evidence:
- Old direct status update line is gone
- `npx tsc --noEmit` exits 0
- File compiles with no new errors

---

## Task 6 — Refactor POST /api/field/job/complete/route.ts

**File:** `tech-pwa/src/app/api/field/job/complete/route.ts`

**What changes:** Replace `db.update(jobs).set({ status: 'Complete' })` with FSM `COMPLETE` transition. Performance history insert stays — it uses job data fetched separately (non-FSM fields not in `JobStateRecord`).

**Add imports at top:**
```typescript
import { createJobStateService, toJobId, toTechId } from '@/domain/job';
import { makeJobStateDAL } from '@/lib/dal/job-state-dal';
```

**Replace the body after `const { recordId, jobId } = parsed.data;`:**

```typescript
const now = new Date();

// Fetch address + category for performance history (non-FSM fields)
const jobRows = await db
  .select({ address: jobs.address, category: jobs.category })
  .from(jobs)
  .where(eq(jobs.jobId, jobId))
  .limit(1);
if (!jobRows[0])
  return NextResponse.json({ success: false, message: 'Job not found' }, { status: 404 });

// FSM transition — validates In Progress → Complete, writes status via DAL
const svc = createJobStateService(makeJobStateDAL());
const result = await svc.transition({
  type: 'COMPLETE',
  payload: {
    jobId: toJobId(jobId),
    techId: toTechId(session.badge),
    attestedAt: now.toISOString(),
  },
});

if (!result.ok) {
  const { error } = result;
  if (error.code === 'JOB_NOT_FOUND')
    return NextResponse.json({ success: false, message: 'Job not found' }, { status: 404 });
  if (error.code === 'INVALID_TRANSITION')
    return NextResponse.json(
      { success: false, message: `Cannot complete: job is currently ${error.from}` },
      { status: 409 }
    );
  return NextResponse.json({ success: false, message: 'Transition failed' }, { status: 400 });
}

// Execute CLOSE_TIME_RECORD side effect
await db.update(timeRecords)
  .set({ status: 'complete' })
  .where(eq(timeRecords.recordId, recordId));

// Performance history
await db.insert(jobPerformanceHistory).values({
  jobId,
  employeeId: session.employeeId,
  techName: session.name,
  address: jobRows[0].address,
  category: jobRows[0].category,
  completedAt: now,
  orgId: 'APT-CA',
});

return NextResponse.json({ success: true });
```

**Remove:** The old `db.update(jobs).set({ status: 'Complete' })` call. Remove the old `db.select().from(jobs)` block that fetched the full job row — replaced by the narrower select above.

Evidence:
- Old direct status update line is gone
- Old full job select is gone (replaced by narrow select for address/category)
- `npx tsc --noEmit` exits 0

---

## Task 7 — Refactor PATCH /api/jobs/[jobId]/route.ts (SCHEDULE arc only)

**File:** `tech-pwa/src/app/api/jobs/[jobId]/route.ts`

**What changes:** The PATCH route handles many field updates. In Phase 17, ONLY the `Ready to Schedule → Scheduled` transition moves through the FSM. All other status changes keep the existing path (explicitly marked for Phase 21).

**Add imports at top:**
```typescript
import { createJobStateService, toJobId, toTechId } from '@/domain/job';
import { makeJobStateDAL } from '@/lib/dal/job-state-dal';
```

**Inside the PATCH handler, after the `updates` object is built and BEFORE the `resolveJobStatus` call, add:**

```typescript
// ── FSM gate: Ready to Schedule → Scheduled ──────────────────────────────────
// Fires when dispatcher assigns tech + date + time on an RtS job.
// The FSM validates, writes status via DAL, and declares SEND_CONFIRMATION side effect.
const willSchedule =
  prevStatus === 'Ready to Schedule' &&
  (updates.tech !== undefined || updates.scheduledDate !== undefined || updates.scheduledTime !== undefined);

if (willSchedule) {
  const effectiveTech = updates.tech ?? jobState.tech;
  const effectiveDate = updates.scheduledDate ?? jobState.scheduledDate;
  const effectiveTime = updates.scheduledTime ?? jobState.scheduledTime;

  if (!effectiveTech || !effectiveDate || !effectiveTime) {
    return NextResponse.json(
      { success: false, message: 'Cannot schedule: tech, date, and time all required' },
      { status: 422 }
    );
  }

  const window = effectiveTime === 'morning' || effectiveTime === 'afternoon' || effectiveTime === 'late_afternoon'
    ? effectiveTime
    : 'morning'; // fallback — scheduledTime values should already match ArrivalWindow

  const svc = createJobStateService(makeJobStateDAL());
  const fsmResult = await svc.transition({
    type: 'SCHEDULE',
    payload: {
      jobId: toJobId(jobId),
      techId: toTechId(effectiveTech),
      scheduledDate: effectiveDate,
      scheduledWindow: window,
    },
  });

  if (!fsmResult.ok) {
    return NextResponse.json(
      { success: false, message: `Cannot schedule: ${fsmResult.error.code}` },
      { status: 409 }
    );
  }

  // FSM wrote status + assignedTechId + scheduledDate + scheduledWindow via DAL.
  // Remove those from the direct-write `updates` to avoid double-write.
  delete updates.status;
  delete updates.tech;
  delete updates.scheduledDate;
  delete updates.scheduledTime;

  // TODO Phase 21: execute fsmResult.value.sideEffects (SEND_CONFIRMATION) instead
  // of resolveEmailTrigger. For now, the existing email block below handles it.
}

// Pre-FSM path: all other status changes (Phase 21 will replace)
if (!willSchedule) {
  const resolvedStatus = resolveJobStatus({ prevStatus: prevStatus as JobStatus, updates, jobState });
  if (resolvedStatus) updates.status = resolvedStatus;
}
```

**Keep unchanged:**
- Auth checks
- `updates` object field mapping (all non-FSM fields)
- `if (Object.keys(updates).length === 0)` early return
- `await db.update(jobs).set(updates).where(eq(jobs.jobId, jobId))` — still runs for non-FSM fields
- Email trigger block (`resolveEmailTrigger`, `sendTenantScheduledEmail`, `sendPteCoordinationEmail`)

Evidence:
- `resolveJobStatus` still present in file (called for non-willSchedule path)
- `npx tsc --noEmit` exits 0
- File has no new TypeScript errors

---

## Task 8 — TypeScript + Diff + Push (STOP)

```bash
cd tech-pwa
npx tsc --noEmit
# MUST exit 0. Zero errors. Fix any errors before continuing.

cd ..
git add \
  tech-pwa/eslint.config.mjs \
  tech-pwa/src/domain/job/index.ts \
  tech-pwa/src/lib/dal/job-state-dal.ts \
  tech-pwa/src/app/api/field/clock-in/route.ts \
  tech-pwa/src/app/api/field/job/complete/route.ts \
  "tech-pwa/src/app/api/jobs/[jobId]/route.ts"

git commit -m "feat(phase-17): ESLint boundary, index.ts, DAL adapter, wire 3 routes to FSM seam"

git push origin feat/phase-17-job-state-machine

git diff main...HEAD > artifacts/ag_diff.txt
git add artifacts/ag_diff.txt
git commit -m "chore: post phase-17 diff for Claude Code review"
git push origin feat/phase-17-job-state-machine
```

Post `artifacts/ag_diff.txt` contents to Claude Code.

**STOP. Do not proceed until Claude Code replies with PASS or BLOCK.**

Evidence:
- Paste `npx tsc --noEmit` output (must be empty)
- Confirm push succeeded with git log showing 2 new commits

---

## Task 9 — Test Sprint (STOP)

### Automated tests

```bash
cd tech-pwa
npx vitest run src/domain/job/__tests__/job-state.test.ts 2>&1
# Must show: 18 passed, 0 failed
```

### Manual smoke tests (dev server running: `npm run dev`)

Use test badge=1, PIN=1234. Find jobs with specific statuses in the dispatch UI.

| # | Action | Expected | Actual (fill in) |
|---|--------|----------|-----------------|
| 1 | Clock in on a `Scheduled` job (tech PWA) | Status → `In Progress`, time record created | ___ |
| 2 | Attempt clock-in on a `Needs Info` job | 409 response: "Cannot clock in: job is currently Needs Info" | ___ |
| 3 | Dispatcher sets tech + date + time on `Ready to Schedule` job via PATCH | Status auto-promotes to `Scheduled` | ___ |
| 4 | Complete an `In Progress` job (tech PWA) | Status → `Complete`, time record closed, performance history inserted | ___ |
| 5 | Attempt complete on a `Scheduled` job | 409 response: "Cannot complete: job is currently Scheduled" | ___ |

### ESLint boundary verification

```bash
cd tech-pwa
# Temporarily add this line to src/domain/job/job-state.ts:
#   import { db } from '@/lib/db';
# Run lint:
npm run lint
# Must show ADR-014 error. Then revert the import.
```

Save all results:
```bash
npx vitest run src/domain/job/__tests__/job-state.test.ts > ../artifacts/ag_test_results.txt 2>&1
```

Kill dev server. Post `artifacts/ag_test_results.txt` + manual smoke test results table to Claude Code.

**STOP. Do not merge until Claude Code replies with "Clear to merge."**

---

## Task 10 — Merge (only after Claude Code clear)

Open PR via browser (gh CLI not authorized on linkstream-hub):  
`https://github.com/linkstream-hub/central-command/pull/new/feat/phase-17-job-state-machine`

Title: `feat(phase-17): job state machine seam — wire CLOCK_IN, COMPLETE, SCHEDULE arcs`

Do NOT merge without explicit "Clear to merge" from Claude Code.

---

## Out of Scope

- Modifying `job-state.ts` or `job-state.test.ts`
- Removing email triggers from PATCH route (Phase 21)
- Other PATCH route status changes beyond RtS→Scheduled (Phase 21)
- Any UI changes
- Adding schema columns for `missingFields`, `schedulingTokenExpiresAt`, etc. (future phase)
- `REQUEST_TENANT_SCHEDULING`, `ADVANCE`, `RESCHEDULE`, `TENANT_SUBMITTED`, `TENANT_LINK_EXPIRED` event wiring (Phase 21)
- GitHub Actions CI setup (post-Phase 17 backlog)

---

## Common Pitfalls

1. **Double-write on PATCH:** If `willSchedule` is true and you forget to `delete updates.tech`, the DAL writes it AND the Drizzle update writes it again. The `delete updates.*` block prevents this.

2. **Wrong import path:** Callers import from `@/domain/job` not `@/domain/job/job-state`. The ESLint rule you're adding will catch this.

3. **`toJobId` throws on blank string:** The route has Zod validation so `jobId` is never blank, but double-check `ClockInSchema` and `JobCompleteSchema` validate `jobId` as non-empty string.

4. **`session.badge` type:** `session.badge` is a string (badge number). `toTechId` accepts string — fine. Do not cast to number.

5. **tsc errors from domain/job/index.ts:** If you get `Module '"./job-state"' has no exported member`, it means the type was not exported from `job-state.ts`. Check the export list in `job-state.ts` — all listed types are exported there.
