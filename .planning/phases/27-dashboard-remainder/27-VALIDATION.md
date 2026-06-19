---
phase: 27
slug: dashboard-remainder
status: ready
nyquist_compliant: true
wave_0_complete: true
created: 2026-06-11
---

# Phase 27 — Validation Strategy

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
| **Baselines** | 111 unit tests green; Playwright 22 passed / 67 skipped / 0 failed (local, recorded 2026-06-10) |

---

## Sampling Rate

- **After every task commit:** `cd tech-pwa && npm run test:unit`
- **After every plan wave:** full suite
- **Before `/gsd-verify-work`:** full suite green
- **Max feedback latency:** 30 seconds (unit path)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 27-01-01 | 01 | 1 | DASH-04 | — | row-count before nullability decisions | checkpoint:human-action (Brandon count script) | — | — | ⬜ pending |
| 27-01-02 | 01 | 1 | DASH-04 | T-schema | additive-only enforced | structural | grep gate rejects DROP/SET NOT NULL in migration SQL | created in-task | ⬜ pending |
| 27-01-03 | 01 | 1 | DASH-04 | — | migration applies cleanly | checkpoint:human-action (Brandon `npm run db:migrate`) | — | — | ⬜ pending |
| 27-01-04 | 01 | 1 | DASH-04 | — | gate | tsc + diff artifact + STOP | — | ⬜ pending |
| 27-02-* | 02 | 1 | DASH-01 | payroll authz: staff session required, no tech self-approval | unit (TDD) | `npm run test:unit -- timecards` | created in-task | ⬜ pending |
| 27-03-* | 03 | 1 | DASH-02 | — | date-range boundary tests | unit (TDD) | `npm run test:unit -- availability` | created in-task | ⬜ pending |
| 27-04-* | 04 | 2 | DASH-04 | schedule-link token entropy; BASE_URL presence | unit (TDD) | `npm run test:unit -- schedule-link` | created in-task | ⬜ pending |
| 27-05-* | 05 | 2 | DASH-04 | feedback input validation | unit (TDD) | `npm run test:unit -- feedback` | created in-task | ⬜ pending |
| 27-06-01 | 06 | 3 | DASH-05 | dev-guard correctness for ported writes | wiring | unit suite full run | — | ⬜ pending |
| 27-06-02 | 06 | 3 | DASH-05 | zero non-Gmail fallthrough | structural | node audit: handling-branch per 9 actions + getCalendarData not-implemented stub + DEV_BLOCKED_WRITES cleared | — | ⬜ pending |
| 27-06-03 | 06 | 3 | all | — | regression ceiling | E2E | playwright with pipefail exit code vs 22p/67s/0f baseline | — | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [x] Unit + Playwright baselines recorded (111 green; 22p/67s/0f)
- [ ] `dispatcher_feedback` row count — 27-01 Task 1 blocking checkpoint (Brandon)
- [ ] Test files created in-task per TDD (RED first) — not pre-existing stubs

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| db:migrate apply against production Neon | DASH-04 | Claude blocked from .env; schema change needs human run | Brandon: `cd tech-pwa && npm run db:migrate`, paste output |
| Timecard approve/dispute in browser | DASH-01 | payroll-adjacent; visual confirm in /hours admin view | approve a test record; confirm status + approver fields in UI |
| Schedule link opens tenant page | DASH-04 | tokened public URL | generate for a test WO; open /track/{token} |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or are human checkpoints with explicit evidence requirements
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references (none — TDD in-task)
- [x] No watch-mode flags
- [x] Feedback latency < 30s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved 2026-06-11 (checker re-verify pending)
