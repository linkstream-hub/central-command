# Phase 15: GAS Migration — Phase A: Dead Code Cleanup - Context

**Gathered:** 2026-06-07
**Status:** Ready for planning
**Supersedes:** Original Phase 15 scope (sendTenantContact in GAS — killed; see Deferred)

<domain>
## Phase Boundary

Delete all functions marked `delete` in `docs/GAS_MIGRATION_SCOPE.md` across `Code.js`, `DashboardAPI.gs`, and `SuggestTechs.js`. Zero behavior change — dead code only. No Next.js, no Neon, no n8n.

**Delivers:** cleaner GAS codebase, reduced migration debt, confirmed baseline before Phase B (pure JS extraction).

</domain>

<decisions>
## Implementation Decisions

### Scope
- **D-01:** Touch only functions with `delete` migration status in `docs/GAS_MIGRATION_SCOPE.md`. No migration-status changes, no refactoring of `keep` or `migrate` functions.
- **D-02:** Files in scope: `Code.js` (root), `DashboardAPI.gs` (dashboard-api/), `SuggestTechs.js` (root). TechPWA.gs excluded — HIGH risk, separate phase.
- **D-03:** Remove tombstone comments alongside dead functions (`// function draftTenantContact...`, `// function sendUrgentAlert...`, etc.).

### Deploy
- **D-04:** Two separate `clasp push --force` + `clasp deploy` runs — root project and dashboard-api/ project. Both get version bumps.
- **D-05:** Manual deploy only for Code.js (email triggers). DashboardAPI.gs follows same manual pattern for this phase.

### Verification
- **D-06:** After deploy, monitor GAS execution log for one full `checkNewLeadEmails()` trigger run — must show no reference errors.
- **D-07:** No Playwright run required — zero Next.js changes.

</decisions>

<canonical_refs>
## Canonical References

- `docs/GAS_MIGRATION_SCOPE.md` — authoritative delete list. Read fully before touching any file.
- `RULES.md` — NEVER_RUN list. Do not delete trigger functions that are still in use.
- `CLAUDE.md` — deploy procedure (clasp push + deploy, manual only, both projects).

</canonical_refs>

<code_context>
## Existing Code Insights

### Delete Candidates (from GAS_MIGRATION_SCOPE.md)

**Code.js:**
`updateJob()` | `archiveJob()` | `getDispatchData()` | `getDispatchHeaders()` | `doGet()` (HTML serving) | `sendAutoReply()` | `getNewContactsData()` | `getDispatchHeaders()` | `backfillDispatchMsgIds()` | `catchUpMissedEmails()` | `draftTenantContact()` tombstone | `sendUrgentAlert()` tombstone | `sendTurnoverFlag()` tombstone | `getLeadsHeaders()` | `getReviewHeaders()` | `buildSig()` (used only by dead sendAutoReply)

**DashboardAPI.gs:**
`getDispatchDataDA()` | `getJobByIdDA()` | `getTodaySchedule()` | `getWeekSchedule()` | `getLiveFieldStatus()` | `getComplianceStatus()` | `getTechListDA()` | `getJobHistory()` | `getNotificationsDA()` | `updateJobDA()` | `archiveJobDA()` | `validatePasscode()` | `daResponse()` (after all actions deleted) | `getDQSheet()` | `getTRSheet()` | `getTMSheet()` (after all callers deleted) | `backfillScheduledDates()` | `weekDateRange()` | `parseScheduledDate()` | `normalizeStatusForFrontend()` | `normalizeStatusForSheet()` | `rowToJob()` | `sendSmsDA()` | `padDA()` | `fuzzyAddressScoreDA()` | `extractAddressWordsDA()` | `parseTechCellDA()` | `detectColumnsDA()` | `todayStr()` | `setScriptProperties()` | `getCalendarDataDA()`

**SuggestTechs.js:**
`getTodayStr()` | `setupTradeDurationSheet()` | `testSuggestTechs()`

### Integration Points
- Before deleting any function, grep all three GAS files for callers. Some `DELETE`-marked functions may have callers in `keep`/`migrate` functions — do not delete until callers are confirmed dead or replaced.

</code_context>

<specifics>
## Specific Requirements

- Cross-check every deletion against the caller graph (grep all GAS files) before removing.
- `STATUS_TO_FRONTEND` / `STATUS_TO_SHEET` constants in DashboardAPI.gs: delete only if no remaining caller after action deletions.
- `daResponse()` in DashboardAPI.gs: delete only after all action functions are removed (it's referenced by all of them).
- `doGet()` / `doPost()` entry points: do NOT delete — these are the HTTP entry points for live actions. Only delete the dead action functions they route to.

</specifics>

<deferred>
## Deferred

### Tenant Contact (pteGranted=No)
Original Phase 15 scope. Killed — wrong architecture (was going to add new GAS code).
**Correct home:** n8n workflow triggered by Neon insert with `pte_granted=No`. Implement post Phase 18 (Neon-only write paths confirmed). Requires: Resend integration, `comms_messages` entry, dispatch UI visual indicator. Own phase.

### SuggestTechs.js full removal
`suggestTechsForJob()` / `buildTechScores()` etc. are `migrate` not `delete`. Phase B work.

### DashboardAPI.gs entry points
`doGet()` / `doPost()` / `validateApiKey()` — delete only after all actions migrated to Next.js. Phase D–G work.

</deferred>

---

*Phase: 15-GAS Migration Phase A Dead Code Cleanup*
*Context gathered: 2026-06-07*
