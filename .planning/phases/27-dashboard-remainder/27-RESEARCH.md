# Phase 27: DashboardAPI Remainder Migration - Research

**Researched:** 2026-06-11
**Domain:** Next.js App Router API routes / Drizzle ORM / Neon Postgres / GAS retirement
**Confidence:** HIGH

---

## Summary

This phase ports 9 remaining GAS DashboardAPI actions to Next.js routes backed by Neon, so the `/api/gas` fallthrough in `dashboard-api.ts` serves zero non-Gmail actions. All primary data sources (time_records, employees/time_off_requests, jobs) exist in Neon today. Three of the nine in-scope actions — `getCalendarData`, `expandScope`, and `markPTEGranted` — **have no GAS implementation**: `getCalendarDataDA` is referenced in doPost but the function body is missing from DashboardAPI.gs (replaced by `updateMasterDirectoryAccessDA`), while `expandScope` and `markPTEGranted` appear in `DEV_BLOCKED_WRITES` but have no corresponding GAS router entry. These three must be implemented fresh against Neon with no GAS logic to port. The `approveTimecardDA`/`disputeTimecardDA` functions have a parameter-name mismatch versus what the frontend sends. The `submitFeedback`/`getFeedback`/`updateFeedbackStatus` GAS implementation uses a "Dispatcher Feedback" Sheets tab whose schema differs from the Neon `dispatcher_feedback` table — the port must reconcile these shapes. The `generateTenantScheduleLink` frontend action name does not match the GAS router action `generateScheduleLink`; both the route and the `dashboard-api.ts` MIGRATED_ACTIONS entry must be consistent.

**Primary recommendation:** Port all 9 actions in a single wave (ordered: reads first, writes second). The three GAS-ghost actions are greenfield Neon implementations; read the sandbox-store and FeedbackItem type as the behavioral spec since no GAS source exists.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- In scope: getTimecardApprovalQueue, getTechAvailability, getCalendarData (reads); approveTimecard, disputeTimecard, markPTEGranted, expandScope, generateTenantScheduleLink, submitFeedback (writes)
- Out of scope: Gmail-domain actions (Phase 23), GAS file edits (Phase 24), no new GAS code
- Each action → Next.js route under `/api/` with Neon via Drizzle
- Auth: `auth()` from `@/auth` (staff session) for all dashboard-called routes; org_id scoping on every query
- dashboard-api.ts: each ported action added to MIGRATED_ACTIONS or special case; on port failure return explicit error — never fall through to `/api/gas`
- TDD for non-trivial logic; unit tests against 111-test green baseline; zero regressions
- Per-plan terminal gates: tsc + eslint + diff artifact + STOP for Claude Code review
- Playwright 0-failure ceiling before merge
- Read each GAS source function in FULL before porting (non-negotiable)

### Claude's Discretion
- Route paths and grouping (one route per action vs grouped resource routes)
- Whether timecard approval queue logic ports verbatim or simplifies against the Neon schema

### Deferred Ideas (OUT OF SCOPE)
- Gmail-domain actions — Phase 23
- GAS file deletion — Phase 24
- Meal premium auto-calculation — backlogged since CC3.0 milestone doc
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| DASH-01 | getTimecardApprovalQueue + approveTimecard + disputeTimecard served by Next.js against Neon | `time_records` table has all required fields; `timeRecords` schema matches GAS DA_TM layout exactly |
| DASH-02 | getTechAvailability served by Next.js against Neon schedule data | `time_off_requests` table in Neon has all required fields (employeeId, requestDate, returnDate, leaveType, status); GAS reads TOM sheet TOM_SHEET_ID_DA |
| DASH-03 | getCalendarData served by Next.js against Neon | GAS function body is MISSING — implement fresh from CalendarResponse contract; dispatch half from `jobs`, team half from `time_off_requests` |
| DASH-04 | markPTEGranted, expandScope, generateTenantScheduleLink, submitFeedback writes ported to Next.js (Neon-only) | markPTEGranted = updateJob(pteGranted=Yes); expandScope = PATCH job estHours+notes; generateTenantScheduleLink = set trackingToken on jobs; submitFeedback = insert dispatcher_feedback |
| DASH-05 | dashboard-api.ts /api/gas fallthrough serves ZERO non-Gmail actions | Confirmed: after this phase all 9 in-scope actions + all already-migrated actions cover the non-Gmail router surface |
</phase_requirements>

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Timecard approval queue (read) | API / Backend | Database | Reads time_records where attestation=Signed and supervisorStatus=Pending; no client state needed |
| Approve / dispute timecard (write) | API / Backend | Database | Writes supervisorStatus, supervisorId, supervisorName, supervisorAt, disputeReason onto time_records |
| Tech availability (read) | API / Backend | Database | Reads time_off_requests for approved absences in a week window |
| Calendar data (read) | API / Backend | Database | Aggregates jobs + time_off_requests for a calendar month; browser receives pre-shaped CalendarResponse |
| markPTEGranted (write) | API / Backend | — | Thin wrapper over existing PATCH /api/jobs/[jobId]; may not need a new route |
| expandScope (write) | API / Backend | — | PATCH job.estHours + job.notes; delegates to existing PATCH route |
| generateTenantScheduleLink (write) | API / Backend | Database | Writes jobs.trackingToken (uuid); returns URL |
| submitFeedback / getFeedback / updateFeedbackStatus | API / Backend | Database | CRUD on dispatcher_feedback table |
| Auth (all routes) | Frontend Server | API | `auth()` from `@/auth` — staff Google OAuth; never mixed with tech badge/PIN auth |

---

## GAS Source Audit — In-Scope Functions

### 1. `getTimecardApprovalQueueDA` (lines 2798–2888) — PORTABLE

**Data source:** Sheets "Time Records" tab (getTMSheet) — **Neon `time_records` has all equivalent columns**

**Logic:**
- Scans all rows, keeps only `attestation === 'Signed' && supervisorStatus === 'Pending'`
- Computes `actualHours` from `(clockOut - clockIn) / 3600000 - breakMin / 60`
- Derives weekStart/weekEnd from the record dates

**Return shape:**
```ts
{ success: true, records: TimecardRecord[], weekStart: string, weekEnd: string, pendingCount: number }
```
`TimecardRecord` interface already defined in `src/lib/types.ts` (lines 101–121).

**Parameter name mismatch:** GAS `approveTimecardDA` reads `params.approverName` and `params.approverId`, but the frontend `approveTimecard()` helper in dashboard-api.ts sends `supervisorName` and `supervisorId`. The Neon port MUST accept `supervisorName`/`supervisorId` (frontend convention) — do not mirror the GAS bug.

**Neon query pattern:**
```ts
db.select().from(timeRecords).where(
  and(
    eq(timeRecords.orgId, 'APT-CA'),
    eq(timeRecords.attestation, 'Signed'),
    eq(timeRecords.supervisorStatus, 'Pending')
  )
)
```
`actualHours` is already server-calculated on clock-out via `evaluateCACompliance` and stored in the record — no need to recompute it.

---

### 2. `approveTimecardDA` (lines 2890–2916) — PORTABLE

**Data source:** Sheets "Time Records" — writes cols 27–30

**Logic:** Find row by recordId, set supervisorStatus='Approved', supervisorId, supervisorName, supervisorAt.

**Neon equivalent:**
```ts
db.update(timeRecords)
  .set({ supervisorStatus: 'Approved', supervisorId, supervisorName, supervisorAt: new Date() })
  .where(and(eq(timeRecords.recordId, recordId), eq(timeRecords.orgId, 'APT-CA')))
```

**No side effects** (no email, no push, no calendar).

---

### 3. `disputeTimecardDA` (lines 2918–2947) — PORTABLE

**Data source:** Sheets "Time Records" — writes cols 27–31

**Logic:** Same as approve but sets supervisorStatus='Disputed' and also sets DISPUTE_REASON.

**Neon equivalent:** Same as approve, adding `disputeReason: reason`.

**No side effects.**

---

### 4. `getTechAvailabilityWeekDA` (lines 1549–1610) — PORTABLE (different data source)

**Data source:** TOM spreadsheet `TOM_SHEET_ID_DA = "1KeDnWdFK3R_nNHMZIEGbx49xBWq02AnEsXOBXArHgbk"` — TimeOffRequests tab

**Logic:**
- Build 5 weekday dates from `weekStart`
- Filter rows where `status === 'Approved'`
- Find overlap between (startDate, endDate) and the week window
- Return `outDates: { "Tech Name": ["YYYY-MM-DD", ...] }`

**Neon equivalent:** `time_off_requests` table has `employeeId`, `requestDate` (startDate), `returnDate` (endDate), `leaveType`, `status`. Need to JOIN with `employees` to get name. The GAS uses `empName` (string) as the key; Neon needs `employees.name`.

**Return shape:**
```ts
{ success: true, outDates: Record<string, string[]> }
```
Frontend `getTechAvailability()` wrapper in dashboard-api.ts (lines 683–685) reads `res.outDates`.

**No side effects.**

---

### 5. `getCalendarDataDA` — GAS FUNCTION MISSING (implement fresh)

**GAS status:** The comment block at line 1612 describes the function, but the function definition that follows is `updateMasterDirectoryAccessDA` — the actual `getCalendarDataDA` body does not exist in the deployed file. The function is called in doPost (line 234) and would return a runtime error from GAS.

**Behavioral spec from frontend + sandbox-store:**
- Params: `{ month: 'YYYY-MM', view: 'dispatch' | 'team' | 'both' }`
- `dispatchDays`: `Record<string, { tech, jobCount, estHours, hasUrgent }[]>` — jobs scheduled in that month
- `teamDays`: `Record<string, { name, leaveType }[]>` — approved time off for the month

**Calendar page calls with `view: 'team'`** — currently only `teamDays` is rendered. `dispatchDays` is in the type but the calendar page ignores it. Port should implement both halves anyway (Neon has the data).

**Neon query:**
- `dispatchDays`: query `jobs` where `scheduledDate` starts with `YYYY-MM`, group by date+tech
- `teamDays`: query `time_off_requests` (status=Approved) JOIN `employees`, where date range overlaps month

**Return shape (CalendarResponse in dashboard-api.ts lines 80–87):**
```ts
{ success: boolean; month: string; view: string;
  dispatchDays: Record<string, CalendarDispatchEntry[]>;
  teamDays: Record<string, CalendarTeamEntry[]>; }
```

---

### 6. `markPTEGranted` — GAS ACTION DOES NOT EXIST IN ROUTER

**GAS status:** Not in doPost router. Only in `DEV_BLOCKED_WRITES`. Falls through to `/api/gas` → hits UNKNOWN_ACTION.

**Frontend behavior:** `handleMarkPTEGranted()` in JobDetailModal.tsx (line 403) actually calls `updateJob` (not `markPTEGranted`) — it already works via the migrated PATCH route. The `markPTEGranted` action string is in `DEV_BLOCKED_WRITES` as a legacy placeholder.

**Resolution for DASH-05:** Add `markPTEGranted` to MIGRATED_ACTIONS pointing to `/api/jobs/{jobId}` as a PATCH, OR intercept it as a special case that calls `PATCH /api/jobs/:jobId` with `{ pteGranted: 'Yes', status: 'Ready to Schedule' }`. The route already handles this. The planner must ensure `markPTEGranted` no longer falls through to `/api/gas`.

**Simplest implementation:** Special-case block in `dashboard-api.ts` that takes `payload.jobId` and calls `PATCH /api/jobs/:jobId`.

---

### 7. `expandScope` — GAS ACTION DOES NOT EXIST IN ROUTER

**GAS status:** Not in doPost router. Only in `DEV_BLOCKED_WRITES`. Falls through to `/api/gas` → hits UNKNOWN_ACTION.

**Frontend call** (JobDetailModal.tsx line 500–510):
```ts
dashboardRequest("expandScope", {
  jobId, leadId, rowIndex,
  additionalWork, hoursToAdd, reassignTech
})
```

**Sandbox behavior** (sandbox-store.ts line 314–324): adds `hoursToAdd` to `estHours` and appends to `notes`.

**Neon implementation:** PATCH `jobs` where `jobId = payload.leadId`:
```ts
estHours: currentEstHours + hoursToAdd,
notes: appendScopeNote(currentNotes, additionalWork),
tech: reassignTech || currentTech  // if reassignTech provided
```

**Route:** Can route to the existing `PATCH /api/jobs/:jobId` as a special case, or create `/api/jobs/[jobId]/expand-scope` if scope-specific audit trail is needed. Simple PATCH is sufficient.

---

### 8. `generateTenantScheduleLink` — ACTION NAME MISMATCH

**GAS status:** GAS router has `generateScheduleLink` → `generateScheduleLinkDA`. Frontend sends `generateTenantScheduleLink`. These are **different strings** — the frontend action has never reached GAS successfully.

**GAS `generateScheduleLinkDA`** (lines 2394–2418):
- Input: `{ rowIndex }` (GAS uses Sheets row index — unusable post-Neon migration)
- Generates UUID token, writes to column DA_DQ.TRACKING_TOKEN+1 on Dispatch Queue sheet
- Returns `{ success, token, link }` where link = `${DASHBOARD_BASE_URL}/schedule/${token}`

**Frontend call** (JobDetailModal.tsx line 488–497):
```ts
dashboardRequest("generateTenantScheduleLink", { jobId, leadId })
// Expects: { success: boolean; url?: string }
```
Frontend reads `res.url` — NOT `res.link`. The GAS returns `link`; the ported route must return `url`.

**Neon implementation:**
- `jobs.trackingToken` column exists in schema (line 370)
- Generate UUID, update `jobs.trackingToken` where `jobId = payload.jobId`
- Return `{ success: true, url: \`${process.env.NEXT_PUBLIC_BASE_URL}/schedule/${token}\` }`

**Route suggestion:** `/api/jobs/[jobId]/schedule-link` (POST) or handle as special case in dashboard-api.ts.

---

### 9. `submitFeedback` / `getFeedback` / `updateFeedbackStatus` — SCHEMA MISMATCH

**GAS `handleSubmitFeedback`** (lines 1350–1386):
- Data source: "Dispatcher Feedback" Sheets tab
- Columns: Timestamp, Category, Subject, Details, Related Job ID, Status, Admin Notes, Submitted By

**Frontend FeedbackItem type** (dashboard-api.ts lines 54–66):
```ts
{ rowIndex, timestamp, category, subject, details, relatedJobId, status, response?, managerName?, adminNotes?, submittedBy }
```

**Neon `dispatcher_feedback` table** (schema.ts lines 421–430):
```ts
{ id, orgId, jobId NOT NULL, employeeId, feedbackType, content NOT NULL, submittedBy, createdAt }
```

**Critical mismatch:** Neon schema has `jobId NOT NULL` and `content` — no `category`, `subject`, `details`, `adminNotes`, `status`. The Neon table does NOT match the GAS Sheets schema or the frontend FeedbackItem type.

**Resolution:** The Neon `dispatcher_feedback` table must be schema-migrated to match the frontend contract, OR the route uses a different Neon table structure with a migration. The planner must include a **Drizzle migration** task that adds the missing columns (`category`, `subject`, `details`, `adminNotes`, `status`, `relatedJobId`, etc.) and makes `jobId` nullable (since not all feedback is job-specific). This is a **BLOCKER sub-task** — port cannot proceed until the schema is correct.

**Alternatively:** Create a new `feedback` table separate from `dispatcher_feedback` with the correct shape. Check if `dispatcher_feedback` has any production data before altering.

The `updateFeedbackStatus` action uses `rowIndex` as identifier (GAS Sheets row number). The Neon route must use `id` (serial PK) instead — the frontend sends `item.rowIndex` which will become the Neon `id` after migration.

---

## Data Source Verdict Table

| Action | GAS Data Source | Neon Today? | Status |
|--------|----------------|-------------|--------|
| getTimecardApprovalQueue | Sheets "Time Records" (main SS) | YES — `time_records` table, all fields present | PORTABLE |
| approveTimecard | Sheets "Time Records" (main SS) | YES — `time_records.supervisorStatus/Id/Name/At` | PORTABLE — fix param names |
| disputeTimecard | Sheets "Time Records" (main SS) | YES — `time_records.supervisorStatus + disputeReason` | PORTABLE — fix param names |
| getTechAvailability | Separate TOM Spreadsheet — TimeOffRequests tab | YES — `time_off_requests` table (Neon) | PORTABLE — different source |
| getCalendarData | GAS FUNCTION MISSING | YES — `jobs` + `time_off_requests` | GREENFIELD — no GAS logic to port |
| markPTEGranted | NOT IN GAS ROUTER | YES — `jobs.pte` via existing PATCH route | GREENFIELD (1-liner special case) |
| expandScope | NOT IN GAS ROUTER | YES — `jobs.estHours + jobs.notes` via PATCH | GREENFIELD (special case or PATCH) |
| generateTenantScheduleLink | GAS uses rowIndex + Sheets write | YES — `jobs.trackingToken` | PORTABLE with param change (jobId not rowIndex) |
| submitFeedback | Sheets "Dispatcher Feedback" tab | PARTIAL — `dispatcher_feedback` table exists but wrong schema | BLOCKED — needs Drizzle migration first |
| getFeedback | Sheets "Dispatcher Feedback" tab | PARTIAL | BLOCKED — same schema issue |
| updateFeedbackStatus | Sheets "Dispatcher Feedback" tab (by rowIndex) | PARTIAL — needs id-based lookup after migration | BLOCKED — same schema issue |

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| UUID for schedule tokens | crypto.randomUUID() alternatives | `crypto.randomUUID()` (Node built-in) | Already used in codebase patterns |
| Date-range overlap | Manual date comparisons | Drizzle `gte`/`lte` operators | SQL handles boundary conditions correctly |
| Compliance recalculation | Re-implement CA hours math | Read `time_records.actualHours` directly | `evaluateCACompliance` already computed it at clock-out sync |
| Auth in API routes | Custom session parsing | `auth()` from `@/auth` + `x-api-key` dual pattern | Established pattern in `/api/dashboard/live-status` and all migrated routes |
| Drizzle migrations | Raw SQL ALTER TABLE | `drizzle-kit generate` + `drizzle-kit migrate` | Schema-safe, version-controlled |

---

## Architecture Patterns

### Established Dashboard Route Pattern (from live-status and compliance-status)

```ts
// src/app/api/dashboard/[feature]/route.ts
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { auth } from '@/auth';

export async function GET(req: Request) {
  const session = await auth();
  const apiKey = req.headers.get('x-api-key');
  const isApiKeyAuth = apiKey === process.env.DASHBOARD_API_KEY;
  if (!session && !isApiKeyAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  // ... Neon query via Drizzle ...
  return NextResponse.json({ success: true, ...data });
}
```

### MIGRATED_ACTIONS vs Special-Case Decision

| Pattern | Use When |
|---------|----------|
| `MIGRATED_ACTIONS[action] = '/api/route'` | Simple GET, no payload transformation needed |
| Special-case block | POST body needs field mapping, path params, or response field rename |

**For this phase:**
- `getTimecardApprovalQueue` → special case (sends `weekStart` query param or body)
- `getTechAvailability` → already has special case in dashboard-api.ts — just wire route
- `getCalendarData` → special case (month + view params)
- `approveTimecard` / `disputeTimecard` → special cases (POST with recordId)
- `markPTEGranted` → special case (POST with jobId → PATCH /api/jobs/:jobId)
- `expandScope` → special case (POST with jobId/hoursToAdd/additionalWork)
- `generateTenantScheduleLink` → special case (action name mismatch + response field rename)
- `submitFeedback` / `getFeedback` / `updateFeedbackStatus` → special cases

### Explicit-Failure Rule

Per CONTEXT.md locked decision: on route failure, return `{ success: false, error: '...' }` explicitly. Never fall through to `/api/gas`. Pattern from createManualJob:

```ts
if (action === 'createManualJob') {
  try {
    const response = await fetch('/api/jobs', { method: 'POST', ... });
    data = await response.json();
  } catch (e) {
    return { success: false, message: 'Job creation failed' } as unknown as T;
  }
}
```

### Recommended Route Structure

```
src/app/api/
├── timecards/
│   ├── queue/route.ts          # GET — getTimecardApprovalQueue
│   └── [recordId]/
│       ├── approve/route.ts    # POST — approveTimecard
│       └── dispute/route.ts    # POST — disputeTimecard
├── schedule/
│   └── availability/route.ts   # GET — getTechAvailability (weekStart param)
├── calendar/route.ts            # GET — getCalendarData (month + view params)
├── feedback/route.ts            # GET + POST — getFeedback / submitFeedback
│   └── [feedbackId]/route.ts  # PATCH — updateFeedbackStatus
└── jobs/[jobId]/
    ├── schedule-link/route.ts  # POST — generateTenantScheduleLink
    └── (expand-scope handled by existing PATCH route)
```

Note: `markPTEGranted` and `expandScope` may not need new routes — both can delegate to the existing `PATCH /api/jobs/:jobId` as special-case blocks in `dashboard-api.ts`.

---

## Critical Findings

### Finding 1: getCalendarDataDA Body is Missing from GAS

The comment at line 1612 documents the function but the implementation is absent. The `function updateMasterDirectoryAccessDA` immediately follows the comment block, replacing what should be `getCalendarDataDA`. Anyone calling `getCalendarData` in production today gets a GAS runtime error (undefined function). The port is greenfield — use the CalendarResponse type + sandbox-store behavior as the spec.

### Finding 2: approveTimecardDA Has Wrong Parameter Names

GAS reads `params.approverName` and `params.approverId`. The frontend sends `supervisorName` and `supervisorId`. The Neon route must accept the frontend's parameter names. Do not port the GAS bug.

### Finding 3: generateTenantScheduleLink Returns `url` but GAS returns `link`

JobDetailModal.tsx reads `res.url`. GAS `generateScheduleLinkDA` returns `res.link`. The Neon route must return `url` to match what the frontend expects.

### Finding 4: expandScope and markPTEGranted Have No GAS Implementation

These actions are in `DEV_BLOCKED_WRITES` but absent from the doPost router. They silently fail in production (UNKNOWN_ACTION from GAS). Both can be implemented as thin Neon PATCH operations — no GAS logic to extract.

### Finding 5: Feedback Table Schema Must Be Migrated Before Port

The existing `dispatcher_feedback` Neon table (`jobId NOT NULL`, `content NOT NULL`, no category/subject/details/status/adminNotes) cannot serve the frontend's `FeedbackItem` type. A Drizzle migration is required. This is a blocking prerequisite within the phase. Columns needed: `category`, `subject`, `details`, `adminNotes`, `status` (with default 'Needs Review'), `relatedJobId` (nullable). Existing columns `feedbackType` → maps to `category`, `content` → maps to `details`. Migration must make `jobId` nullable.

### Finding 6: getTechAvailability Already Has a Helper in dashboard-api.ts

`getTechAvailability` wrapper at line 683 already calls `dashboardRequest('getTechAvailability', ...)`. The GAS source reads from a separate TOM spreadsheet. The Neon `time_off_requests` table covers the same data. The route will be new but the data exists.

---

## Common Pitfalls

### Pitfall 1: Timecard actualHours Recalculation
**What goes wrong:** Porting the GAS arithmetic `(clockOut - clockIn) / 3600000 - breakMin / 60` into the Next.js route.
**Why it happens:** The GAS function recomputes actual hours because Sheets doesn't store it reliably.
**How to avoid:** Read `time_records.actualHours` directly — it was computed server-side by `evaluateCACompliance` at clock-out. Never recalculate.
**Warning signs:** Route doing date arithmetic on clockIn/clockOut.

### Pitfall 2: supervisorStatus Enum Values
**What goes wrong:** Using arbitrary strings vs the three values the frontend types.ts and Neon schema expect.
**How to avoid:** `supervisorStatus` must be `'Pending' | 'Approved' | 'Disputed'` — matches TimecardRecord type (line 116).

### Pitfall 3: Calendar teamDays vs dispatchDays Source Tables
**What goes wrong:** Querying jobs table for teamDays (time-off) or time_off_requests for dispatchDays (scheduled jobs).
**How to avoid:** `dispatchDays` = `jobs` filtered by `scheduledDate LIKE 'YYYY-MM-%'`, grouped by date and tech. `teamDays` = `time_off_requests` (approved) JOIN `employees` for name, expanding each leave range across the month's dates.

### Pitfall 4: trackingToken Uniqueness and Collision
**What goes wrong:** Using the same token twice (UUID4 collision is negligible but `crypto.randomUUID()` already handles this).
**How to avoid:** Use `crypto.randomUUID()` (available in Node 14.17+). The `jobs.trackingToken` column has no unique constraint in schema — add one in the migration or handle via application logic.

### Pitfall 5: DEV_BLOCKED_WRITES Not Cleaned Up
**What goes wrong:** After porting, the actions remain in `DEV_BLOCKED_WRITES` and the dev guard still returns `{ success: true, _devBlocked: true }` silently.
**How to avoid:** Remove each action from `DEV_BLOCKED_WRITES` as it is ported. Comment in the archiveJob precedent: "removed — now writes to dev Neon branch, not GAS Sheets."

### Pitfall 6: Feedback rowIndex vs Neon id
**What goes wrong:** The `updateFeedbackStatus` frontend sends `item.rowIndex` as the identifier. After migration, this must be the Neon `id` field. If the frontend still sends `rowIndex`, the route must accept `rowIndex` as `feedbackId` and route accordingly.
**How to avoid:** After migration, ensure `getFeedback` returns `rowIndex: item.id` in the response so the frontend sends back the correct Neon PK.

---

## Runtime State Inventory

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data | Neon `dispatcher_feedback` table has wrong schema vs frontend FeedbackItem contract | Drizzle migration: add category, subject, details, adminNotes, status columns; make jobId nullable |
| Stored data | Neon `time_off_requests` has the TOM data — no migration needed | None |
| Stored data | Neon `time_records` has all timecard fields — no migration needed | None |
| Stored data | Neon `jobs.trackingToken` column exists — no migration needed | None |
| Live service config | GAS DashboardAPI still deployed and receives fallthrough for in-scope actions — becomes caller-less after this phase | None (Phase 24 deletes GAS) |
| OS-registered state | None | None — verified: no OS scheduler entries for dashboard actions |
| Secrets/env vars | `NEXT_PUBLIC_BASE_URL` or equivalent needed for generateTenantScheduleLink URL construction | Verify env var exists on Vercel; GAS used `DASHBOARD_BASE_URL` script property |
| Build artifacts | None — no pip/npm global installs affected | None |

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.1.6 (unit) + Playwright (E2E) |
| Config file | `tech-pwa/vitest.config.ts` |
| Quick run command | `cd tech-pwa && npm run test:unit` |
| Full suite command | `cd tech-pwa && npm run test:unit && npx playwright test` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DASH-01 | getTimecardApprovalQueue returns only Signed+Pending records | unit | `npm run test:unit -- --reporter=verbose -t "timecard"` | ❌ Wave 0 |
| DASH-01 | approveTimecard sets supervisorStatus=Approved with correct params | unit | same | ❌ Wave 0 |
| DASH-01 | disputeTimecard sets supervisorStatus=Disputed + disputeReason | unit | same | ❌ Wave 0 |
| DASH-02 | getTechAvailability returns outDates for approved leave in week | unit | `npm run test:unit -- -t "availability"` | ❌ Wave 0 |
| DASH-03 | getCalendarData dispatchDays aggregates scheduled jobs by date | unit | `npm run test:unit -- -t "calendar"` | ❌ Wave 0 |
| DASH-03 | getCalendarData teamDays expands leave ranges correctly | unit | same | ❌ Wave 0 |
| DASH-04 | generateTenantScheduleLink writes trackingToken, returns url field | unit | `npm run test:unit -- -t "scheduleLink"` | ❌ Wave 0 |
| DASH-04 | submitFeedback inserts to dispatcher_feedback with correct schema | unit | `npm run test:unit -- -t "feedback"` | ❌ Wave 0 |
| DASH-05 | dashboard-api.ts: no in-scope action reaches /api/gas | smoke/manual | verify MIGRATED_ACTIONS + special cases cover all 9 | — |

### Wave 0 Gaps
- [ ] `src/lib/__tests__/timecard-actions.test.ts` — covers DASH-01 (getQueue, approve, dispute logic)
- [ ] `src/lib/__tests__/tech-availability.test.ts` — covers DASH-02
- [ ] `src/lib/__tests__/calendar-data.test.ts` — covers DASH-03 (date expansion, aggregation)
- [ ] `src/lib/__tests__/schedule-link.test.ts` — covers generateTenantScheduleLink UUID + url shape
- [ ] `src/lib/__tests__/feedback.test.ts` — covers submitFeedback/getFeedback schema after migration

---

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | yes | `auth()` from `@/auth` on every route; dual-auth pattern (session OR x-api-key) |
| V3 Session Management | no | Handled globally by next-auth |
| V4 Access Control | yes | org_id scoping on every Neon query (`eq(table.orgId, 'APT-CA')`) |
| V5 Input Validation | yes | Validate recordId/jobId/action params before DB operations; reject empty required fields |
| V6 Cryptography | yes (schedule link) | `crypto.randomUUID()` for trackingToken — never hand-roll UUID |

### Known Threat Patterns

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Timecard tampering via unauthenticated route | Tampering | `auth()` session check + org_id WHERE clause |
| Schedule link token enumeration | Information Disclosure | UUID4 (128-bit entropy) — not sequential |
| Feedback rowIndex manipulation (wrong record) | Tampering | After migration: use Neon serial `id`, not GAS Sheets row number |
| Missing org_id scope leaking cross-tenant data | Information Disclosure | All queries MUST include `eq(table.orgId, session.user.orgId ?? 'APT-CA')` |

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Neon Postgres (Drizzle) | All routes | ✓ | — | — |
| `crypto.randomUUID()` | generateTenantScheduleLink | ✓ | Node built-in | — |
| `drizzle-kit` | Feedback schema migration | ✓ (in package.json devDeps) | — | — |
| `NEXT_PUBLIC_BASE_URL` | generateTenantScheduleLink URL construction | verify on Vercel | — | Fallback to `process.env.VERCEL_URL` |
| `auth()` from `@/auth` | All dashboard routes | ✓ | next-auth v5 | — |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `dispatcher_feedback` table has no production data (safe to migrate) | Feedback schema | If data exists, migration must be backwards-compatible; check before running |
| A2 | `NEXT_PUBLIC_BASE_URL` (or `VERCEL_URL`) env var exists on Vercel for schedule link construction | Environment | Route returns broken URLs if missing; add explicit guard |
| A3 | `time_off_requests.requestDate` = startDate and `.returnDate` = endDate in TOM (mapped from TOM_TABS_DA) | getTechAvailability | Wrong field mapping = empty outDates; verify column alignment |

---

## Open Questions (RESOLVED)

1. **Does `dispatcher_feedback` have production rows in Neon?** — RESOLVED: runtime gate; Plan 27-01 Task 1 is a blocking Brandon checkpoint running the row count before any migration decision.
   - What we know: The table exists in schema; no known writes via Next.js today (GAS writes to Sheets only)
   - What's unclear: Whether any automation or direct Neon writes created rows
   - Recommendation: AG should run `SELECT COUNT(*) FROM dispatcher_feedback` before the migration task

2. **Should `markPTEGranted` and `expandScope` route to existing PATCH `/api/jobs/:jobId` or get dedicated routes?** — RESOLVED: special-case blocks delegating to the existing PATCH (adopted in Plans 27-04/27-06).
   - What we know: Both are thin wrappers around job field updates; existing PATCH route handles those fields
   - What's unclear: Whether separate routes improve observability or whether delegation is cleaner
   - Recommendation: Use special-case blocks in `dashboard-api.ts` delegating to `/api/jobs/:jobId` (no new route files needed)

3. **Does `getTimecardApprovalQueue` need weekStart filtering on the Neon query?** — RESOLVED: port verbatim GAS behavior — all Pending records, derive week range from results (adopted in Plan 27-02).
   - What we know: GAS ignores `weekStart` param — it scans ALL pending records and derives the week range from what it finds
   - What's unclear: Whether the UI expects a filtered subset or all pending records
   - Recommendation: Port verbatim behavior — return all Pending records; derive weekStart/weekEnd from the results

---

## Sources

### Primary (HIGH confidence)
- `dashboard-api/DashboardAPI.gs` (lines 2798–2947) — getTimecardApprovalQueueDA, approveTimecardDA, disputeTimecardDA — read in full
- `dashboard-api/DashboardAPI.gs` (lines 1549–1610) — getTechAvailabilityWeekDA — read in full
- `dashboard-api/DashboardAPI.gs` (lines 1348–1433) — handleSubmitFeedback, handleGetFeedback, handleUpdateFeedbackStatus — read in full
- `dashboard-api/DashboardAPI.gs` (lines 2394–2418) — generateScheduleLinkDA — read in full
- `tech-pwa/src/lib/schema.ts` — time_records, jobs, time_off_requests, dispatcher_feedback, employees tables
- `tech-pwa/src/lib/dashboard-api.ts` — MIGRATED_ACTIONS map, DEV_BLOCKED_WRITES, all frontend type interfaces
- `tech-pwa/src/lib/types.ts` — TimecardRecord, TimecardApprovalQueueResponse
- `tech-pwa/src/components/dashboard/JobDetailModal.tsx` — handleMarkPTEGranted, handleSaveExpansion, handleGenerateScheduleLink call sites
- `tech-pwa/src/app/calendar/page.tsx` — CalendarResponse consumption pattern
- `tech-pwa/src/app/feedback/page.tsx` — submitFeedback, getFeedback, updateFeedbackStatus call sites
- `tech-pwa/src/app/api/dashboard/live-status/route.ts` — established dashboard route pattern
- `tech-pwa/src/lib/sandbox-store.ts` — behavioral spec for getCalendarData, expandScope

### Secondary (MEDIUM confidence)
- `tech-pwa/src/app/api/time-records/sync/route.ts` — confirmed actualHours is server-computed at sync time
- `tech-pwa/src/app/api/jobs/route.ts` and `[jobId]/route.ts` — confirmed existing PATCH handles pteGranted, estHours

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — Drizzle/Neon/next-auth all live in production
- Architecture: HIGH — 6 of 9 actions have clear Neon data; 3 are greenfield with clear specs
- Pitfalls: HIGH — all pitfalls sourced from direct code inspection, not inference
- Feedback schema blocker: HIGH — confirmed by direct schema.ts vs GAS column comparison

**Research date:** 2026-06-11
**Valid until:** 2026-07-11 (stable stack)
