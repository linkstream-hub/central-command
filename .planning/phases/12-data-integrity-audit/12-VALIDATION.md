---
phase: 12
phase-slug: data-integrity-audit
date: 2026-06-01
---

# Validation Strategy — Phase 12: Data Integrity Audit

## Test Framework

| Property | Value |
|----------|-------|
| Framework | pytest |
| Config | pytest defaults (no pytest.ini at orchestrator level) |
| Quick run | `pytest tools/orchestrator/tests/test_neon_audit.py -x` |
| Full suite | `pytest tools/orchestrator/tests/ -v` |

## Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File |
|--------|----------|-----------|-------------------|------|
| DINT-01 | Script fetches Sheets rows and Neon rows for 21-day window and diffs by key | unit (mock both clients) | `pytest tools/orchestrator/tests/test_neon_audit.py::test_jobs_diff -x` | Wave 0 stub → Wave 2 impl |
| DINT-01 | Window filtering excludes rows older than `--days` | unit | `pytest tools/orchestrator/tests/test_neon_audit.py::test_window_filter -x` | Wave 0 stub → Wave 2 impl |
| DINT-02 | Exit code 0 when no mismatches, 1 when jobs/time_records mismatch, 2 on connection failure | unit | `pytest tools/orchestrator/tests/test_neon_audit.py::test_exit_codes -x` | Wave 0 stub → Wave 3 impl |
| DINT-02 | JSON artifact written to `artifacts/neon_audit_YYYYMMDD.json` with correct schema | unit | `pytest tools/orchestrator/tests/test_neon_audit.py::test_artifact_schema -x` | Wave 0 stub → Wave 3 impl |
| DINT-03 | Terminal output includes `[PASS\|FAIL]` prefix per table with counts and missing IDs | unit | `pytest tools/orchestrator/tests/test_neon_audit.py::test_terminal_output -x` | Wave 0 stub → Wave 3 impl |

## Sampling Rate

| Checkpoint | Command |
|------------|---------|
| Per task commit | `pytest tools/orchestrator/tests/test_neon_audit.py -x` |
| Per wave merge | `pytest tools/orchestrator/tests/ -v` |
| Phase gate (before human review) | Full suite green, then Brandon runs with real credentials |

## Exit Code Contract

| Code | Meaning | Trigger |
|------|---------|---------|
| 0 | PASS | Zero mismatches in `jobs` AND `time_records` |
| 1 | FAIL | Any Sheets key present in `jobs` or `time_records` but absent from Neon |
| 2 | Error | Connectivity failure (Neon connection or gspread auth) |

**Note:** `job_comments` count mismatch is **informational only** — does NOT trigger exit code 1. Neon-only `time_records` rows (from direct `/api/field/clock-in` inserts) are **informational only** — does NOT trigger exit code 1.

## Wave 0 Gaps (test stubs required before implementation)

- [ ] `tools/orchestrator/tests/test_neon_audit.py` — covers DINT-01, DINT-02, DINT-03 with mocked gspread + psycopg2
- [ ] `tools/orchestrator/requirements.txt` — `psycopg2-binary==2.9.12` and `gspread==6.2.1`

## Dimension Coverage

| Dimension | Status | Notes |
|-----------|--------|-------|
| 1 — Requirements trace | ✓ | DINT-01/02/03 mapped to test cases |
| 2 — Unit tests | ✓ | All behaviors mockable via gspread/psycopg2 mocks |
| 3 — Integration | N/A | Script is a CLI tool; live integration is Brandon's manual run |
| 4 — CLI behavior | ✓ | `--help`, `--days`, `--table` flags tested via subprocess |
| 5 — Exit codes | ✓ | 0/1/2 cases all specified in test map |
| 6 — Artifact output | ✓ | JSON schema validated in test_artifact_schema |
| 7 — Error paths | ✓ | Connection failure → exit 2; key format mismatch → FAIL output |
| 8 — Nyquist | ✓ (this file) | Validation architecture present |
