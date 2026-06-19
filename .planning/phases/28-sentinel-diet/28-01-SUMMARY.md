---
plan: 28-01
phase: 28-sentinel-diet
status: complete
wave: 0
completed: 2026-06-14
key-files:
  created:
    - tools/n8n/railway_read_sentinels.cjs
    - .planning/phases/28-sentinel-diet/SENTINEL_INVENTORY.md
    - artifacts/phase28_01_diff.txt
---

# Plan 28-01: Wave 0 Sentinel Discovery — COMPLETE

## What Was Built

**Railway sentinel discovery script** (`tools/n8n/railway_read_sentinels.cjs`): Brandon-runnable Node.js script querying Railway GraphQL v2 API. Enumerates all services in project c905a353…, identifies the four sentinel services, prints env-var KEY NAMES (never values) + DATABASE_URL presence boolean, dumps up to 200 recent deploy log lines per sentinel for SQL recovery.

**SENTINEL_INVENTORY.md**: Wave 1 spec input. One row per sentinel service with: service ID, DATABASE_URL presence, data access pattern, polling cadence (recovered from logs), check purpose, SQL recovery status, verdict (PORT vs RETIRE-without-porting).

## Critical Discovery

ALL FOUR sentinels: DATABASE_URL present = false. None are direct Neon pollers — they called the GAS Dashboard API (getDispatchData / getComplianceAlerts) which then hit Neon. All are now returning UNAUTHORIZED (GAS auth revoked for these services).

Verdicts:
- sentinel-wc-scanner: PORT (build Neon SQL from scratch, 2×/day work hours)
- sentinel-time-anomaly: PORT (highest priority — was 24×/day; hourly during work hours)
- sentinel-stale-job: PORT (build Neon SQL from scratch, 2×/day work hours)
- sentinel-spec-architect: RETIRE-without-porting (no DATABASE_URL, no Neon access — Pitfall 4 confirmed)

## Wave 1 Implication

No SQL to port from containers. Wave 1 must design Neon SQL from scratch by reading `tech-pwa/src/db/schema.ts` Drizzle schema for each check's target tables. SENTINEL_INVENTORY.md provides per-check guidance on what each check was doing and what SQL to target.

## Self-Check: PASSED

- ✓ tools/n8n/railway_read_sentinels.cjs: syntax-valid, mirrors railway_upsert_vars.cjs credential pattern, never logs secrets
- ✓ SENTINEL_INVENTORY.md: all 4 services enumerated, DATABASE_URL column filled (all NO), verdict column filled
- ✓ spec-architect: Pitfall 4 resolved — RETIRE-without-porting, SENT-01 compliant by deletion alone
- ✓ artifacts/phase28_01_diff.txt: written
- ✓ Branch: feat/phase-28-sentinel-diet (non-main), pushed b16f104
- ✓ Wave 1 not started — STOPPED at gate
