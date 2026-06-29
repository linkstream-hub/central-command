# PROJECT_STATUS.md — APT Central Command
# Updated by: Claude Code on every phase gate change
# Purpose: Brandon's plain-English dashboard — no jargon, binary decisions only

---

```yaml
current_phase: 0 (of 5)
phase_name: Foundational Setup
freeze: ACTIVE — no new features
last_updated: 2026-06-29
```

---

## Phase Progress

| Phase | Name | Gates Green | Status |
|---|---|---|---|
| 0 | Foundational Setup | 13 / 13 | **COMPLETE** ✓ |
| 1 | Security & Auth | 0 / 10 | NEXT — ready to begin |
| 2 | CI/CD Safety | 0 / 5 | BLOCKED |
| 3 | Core Loop Proof | 0 / 7 | BLOCKED |
| 4 | Event Durability | 0 / 6 | BLOCKED |
| 5 | Owner Enablement | 0 / 5 | BLOCKED |

---

## System Health

| Item | Status | Link |
|---|---|---|
| Last deploy | — | — |
| Last rollback drill | PROVEN 2026-06-29 (~instant) | docs/DEPLOYMENT.md |
| Sentry errors (48h baseline) | 2 known issues (P2-003 Neon cold start, P2-007 PKCE transient) | docs/EVIDENCE_REGISTER.md |
| P1-009 | RESOLVED 2026-06-29 — job_photos table created (TC-MIGRATE-009-010) | docs/KNOWN_ISSUES.md |
| P1-010 | RESOLVED 2026-06-29 — workflow_events table created (TC-MIGRATE-0007) | docs/KNOWN_ISSUES.md |
| Uptime (7d) | NOT YET MEASURED — UptimeRobot Phase 3 | — |
| Open HIGH-risk assumptions | 5 of 6 | docs/ASSUMPTION_LEDGER.md |
| Open RISK items | — | docs/RISK_REGISTER.md |

---

## Can We Start New Features?

**NO.** Freeze active. All Phase 0–5 gates must be green first.

---

## Brandon: Decisions Needed From You

_This section updated by CC when Brandon input is required._

1. ~~TC-PURGE-001 and TC-AUDIT-002~~ — MERGED 2026-06-28
2. ~~Auth vendor (Clerk vs Lucia)~~ — DECIDED: Clerk (docs/AUTH_DECISION.md)
3. ~~TC-MIGRATE-009-010~~ — DONE 2026-06-29
4. ~~TC-MIGRATE-0007~~ — DONE 2026-06-29
5. ~~A-003 compliance audit~~ — DONE 2026-06-29. 8 gaps deferred to Phase 3/4. No exposure (CC never used).
6. ~~Archived job status~~ — RESOLVED 2026-06-29. Not a real FSM state — display filter only (removed old WOs from CC view). Those WOs are effectively Completed. Phase 3 scope: bulk-reclassify 485 Archived→Completed (no per-WO review). True FSM-dead remediation = 15 records only.
7. **P2-005** — Set `GOOGLE_GENERATIVE_AI_API_KEY` in Vercel env (Settings → Environment Variables). Fixes 4 errors on `/api/webhooks/n8n/gmail`. This is the only var actually used in the API call at route.ts:67.
8. **workers/email-intake/package-lock.json** — untracked. Commit (reproducible builds) or add to .gitignore?

---

## Brandon: Questions to Ask at Any Phase Gate

```
1. What was broken before this phase?
2. What changed?
3. Show me the proof it works (not prose — evidence links)
4. What still doesn't work?
5. What risk was reduced?
6. What risk remains?
7. Can we roll back? How fast? Was it tested?
8. Are we allowed to start the next phase?
```

If answer to #3 is prose: it is NOT proof. Demand a link.

---

## Recent Evidence

| Date | Claim | Evidence |
|---|---|---|
| 2026-06-29 | **Phase 0 COMPLETE** — all 13 gates green. TC-MIGRATE-0007 + TC-MIGRATE-009-010 applied via Neon MCP. A-003 audit done (8 gaps deferred). Sequence drift C-009 found and fixed. | docs/EVIDENCE_REGISTER.md |
| 2026-06-29 | P1-009 + P1-010 resolved: job_photos + workflow_events tables created in prod | artifacts/TC-MIGRATE-009-010-task-card.md, artifacts/TC-MIGRATE-0007-task-card.md |
| 2026-06-29 | Sentry/Vercel baseline measured — 2 active P2 issues, Resend resolved | docs/EVIDENCE_REGISTER.md |
| 2026-06-29 | Instant Rollback freeze documented — manual promote required after drill | docs/KNOWN_ISSUES.md infra notes |
| 2026-06-29 | DB snapshot taken: 800 jobs, status breakdown documented | Neon query, docs/DATA_INTEGRITY_AUDIT.md |
| 2026-06-29 | Auth vendor decided: Clerk | docs/AUTH_DECISION.md |
| 2026-06-28 | Cloudflare email intake operational | Commit f0af7347 |
| 2026-06-28 | 203 tests passing at 79.43% coverage | Baseline measured 2026-06-26 |

---

_CC updates this file on every gate change. Never stale by more than one session._
