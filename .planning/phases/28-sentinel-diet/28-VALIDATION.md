---
phase: 28
slug: sentinel-diet
status: draft
nyquist_compliant: true
wave_0_complete: false
created: 2026-06-11
---

# Phase 28 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual verification — infrastructure migration, no unit tests for n8n workflows |
| **Config file** | n8n workflow JSON — imported via n8n UI |
| **Quick run command** | n8n: Execute workflow once → inspect Execution log for errors |
| **Full suite command** | SENT-03: Neon console Monitoring tab — 48h window post-activation |
| **Estimated runtime** | Wave 0: ~5min script run; Wave 1: ~2min manual execution; Wave 2: 48h observation |

---

## Sampling Rate

- **After Wave 0:** SENTINEL_INVENTORY.md populated with SQL + cadence for all 4 sentinels
- **After Wave 1:** Manual workflow execution → Execution log shows success; Neon graph shows idle between runs
- **After Wave 2:** 48h Neon consumption graph confirms flatline between scheduled windows
- **Before `/gsd-verify-work`:** SENT-03 evidence captured (screenshot or API delta output)
- **Max feedback latency:** Brandon checkpoint per wave (manual; no automated path)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 28-01-01 | 01 | 0 | SENT-01/02 | T-28-01 | RAILWAY_TOKEN never echoed in script output | checkpoint:human-action (Brandon runs script) | — | ❌ created in-task | ⬜ pending |
| 28-01-02 | 01 | 0 | SENT-01/02 | — | Inventory covers all 4 services (DATABASE_URL present/absent per service) | structural | `test -f .planning/phases/28-sentinel-diet/SENTINEL_INVENTORY.md && echo "inventory exists"` | ❌ created in-task | ⬜ pending |
| 28-02-* | 02 | 1 | SENT-01, SENT-02 | T-28-02 | Cron fires only during work hours; connect-query-disconnect pattern | checkpoint:human-action (manual execution + Neon graph) | — | ❌ created in-task | ⬜ pending |
| 28-03-01 | 03 | 2 | SENT-01 | — | All 4 Railway sentinel services deleted | checkpoint:human-action (Brandon runs delete script) | — | ❌ created in-task | ⬜ pending |
| 28-03-02 | 03 | 2 | SENT-03 | — | 48h Neon graph flatlines between runs; projected monthly < 100 CU-hr | checkpoint:human-action (Neon console screenshot or API output) | — | — | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tools/n8n/railway_read_sentinels.cjs` — Brandon-runnable script (Railway GraphQL API) to extract service env vars + source for all 4 sentinels
- [ ] `.planning/phases/28-sentinel-diet/SENTINEL_INVENTORY.md` — filled with SQL, cadence, Neon tables, DATABASE_URL presence per service

*No automated test framework gaps — this is an infrastructure migration phase, not Next.js code. Manual human checkpoints are the appropriate gate pattern.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Workflow fires only during work hours (7am–6pm PT Mon–Fri) | SENT-01 | n8n cron evaluation not testable outside n8n; timezone must be verified in workflow Settings | Check Schedule Trigger cron expression + workflow Settings timezone = `America/Los_Angeles` |
| Neon autosuspends between runs | SENT-02 | Neon monitoring graph is the only observable evidence; no programmatic check via n8n | Neon console → Monitoring tab: verify idle flatline between scheduled execution windows |
| 48h consumption delta × 30 ≤ 100 CU-hr | SENT-03 | Phase gate evidence requires real production traffic observation over time | Run `node tools/neon/neon_diagnostics.cjs` pre-ship and 48h post-ship; compare CU-hours delta |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify OR are human checkpoints with explicit evidence requirements
- [x] Sampling continuity: infrastructure migration — all verifications are human checkpoints; no automated path exists for n8n cron/suspend behavior (Nyquist exception for infra-migration phases)
- [x] Wave 0 covers all MISSING references (discovery script + inventory)
- [x] No watch-mode flags
- [x] Feedback latency: per-wave Brandon checkpoints (manual gate equivalent)
- [x] `nyquist_compliant: true` set in frontmatter (manual-checkpoint gates satisfy Nyquist for infra-migration phases)

**Approval:** pending planner pass
