# Orthogonality Principle — APT Central Command
# Professional-grade design constraint. Applies to all agents, all PRs, all features.
# Last updated: 2026-06-25

---

## The Principle

**Every feature has exactly one data path. Every concept has exactly one definition. Every constraint is enforced at the framework level, not per-call-site.**

Orthogonality means: changing one module does not break another. When modules share state across two systems, violate their own schema, or have behavior defined in two places, you get cascading failures with no clear root cause.

This is the pattern that produced:
- 138 WOs FSM-dead (FSM says 6 states, RULES.md documented 8 — two sources of truth)
- Zero push notifications (subscribe writes to GAS, read comes from Neon — split data path)
- RM replies invisible in REQUESTER tab (inbound handler hardcoded 'TENANT' — stakeholder logic in two files)
- Scheduling time silently lost (HH:MM coerced in route, but test only covered the mapping function)

---

## Rules (apply to every PR)

### Rule 1: One Data Path Per Feature

If a feature reads from Neon, it writes to Neon. If it reads from GAS, it writes to GAS. Never split the read and write paths across systems.

```yaml
VIOLATION:
  push_subscribe: writes → GAS
  sendJobAssignedPush: reads  → Neon (finds 0 rows, sends nothing)

CORRECT:
  push_subscribe: writes → Neon.pushSubscriptions
  sendJobAssignedPush: reads  → Neon.pushSubscriptions
```

### Rule 2: One Source of Truth Per Concept

If a concept is defined in the domain model, it is persisted in the DB. It is not derived at read time from a proxy column. It is not re-documented in RULES.md or any other file.

```yaml
VIOLATION:
  WoType: domain type (job-state.ts) + emailType proxy (jobs table) + RULES.md docs
  Status: FSM states (job-state.ts) + old lifecycle in RULES.md (now fixed)

CORRECT:
  WoType: one column (jobs.wo_type), one derivation function, one place
  Status: FSM only (job-state.ts is the canonical definition)
```

### Rule 3: Cross-Cutting Constraints Are Framework-Level

Auth, org scoping, and logging are applied once at the middleware or route wrapper level — not duplicated per route. A route that is missing an auth check is a framework failure, not a per-route oversight.

```yaml
VIOLATION:
  /api/list-employees: no auth check (now fixed)
  orgId scoping: CLAUDE.md mandates it, zero WHERE clauses include it
  no-explicit-any: RULES.md prohibits it, eslint did not enforce it (now fixed)

CORRECT:
  auth: all /api/ routes use dual-auth wrapper OR eslint rule catches missing check
  orgId: WHERE clauses enforced by a DAL function, not per-query
  no-explicit-any: eslint error — CI blocks any any cast
```

### Rule 4: Tests Test the Right Layer

A test that covers the mapping function does not cover the route that calls it. Route integration tests verify the full path: HTTP request → DB write → DB state.

```yaml
VIOLATION:
  DispatchTimelineBoard.test.ts: tests buildScheduledJobUpdate() — asserts scheduledTime='10:00'
  Actual bug: job-update.ts:110 coerces any HH:MM to 'morning' — never tested

CORRECT:
  Integration test: POST/PATCH to route with scheduledTime='10:00'
  Assert: SELECT scheduledTime FROM jobs WHERE id=... → returns 'morning' (catches the coercion bug)
```

### Rule 5: Shared Logic Lives in Shared Modules

Two files that implement the same function are two sources of truth. Extract to a shared module and import.

```yaml
VIOLATION:
  extractEmailAddress, deriveStakeholder: duplicated in [jobId]/route.ts and (old) inbound/route.ts

CORRECT:
  src/lib/comms-utils.ts: single definition, imported by both route files
```

---

## How to Apply Before Writing Code

Before implementing a feature, answer:

1. **Where does this data live?** One system. Write AND read from the same place.
2. **Where is this concept already defined?** If in domain model, persist it. Don't derive at read time.
3. **What constraint does this feature need?** Auth, org scoping, validation — is it already in the framework? If not, add it there, not in the route.
4. **What layer does my test cover?** Does it go all the way to DB state? If not, add an integration test.
5. **Does this function already exist?** If yes, import it. Don't copy it.

---

## Violations Found in S170 Audit (for reference)

| Violation | Type | Status |
|-----------|------|--------|
| Push subscribe → GAS, read → Neon | Split data path | OPEN (P0) |
| CameraUpload → uploadReceipt not in FIELD_POST_ROUTES | Missing route | OPEN (P0) |
| comms inbound stakeholder hardcoded 'TENANT' | Duplicated logic | FIXED (S170) |
| extractEmailAddress/deriveStakeholder duplicated | Shared module missing | FIXED (S170) |
| RULES.md documented old 8-state lifecycle | Duplicate definition | FIXED (S170) |
| /api/list-employees missing auth | Framework constraint not applied | FIXED (S170) |
| orgId absent from all WHERE clauses | Framework constraint not applied | OPEN (P2) |
| @typescript-eslint/no-explicit-any not in eslint | Framework constraint not enforced | FIXED (S170) |
| WoType: domain type, no DB column, emailType proxy | Three representations | OPEN (P2) |
| ADR-004 columns missing_fields hardcoded [] | Domain state not persisted | OPEN (P2) |
| FSM tests use mocked DAL | Test at wrong layer | OPEN (test debt) |
| Block 11 E2E skipped on phantom dependency | Tests not covering real path | OPEN (test debt) |
| vitest coverage.include referenced deleted file | Stale config | FIXED (S170) |

---

## Quick Checklist for PR Review

```
□ Does every data path have a matching write and read in the same system?
□ Does every domain concept map to exactly one DB column?
□ Does this route have dual-auth? (session OR api-key, both → 401)
□ Does this route scope queries by orgId?
□ Is there a shared module for any logic used in 2+ places?
□ Does the test go all the way to DB state verification?
□ Did any new function get extracted to a shared module rather than duplicated?
```
