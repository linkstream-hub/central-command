# Data Integrity Audit

**Created:** 2026-06-28  
**Status:** OPEN — snapshot not yet taken  
**Priority:** Phase 0 gate — must complete before Phase 1 begins

---

## Required: Production Snapshot

Before any code changes, document current production data state.

### Work Orders

```sql
-- Run against production Neon DB
SELECT status, COUNT(*) as count FROM jobs GROUP BY status ORDER BY count DESC;
SELECT COUNT(*) as fsm_dead FROM jobs WHERE status NOT IN ('Needs Info','Scheduled','In Progress','Completed','Cancelled','On Hold');
SELECT MIN(timestamp) as oldest_dead, MAX(timestamp) as newest_dead FROM jobs WHERE status NOT IN ('Needs Info','Scheduled','In Progress','Completed','Cancelled','On Hold');
```

| Metric | Value | Date Measured |
|---|---|---|
| Total WOs | — | — |
| WOs by valid status | — | — |
| FSM-dead WO count | 138 (known, 2026-06-26) | 2026-06-26 |
| Oldest FSM-dead WO | — | — |
| Dispatcher-visible corrupt records | — | — |

### Impact Assessment (Required Before Remediation)

Answer before writing any remediation script:

- [ ] Do FSM-dead WOs affect billing calculations?
- [ ] Do they affect tech assignment or scheduling?
- [ ] Do they appear in dispatcher board (yes — confirmed by Session State)?
- [ ] Do they affect compliance audit trail?
- [ ] Do they affect any customer-facing comms?
- [ ] Does owner need to review any records individually?

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
