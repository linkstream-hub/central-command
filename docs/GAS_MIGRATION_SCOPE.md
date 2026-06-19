# GAS Migration Scope
Generated: 2026-06-07 | Supersedes: 2026-05-31 | Reflects: 2026-06-07 research inventory

## Migration Overview
Three GAS projects: Code.js (root manual-deploy), TechPWA.gs (CI-deploy), dashboard-api/DashboardAPI.gs (CI-deploy), plus SuggestTechs.js support module. WRITE_PATH_NEON_ONLY=true is set and the Dispatch Queue Sheets tab is a read-only archive as of 2026-06-01.

## Project Constraints
- Dev write guard: Local dev blocks all GAS writes by default. NEXT_PUBLIC_DEV_ALLOW_WRITES=true override exists — never commit to .env.local.
- Never run: catchUpMissedEmails(), resetBackfill(), setupBackfillTrigger(), archiveOldJobsConfirmed(), mineScheduleSheet() — these are on the NEVER RUN list in RULES.md.
- Three separate clasp projects — each has its own deploymentId. Never mix them.
- Manual deploy only for Code.js. Never automate clasp deploy.
- WRITE_PATH_NEON_ONLY=true is set — most Sheets write paths in Code.js and DashboardAPI.gs already no-op or skip when this flag is present.
- Absolute paths only for all file references. Root dir is C:/PTOW/1_APT_Central_Command.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Inbound email polling | GAS (Code.js trigger) | — | Gmail API only accessible from GAS running as workorder@ account |
| Gemini AI parsing | GAS (Code.js) | → Next.js API route | GAS calls Gemini REST; could move to a Next.js route or n8n node |
| Leads sheet logging | GAS (Code.js) | → DELETE once Neon is sole source | Sheets write; NEON_ONLY flag already skips Dispatch Queue write |
| Job creation (inbound) | GAS → Neon via sync | → Next.js (after full migration) | syncJobToNeon() already fires; Sheets write already gated by NEON_ONLY |
| Job update / archive | Next.js PATCH /api/jobs/[id] | GAS (dead-code path when NEON_ONLY=true) | updateJob / archiveJob skip when NEON_ONLY; Neon is live path |
| Dashboard data reads | Next.js /api/* routes | — | Migrated in Phase 3; DashboardAPI.gs versions are dead code for these actions |
| Manual job creation | DashboardAPI.gs → Sheets + Neon | → Next.js POST /api/jobs | Still writes Sheets; Neon sync added Phase 13 |
| Gmail thread read / reply | DashboardAPI.gs → Gmail API | → Next.js route using Gmail OAuth | Requires workorder@ Gmail OAuth credentials in Node context |
| Tech PWA auth (badge+PIN) | TechPWA.gs → Tech Roster sheet | → Neon employees table | Session tokens stored in Sheets today |
| Clock in / out | TechPWA.gs → Time Records sheet | → Neon time_records | Shadow-sync to Neon already fires on each event |
| PAGA compliance webhook | TechPWA.gs → n8n | Keep in GAS or move with clock events | fireComplianceWebhook() is simple HTTP POST — easy to move |
| Time off (tech-facing) | TechPWA.gs → TOM Sheets | → Neon or AppSheet API | Complex tenure/accrual logic; TOM is separate spreadsheet |
| Timecard approval | DashboardAPI.gs → Time Records sheet | → Neon time_records + Next.js route | Supervisor status columns already in Neon schema |
| Sentinel write-backs | DashboardAPI.gs → SentinelLog sheet | → Next.js route + Neon | Railway sentinels call GAS directly today |
| Dispatcher Feedback | DashboardAPI.gs → Dispatcher Feedback sheet | → Neon feedback table | Low-traffic; straightforward migration |
| Job comments | DashboardAPI.gs → JobComments sheet | → Neon comms_messages | Already shadow-written to Neon |
| Tenant self-scheduling | DashboardAPI.gs | → Next.js public route | Public endpoint with tracking token; moderate complexity |
| Push notifications | DashboardAPI.gs → Next.js /api/push/send | Already delegated to Next.js | GAS just makes HTTP call to Next.js |
| Validate passcode (legacy) | DashboardAPI.gs → Script Properties | → DELETE or fold into next-auth | Superseded by next-auth Google OAuth |
| Morning audit email | Code.js scheduled trigger | → n8n or Neon query + email | Pure reporting; reads Sheets (archive) |
| WC code auto-classification | DashboardAPI.gs inline | → Next.js utility module | Pure JS logic; no GAS API dependencies |
| Google Calendar sync | Calendar.js (Code.js project) | → Keep or DELETE | Scheduler uses it; moderate migration |
| Tech suggestion engine | SuggestTechs.js / DashboardAPI.gs | → Next.js API route | Pure scoring logic; no hard GAS deps |
| Receipt upload to Drive | TechPWA.gs → DriveApp | → Cloud Storage or keep in GAS | DriveApp is a strong GAS dependency |

---

## Code.js Functions

| Function | Responsibility | Migration Status | Risk | Notes |
|----------|----------------|------------------|------|-------|
| `checkNewLeadEmails()` | Main polling loop — Gmail search, dedup, parse, route | keep (long-term: migrate) | HIGH | Requires Gmail API access as workorder@. No Node equivalent today. Core production function. |
| `detectLaphamForm()` | Bypasses Gemini for structured website@laphamcompany.com forms | keep with checkNewLeadEmails | MEDIUM | Called inside polling loop; migrates together |
| `parseWithGemini()` | Calls Gemini REST API, returns parsed JSON | migrate | MEDIUM | Pure HTTP call to Gemini — Node.js equivalent is straightforward. No GAS-only API. |
| `extractJson()` | Robust JSON extraction from Gemini text | migrate | LOW | Pure utility function |
| `loadLaphamDatabase()` | Reads Master Directory tab into memory | migrate → Neon query | MEDIUM | Once properties table lands in Neon, replace with DB query |
| `expandAddressRange()` | Expands "530-536 41st St" into individual addresses | migrate | LOW | Pure JS logic |
| `enrichFromLaphamDb()` | Matches parsed lead to Master Directory record | migrate → Neon query | MEDIUM | Depends on loadLaphamDatabase(); migrates together |
| `checkForMissingEmail()` | Flags properties with no RM email to New Contacts sheet | migrate → Neon + notification | LOW | Needs new_contacts table in Neon |
| `lookupByAddress()` | Two-pass address normalization + fuzzy match | migrate | LOW | Pure JS logic |
| `normalizeAccessInfo()` | Normalizes access info for comparison | migrate | LOW | Pure utility |
| `extractCodes()` | Extracts numeric codes from access info text | migrate | LOW | Pure utility |
| `isPropertyLevelAccessInfo()` | Rejects job-specific phrases from access info | migrate | LOW | Pure utility |
| `routeLead()` | Calls sendAutoReply and sendInspectionSummary | keep (AUTO_REPLY_ENABLED=false) | LOW | `AUTO_REPLY_ENABLED = false` — auto-reply path is dead. Only `sendInspectionSummary` is live. |
| `sendAutoReply()` | Sends auto-reply via GmailApp | delete (disabled) | LOW | `AUTO_REPLY_ENABLED = false`. Was already commented as dashboard handles this. |
| `sendInspectionSummary()` | Sends inspection summary email to keith@ | keep (short-term) | LOW | Uses GmailApp; simple to migrate to n8n or Resend |
| `sendLowConfidenceAlert()` | Emails brandon@ when Gemini confidence = Low | keep (short-term) | LOW | Uses GmailApp; easy to move to n8n email node |
| `addToDispatchQueue()` | Writes new job to Dispatch Queue sheet + syncJobToNeon | migrate (partial complete) | MEDIUM | `NEON_ONLY=true` already skips sheet write. Neon path via syncJobToNeon is live. Remaining work: remove sheet write path entirely. |
| `logToSheet()` | Writes lead details to Leads sheet (audit log) | keep (archive write) | LOW | Leads sheet is a historical audit log, not operational. Sheets writes continue for now. Eventually archive or migrate to Neon. |
| `getNextLeadId()` | Reads Leads sheet to derive next APT-NNNNN ID | migrate | LOW | Once Leads moves to Neon, generate ID from DB sequence. |
| `flagNewContactsForReview()` | Writes to New Contacts sheet for RM email gaps | migrate → Neon + dashboard | LOW | Straightforward table migration |
| `isOfficeEmail()` | Checks if email is a known Lapham office address | migrate | LOW | Pure utility |
| `normalizeClientName()` | Maps Lapham variants to "Lapham" | migrate | LOW | Pure utility |
| `applyClassificationLabels()` | Applies APT/Turnover or APT/Inspection Gmail labels | keep with email polling | LOW | GmailApp label management; migrates with checkNewLeadEmails |
| `applyProcessedLabel()` | Applies APT-Processed Gmail label | keep with email polling | LOW | Same as above |
| `extractAddressFromSubject()` | Regex extracts address from subject line | migrate | LOW | Pure JS regex |
| `getLeadsHeaders()` | Returns column headers array for Leads sheet | delete (or archive) | LOW | Sheet setup utility; no production use |
| `getReviewHeaders()` | Returns column headers array for New Contacts sheet | delete (or archive) | LOW | Same |
| `getProcessedMessageIds()` | Reads Leads sheet col 36 for dedup set | keep with polling (short-term) | LOW | Dedup logic migrates with checkNewLeadEmails |
| `getColumnValues()` | Generic sheet column → Set reader | migrate | LOW | Pure utility; becomes a DB query |
| `buildThreadContext()` | Joins last 3 Gmail messages into context string | keep with polling | LOW | GmailApp dependency |
| `extractEmail()` | Extracts email from raw "Name <email>" string | migrate | LOW | Pure utility |
| `sanitizeAddress()` | Strips ## double-hash from address strings | migrate | LOW | Pure utility |
| `fmtAddr()` | Formats address for email body | migrate | LOW | Pure utility |
| `buildSig()` | Builds email signature with Lead ID | delete (or migrate) | LOW | Used only in dead sendAutoReply |
| `getApiKey()` | Reads GEMINI_API_KEY from Script Properties | migrate → env var | LOW | Becomes `process.env.GEMINI_API_KEY` in Node |
| `setupTrigger()` | Creates checkNewLeadEmails time-based trigger | keep (GAS-only) | LOW | Trigger management stays in GAS as long as polling stays in GAS |
| `doGet()` | Serves APT_Dispatch_Dashboard HTML or Dispatch_Walkthrough | delete | LOW | GAS HTML dashboard is dead; CC2.0 Next.js is the active dashboard |
| `getNewContactsData()` | Reads New Contacts sheet for dashboard | delete (superseded) | LOW | Dashboard reads from Next.js /api/* now. No frontend calls this GAS action. |
| `addToMasterDirectory()` | Appends a new property to Master Directory sheet | migrate → Neon properties table | MEDIUM | Needs properties table in Neon. Currently writing to Sheets. |
| `dismissNewContact()` | Sets New Contacts row status to Dismissed | migrate → Neon | LOW | Simple status update |
| `sendDashboardEmail()` | Sends email from dashboard, logs contact timestamp to Sheets | migrate → Resend + Neon | MEDIUM | Uses GmailApp; should move to Resend in Node context |
| `getGmailThread()` | Fetches Gmail thread messages for dashboard mini-inbox | migrate → DashboardAPI.gs version | LOW | Duplicate of getGmailThreadDA in DashboardAPI.gs — that version is the active one |
| `replyToThread()` | Sends reply via GmailApp | migrate → DashboardAPI.gs version | LOW | Duplicate; DashboardAPI.gs version is active |
| `getDraftReply()` | Gemini-drafted reply for dispatch dashboard | migrate → DashboardAPI.gs version | LOW | Duplicate; DashboardAPI.gs version is active and has more features |
| `morningAuditReport()` | Daily briefing email to brandon@/keith@ | migrate → n8n or cron + Neon | LOW | Pure reporting; reads Dispatch Queue (now Neon). Easy n8n workflow. |
| `setupAuditTrigger()` | Creates morningAuditReport trigger | delete after migration | LOW | GAS trigger management |
| `getDispatchData()` | Reads Dispatch Queue sheet and returns JSON | delete (superseded) | LOW | Replaced by Next.js /api/jobs reading from Neon. |
| `getDispatchHeaders()` | Returns Dispatch Queue column headers | delete | LOW | Sheet setup utility; no production use |
| `updateJob()` | Writes job updates to Dispatch Queue sheet | delete (dead path) | LOW | `NEON_ONLY=true` causes early return with no-op. The active path is Next.js PATCH /api/jobs/[jobId]. |
| `archiveJob()` | Sets job status to Archived in Dispatch Queue | delete (dead path) | LOW | Same — `NEON_ONLY=true` no-ops this. |
| `shouldSkipEmail()` | Pre-filter for non-work-order emails | migrate | LOW | Pure JS logic; migrates with polling |
| `isDuplicateJob()` | Checks for open job at same address/unit | migrate → Neon query | MEDIUM | Currently reads Dispatch Queue sheet; replace with Neon query |
| `buildSmartPropertyContext()` | Scores and ranks property matches for Gemini prompt | migrate → Neon query | MEDIUM | Becomes a Neon query against properties table |
| `normalizeAddressKey()` | Two-pass address normalization for dedup | migrate | LOW | Pure JS utility; shared across files — needs coordination |
| `getJobIdForThread()` | Looks up Lead ID from Gmail Msg ID in Dispatch Queue | migrate → Neon query | LOW | Becomes SELECT job_id FROM jobs WHERE gmail_msg_id = ? |
| `writeInboundReplyToNeon()` | POSTs inbound reply to DashboardAPI → Neon | keep (short-term) | LOW | Bridges GAS email polling to Neon comms. Stays until polling migrates. |
| `backfillDispatchMsgIds()` | Commented-out / dead function | delete | LOW | Removed from source/dead code |
| `catchUpMissedEmails()` | Commented-out / dead function | delete | LOW | Removed from source/dead code |
| `draftTenantContact()` | Commented-out / dead function | delete | LOW | Removed from source/dead code |
| `sendUrgentAlert()` | Commented-out / dead function | delete | LOW | Removed from source/dead code |
| `sendTurnoverFlag()` | Commented-out / dead function | delete | LOW | Removed from source/dead code |

## SuggestTechs.js Functions

| Function | Responsibility | Migration Status | Risk | Notes |
|----------|----------------|------------------|------|-------|
| `suggestTechsForJob()` | Top-level scoring entry point | migrate → DashboardAPI version | LOW | Duplicate of suggestTechsDA in DashboardAPI.gs; that version is the active one |
| `buildTechScores()` | Scores techs by trade frequency + address familiarity + skill | migrate | LOW | Pure scoring logic; migrates to Next.js utility module |
| `loadSkillRatings()` | Reads Tech Roster skill columns | migrate → Neon query | LOW | Once techs table in Neon is source of truth |
| `getTechAvailability()` | Reads Tech Roster for active techs | migrate | LOW | Reads Tech Roster for active techs |
| `loadTechAssignments()` | Reads historical assignments | migrate | LOW | Reads historical assignments |
| `getTodayStr()` | GAS date wrapper | delete | LOW | GAS date wrapper |
| `loadDurationDefaults()` | Reads TradeDurations sheet | migrate → Neon | LOW | Reads TradeDurations sheet |
| `setupTradeDurationSheet()` | One-time setup | delete | LOW | One-time setup |
| `testSuggestTechs()` | Dev test harness | delete | LOW | Dev test harness |

## TechPWA.gs Functions

| Function | Responsibility | Migration Status | Risk | Notes |
|----------|----------------|------------------|------|-------|
| `doGet()` | Routes GET actions: getTechJobs, getTechStatus, getTimeOffHistory, getTimeOffBalance, getShiftStatus | migrate → Next.js API routes | HIGH | Entry point for all field tech reads. Entire TechPWA.gs migration is the highest-risk item due to active field use. |
| `doPost()` | Routes POST actions: login, clockIn, clockOut, startBreak, endBreak, markComplete, etc. | migrate → Next.js API routes | HIGH | Entry point for all field tech writes. Session auth, clock events, PAGA compliance. |
| `fireComplianceWebhook()` | POSTs compliance event to n8n | migrate | LOW | Pure HTTP POST; easy to move to Node |
| `handleLogin()` | Badge+PIN auth, generates session token, writes to Tech Roster | migrate → Neon + Next.js auth | HIGH | Session tokens stored in Sheets today. Migration requires techs table in Neon as auth source of truth. |
| `handleChangePin()` | Updates PIN hash in Tech Roster | migrate → Neon | MEDIUM | Simple DB update |
| `validateToken()` | Reads Tech Roster to validate session token hash | migrate → Neon | HIGH | Called on every authenticated request. Sheets read on every API call is a performance bottleneck. |
| `getTechJobs()` | Reads Dispatch Queue for tech's scheduled jobs | migrate → Neon query | HIGH | Currently reads Sheets. Neon has jobs table — query is straightforward. |
| `getTechStatus()` | Reads Time Records for active/on-break status | migrate → Neon query | HIGH | Currently reads Sheets. time_records table in Neon. |
| `handleClockIn()` | Creates Time Records row + syncTimeRecordToNeon | migrate (partial complete) | HIGH | Shadow-sync already fires. Remove Sheets write; Neon is already receiving. |
| `handleClockOut()` | Writes clock-out + PAGA premium calc + syncTimeRecordToNeon | migrate (partial complete) | HIGH | Same as clockIn — shadow-sync live. PAGA calc is pure JS. |
| `handleStartBreak()` | Updates Time Records break_start + syncTimeRecordToNeon | migrate (partial complete) | MEDIUM | Shadow-sync live. |
| `handleEndBreak()` | Calculates break duration + syncTimeRecordToNeon | migrate (partial complete) | MEDIUM | Shadow-sync live. |
| `handleMarkComplete()` | Clock-out + Job Performance History write + updateJobStatus | migrate (partial complete) | HIGH | Writes to two Sheets (Time Records + Job Performance History). Both need Neon tables. |
| `handleUploadReceipt()` | Saves base64 photo to Google Drive, appends file ID to Time Records | keep (long-term: migrate) | MEDIUM | DriveApp dependency. Migrate to Cloud Storage or Cloudflare R2 when ready. |
| `handleFlagIssue()` | Appends flagged note to Dispatch Queue Notes field | migrate → Neon PATCH | LOW | Simple notes append; becomes PATCH /api/jobs/[id] |
| `handleRequestTimeOff()` | Writes to TOM Sheets (separate spreadsheet) | keep (until TOM migrates) | MEDIUM | AppSheet TOM reads from Sheets directly. Migration blocked on TOM redesign. |
| `handleCancelTimeOff()` | Updates TOM request status | keep (until TOM migrates) | MEDIUM | Same dependency |
| `handleGetTimeOffHistory()` | Reads TOM Sheets for tech's requests | keep (until TOM migrates) | MEDIUM | Same dependency |
| `handleGetTimeOffBalance()` | Reads TOM Employees + AccrualRules + requests, calculates balance | keep (until TOM migrates) | MEDIUM | Complex accrual logic; TOM is a hard dependency |
| `getShiftStatus()` | Reads Time Records for SHIFT type record status | migrate → Neon | HIGH | Once time_records is sole write path |
| `handleStartShift()` | Creates SHIFT record in Time Records | migrate (partial complete) | MEDIUM | Shadow-sync fires; Sheets write is the remaining step |
| `handleEndShift()` | Closes SHIFT record in Time Records | migrate (partial complete) | MEDIUM | Same |
| `handleSignAttestation()` | Updates attestation columns in Time Records | migrate → Neon | MEDIUM | Attestation columns exist in Neon schema |
| `scanComplianceViolations()` | Scans active Time Records for CA rest/meal violations | migrate → n8n (CA Break Compliance Monitor) | LOW | This function exists but has no trigger — n8n workflow is the intended replacement |
| `triggerComplianceAlert()` | Fires SMS alert (stub — OpenPhone not configured) | delete (stub) | LOW | SMS is a stub with TODO; OpenPhone not integrated |
| `validateToken()` | Session token validation | migrate → Neon | HIGH | Performance bottleneck in Sheets |
| `isTechMatch()` | Parses "Name #Badge" assignment format | migrate | LOW | Pure JS utility |
| `findActiveRecord()` | Finds active Time Record for a job+tech pair | migrate → Neon query | HIGH | Core query for clock events |
| `findActiveTechRecord()` | Finds any active Time Record for a tech | migrate → Neon query | HIGH | Core query for login gate |
| `findAndLockRecord()` | Finds Time Record row for update | migrate → Neon | HIGH | Row-level lock concept needs care in Postgres |
| `getJobById()` | Reads Dispatch Queue for a single job | migrate → Neon | HIGH | Becomes SELECT from jobs WHERE job_id = ? |
| `updateJobStatus()` | Writes status to Dispatch Queue + patchJobStatusNeon | migrate (partial complete) | HIGH | patchJobStatusNeon fires; Sheets write remains |
| `appendReceiptId()` | Appends Drive file ID to Time Records | keep (with handleUploadReceipt) | MEDIUM | Drive dependency |
| `rowToTimeRecord()` | Maps Sheets row to JSON | delete after migration | LOW | Replaced by ORM mapping from Neon |
| `getReceiptsFolder()` | Creates Drive folder structure for receipts | keep (with upload) | MEDIUM | Drive dependency |
| `generateToken()` | UUID generation | delete (duplicate of Utilities.getUuid) | LOW | Node has crypto.randomUUID() |
| `hashPin()` / `hashToken()` | SHA-256 hashing | migrate | LOW | Use Node crypto module |
| `jsonResponse()` | GAS ContentService response builder | delete after migration | LOW | GAS-specific |
| `getTechRosterSheet()` / `getDispatchQueueSheet()` / `getTimeRecordsSheet()` / `getJobPerformanceSheet()` | Sheet accessor helpers | delete after migration | LOW | Become Neon query functions |
| `setupPWASheets()` | One-time sheet creation utility | delete | LOW | Already run; not needed after migration |
| `getTomSheet()` / `getTomColMap()` / `ensureTomColumn()` | TOM sheet accessors | keep (until TOM migrates) | MEDIUM | TOM dependency |
| `tomParseTenureThreshold()` / `tomParseAccrualRate()` | TOM accrual rule parsers | keep (until TOM migrates) | MEDIUM | TOM dependency |
| `ensureTimecardColumns()` | One-time column creation utility | delete | LOW | Already run |
| `patchJobStatusNeon()` | HTTP PATCH to Next.js /api/jobs/[id] | delete after migration | LOW | Once TechPWA.gs migrates, this bridge is not needed |
| `getTechDataFromRow()` / `syncTechToNeon()` / `bootstrapTechsToNeon()` | Neon sync utilities for techs | delete after migration | LOW | Neon will be sole source; shadow-sync utilities no longer needed |
| `getJobDataFromRow()` / `syncJobToNeon()` / `bootstrapJobsToNeon()` | Neon sync utilities for jobs | delete after migration | LOW | Same |
| `getTimeRecordDataFromRow()` / `syncTimeRecordToNeon()` / `bootstrapTimeRecordsToNeon()` | Neon sync utilities for time records | delete after migration | LOW | Same |
| `safeIsoDate()` | Safe ISO date conversion | migrate | LOW | Pure utility; becomes a shared util in Node |
| `calculateMealPremiums()` | PAGA meal premium auto-calculation | migrate | MEDIUM | Business-critical CA compliance logic; pure JS; moves to Node |
| `getTechHourlyRate()` | Reads hourly rate from Tech Roster | migrate → Neon query | LOW | Becomes SELECT hourly_rate FROM employees WHERE badge = ? |

## DashboardAPI.gs Functions

| Function | Responsibility | Migration Status | Risk | Notes |
|----------|----------------|------------------|------|-------|
| `getDispatchDataDA()` | Already migrated to Next.js | delete | LOW | Superseded by Next.js routes |
| `getJobByIdDA()` | Already migrated to Next.js | delete | LOW | Superseded by Next.js routes |
| `getTodaySchedule()` | Already migrated to Next.js | delete | LOW | Superseded by Next.js routes |
| `getWeekSchedule()` | Already migrated to Next.js | delete | LOW | Superseded by Next.js routes |
| `getLiveFieldStatus()` | Already migrated to Next.js | delete | LOW | Superseded by Next.js routes |
| `getComplianceStatus()` | Already migrated to Next.js | delete | LOW | Superseded by Next.js routes |
| `getTechListDA()` | Already migrated to Next.js | delete | LOW | Superseded by Next.js routes |
| `getJobHistory()` | Already migrated to Next.js | delete | LOW | Superseded by Next.js routes |
| `getNotificationsDA()` | Already migrated to Next.js | delete | LOW | Superseded by Next.js routes |
| `updateJobDA()` | Already migrated to Next.js | delete | LOW | Superseded by Next.js routes |
| `archiveJobDA()` | Already migrated to Next.js | delete | LOW | Superseded by Next.js routes |
| `doGet()` / `doPost()` | HTTP entry points, auth, action routing | migrate (last step) | HIGH | Remove only after all actions are migrated |
| `validateApiKey()` | Checks DASHBOARD_API_KEY Script Property | migrate → Next.js middleware | MEDIUM | Already mirrored in Next.js; GAS version only needed while GAS endpoint is live |
| `getGeminiKey()` | Reads GEMINI_API_KEY from Script Properties | delete after migration | LOW | Becomes process.env.GEMINI_API_KEY |
| `validatePasscode()` | Legacy passcode auth (PASSCODE_DISPATCH etc.) | delete | LOW | Superseded by next-auth Google OAuth. No frontend calls this action. |
| `daResponse()` | GAS ContentService response builder | delete after migration | LOW | GAS-specific |
| `getDQSheet()` / `getTRSheet()` / `getTMSheet()` | Sheet accessor helpers | delete after migration | LOW | Become Neon queries |
| `backfillScheduledDates()` | One-time backfill utility | delete | LOW | Was a one-shot fix; no production use |
| `weekDateRange()` / `parseScheduledDate()` | Date helpers for schedule views | delete (actions already migrated) | LOW | Used by deleted getWeekSchedule |
| `STATUS_TO_FRONTEND` / `STATUS_TO_SHEET` | Status normalization maps | migrate | LOW | Already duplicated in Next.js types; GAS copy becomes dead code |
| `normalizeStatusForFrontend()` / `normalizeStatusForSheet()` | Status string conversion | delete (actions migrated) | LOW | Used by deleted actions |
| `rowToJob()` | Maps Dispatch Queue row to JSON | delete (actions migrated) | LOW | Replaced by Drizzle ORM mapping |
| `createManualJobDA()` | Creates manual job in Dispatch Queue + Neon sync | migrate → POST /api/jobs | MEDIUM | Still writes Sheets (NEON_ONLY flag not applied here). Neon sync added Phase 13. |
| `stripQuotedText()` | Strips quoted email chains from plain text | migrate | LOW | Pure utility; moves to Node |
| `saveAttachmentToDrive()` | Saves email attachments to Drive | migrate or KEEP | MEDIUM | Drive dependency; consider Cloud Storage |
| `getGmailThreadDA()` | Fetches Gmail thread for comms tab | migrate → Next.js Gmail OAuth route | HIGH | Core dashboard feature; requires Gmail OAuth in Node context |
| `replyToThreadDA()` | Sends reply via GmailApp | migrate → Next.js Gmail route | HIGH | Same Gmail OAuth requirement |
| `getDraftReplyDA()` | Gemini-drafted reply for dispatch | migrate → Next.js Gemini route | MEDIUM | Pure HTTP call to Gemini; straightforward move |
| `getUnprocessedThreadsDA()` | Searches Gmail for unprocessed threads | migrate → Next.js Gmail route | HIGH | Gmail OAuth required |
| `markThreadProcessedDA()` | Applies APT-Processed label | migrate → Next.js Gmail route | HIGH | Same |
| `suggestTechsDA()` + scoring helpers | Tech suggestion engine | migrate → Next.js /api/schedule/suggest | MEDIUM | Pure scoring logic; no hard GAS deps |
| `buildTechScoresDA()` / `loadDurationsDA()` / `loadAssignmentsDA()` / `loadSkillRatingsDA()` / `getInactiveTechNamesDA()` / `getTechAvailabilityDA()` | Suggestion scoring helpers | migrate with suggestTechsDA | MEDIUM | Reads become Neon queries |
| `sendSmsDA()` | SMS stub (OpenPhone not configured) | delete (stub) | LOW | Returns NOT_CONFIGURED; no-op |
| `handleSubmitFeedback()` / `handleGetFeedback()` / `handleUpdateFeedbackStatus()` | Dispatcher feedback CRUD | migrate → Neon feedback table | LOW | Low-traffic; simple table migration |
| `getTradeDurationsDA()` / `loadDurationsDA()` | Trade duration defaults | migrate → Neon trade_durations table | LOW | Simple key-value store |
| `getTechAvailabilityWeekDA()` | Committed hours per tech per day (for scheduling picker) | migrate → Neon query | MEDIUM | Reads TOM TimeOffRequests sheet — needs TOM migration first |
| `resolveWCCode()` / `getTechHourlyRateDA()` / `DA_WC_CODES` | WC class code auto-classification | migrate → Next.js utility | LOW | Pure JS logic; no GAS API deps |
| `getTimecardApprovalQueueDA()` | Reads Time Records for supervisor approval queue | migrate → Neon query | MEDIUM | time_records in Neon; supervisor columns already in schema |
| `approveTimecardDA()` / `disputeTimecardDA()` | Update supervisor approval fields in Time Records | migrate → PATCH /api/time-records/[id] | MEDIUM | Sheets write; becomes Neon UPDATE |
| `getTimeOffRequestsDA()` / `submitTimeOffRequestDA()` / `approveTimeOffDA()` / `denyTimeOffDA()` | Office-facing TOM management | keep (until TOM migrates) | MEDIUM | TOM Sheets hard dependency; reads/writes TOM spreadsheet |
| `getJobCommentsDA()` | Reads JobComments sheet | migrate → Neon (shadow-write active) | LOW | comms_messages in Neon is already receiving via shadow-write |
| `addJobCommentDA()` | Writes comment to JobComments sheet + Neon | migrate → Neon | LOW | Neon shadow-write is live; remove Sheets write |
| `getComplianceAlertsDA()` | Reads ComplianceAlerts tab | migrate → Neon | MEDIUM | CA compliance data; needs Neon table |
| `getAvailableSlotsDA()` | Returns available appointment slots for tenant self-scheduling | migrate → Next.js public route | MEDIUM | Complex availability logic; public endpoint |
| `tenantSelfScheduleDA()` | Writes tenant-chosen slot to Dispatch Queue | migrate → Next.js public route | MEDIUM | Public action with tracking token; currently skips API key check |
| `generateScheduleLinkDA()` | Generates a tracking-token URL for tenant self-scheduling | migrate → Next.js | MEDIUM | Token generation logic; straightforward |
| `logSentinelEventDA()` / `logComplianceAnomaliesDA()` / `logWcScanResultDA()` / `logStaleJobAlertDA()` | Sentinel write-backs to SentinelLog sheet | migrate → Neon + Next.js route | LOW | Railway sentinels call this endpoint directly; update their target URL |
| `getStaffPermissionsDA()` | Reads Staff Roster for module access flags | migrate → Neon employees table | LOW | Already modeled in schema; simple SELECT |
| `handleSavePushSub()` | Saves tech push subscription to Tech Roster | migrate → Neon | LOW | employees table in Neon |
| `handleGenerateDoc()` | Google Docs/Drive document generation | keep or MIGRATE | MEDIUM | Depends on whether Docs generation is still used |
| `setScriptProperties()` | One-time setup utility | delete | LOW | Setup-only; not in production code path |
| Various scheduling sheet helpers | `parseDateFromTabDA`, `detectColumnsDA`, `parseTechCellDA`, etc. | delete (scheduling sheet retired) | LOW | Used by dailyScheduleSheetSync — trigger was deleted in S95. Dead code. |
| `getCalendarDataDA()` | Reads scheduling sheet tabs | delete | LOW | Same — scheduling sheet miner is dead |
| `backfillScheduledDates()` | One-time migration utility | delete | LOW | Already ran |
| `padDA()` / `fuzzyAddressScoreDA()` / `extractAddressWordsDA()` / `parseTechCellDA()` / `detectColumnsDA()` | Scheduling sheet helper utilities | delete | LOW | Only used by dead scheduling sheet mining functions |
| `todayStr()` | `Utilities.formatDate(new Date(), ...)` wrapper | delete | LOW | GAS-specific; becomes `new Date().toISOString().slice(0, 10)` in Node |
| `buildTechScoresDA()` and scoring sub-functions | Already listed above | MIGRATE | MEDIUM | see above |

## Migration Phases
### Phase A: Dead Code Cleanup (Zero Risk)

Remove functions that are already dead (NEON_ONLY no-ops, commented out, one-time utilities,
superseded by Next.js routes).

**Files touched:** Code.js, DashboardAPI.gs, SuggestTechs.js (comments + deletion of dead functions)
**Risk:** Zero — no behavior change; dead code only.
**Candidates:** updateJob(), archiveJob(), getDispatchData(), getDispatchHeaders(), doGet() HTML
  serving, validatePasscode(), sendAutoReply(), sendSmsDA stub, all scheduling sheet helpers,
  backfill utilities, setScriptProperties(), all `DELETE` rows above.

---

### Phase B: Pure JS Utility Migration (LOW Risk)

Migrate functions that have no GAS API dependency — pure logic that can be ported verbatim.

**Examples:** normalizeAddressKey(), extractEmail(), sanitizeAddress(), shouldSkipEmail(),
  expandAddressRange(), isOfficeEmail(), normalizeClientName(), resolveWCCode(), stripQuotedText(),
  calculateMealPremiums(), hashPin() / hashToken() equivalents, isDuplicateJob (becomes Neon query).

**Risk:** LOW — pure logic; no external API; testable in isolation.

---

### Phase C: Neon-Only Writes (LOW-MEDIUM Risk)

Remove the Sheets write path from functions where Neon shadow-write is already live and confirmed.

**Examples:** addToDispatchQueue() — `NEON_ONLY=true` already gates it; remove the Sheets branch.
  handleClockIn/Out/Break — shadow-sync fires; remove the appendRow calls.
  addJobCommentDA — shadow-write live; remove JobComments Sheets write.

**Risk:** LOW to MEDIUM — Neon shadow-write data must be validated before removing Sheets writes.
  Phase 11 (Shadow-Writes Inventory) and Phase 12 (Data Integrity Audit) are prerequisites.

---

### Phase D: Dashboard API Read Actions (LOW Risk)

Confirm all migrated DashboardAPI.gs read actions are fully dead and remove their code.

**Examples:** getDispatchDataDA, getJobByIdDA, getTodaySchedule, getWeekSchedule, getLiveFieldStatus,
  getComplianceStatus, getTechListDA, getJobHistory, getNotificationsDA.

**Risk:** LOW — these are already confirmed dead (Next.js routes are live). Verification step:
  confirm no frontend callsite still calls `dashboardRequest({ action: 'getDispatchData' })`.

---

### Phase E: Sentinel Write-Back Migration (LOW Risk)

Migrate the 4 sentinel write-back endpoints from DashboardAPI.gs to Next.js API routes. Railway
sentinels need their target URL updated.

**Examples:** logSentinelEventDA, logComplianceAnomaliesDA, logWcScanResultDA, logStaleJobAlertDA.
**Risk:** LOW — Railway sentinels can be updated to call a new Next.js route. Rollback is easy.

---

### Phase F: Feedback + Comments + Staff Permissions (LOW-MEDIUM Risk)

Migrate Dispatcher Feedback, job comments, and staff permissions from Sheets to Neon.

**Risk:** LOW-MEDIUM — needs Neon tables for feedback and staff_permissions. Data migration required
  for existing feedback rows.

---

### Phase G: Suggestion Engine + Trade Durations (MEDIUM Risk)

Migrate suggestTechsDA, scoring helpers, getTradeDurationsDA to Next.js.

**Risk:** MEDIUM — reads Historical Assignments sheet + Tech Roster. Migration requires a Neon
  historical_assignments table or equivalent. Data backfill needed.

---

### Phase H: Timecard Approval (MEDIUM Risk)

Migrate getTimecardApprovalQueueDA, approveTimecardDA, disputeTimecardDA to Next.js API routes.

**Risk:** MEDIUM — supervisor approval workflow has compliance implications (CA Labor Code). Must
  verify Neon data parity before removing Sheets write path. Requires time_records fully in Neon.
  Blocked on Phase C completion.

---

### Phase I: createManualJob (MEDIUM Risk)

Migrate createManualJobDA to POST /api/jobs.

**Risk:** MEDIUM — Neon sync was added in Phase 13 but Sheets write still fires. Remove Sheets
  write after confirming Neon path handles all fields correctly.

---

### Phase J: Gmail Actions (HIGH Risk)

Migrate getGmailThreadDA, replyToThreadDA, getDraftReplyDA, getUnprocessedThreadsDA,
markThreadProcessedDA from DashboardAPI.gs to Next.js routes using Google OAuth.

**Risk:** HIGH — requires Gmail API OAuth credentials in the Node runtime (currently only available
  in GAS running as workorder@ account). OAuth setup for server-to-server Gmail access is
  non-trivial. Requires Brandon to configure a service account or OAuth refresh token.

---

### Phase K: TechPWA Auth + Clock Events (HIGH Risk)

Migrate the entire TechPWA.gs API to Next.js API routes:
- handleLogin, validateToken → Neon employees table as auth source
- handleClockIn/Out/Break/MarkComplete → Neon time_records as sole write path
- getShiftStatus, handleStartShift/EndShift → Neon
- handleSignAttestation → Neon

**Risk:** HIGH — active production system used by field techs daily. Session tokens stored in Sheets
  today. Migration requires:
  1. Neon employees table confirmed as sole source of truth for auth
  2. time_records confirmed as sole write path (Phase C/H prerequisites)
  3. Old session tokens invalidated or migrated
  4. TechPWA frontend URL updated from GAS endpoint to Next.js
  Suggested: canary rollout — 1 tech on new endpoint before full fleet

---

### Phase L: Email Polling Migration (VERY HIGH Risk — CC3.0)

Migrate checkNewLeadEmails() from GAS time-based trigger to a persistent Node.js service.

**Risk:** VERY HIGH — this is the core inbound lead pipeline. GmailApp polling as workorder@
  requires either:
  (a) Service account with Gmail delegation, or
  (b) OAuth refresh token for workorder@, or
  (c) Gmail push notifications via Pub/Sub (preferred — event-driven, no polling)

This is explicitly scoped to CC3.0, not the current Foundation Milestone. Document as the end state,
not an action item for Phase 10.

---

### Phase M: Time Off Manager (BLOCKED on TOM Redesign)

Migrate handleRequestTimeOff, handleCancelTimeOff, handleGetTimeOffHistory, handleGetTimeOffBalance,
getTimeOffRequestsDA, approveTimeOffDA, denyTimeOffDA to Neon + Next.js.

**Blocked by:** AppSheet TOM reads from Sheets directly. Cannot remove Sheets TOM writes until
  AppSheet TOM is redesigned or replaced.
**Risk:** MEDIUM (logic) + HIGH (AppSheet dependency chain).

---

## Blocked Migrations
1. Phase J Gmail actions blocked on Gmail API OAuth not being available in the Node context. Options: service account with domain-wide delegation, or OAuth2 refresh token.
2. Phase M Time Off Manager blocked on AppSheet TOM reading Sheets directly until TOM is redesigned or replaced.

## Open Security Gap
TechPWA.gs is "Anyone" access with no Cloudflare Worker in front. Adding a Cloudflare Worker is a prerequisite for Phase K.

## Migration Prerequisites and Pitfalls
### Pitfall 1: Removing Sheets Writes Before Neon Parity Is Confirmed
**What goes wrong:** Field operations data (time records, clock events) disappears from the live
  system if the Sheets write is removed before the Neon read path is confirmed to show the same data.
**Why it happens:** Shadow-sync fires but Neon sync can fail silently (muteHttpExceptions: true
  in all sync calls). Failure logs exist but are not monitored.
**How to avoid:** Phase 11 (Shadow-Writes Inventory) and Phase 12 (Data Integrity Audit) must
  pass before removing any Sheets write path. The audit is the hard gate.

### Pitfall 2: Gmail API OAuth Not Available in Node Context
**What goes wrong:** Attempting to call Gmail API from Next.js fails because workorder@
  credentials are only embedded in the GAS project's service account.
**Why it happens:** GAS runs as the deploying user (workorder@aptmaintenanceinc.com). That OAuth
  grant does not transfer to a Node process.
**How to avoid:** Before migrating Gmail actions (Phase J), configure Gmail API OAuth for
  server-to-server access. Options: (1) service account with domain-wide delegation, (2) OAuth2
  refresh token flow. Document the credential setup as a prerequisite.

### Pitfall 3: TechPWA.gs URL Hardcoded in PWA
**What goes wrong:** Migrating TechPWA.gs to Next.js routes but forgetting to update the URL in
  the Tech PWA frontend. Field techs silently call the old GAS endpoint.
**Why it happens:** TechPWA frontend uses `process.env.NEXT_PUBLIC_TECHPWA_API_URL` (or equivalent)
  which points to the GAS deployment ID URL.
**How to avoid:** Phase K migration plan must include frontend URL update. Check all
  `UrlFetchApp` or `fetch` calls in `tech-pwa/src/` that target the TechPWA deployment ID.

### Pitfall 4: WRITE_PATH_NEON_ONLY Flag Creates False Confidence
**What goes wrong:** Assuming NEON_ONLY=true means a function is fully dead, when in fact the
  function still has important non-Sheets logic that runs regardless of the flag.
**Why it happens:** updateJob() and archiveJob() in Code.js are no-ops due to NEON_ONLY=true,
  but addToDispatchQueue() still runs Neon sync logic even with NEON_ONLY=true.
**How to avoid:** Audit each function individually. NEON_ONLY guards Sheets writes, not the
  entire function body.

### Pitfall 5: Normalizing Status Values in Two Places
**What goes wrong:** STATUS_TO_FRONTEND and STATUS_TO_SHEET maps exist in both DashboardAPI.gs
  and Next.js types. If DashboardAPI.gs is removed before these maps are confirmed consistent in
  Next.js, status values arrive as unexpected strings from legacy data.
**How to avoid:** Confirm STATUS_TO_FRONTEND in Next.js covers all values before deleting the
  GAS version.

---

## Assumptions and Open Questions
### Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `WRITE_PATH_NEON_ONLY=true` is confirmed set in production GAS Script Properties | Phase table for updateJob/archiveJob | These functions are NOT dead code; they still write Sheets |
| A2 | `dailyScheduleSheetSync` trigger is confirmed deleted from GAS console (documented S95) | Phase A dead code cleanup | Scheduling sheet functions are not dead code |
| A3 | The `v96` / `v90` / `v43` deployment versions noted in SESSION_STATE.md reflect the current production code | All function inventory | Functions may differ from local source if local has unpushed changes |
| A4 | Neon shadow-sync calls (syncJobToNeon, syncTimeRecordToNeon, etc.) have been running successfully in production | Phase C migration scope | If sync has been silently failing, Neon data is not current and Phase C cannot proceed |

---

### Open Questions

1. **Is `handleGenerateDoc()` in DashboardAPI.gs still called by any frontend?**
   - What we know: The function exists; it uses Google Docs/Drive API.
   - What's unclear: Whether any dispatcher UI still triggers `generateDoc` action.
   - Recommendation: Grep tech-pwa/src for `generateDoc` callsite before marking it for deletion.

2. **Does the Tech PWA frontend have the GAS TechPWA endpoint URL hardcoded or in an env var?**
   - What we know: SESSION_STATE.md shows `NEXT_PUBLIC_DASHBOARD_API_URL` for DashboardAPI; no
     explicit mention of TechPWA endpoint env var.
   - What's unclear: How the Tech PWA (frontend) resolves the TechPWA.gs deployment URL.
   - Recommendation: Before Phase K, locate all fetch calls to the TechPWA deployment ID in
     `tech-pwa/src/`.

3. **Are any of the commented-out functions in Code.js still deployed (i.e., does the deployed
   version differ from the local .js file)?**
   - What we know: Code.js is v96 in production; local is the same file read above.
   - What's unclear: Whether prior sessions removed commented blocks from GAS but not from the
     local file, or vice versa.
   - Recommendation: The GAS_MIGRATION_SCOPE.md document should note that functions marked
     DELETE must be confirmed absent in the deployed version before removing from local file.

---


This document is accepted as the CC3.0 GAS migration execution roadmap. Accepted: 2026-06-07.