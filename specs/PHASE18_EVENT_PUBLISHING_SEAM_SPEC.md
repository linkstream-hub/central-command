# Phase 18: Event Publishing Seam

**Branch:** `feat/phase-18-event-publishing-seam`  
**Spec date:** 2026-06-17  
**ADR:** `docs/adr/ADR-011-event-publishing-seam.md`  
**Scope constraint:** Touch only files listed in task list. Do not modify job-state.ts, DAL, or any file not explicitly listed. Do not remove email triggers from PATCH route until Task 9.

---

## Prerequisites — Verify Before Starting

All must be true before Task 1:

- [x] New Neon account provisioned — new `DATABASE_URL` set in Vercel env vars (jolly-morning)
- [x] n8n Event Bus Router workflow live — `N8N_EVENT_BUS_URL = https://n8n-production-4f36b.up.railway.app/webhook/event-bus`
- [x] n8n Outbox Poller workflow created (INACTIVE — activate after Task 2 migration)
- [ ] `N8N_EVENT_BUS_URL` added to `.env.local` (Brandon — manual)
- [ ] `N8N_EVENT_BUS_URL` added to Vercel env vars (Brandon — Vercel dashboard)
- [ ] Discord `#n8n-execution` webhook URL available (Brandon — confirm channel + webhook)
- [ ] Drizzle migration tooling confirmed working (`npx drizzle-kit push` or `migrate`)

If any prerequisite is false: **STOP. Do not start this sprint.**

---

## Objective

Introduce `EventBus` as the single seam for all domain event publishing. Replace scattered `fetch()` webhook calls and inline email sends with typed `EventBus.publish()` calls. Move email delivery into n8n. Wire outbox pattern for guaranteed delivery.

---

## Reference

Before writing any code, read:
- `docs/adr/ADR-011-event-publishing-seam.md` — full design
- `docs/adr/ADR-007-n8n-as-event-bus.md` — event topology
- `docs/adr/ADR-010-job-state-machine-seam.md` — how JobStateService pairs with EventBus
- `tech-pwa/src/app/api/field/attestation/sign/route.ts` — current webhook call to replace
- `tech-pwa/src/app/api/schedule/lock-and-send/route.ts` — current webhook call to replace
- `tech-pwa/src/app/api/jobs/[jobId]/route.ts` — current email calls to replace
- `tech-pwa/src/lib/email.ts` — Resend functions being deprecated

---

## Task List

### Task 1 — Branch gate
```
git branch --show-current
# must output: feat/phase-18-event-publishing-seam

git ls-remote --heads origin feat/phase-18-event-publishing-seam
# must be non-empty

git log main..HEAD --oneline
# if empty on pre-existing branch → rebase first
```
Also verify prerequisites — paste output of:
```
echo $DATABASE_URL | cut -c1-30    # confirm points to NEW Neon account
echo $N8N_EVENT_BUS_URL            # must be set
```
Evidence: paste output of all commands.

---

### Task 2 — Drizzle migration: `workflow_events` table

**File:** `tech-pwa/drizzle/schema.ts` (add table) + generate migration

```ts
export const workflowEvents = pgTable('workflow_events', {
  id:              uuid('id').primaryKey().defaultRandom(),
  type:            text('type').notNull(),
  payload:         jsonb('payload').notNull(),
  occurredAt:      timestamp('occurred_at', { withTimezone: true }).notNull().defaultNow(),
  status:          text('status').notNull().default('pending'),
  attempts:        integer('attempts').notNull().default(0),
  lastAttemptedAt: timestamp('last_attempted_at', { withTimezone: true }),
  deliveredAt:     timestamp('delivered_at', { withTimezone: true }),
  error:           text('error'),
});
```

Generate + run migration:
```bash
npx drizzle-kit generate
npx drizzle-kit push
```

Evidence: migration file created, `workflow_events` table exists in new Neon (paste `\d workflow_events` output or equivalent).

---

### Task 3 — Create `WorkOrderEvent` types

**File:** `tech-pwa/src/lib/types/events.ts` (new file)

Define full event registry per ADR-011. Include `EventEnvelope<T>` type.

```ts
export type EventEnvelope<T> = {
  id: string
  type: string
  occurredAt: string
  payload: T
}
```

Evidence: file created, `npx tsc --noEmit` exits 0.

---

### Task 4a — Write `event-bus.test.ts` RED first (TDD)

**File:** `tech-pwa/src/lib/services/__tests__/event-bus.test.ts` (new file — write BEFORE implementation)

Write tests using vi.mock for Drizzle db and global fetch. Tests must FAIL before Task 4b.

Required test cases:
```ts
// Mock setup: mock db.insert, db.update, global fetch
describe('EventBus.publish', () => {
  it('inserts pending row into workflow_events', async () => { ... })
  it('attempts immediate delivery via fetch to N8N_EVENT_BUS_URL', async () => { ... })
  it('marks delivered when fetch returns 2xx', async () => { ... })
  it('leaves status pending when fetch fails (outbox handles retry)', async () => { ... })
  it('returns ok.eventId even when fetch fails', async () => { ... })
  it('returns err.DB_WRITE_FAILED when db insert throws', async () => { ... })
})
```

Run: `npx vitest run src/lib/services/__tests__/event-bus.test.ts`

Evidence: all 6 tests FAIL (red) — paste output showing failures.

---

### Task 4b — Implement `EventBus` GREEN

**File:** `tech-pwa/src/lib/services/event-bus.ts` (new file)

Implement `publish(event: WorkOrderEvent): Promise<Result<{ eventId: string }, BusError>>`:

1. Wrap in `EventEnvelope` (generate UUID, set `occurredAt`)
2. Insert into `workflow_events` via Drizzle (`status = 'pending'`)
3. Attempt immediate `fetch(N8N_EVENT_BUS_URL, { method: 'POST', body: envelope })`
4. On 2xx: `UPDATE workflow_events SET status = 'delivered', delivered_at = now()`
5. On failure: leave `status = 'pending'` — log structured error — return `{ ok: { eventId } }`
6. On DB write failure: return `{ err: { code: 'DB_WRITE_FAILED' } }` + POST to Discord `#n8n-execution` webhook

`N8N_EVENT_BUS_URL` must be validated at startup (`if (!process.env.N8N_EVENT_BUS_URL) throw new Error(...)`).

Run: `npx vitest run src/lib/services/__tests__/event-bus.test.ts`

Evidence: all 6 tests PASS (green) — paste output. Then `npx tsc --noEmit` exits 0.

---

### Task 5 — Verify n8n unified webhook workflow (DONE — Claude Code pre-built)

Workflow `CC Event Bus Router` (ID: fpwZXWR9u7nOmiDa) is ACTIVE.
URL: `https://n8n-production-4f36b.up.railway.app/webhook/event-bus`
JSON: `tools/n8n/workflows/cc-event-bus-router.json` (already committed)

Confirm with:
```bash
curl -s -X POST https://n8n-production-4f36b.up.railway.app/webhook/event-bus \
  -H "Content-Type: application/json" \
  -d '{"id":"test","type":"AttestationSigned","occurredAt":"2026-06-20T00:00:00Z","payload":{}}'
# must return {"status":"received",...}
```

Consumer branch routing (email via Resend, Discord alerts) = follow-on Phase 18 iteration.

Evidence: curl returns 200 + JSON body — paste output.

---

### Task 6 — Activate n8n outbox poller (after Task 2 migration)

Workflow `CC Event Bus Outbox Poller` (ID: dshTB3lODDYy0FTP) is already created — INACTIVE.
JSON: `tools/n8n/workflows/cc-event-bus-outbox-poller.json` (already committed)

After Task 2 (drizzle migration) creates `workflow_events` table:
1. Open n8n → Workflows → CC Event Bus Outbox Poller
2. Toggle to ACTIVE
3. Confirm schedule shows "Every 5 minutes"

Do NOT activate before Task 2 — table doesn't exist yet.

Evidence: workflow ACTIVE in n8n — paste confirmation.

---

### Task 7 — Replace `fetch()` in attestation/sign

**File:** `tech-pwa/src/app/api/field/attestation/sign/route.ts`

Replace:
```ts
fetch(process.env.N8N_COMPLIANCE_WEBHOOK_URL, { ... }).catch(...)
```
With:
```ts
await EventBus.publish({ type: 'AttestationSigned', jobId, techId, mealCompliant, restCompliant, shiftDurationMinutes })
```

Remove `N8N_COMPLIANCE_WEBHOOK_URL` reference.

Evidence: old `fetch()` removed, `npx tsc --noEmit` exits 0.

---

### Task 8 — Replace `fetch()` in lock-and-send

**File:** `tech-pwa/src/app/api/schedule/lock-and-send/route.ts`

Replace:
```ts
fetch(process.env.N8N_LOCK_SEND_WEBHOOK_URL, { ... }).catch(...)
```
With:
```ts
await EventBus.publish({ type: 'DispatchSent', date, techs, sentBy, sentAt })
```

Remove `N8N_LOCK_SEND_WEBHOOK_URL` reference.

Evidence: old `fetch()` removed, `npx tsc --noEmit` exits 0.

---

### Task 9 — Replace email calls in PATCH /jobs/:id

**File:** `tech-pwa/src/app/api/jobs/[jobId]/route.ts`

Replace:
```ts
sendTenantScheduledEmail(...)
sendPteCoordinationEmail(...)
```
With:
```ts
await EventBus.publish({ type: 'WorkOrderScheduled', jobId, techId, ... })
// or
await EventBus.publish({ type: 'PteRequired', jobId, pmEmail, ... })
```

Do NOT delete `lib/email.ts` yet — verify n8n email delivery working in Task 11 first.

Evidence: inline Resend calls removed from route, `npx tsc --noEmit` exits 0.

---

### Task 10 — Wire EventBus into JobStateService callers

**File:** `tech-pwa/src/app/api/jobs/[jobId]/route.ts`

After `JobStateService.transition()` returns `{ ok: { job, transitionEvent } }`:
```ts
const workOrderEvent = mapTransitionToEvent(transitionEvent, job)
if (workOrderEvent) await EventBus.publish(workOrderEvent)
```

Create `mapTransitionToEvent()` helper in route file — maps `JobTransitionEvent` → `WorkOrderEvent | null` (not all transitions emit events).

Evidence: mapping wired, `npx tsc --noEmit` exits 0.

---

### Task 11 — TypeScript + diff + push (STOP)

```bash
npx tsc --noEmit
# must exit 0 — zero errors

git diff main...HEAD > artifacts/ag_diff.txt
git add artifacts/ag_diff.txt
git commit -m "chore: add Phase 18 diff artifact"
git push
```

Post diff to Claude Code. **STOP. Wait for diff review.**

Evidence: paste `npx tsc --noEmit` output + confirm push succeeded.

---

### Task 12 — Test sprint (STOP)

**Automated:**
```bash
npx vitest run tech-pwa/src/lib/services/event-bus.test.ts
# Write test file if not exists — mock DB + mock fetch, verify:
# - publish() inserts row into workflow_events
# - publish() attempts immediate delivery
# - publish() returns ok even when fetch fails
# - publish() returns err when DB write fails
```

**Manual smoke (dev server + new n8n running):**
1. Sign attestation → check `workflow_events` table: row with `type = 'AttestationSigned'`, `status = 'delivered'`
2. Dispatch lock-and-send → check `workflow_events` table: row with `type = 'DispatchSent'`, `status = 'delivered'`
3. Scheduler sets tech + date + time on job → check tenant receives email (n8n `WorkOrderScheduled` consumer)
4. Take n8n offline momentarily → publish event → confirm `status = 'pending'` in table → bring n8n back → confirm poller delivers + status → `delivered`

Document each: **expected → actual**.

Save:
```bash
npx vitest run > artifacts/ag_test_results.txt 2>&1
```

Post to Claude Code. **STOP. Wait for test review.**

---

### Task 13 — Cleanup: remove dead env vars + `lib/email.ts` deprecation

Only after Task 12 passes:
- Remove `N8N_COMPLIANCE_WEBHOOK_URL` from Vercel env vars
- Remove `N8N_LOCK_SEND_WEBHOOK_URL` from Vercel env vars  
- Add `@deprecated` JSDoc to `sendTenantScheduledEmail()` and `sendPteCoordinationEmail()` in `lib/email.ts` — do not delete yet (Phase 18 DAL cleanup sprint removes dead code)

Evidence: Vercel env vars removed, deprecation comments added.

---

### Task 14 — Merge

Only after Claude Code "Clear to merge."
```bash
gh pr merge --squash
```

---

## Out of Scope

- Deleting `lib/email.ts` (Phase 18 DAL cleanup)
- `workflow_events` cleanup job for rows > 90 days (note as GitHub issue, execute later)
- Moving `StaleJobDetected` / `WcCodeMissing` sentinel alerts out of n8n sentinel workflow into EventBus (future refactor — sentinels already work)
- `WorkOrderCompleted` consumer (financial trigger — placeholder in Switch node only)
- After-hours delivery window expansion
