# Phase 12 — Plan 02 Summary: Neon Audit Fetch Layer

## What Was Built

Created `tools/orchestrator/neon_audit.py` — the data fetch layer for the Neon vs Google Sheets integrity audit.

**Functions implemented:**

| Function | Purpose |
|---|---|
| `parse_args()` | CLI with `--days` (default 21) and `--table` (choices: jobs/time_records/job_comments/all) |
| `get_cutoff(days)` | Returns `date` in America/Los_Angeles TZ |
| `parse_sheets_date(val)` | Parses 4 date formats; returns None for empty/malformed |
| `build_sheets_client()` | ADC auth → gspread.Spreadsheet handle |
| `build_neon_conn()` | psycopg2 connection from DATABASE_URL_UNPOOLED |
| `fetch_sheets_jobs(spreadsheet, cutoff)` | Dispatch Queue → set of Lead IDs |
| `fetch_sheets_time_records(spreadsheet, cutoff)` | Time Records → set of Record IDs |
| `fetch_sheets_job_comments(spreadsheet, cutoff)` | JobComments → int count (tab may not exist) |
| `fetch_neon_jobs(conn, cutoff_date)` | Neon jobs table → set of job_id strings |
| `fetch_neon_time_records(conn, cutoff_date)` | Neon time_records table → set of record_id strings |
| `fetch_neon_job_comments(conn, cutoff_date)` | Neon job_comments → dict with total/with_sheets_id/unverified |

**Placeholder stubs (Wave 3):** `diff_jobs`, `diff_time_records`, `diff_job_comments`, `print_table_result`, `write_artifact`, `run_audit` — all raise `NotImplementedError("implement in 12-03-PLAN.md")`.

## Verification Results

### 1. `python -m py_compile tools/orchestrator/neon_audit.py`
```
py_compile: OK
```

### 2. `python tools/orchestrator/neon_audit.py --help`
```
usage: neon_audit.py [-h] [--days DAYS]
                     [--table {jobs,time_records,job_comments,all}]

Neon vs Google Sheets Data Integrity Audit (Wave 2 — fetch layer).

options:
  -h, --help            show this help message and exit
  --days DAYS           Audit window in days from today (default: 21)
  --table {jobs,time_records,job_comments,all}
                        Which table to audit (default: all)

Neon vs Google Sheets Data Integrity Audit — Fetch Layer (Wave 2 of 3).
...
EXIT CODES:
  0 = PASS (no Sheets keys missing from Neon)
  1 = FAIL (jobs or time_records have Sheets keys absent from Neon)
  2 = connectivity error (ADC not configured, or Neon connection failed)
```

### 3. Structural assertion check
```
PASS
```

## Auth Approach

Uses **Application Default Credentials (ADC)** via `google.auth.default(scopes=SCOPES)`.

- No `GOOGLE_SERVICE_ACCOUNT_JSON` env var
- No `Credentials.from_service_account_file()`
- `google-auth` 2.49.1 already installed in the environment
- `google.auth.exceptions.DefaultCredentialsError` caught → prints actionable `gcloud auth application-default login` command → exits with code 2

## Deviations from Plan Docs

- **Service account key approach removed entirely** — plan docs referenced `GOOGLE_SERVICE_ACCOUNT_JSON`. Replaced with ADC per task instructions (GCP org policy blocks key creation).
- No other deviations. All function signatures, SQL queries, column index assumptions, and exit codes match the spec exactly.

## Next Step

Wave 3 (12-03-PLAN.md): implement the diff engine and report functions (`diff_jobs`, `diff_time_records`, `diff_job_comments`, `print_table_result`, `write_artifact`, `run_audit`) on top of this fetch layer.
