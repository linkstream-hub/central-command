# ANTIGRAVITY SPRINT — HR PERMISSIONS + PENDING DEPLOYS
# Owner: Claude Code | Executor: Antigravity
# Date: April 23, 2026

---

## TASK 1 — HR role gets Compliance + Billing access

### File: `tech-pwa/src/components/dashboard/AppSidebar.tsx`

Find the ROUTE_PERMISSIONS object and change two lines:

```ts
// BEFORE:
'/billing':    ['management', 'compliance', 'admin'],
'/compliance': ['management', 'compliance', 'admin'],

// AFTER:
'/billing':    ['management', 'compliance', 'hr', 'admin'],
'/compliance': ['management', 'compliance', 'hr', 'admin'],
```

That is the entire change. Do not touch any other line in this file.

### Verification:
- Log in with passcode `APT-HR-26` → sidebar must show: HR, Compliance, Billing, Team, Schedule
- Log in with passcode `APT2026!` (dispatch) → sidebar must NOT show Billing or Compliance

---

## TASK 2 — Deploy pending backend fixes (clasp)

Two backend fixes were made by Claude Code this session and are sitting uncommitted/undeployed.
Run these deploy commands in order.

### 2a. Code.js — Lead Parsing v73 (rmName fallback fix)
Working directory: `A:/PTOW/1_APT_Central_Command/` (repo root)

```
clasp push --force
clasp deploy --deploymentId AKfycbyFgHHDrZm1NZBG2iQ3czdeRxSGuvjkqyLkx7OCjdkA5vRBCm3IQ1RAEyrbgVp-Y4xs1g --description "v73 — rmName fallback from sender display name"
```

### 2b. DashboardAPI.gs — v14 (Active tech filter fix)
Working directory: `A:/PTOW/1_APT_Central_Command/dashboard-api/`

```
cd dashboard-api && clasp push --force && clasp deploy --deploymentId AKfycbyum_KLprgPh51GxFiwhsoNHScc4TqIBrzZS0GPfHsnhrc9hAtp03AciyiydhfyJyxCCQ --description "v14 — active tech filter fix"
```

### Verification:
- Both commands must complete without error
- Report the version numbers confirmed in the deploy output

---

## TASK 3 — Implement Live Feed action item spec

Implement `ANTIGRAVITY_ACTIVITY_FEED_SPEC.md` (already written, in repo root).
Read that file and follow it exactly.

---

## COMMIT MESSAGE (after all three tasks):
`feat: HR role gets compliance+billing access; live feed action items only`
`(backend deploys v73 + v14 are separate — not part of the git commit)`
