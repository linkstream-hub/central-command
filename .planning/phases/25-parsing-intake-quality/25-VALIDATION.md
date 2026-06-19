---
phase: 25
slug: parsing-intake-quality
status: ready
nyquist_compliant: true
wave_0_complete: true
created: 2026-06-10
---

# Phase 25 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest 4.x (unit) + Playwright (E2E) |
| **Config file** | tech-pwa/vitest.config.ts; tech-pwa/playwright.config.ts |
| **Quick run command** | `cd tech-pwa && npm run test:unit` |
| **Full suite command** | `cd tech-pwa && npm run test:unit && npx playwright test --reporter=line` |
| **Estimated runtime** | ~5s unit / ~8min full |

---

## Sampling Rate

- **After every task commit:** Run `cd tech-pwa && npm run test:unit`
- **After every plan wave:** Run full suite
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds (unit path)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 25-01-01 | 01 | 1 | INTAKE-01 | — | N/A | unit | `npm run test:unit -- normalizeAddressKey` | created in-task | ⬜ pending |
| 25-01-02 | 01 | 1 | INTAKE-02/03/05 | prompt-injection (Lapham regex deterministic, no LLM) | tenant fields empty for turnover/inspection | unit | `npm run test:unit -- detectLaphamForm` | created in-task | ⬜ pending |
| 25-01-03 | 01 | 1 | all plan-01 | — | N/A | gate | `npx tsc --noEmit` + diff artifact + STOP | — | ⬜ pending |
| 25-02-01 | 02 | 1 | INTAKE-04 | unauth write to properties | DASHBOARD_API_KEY required; merge-not-replace | unit | `npm run test:unit -- access-codes` | created in-task | ⬜ pending |
| 25-02-02 | 02 | 1 | INTAKE-06/07 | spam loop; dev-send incident | dev guard blocks sends outside production | unit | `npm run test:unit -- email-intake` | created in-task | ⬜ pending |
| 25-02-03 | 02 | 1 | all plan-02 | — | N/A | gate | `npx tsc --noEmit` + diff artifact + STOP | — | ⬜ pending |
| 25-03-01 | 03 | 2 | external state | — | N/A | checkpoint:human-action (Railway export-or-fresh, Postgres credential name, Gemini key) | — | ⬜ pending |
| 25-03-02 | 03 | 2 | INTAKE-01..05 | Sheets node ban | structural JSON verify rejects Sheets nodes | structural | node JSON verify script (in plan) | — | ⬜ pending |
| 25-03-03 | 03 | 2 | INTAKE-06/07 | ungated sends; spam loop | gates on emailType + contact + production flag; NO OpenPhone node (SMS deferred to Phase 23) | structural | node JSON verify script (in plan) | — | ⬜ pending |
| 25-03-04 | 03 | 2 | all plan-03 | unknown n8n node types = BLOCK | external-dep verification at gate | gate | `npx tsc --noEmit` + diff artifact + STOP | — | ⬜ pending |
| 25-04-01 | 04 | 3 | cutover prep | dual-polling | stub verified by node script before any deploy | structural | node stub-verify script (in plan) | — | ⬜ pending |
| 25-04-02 | 04 | 3 | cutover | dual-polling | order: stub push → delete trigger → activate n8n | checkpoint:human-action | — | — | ⬜ pending |
| 25-04-03 | 04 | 3 | INTAKE-01..07 | — | E2E per requirement | checkpoint:human-verify | — | — | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [x] Properties table population verified — 605 rows, 504 with access_info (live query 2026-06-10, see RESEARCH addendum)
- [x] Test framework present — vitest 4.1.6, 33 tests green at phase start
- [ ] Fixtures `tech-pwa/src/lib/__tests__/fixtures/intake/lapham-{sameline,forwarded,turnover}.txt` — created inline by 25-01 tasks (TDD; not pre-existing stubs)
- [ ] Phase 19 workflow JSON export-or-confirm-absent — 25-03 Task 1 blocking checkpoint

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Requester auto-reply send | INTAKE-06 | Outbound customer email — governance gate + dev write guard | Trigger with test sender in production window; confirm receipt + comms_messages row |
| n8n workflow end-to-end | INTAKE-01..05 | Railway-hosted; activation gated on GAS stub deploy | Manual execution against test inbox before enabling trigger (25-04 Task 3 checklist) |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or are human checkpoints with explicit evidence requirements
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references (none exist — tests created in-task per TDD)
- [x] No watch-mode flags
- [x] Feedback latency < 30s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved 2026-06-10 (plan-checker pass pending re-verify)
