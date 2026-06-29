# Data Integrity Audit

**Created:** 2026-06-28  
**Snapshot taken:** 2026-06-29  
**Status:** SNAPSHOT COMPLETE — impact assessment pending  
**Priority:** Phase 0 gate — must complete before Phase 1 begins

---

## Production Snapshot (2026-06-29)

### Work Orders — Status Distribution

```sql
-- Run 2026-06-29 via Neon MCP (project: purple-dust-72858226)
SELECT status, COUNT(*) as count FROM jobs GROUP BY status ORDER BY count DESC;
```

| Status | Count | In Canonical FSM? | Notes |
|---|---|---|---|
| Archived | 470 | NO — not in JobState type | Intentional terminal? Needs classification |
| Ready to Schedule | 155 | YES | |
| Needs Info | 142 | YES | |
| Scheduled | 16 | YES | |
| Needs Review | 15 | NO — legacy alias | Must normalize → 'Needs Info' (normalizeLegacyStatus) |
| Complete | 2 | YES | |
| In Progress | 0 | YES | **ALERT: 0 active jobs in a live system** |
| **TOTAL** | **800** | | |

Canonical FSM states (job-state.ts `JobState`): Needs Info, Awaiting Tenant, Ready to Schedule, Scheduled, In Progress, Complete

### FSM-Dead Reclassification

**Prior measurement:** 138 (2026-06-26) — **STALE. Do not use.**

**Current non-canonical records:**
- `Archived` (470): present in `JobStatus` type (types.ts) but NOT in `JobState` FSM (job-state.ts). Oldest: 2026-06-07. Newest: 2026-06-28.
- `Needs Review` (15): confirmed legacy alias. Oldest/newest both 2026-06-26.

**FSM-dead count depends on definition:**
- Strict (not in `JobState` type): 470 + 15 = **485**
- Practical (only unprocessable by FSM, excluding intentional archive): **15**

**'Archived' = intentional terminal state** — confirmed by Brandon 2026-06-29. Used to hide completed/old WOs from dispatcher board. No remediation needed. Update `JobState` type in Phase 4 cleanup to include 'Archived' as explicit terminal state.

**Phase 3 FSM-dead remediation scope = 15 records** ('Needs Review' only). `normalizeLegacyStatus()` already maps these to 'Needs Info' at read time — users unaffected. Phase 3 option: UPDATE DB to canonical value or leave as-is with normalization in place.

### Impact Assessment (Required Before Remediation)

Answer before writing any remediation script:

- [ ] Do FSM-dead WOs affect billing calculations?
- [ ] Do they affect tech assignment or scheduling?
- [ ] Do they appear in dispatcher board?
- [ ] Do they affect compliance audit trail?
- [ ] Do they affect any customer-facing comms?
- [ ] Does owner need to review any records individually?
- [ ] Is 0 'In Progress' jobs expected (workday timing)? Or data integrity issue?
- [ ] Is 'Archived' intentional terminal state? If yes: update `JobState` type to include it.

### Remediation Plan (Phase 3)

1. Dry-run script: classify each dead WO (→ valid terminal state OR → 'legacy-dead')
2. Owner-readable report: list of affected WOs with proposed resolution per record
3. Brandon approval required before any mutation
4. Backup: pg_dump before script runs
5. Audit trail: every corrected WO gets a `job_comment` explaining the correction
6. Post-run query: confirm 0 FSM-dead records remain

---

## Compliance Engine Divergence (A-003)

Known GAS divergence documented in `tech-pwa/src/lib/compliance.ts`:

> GAS uses elapsed time (clockOut - clockIn) instead of hoursWorked for the >300min threshold. This is a known bug.

**Legal exposure:** CA PAGA — if GAS calculation underpaid meal premiums, systemic violation is actionable by employees.

**Required audit:**
- Pull last 90 days of shifts from Neon time_records
- Run through compliance.ts
- Compare against GAS source output for same shifts
- Document any divergence in dollar terms
- Brandon reviews divergence before any further deployment
