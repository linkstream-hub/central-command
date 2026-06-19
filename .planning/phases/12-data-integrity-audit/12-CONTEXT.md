# Phase 12: Data Integrity Audit - Context

**Gathered:** 2026-06-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Build `tools/orchestrator/neon_audit.py` — a standalone Python script that reads from both Google Sheets and Neon Postgres, compares row coverage for `jobs`, `time_records`, and `job_comments` within the active 21-day window, and produces a pass/fail gate report. Phase 12 is audit-only: no code changes to the application, no writes to either data store. The gate (DINT-03) is a human decision — Phase 13 does not start until a person reads this output and gives explicit go/no-go.

</domain>

<decisions>
## Implementation Decisions

### Sheets Access

- **D-01:** Use Google Sheets API v4 directly via the `gspread` Python library with a service account JSON credential. Audit scripts access data sources directly — never through application layers — to avoid hiding bugs or sync lag.
- **D-02:** Service account JSON path comes from env var `GOOGLE_SERVICE_ACCOUNT_JSON` (path to a `.json` file, NOT the literal JSON string). Brandon creates the service account in GCP console, downloads the key, and sets the env var. The relevant Sheets (Dispatch Queue, Tech PWA time sheet, job comments) must be shared with the service account email at Viewer level.
- **D-03:** Sheets-side filtering to the 21-day window is done in Python after fetching, not in GAS. `gspread` returns the full sheet; the script filters rows where the timestamp/date column falls within `[today - N days, today]`. This keeps the script self-contained with no GAS dependency.

### Neon Access

- **D-04:** Connect directly via `psycopg2` using `DATABASE_URL_UNPOOLED` from the environment. One-shot audit script — unpooled is correct here (same convention as `drizzle-kit migrate`). Do NOT call Next.js `/api/` routes — the audit must be independent of application state.
- **D-05:** The script reads `DATABASE_URL_UNPOOLED` from the environment. For local runs, Brandon sources `tech-pwa/.env.local` or exports the var manually. Document this in a usage comment at the top of the file.

### Comparison Strategy

- **D-06:** Key-by-key diff for all three tables — not row count only. Count-only would miss the `time_records` duplicate case. The comparison produces: (a) count match/mismatch, (b) list of keys present in Sheets but absent from Neon, (c) list of keys present in Neon but absent from Sheets (to surface the two-write-path duplicate risk).
- **D-07:** Natural keys per table:
  - `jobs` → `job_id` (WO ID column in Sheets; `jobs.job_id` in Neon)
  - `time_records` → `record_id` (recordId column in Sheets; `time_records.record_id` in Neon)
  - `job_comments` → `sheets_id` where available. Since `sheets_id` is nullable in Neon (partial unique index), compare counts only for job_comments and report any Neon rows where `sheets_id IS NULL` as unverified.
- **D-08:** 21-day window: `today - 21 days` rolling. For `jobs`, filter by the Sheets timestamp column. For `time_records`, filter by the `date` column. For `job_comments`, filter by `created_at`. All times in America/Los_Angeles (production timezone). Make the window configurable via `--days N` (default 21).

### Output + Gate Mechanism

- **D-09:** Two output channels: (a) pretty-printed terminal summary (human reads it), (b) structured JSON artifact written to `artifacts/neon_audit_YYYYMMDD.json`. The artifact file enables audit trail and future automation.
- **D-10:** Exit code: 0 = PASS (zero mismatches in all three tables), 1 = FAIL (any mismatch). This allows future automation to gate Phase 13 on exit code, consistent with ADW orchestrator conventions.
- **D-11:** Output structure per table:
  ```
  [PASS|FAIL] jobs       — Sheets: 47  Neon: 47  Missing from Neon: []
  [FAIL]      time_records — Sheets: 183  Neon: 185  Neon-only (dup risk): [TR-20260528-14, TR-20260529-03]
  [PASS]      job_comments — Sheets: 92  Neon: 92  (sheets_id match)
  ```
- **D-12:** `artifacts/neon_audit_YYYYMMDD.json` schema:
  ```json
  {
    "run_at": "<ISO timestamp>",
    "window_days": 21,
    "overall": "PASS" | "FAIL",
    "tables": {
      "jobs": { "sheets_count": N, "neon_count": N, "missing_from_neon": [...], "neon_only": [...] },
      "time_records": { ... },
      "job_comments": { "sheets_count": N, "neon_count": N, "unverified_neon": N }
    }
  }
  ```

### Script Design

- **D-13:** Script lives at `tools/orchestrator/neon_audit.py`. Same directory as `ptow_adw.py`. No shared module imports from the Next.js codebase — pure Python with only standard library + `psycopg2` + `gspread`.
- **D-14:** CLI interface: `python tools/orchestrator/neon_audit.py [--days 21] [--table jobs|time_records|job_comments|all]`. Default audits all three tables. `--table` flag enables targeted re-runs.
- **D-15:** No database writes. Read-only on both sides. If connection fails on either side, script exits with code 2 (connectivity error, distinct from mismatch exit code 1).

### Claude's Discretion

- Exact Sheets tab names and column indices — research from `docs/SHEETS_SCHEMA.md` and `docs/SHADOW_WRITES.md` before planning
- Dependency management — add `psycopg2-binary` and `gspread` to `tools/orchestrator/requirements.txt` (create if it doesn't exist; check for existing requirements first)
- Error messaging format for missing env vars — clear, actionable messages naming the missing var

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Shadow-Write State + Gaps
- `docs/SHADOW_WRITES.md` — authoritative inventory of all shadow-write paths, gaps per table, and conflict strategies. **Read this first.** It documents the specific gaps (time_records two-write-path risk, job_comments dedup gap) that shape comparison logic.

### Schema
- `tech-pwa/src/lib/schema.ts` — Neon table definitions: `jobs` (line 337), `time_records` (line 216), `job_comments` (line 376). Natural keys and unique indexes are defined here.

### Requirements
- `.planning/REQUIREMENTS.md` §v1.1 Requirements — Neon Cut-Over — DINT-01, DINT-02, DINT-03 define the audit's success criteria and gate behavior.
- `.planning/ROADMAP.md` §Phase 12: Data Integrity Audit — goal, depends-on, and success criteria.

### Sheets Schema
- `docs/SHEETS_SCHEMA.md` — column maps for Dispatch Queue, time sheet, and comments tabs. Required to know which Sheets columns map to which Neon fields.

### GAS Migration Scope (context only)
- `docs/GAS_MIGRATION_SCOPE.md` — function-level inventory of what still runs on GAS. Audit script does not modify this but researcher should understand the Sheets write path ownership.

### Existing Orchestrator Pattern
- `tools/orchestrator/ptow_adw.py` — existing Python orchestrator in the same directory. Reference for env var conventions, argparse patterns, and exit code conventions used in this toolchain.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `tools/orchestrator/ptow_adw.py` — argparse CLI pattern, env var access style, and exit code conventions to follow for consistency.
- `tech-pwa/src/lib/schema.ts` — Drizzle schema defines the Neon column names; use these to write correct SQL queries in the audit script.

### Established Patterns
- Exit code conventions: 0 = success, 1 = logical failure (mismatch), 2 = infra/connectivity error. Follows ADW orchestrator convention.
- Artifact output to `artifacts/` directory — consistent with `artifacts/ag_diff.txt`, `artifacts/ag_test_results.txt`.
- Env var `DATABASE_URL_UNPOOLED` for direct Postgres connections (established by drizzle-kit migration tooling in Phase 6).

### Integration Points
- `artifacts/` directory — audit JSON writes here (consistent with existing artifact convention)
- `tools/orchestrator/` — script lives here alongside other admin tooling
- No Next.js app integration — audit is intentionally independent

</code_context>

<specifics>
## Specific Ideas

- Brandon runs this script manually from the terminal before any Phase 13 work begins. The terminal output is the "human reads the output" gate for DINT-03.
- The `--table` flag enables targeted re-runs if one table fails and is fixed — don't rerun all three unnecessarily.
- Neon-only records in `time_records` (from the direct `/api/field/clock-in` write path) are expected and should be reported as informational, not as failures. The FAIL condition is Sheets records missing from Neon — those indicate sync drops.

</specifics>

<deferred>
## Deferred Ideas

- Full field-level comparison (beyond key presence) — too expensive for first audit, belongs in a future data quality phase if needed post-cutover.
- Automated Phase 13 trigger on audit pass — Phase 13 begins only after human review; automation can come later.
- Backfilling missing Neon records from Sheets — repair logic is Phase 13 scope, not audit scope.

</deferred>

---

*Phase: 12-data-integrity-audit*
*Context gathered: 2026-06-01*
