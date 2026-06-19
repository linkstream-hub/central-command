# Architecture Decision Records

Retrofit ADRs documenting decisions made during CC2.0 development. Written 2026-06-06 using codegraph + architecture docs to verify what's real vs. documented.

These are not aspirational. Every decision here is already in production.

---

| ADR | Title | Status |
|---|---|---|
| [ADR-001](ADR-001-dual-auth-architecture.md) | Dual Authentication Architecture (next-auth + badge/PIN) | Accepted |
| [ADR-002](ADR-002-neon-postgres-as-primary-database.md) | Neon Postgres as Primary Database | Accepted |
| [ADR-003](ADR-003-gas-as-google-workspace-bridge.md) | GAS as Google Workspace Bridge Only | Accepted |
| [ADR-004](ADR-004-work-order-status-lifecycle.md) | Work Order Status Lifecycle (8-State Machine) | Accepted — Locked |
| [ADR-005](ADR-005-org-id-multi-tenancy.md) | org_id Multi-Tenancy on Every Table | Accepted — Non-negotiable |
| [ADR-006](ADR-006-dal-pattern-neon-first.md) | DAL Pattern — Neon-First / Sheets Fallback | Superseded (cut-over complete 2026-06-01) |
| [ADR-007](ADR-007-n8n-as-event-bus.md) | n8n as Event Bus and Workflow Automation | Accepted |
| [ADR-008](ADR-008-modular-monolith-architecture.md) | Modular Monolith Over Microservices | Accepted |

---

## Findings from Phase 1 Mapping

Three issues surfaced while writing these ADRs that should be actioned:

1. **DAL write path outdated** — `dal/jobs.ts:updateJob` still calls Sheets first. Post cut-over, this is dead code making a wasted API call on every job update. Cleanup sprint needed.

2. **Unauthenticated API routes** — `api/clean-dummy/route.ts` (destructive DELETE, no auth) and `api/analyze-wos/route.ts` (reads all job data, no auth) are dev tools that were never locked down. Both should require auth or be deleted.

3. **`api/gas/route.ts` has no session check** — the GAS proxy accepts any POST without verifying the caller has a valid session. Any browser tab that knows the endpoint URL can proxy to DashboardAPI.

## Format

Each ADR follows the format:
- **Status** — Accepted / Superseded / Deprecated / Proposed
- **Context** — Why this decision was needed, what alternatives were considered
- **Decision** — What was chosen and why
- **Consequences** — What became easier, what constraints were introduced

Update the Status field when a decision is superseded. Do not delete ADRs — mark them Superseded and link to the replacement.
