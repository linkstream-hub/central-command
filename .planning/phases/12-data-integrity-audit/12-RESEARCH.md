# Phase 12: Data Integrity Audit - Research

**Researched:** 2026-06-01
**Domain:** Python data audit script — gspread (Google Sheets) + psycopg2 (Neon Postgres)
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Use `gspread` Python library with service account JSON credential for Sheets access.
- **D-02:** Service account JSON path from env var `GOOGLE_SERVICE_ACCOUNT_JSON` (path to `.json` file, NOT literal JSON string). Brandon creates service account in GCP, downloads key, sets the env var. Dispatch Queue, Time Records, and JobComments tabs must be shared with service account email at Viewer level.
- **D-03:** Sheets-side 21-day filtering done in Python after fetching — `gspread` returns the full sheet; script filters rows in Python. No GAS dependency.
- **D-04:** Connect to Neon via `psycopg2` using `DATABASE_URL_UNPOOLED`. One-shot script — unpooled is correct. Do NOT call Next.js `/api/` routes.
- **D-05:** Script reads `DATABASE_URL_UNPOOLED` from environment. Local runs: Brandon sources `tech-pwa/.env.local` or exports manually. Document in usage comment at top of file.
- **D-06:** Key-by-key diff for all three tables — not row count only. Produces: (a) count match/mismatch, (b) keys in Sheets but absent from Neon, (c) keys in Neon but absent from Sheets.
- **D-07:** Natural keys per table:
  - `jobs` → `job_id` (Dispatch Queue Col 2 = Lead ID; `jobs.job_id` in Neon)
  - `time_records` → `record_id` (Time Records Col 0 = RECORD_ID; `time_records.record_id` in Neon)
  - `job_comments` → `sheets_id` where available; compare counts only; report Neon rows where `sheets_id IS NULL` as unverified
- **D-08:** 21-day window: `today - N days` rolling. Filter: jobs by Sheets timestamp col, time_records by date col, job_comments by `created_at`. All times in America/Los_Angeles. Configurable via `--days N` (default 21).
- **D-09:** Two output channels: terminal pretty-print + `artifacts/neon_audit_YYYYMMDD.json`.
- **D-10:** Exit codes: 0 = PASS (zero mismatches), 1 = FAIL (any mismatch), 2 = connectivity error.
- **D-11:** Terminal output format per table: `[PASS|FAIL] jobs — Sheets: 47  Neon: 47  Missing from Neon: []`
- **D-12:** JSON artifact schema: `{ run_at, window_days, overall, tables: { jobs: { sheets_count, neon_count, missing_from_neon, neon_only }, time_records: {...}, job_comments: { sheets_count, neon_count, unverified_neon } } }`
- **D-13:** Script at `tools/orchestrator/neon_audit.py`. No imports from Next.js codebase. Pure Python: stdlib + psycopg2 + gspread.
- **D-14:** CLI: `python tools/orchestrator/neon_audit.py [--days 21] [--table jobs|time_records|job_comments|all]`
- **D-15:** No database writes. Read-only both sides. Connection failure exits with code 2.

### Claude's Discretion

- Exact Sheets tab names and column indices — research from `docs/SHEETS_SCHEMA.md` and `docs/SHADOW_WRITES.md`
- Dependency management — add `psycopg2-binary` and `gspread` to `tools/orchestrator/requirements.txt` (create if it doesn't exist)
- Error messaging format for missing env vars — clear, actionable messages naming the missing var

### Deferred Ideas (OUT OF SCOPE)

- Full field-level comparison (beyond key presence)
- Automated Phase 13 trigger on audit pass
- Backfilling missing Neon records from Sheets (Phase 13 scope)
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| DINT-01 | Script reads both Sheets and Neon for `jobs`, `time_records`, `job_comments` within the active 21-day window and produces a key-by-key diff | Sheets column maps confirmed in SHEETS_SCHEMA.md; Neon column names confirmed in schema.ts; gspread + psycopg2 pattern documented below |
| DINT-02 | Script writes `artifacts/neon_audit_YYYYMMDD.json` with structured pass/fail result and exits with code 0/1/2 | JSON schema and exit code conventions locked in CONTEXT.md D-10/D-12; artifacts/ directory exists per project convention |
| DINT-03 | Human reads terminal output and gives explicit go/no-go before Phase 13 begins — this script IS the gate | Script is human-operated; no automation of Phase 13 trigger; terminal pretty-print is the gate artifact |
</phase_requirements>

---

## Summary

Phase 12 builds a standalone Python audit script (`tools/orchestrator/neon_audit.py`) that compares Google Sheets data against Neon Postgres for three tables — `jobs`, `time_records`, and `job_comments` — within a rolling 21-day window. The script is read-only on both sides, produces a terminal report and a JSON artifact, and exits with a structured code (0/1/2) that gates Phase 13 (Neon cut-over).

The two libraries needed (`gspread 6.2.1`, `psycopg2-binary 2.9.12`) are confirmed on PyPI, verified `[OK]` by slopcheck, and now installed on this machine. The Neon connection pattern is already established in this project (drizzle-kit uses `DATABASE_URL_UNPOOLED`). The Sheets column maps are fully documented in `docs/SHEETS_SCHEMA.md`. The shadow-write gaps documented in `docs/SHADOW_WRITES.md` directly determine comparison logic: `time_records` Neon-only keys are expected (direct clock-in write path) and are informational, not failures; `job_comments` has no unique key so count-only comparison is correct.

**Primary recommendation:** Build the script in four sections — (1) env var validation + argparse, (2) Sheets fetch functions per table, (3) Neon query functions per table, (4) diff + report engine. Keep each section independently testable. Follow the argparse and log/banner pattern from `ptow_adw.py` exactly for toolchain consistency.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Sheets data fetch | Python script (CLI tool) | — | gspread reads Sheets API directly; no GAS intermediary |
| Neon data fetch | Python script (CLI tool) | — | psycopg2 direct connection; no Next.js API routes |
| 21-day window filtering | Python script (in-memory) | — | D-03 locks this: filter in Python after full fetch |
| Key-by-key diff | Python script (in-memory) | — | Set operations on natural keys |
| Terminal report | Python script (stdout) | — | Human-readable gate output |
| JSON artifact | Python script (file write) | — | `artifacts/neon_audit_YYYYMMDD.json` |
| Go/no-go decision | Human (Brandon) | — | DINT-03: gate is explicit human approval |

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `psycopg2-binary` | 2.9.12 | PostgreSQL client for Python | Standard Postgres driver; `-binary` avoids build deps on Windows; same convention as drizzle-kit tooling in this repo |
| `gspread` | 6.2.1 | Google Sheets API v4 Python client | Established library for service-account Sheets access; used in similar admin tooling |

### Supporting (stdlib — no install needed)

| Module | Purpose |
|--------|---------|
| `argparse` | CLI argument parsing (follows `ptow_adw.py` pattern) |
| `os` | `os.getenv()` for env var access |
| `sys` | `sys.exit(0/1/2)` for exit codes |
| `json` | JSON artifact serialization |
| `datetime` | Rolling window calculation, artifact filename, `run_at` timestamp |
| `zoneinfo` | Timezone-aware datetime for America/Los_Angeles (stdlib since Python 3.9) |
| `pathlib` | Artifact file path construction |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `psycopg2-binary` | `psycopg` (v3) | psycopg v3 is newer but project already established `psycopg2` convention via drizzle-kit; no reason to introduce v3 here |
| `gspread` | `google-api-python-client` raw | gspread is higher-level, simpler for this use case; raw client would require more boilerplate |
| `zoneinfo` | `pytz` | `zoneinfo` is stdlib in Python 3.9+; machine is Python 3.13.7 so no extra dependency needed |

**Installation:**
```bash
pip install psycopg2-binary==2.9.12 gspread==6.2.1
```

---

## Package Legitimacy Audit

| Package | Registry | Age | Downloads | Source Repo | slopcheck | Disposition |
|---------|----------|-----|-----------|-------------|-----------|-------------|
| `psycopg2-binary` | PyPI | ~12 yrs | Very high | github.com/psycopg/psycopg2 | [OK] | Approved |
| `gspread` | PyPI | ~12 yrs | High | github.com/burnash/gspread | [OK] | Approved |

**Packages removed due to slopcheck [SLOP] verdict:** none
**Packages flagged as suspicious [SUS]:** none

*slopcheck 0.6.1 ran successfully. Both packages rated [OK].*

---

## Architecture Patterns

### System Architecture Diagram

```
Brandon (terminal)
       |
       v
neon_audit.py --days 21 --table all
       |
       +---> [ENV VALIDATION]
       |       GOOGLE_SERVICE_ACCOUNT_JSON (path)
       |       DATABASE_URL_UNPOOLED
       |
       +---> [SHEETS FETCH] gspread + service account
       |       Spreadsheet: APT Lead Intake Master
       |       Tab: "Dispatch Queue"   --> jobs keys
       |       Tab: "Time Records"     --> time_records keys
       |       Tab: "JobComments"      --> job_comments sheets_ids
       |
       +---> [NEON FETCH] psycopg2 direct
       |       SELECT job_id FROM jobs WHERE timestamp >= cutoff
       |       SELECT record_id FROM time_records WHERE date >= cutoff
       |       SELECT sheets_id, COUNT(*) FROM job_comments WHERE created_at >= cutoff
       |
       +---> [DIFF ENGINE] set operations
       |       sheets_set - neon_set  --> missing from Neon (FAIL condition)
       |       neon_set - sheets_set  --> Neon-only (informational for time_records)
       |
       +---> [REPORT]
               stdout: pretty-print per table
               artifacts/neon_audit_YYYYMMDD.json
               sys.exit(0 | 1 | 2)
```

### Recommended Project Structure

```
tools/orchestrator/
├── neon_audit.py         # New — this phase
├── ptow_adw.py           # Existing — reference for patterns
├── adw_trigger_server.py # Existing
├── adw_document_iso.py   # Existing
├── requirements.txt      # Create — psycopg2-binary + gspread
└── tests/
    └── test_neon_audit.py  # New — Wave 0 test stubs
```

### Pattern 1: gspread Service Account Auth

**What:** Authenticate with a service account JSON file loaded from a path env var, then open a spreadsheet by ID.
**When to use:** Every Sheets fetch — one auth per script invocation, reuse the client.

```python
# Source: gspread official docs — service account auth
import gspread
from google.oauth2.service_account import Credentials

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets.readonly",
    "https://www.googleapis.com/auth/drive.readonly",
]

def get_sheets_client(service_account_path: str) -> gspread.Client:
    creds = Credentials.from_service_account_file(service_account_path, scopes=SCOPES)
    return gspread.authorize(creds)

# Usage:
sa_path = os.getenv("GOOGLE_SERVICE_ACCOUNT_JSON")
if not sa_path:
    print("ERROR: GOOGLE_SERVICE_ACCOUNT_JSON not set — set it to the path of your service account key JSON file")
    sys.exit(2)
client = get_sheets_client(sa_path)
```

**Scope note:** `spreadsheets.readonly` is sufficient for read-only audit. `drive.readonly` is needed by gspread internally to open spreadsheets by name; opening by ID only may not require it but including both is the safe standard pattern. [ASSUMED — needs confirmation against gspread 6.x docs if drive scope causes auth failures]

### Pattern 2: psycopg2 Connection to Neon (Unpooled)

**What:** Direct Postgres connection using `DATABASE_URL_UNPOOLED`. Neon requires SSL — the connection string from Neon's dashboard already includes `sslmode=require`.
**When to use:** All Neon queries in this script.

```python
# Source: psycopg2 docs + Neon connection conventions established in this repo
import psycopg2

def get_neon_conn():
    url = os.getenv("DATABASE_URL_UNPOOLED")
    if not url:
        print("ERROR: DATABASE_URL_UNPOOLED not set — source tech-pwa/.env.local or export manually")
        sys.exit(2)
    # Neon DSN already includes sslmode=require — no extra ssl param needed
    return psycopg2.connect(url)

# Context manager usage:
with get_neon_conn() as conn:
    with conn.cursor() as cur:
        cur.execute("SELECT job_id FROM jobs WHERE timestamp >= %s AND org_id = %s", (cutoff, "APT-CA"))
        rows = cur.fetchall()
```

**Neon SSL:** The `DATABASE_URL_UNPOOLED` DSN from Neon's dashboard includes `sslmode=require` in the query string. psycopg2 honors this automatically — no separate `sslmode` kwarg needed. [VERIFIED: established project convention from Phase 6 drizzle-kit work]

### Pattern 3: gspread Tab Access and Row Fetch

**What:** Open a specific tab by name, fetch all values as a list of lists.

```python
SPREADSHEET_ID = "1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4"

spreadsheet = client.open_by_key(SPREADSHEET_ID)
ws = spreadsheet.worksheet("Dispatch Queue")  # exact tab name matters
rows = ws.get_all_values()  # returns list[list[str]], row 0 = headers
data_rows = rows[1:]        # skip header row
```

**Tab name note:** `docs/SHEETS_SCHEMA.md` maps tab labels as displayed in the UI. The canonical tab name string passed to `worksheet()` must match exactly (case-sensitive). See column mapping table below.

### Pattern 4: 21-Day Window Date Filtering in Python

**What:** Filter Sheets rows where a date/timestamp column falls within `[today - N days, today]` using `zoneinfo` for America/Los_Angeles.

```python
from datetime import datetime, timedelta, date
from zoneinfo import ZoneInfo

LA = ZoneInfo("America/Los_Angeles")

def get_cutoff(days: int) -> date:
    return (datetime.now(tz=LA) - timedelta(days=days)).date()

def parse_sheets_date(val: str) -> date | None:
    """Parse Sheets date strings — handles 'YYYY-MM-DD HH:MM' and 'YYYY-MM-DD'."""
    val = val.strip()
    if not val:
        return None
    for fmt in ("%Y-%m-%d %H:%M:%S", "%Y-%m-%d %H:%M", "%Y-%m-%d"):
        try:
            return datetime.strptime(val, fmt).date()
        except ValueError:
            continue
    return None
```

**Date format gotcha:** Sheets stores dates as formatted strings, not typed values, when fetched via `get_all_values()`. The actual format depends on the cell format in the spreadsheet — Dispatch Queue Col 1 (Timestamp) uses `yyyy-MM-dd HH:mm` per SHEETS_SCHEMA.md. Always try multiple formats defensively.

### Pattern 5: argparse + log/banner Following ptow_adw.py Convention

```python
import argparse

def parse_args():
    parser = argparse.ArgumentParser(description="Neon data integrity audit vs Google Sheets")
    parser.add_argument("--days", type=int, default=21, help="Rolling window in days (default: 21)")
    parser.add_argument(
        "--table",
        choices=["jobs", "time_records", "job_comments", "all"],
        default="all",
        help="Table to audit (default: all)"
    )
    return parser.parse_args()

def log(msg: str) -> None:
    ts = datetime.now().strftime("%H:%M:%S")
    print(f"[{ts}] {msg}", flush=True)

def banner(section: str) -> None:
    print(f"\n{'='*60}", flush=True)
    log(f"AUDIT: {section}")
    print(f"{'='*60}\n", flush=True)
```

### Anti-Patterns to Avoid

- **Opening spreadsheet by name instead of key:** `client.open("APT Lead Intake Master")` is fragile if the sheet is renamed. Always use `client.open_by_key(SPREADSHEET_ID)`. [ASSUMED]
- **Using pooled DATABASE_URL:** Phase 6 established that drizzle-kit and one-shot scripts use `DATABASE_URL_UNPOOLED`. Using the pooled connection string for direct psycopg2 may cause connection errors with PgBouncer's transaction pooling mode.
- **Filtering Sheets rows in Sheets API query:** D-03 locks this as Python-side filtering. Do not use the Sheets API `values().get()` with `majorDimension` or filter parameters — just fetch all and filter.
- **Comparing timestamps with timezone-naive datetimes:** Neon `timestamp` columns are stored without timezone in this schema (confirmed from schema.ts). The `jobs.timestamp` field is `timestamp` (not `timestamptz`). Filter using `DATE(timestamp) >= %s` with a date string, or cast in SQL, to avoid timezone comparison bugs.
- **Using `sys.exit()` inside a `with psycopg2.connect()` block without closing cursor:** Always use context managers (`with conn:`, `with conn.cursor() as cur:`) so connections are closed cleanly on exit.

---

## Sheets Column Mapping (Confirmed from SHEETS_SCHEMA.md)

This table maps Sheets columns to Neon fields for each table audited.

### jobs — Dispatch Queue tab

| Sheets Tab | Spreadsheet ID | Key Column | Key Format | Date Filter Column | Date Format |
|------------|----------------|------------|------------|-------------------|-------------|
| `Dispatch Queue` | `1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4` | Col 2 (0-indexed: 1) = Lead ID | String, e.g. `"WO-12345"` | Col 1 (0-indexed: 0) = Timestamp | `yyyy-MM-dd HH:mm` |

**Neon query:**
```sql
SELECT job_id FROM jobs
WHERE org_id = 'APT-CA'
  AND timestamp >= %s
```

**Key column detail:** SHEETS_SCHEMA.md Dispatch Queue shows Col 2 = Lead ID. In 0-indexed terms this is index 1. The Neon natural key is `jobs.job_id` — these must be the same value (WO ID) for the diff to be meaningful.

### time_records — Time Records tab

| Sheets Tab | Spreadsheet ID | Key Column | Key Format | Date Filter Column | Date Format |
|------------|----------------|------------|------------|-------------------|-------------|
| `Time Records` | `1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4` | Col 0 (0-indexed: 0) = RECORD_ID | String | Col 6 (0-indexed: 6) = DATE | `YYYY-MM-DD` [ASSUMED — schema says "0-15: Standard clock data (RECORD_ID, JOB_ID, TECH_ID, TECH_NAME, CLOCK_IN, STATUS, DATE...)"; DATE is index 6] |

**Neon query:**
```sql
SELECT record_id FROM time_records
WHERE org_id = 'APT-CA'
  AND date >= %s
```

**Note:** `time_records.date` in Neon is `text` type (confirmed from schema.ts line 239). Filter with string comparison `date >= '2026-05-11'` (ISO format).

### job_comments — JobComments tab

| Sheets Tab | Spreadsheet ID | Key Column | Key Format | Date Filter | Notes |
|------------|----------------|------------|------------|-------------|-------|
| `JobComments` | `1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4` | None — no natural key in Sheets | Count only | No date column documented | Auto-provisioned tab; no fixed column schema in SHEETS_SCHEMA.md |

**Neon query:**
```sql
SELECT COUNT(*) as total, COUNT(sheets_id) as with_sheets_id
FROM job_comments
WHERE org_id = 'APT-CA'
  AND created_at >= %s
```

**job_comments special case (from D-07 + SHADOW_WRITES.md):** No reliable natural key exists in Sheets for job_comments. The `job_comments` Neon table has `sheets_id` (nullable, partial unique index). The audit for this table is count-based: compare Sheets row count vs Neon total count, and separately report how many Neon rows have `sheets_id IS NULL` (unverified/direct-write records). This is not a FAIL — it's an informational metric.

**SHEETS_SCHEMA.md gap:** The `JobComments` tab is listed as "auto-provisioned on first use" with no column schema documented. The column structure must be inferred from the GAS write path (`addJobCommentDA`). [ASSUMED — the planner should note that the JobComments Sheets tab column discovery may require reading DashboardAPI.gs to confirm column indices for the date filter.]

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Google Sheets auth | Custom OAuth flow | `gspread` + `google.oauth2.service_account.Credentials` | Service account flow has multiple edge cases (token refresh, scope handling, retry on 429) |
| Postgres connection | urllib/raw TCP | `psycopg2.connect()` | SSL negotiation, connection lifecycle, cursor protocol |
| Timezone math | Manual UTC offset | `zoneinfo.ZoneInfo("America/Los_Angeles")` | DST transitions handled automatically |
| Date parsing | Single `strptime` | Try multiple formats defensively | Sheets returns dates as formatted strings; format varies by cell format setting |

**Key insight:** The comparison logic itself (set diff) is trivial stdlib — the complexity is entirely in the two data fetching layers. Don't invent wrappers; use the established libraries for auth and connection.

---

## Shadow-Write Gap Impact on Audit Logic

This section is critical — it determines whether a diff result is a FAIL or expected behavior.

### time_records — Dual Write Path (HIGH risk, documented gap)

**The gap:** Two write paths exist for `time_records`:
1. `TechPWA.gs → /api/time-records/sync` (GAS primary, syncs to Neon)
2. `Next.js /api/field/clock-in` (writes directly to Neon, bypasses GAS)

**Audit impact:**
- Records from path 2 will appear in Neon but NOT in Sheets. These are "Neon-only" keys.
- Neon-only keys are **informational, not FAIL** (per D-06 and CONTEXT.md Specifics note).
- FAIL condition = Sheets keys missing from Neon (sync dropped).
- The audit report must clearly label Neon-only records as "direct-write path (expected)" to avoid false alarms.

**SQL to detect:**
```sql
-- All time_records in window
SELECT record_id FROM time_records
WHERE org_id = 'APT-CA' AND date >= %s
```
Then in Python: `neon_set - sheets_set` = Neon-only (informational). `sheets_set - neon_set` = missing from Neon (FAIL).

### job_comments — No Unique Key (HIGH risk, documented gap)

**The gap:** No unique constraint on `job_comments` (no messageId or natural key). Repeated lazy GET calls can insert duplicates. The partial unique index is on `sheets_id` only when not NULL.

**Audit impact:**
- Cannot do key-by-key diff — use count comparison only.
- Report `COUNT(*)` (total Neon rows) and `COUNT(sheets_id)` (rows with a Sheets reference).
- `COUNT(*) - COUNT(sheets_id)` = unverified rows (from direct POST writes with no sheets_id).
- No PASS/FAIL for job_comments — report as informational metrics only. [ASSUMED — CONTEXT.md D-07 says "report unverified_neon" but does not state FAIL condition for job_comments. Planner should confirm: does any mismatch in job_comments count trigger exit code 1?]

### jobs — Auth Header Discrepancy (MEDIUM risk)

**The gap:** `Code.js` uses `x-api-key` header; `/api/jobs/sync` checks `DASHBOARD_API_KEY`. If these mismatched, some jobs from Code.js may have failed to sync to Neon.

**Audit impact:** jobs missing from Neon that exist in Sheets is the primary FAIL signal. This auth discrepancy is the most likely cause if jobs are missing. The audit script detects the symptom — root cause resolution is Phase 13.

---

## Common Pitfalls

### Pitfall 1: Sheets API Rate Limits (429 Too Many Requests)

**What goes wrong:** `gspread` raises `gspread.exceptions.APIError` with HTTP 429 when the script is run frequently (>60 reads/min per user).
**Why it happens:** Google Sheets API v4 has per-user quota limits. The full-sheet fetch for three tabs in one run should stay well under limits for a one-shot script.
**How to avoid:** Fetch each tab once, cache in memory, do all filtering in Python. Do not call `get_all_values()` in a loop.
**Warning signs:** `APIError: {'code': 429, 'message': 'Quota exceeded...'}`

### Pitfall 2: gspread 6.x Auth API Changed from v5

**What goes wrong:** `gspread.service_account()` shortcut was the v5 pattern. v6 changed some internals.
**Why it happens:** gspread 6.0 refactored auth to fully delegate to `google-auth` library.
**How to avoid:** Use the explicit `Credentials.from_service_account_file()` + `gspread.authorize(creds)` pattern (shown in Pattern 1 above). This is stable across gspread 5.x and 6.x. [ASSUMED — verify against gspread 6.2.1 docs if `gspread.service_account()` shortcut is preferred]

### Pitfall 3: Sheets Date Column Returns Empty Strings for Blank Rows

**What goes wrong:** `get_all_values()` pads short rows with empty strings. A row with no timestamp value returns `""` in the timestamp column, causing `parse_sheets_date()` to return None.
**Why it happens:** gspread always returns a rectangular grid — short rows are right-padded with `""`.
**How to avoid:** `parse_sheets_date()` must handle `""` gracefully (return None, skip row). Filter: `if parsed_date is None: continue`.

### Pitfall 4: psycopg2 `date >= %s` with text column

**What goes wrong:** `time_records.date` is `text` type in Neon schema (not `date` type). Postgres will use string comparison for `date >= '2026-05-11'`, which works correctly for ISO-format dates (YYYY-MM-DD sorts lexicographically = chronologically). But if any rows have non-ISO format dates in that column, they will silently be excluded or included incorrectly.
**Why it happens:** The Drizzle schema defines `date: text('date')` — not a typed `date` column.
**How to avoid:** Add a comment in the query explaining the text comparison assumption. Optionally cast: `CAST(date AS date) >= %s::date` — but this will raise on malformed rows, which may be acceptable as a data quality signal.

### Pitfall 5: artifacts/ Directory May Not Exist

**What goes wrong:** `open("artifacts/neon_audit_20260601.json", "w")` raises `FileNotFoundError` if the directory doesn't exist.
**Why it happens:** First run in a fresh checkout.
**How to avoid:** `Path("artifacts").mkdir(parents=True, exist_ok=True)` before writing the artifact. Follow the same pattern as `setup_artifact_dirs()` in `ptow_adw.py`.

### Pitfall 6: Neon Connection String Missing sslmode

**What goes wrong:** If `DATABASE_URL_UNPOOLED` is manually set without `sslmode=require`, psycopg2 connects without SSL and Neon rejects the connection.
**Why it happens:** Neon requires SSL for all connections.
**How to avoid:** The DSN from Neon's dashboard includes `sslmode=require`. Document in the usage comment: "Copy DATABASE_URL_UNPOOLED from Neon dashboard — it includes sslmode=require." Do not strip query params when copying the DSN.

---

## Code Examples

### Full gspread Auth + Tab Fetch

```python
# Source: gspread 6.x official pattern + project convention (GOOGLE_SERVICE_ACCOUNT_JSON)
import os, sys, gspread
from google.oauth2.service_account import Credentials

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets.readonly",
    "https://www.googleapis.com/auth/drive.readonly",
]
SPREADSHEET_ID = "1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4"

def build_sheets_client() -> gspread.Spreadsheet:
    sa_path = os.getenv("GOOGLE_SERVICE_ACCOUNT_JSON")
    if not sa_path:
        print("ERROR: GOOGLE_SERVICE_ACCOUNT_JSON not set. Set it to the path of your GCP service account key JSON.")
        sys.exit(2)
    creds = Credentials.from_service_account_file(sa_path, scopes=SCOPES)
    gc = gspread.authorize(creds)
    return gc.open_by_key(SPREADSHEET_ID)
```

### Neon Query with Window Filter

```python
# Source: psycopg2 docs + project convention (DATABASE_URL_UNPOOLED)
import os, sys, psycopg2

def build_neon_conn():
    url = os.getenv("DATABASE_URL_UNPOOLED")
    if not url:
        print("ERROR: DATABASE_URL_UNPOOLED not set. Source tech-pwa/.env.local or export manually.")
        sys.exit(2)
    try:
        return psycopg2.connect(url)
    except psycopg2.OperationalError as e:
        print(f"ERROR: Cannot connect to Neon: {e}")
        sys.exit(2)

def fetch_neon_job_ids(conn, cutoff_date: str) -> set:
    with conn.cursor() as cur:
        cur.execute(
            "SELECT job_id FROM jobs WHERE org_id = %s AND timestamp::date >= %s",
            ("APT-CA", cutoff_date)
        )
        return {row[0] for row in cur.fetchall()}
```

### Diff + Report Engine Skeleton

```python
import json
from datetime import datetime
from pathlib import Path

def report_table(name: str, sheets_keys: set, neon_keys: set) -> dict:
    missing_from_neon = sorted(sheets_keys - neon_keys)
    neon_only = sorted(neon_keys - sheets_keys)
    passed = len(missing_from_neon) == 0
    label = "PASS" if passed else "FAIL"
    print(f"[{label:4}] {name:<14} — Sheets: {len(sheets_keys):>4}  Neon: {len(neon_keys):>4}  "
          f"Missing from Neon: {missing_from_neon[:5]}{'...' if len(missing_from_neon) > 5 else ''}")
    return {
        "sheets_count": len(sheets_keys),
        "neon_count": len(neon_keys),
        "missing_from_neon": missing_from_neon,
        "neon_only": neon_only,
        "passed": passed,
    }

def write_artifact(results: dict, days: int) -> None:
    Path("artifacts").mkdir(parents=True, exist_ok=True)
    fname = f"artifacts/neon_audit_{datetime.now().strftime('%Y%m%d')}.json"
    payload = {
        "run_at": datetime.utcnow().isoformat() + "Z",
        "window_days": days,
        "overall": "PASS" if all(v.get("passed", True) for v in results.values()) else "FAIL",
        "tables": results,
    }
    Path(fname).write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"\nArtifact written: {fname}")
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `gspread.service_account()` shortcut | `Credentials.from_service_account_file()` + `gspread.authorize()` | gspread 5→6 | More explicit, stable across versions |
| `psycopg2` only | `psycopg` v3 (async, typed) | 2022 (psycopg 3.0 released) | psycopg v3 is modern but this project uses v2 convention — no reason to change for a one-shot script |

**Deprecated/outdated:**
- `oauth2client` library: deprecated in favor of `google-auth`. gspread 6.x depends on `google-auth` directly — do not use `oauth2client` for credentials.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `drive.readonly` scope required by gspread when opening by key | gspread auth pattern | Auth failure (403 Insufficient Permission) — fix by removing drive scope or adding it |
| A2 | `gspread.service_account()` shortcut changed in v6; explicit `Credentials` pattern is safer | Pitfall 2 | If shortcut still works in v6, code is fine — no regression, just more verbose |
| A3 | `Time Records` tab date column is index 6 (DATE) based on "0-15: RECORD_ID, JOB_ID, TECH_ID, TECH_NAME, CLOCK_IN, STATUS, DATE" ordering in SHEETS_SCHEMA.md | Sheets column mapping | Wrong date column = wrong window filter = incorrect row count |
| A4 | `JobComments` tab has no fixed column schema documented — date filter column unknown | job_comments section | Must read DashboardAPI.gs `addJobCommentDA` to find the date/timestamp column index before implementing job_comments Sheets fetch |
| A5 | job_comments count mismatch does NOT trigger exit code 1 (FAIL) | job_comments section | If planner intends mismatch to be FAIL, exit code logic must include job_comments in the overall pass/fail |
| A6 | `jobs.job_id` in Neon matches the "Lead ID" value (Col 2) in Dispatch Queue — same string format | Sheets column mapping | Key mismatch = every job appears as missing; entire diff is wrong |

---

## Open Questions (RESOLVED)

1. **job_comments Sheets tab column for date filtering** — RESOLVED
   - Resolution: Planner read `DashboardAPI.gs → addJobCommentDA` and `getJobCommentsSheet()`. JobComments tab has 6 columns; Col 5 = Timestamp (format `yyyy-MM-dd'T'HH:mm:ss`). Documented in `docs/SHEETS_SCHEMA.md` via Plan 12-01 Task 2.

2. **job_comments FAIL condition** — RESOLVED
   - Resolution: job_comments count mismatch is **informational only** and does NOT trigger exit code 1. D-07 ("compare counts only") and D-10 ("any mismatch") are reconciled: D-10's "any mismatch" refers to key-diffable tables (`jobs`, `time_records`). job_comments has no natural key and is explicitly carved out as count-only/informational per D-07. Exit code 1 is triggered only by Sheets keys absent from Neon in `jobs` or `time_records`.

3. **jobs.job_id vs Sheets Lead ID string format** — RESOLVED
   - Resolution: Plan 12-01 includes a spot-check task (Task 3) where AG queries one known job from both Neon (`jobs.job_id`) and Sheets (Dispatch Queue Col 2) and confirms the string format matches before implementing diff logic. If a mismatch is found, AG flags to Claude Code before proceeding.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Python | Script runtime | ✓ | 3.13.7 | — |
| `psycopg2-binary` | Neon connection | ✓ | 2.9.12 | — |
| `gspread` | Sheets access | ✓ | 6.2.1 | — |
| `google-auth` | gspread auth | ✓ | 2.49.1 (already installed) | — |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Sheets auth | ✗ (Brandon must create) | — | Brandon creates GCP service account, sets env var |
| `DATABASE_URL_UNPOOLED` | Neon connection | ✓ (in tech-pwa/.env.local) | — | Source .env.local before running |
| `artifacts/` directory | JSON artifact write | ✓ (exists per project convention) | — | Script creates it with mkdir(exist_ok=True) |

**Missing dependencies with no fallback:**
- `GOOGLE_SERVICE_ACCOUNT_JSON`: Brandon must create a GCP service account, download the key JSON, and set the env var. The Dispatch Queue, Time Records, and JobComments Sheets tabs must be shared with the service account email at Viewer level. This is a prerequisite Brandon action before the script can be tested.

**Missing dependencies with fallback:**
- None — all other dependencies are available.

---

## Validation Architecture

> `workflow.nyquist_validation` not set to false in config.json — validation section included.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | pytest (inferred from `tools/orchestrator/tests/conftest.py` existing) |
| Config file | none detected at orchestrator level — uses pytest defaults |
| Quick run command | `pytest tools/orchestrator/tests/test_neon_audit.py -x` |
| Full suite command | `pytest tools/orchestrator/tests/ -v` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DINT-01 | Script fetches Sheets rows and Neon rows for 21-day window and diffs by key | unit (mock both clients) | `pytest tools/orchestrator/tests/test_neon_audit.py::test_jobs_diff -x` | ❌ Wave 0 |
| DINT-01 | Window filtering excludes rows older than --days | unit | `pytest tools/orchestrator/tests/test_neon_audit.py::test_window_filter -x` | ❌ Wave 0 |
| DINT-02 | Exit code 0 when no mismatches, 1 when mismatches, 2 on connection failure | unit | `pytest tools/orchestrator/tests/test_neon_audit.py::test_exit_codes -x` | ❌ Wave 0 |
| DINT-02 | JSON artifact written to artifacts/neon_audit_YYYYMMDD.json with correct schema | unit | `pytest tools/orchestrator/tests/test_neon_audit.py::test_artifact_schema -x` | ❌ Wave 0 |
| DINT-03 | Terminal output includes [PASS|FAIL] prefix per table with counts | unit | `pytest tools/orchestrator/tests/test_neon_audit.py::test_terminal_output -x` | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** `pytest tools/orchestrator/tests/test_neon_audit.py -x`
- **Per wave merge:** `pytest tools/orchestrator/tests/ -v`
- **Phase gate:** Full suite green before human review of audit output

### Wave 0 Gaps

- [ ] `tools/orchestrator/tests/test_neon_audit.py` — covers DINT-01, DINT-02, DINT-03 with mocked gspread + psycopg2
- [ ] `tools/orchestrator/requirements.txt` — create with `psycopg2-binary==2.9.12` and `gspread==6.2.1`

---

## Security Domain

> ASVS applicable to this phase (read-only audit script with external credentials).

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | N/A — no user auth; service account handles Sheets auth |
| V3 Session Management | no | N/A — stateless one-shot script |
| V4 Access Control | no | N/A — read-only, no user-facing endpoints |
| V5 Input Validation | yes | Validate env vars present before use; parse date strings defensively |
| V6 Cryptography | no | N/A — no crypto; SSL handled by psycopg2 and gspread |

### Known Threat Patterns for this stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Service account key in plain text in git | Information Disclosure | Key loaded from file path env var (D-02); `.json` key file must be in `.gitignore` |
| DATABASE_URL_UNPOOLED logged in terminal output | Information Disclosure | Never print the DSN; only print the error message if it is missing |

---

## Sources

### Primary (HIGH confidence)
- `docs/SHADOW_WRITES.md` — shadow-write paths, gaps, dual-write risk for time_records and job_comments
- `tech-pwa/src/lib/schema.ts` — Neon table definitions: `jobs` (line 337), `time_records` (line 216), `job_comments` (line 376)
- `docs/SHEETS_SCHEMA.md` — column maps for Dispatch Queue, Time Records, JobComments tabs
- `tools/orchestrator/ptow_adw.py` — argparse pattern, log/banner, exit code conventions, artifact directory handling
- `.planning/phases/12-data-integrity-audit/12-CONTEXT.md` — locked decisions D-01 through D-15
- PyPI registry (`pip index versions`) — psycopg2-binary 2.9.12, gspread 6.2.1 confirmed current
- slopcheck 0.6.1 — both packages rated [OK]

### Secondary (MEDIUM confidence)
- SHEETS_SCHEMA.md Time Records column ordering — DATE at index 6 inferred from narrative description, not an explicit index table

### Tertiary (LOW confidence — needs verification)
- gspread 6.x `drive.readonly` scope requirement when opening by key
- JobComments Sheets tab column indices for date filtering (tab has no schema in SHEETS_SCHEMA.md)

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — packages confirmed on PyPI, slopcheck [OK], installed and available
- Column mapping (jobs, time_records): HIGH — confirmed from SHEETS_SCHEMA.md
- Column mapping (job_comments): LOW — tab has no documented schema; needs DashboardAPI.gs read
- Architecture patterns: HIGH — psycopg2 + gspread patterns are established; Neon connection convention verified from Phase 6
- Pitfalls: HIGH — derived from schema.ts type inspection and shadow-write inventory

**Research date:** 2026-06-01
**Valid until:** 2026-07-01 (stable libraries; gspread API is stable)
