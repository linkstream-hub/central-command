# CC3.0 — ARCHITECTURE RESET MILESTONE
# Declared: Session 83. Feature freeze active until Phase 1 complete.
# Goal: eliminate every "never run" warning from CLAUDE.md. No GAS API servers. No Sheets data layer. No plaintext tokens. Code.js stays for Gmail parsing only.
# Timeline: 6–8 weeks AI-pair model.
# Last updated: 2026-05-19

---

## NORTH STAR

When this milestone is complete:
- No `DashboardAPI.gs` (replaced by Next.js API routes reading from Neon)
- No `TechPWA.gs` (replaced by Next.js API routes)
- No Google Sheets as data layer (Neon is the only source of truth)
- No Cloudflare Workers (no GAS URLs to proxy)
- No plaintext session tokens in Sheets
- `Code.js` stays — Gmail parsing only, scoped to that single function
- CLAUDE.md has no "Do NOT run" warnings

---

## PHASES

### Phase 1 — Security & Compliance ✅ COMPLETE
**Duration:** 1 week | **Status:** Done (confirmed S93)

Core security gaps closed before any architecture work begins.

| Item | Status | Notes |
|---|---|---|
| Uptime monitoring (UptimeRobot) | ✅ Done | Two alerts configured session 84 |
| Sentry configured + event verified | ✅ Done | PR #75. Event ID confirmed. Two alert rules set. |
| Incident runbook | ✅ Done | `docs/RUNBOOK.md` written session 84 |
| DASHBOARD_API_KEY exposure confirmed clean | ✅ Done | PR #75 audit |
| Tech session token hash migration | ✅ Done | SHA-256 hashing confirmed in TechPWA.gs:972. Sheet verified PR #88. |
| PAGA unit tests (Vitest) | ✅ Done | Bug fixed, 18 tests written and merged. PR #88. |
| `NEXT_PUBLIC_DASHBOARD_API_KEY` → server-only | ✅ Done | Fixed commit e61f88a. Stale refs purged S93. |
| Code.js silent failure alerting | ➡️ Moved to Phase 2 | Phase 6 item — wrap top-level try/catch, email on unhandled exception |

### Phase 2 — Infrastructure Foundation
**Duration:** 1 week (parallel with Phase 1 tail) | **Status:** Not started

| Item | Status | Notes |
|---|---|---|
| Neon `preview` branch wired to Vercel Preview env | ⏳ | Stops auto-provisioning branches per preview deploy |
| `npm audit` + Dependabot in CI | ⏳ | P2-1, P2-2 — 30 min sprint for AG |
| Nightly E2E cron | ⏳ | P2-5 — `schedule: cron` in `e2e.yml` |
| n8n + Flowise export + version control | ⏳ | Export all workflows to JSON, commit to `workflow-exports/` |
| Apps Script trigger inventory | ⏳ | Run `ScriptApp.getProjectTriggers()`, document in ARCHITECTURE.md |

### Phase 3 — DashboardAPI.gs → Next.js API Routes
**Duration:** 2 weeks | **Status:** Not started

Replace every GAS action string in `DashboardAPI.gs` with a Next.js `/api/` route backed by Neon.

Migration order (lowest risk first):
1. `getJobComments` / `addJobComment` — already shadow-writing to Neon
2. `getDispatchData` — core work queue, highest value
3. `updateJobDA` / `archiveJobDA` — write paths
4. `getWeekSchedule` / `getCalendarDataDA`
5. `getLiveFieldStatus`
6. `getGmailThreadDA` / `replyToThreadDA` / `getDraftReplyDA` — keep reading from Gmail API (not Sheets)
7. `getNotificationsDA`
8. `getTechListDA`
9. Remaining: time tracking approval, compliance, HR routes

**Gate:** Each action migrated must have an E2E test covering the new route before the old GAS action is removed.

### Phase 4 — TechPWA.gs → Next.js API Routes
**Duration:** 2 weeks | **Status:** Not started

Replace every `doPost` action in `TechPWA.gs` with a Next.js `/api/tech/` route.

Migration order:
1. `login` — badge+PIN auth (highest impact — gates everything else)
2. `getTechJobs` / `getTechStatus`
3. `clockIn` / `clockOut` / `startBreak` / `endBreak`
4. `startShift` / `endShift`
5. `markComplete`
6. `signAttestation`
7. `requestTimeOff` / `cancelTimeOff`
8. `uploadReceipt` / `flagIssue`
9. `changePIN`

**Gate:** CF Worker at `pwa-api.aptmaintenanceinc.com` is decommissioned when all actions are migrated. All E2E `tech-pwa.spec.ts` fixme markers are resolved.

### Phase 5 — Google Sheets Full Deprecation
**Duration:** 1 week | **Status:** Not started

After Phases 3+4: no code reads from or writes to Sheets.

1. Verify all data paths read from Neon
2. Archive the Dispatch Queue, Time Records, Tech Roster tabs (read-only, historical)
3. Remove all `PWA_SHEETS`, `DQ_COL`, `TR_COL` references from GAS files
4. `DashboardAPI.gs` and `TechPWA.gs` become stubs (empty doPost returning NOT_IMPLEMENTED)
5. CF Workers are decommissioned

### Phase 6 — Code.js Hardening
**Duration:** 3–4 days | **Status:** Not started

`Code.js` stays but is scoped and hardened:
1. Remove all Sheets write functions that are now handled by Neon
2. Keep only: `checkNewLeadEmails`, `parseWithGemini`, `enrichFromLaphamDb`, `shouldSkipEmail`, `detectLaphamForm`, `getDraftReply`, `replyToThread`, `morningAuditReport`
3. Add top-level try/catch with `GmailApp.sendEmail` on unhandled exception
4. All "Do NOT run" functions are deleted, not just commented out
5. Remove all `AUTO_REPLY_ENABLED` scaffolding — replace with simple env flag
6. Update CLAUDE.md: no more "never run" warnings section

---

## FEATURE FREEZE RULE

No new features merged to `main` until Phase 1 is complete.

Exceptions allowed during freeze:
- Bug fixes to production-broken behavior
- Emergency security patches
- This milestone's own phase sprints

Backlogged features waiting for post-CC3.0:
- Meal premium auto-calculation (Phase 1 adds the unit tests; full implementation after Phase 3)
- RtS Schedule Grid Rework
- Workspace Reorganize
- Phase B Neon read cutover (comms_messages) — absorbed into Phase 3
- Time Off Manager migration
- Billing pipeline

---

## SUCCESS CRITERIA

- `npx playwright test` — zero fixme markers remain. All tests pass, including `tech-pwa.spec.ts`.
- `grep -r "DashboardAPI\|TechPWA" tech-pwa/src/` — returns only historical comments, no live calls.
- `grep -r "script.google.com" tech-pwa/src/` — zero matches.
- CLAUDE.md has no "Do NOT run" block.
- ARCHITECTURE.md "What is broken" section is empty or has only minor UX items.
- All P1 items in `docs/PROFESSIONAL_BASELINE.md` are marked done.
