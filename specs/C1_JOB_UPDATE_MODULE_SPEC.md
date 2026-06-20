# C1: Job Update Module — Deepening Spec

## Goal

Extract PATCH `/api/jobs/[jobId]` business logic into a deep `apply()` function.
Route shrinks from 212 lines to ~15 (auth + HTTP only). All mutation logic moves into the module.
Behavior is **preserved exactly** — this is a refactor, not a feature change.

Refs: ADR-004 (FSM hard gates), ADR-008 (modular monolith), ADR-010 (job state machine seam)

---

## Files

```
NEW   tech-pwa/src/app/api/jobs/[jobId]/job-update.ts
NEW   tech-pwa/src/app/api/jobs/[jobId]/__tests__/job-update.test.ts  ← RED tests (write first)
NEW   tech-pwa/src/lib/side-effects/email-executor.ts                 ← real SideEffectExecutor
NEW   tech-pwa/src/lib/side-effects/fake-executor.ts                  ← test double
MOD   tech-pwa/src/app/api/jobs/[jobId]/route.ts                      ← shrinks to ~15 lines
```

---

## Interface contracts

### SideEffectExecutor (port)

```typescript
export interface SideEffectExecutor {
  execute(effect: SideEffect): Promise<void>;
}
```

No `isApiKeyAuth` on the executor — the module gates external comms before calling it.
The executor is a pure "fire this effect" port. Phase 18 swaps the implementation; the port never changes.

### Error types

```typescript
export type JobUpdateError =
  | { code: 'JOB_NOT_FOUND' }
  | { code: 'SCHEDULE_INCOMPLETE'; missing: string[] }
  | { code: 'FSM_VIOLATION'; reason: string };
```

HTTP translation lives in the route:

```typescript
const HTTP_STATUS: Record<JobUpdateError['code'], number> = {
  JOB_NOT_FOUND:        404,
  SCHEDULE_INCOMPLETE:  422,
  FSM_VIOLATION:        409,
};
```

### Success types

```typescript
export type JobUpdateSuccess =
  | { type: 'NO_OP' }
  | { type: 'UPDATED'; warning?: string };
```

`NO_OP` — body had no recognized fields. Route returns `{ success: true, message: 'No updates provided' }`.
`UPDATED` — at least one field written. `warning` set if executor threw but DB write succeeded.

### apply() signature

```typescript
export async function apply(
  jobId: string,
  body: unknown,
  ctx: { isApiKeyAuth: boolean },
  executor: SideEffectExecutor
): Promise<Result<JobUpdateSuccess, JobUpdateError>>
```

---

## Route — target state (~15 lines)

```typescript
import { apply } from './job-update';
import { EmailSideEffectExecutor } from '@/lib/side-effects/email-executor';

const HTTP_STATUS: Record<JobUpdateError['code'], number> = {
  JOB_NOT_FOUND:        404,
  SCHEDULE_INCOMPLETE:  422,
  FSM_VIOLATION:        409,
};

export async function PATCH(req: Request, { params }: { params: Promise<{ jobId: string }> }) {
  const session = await auth();
  const apiKey = req.headers.get('x-api-key');
  const isApiKeyAuth = !session && apiKey === process.env.DASHBOARD_API_KEY;
  if (!session && !isApiKeyAuth)
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  const { jobId } = await params;
  const body = await req.json();
  const result = await apply(jobId, body, { isApiKeyAuth }, new EmailSideEffectExecutor());

  if (!result.ok)
    return NextResponse.json({ success: false, message: result.error.code },
      { status: HTTP_STATUS[result.error.code] });

  if (result.value.type === 'NO_OP')
    return NextResponse.json({ success: true, message: 'No updates provided' });

  return NextResponse.json({
    success: true,
    ...(result.value.warning ? { warning: result.value.warning } : {}),
  });
}
```

---

## Module internal flow

```
apply(jobId, body, ctx, executor)
  │
  ├─ 1. Map body → updates (20 field mappings — same as route lines 76-101)
  │
  ├─ 2. If no recognized fields → return { ok: true, value: { type: 'NO_OP' } }
  │
  ├─ 3. SELECT current job state from DB
  │      If not found → return { ok: false, error: { code: 'JOB_NOT_FOUND' } }
  │
  ├─ 4. willSchedule detection (same logic as route lines 109-111)
  │
  ├─ 4a. willSchedule=true → FSM path
  │      a. Validate effective tech+date+time present
  │         → SCHEDULE_INCOMPLETE if not
  │      b. createJobStateService(makeJobStateDAL()).transition(SCHEDULE event)
  │         → FSM_VIOLATION if !fsmResult.ok
  │      c. Remove tech/date/time/status from updates (FSM wrote them)
  │      d. If !ctx.isApiKeyAuth → executor.execute each fsmResult.value.sideEffect
  │         (catches executor throws → sets warning, does not revert DB write)
  │
  ├─ 4b. willSchedule=false → legacy path
  │      resolveJobStatus({ prevStatus, updates, jobState })
  │      If resolvedStatus → updates.status = resolvedStatus
  │      If status changed AND !ctx.isApiKeyAuth:
  │        resolveEmailTrigger → construct SideEffect → executor.execute()
  │        (catches executor throws → sets warning)
  │
  ├─ 5. If remaining updates → db.update(jobs).set(updates).where(jobId)
  │
  └─ 6. return { ok: true, value: { type: 'UPDATED', warning? } }
```

---

## Behavior contracts (all must be RED before implementation starts)

| # | Scenario | Input | Expected |
|---|---|---|---|
| 1 | Empty body | `{}` | `{ type: 'NO_OP' }`, no DB write, no executor call |
| 2 | Unrecognized fields only | `{ foo: 'bar' }` | `{ type: 'NO_OP' }` |
| 3 | FSM SCHEDULE — success | RtS job, pte=Yes, body has tech+date+time | `{ type: 'UPDATED' }`, DB=Scheduled, SEND_CONFIRMATION executed |
| 4 | FSM SCHEDULE — incomplete | RtS job, body has tech only (no date/time in DB) | `{ code: 'SCHEDULE_INCOMPLETE', missing: ['scheduledDate','scheduledTime'] }` |
| 5 | FSM_VIOLATION | RtS job, pte=No, body has tech+date+time | `{ code: 'FSM_VIOLATION' }`, no executor call |
| 6 | Non-FSM field update | Needs Info job, body has rmName+notes | `{ type: 'UPDATED' }`, DB updated, no executor call |
| 7 | Non-FSM status change | Scheduled job, body has `status: 'In Progress'` | `{ type: 'UPDATED' }`, DB=In Progress |
| 8 | isApiKeyAuth suppresses effects | RtS job, pte=Yes, isApiKeyAuth=true, body schedules | `{ type: 'UPDATED' }`, DB=Scheduled, executor NOT called |
| 9 | JOB_NOT_FOUND | Unknown jobId | `{ code: 'JOB_NOT_FOUND' }` |
| 10 | Executor throws → warning | RtS job, executor configured to throw | `{ type: 'UPDATED', warning: '...' }`, DB=Scheduled (status persisted) |

---

## Phase 18 seam

Replace `EmailSideEffectExecutor` with `EventBusSideEffectExecutor` at `lib/side-effects/event-bus-executor.ts`.

**Zero changes** to `job-update.ts`, its tests, or the `SideEffectExecutor` interface.
Phase 18 merges AFTER this PR.

---

## Constraints (do not violate)

- `resolveJobStatus()` is NOT deleted — Candidate 2 is a separate PR
- GET handler in `route.ts` is NOT touched
- `lib/job-mapper.ts` and `lib/dal/mappers.ts` are NOT touched (Candidate 4 scope)
- Auth logic stays in the route — module receives `isApiKeyAuth` in ctx, does not call `auth()`
- Module does NOT import from `next/server` — stays transport-agnostic
