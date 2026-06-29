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
| 0 | Foundational Setup | 5 / 9 | IN PROGRESS |
| 1 | Security & Auth | 0 / 10 | BLOCKED (Phase 0 incomplete) |
| 2 | CI/CD Safety | 0 / 5 | BLOCKED |
| 3 | Core Loop Proof | 0 / 7 | BLOCKED |
| 4 | Event Durability | 0 / 6 | BLOCKED |
| 5 | Owner Enablement | 0 / 5 | BLOCKED |

---

## System Health

| Item | Status | Link |
|---|---|---|
| Last deploy | — | — |
| Last rollback drill | IN PROGRESS (2026-06-29) | — |
| Sentry errors (24h) | NOT YET MEASURED | — |
| Uptime (7d) | NOT YET MEASURED | — |
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
3. Review compliance divergence (A-003) before Phase 1: does GAS vs compliance.ts mismatch require action? Task Card pending your approval.
4. Is 'Archived' job status an intentional terminal state? (affects Phase 3 FSM-dead remediation scope — 15 records vs 485)

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
| 2026-06-29 | DB snapshot taken: 800 jobs, status breakdown documented | Neon query, docs/DATA_INTEGRITY_AUDIT.md |
| 2026-06-29 | Auth vendor decided: Clerk | docs/AUTH_DECISION.md |
| 2026-06-28 | Cloudflare email intake operational | Commit f0af7347 |
| 2026-06-28 | 203 tests passing at 79.43% coverage | Baseline measured 2026-06-26 |

---

_CC updates this file on every gate change. Never stale by more than one session._
