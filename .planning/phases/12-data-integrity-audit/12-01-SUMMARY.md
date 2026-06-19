---
phase: "12"
plan: "01"
status: complete
completed_at: "2026-06-01"
---

# Plan 01 Summary — Wave 1: Prerequisites & Scaffold

## What was built

- `tools/orchestrator/requirements.txt` — created with `psycopg2-binary==2.9.12` and `gspread==6.2.1`
- `docs/SHEETS_SCHEMA.md` — JobComments section updated with 6-column documented schema (Col 0–5, Timestamp at index 5, date filter note, count-only audit note)
- `tools/orchestrator/tests/test_neon_audit.py` — 9 pytest stub functions, all SKIPPED, ready for Wave 3 implementation

## Auth approach change

GCP org policy `iam.managed.disableServiceAccountKeyCreation` blocks service account JSON key creation. **Auth approach changed to Application Default Credentials (ADC).**

- `GOOGLE_SERVICE_ACCOUNT_JSON` env var dropped
- `build_sheets_client()` will use `google.auth.default(scopes=SCOPES)` instead of `Credentials.from_service_account_file()`
- Brandon runs `gcloud auth application-default login --scopes="https://www.googleapis.com/auth/spreadsheets.readonly,https://www.googleapis.com/auth/drive.readonly"` once — that's the entire setup requirement
- No spreadsheet sharing needed — Brandon's ADC credentials already own the spreadsheet
- `google-auth` 2.49.1 already installed as gspread transitive dep

## Verification

- `python -c "..."` automated check: PASS
- `pytest tools/orchestrator/tests/test_neon_audit.py -v`: 9 skipped, 0 failed, 0 errors

## Deferred to Brandon

- `gcloud auth application-default login --scopes=...` — one-time command needed before production test run (Wave 3 Task 4)
