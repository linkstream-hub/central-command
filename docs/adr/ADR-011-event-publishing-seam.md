# ADR-011: Event Publishing Seam — Outbox Pattern with n8n Unified Webhook

**Status:** Accepted — Pending infra restructure (new Neon account + new Railway n8n)  
**Date:** 2026-06-17  
**Deciders:** Brandon Bittner  
**Pairs with:** ADR-010 (Job State Machine Seam), ADR-007 (n8n as Event Bus)

---

## Context

ADR-007 defines the event topology: domains publish events, n8n routes to consumers. The current implementation does the opposite — each API route independently fires a `fetch()` call to a hardcoded env var URL with `.catch(console.error)`. No event registry, no typed envelope, no retry, no delivery visibility.

Consequences:
- The compliance monitor webhook (`N8N_COMPLIANCE_WEBHOOK_URL`) has been silently broken since April 26 — 52+ days with no alert
- Two call sites use different payload shapes for different event types
- Adding a new consumer requires editing application code, not wiring an n8n branch
- No idempotency — n8n retry on failure can cause duplicate processing

This ADR is deferred until infra restructure completes (new Neon account + new Railway n8n) because:
1. The outbox table requires a new Neon schema — build on the new account, not the exhausted one
2. Email workflows in n8n must be rebuilt on the new Railway instance anyway
3. The background poller requires a Railway resource budget decision to avoid repeating the sentinel cost incident

---

## Decision

### EventBus Module

**File:** `tech-pwa/src/lib/services/event-bus.ts`

**Interface:**
```ts
type WorkOrderEvent =
  | { type: 'AttestationSigned';   jobId: string; techId: string; mealCompliant: boolean; restCompliant: boolean; shiftDurationMinutes: number }
  | { type: 'WorkOrderScheduled';  jobId: string; techId: string; scheduledDate: string; scheduledTime: string; tenantEmail?: string; pmEmail?: string; propertyAddress: string }
  | { type: 'PteRequired';         jobId: string; propertyAddress: string; pmEmail: string; tenantEmail?: string }
  | { type: 'DispatchSent';        date: string; techs: TechPayload[]; sentBy: string; sentAt: string }
  | { type: 'WorkOrderCompleted';  jobId: string; techId: string; completedAt: string }
  | { type: 'StaleJobDetected';    jobId: string; propertyAddress: string; daysSinceCreated: number }
  | { type: 'WcCodeMissing';       jobId: string; propertyAddress: string }

type BusError =
  | { code: 'DB_WRITE_FAILED'; error: string }

// Envelope wrapping happens inside publish() — callers pass WorkOrderEvent directly
publish(event: WorkOrderEvent): Promise<Result<{ eventId: string }, BusError>>
```

**publish() behavior:**
1. Wrap event in `EventEnvelope` — generate UUID `id`, set `occurredAt = now()`
2. Insert into `workflow_events` table (`status = 'pending'`)
3. Attempt immediate delivery to `N8N_EVENT_BUS_URL` (single unified webhook)
4. On 2xx: update `status = 'delivered'`, `delivered_at = now()` — return `{ ok: { eventId } }`
5. On failure: leave `status = 'pending'` — outbox poller handles retry — return `{ ok: { eventId } }` (publish succeeds if DB write succeeds; delivery is eventual)
6. On DB write failure: return `{ err: { code: 'DB_WRITE_FAILED' } }` + Resend email to brandon@aptmaintenanceinc.com

### Outbox Table

```sql
CREATE TABLE workflow_events (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  type        TEXT        NOT NULL,
  payload     JSONB       NOT NULL,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status      TEXT        NOT NULL DEFAULT 'pending',  -- pending | delivered | failed
  attempts    INT         NOT NULL DEFAULT 0,
  last_attempted_at TIMESTAMPTZ,
  delivered_at      TIMESTAMPTZ,
  error             TEXT
);

CREATE INDEX idx_workflow_events_status ON workflow_events (status, occurred_at);
```

Drizzle migration: `tech-pwa/drizzle/migrations/XXXX_add_workflow_events.sql`

### Outbox Poller — n8n Scheduled Workflow

**Not a Next.js background job.** n8n owns the poller — avoids the sentinel cost incident pattern.

- Schedule: every 5 minutes, Monday–Friday 06:00–22:00 PT (business hours + field ops window)
- Query: `SELECT * FROM workflow_events WHERE status = 'pending' AND attempts < 3 ORDER BY occurred_at ASC LIMIT 50`
- For each event: process inline via Switch node routing (same logic as immediate delivery path)
- On success: `UPDATE workflow_events SET status = 'delivered', delivered_at = now()`
- On failure: `UPDATE workflow_events SET status = 'failed', attempts = attempts + 1, error = $err`
- After 3 failures: `status = 'failed'` permanently → Resend email to brandon@aptmaintenanceinc.com with event details

Resource cost: n8n workflow, not a Railway service. Zero additional memory billing.

### n8n Unified Webhook — Switch Node Routing

Single endpoint: `N8N_EVENT_BUS_URL`

```
Webhook trigger (POST /event-bus)
  └─ Switch node on event.type
       ├─ AttestationSigned  → CA Break Compliance sub-workflow
       ├─ WorkOrderScheduled → Email: tenant + PM (Resend node) + tech notification
       ├─ PteRequired        → Email: PM coordination (Resend node)
       ├─ DispatchSent       → existing lock-and-send downstream logic
       ├─ WorkOrderCompleted → (future: financial trigger placeholder)
       ├─ StaleJobDetected   → Resend email alert (stale job)
       └─ WcCodeMissing      → Resend email alert (missing WC code)
```

Idempotency: n8n Switch node checks `workflow_events.id` — if already `delivered`, skip processing.

### Integration with JobStateService (ADR-010)

```
API route
  → JobStateService.transition(jobId, event) → Result<{ job, transitionEvent }, TransitionError>
  → on ok: map transitionEvent → WorkOrderEvent
  → EventBus.publish(workOrderEvent)
  → return HTTP response
```

Mapping lives in the API route — seam stays pure, no bus dependency in `job-state.ts`.

**Email removal from Next.js:** Once this ADR ships, remove `sendTenantScheduledEmail()` and `sendPteCoordinationEmail()` calls from `PATCH /api/jobs/[jobId]`. Email is now handled by n8n `WorkOrderScheduled` and `PteRequired` consumers.

---

## What This Replaces

| Removed | Replaced by |
|---------|------------|
| `fetch(N8N_COMPLIANCE_WEBHOOK_URL)` in attestation/sign | `EventBus.publish({ type: 'AttestationSigned', ... })` |
| `fetch(N8N_LOCK_SEND_WEBHOOK_URL)` in lock-and-send | `EventBus.publish({ type: 'DispatchSent', ... })` |
| `sendTenantScheduledEmail()` in PATCH /jobs/:id | n8n `WorkOrderScheduled` consumer |
| `sendPteCoordinationEmail()` in PATCH /jobs/:id | n8n `PteRequired` consumer |
| `N8N_COMPLIANCE_WEBHOOK_URL` env var | `N8N_EVENT_BUS_URL` (single var) |
| `N8N_LOCK_SEND_WEBHOOK_URL` env var | `N8N_EVENT_BUS_URL` (same) |

---

## Prerequisites (must complete before this ADR executes)

1. Infra restructure: new Neon account provisioned
2. Infra restructure: new Railway n8n deployed with credentials re-created
3. `N8N_EVENT_BUS_URL` set in Vercel env vars
4. Resend: RESEND_API_KEY set in n8n env (already done)
5. Drizzle migration run on new Neon account

---

## Future Upgrade Path

**Outbox poller upgrade to guaranteed delivery:** If at-least-once delivery becomes insufficient (high-volume, billing triggers), replace the n8n poller with a dedicated worker using `pg_notify` + listen/notify pattern. The `workflow_events` table schema is compatible — no migration needed, only the poller implementation changes.

---

## Consequences

**Positive:**
- 52-day silent failure pattern impossible — all delivery failures send Resend email alert
- Single `N8N_EVENT_BUS_URL` replaces multiple webhook env vars
- Adding new event type = add row to `WorkOrderEvent` union + add Switch branch in n8n. Zero API route changes
- Outbox guarantees events survive n8n downtime without losing data
- Email leaves Next.js codebase — Resend calls concentrated in n8n, not scattered across routes
- Idempotent — safe redelivery, no duplicate emails

**Negative / Constraints:**
- Up to 5-minute delivery delay when immediate delivery fails (outbox retry cycle)
- n8n owns email template logic — changes to email content require n8n workflow edits, not code PRs
- `workflow_events` table grows indefinitely — add a cleanup job to archive rows older than 90 days (Phase 18 or 19)
- Outbox poller is limited to business hours — events during off-hours deliver within 5 min of 06:00 PT next business day. Adjust window if after-hours field ops expand
