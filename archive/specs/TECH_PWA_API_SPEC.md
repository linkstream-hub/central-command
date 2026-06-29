# APT Tech PWA — API Specification
# For use with Google Antigravity to build the Tech PWA frontend

---

## Overview

The Tech PWA is a mobile-first React/Next.js Progressive Web App for APT field technicians.
Techs bookmark the URL and add it to their home screen — no app store, no install, no Google account required.

The backend is Google Apps Script, deployed as a standalone web app with a single endpoint (`/exec`).
All requests are routed by an `action` parameter in the request body (POST) or query string (GET).

---

## Base URL

```
https://script.google.com/macros/s/{TECH_PWA_DEPLOYMENT_ID}/exec
```

> Note: This is a SEPARATE Apps Script deployment from the Dispatch Dashboard.
> The deployment ID will be provided once the backend is built.
> For local development, use a mock server that mirrors these response shapes.

---

## Transport & CORS

- All POST requests: `Content-Type: application/json`
- All responses: `Content-Type: application/json`
- CORS headers are set on the Apps Script side — no proxy needed
- Apps Script does not support DELETE or PUT — use POST with an `action` field for all mutations
- GET requests use query parameters

---

## Authentication

### Flow

1. Tech enters **Employee ID** + **PIN** on the login screen
2. PWA POSTs to `action: login`
3. Apps Script validates against the Employees sheet, returns a session token
4. PWA stores `{ token, techId, techName, role, expiresAt }` in **localStorage**
5. Every subsequent request includes the token in the request body or query string
6. Token expires after **30 days** — tech is prompted to re-login
7. If any request returns `{ success: false, error: 'INVALID_TOKEN' }` — redirect to login screen

### Token format
UUID v4 string, e.g. `"a1b2c3d4-e5f6-7890-abcd-ef1234567890"`

---

## Error Response Shape (all endpoints)

```json
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Human-readable description"
}
```

**Error codes:**
| Code | Meaning |
|------|---------|
| `INVALID_TOKEN` | Token missing, expired, or not found — redirect to login |
| `INVALID_CREDENTIALS` | Wrong Employee ID or PIN |
| `JOB_NOT_FOUND` | jobId does not exist or not assigned to this tech |
| `ALREADY_CLOCKED_IN` | Tech has an active clock-in on another job |
| `NOT_CLOCKED_IN` | Clock-out attempted with no active record |
| `ALREADY_ON_BREAK` | Break start attempted while already on break |
| `NOT_ON_BREAK` | Break end attempted with no active break |
| `JOB_ALREADY_COMPLETE` | Action attempted on a completed job |
| `UPLOAD_FAILED` | Photo upload to Drive failed |
| `SERVER_ERROR` | Unhandled Apps Script exception |

---

## Data Models

### Job
```typescript
interface Job {
  jobId: string;              // Dispatch Queue row identifier (Lead ID, Col 2)
  priority: '1-URGENT' | '2-TURNOVER' | '3-PTE-PENDING' | '4-STANDARD';
  serviceCategory: string;   // e.g. "Plumbing", "Electrical", "Painting"
  address: string;
  unit: string;
  description: string;
  scheduledDate: string;     // ISO date: "2026-04-17"
  scheduledTime: string;     // "HH:MM" 24h, e.g. "09:00" — empty string if not set
  estimatedHours: number;    // 0 if not set
  status: string;            // "Scheduled" | "In Progress" | "Complete"
  rmName: string;
  accessInfo: string;        // lockbox codes, gate codes, key info
  tenantName: string;
  tenantPhone: string;
  clockedInAt: string | null;  // ISO timestamp if this tech is clocked in
  activeRecordId: string | null;
}
```

### TimeRecord
```typescript
interface TimeRecord {
  recordId: string;
  jobId: string;
  techId: string;
  clockInTime: string;         // ISO timestamp
  clockOutTime: string | null;
  breakStart: string | null;
  breakEnd: string | null;
  breakDurationMinutes: number;
  actualHoursWorked: number | null;  // calculated on clockOut
  status: 'active' | 'on-break' | 'complete';
}
```

### TechSession (stored in localStorage)
```typescript
interface TechSession {
  token: string;
  techId: string;
  techName: string;
  role: 'tech' | 'admin';
  expiresAt: string;  // ISO timestamp
}
```

---

## Endpoints

---

### POST — login

Validates Employee ID + PIN, returns a session token.

**Request:**
```json
{
  "action": "login",
  "employeeId": "E001",
  "pin": "1234"
}
```

**Response (success):**
```json
{
  "success": true,
  "token": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "techId": "E001",
  "techName": "Carlos Rivera",
  "role": "tech",
  "expiresAt": "2026-05-17T08:00:00.000Z"
}
```

**Response (failure):**
```json
{
  "success": false,
  "error": "INVALID_CREDENTIALS",
  "message": "Employee ID or PIN is incorrect."
}
```

---

### GET — getTechJobs

Returns today's scheduled jobs assigned to the authenticated tech.

**Query params:**
```
?action=getTechJobs&token=TOKEN&date=2026-04-17
```
- `date` is optional — defaults to today (Pacific time) if omitted

**Response:**
```json
{
  "success": true,
  "techName": "Carlos Rivera",
  "date": "2026-04-17",
  "jobs": [
    {
      "jobId": "APT-20260417-001",
      "priority": "4-STANDARD",
      "serviceCategory": "Plumbing",
      "address": "1234 Oak Street",
      "unit": "204",
      "description": "Leaking faucet in bathroom, tenant reports dripping constantly",
      "scheduledDate": "2026-04-17",
      "scheduledTime": "09:00",
      "estimatedHours": 2,
      "status": "Scheduled",
      "rmName": "Maria Lopez",
      "accessInfo": "Lockbox code: 4521. Gate: press 'call' then #44.",
      "tenantName": "James Chen",
      "tenantPhone": "415-555-0192",
      "clockedInAt": null,
      "activeRecordId": null
    }
  ]
}
```

---

### GET — getTechStatus

Returns the tech's current clock status — useful on app load to restore UI state if they are mid-job.

**Query params:**
```
?action=getTechStatus&token=TOKEN
```

**Response (clocked in):**
```json
{
  "success": true,
  "status": "active",
  "activeRecord": {
    "recordId": "TR-20260417-001",
    "jobId": "APT-20260417-001",
    "clockInTime": "2026-04-17T09:05:00.000Z",
    "breakStart": null,
    "breakEnd": null,
    "breakDurationMinutes": 0,
    "status": "active"
  },
  "job": { /* full Job object */ }
}
```

**Response (not clocked in):**
```json
{
  "success": true,
  "status": "idle",
  "activeRecord": null,
  "job": null
}
```

---

### POST — clockIn

Starts a time record for the tech on a job. Tech must not already have an active clock-in.

**Request:**
```json
{
  "action": "clockIn",
  "token": "TOKEN",
  "jobId": "APT-20260417-001"
}
```

**Response:**
```json
{
  "success": true,
  "recordId": "TR-20260417-001",
  "clockInTime": "2026-04-17T09:05:00.000Z",
  "jobStatus": "In Progress"
}
```

---

### POST — clockOut

Closes the active time record. Calculates actual hours worked minus breaks.

**Request:**
```json
{
  "action": "clockOut",
  "token": "TOKEN",
  "jobId": "APT-20260417-001",
  "recordId": "TR-20260417-001"
}
```

**Response:**
```json
{
  "success": true,
  "clockOutTime": "2026-04-17T11:20:00.000Z",
  "breakDurationMinutes": 0,
  "actualHoursWorked": 2.25,
  "mealBreakWarning": false,
  "message": null
}
```

> `mealBreakWarning: true` if shift exceeded 5 hours with no break logged.
> Display a warning to the tech when this is true — do not block clockOut.

---

### POST — startBreak

Logs the start of a break on the active time record.

**Request:**
```json
{
  "action": "startBreak",
  "token": "TOKEN",
  "recordId": "TR-20260417-001"
}
```

**Response:**
```json
{
  "success": true,
  "breakStart": "2026-04-17T11:00:00.000Z"
}
```

---

### POST — endBreak

Logs the end of the break, accumulates break duration.

**Request:**
```json
{
  "action": "endBreak",
  "token": "TOKEN",
  "recordId": "TR-20260417-001"
}
```

**Response:**
```json
{
  "success": true,
  "breakEnd": "2026-04-17T11:30:00.000Z",
  "breakDurationMinutes": 30
}
```

---

### POST — markComplete

Marks the job complete, finalizes the time record, writes to job performance history.
Tech must be clocked in (but does NOT need to clock out first — markComplete handles it).

**Request:**
```json
{
  "action": "markComplete",
  "token": "TOKEN",
  "jobId": "APT-20260417-001",
  "recordId": "TR-20260417-001",
  "notes": "Replaced washer and O-ring. All clear."
}
```

**Response:**
```json
{
  "success": true,
  "completionTime": "2026-04-17T11:20:00.000Z",
  "actualHoursWorked": 2.25,
  "estimatedHours": 2.0,
  "mealBreakWarning": false
}
```

---

### POST — uploadReceipt

Uploads a photo (base64) to Google Drive, links it to the job.
Max file size: 5MB. Accepted formats: JPEG, PNG.

**Request:**
```json
{
  "action": "uploadReceipt",
  "token": "TOKEN",
  "jobId": "APT-20260417-001",
  "photoBase64": "data:image/jpeg;base64,/9j/4AAQ...",
  "fileName": "receipt_20260417_0905.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "driveFileId": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs",
  "driveFileUrl": "https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view"
}
```

---

## PWA Screens & UI Requirements

### Screen 1 — Login
- Employee ID field (numeric keyboard)
- PIN field (numeric, masked, 4-6 digits)
- "Sign In" button
- APT logo, clean dark theme matching the dispatch dashboard
- No "forgot PIN" link needed for MVP — Brandon resets manually

### Screen 2 — Today's Jobs (Home)
- Header: Tech name + today's date
- Job cards sorted by: Urgent first, then scheduled time
- Each card shows: address, unit, service category, scheduled time, status chip
- Tap card → Job Detail screen
- Pull-to-refresh
- If no jobs: "No jobs scheduled for today"
- Offline indicator if no network

### Screen 3 — Job Detail
- Full job info: address, unit, description, access info, tenant contact
- **Action bar** at bottom — state machine:
  - `Scheduled` → **Clock In** button (green)
  - `In Progress, not on break` → **Start Break** + **Clock Out** + **Mark Complete** buttons
  - `In Progress, on break` → **End Break** button only
  - `Complete` → read-only, shows actual hours
- Tap tenant phone → native phone dialer
- "Upload Receipt" button (opens camera / photo picker)
- Back arrow → Today's Jobs

### Screen 4 — Receipt Upload
- Camera capture or photo library picker
- Preview before submitting
- "Upload" button
- Success confirmation with Drive link
- Multiple receipts per job allowed

### Screen 5 — Job History (optional for MVP)
- List of past completed jobs for this tech
- Shows date, address, category, actual hours
- Useful for tech reference — not required for launch

---

## CA Break Compliance Warnings

Display these warnings in the UI — do not block the action, just inform the tech:

| Condition | Warning |
|-----------|---------|
| Working > 4h 30m with no break logged | "Reminder: You're due for a 10-minute rest break." |
| Working > 5h with no break logged | "Meal break required: CA law requires a 30-min unpaid meal break for shifts over 5 hours." |
| Working > 9h 30m with no second meal break | "Second meal break required for shifts over 10 hours." |

These are frontend timer-based checks — calculate from `clockInTime` minus break duration.

---

## Offline Behavior

1. On app load (online): fetch and cache today's jobs in `localStorage`
2. If network lost mid-shift: clock events are queued in localStorage with timestamps
3. On reconnect: flush queued events to the server in order
4. Show persistent offline banner when network is unavailable
5. Never block a clock action because of network loss — always queue locally first

---

## Mock API for Local Development

Until the Apps Script backend is ready, implement a mock server (Next.js API routes or MSW) with these responses:

**Mock employees:**
```json
[
  { "employeeId": "E001", "pin": "1234", "name": "Carlos Rivera", "role": "tech" },
  { "employeeId": "E002", "pin": "5678", "name": "Marcus Johnson", "role": "tech" }
]
```

**Mock jobs:**
```json
[
  {
    "jobId": "APT-20260417-001",
    "priority": "4-STANDARD",
    "serviceCategory": "Plumbing",
    "address": "1234 Oak Street",
    "unit": "204",
    "description": "Leaking faucet in bathroom",
    "scheduledDate": "2026-04-17",
    "scheduledTime": "09:00",
    "estimatedHours": 2,
    "status": "Scheduled",
    "rmName": "Maria Lopez",
    "accessInfo": "Lockbox code: 4521",
    "tenantName": "James Chen",
    "tenantPhone": "415-555-0192",
    "clockedInAt": null,
    "activeRecordId": null
  },
  {
    "jobId": "APT-20260417-002",
    "priority": "1-URGENT",
    "serviceCategory": "Electrical",
    "address": "892 Pine Avenue",
    "unit": "",
    "description": "No power to kitchen outlets, circuit breaker tripping",
    "scheduledDate": "2026-04-17",
    "scheduledTime": "11:00",
    "estimatedHours": 3,
    "status": "Scheduled",
    "rmName": "David Park",
    "accessInfo": "Key with manager in unit 101",
    "tenantName": "Sofia Hernandez",
    "tenantPhone": "415-555-0847",
    "clockedInAt": null,
    "activeRecordId": null
  }
]
```

---

## New Google Sheets Tabs Required (backend will create these)

### Time Records
Stores every clock event. One row per job per tech per day.

| Col | Field |
|-----|-------|
| 1 | Record ID |
| 2 | Job ID |
| 3 | Tech Employee ID |
| 4 | Tech Name |
| 5 | Service Category |
| 6 | Property Address |
| 7 | Unit |
| 8 | Clock In Time |
| 9 | Clock Out Time |
| 10 | Break Start |
| 11 | Break End |
| 12 | Break Duration (minutes) |
| 13 | Actual Hours Worked |
| 14 | Estimated Hours |
| 15 | Status (active / on-break / complete) |
| 16 | Notes |
| 17 | Receipt Drive File IDs (comma-separated) |
| 18 | Meal Break Warning Triggered (true/false) |
| 19 | Date |

### Job Performance History
Aggregated record per completed job — feeds SuggestTechs scoring over time.

| Col | Field |
|-----|-------|
| 1 | Job ID |
| 2 | Tech Employee ID |
| 3 | Tech Name |
| 4 | Service Category |
| 5 | Property Address |
| 6 | Scheduled Date |
| 7 | Completion Date |
| 8 | Estimated Hours |
| 9 | Actual Hours |
| 10 | Variance (Actual - Estimated) |
| 11 | Has Receipt |

---

## Employees Sheet — New Columns Required

The existing Tech Roster sheet will need these columns added (or a new Employees sheet created):

| Field | Notes |
|-------|-------|
| Employee ID | Unique identifier, e.g. "E001" |
| PIN Hash | SHA-256 of PIN — never store plain text |
| Session Token | Current active token UUID |
| Token Expiry | ISO timestamp |
| Role | "tech" or "admin" |
| Active | TRUE/FALSE — deactivated techs cannot log in |

---

## Deployment

- Framework: **Next.js** (App Router)
- Styling: Tailwind CSS
- PWA: `next-pwa` or `@ducanh2912/next-pwa` for service worker
- Hosting: **Vercel** (free tier) — connect to GitHub repo, auto-deploys on push
- Environment variable: `NEXT_PUBLIC_API_URL` = Apps Script exec URL

---

*Last updated: 2026-04-17*
*Backend counterpart: TechPWA.gs (to be built in Apps Script)*
