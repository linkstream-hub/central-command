# Phase 15-01 Caller Graph & Dead Code Analysis

## Overview
This document serves as the review gate artifact for Phase 15-01 (Phase A — dead code cleanup). It identifies functions that are safe to delete and explicitly calls out "trap" functions that must be retained because they are either still actively called by Next.js routes (via `doGet`/`doPost`), or are critical utilities mapped within those paths.

## EXCLUDE List (DO NOT DELETE)
The following functions have been identified as traps. Despite appearing as migration candidates in some views, they must **NOT** be deleted during Wave 2:

- `daResponse` (DashboardAPI)
- `getDQSheet` / `getTRSheet` / `getTMSheet` (DashboardAPI)
- `rowToJob` (DashboardAPI)
- `normalizeStatusForFrontend` / `normalizeStatusForSheet` (DashboardAPI)
- `STATUS_TO_FRONTEND` / `STATUS_TO_SHEET` (DashboardAPI)
- `getTodayStr` (SuggestTechs)
- `doGet` / `doPost` / `validateApiKey` (DashboardAPI)

## Wave 2 Deletion Candidates

### Code.js
Safe to delete (dead or no-op paths):
- `getLeadsHeaders`
- `getReviewHeaders`
- `buildSig`
- `doGet` (HTML serving)
- `getNewContactsData`
- `setupAuditTrigger`
- `getDispatchData`
- `getDispatchHeaders`
- `updateJob`
- `archiveJob`
- `backfillDispatchMsgIds`
- `catchUpMissedEmails`
- `draftTenantContact`
- `sendUrgentAlert`
- `sendTurnoverFlag`

### SuggestTechs.js
Safe to delete:
- `setupTradeDurationSheet`
- `testSuggestTechs`

### DashboardAPI.gs
Safe to delete (already migrated to Next.js or dead scheduling miners):
- `getDispatchDataDA`
- `getJobByIdDA`
- `getTodaySchedule`
- `getWeekSchedule`
- `getLiveFieldStatus`
- `getComplianceStatus`
- `getTechListDA`
- `getJobHistory`
- `getNotificationsDA`
- `updateJobDA`
- `archiveJobDA`
- `validatePasscode`
- `backfillScheduledDates`
- `weekDateRange`
- `parseScheduledDate`
- `sendSmsDA` (stub)
- `setScriptProperties`
- Scheduling helpers: `parseDateFromTabDA`, `detectColumnsDA`, `parseTechCellDA`, `getCalendarDataDA`, `padDA`, `fuzzyAddressScoreDA`, `extractAddressWordsDA`
- `todayStr`

## Caller Graph Context
- `doGet` and `doPost` in `DashboardAPI.gs` act as the primary HTTP entry points. They validate API keys (via `validateApiKey`) and wrap responses in `daResponse`.
- Data reads inside active endpoints rely on `getDQSheet`, `getTRSheet`, and `getTMSheet`.
- `rowToJob` is used by remaining live endpoints to parse Sheet rows.
- `STATUS_TO_*` and `normalizeStatus*` are used to map status formats between Next.js and Sheets.
- `getTodayStr` is used by active scheduling/suggestion logic in `SuggestTechs.js` and `DashboardAPI.gs`.

**Conclusion:** Wave 1 analysis is complete. Awaiting Claude Code PASS to begin Wave 2 deletion.
