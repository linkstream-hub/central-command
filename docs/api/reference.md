<!-- generated-by: gsd-doc-writer -->
# APT Central Command — API Reference

Internal ops SaaS API. All routes are Next.js App Router route handlers under `tech-pwa/src/app/api/`.

---

## Authentication

Two independent auth systems are in use. **Never mix them** — wrong hook causes a redirect loop.

### Staff Auth (Google OAuth)

Office staff routes use Google OAuth via next-auth v5. A session cookie is set after sign-in with an `@aptmaintenanceinc.com` account.

```typescript
// Use in office staff route handlers
import { auth } from '@/auth';
const session = await auth();
if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
```

Protected pages: `/live`, `/schedule`, `/jobs-admin`.

### Tech Auth (Bearer Token)

Field tech routes use a Bearer token obtained from the badge+PIN login endpoint. The raw token is returned to the client and stored in localStorage. The server stores only the SHA-256 hash.

- Token format: 64-character hex string (32 random bytes)
- Expiry: 24 hours
- Token passed as: `Authorization: Bearer <token>` header

```typescript
// Use in field tech route handlers
import { verifyFieldSession } from '@/lib/fieldAuth';
const session = await verifyFieldSession(req);
if (!session) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
```

Protected pages: `/jobs`, `/job/[jobId]`, `/clock`.

### Internal API Key (Dual Auth)

Some routes accept either a staff session OR an internal API key (`x-api-key: <DASHBOARD_API_KEY>`), enabling server-to-server calls from n8n and the Dashboard API. This key is never exposed to the browser.

```
x-api-key: <DASHBOARD_API_KEY>
```

### GAS Internal Secret

One route (`/api/gas/validate-token`) is called only by Google Apps Script. It requires:

```
x-gas-internal-key: <GAS_INTERNAL_SECRET>
```

### Cron Secret

Cron routes authenticate via:

```
Authorization: Bearer <CRON_SECRET>
```

---

## Standard Response Envelope

All endpoints return JSON. Successful responses include `"success": true`. Errors include `"success": false` and a `"message"` string.

```json
{ "success": true, "data": { ... } }
{ "success": false, "message": "Human-readable description" }
```

---

## Rate Limiting

The login endpoint (`POST /api/field/auth/login`) applies a sliding-window rate limit per badge via Upstash Redis. Exceeding the limit returns `429` with a `Retry-After` header.

---

## Endpoints Overview

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| **Field Auth** ||||
| POST | `/api/field/auth/login` | None | Badge+PIN login; returns session token |
| POST | `/api/field/auth/change-pin` | Bearer | Change tech's own PIN |
| **Field — Jobs** ||||
| GET | `/api/field/jobs` | Bearer | List active + today-complete jobs for the authenticated tech |
| POST | `/api/field/clock-in` | Bearer | Clock in to a job; sets job status to In Progress |
| POST | `/api/field/clock-out` | Bearer | Clock out; computes hours worked and meal-break warning |
| POST | `/api/field/job/complete` | Bearer | Mark job complete; writes performance history |
| **Field — Shifts** ||||
| POST | `/api/field/shift/start` | Bearer | Start a shift for the day (idempotent) |
| POST | `/api/field/shift/end` | Bearer | End the shift; computes actual hours |
| POST | `/api/field/shift/status` | Bearer | Get current shift state for a given date |
| POST | `/api/field/break/start` | Bearer | Start a break on an active shift |
| POST | `/api/field/break/end` | Bearer | End a break; accumulates break minutes |
| POST | `/api/field/attestation/sign` | Bearer | Sign end-of-shift attestation (CA compliance) |
| GET | `/api/field/hours` | Bearer | Tech's time records for the past 8 weeks |
| **Field — Internal (dashboard proxy targets)** ||||
| GET | `/api/field/live` | x-api-key | Live tech status for today (internal use — call via dashboard proxy) |
| GET | `/api/field/compliance` | x-api-key | CA labor compliance status per active tech |
| **Jobs (Office/Staff)** ||||
| GET | `/api/jobs` | Staff session | All non-archived jobs with stats |
| POST | `/api/jobs` | Staff session | Create a manual job; sends push notification to assigned tech |
| GET | `/api/jobs/[jobId]` | Staff session or x-api-key | Fetch a single job by ID |
| PATCH | `/api/jobs/[jobId]` | Staff session or x-api-key | Update job fields; triggers tenant email on status transitions |
| GET | `/api/jobs/history` | Staff session or x-api-key | Address-based job history search (up to 50 results) |
| POST | `/api/jobs/sync` | — | Sync jobs (route file present; see source for details) |
| **Dashboard** ||||
| GET | `/api/dashboard/live-status` | Staff session or x-api-key | Proxy to `/api/field/live` for office dashboards |
| GET | `/api/dashboard/compliance-status` | Staff session or x-api-key | Proxy to `/api/field/compliance` for office dashboards |
| **Techs** ||||
| GET | `/api/techs` | None | List active techs with skills (open — no auth check in current implementation) |
| POST | `/api/techs/sync` | — | Sync techs |
| POST | `/api/techs/import` | — | Import techs |
| **Schedule** ||||
| GET | `/api/schedule/today` | Staff session or x-api-key | Today's jobs grouped by tech and unassigned |
| GET | `/api/schedule/week` | — | Weekly schedule |
| POST | `/api/schedule/lock-and-send` | Staff session or x-api-key | Lock schedule for a date and fire n8n dispatch webhook |
| **Comms** ||||
| GET | `/api/comms/[jobId]` | Staff session | Email thread for a job (Neon cache → Gmail fallback) |
| POST | `/api/comms/[jobId]` | Staff session | Send reply email via Resend to TENANT or REQUESTER |
| PATCH | `/api/comms/[jobId]` | Staff session | Mark inbound tenant messages as read |
| GET | `/api/comms/unread` | Staff session | Unread inbound tenant message counts per job |
| POST | `/api/comms/inbound` | x-api-key | Internal: store an inbound message from n8n |
| **Job Comments** ||||
| GET | `/api/job-comments/[jobId]` | Staff session | List comments for a job |
| POST | `/api/job-comments/[jobId]` | Staff session | Add a comment to a job |
| **Notifications** ||||
| GET | `/api/notifications` | Staff session or x-api-key | Actionable dashboard notifications (stale PTE jobs, pending timecards) |
| **Push Notifications** ||||
| POST | `/api/push/subscribe` | None | Register a web-push subscription (forwarded to Dashboard API) |
| POST | `/api/push/send` | None | Send a push notification to a subscription object |
| **Admin** ||||
| POST | `/api/admin/archive-stale` | Staff session or x-api-key | Archive jobs older than 21 days |
| **Cron** ||||
| GET | `/api/cron/sync-gmail-history` | Bearer (CRON_SECRET) | Poll Gmail history API; insert new inbound messages to Neon |
| **Webhooks** ||||
| POST | `/api/webhooks/n8n/gmail` | Bearer (DASHBOARD_API_KEY) | n8n → Next.js: parse raw email with Gemini 1.5 Flash and insert job |
| **GAS Proxy** ||||
| POST | `/api/gas` | Staff session or x-api-key | Proxy to Google Apps Script Dashboard API (read/bridge — no new features) |
| POST | `/api/gas/validate-token` | x-gas-internal-key | GAS internal: validate a field tech session token |
| **Properties** ||||
| GET | `/api/properties` | DASHBOARD_API_KEY header | List active properties with RM info and access codes |
| **Intake** ||||
| POST | `/api/intake/access-sync` | DASHBOARD_API_KEY header | Two-way merge of access codes into property record (n8n → Neon) |
| **Utility** ||||
| GET | `/api/weather` | None | Current temperature for a lat/lon (via open-meteo + BigDataCloud) |
| GET | `/api/health` | None | DB connectivity check |
| **Dev/Tooling** ||||
| POST | `/api/mock/exec` | — | Mock GAS exec endpoint for local development |
| GET/POST | `/api/parse` | — | Email parsing utility |
| GET | `/api/sandbox` | — | Sandbox mode toggle |
| POST | `/api/migrate-techs` | — | One-time tech migration utility |
| POST | `/api/fix-techs` | — | One-time tech fix utility |
| POST | `/api/time-records/sync` | — | Time records sync |
| GET | `/api/list-employees` | — | List employees |

---

## Domain Details

### Field Auth

#### POST `/api/field/auth/login`

Validates badge number + SHA-256 PIN against Neon `employees` table. Rate-limited per badge (Upstash Redis sliding window).

**Request:**
```json
{ "badge": "1234", "pin": "9876" }
```

**Response (200):**
```json
{
  "success": true,
  "token": "<64-char hex>",
  "techId": "1234",
  "employeeId": 42,
  "techName": "John Smith",
  "role": "tech",
  "expiresAt": "2026-06-14T08:00:00.000Z"
}
```

**Errors:**
- `401` — Invalid badge or PIN
- `429` — Rate limit exceeded (`Retry-After` header set)
- `400` — Request schema invalid

---

#### POST `/api/field/auth/change-pin`

Requires current PIN (`oldPin`) to be correct before setting `newPin`.

**Request:**
```json
{ "oldPin": "9876", "newPin": "5555" }
```

**Response (200):**
```json
{ "success": true, "message": "PIN updated successfully" }
```

---

### Field — Jobs

#### GET `/api/field/jobs`

Returns jobs assigned to the authenticated tech that are:
- Not Archived or Complete, **or**
- Complete but scheduled for today (LA timezone)

Ordered by priority ascending, then scheduled date ascending.

**Response:**
```json
{
  "success": true,
  "jobs": [
    {
      "jobId": "APT-12345",
      "status": "Scheduled",
      "priority": "4-STANDARD",
      "address": "123 Main St",
      "unit": "2B",
      "scheduledDate": "2026-06-13",
      ...
    }
  ]
}
```

---

#### POST `/api/field/clock-in`

Inserts a `time_records` row and sets the job status to `In Progress`.

**Request:**
```json
{ "jobId": "APT-12345", "lat": 37.83, "lng": -122.28 }
```

`lat` / `lng` are optional.

**Response:**
```json
{ "success": true, "recordId": "<uuid>", "clockInTime": "<ISO timestamp>" }
```

---

#### POST `/api/field/clock-out`

Closes the time record. Calculates `actualHours` and sets `mealWarning: true` when elapsed > 5 hours with no break.

**Request:**
```json
{ "recordId": "<uuid>", "lat": 37.83, "lng": -122.28 }
```

**Response:**
```json
{
  "success": true,
  "recordId": "<uuid>",
  "clockOutTime": "<ISO>",
  "actualHoursWorked": 4.75,
  "mealBreakWarning": false
}
```

---

#### POST `/api/field/job/complete`

Marks the time record and the job as `Complete`. Inserts a row into `job_performance_history`.

**Request:**
```json
{ "recordId": "<uuid>", "jobId": "APT-12345" }
```

**Response:**
```json
{ "success": true }
```

---

### Field — Shifts

Shift IDs are deterministic: `SHIFT-<badge>-<YYYY-MM-DD>`.

#### POST `/api/field/shift/start`

Creates a shift row. Idempotent — if a shift for that date already exists, returns `alreadyActive: true` with the existing start time.

**Request:**
```json
{ "shiftDate": "2026-06-13" }
```
`shiftDate` is optional; defaults to today in LA timezone.

**Response:**
```json
{
  "success": true,
  "shiftId": "SHIFT-1234-2026-06-13",
  "startTime": "<ISO>",
  "alreadyActive": false
}
```

---

#### POST `/api/field/shift/end`

Closes the shift. Computes `actualHours` accounting for total break minutes.

**Request:**
```json
{ "shiftId": "SHIFT-1234-2026-06-13" }
```

**Response:**
```json
{
  "success": true,
  "shiftId": "SHIFT-1234-2026-06-13",
  "endTime": "<ISO>",
  "actualHours": 7.5
}
```

---

#### POST `/api/field/shift/status`

Returns the shift record for a date, or `null` if none exists.

**Request:**
```json
{ "shiftDate": "2026-06-13" }
```

**Response:**
```json
{
  "success": true,
  "shift": {
    "shiftId": "SHIFT-1234-2026-06-13",
    "status": "Active",
    "startTime": "<ISO>",
    "endTime": null
  }
}
```

---

#### POST `/api/field/break/start`

Inserts a `breaks` row and sets the shift status to `on-break`. Break type is `meal`.

**Request:**
```json
{ "shiftId": "SHIFT-1234-2026-06-13" }
```

**Response:**
```json
{ "success": true, "breakStart": "<ISO>" }
```

---

#### POST `/api/field/break/end`

Closes the open break. Accumulates `breakMinutes` onto the shift's `totalBreakMinutes`. Sets shift status back to `Active`.

**Request:**
```json
{ "shiftId": "SHIFT-1234-2026-06-13" }
```

**Response:**
```json
{ "success": true, "breakEnd": "<ISO>", "breakDurationMinutes": 32 }
```

---

#### POST `/api/field/attestation/sign`

Signs the end-of-shift CA labor compliance attestation. Fires a best-effort webhook to `N8N_COMPLIANCE_WEBHOOK_URL` with overtime and compliance data. Idempotent on `shiftId` (conflict: do nothing).

**Request:**
```json
{
  "shiftId": "SHIFT-1234-2026-06-13",
  "attestationText": "I confirm ...",
  "mealCompliant": true,
  "restCompliant": true
}
```

**Response:**
```json
{ "success": true, "attestationId": 42 }
```

---

#### GET `/api/field/hours`

Returns time records for the authenticated tech for the past 8 weeks, ordered newest first.

**Response:**
```json
{ "success": true, "records": [ { "recordId": "<uuid>", "clockIn": "<ISO>", ... } ] }
```

---

### Field — Internal

These routes are not called directly by the browser. They are called server-to-server using `x-api-key`.

#### GET `/api/field/live`

Returns all active techs' status for today. Statuses: `active`, `on-break`, `complete`, `unassigned`. Records clocked out more than 4 hours ago are excluded.

**Response:**
```json
{
  "success": true,
  "source": "neon",
  "techs": [
    {
      "techId": "1234",
      "techName": "John Smith",
      "status": "active",
      "minutesWorked": 185,
      "jobAddress": "123 Main St #2B",
      "clockInTime": "<ISO>"
    }
  ]
}
```

---

#### GET `/api/field/compliance`

CA labor compliance thresholds (minutes):
- Rest break due: 240 min
- Meal break overdue: 300 min
- Second meal overdue: 570 min

**Response:**
```json
{
  "success": true,
  "source": "neon",
  "records": [
    {
      "techId": "1234",
      "techName": "John Smith",
      "elapsedMin": 245,
      "onBreak": false,
      "status": "REST_DUE",
      "violations": ["REST_BREAK_DUE"],
      "thresholds": { "restAt": 240, "mealAt": 300, "secondMealAt": 570 }
    }
  ]
}
```

---

### Jobs (Office/Staff)

#### GET `/api/jobs`

Returns all non-archived jobs from Neon with an active time-record join (for `clockedInAt` / `activeRecordId`). Also returns aggregate stats.

**Response:**
```json
{
  "success": true,
  "source": "neon",
  "jobs": [ { "jobId": "APT-12345", "status": "Scheduled", ... } ],
  "stats": {
    "urgentCount": 2,
    "needsActionCount": 5,
    "ptePendingCount": 1,
    "todayScheduledCount": 8,
    "doneThisWeekCount": 14
  }
}
```

---

#### POST `/api/jobs`

Creates a manual job. If `assignedTech` and `scheduledDate` are provided, sends a best-effort web-push notification to the tech.

**Request:** `ManualJobPayload` (see `@/lib/dal/jobs` for the full shape).

**Response:**
```json
{ "success": true, "jobId": "APT-12345" }
```

---

#### GET `/api/jobs/[jobId]`

Fetches a single job by `jobId`. Supports dual auth (staff session or `x-api-key`).

**Response:**
```json
{ "success": true, "source": "neon", "job": { "jobId": "APT-12345", ... } }
```

---

#### PATCH `/api/jobs/[jobId]`

Partial update on any job field. Field name mapping:
- `assignedTech` → `tech`
- `serviceCategory` → `category`
- `pteGranted` → `pte`

**Automation triggers (session auth only — skipped for API key calls):**
- Status → `Scheduled`: sends tenant scheduled email
- Status → `PTE Required`: sends PTE coordination email

Any email failure is surfaced as `warning` in the response without rolling back the update.

**Response:**
```json
{ "success": true }
// or
{ "success": true, "warning": "Status updated but tenant notification email failed to send." }
```

---

#### GET `/api/jobs/history`

Address-based fuzzy search (case-insensitive `ILIKE`) returning up to 50 jobs, sorted newest first.

**Query params:** `?address=<search string>` (required)

**Response:**
```json
{
  "success": true,
  "source": "neon",
  "address": "Main St",
  "total": 3,
  "matches": [
    { "source": "Neon", "date": "<ISO>", "tech": "John Smith", "category": "Plumbing", "status": "Complete", "notes": "..." }
  ]
}
```

---

### Dashboard

#### GET `/api/dashboard/live-status`

Staff-facing proxy for `/api/field/live`. Adds Google OAuth session gate and calls the internal route server-side (key never reaches browser).

#### GET `/api/dashboard/compliance-status`

Staff-facing proxy for `/api/field/compliance`. Same auth pattern as above.

---

### Techs

#### GET `/api/techs`

Returns all active employees with `role = 'tech'`, including skill flags.

**Response:**
```json
{
  "success": true,
  "techs": [
    {
      "techId": "1234",
      "badge": "1234",
      "techName": "John Smith",
      "phone": "+15105551234",
      "rank": "Senior",
      "role": "tech",
      "active": true,
      "status": "unassigned",
      "skills": {
        "Carpentry": true,
        "Plumbing": true,
        "Electrical": false,
        "Finish Carpentry": false,
        "Structural": false,
        "Landscaping": false,
        "Janitorial": false
      }
    }
  ]
}
```

---

### Schedule

#### GET `/api/schedule/today`

Returns today's scheduled (non-archived, non-complete) jobs grouped by tech name and a separate `unassigned` array.

**Response:**
```json
{
  "success": true,
  "source": "neon",
  "date": "2026-06-13",
  "byTech": {
    "John Smith": [ { "jobId": "APT-12345", ... } ]
  },
  "unassigned": []
}
```

---

#### POST `/api/schedule/lock-and-send`

Locks the schedule for a date by stamping `dispatchSentAt` on all assigned jobs, then fires `N8N_LOCK_SEND_WEBHOOK_URL` with the full schedule payload. Idempotent — returns `409` if any job for that date already has `dispatchSentAt` set.

**Request:**
```json
{ "date": "2026-06-13" }
```

**Response:**
```json
{ "success": true, "techCount": 4, "jobCount": 12 }
```

**Error (already dispatched):** `409`

---

### Comms

#### GET `/api/comms/[jobId]`

Fetches the email thread for a job. Strategy:
1. Query `comms_messages` in Neon by `jobId`
2. If no rows and job has a `gmailMsgId`, falls back to the Dashboard API (GAS) to fetch the Gmail thread, then caches results to Neon

Response shape is identical regardless of source. `source` field indicates `'neon'` or `'gmail'`.

**Response:**
```json
{
  "success": true,
  "source": "neon",
  "messages": [
    {
      "from": "Jane Doe <jane@lapham.com>",
      "fromEmail": "jane@lapham.com",
      "toEmail": "workorder@aptmaintenanceinc.com",
      "text": "The faucet is still dripping...",
      "timestamp": "2026-06-10T15:00:00.000Z",
      "isOutbound": false,
      "stakeholder": "REQUESTER",
      "attachments": []
    }
  ]
}
```

---

#### POST `/api/comms/[jobId]`

Sends a reply email via Resend from `noreply@aptmaintenanceinc.com`, with `Reply-To: workorder@aptmaintenanceinc.com`. Writes the outbound message to Neon.

Supported stakeholders: `REQUESTER`, `TENANT`. `TECH` and `SMS` channel are not yet supported (returns `422`).

**Request:**
```json
{ "replyBody": "We have scheduled a tech...", "stakeholder": "TENANT", "channel": "email" }
```

**Response:**
```json
{ "success": true }
```

---

#### PATCH `/api/comms/[jobId]`

Marks all unread inbound tenant messages for the job as read (sets `readAt`).

**Response:**
```json
{ "success": true }
```

---

#### GET `/api/comms/unread`

Returns a map of `jobId → unreadCount` for all inbound tenant messages that have not been read.

**Response:**
```json
{ "success": true, "counts": { "APT-12345": 2, "APT-67890": 1 } }
```

---

#### POST `/api/comms/inbound`

Internal endpoint called by n8n to store an inbound email message. Inserts with `onConflictDoNothing` on `messageId`.

**Auth:** `x-api-key` header (value: `DASHBOARD_API_KEY`)

**Request:**
```json
{
  "jobId": "APT-12345",
  "messageId": "gmail-msg-id",
  "threadId": "gmail-thread-id",
  "fromEmail": "tenant@example.com",
  "toEmail": "workorder@aptmaintenanceinc.com",
  "subject": "Re: Maintenance",
  "bodyPreview": "Thank you...",
  "fullBody": "Thank you for the update...",
  "sentAt": "2026-06-13T10:00:00Z"
}
```

---

### Job Comments

#### GET `/api/job-comments/[jobId]`

Returns all comments for a job, ordered by creation time ascending. Supports sandbox mode.

**Response:**
```json
{
  "success": true,
  "source": "neon",
  "comments": [
    {
      "id": "1",
      "leadId": "APT-12345",
      "author": "Dispatcher Name",
      "role": "dispatch",
      "body": "Called tenant — confirmed access.",
      "timestamp": "<ISO>"
    }
  ]
}
```

---

#### POST `/api/job-comments/[jobId]`

Adds a comment. Author is derived from the Google OAuth session (`staffName` or `user.name`).

**Request:**
```json
{ "body": "Called tenant — confirmed access.", "role": "dispatch" }
```

**Response:**
```json
{ "success": true, "comment": { "id": "2", ... } }
```

---

### Notifications

#### GET `/api/notifications`

Returns actionable dashboard notifications. Current types:
- `STALE_JOB` (warning) — jobs in `PTE Required` status for 3+ days
- `TIMECARD_PENDING` (info) — time records with no supervisor approval

**Response:**
```json
{
  "success": true,
  "source": "neon",
  "notifications": [
    {
      "id": "stale-APT-12345",
      "type": "STALE_JOB",
      "severity": "warning",
      "title": "Stale PTE Job: APT-12345",
      "body": "123 Main St has been in PTE Required for 3+ days.",
      "timestamp": "<ISO>",
      "href": "/live?tab=pte"
    }
  ],
  "unreadCount": 1
}
```

---

### Push Notifications

#### POST `/api/push/subscribe`

Forwards the web-push subscription object to the Dashboard API (GAS) for storage against the tech's record.

**Request:**
```json
{ "token": "<field-tech-session-token>", "subscription": { "endpoint": "...", "keys": { ... } } }
```

---

#### POST `/api/push/send`

Sends a web push notification to a single subscription object using VAPID credentials.

**Request:**
```json
{
  "subscription": { "endpoint": "...", "keys": { "p256dh": "...", "auth": "..." } },
  "payload": { "title": "New Job Assigned", "body": "...", "url": "/jobs" }
}
```

**Response:**
```json
{ "ok": true }
```

---

### Admin

#### POST `/api/admin/archive-stale`

Archives all jobs older than 21 days that are not already `archived` or `complete`.

**Response:**
```json
{ "success": true, "archived": 7 }
```

---

### Cron

#### GET `/api/cron/sync-gmail-history`

Polls the Gmail History API from the last stored `historyId`. For each new message:
1. Skips messages from `workorder@aptmaintenanceinc.com`
2. Resolves `jobId` via thread ID in `comms_messages`, or falls back to `jobs.gmailMsgId` lookup
3. Inserts as `inbound` / `TENANT` with `onConflictDoNothing`
4. Updates `historyId` in `gmail_sync_state`

First-run behavior: initializes `historyId` from current Gmail state without processing any messages.

**Auth:** `Authorization: Bearer <CRON_SECRET>`

**Response:**
```json
{ "success": true, "processed": 3, "skipped": 1, "historyId": "1234567" }
```

---

### Webhooks

#### POST `/api/webhooks/n8n/gmail`

Entry point for n8n email intake. Accepts raw email components, parses them with **Gemini 1.5 Flash**, matches against the `properties` table by address key, and inserts a new job into Neon with status `Needs Review`.

**Auth:** `Authorization: Bearer <DASHBOARD_API_KEY>`

**Request:**
```json
{
  "subject": "Work Order - 123 Main St Unit 2",
  "bodyText": "Hi, the faucet in unit 2 is leaking...",
  "gmailMsgId": "gmail-message-id"
}
```

**Response (AI success):**
```json
{ "success": true, "job": { "jobId": "APT-12345", "address": "123 Main St", ... } }
```

**Fallback behavior:** If Gemini parsing fails, a fallback job is inserted with `address: 'Needs Manual Triage'` and the raw email body in `description`. The response still returns `success: true` with `note: 'Fallback used due to AI error'`.

---

### GAS Proxy

#### POST `/api/gas`

Transparent proxy to the Google Apps Script Dashboard API. Appends `apiKey` to the forwarded payload. Used for GAS actions still pending migration. Do not add new features here.

**Request:** Any JSON payload with an `action` field (GAS action string).

---

#### POST `/api/gas/validate-token`

Called exclusively by Google Apps Script to verify a field tech session token. Returns the tech object on success.

**Auth:** `x-gas-internal-key: <GAS_INTERNAL_SECRET>`

**Request:**
```json
{ "token": "<64-char hex>" }
```

**Response:**
```json
{
  "success": true,
  "tech": {
    "badge": "1234",
    "name": "John Smith",
    "role": "tech",
    "hourlyRate": 25.00,
    "employeeId": 42
  }
}
```

---

### Properties

#### GET `/api/properties`

Returns active properties with RM contact info and access codes.

**Auth:** `DASHBOARD_API_KEY` header (header name is `DASHBOARD_API_KEY`, not `x-api-key`)

**Response:**
```json
{
  "properties": [
    {
      "id": 1,
      "address": "123 Main St",
      "addressKey": "123 main st-2b-oakland",
      "rmName": "Jane RM",
      "rmEmail": "jane@lapham.com",
      "accessInfo": "lockbox code: 1234"
    }
  ]
}
```

---

### Intake

#### POST `/api/intake/access-sync`

Merges inbound access codes from an email/WO into the property's existing `accessInfo` without overwriting. Called by n8n after job creation. Only writes if the inbound text contains genuinely new codes.

**Auth:** `DASHBOARD_API_KEY` header

**Request:**
```json
{ "addressKey": "123 main st-2b-oakland", "inboundAccessInfo": "gate code: 9999", "orgId": "APT-CA" }
```

**Response (codes merged):**
```json
{ "updated": true, "merged": "lockbox code: 1234; gate code: 9999", "newCodes": ["gate code: 9999"] }
```

**Response (no new codes):**
```json
{ "updated": false, "reason": "no_new_codes" }
```

Possible `reason` values: `no_new_codes`, `property_not_found`, `no_inbound_codes`.

---

### Utility

#### GET `/api/weather`

Fetches current temperature via open-meteo and reverse-geocodes the city via BigDataCloud. Cached for 5 minutes (`next: { revalidate: 300 }`). Defaults to Oakland area coordinates if none provided.

**Query params:** `?lat=37.83&lon=-122.28` (both optional)

**Response:**
```json
{ "current": { "temperature_2m": 68.2 }, "city": "Oakland" }
```

---

#### GET `/api/health`

Runs `SELECT 1` against Neon. Returns `200` with `status: 'ok'` on success, `500` with `status: 'error'` on failure.

**Response:**
```json
{ "status": "ok", "db": "ok", "timestamp": "<ISO>" }
```

---

## Error Codes

| Code | HTTP | Meaning |
|------|------|---------|
| `INVALID_TOKEN` | 401 | Token missing, expired, or not found (field tech auth) |
| `INVALID_CREDENTIALS` | 401 | Wrong badge or PIN |
| `JOB_NOT_FOUND` | 404 | jobId does not exist |
| `MISSING_BODY` | 400 | Required request body field absent |
| `not_supported` | 422 | Channel or stakeholder not yet implemented (comms reply) |
| — | 409 | Schedule already dispatched for the requested date |
| — | 429 | Login rate limit exceeded |
| — | 502 | Upstream dependency (GAS, Dashboard API) returned an error |

---

## Environment Variables (API-relevant)

| Variable | Used by |
|----------|---------|
| `DASHBOARD_API_KEY` | Dual-auth routes, internal proxies, n8n webhook |
| `GAS_INTERNAL_SECRET` | `/api/gas/validate-token` |
| `CRON_SECRET` | `/api/cron/sync-gmail-history` |
| `DASHBOARD_API_URL` | GAS proxy, comms Gmail fallback |
| `RESEND_API_KEY` | Outbound email via Resend |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Gemini parsing in n8n webhook |
| `GMAIL_WATCH_EMAIL` | Gmail history sync cron |
| `VAPID_EMAIL`, `NEXT_PUBLIC_VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY` | Web push notifications |
| `N8N_COMPLIANCE_WEBHOOK_URL` | Attestation sign webhook |
| `N8N_LOCK_SEND_WEBHOOK_URL` | Schedule lock-and-send webhook |

See `docs/guides/configuration.md` for the full environment variable list.
