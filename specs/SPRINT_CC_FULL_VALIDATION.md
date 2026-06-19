# SPRINT: CC Full System Validation
# Branch: feat/go-live-validation
# Status: READY FOR EXECUTION
# Author: Claude Code — Session 106

---

## Goal

Validate ALL current CC capabilities end-to-end against the Vercel Preview environment before any real users touch the system. Tech PWA flows are already validated (9/9 PASS). This sprint validates the dispatch-side workflows: WO lifecycle, tech assignment, scheduling, modification, and communications.

**Output:** `artifacts/cc_full_validation.txt` — PASS/FAIL per capability.  
**Failures** are documented and flagged — not fixed inline.

---

## Known Regression — Document, Remediation Sprint Required

**"See original email" bug — Phase 3 regression (found 2026-05-28):**  
The old comms route fetched Gmail threads directly via the Gmail API using `jobs.gmailMsgId`. Phase 3 migrated the route to read from the `comms_messages` Neon table (delta sync, forward-only). Historical threads were never backfilled. Every existing job now shows an empty comms panel — the original email IS retrievable via `gmailMsgId`, the route just doesn't use it anymore.

**Fix (remediation sprint):** When `comms_messages` is empty for a jobId, fall back to fetching the Gmail thread using `jobs.gmailMsgId` via `gmail-client`. Same pattern as the old system. This is not a data loss — the emails are still in Gmail, `gmailMsgId` is still on the job record. The fallback path just needs to be restored.

**Document in cc_full_validation.txt as REGRESSION — Manual Flow M4.**

---

## Prerequisites — Brandon must complete before AG runs

### PREREQ-1: Add env vars to tech-pwa Vercel project (Preview environment)

Brandon: Vercel → `tech-pwa` → Settings → Environment Variables → add:

| Variable | Environment | Source |
|---|---|---|
| `DASHBOARD_API_KEY` | Production + Preview + Development | Vercel → `central-command` project → copy value |
| `RESEND_API_KEY` | Production + Preview | Resend dashboard → API Keys |

After adding, redeploy:
```powershell
cd A:\PTOW\1_APT_Central_Command\tech-pwa
npx vercel deploy --scope aptmaintenanceincs-projects
```

Record the new Preview URL: `______`

### PREREQ-2: Confirm DashboardAPI.gs is deployed and live

The DashboardAPI endpoint is:
`https://script.google.com/macros/s/AKfycbyum_KLprgPh51GxFiwhsoNHScc4TqIBrzZS0GPfHsnhrc9hAtp03AciyiydhfyJyxCCQ/exec`

AG tests: `GET <DASHBOARD_API_URL>?action=ping&apiKey=<DASHBOARD_API_KEY>`
Must return a non-error response.

---

## Spec Scope — files AG may create or modify

- `tech-pwa/tests/e2e/cc-full.spec.ts` (CREATE)
- `artifacts/cc_full_validation.txt` (CREATE — overwrites if exists)

**Hard scope constraint:** No other files. No diagnostic scripts. No helper files.

---

## Auth Model — Critical

| Route category | Auth required | How to pass |
|---|---|---|
| `/api/jobs/*` (GET/PATCH) | session OR x-api-key | Header: `x-api-key: <DASHBOARD_API_KEY>` |
| `/api/schedule/*` | session OR x-api-key | Same |
| `/api/techs` | session OR x-api-key | Same |
| `/api/field/live` | session OR x-api-key | Same |
| `/api/comms/*` | session ONLY | Google OAuth — cannot automate |
| `/api/notifications` | session OR x-api-key | Header |

**Email automation note:** `PATCH /api/jobs/[jobId]` only triggers Resend email when called via Google OAuth session (not API key). Testing email delivery via API key will show 200 but no email will fire. Email delivery must be verified manually in the dispatch UI (see Manual Verification section).

---

## Automated Test Flows (AG runs via Playwright APIRequestContext)

All requests go to the new Preview URL with:
- Header: `x-api-key: <DASHBOARD_API_KEY>`
- Header: `x-vercel-protection-bypass: VFIPVEs7ri4O3h6PflolB7UtaA3IFC3S`

### Flow A — Job List (Dispatch Queue)
`GET /api/jobs`  
Expect: 200, `success: true`, jobs array (may be empty).  
Record: status, job count, first job's jobId if any.

### Flow B — Single Job Fetch
`GET /api/jobs/TEST-VALIDATION-001`  
Expect: 200, job record with address `123 Validation Test St`.  
Record: status, job fields returned.

### Flow C — Tech List
`GET /api/techs`  
Expect: 200, array including badge T01 (`Test Tech (Validation)`).  
Record: status, tech count.

### Flow D — Today's Schedule
`GET /api/schedule/today`  
Expect: 200, schedule data.  
Record: status, data shape.

### Flow E — Week Schedule  
`GET /api/schedule/week`  
Expect: 200, schedule data.  
Record: status, data shape.

### Flow F — Live Field Status
`GET /api/field/live`  
Expect: 200, field status object.  
Record: status, data shape.

### Flow G — Assign Tech to Job (WO Assignment)
`PATCH /api/jobs/TEST-VALIDATION-001`  
Body: `{ "assignedTech": "T01", "status": "Ready to Schedule" }`  
Expect: 200, `success: true`.  
Record: status, body, any warning field.

### Flow H — Schedule Job (WO Scheduling)
`PATCH /api/jobs/TEST-VALIDATION-001`  
Body: `{ "scheduledDate": "<today LA>", "scheduledTime": "10:00", "status": "Scheduled" }`  
Expect: 200, `success: true`.  
Note: email will NOT fire via API key path (expected — document this).  
Record: status, body.

### Flow I — Modify Assignment (Change Date)
`PATCH /api/jobs/TEST-VALIDATION-001`  
Body: `{ "scheduledDate": "<tomorrow LA>", "scheduledTime": "14:00" }`  
Expect: 200, `success: true`.  
Record: status, body.

### Flow J — Modify Tech Assignment (Change Tech)
`PATCH /api/jobs/TEST-VALIDATION-001`  
Body: `{ "assignedTech": "102" }` (any real badge in the system)  
Then restore: `PATCH` back to `{ "assignedTech": "T01" }`  
Expect: both 200.  
Record: statuses.

### Flow K — Comms Thread Read (session-only)
`GET /api/comms/TEST-VALIDATION-001` (with API key only — no session)  
Expect: 401 (route is session-only).  
Record: status, confirm 401 is correct guard behavior.  
**Note:** This is expected behavior. Comms require dispatcher OAuth session.

### Flow L — Comms Reply (session-only)
`POST /api/comms/TEST-VALIDATION-001` (with API key only)  
Expect: 401.  
Record: status.

### Flow M — Notifications
`GET /api/notifications`  
Expect: 200.  
Record: status, data shape.

### Flow N — Reset Test Job for Tech PWA
After all above flows, restore the test job for the tech PWA to use:  
`PATCH /api/jobs/TEST-VALIDATION-001`  
Body: `{ "assignedTech": "T01", "scheduledDate": "<today LA>", "scheduledTime": "09:00", "status": "Scheduled" }`  
This ensures the tech PWA validation job is still in a testable state.

---

## Manual Verification — Brandon Does This (15 minutes)

After AG completes the automated flows and posts the artifact, Brandon verifies the dispatch UI flows that require Google OAuth.

### Manual Flow 1 — Dispatch Dashboard Login
Navigate to: `https://central-command-9rcnmjkrg-aptmaintenanceincs-projects.vercel.app`  
Log in with Google (`@aptmaintenanceinc.com` account).  
Record: loads without error, job queue visible.

### Manual Flow 2 — View Test Job in Dispatch UI
Find job `TEST-VALIDATION-001` in the dispatch queue.  
Record: visible yes/no, fields correct.

### Manual Flow 3 — Assign + Schedule in UI (triggers email)
In the dispatch UI, assign `T01` + set date to today + set time.  
Save.  
Record: saves without error, status changes to Scheduled.  
**Check email:** did `test-tenant@test.local` receive a notification? (It won't — `.local` domain. Check Resend dashboard → Emails → verify the send was attempted and what address it targeted.)

### Manual Flow 4 — Comms Thread in UI
Open the test job's comms panel.  
Record: loads without error, thread visible (or empty — document what you see).  
Note the "see original email" gap if present.

### Manual Flow 5 — Reply to Tenant via Comms
If the comms panel has a reply box, type a test message and send.  
Record: sends without error, message appears in thread.  
Check Resend dashboard — was the send attempted?

---

## Output Format — artifacts/cc_full_validation.txt

```
CC FULL VALIDATION RESULTS — 2026-05-28
Preview URL: <new URL>
Neon branch: preview/feat/go-live-validation

AUTOMATED FLOWS (AG — API key auth):

Flow | Description                     | Result
-----|----------------------------------|--------
A    | Job List (dispatch queue)        | PASS / FAIL
B    | Single Job Fetch                 | PASS / FAIL
C    | Tech List                        | PASS / FAIL
D    | Today's Schedule                 | PASS / FAIL
E    | Week Schedule                    | PASS / FAIL
F    | Live Field Status                | PASS / FAIL
G    | Assign Tech (WO Assignment)      | PASS / FAIL
H    | Schedule Job (WO Scheduling)     | PASS / FAIL
I    | Modify Date                      | PASS / FAIL
J    | Modify Tech                      | PASS / FAIL
K    | Comms Read (session guard)       | PASS / FAIL
L    | Comms Reply (session guard)      | PASS / FAIL
M    | Notifications                    | PASS / FAIL
N    | Reset Test Job                   | PASS / FAIL

MANUAL FLOWS (Brandon — Google OAuth session):

Flow | Description                     | Result
-----|----------------------------------|--------
M1   | Dispatch Dashboard Login         | PASS / FAIL
M2   | View Test Job in UI              | PASS / FAIL
M3   | Assign + Schedule (email test)   | PASS / FAIL
M4   | Comms Thread View                | PASS / FAIL
M5   | Reply to Tenant                  | PASS / FAIL

KNOWN GAPS (not failures — pre-existing, remediation required):
- Original email body not stored in comms_messages (see "see original email" bug above)
- SMS/tech channel not supported (422 — by design, Phase 4)
- Comms routes require Google OAuth (no API key path — by design)

FAILURES (observed bugs, not gaps):
(list any unexpected failures here)

EVIDENCE:
(HTTP status + body excerpt per automated flow)
```

---

## AG Terminal Tasks

### Task 1 — Verify prerequisites
```powershell
git branch --show-current  # must be feat/go-live-validation
```

### Task 2 — Write cc-full.spec.ts

Use Playwright APIRequestContext for all automated flows A–N. No browser needed for automated flows — pure API calls. Set headers globally:
```typescript
const headers = {
  'x-api-key': process.env.DASHBOARD_API_KEY ?? '',
  'x-vercel-protection-bypass': process.env.VERCEL_BYPASS_SECRET ?? '',
  'Content-Type': 'application/json',
};
```

### Task 3 — Run automated flows
```powershell
cd A:\PTOW\1_APT_Central_Command\tech-pwa
$env:VERCEL_BYPASS_SECRET = "VFIPVEs7ri4O3h6PflolB7UtaA3IFC3S"
$env:DASHBOARD_API_KEY = "<value from .env.local>"
npx playwright test tests/e2e/cc-full.spec.ts --reporter=list
```

### Task 4 — Write artifacts/cc_full_validation.txt (automated sections only)
Fill in all automated flows A–N. Leave manual flows M1–M5 blank — Brandon fills those in.

### Task 5 — Commit and push
```powershell
cd A:\PTOW\1_APT_Central_Command
git add tech-pwa/tests/e2e/cc-full.spec.ts artifacts/cc_full_validation.txt
git commit -m "feat(validation): CC full validation — automated flows"
git push origin feat/go-live-validation
```

Post the full `artifacts/cc_full_validation.txt` content. Stop. Wait.

---

## Execution Order

1. Brandon completes PREREQ-1 (add DASHBOARD_API_KEY + RESEND_API_KEY, redeploy, post new URL)
2. AG runs Tasks 1–5 autonomously → posts artifact
3. Brandon completes Manual Flows M1–M5 → pastes results
4. Claude Code reviews combined results → specs remediation if any failures

---

*Spec complete. History in git log.*
