---
phase: 28-sentinel-diet
plan: 02
subsystem: n8n-sentinel-consolidation
tags: [n8n, neon, sentinel, scheduler, railway-migration]
dependency_graph:
  requires: [28-01]
  provides: [n8n-sentinel-workflow, sentinel-importer]
  affects: [neon-compute-budget, railway-services]
tech_stack:
  added: []
  patterns:
    - n8n Schedule Trigger with cronExpression mode + America/Los_Angeles timezone
    - Sequential Postgres check segments (connect-query-disconnect per run)
    - errorWorkflow-based alert routing via PTOW Error Handler
    - phase25_n8n_setup.cjs import pattern mirrored for single-workflow scope
key_files:
  created:
    - tools/n8n/workflows/phase-28-sentinel-checks.json
    - tools/neon/phase28_import_sentinel.cjs
  modified: []
decisions:
  - "Unified cron 0 7-18 * * 1-5 for all 3 checks — simplest expression, one execution window, avoids per-check schedule complexity"
  - "stale-job uses created_at (not updated_at — jobs table has no updated_at in schema)"
  - "wc-scanner targets NULL wc_code on non-terminal jobs (Complete, Archived excluded)"
  - "time-anomaly threshold: 12 hours for open clock-in with no clock-out"
  - "stale-job threshold: 3 days from created_at for non-terminal statuses"
  - "spec-architect excluded per SENTINEL_INVENTORY.md RETIRE-without-porting verdict"
metrics:
  duration_seconds: 233
  completed_date: "2026-06-15"
  tasks_completed: 2
  tasks_total: 3
  files_created: 2
  files_modified: 0
---

# Phase 28 Plan 02: Sentinel Diet Wave 1 — Consolidated n8n Workflow + Importer

**One-liner:** Single n8n workflow `APT Sentinel Checks` with work-hours Pacific cron + sequential connect-query-disconnect Neon checks, replacing 3 Railway sentinel pollers (wc-scanner 1×/day, time-anomaly 24×/day, stale-job 6×/day).

## Status: PAUSED AT CHECKPOINT (Task 3 — Brandon Human Action Required)

Tasks 1 and 2 complete and committed. Task 3 is a `checkpoint:human-action` — Brandon must import, verify, and activate the workflow, then report back before the terminal gate proceeds.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Write consolidated sentinel-checks workflow JSON | 406ee77 | `tools/n8n/workflows/phase-28-sentinel-checks.json` |
| 2 | Write Brandon-runnable importer | 2a1405b | `tools/neon/phase28_import_sentinel.cjs` |

## Task 3 Pending (Human Action)

Brandon runs: `node tools/neon/phase28_import_sentinel.cjs`
Confirms: ✓ timezone, ✓ Neon Postgres creds, manual execution OK, Neon graph idles between runs.
Then: terminal gate (diff artifact, push, STOP).

## Workflow Architecture

```
Schedule Trigger (0 7-18 * * 1-5, America/Los_Angeles)
  → Neon: WC Scanner Query → Code: WC Scanner Eval → IF: WC Finding?
      true  → Code: WC Alert (throw) [errorWorkflow fires]
      false → Neon: Time Anomaly Query → Code: Time Anomaly Eval → IF: Time Anomaly Finding?
                  true  → Code: Time Anomaly Alert (throw) [errorWorkflow fires]
                  false → Neon: Stale Job Query → Code: Stale Job Eval → IF: Stale Job Finding?
                              true  → Code: Stale Job Alert (throw) [errorWorkflow fires]
                              false → workflow end (clean)
```

**Connection pattern:** 3 Postgres nodes run sequentially → one connection burst per execution window → Neon autosuspends after workflow completes (~5min idle).

## SQL Designed From Scratch (per SENTINEL_INVENTORY.md gap)

All three sentinels had no SQL in Railway containers — SQL was designed from the Drizzle schema (`tech-pwa/src/lib/schema.ts`):

| Check | Table | SQL Condition | Alert Threshold |
|-------|-------|---------------|-----------------|
| wc-scanner | `jobs` | `status NOT IN ('Complete','Archived') AND wc_code IS NULL` | count > 0 |
| time-anomaly | `time_records` | `clock_in IS NOT NULL AND clock_out IS NULL AND clock_in < NOW() - INTERVAL '12 hours'` | count > 0 |
| stale-job | `jobs` | `status NOT IN ('Complete','Archived') AND created_at < NOW() - INTERVAL '3 days'` | count > 0 |

**Note on stale-job:** `jobs` table has no `updated_at` column in schema — `created_at` is used as the staleness signal. A job created 3+ days ago in a non-terminal state has not been progressed.

## Deviations from Plan

None — plan executed exactly as written. SQL design was the expected Wave 1 deliverable per SENTINEL_INVENTORY.md (all sentinels had no recoverable SQL; Wave 1 built from scratch from schema).

## Threat Surface Scan

No new network endpoints, auth paths, or file access patterns beyond what is described in the plan's threat model. The workflow JSON is committed inactive; N8N_API_KEY is read in-process from `.env.local` in the importer (T-28-02 closed).

## Self-Check

### Created Files Exist
- `tools/n8n/workflows/phase-28-sentinel-checks.json` — created ✓
- `tools/neon/phase28_import_sentinel.cjs` — created ✓

### Commits Exist
- `406ee77` — feat(28-02): consolidated APT Sentinel Checks n8n workflow ✓
- `2a1405b` — feat(28-02): Brandon-runnable importer for APT Sentinel Checks workflow ✓

### Workflow Automated Checks
```
OK tz+trigger+cred, pgNodes=3
active=false
cron=0 7-18 * * 1-5
errorWorkflow in settings= undefined (correct — injected at import)
```

### Importer Syntax Check
```
node -c tools/neon/phase28_import_sentinel.cjs → SYNTAX_OK
```

## Self-Check: PASSED
