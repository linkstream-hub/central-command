# Phase 13: Write Path Flip — Discussion Log

**Session date:** 2026-06-01
**Mode:** WWPGDPTD (expert-team decisions, no user Q&A)

---

## Areas Identified

Three gray areas identified from codebase recon:

1. **Flip safety mechanism** — hard remove vs. Script Property toggle
2. **updateJob() scope** — in or out of Phase 13; what replaces Sheets write
3. **Auth header pre-flight** — known x-api-key vs. DASHBOARD_API_KEY mismatch

## Decisions Made (Claude Discretion — WWPGDPTD Standard)

### Flip Safety Mechanism → Script Property Toggle

**Options considered:**
- Hard-remove Sheets write calls (clean, rollback = clasp deploy ~2 min)
- Script Property toggle (instant rollback, no deploy needed)

**Decision:** Script Property toggle (`WRITE_PATH_NEON_ONLY`).

**Why:** Professional teams never hard-switch production write paths without a kill switch. A clasp deploy cycle (even at 2 min) is too slow if production data is at risk. Toggle gives instant disable from the GAS console.

### updateJob() Scope → In Scope

**Options considered:**
- Scope Phase 13 to `addToDispatchQueue()` only
- Include `updateJob()` and `archiveJob()` (all `setValue` to Dispatch Queue)

**Decision:** Full scope — `updateJob()`, `archiveJob()`, and `addToDispatchQueue()` all handled.

**Why:** WPATH-01 says "no `appendRow` or `setValue` to Dispatch Queue Sheets tab." Both `updateJob()` (setValue) and `archiveJob()` (setValue) are explicitly covered. Leaving them creates a half-flip that violates the requirement. Researcher traces callers in DashboardAPI.gs to determine stub vs. redirect.

### Auth Pre-flight → Required Blocker (Task 1)

**Options considered:**
- Proceed with flip and verify auth in testing
- Verify auth before removing any Sheets write

**Decision:** Task 1 blocker — verify auth before any code change.

**Why:** Current `syncJobToNeon()` silently swallows failures via try/catch. If auth is broken and Sheets write is removed, data is lost with no alert. Professional teams verify the new path works before cutting the old one.

### Error Handling → Harden in Phase 13

**Additional decision not surfaced as a question:**

Current `syncJobToNeon()` silent-failure mode is acceptable when Sheets is authoritative. It becomes unacceptable the moment Neon is the only write path. Error handling must harden as part of the flip — not a follow-up cleanup.

---

## Deferred Ideas

- `job_comments` unique index — HIGH risk, not Phase 13 scope
- `time_records` dual-write resolution — separate gate
- Toggle removal — Phase 14 cleanup
