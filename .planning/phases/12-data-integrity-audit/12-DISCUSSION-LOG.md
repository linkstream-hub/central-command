# Phase 12: Data Integrity Audit - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-01
**Phase:** 12-data-integrity-audit
**Areas discussed:** Sheets access strategy, Neon access strategy, Comparison granularity, Output format + gate mechanism, Script design

---

## All Gray Areas

| Option | Description | Selected |
|--------|-------------|----------|
| Discuss specific gray areas | User selects which areas to explore | |
| Professional-grade judgment on all | Claude decides as a professional dev team would | ✓ |

**User's choice:** "I have no idea. As always, the goal is to do what an expert/professional grade dev/prog/analyst team would do"
**Notes:** User deferred all decisions to professional judgment. All four gray areas were resolved by Claude without further Q&A.

---

## Claude's Discretion

All decisions were made under professional-grade dev team mandate:

- **Sheets access:** `gspread` + service account over DashboardAPI call or CSV export — audit scripts go direct to source, independent of app layers.
- **Neon access:** Direct `psycopg2` connection via `DATABASE_URL_UNPOOLED` — unpooled for one-shot script, no app dependency.
- **Comparison granularity:** Key-by-key diff per table, not count-only. SHADOW_WRITES.md documents the `time_records` two-write-path risk and `job_comments` dedup gap — count-only would silently pass a broken mirror.
- **Output + gate:** Terminal pretty-print + `artifacts/neon_audit_YYYYMMDD.json` + exit code 0/1/2 — covers human gate (DINT-03), audit trail, and future automation optionality.
- **Exit code semantics:** 0 = PASS, 1 = FAIL (mismatch found), 2 = connectivity error. Distinct codes prevent ambiguity in future scripted contexts.
- **job_comments comparison:** Count-only with unverified Neon rows reported separately — key-by-key is not feasible due to nullable `sheets_id` for some records.
- **Neon-only time_records:** Reported as informational (expected from direct `/api/field/clock-in` path), not as FAIL condition. FAIL = Sheets records absent from Neon.

## Deferred Ideas

- Full field-level comparison (value diff beyond key presence) — belongs in a data quality phase post-cutover if needed
- Automated Phase 13 trigger on audit pass exit code — human gate is the right call for a production write-path flip
- Repair/backfill logic for missing Neon records — Phase 13 scope, not audit scope
