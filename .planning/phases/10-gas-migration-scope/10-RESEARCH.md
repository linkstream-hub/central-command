# Phase 10: GAS Migration Scope — Research

**Researched:** 2026-06-07
**Domain:** Google Apps Script → Node.js / Next.js migration cataloging
**Confidence:** HIGH

---

## Summary

Phase 10 is a pure documentation / inventory task. No code changes are made. The deliverable is
`docs/GAS_MIGRATION_SCOPE.md` — a function-by-function catalog of all three GAS projects with a
migration status (keep / migrate / delete) and a risk level assigned to each function.

Three GAS projects exist: `Code.js` (root, email polling + sheet writes, manual deploy only),
`TechPWA.gs` (field tech API backend), and `dashboard-api/DashboardAPI.gs` (CC2.0 dashboard API).
A fourth file, `SuggestTechs.js`, is a support module referenced by `Code.js`. A scratch file
`scratch/add_headers.gs` also exists in the root project.

The Neon cut-over (v1.1) is already complete as of 2026-06-01. `WRITE_PATH_NEON_ONLY=true` is set
in GAS Script Properties. The Dispatch Queue Sheets tab is locked as a read-only archive. All active
reads and writes from the CC2.0 dashboard now go through Next.js API routes backed by Neon.

The key planning question is: **which functions can be deleted, which must migrate, and in what
order?** This research answers that question by reading every function in every GAS file and
assigning a disposition.

**Primary recommendation:** Produce `docs/GAS_MIGRATION_SCOPE.md` as a Markdown table with
one row per function, columns: File | Function | Responsibility | Migration Status | Risk | Notes.
Organize into migration phases in ascending risk order.

---

## Project Constraints (from CLAUDE.md)

- **Dev write guard:** Local dev blocks all GAS writes by default. `NEXT_PUBLIC_DEV_ALLOW_WRITES=true`
  override exists — never commit to `.env.local`.
- **Never run:** `catchUpMissedEmails()`, `resetBackfill()`, `setupBackfillTrigger()`,
  `archiveOldJobsConfirmed()`, `mineScheduleSheet()` — these are on the NEVER RUN list in RULES.md.
- **Three separate clasp projects** — each has its own `deploymentId`. Never mix them.
- **Manual deploy only** for Code.js. Never automate `clasp deploy`.
- **WRITE_PATH_NEON_ONLY=true** is set — most Sheets write paths in Code.js and DashboardAPI.gs
  already no-op or skip when this flag is present.
- **Absolute paths only** for all file references. Root dir is `C:/PTOW/1_APT_Central_Command`.

---

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

## Full Function Inventory

### File 1: Code.js (root project — Lead Parsing + email triggers)

**Deployed as:** Lead Parsing web app + scheduled triggers. Manual deploy only.
**GAS triggers active:** `checkNewLeadEmails` (every 15 min), `morningAuditReport` (daily ~6:30am).

| Function | Responsibility | Migration Status | Risk | Notes |
|----------|----------------|-----------------|------|-------|
| `checkNewLeadEmails()` | Main polling loop — Gmail search, dedup, parse, route | **KEEP (long-term: migrate)** | HIGH | Requires Gmail API access as workorder@. No Node equivalent today. Core production function. |
| `detectLaphamForm()` | Bypasses Gemini for structured website@laphamcompany.com forms | **KEEP with checkNewLeadEmails** | MEDIUM | Called inside polling loop; migrates together |
| `parseWithGemini()` | Calls Gemini REST API, returns parsed JSON | **MIGRATE** | MEDIUM | Pure HTTP call to Gemini — Node.js equivalent is straightforward. No GAS-only API. |
| `extractJson()` | Robust JSON extraction from Gemini text | **MIGRATE** | LOW | Pure utility function |
| `loadLaphamDatabase()` | Reads Master Directory tab into memory | **MIGRATE → Neon query** | MEDIUM | Once properties table lands in Neon, replace with DB query |
| `expandAddressRange()` | Expands "530-536 41st St" into individual addresses | **MIGRATE** | LOW | Pure JS logic |
| `enrichFromLaphamDb()` | Matches parsed lead to Master Directory record | **MIGRATE → Neon query** | MEDIUM | Depends on loadLaphamDatabase(); migrates together |
| `checkForMissingEmail()` | Flags properties with no RM email to New Contacts sheet | **MIGRATE → Neon + notification** | LOW | Needs new_contacts table in Neon |
| `lookupByAddress()` | Two-pass address normalization + fuzzy match | **MIGRATE** | LOW | Pure JS logic |
| `normalizeAccessInfo()` | Normalizes access info for comparison | **MIGRATE** | LOW | Pure utility |
| `extractCodes()` | Extracts numeric codes from access info text | **MIGRATE** | LOW | Pure utility |
| `isPropertyLevelAccessInfo()` | Rejects job-specific phrases from access info | **MIGRATE** | LOW | Pure utility |
| `routeLead()` | Calls sendAutoReply and sendInspectionSummary | **KEEP (AUTO_REPLY_ENABLED=false)** | LOW | `AUTO_REPLY_ENABLED = false` — auto-reply path is dead. Only `sendInspectionSummary` is live. |
| `sendAutoReply()` | Sends auto-reply via GmailApp | **DELETE (disabled)** | LOW | `AUTO_REPLY_ENABLED = false`. Was already commented as dashboard handles this. |
| `sendInspectionSummary()` | Sends inspection summary email to keith@ | **KEEP (short-term)** | LOW | Uses GmailApp; simple to migrate to n8n or Resend |
| `sendLowConfidenceAlert()` | Emails brandon@ when Gemini confidence = Low | **KEEP (short-term)** | LOW | Uses GmailApp; easy to move to n8n email node |
| `addToDispatchQueue()` | Writes new job to Dispatch Queue sheet + syncJobToNeon | **MIGRATE (partial complete)** | MEDIUM | `NEON_ONLY=true` already skips sheet write. Neon path via syncJobToNeon is live. Remaining work: remove sheet write path entirely. |
| `logToSheet()` | Writes lead details to Leads sheet (audit log) | **KEEP (archive write)** | LOW | Leads sheet is a historical audit log, not operational. Sheets writes continue for now. Eventually archive or migrate to Neon. |
| `getNextLeadId()` | Reads Leads sheet to derive next APT-NNNNN ID | **MIGRATE** | LOW | Once Leads moves to Neon, generate ID from DB sequence. |
| `flagNewContactsForReview()` | Writes to New Contacts sheet for RM email gaps | **MIGRATE → Neon + dashboard** | LOW | Straightforward table migration |
| `isOfficeEmail()` | Checks if email is a known Lapham office address | **MIGRATE** | LOW | Pure utility |
| `normalizeClientName()` | Maps Lapham variants to "Lapham" | **MIGRATE** | LOW | Pure utility |
| `applyClassificationLabels()` | Applies APT/Turnover or APT/Inspection Gmail labels | **KEEP with email polling** | LOW | GmailApp label management; migrates with checkNewLeadEmails |
| `applyProcessedLabel()` | Applies APT-Processed Gmail label | **KEEP with email polling** | LOW | Same as above |
| `extractAddressFromSubject()` | Regex extracts address from subject line | **MIGRATE** | LOW | Pure JS regex |
| `getLeadsHeaders()` | Returns column headers array for Leads sheet | **DELETE (or archive)** | LOW | Sheet setup utility; no production use |
| `getReviewHeaders()` | Returns column headers array for New Contacts sheet | **DELETE (or archive)** | LOW | Same |
| `getProcessedMessageIds()` | Reads Leads sheet col 36 for dedup set | **KEEP with polling (short-term)** | LOW | Dedup logic migrates with checkNewLeadEmails |
| `getColumnValues()` | Generic sheet column → Set reader | **MIGRATE** | LOW | Pure utility; becomes a DB query |
| `buildThreadContext()` | Joins last 3 Gmail messages into context string | **KEEP with polling** | LOW | GmailApp dependency |
| `extractEmail()` | Extracts email from raw "Name <email>" string | **MIGRATE** | LOW | Pure utility |
| `sanitizeAddress()` | Strips ## double-hash from address strings | **MIGRATE** | LOW | Pure utility |
| `fmtAddr()` | Formats address for email body | **MIGRATE** | LOW | Pure utility |
| `buildSig()` | Builds email signature with Lead ID | **DELETE (or migrate)** | LOW | Used only in dead sendAutoReply |
| `getApiKey()` | Reads GEMINI_API_KEY from Script Properties | **MIGRATE → env var** | LOW | Becomes `process.env.GEMINI_API_KEY` in Node |
| `setupTrigger()` | Creates checkNewLeadEmails time-based trigger | **KEEP (GAS-only)** | LOW | Trigger management stays in GAS as long as polling stays in GAS |
| `doGet()` | Serves APT_Dispatch_Dashboard HTML or Dispatch_Walkthrough | **DELETE** | LOW | GAS HTML dashboard is dead; CC2.0 Next.js is the active dashboard |
| `getNewContactsData()` | Reads New Contacts sheet for dashboard | **DELETE (superseded)** | LOW | Dashboard reads from Next.js /api/* now. No frontend calls this GAS action. |
| `addToMasterDirectory()` | Appends a new property to Master Directory sheet | **MIGRATE → Neon properties table** | MEDIUM | Needs properties table in Neon. Currently writing to Sheets. |
| `dismissNewContact()` | Sets New Contacts row status to Dismissed | **MIGRATE → Neon** | LOW | Simple status update |
| `sendDashboardEmail()` | Sends email from dashboard, logs contact timestamp to Sheets | **MIGRATE → Resend + Neon** | MEDIUM | Uses GmailApp; should move to Resend in Node context |
| `getGmailThread()` | Fetches Gmail thread messages for dashboard mini-inbox | **MIGRATE → DashboardAPI.gs version** | LOW | Duplicate of getGmailThreadDA in DashboardAPI.gs — that version is the active one |
| `replyToThread()` | Sends reply via GmailApp | **MIGRATE → DashboardAPI.gs version** | LOW | Duplicate; DashboardAPI.gs version is active |
| `getDraftReply()` | Gemini-drafted reply for dispatch dashboard | **MIGRATE → DashboardAPI.gs version** | LOW | Duplicate; DashboardAPI.gs version is active and has more features |
| `morningAuditReport()` | Daily briefing email to brandon@/keith@ | **MIGRATE → n8n or cron + Neon** | LOW | Pure reporting; reads Dispatch Queue (now Neon). Easy n8n workflow. |
| `setupAuditTrigger()` | Creates morningAuditReport trigger | **DELETE after migration** | LOW | GAS trigger management |
| `getDispatchData()` | Reads Dispatch Queue sheet and returns JSON | **DELETE (superseded)** | LOW | Replaced by Next.js /api/jobs reading from Neon. |
| `getDispatchHeaders()` | Returns Dispatch Queue column headers | **DELETE** | LOW | Sheet setup utility; no production use |
| `updateJob()` | Writes job updates to Dispatch Queue sheet | **DELETE (dead path)** | LOW | `NEON_ONLY=true` causes early return with no-op. The active path is Next.js PATCH /api/jobs/[jobId]. |
| `archiveJob()` | Sets job status to Archived in Dispatch Queue | **DELETE (dead path)** | LOW | Same — `NEON_ONLY=true` no-ops this. |
| `shouldSkipEmail()` | Pre-filter for non-work-order emails | **MIGRATE** | LOW | Pure JS logic; migrates with polling |
| `isDuplicateJob()` | Checks for open job at same address/unit | **MIGRATE → Neon query** | MEDIUM | Currently reads Dispatch Queue sheet; replace with Neon query |
| `buildSmartPropertyContext()` | Scores and ranks property matches for Gemini prompt | **MIGRATE → Neon query** | MEDIUM | Becomes a Neon query against properties table |
| `normalizeAddressKey()` | Two-pass address normalization for dedup | **MIGRATE** | LOW | Pure JS utility; shared across files — needs coordination |
| `getJobIdForThread()` | Looks up Lead ID from Gmail Msg ID in Dispatch Queue | **MIGRATE → Neon query** | LOW | Becomes SELECT job_id FROM jobs WHERE gmail_msg_id = ? |
| `writeInboundReplyToNeon()` | POSTs inbound reply to DashboardAPI → Neon | **KEEP (short-term)** | LOW | Bridges GAS email polling to Neon comms. Stays until polling migrates. |

**Code.js — Commented-out / dead functions:**
- `backfillDispatchMsgIds()` — commented out, was one-time backfill. **DELETE.**
- `catchUpMissedEmails()` — commented out, on NEVER RUN list. **DELETE.**
- `draftTenantContact()`, `sendUrgentAlert()`, `sendTurnoverFlag()` — commented out, dashboard handles these. **DELETE.**

---

### File 2: SuggestTechs.js (root project — support module)

| Function | Responsibility | Migration Status | Risk | Notes |
|----------|----------------|-----------------|------|-------|
| `suggestTechsForJob()` | Top-level scoring entry point | **MIGRATE → DashboardAPI version** | LOW | Duplicate of suggestTechsDA in DashboardAPI.gs; that version is the active one |
| `buildTechScores()` | Scores techs by trade frequency + address familiarity + skill | **MIGRATE** | LOW | Pure scoring logic; migrates to Next.js utility module |
| `loadSkillRatings()` | Reads Tech Roster skill columns | **MIGRATE → Neon query** | LOW | Once techs table in Neon is source of truth |
| `getTechList()` | Reads active techs from Tech Roster sheet | **MIGRATE → /api/techs** | LOW | Already replaced by Next.js /api/techs |
| `getTechsForCategory()` | Filters techs by skill column threshold | **MIGRATE** | LOW | Pure utility |

---

### File 3: TechPWA.gs (field tech API — deployed as web app)

**Deployed as:** Separate web app, auto-deploys via CI on push to main touching .gs files.
**Public endpoint (Anyone access). Security gap: no Cloudflare Worker in front.**

| Function | Responsibility | Migration Status | Risk | Notes |
|----------|----------------|-----------------|------|-------|
| `doGet()` | Routes GET actions: getTechJobs, getTechStatus, getTimeOffHistory, getTimeOffBalance, getShiftStatus | **MIGRATE → Next.js API routes** | HIGH | Entry point for all field tech reads. Entire TechPWA.gs migration is the highest-risk item due to active field use. |
| `doPost()` | Routes POST actions: login, clockIn, clockOut, startBreak, endBreak, markComplete, etc. | **MIGRATE → Next.js API routes** | HIGH | Entry point for all field tech writes. Session auth, clock events, PAGA compliance. |
| `fireComplianceWebhook()` | POSTs compliance event to n8n | **MIGRATE** | LOW | Pure HTTP POST; easy to move to Node |
| `handleLogin()` | Badge+PIN auth, generates session token, writes to Tech Roster | **MIGRATE → Neon + Next.js auth** | HIGH | Session tokens stored in Sheets today. Migration requires techs table in Neon as auth source of truth. |
| `handleChangePin()` | Updates PIN hash in Tech Roster | **MIGRATE → Neon** | MEDIUM | Simple DB update |
| `validateToken()` | Reads Tech Roster to validate session token hash | **MIGRATE → Neon** | HIGH | Called on every authenticated request. Sheets read on every API call is a performance bottleneck. |
| `getTechJobs()` | Reads Dispatch Queue for tech's scheduled jobs | **MIGRATE → Neon query** | HIGH | Currently reads Sheets. Neon has jobs table — query is straightforward. |
| `getTechStatus()` | Reads Time Records for active/on-break status | **MIGRATE → Neon query** | HIGH | Currently reads Sheets. time_records table in Neon. |
| `handleClockIn()` | Creates Time Records row + syncTimeRecordToNeon | **MIGRATE (partial complete)** | HIGH | Shadow-sync already fires. Remove Sheets write; Neon is already receiving. |
| `handleClockOut()` | Writes clock-out + PAGA premium calc + syncTimeRecordToNeon | **MIGRATE (partial complete)** | HIGH | Same as clockIn — shadow-sync live. PAGA calc is pure JS. |
| `handleStartBreak()` | Updates Time Records break_start + syncTimeRecordToNeon | **MIGRATE (partial complete)** | MEDIUM | Shadow-sync live. |
| `handleEndBreak()` | Calculates break duration + syncTimeRecordToNeon | **MIGRATE (partial complete)** | MEDIUM | Shadow-sync live. |
| `handleMarkComplete()` | Clock-out + Job Performance History write + updateJobStatus | **MIGRATE (partial complete)** | HIGH | Writes to two Sheets (Time Records + Job Performance History). Both need Neon tables. |
| `handleUploadReceipt()` | Saves base64 photo to Google Drive, appends file ID to Time Records | **KEEP (long-term: migrate)** | MEDIUM | DriveApp dependency. Migrate to Cloud Storage or Cloudflare R2 when ready. |
| `handleFlagIssue()` | Appends flagged note to Dispatch Queue Notes field | **MIGRATE → Neon PATCH** | LOW | Simple notes append; becomes PATCH /api/jobs/[id] |
| `handleRequestTimeOff()` | Writes to TOM Sheets (separate spreadsheet) | **KEEP (until TOM migrates)** | MEDIUM | AppSheet TOM reads from Sheets directly. Migration blocked on TOM redesign. |
| `handleCancelTimeOff()` | Updates TOM request status | **KEEP (until TOM migrates)** | MEDIUM | Same dependency |
| `handleGetTimeOffHistory()` | Reads TOM Sheets for tech's requests | **KEEP (until TOM migrates)** | MEDIUM | Same dependency |
| `handleGetTimeOffBalance()` | Reads TOM Employees + AccrualRules + requests, calculates balance | **KEEP (until TOM migrates)** | MEDIUM | Complex accrual logic; TOM is a hard dependency |
| `getShiftStatus()` | Reads Time Records for SHIFT type record status | **MIGRATE → Neon** | HIGH | Once time_records is sole write path |
| `handleStartShift()` | Creates SHIFT record in Time Records | **MIGRATE (partial complete)** | MEDIUM | Shadow-sync fires; Sheets write is the remaining step |
| `handleEndShift()` | Closes SHIFT record in Time Records | **MIGRATE (partial complete)** | MEDIUM | Same |
| `handleSignAttestation()` | Updates attestation columns in Time Records | **MIGRATE → Neon** | MEDIUM | Attestation columns exist in Neon schema |
| `scanComplianceViolations()` | Scans active Time Records for CA rest/meal violations | **MIGRATE → n8n (CA Break Compliance Monitor)** | LOW | This function exists but has no trigger — n8n workflow is the intended replacement |
| `triggerComplianceAlert()` | Fires SMS alert (stub — OpenPhone not configured) | **DELETE (stub)** | LOW | SMS is a stub with TODO; OpenPhone not integrated |
| `validateToken()` | Session token validation | **MIGRATE → Neon** | HIGH | Performance bottleneck in Sheets |
| `isTechMatch()` | Parses "Name #Badge" assignment format | **MIGRATE** | LOW | Pure JS utility |
| `findActiveRecord()` | Finds active Time Record for a job+tech pair | **MIGRATE → Neon query** | HIGH | Core query for clock events |
| `findActiveTechRecord()` | Finds any active Time Record for a tech | **MIGRATE → Neon query** | HIGH | Core query for login gate |
| `findAndLockRecord()` | Finds Time Record row for update | **MIGRATE → Neon** | HIGH | Row-level lock concept needs care in Postgres |
| `getJobById()` | Reads Dispatch Queue for a single job | **MIGRATE → Neon** | HIGH | Becomes SELECT from jobs WHERE job_id = ? |
| `updateJobStatus()` | Writes status to Dispatch Queue + patchJobStatusNeon | **MIGRATE (partial complete)** | HIGH | patchJobStatusNeon fires; Sheets write remains |
| `appendReceiptId()` | Appends Drive file ID to Time Records | **KEEP (with handleUploadReceipt)** | MEDIUM | Drive dependency |
| `rowToTimeRecord()` | Maps Sheets row to JSON | **DELETE after migration** | LOW | Replaced by ORM mapping from Neon |
| `getReceiptsFolder()` | Creates Drive folder structure for receipts | **KEEP (with upload)** | MEDIUM | Drive dependency |
| `generateToken()` | UUID generation | **DELETE (duplicate of Utilities.getUuid)** | LOW | Node has crypto.randomUUID() |
| `hashPin()` / `hashToken()` | SHA-256 hashing | **MIGRATE** | LOW | Use Node crypto module |
| `jsonResponse()` | GAS ContentService response builder | **DELETE after migration** | LOW | GAS-specific |
| `getTechRosterSheet()` / `getDispatchQueueSheet()` / `getTimeRecordsSheet()` / `getJobPerformanceSheet()` | Sheet accessor helpers | **DELETE after migration** | LOW | Become Neon query functions |
| `setupPWASheets()` | One-time sheet creation utility | **DELETE** | LOW | Already run; not needed after migration |
| `getTomSheet()` / `getTomColMap()` / `ensureTomColumn()` | TOM sheet accessors | **KEEP (until TOM migrates)** | MEDIUM | TOM dependency |
| `tomParseTenureThreshold()` / `tomParseAccrualRate()` | TOM accrual rule parsers | **KEEP (until TOM migrates)** | MEDIUM | TOM dependency |
| `ensureTimecardColumns()` | One-time column creation utility | **DELETE** | LOW | Already run |
| `patchJobStatusNeon()` | HTTP PATCH to Next.js /api/jobs/[id] | **DELETE after migration** | LOW | Once TechPWA.gs migrates, this bridge is not needed |
| `getTechDataFromRow()` / `syncTechToNeon()` / `bootstrapTechsToNeon()` | Neon sync utilities for techs | **DELETE after migration** | LOW | Neon will be sole source; shadow-sync utilities no longer needed |
| `getJobDataFromRow()` / `syncJobToNeon()` / `bootstrapJobsToNeon()` | Neon sync utilities for jobs | **DELETE after migration** | LOW | Same |
| `getTimeRecordDataFromRow()` / `syncTimeRecordToNeon()` / `bootstrapTimeRecordsToNeon()` | Neon sync utilities for time records | **DELETE after migration** | LOW | Same |
| `safeIsoDate()` | Safe ISO date conversion | **MIGRATE** | LOW | Pure utility; becomes a shared util in Node |
| `calculateMealPremiums()` | PAGA meal premium auto-calculation | **MIGRATE** | MEDIUM | Business-critical CA compliance logic; pure JS; moves to Node |
| `getTechHourlyRate()` | Reads hourly rate from Tech Roster | **MIGRATE → Neon query** | LOW | Becomes SELECT hourly_rate FROM employees WHERE badge = ? |

---

### File 4: dashboard-api/DashboardAPI.gs

**Deployed as:** Separate web app, auto-deploys via CI on push to main touching .gs files.
**Proxied via:** Cloudflare Worker at api.aptmaintenanceinc.com.

**Already migrated to Next.js (superseded in DashboardAPI.gs — these are dead code):**

| Function | Replaced By | Status |
|----------|-------------|--------|
| `getDispatchDataDA()` | `GET /api/jobs` | DELETE |
| `getJobByIdDA()` | `GET /api/jobs/[jobId]` | DELETE |
| `getTodaySchedule()` | `GET /api/schedule/today` | DELETE |
| `getWeekSchedule()` | `GET /api/schedule/week` | DELETE |
| `getLiveFieldStatus()` | `GET /api/field/live` | DELETE |
| `getComplianceStatus()` | `GET /api/field/compliance` | DELETE |
| `getTechListDA()` | `GET /api/techs` | DELETE |
| `getJobHistory()` | `GET /api/jobs/history` | DELETE |
| `getNotificationsDA()` | `GET /api/notifications` | DELETE |
| `updateJobDA()` | `PATCH /api/jobs/[jobId]` | DELETE |
| `archiveJobDA()` | `PATCH /api/jobs/[jobId]` (status=Archived) | DELETE |

**Still active in DashboardAPI.gs (not yet migrated):**

| Function | Responsibility | Migration Status | Risk | Notes |
|----------|----------------|-----------------|------|-------|
| `doGet()` / `doPost()` | HTTP entry points, auth, action routing | **MIGRATE (last step)** | HIGH | Remove only after all actions are migrated |
| `validateApiKey()` | Checks DASHBOARD_API_KEY Script Property | **MIGRATE → Next.js middleware** | MEDIUM | Already mirrored in Next.js; GAS version only needed while GAS endpoint is live |
| `getGeminiKey()` | Reads GEMINI_API_KEY from Script Properties | **DELETE after migration** | LOW | Becomes process.env.GEMINI_API_KEY |
| `validatePasscode()` | Legacy passcode auth (PASSCODE_DISPATCH etc.) | **DELETE** | LOW | Superseded by next-auth Google OAuth. No frontend calls this action. |
| `daResponse()` | GAS ContentService response builder | **DELETE after migration** | LOW | GAS-specific |
| `getDQSheet()` / `getTRSheet()` / `getTMSheet()` | Sheet accessor helpers | **DELETE after migration** | LOW | Become Neon queries |
| `backfillScheduledDates()` | One-time backfill utility | **DELETE** | LOW | Was a one-shot fix; no production use |
| `weekDateRange()` / `parseScheduledDate()` | Date helpers for schedule views | **DELETE (actions already migrated)** | LOW | Used by deleted getWeekSchedule |
| `STATUS_TO_FRONTEND` / `STATUS_TO_SHEET` | Status normalization maps | **MIGRATE** | LOW | Already duplicated in Next.js types; GAS copy becomes dead code |
| `normalizeStatusForFrontend()` / `normalizeStatusForSheet()` | Status string conversion | **DELETE (actions migrated)** | LOW | Used by deleted actions |
| `rowToJob()` | Maps Dispatch Queue row to JSON | **DELETE (actions migrated)** | LOW | Replaced by Drizzle ORM mapping |
| `createManualJobDA()` | Creates manual job in Dispatch Queue + Neon sync | **MIGRATE → POST /api/jobs** | MEDIUM | Still writes Sheets (NEON_ONLY flag not applied here). Neon sync added Phase 13. |
| `stripQuotedText()` | Strips quoted email chains from plain text | **MIGRATE** | LOW | Pure utility; moves to Node |
| `saveAttachmentToDrive()` | Saves email attachments to Drive | **MIGRATE or KEEP** | MEDIUM | Drive dependency; consider Cloud Storage |
| `getGmailThreadDA()` | Fetches Gmail thread for comms tab | **MIGRATE → Next.js Gmail OAuth route** | HIGH | Core dashboard feature; requires Gmail OAuth in Node context |
| `replyToThreadDA()` | Sends reply via GmailApp | **MIGRATE → Next.js Gmail route** | HIGH | Same Gmail OAuth requirement |
| `getDraftReplyDA()` | Gemini-drafted reply for dispatch | **MIGRATE → Next.js Gemini route** | MEDIUM | Pure HTTP call to Gemini; straightforward move |
| `getUnprocessedThreadsDA()` | Searches Gmail for unprocessed threads | **MIGRATE → Next.js Gmail route** | HIGH | Gmail OAuth required |
| `markThreadProcessedDA()` | Applies APT-Processed label | **MIGRATE → Next.js Gmail route** | HIGH | Same |
| `suggestTechsDA()` + scoring helpers | Tech suggestion engine | **MIGRATE → Next.js /api/schedule/suggest** | MEDIUM | Pure scoring logic; no hard GAS deps |
| `buildTechScoresDA()` / `loadDurationsDA()` / `loadAssignmentsDA()` / `loadSkillRatingsDA()` / `getInactiveTechNamesDA()` / `getTechAvailabilityDA()` | Suggestion scoring helpers | **MIGRATE with suggestTechsDA** | MEDIUM | Reads become Neon queries |
| `sendSmsDA()` | SMS stub (OpenPhone not configured) | **DELETE (stub)** | LOW | Returns NOT_CONFIGURED; no-op |
| `handleSubmitFeedback()` / `handleGetFeedback()` / `handleUpdateFeedbackStatus()` | Dispatcher feedback CRUD | **MIGRATE → Neon feedback table** | LOW | Low-traffic; simple table migration |
| `getTradeDurationsDA()` / `loadDurationsDA()` | Trade duration defaults | **MIGRATE → Neon trade_durations table** | LOW | Simple key-value store |
| `getTechAvailabilityWeekDA()` | Committed hours per tech per day (for scheduling picker) | **MIGRATE → Neon query** | MEDIUM | Reads TOM TimeOffRequests sheet — needs TOM migration first |
| `resolveWCCode()` / `getTechHourlyRateDA()` / `DA_WC_CODES` | WC class code auto-classification | **MIGRATE → Next.js utility** | LOW | Pure JS logic; no GAS API deps |
| `getTimecardApprovalQueueDA()` | Reads Time Records for supervisor approval queue | **MIGRATE → Neon query** | MEDIUM | time_records in Neon; supervisor columns already in schema |
| `approveTimecardDA()` / `disputeTimecardDA()` | Update supervisor approval fields in Time Records | **MIGRATE → PATCH /api/time-records/[id]** | MEDIUM | Sheets write; becomes Neon UPDATE |
| `getTimeOffRequestsDA()` / `submitTimeOffRequestDA()` / `approveTimeOffDA()` / `denyTimeOffDA()` | Office-facing TOM management | **KEEP (until TOM migrates)** | MEDIUM | TOM Sheets hard dependency; reads/writes TOM spreadsheet |
| `getJobCommentsDA()` | Reads JobComments sheet | **MIGRATE → Neon (shadow-write active)** | LOW | comms_messages in Neon is already receiving via shadow-write |
| `addJobCommentDA()` | Writes comment to JobComments sheet + Neon | **MIGRATE → Neon** | LOW | Neon shadow-write is live; remove Sheets write |
| `getComplianceAlertsDA()` | Reads ComplianceAlerts tab | **MIGRATE → Neon** | MEDIUM | CA compliance data; needs Neon table |
| `getAvailableSlotsDA()` | Returns available appointment slots for tenant self-scheduling | **MIGRATE → Next.js public route** | MEDIUM | Complex availability logic; public endpoint |
| `tenantSelfScheduleDA()` | Writes tenant-chosen slot to Dispatch Queue | **MIGRATE → Next.js public route** | MEDIUM | Public action with tracking token; currently skips API key check |
| `generateScheduleLinkDA()` | Generates a tracking-token URL for tenant self-scheduling | **MIGRATE → Next.js** | MEDIUM | Token generation logic; straightforward |
| `logSentinelEventDA()` / `logComplianceAnomaliesDA()` / `logWcScanResultDA()` / `logStaleJobAlertDA()` | Sentinel write-backs to SentinelLog sheet | **MIGRATE → Neon + Next.js route** | LOW | Railway sentinels call this endpoint directly; update their target URL |
| `getStaffPermissionsDA()` | Reads Staff Roster for module access flags | **MIGRATE → Neon employees table** | LOW | Already modeled in schema; simple SELECT |
| `handleSavePushSub()` | Saves tech push subscription to Tech Roster | **MIGRATE → Neon** | LOW | employees table in Neon |
| `handleGenerateDoc()` | Google Docs/Drive document generation | **KEEP or MIGRATE** | MEDIUM | Depends on whether Docs generation is still used |
| `setScriptProperties()` | One-time setup utility | **DELETE** | LOW | Setup-only; not in production code path |
| Various scheduling sheet helpers | `parseDateFromTabDA`, `detectColumnsDA`, `parseTechCellDA`, etc. | **DELETE (scheduling sheet retired)** | LOW | Used by dailyScheduleSheetSync — trigger was deleted in S95. Dead code. |
| `getCalendarDataDA()` | Reads scheduling sheet tabs | **DELETE** | LOW | Same — scheduling sheet miner is dead |
| `backfillScheduledDates()` | One-time migration utility | **DELETE** | LOW | Already ran |
| `padDA()` / `fuzzyAddressScoreDA()` / `extractAddressWordsDA()` / `parseTechCellDA()` / `detectColumnsDA()` | Scheduling sheet helper utilities | **DELETE** | LOW | Only used by dead scheduling sheet mining functions |
| `todayStr()` | `Utilities.formatDate(new Date(), ...)` wrapper | **DELETE** | LOW | GAS-specific; becomes `new Date().toISOString().slice(0, 10)` in Node |
| `buildTechScoresDA()` and scoring sub-functions | Already listed above | MIGRATE | MEDIUM | see above |

---

## Migration Phases (Risk Order — Lowest to Highest)

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

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Gmail API access in Node | Custom IMAP/SMTP client | Google APIs Node.js Client (googleapis npm) or Gmail push via Pub/Sub | OAuth scopes, thread management, label API are non-trivial |
| GAS → Node.js migration sequencing | Ad-hoc migration | Phase ordering as defined above (data integrity audit first) | Missing Neon data parity causes data loss if Sheets write removed too early |
| Tech auth in Node | Rolling custom session store | Extend next-auth with credentials provider using Neon employees table | Session handling already exists; don't build a second auth system |
| PAGA compliance logic | Rewrite from scratch | Port calculateMealPremiums() directly — it is pure JS with no GAS deps | Logic is already correct and tested in production |

---

## Common Pitfalls

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

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Sheets as sole write path | Neon as sole write path (`WRITE_PATH_NEON_ONLY=true`) | 2026-06-01 | All new jobs go to Neon; Sheets is read-only archive |
| DashboardAPI.gs for all dashboard reads | Next.js API routes reading from Neon | 2026-05 (Phase 3) | 10 actions migrated; DashboardAPI.gs still handles writes + Gmail |
| updateJob / archiveJob in Code.js and DashboardAPI.gs | Next.js PATCH /api/jobs/[jobId] | 2026-06-01 | Code.js versions are dead no-ops |
| TechPWA.gs with Sheets as time record store | TechPWA.gs with shadow-write to Neon | Ongoing | Both paths active; Neon not yet sole write path for time records |
| Manual GAS deploy only for Code.js | CI auto-deploy for TechPWA.gs and DashboardAPI.gs | Established | Code.js retains manual-only constraint due to email triggers |

**Deprecated:**
- `dailyScheduleSheetSync` trigger — deleted from GAS console in S95
- GAS HTML dashboard (`doGet()` serving APT_Dispatch_Dashboard.html) — superseded by CC2.0 Next.js
- `validatePasscode()` — superseded by next-auth Google OAuth
- SMS stub in sendSmsDA / triggerComplianceAlert — OpenPhone not integrated; stub returns NOT_CONFIGURED

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| clasp CLI | GAS deployment | ✓ | (in use — CI and local) | — |
| Neon Postgres | Sole write path | ✓ | Neon serverless | — |
| Google Sheets (archive) | Leads log, TOM | ✓ | v96/v90/v43 deployed | — |
| Gmail API (GAS context) | Email polling, thread actions | ✓ (in GAS) | — | Gmail Pub/Sub for Phase L |
| Gmail API (Node context) | Future Phase J migration | ✗ | — | Keep in GAS until OAuth configured |
| Google Drive (receipts) | handleUploadReceipt | ✓ (in GAS) | — | Cloud Storage / R2 for Phase K |
| AppSheet TOM | Time off management | ✓ | External | Blocks Phase M |

---

## Validation Architecture

> Phase 10 is a pure documentation phase. No code changes are made. No automated tests apply.
> Validation is human review of the produced `docs/GAS_MIGRATION_SCOPE.md` artifact.

**Phase gate:** Brandon reviews and accepts the document before it becomes the execution roadmap
  for CC3.0 GAS phases.

---

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No (doc-only phase) | — |
| V3 Session Management | No | — |
| V4 Access Control | No | — |
| V5 Input Validation | No | — |
| V6 Cryptography | No | — |

### Open Security Gap (documented, not fixed in this phase)

- **TechPWA.gs is "Anyone" access** — no Cloudflare Worker in front. This is OPEN per
  ARCHITECTURE.md §OPEN SECURITY GAPS. Document in GAS_MIGRATION_SCOPE.md as a prerequisite for
  Phase K: add Cloudflare Worker before migrating TechPWA.gs or before Phase K goes live.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `WRITE_PATH_NEON_ONLY=true` is confirmed set in production GAS Script Properties | Phase table for updateJob/archiveJob | These functions are NOT dead code; they still write Sheets |
| A2 | `dailyScheduleSheetSync` trigger is confirmed deleted from GAS console (documented S95) | Phase A dead code cleanup | Scheduling sheet functions are not dead code |
| A3 | The `v96` / `v90` / `v43` deployment versions noted in SESSION_STATE.md reflect the current production code | All function inventory | Functions may differ from local source if local has unpushed changes |
| A4 | Neon shadow-sync calls (syncJobToNeon, syncTimeRecordToNeon, etc.) have been running successfully in production | Phase C migration scope | If sync has been silently failing, Neon data is not current and Phase C cannot proceed |

---

## Open Questions

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

## Sources

### Primary (HIGH confidence)

- **Code.js** — read directly from `C:/PTOW/1_APT_Central_Command/Code.js` (2103 lines, v96)
- **TechPWA.gs** — read directly from `C:/PTOW/1_APT_Central_Command/TechPWA.gs` (1835 lines, v90)
- **DashboardAPI.gs** — read directly from `C:/PTOW/1_APT_Central_Command/dashboard-api/DashboardAPI.gs`
  (4225 lines, partial read — first 2530 lines; remaining functions are supporting helpers not
  individually cataloged above)
- **SESSION_STATE.md** — system state, deployment versions, architectural facts
- **docs/ARCHITECTURE.md** — component map, GAS trigger inventory, Phase 3 migration table,
  "Still in DashboardAPI.gs" table

### Secondary (MEDIUM confidence)

- **ROADMAP.md** — Phase 10 success criteria, dependency on Phase 11/12

### Tertiary (LOW confidence)

- Training knowledge on Gmail API OAuth patterns for Node.js — flagged as [ASSUMED] where used

---

## Metadata

**Confidence breakdown:**
- Function inventory: HIGH — read directly from source files
- Migration status assignments: HIGH for items confirmed by ARCHITECTURE.md migration table;
  MEDIUM for items inferred from code analysis
- Risk ordering: MEDIUM — based on dependency analysis and system state; may shift as Neon
  parity data becomes available from Phase 11/12
- Gmail OAuth migration path: LOW — training knowledge, not verified against official docs this session

**Research date:** 2026-06-07
**Valid until:** 2026-07-07 (stable codebase; valid until Phase 11/12 completes or GAS files change)
