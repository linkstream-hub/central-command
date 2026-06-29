---
id: TC-MIGRATE-0007
status: DONE — 2026-06-29 (CC via Neon MCP)
priority: P1 — silent production failure (escalated from P2-008)
executor: CC (Neon MCP run_sql_transaction)
branch: n/a — schema-only, no code changes
freeze_override: YES — active silent production failure
created: 2026-06-29
---

# TC-MIGRATE-0007: Apply workflow_events migration to production

## Problem

Migration 0007 (`0007_curly_kree.sql`) was applied ONLY to old Neon project `ep-jolly-morning` via `apply-0007-prod.sql`. After infra migration to `purple-dust-72858226`, it was never re-run.

`EventBus.publish()` in `src/lib/services/event-bus.ts` inserts into `workflow_events` on every domain event. Table absent → insert throws `"relation \"workflow_events\" does not exist"`. Catch block fires → sends Resend fallback email to `brandon@aptmaintenanceinc.com`. Events are never stored. n8n never picks them up.

**All work order domain events are silently dropping in production.**

Affected callers confirmed via codegraph (2 callers with tests).

## Domain events currently dropping

Events fired by `EventBus.publish()`:
- `AttestationSigned`
- `WorkOrderScheduled`
- `PteRequired`
- `DispatchSent`
- `WorkOrderCompleted`

n8n workflows that poll `workflow_events` for `status='pending'` receive nothing. All event-driven automation is broken.

## Evidence (confirmed — not assumed)

```yaml
production_project: purple-dust-72858226
table_absent: workflow_events (SELECT COUNT(*) → relation does not exist)
drizzle_tracking: 0007 hash ABSENT from drizzle.__drizzle_migrations
apply-0007-prod.sql: targeted ep-jolly-morning (old project) — confirmed by file header
event_bus_callers: 2 (confirmed codegraph 2026-06-29)
fallback_behavior: Resend email to brandon@aptmaintenanceinc.com on every EventBus failure
migration_file: tech-pwa/drizzle/0007_curly_kree.sql
```

## SHA-256 hash (computed 2026-06-29 on repo machine)

```
0007: 09026f4a480a69ef8d3fc0dc30b21596b1b7581946601ac91005b45bbf0f5086
```

## Execution SQL

**Execute via Neon MCP `run_sql_transaction` only.**

```sql
BEGIN;

-- Migration 0007: create workflow_events outbox table
CREATE TABLE "workflow_events" (
  "id"                  text PRIMARY KEY NOT NULL,
  "type"                text NOT NULL,
  "payload"             text NOT NULL,
  "occurred_at"         timestamp with time zone DEFAULT now() NOT NULL,
  "status"              text DEFAULT 'pending' NOT NULL,
  "attempts"            integer DEFAULT 0 NOT NULL,
  "last_attempted_at"   timestamp with time zone,
  "delivered_at"        timestamp with time zone,
  "error"               text
);

CREATE INDEX idx_workflow_events_status ON workflow_events (status, occurred_at);

-- Drizzle tracking: real SHA-256 hash
-- created_at uses epoch-ms; value must be less than 0009 (1782442057037) for sort order
INSERT INTO drizzle.__drizzle_migrations (hash, created_at) VALUES
  ('09026f4a480a69ef8d3fc0dc30b21596b1b7581946601ac91005b45bbf0f5086', 1782000000000);

COMMIT;
```

Note: `created_at` timestamp uses same epoch-ms format as 0009/0010 tracking rows. Drizzle orders by `created_at`; 0007 must sort before 0009/0010 (value above is earlier).

## Rollback

```sql
DROP TABLE IF EXISTS "workflow_events";
DELETE FROM drizzle.__drizzle_migrations
  WHERE hash = '09026f4a480a69ef8d3fc0dc30b21596b1b7581946601ac91005b45bbf0f5086';
```

## Success criteria (verifiable)

| Check | Query | Pass |
|---|---|---|
| Table exists | `SELECT to_regclass('public.workflow_events')` | returns `workflow_events` |
| Columns correct | `SELECT column_name FROM information_schema.columns WHERE table_name='workflow_events'` | id, type, payload, occurred_at, status, attempts, last_attempted_at, delivered_at, error |
| Index exists | `SELECT indexname FROM pg_indexes WHERE tablename='workflow_events'` | idx_workflow_events_status present |
| Drizzle tracking | `SELECT hash FROM drizzle.__drizzle_migrations ORDER BY created_at` | 0007 hash present |
| n8n polling | After apply: trigger a domain event, query `SELECT * FROM workflow_events WHERE status='pending'` | row appears |

## Sequencing

Execute BEFORE TC-MIGRATE-009-010 if running both in same session (so drizzle tracking row order is correct: 0007 < 0009 < 0010). Or execute independently — order does not matter for table creation, only for drizzle tracking sort.

## Assumptions

- `apply-0007-prod.sql` hash was `'curly_kree'` (tag name, not SHA-256) — NOT inserted into current DB tracking
- Current production has no `workflow_events` rows (table was absent — confirmed)
- `drizzle.__drizzle_migrations.created_at` epoch value for 0007 must be less than 0009/0010 values above
