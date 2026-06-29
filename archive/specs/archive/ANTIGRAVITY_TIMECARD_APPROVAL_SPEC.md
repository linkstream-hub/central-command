# ANTIGRAVITY SPEC — Supervisor Timecard Approval + Employee Attestation
**Author:** Claude Code
**Date:** April 28, 2026
**Legal priority:** HIGHEST — closes two open PAGA exposure items from the Dec 2025 internal audit:
  - "No supervisor timecard approval"
  - "No employee attestations"

**Read every line. Do not freelance. Do not add UI elements not listed here.**

---

## WHAT THIS BUILDS

Two interlocking features that together create a PAGA-defensible timekeeping paper trail:

1. **Employee attestation (Tech PWA):** After every clock-out, a non-skippable modal asks the tech to confirm their time is accurate. One tap. Signed timestamp written to Time Records.

2. **Supervisor approval queue (CC2.0 /hr page):** A "Timecards" tab showing all completed time records for the current week. Supervisors (management/admin roles) can approve or dispute each record. Approval writes supervisor name + timestamp to the record.

The chain: **clock-in → work → clock-out → employee attestation → supervisor approval.** Every link is now auditable.

---

## ARCHITECTURE DECISION (Claude Code)

- Attestation data lives in Time Records (same sheet row, new columns). No new sheet tabs.
- Seven new columns appended to the end of Time Records (cols 25–31, 1-based; indices 24–30, 0-based). **Never change existing column order.**
- New `signAttestation` action in **TechPWA.gs** — called from Tech PWA after clockOut success.
- Three new approval actions in **DashboardAPI.gs**: `getTimecardApprovalQueue`, `approveTimecard`, `disputeTimecard`.
- **Notifications integration**: `getNotificationsDA` gains a `TIMECARD_PENDING` type — surfaces pending approvals to management/admin/compliance roles.
- Supervisor identity is collected at approval time via a required `supervisorName` param (PAGA requires named approver, not just role).

**Do not touch:** Code.js, ScheduleMiner.js, Calendar.js, schedule/page.tsx, JobQueueTable.tsx, live/page.tsx, JobDetailModal.tsx, or any component not listed below.

---

## NEW TIME RECORDS COLUMNS — EXACT SCHEMA

Current last column: `ENTITY_ID` at 0-based index 23 (sheet column X).

**New columns** (Brandon must manually add these 7 header strings to Time Records row 1 after deploying):

| 0-based index | 1-based (sheet col) | Header string | Values |
|---|---|---|---|
| 24 | 25 (Y) | `Attestation` | `Pending` \| `Signed` |
| 25 | 26 (Z) | `Attestation At` | ISO timestamp string |
| 26 | 27 (AA) | `Supervisor Status` | `Pending` \| `Approved` \| `Disputed` |
| 27 | 28 (AB) | `Supervisor ID` | badge# string of approver |
| 28 | 29 (AC) | `Supervisor Name` | name string |
| 29 | 30 (AD) | `Supervisor At` | ISO timestamp string |
| 30 | 31 (AE) | `Dispute Reason` | text (required when Disputed) |

New rows written by `handleClockIn` will now include `Attestation = 'Pending'` and `Supervisor Status = 'Pending'` at write time (see Feature 1 below).

---

## FILES TO TOUCH

1. `TechPWA.gs` — extend `TM_COL`, update `handleClockIn`, add `signAttestation` action, add `ensureTimecardColumns()`
2. `dashboard-api/DashboardAPI.gs` — add `DA_TM` const, three new actions, update `getNotificationsDA`
3. `tech-pwa/src/lib/types.ts` — new `TimeRecord` and `TimecardApprovalEntry` types
4. `tech-pwa/src/lib/dashboard-api.ts` — new API functions: `getTimecardApprovalQueue`, `approveTimecard`, `disputeTimecard`; extend `signAttestation` (calls TechPWA.gs, not DashboardAPI.gs)
5. `tech-pwa/src/app/job/[jobId]/page.tsx` — post-clockout attestation modal
6. `tech-pwa/src/app/hr/page.tsx` — new "Timecards" tab with approval queue UI

---

## FEATURE 1 — TechPWA.gs: Column Map Extension + Clock-In Init

### Extend `TM_COL` (currently ends at `ENTITY_ID: 23`)

Find the existing `TM_COL` declaration and add these 7 entries after `ENTITY_ID: 23`:

```javascript
// existing — do not change
var TM_COL = {
  RECORD_ID:      0,
  JOB_ID:         1,
  TECH_ID:        2,
  TECH_NAME:      3,
  CATEGORY:       4,
  ADDRESS:        5,
  UNIT:           6,
  CLOCK_IN:       7,
  CLOCK_OUT:      8,
  BREAK_START:    9,
  BREAK_END:      10,
  BREAK_MINUTES:  11,
  ACTUAL_HOURS:   12,
  EST_HOURS:      13,
  STATUS:         14,
  NOTES:          15,
  RECEIPT_IDS:    16,
  MEAL_WARNING:   17,
  DATE:           18,
  LAT_IN:         19,
  LNG_IN:         20,
  LAT_OUT:        21,
  LNG_OUT:        22,
  ENTITY_ID:      23,
  // ── NEW ── attestation + supervisor approval
  ATTESTATION:        24,
  ATTESTATION_AT:     25,
  SUPERVISOR_STATUS:  26,
  SUPERVISOR_ID:      27,
  SUPERVISOR_NAME:    28,
  SUPERVISOR_AT:      29,
  DISPUTE_REASON:     30
};
```

### Update `handleClockIn` — write initial values for new columns

In `handleClockIn`, find the line that appends the new row to the Time Records sheet (`tmSheet.appendRow([...])`).

The current appendRow call writes 24 values (indices 0–23). Extend it to 31 values by appending 7 more at the end:

```javascript
// After the existing 24 values (RECORD_ID through ENTITY_ID), append:
'Pending',  // ATTESTATION (24)
'',         // ATTESTATION_AT (25)
'Pending',  // SUPERVISOR_STATUS (26)
'',         // SUPERVISOR_ID (27)
'',         // SUPERVISOR_NAME (28)
'',         // SUPERVISOR_AT (29)
''          // DISPUTE_REASON (30)
```

The appendRow call must remain a single array. Do not split it into multiple calls.

### Add `signAttestation` action handler

Add to the `doPost` action dispatcher (alongside the other `if (action === ...)` lines):

```javascript
if (action === 'signAttestation') return jsonResponse(handleSignAttestation(body, tech));
```

Then add the function:

```javascript
function handleSignAttestation(body, tech) {
  var recordId = String(body.recordId || '').trim();
  if (!recordId) return { success: false, error: 'RECORD_ID_REQUIRED' };

  var ss      = SpreadsheetApp.getActiveSpreadsheet();
  var tmSheet = ss.getSheetByName(PWA_SHEETS.TIME_RECORDS);
  var data    = tmSheet.getDataRange().getValues();

  for (var r = 1; r < data.length; r++) {
    if (String(data[r][TM_COL.RECORD_ID]) !== recordId) continue;

    // Verify this tech owns the record
    if (String(data[r][TM_COL.TECH_ID]) !== tech.badge) {
      return { success: false, error: 'FORBIDDEN' };
    }

    // Only sign if clock-out exists and attestation is still Pending
    var clockOut     = data[r][TM_COL.CLOCK_OUT];
    var attestation  = String(data[r][TM_COL.ATTESTATION] || '').trim();
    if (!clockOut)              return { success: false, error: 'NOT_CLOCKED_OUT' };
    if (attestation === 'Signed') return { success: true, alreadySigned: true };

    var now = new Date().toISOString();
    tmSheet.getRange(r + 1, TM_COL.ATTESTATION    + 1).setValue('Signed');
    tmSheet.getRange(r + 1, TM_COL.ATTESTATION_AT + 1).setValue(now);

    return { success: true, signedAt: now };
  }

  return { success: false, error: 'RECORD_NOT_FOUND' };
}
```

### Add `ensureTimecardColumns()` utility

Add this utility function after `handleSignAttestation`. Brandon calls it once from the Apps Script IDE after deploying to add the 7 new headers if they're missing.

```javascript
function ensureTimecardColumns() {
  var ss      = SpreadsheetApp.getActiveSpreadsheet();
  var tmSheet = ss.getSheetByName(PWA_SHEETS.TIME_RECORDS);
  var headers = tmSheet.getRange(1, 1, 1, tmSheet.getLastColumn()).getValues()[0];

  var newHeaders = [
    { col: TM_COL.ATTESTATION       + 1, name: 'Attestation' },
    { col: TM_COL.ATTESTATION_AT    + 1, name: 'Attestation At' },
    { col: TM_COL.SUPERVISOR_STATUS + 1, name: 'Supervisor Status' },
    { col: TM_COL.SUPERVISOR_ID     + 1, name: 'Supervisor ID' },
    { col: TM_COL.SUPERVISOR_NAME   + 1, name: 'Supervisor Name' },
    { col: TM_COL.SUPERVISOR_AT     + 1, name: 'Supervisor At' },
    { col: TM_COL.DISPUTE_REASON    + 1, name: 'Dispute Reason' }
  ];

  newHeaders.forEach(function(h) {
    if (!headers[h.col - 1]) {
      tmSheet.getRange(1, h.col).setValue(h.name);
    }
  });

  Logger.log('ensureTimecardColumns: done. Run from GAS IDE once after deploy.');
}
```

---

## FEATURE 2 — DashboardAPI.gs: Three New Actions

### Add `DA_TM` column map

Add this constant block immediately after the existing `DA_TR` declaration (around line 92):

```javascript
// Time Records — 0-based column indices (mirrors TM_COL in TechPWA.gs)
var DA_TM = {
  RECORD_ID:          0,
  JOB_ID:             1,
  TECH_ID:            2,
  TECH_NAME:          3,
  CATEGORY:           4,
  ADDRESS:            5,
  UNIT:               6,
  CLOCK_IN:           7,
  CLOCK_OUT:          8,
  BREAK_START:        9,
  BREAK_END:          10,
  BREAK_MINUTES:      11,
  ACTUAL_HOURS:       12,
  EST_HOURS:          13,
  STATUS:             14,
  NOTES:              15,
  RECEIPT_IDS:        16,
  MEAL_WARNING:       17,
  DATE:               18,
  LAT_IN:             19,
  LNG_IN:             20,
  LAT_OUT:            21,
  LNG_OUT:            22,
  ENTITY_ID:          23,
  ATTESTATION:        24,
  ATTESTATION_AT:     25,
  SUPERVISOR_STATUS:  26,
  SUPERVISOR_ID:      27,
  SUPERVISOR_NAME:    28,
  SUPERVISOR_AT:      29,
  DISPUTE_REASON:     30
};
```

### Add action dispatch entries

In `doPost`, add these three lines alongside the other `if (action === ...)` entries:

```javascript
if (action === 'getTimecardApprovalQueue') return daResponse(getTimecardApprovalQueueDA(body));
if (action === 'approveTimecard')          return daResponse(approveTimecardDA(body));
if (action === 'disputeTimecard')          return daResponse(disputeTimecardDA(body));
```

Place them after the `denyTimeOff` line.

### Add `getTimecardApprovalQueue` function

Returns all completed time records for a given week, grouped by tech, with attestation and supervisor status included. "Completed" means `CLOCK_OUT` is populated.

```javascript
// Returns timecard records for a week. weekStart = 'YYYY-MM-DD' (Monday).
// Omit weekStart to default to the current week's Monday.
// Returns: { success: true, records: TimecardRecord[], pendingCount: number }
function getTimecardApprovalQueueDA(params) {
  try {
    var weekStartParam = String((params && params.weekStart) || '').trim();
    var weekStart, weekEnd;

    if (weekStartParam) {
      weekStart = new Date(weekStartParam + 'T00:00:00');
    } else {
      // Default: current week Monday (Pacific)
      var now     = new Date();
      var pacific = Utilities.formatDate(now, 'America/Los_Angeles', 'yyyy-MM-dd');
      var d       = new Date(pacific + 'T00:00:00');
      var day     = d.getDay(); // 0=Sun
      var diff    = (day === 0) ? -6 : 1 - day;
      weekStart   = new Date(d);
      weekStart.setDate(d.getDate() + diff);
    }
    weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6); // Sunday

    var weekStartStr = Utilities.formatDate(weekStart, 'UTC', 'yyyy-MM-dd');
    var weekEndStr   = Utilities.formatDate(weekEnd,   'UTC', 'yyyy-MM-dd');

    var tmSheet = getTMSheet();
    if (!tmSheet) return { success: false, error: 'SHEET_NOT_FOUND' };

    var data    = tmSheet.getDataRange().getValues();
    var records = [];

    for (var r = 1; r < data.length; r++) {
      var row      = data[r];
      var clockOut = row[DA_TM.CLOCK_OUT];
      if (!clockOut) continue; // must be fully clocked out

      var recDate = String(row[DA_TM.DATE] || '').trim();
      if (recDate < weekStartStr || recDate > weekEndStr) continue;

      var clockInVal  = row[DA_TM.CLOCK_IN];
      var clockOutVal = row[DA_TM.CLOCK_OUT];

      records.push({
        recordId:          String(row[DA_TM.RECORD_ID]         || '').trim(),
        jobId:             String(row[DA_TM.JOB_ID]            || '').trim(),
        techId:            String(row[DA_TM.TECH_ID]           || '').trim(),
        techName:          String(row[DA_TM.TECH_NAME]         || '').trim(),
        category:          String(row[DA_TM.CATEGORY]          || '').trim(),
        address:           String(row[DA_TM.ADDRESS]           || '').trim(),
        date:              recDate,
        clockIn:           clockInVal  ? new Date(clockInVal).toISOString()  : '',
        clockOut:          clockOutVal ? new Date(clockOutVal).toISOString() : '',
        breakMinutes:      parseFloat(row[DA_TM.BREAK_MINUTES]  || 0),
        actualHours:       parseFloat(row[DA_TM.ACTUAL_HOURS]   || 0),
        mealWarning:       Boolean(row[DA_TM.MEAL_WARNING]),
        attestation:       String(row[DA_TM.ATTESTATION]        || 'Pending').trim(),
        attestedAt:        String(row[DA_TM.ATTESTATION_AT]     || '').trim(),
        supervisorStatus:  String(row[DA_TM.SUPERVISOR_STATUS]  || 'Pending').trim(),
        supervisorId:      String(row[DA_TM.SUPERVISOR_ID]      || '').trim(),
        supervisorName:    String(row[DA_TM.SUPERVISOR_NAME]    || '').trim(),
        supervisorAt:      String(row[DA_TM.SUPERVISOR_AT]      || '').trim(),
        disputeReason:     String(row[DA_TM.DISPUTE_REASON]     || '').trim()
      });
    }

    var pendingCount = records.filter(function(rec) {
      return rec.supervisorStatus === 'Pending';
    }).length;

    return {
      success:      true,
      records:      records,
      weekStart:    weekStartStr,
      weekEnd:      weekEndStr,
      pendingCount: pendingCount
    };

  } catch (e) {
    Logger.log('getTimecardApprovalQueueDA error: ' + e.message);
    return { success: false, error: 'SERVER_ERROR', message: e.message };
  }
}
```

### Add `approveTimecardDA` function

```javascript
// Params: { recordId: string, supervisorName: string, supervisorId: string }
// supervisorId = badge# or role-based identifier (e.g. 'brandon' | 'keith' | 'bem' | 'ana')
// supervisorName = display name for audit trail
function approveTimecardDA(body) {
  try {
    var recordId       = String(body.recordId       || '').trim();
    var supervisorName = String(body.supervisorName || '').trim();
    var supervisorId   = String(body.supervisorId   || '').trim();

    if (!recordId)       return { success: false, error: 'RECORD_ID_REQUIRED' };
    if (!supervisorName) return { success: false, error: 'SUPERVISOR_NAME_REQUIRED' };
    if (!supervisorId)   return { success: false, error: 'SUPERVISOR_ID_REQUIRED' };

    var tmSheet = getTMSheet();
    var data    = tmSheet.getDataRange().getValues();

    for (var r = 1; r < data.length; r++) {
      if (String(data[r][DA_TM.RECORD_ID]) !== recordId) continue;

      // Guard: cannot approve if not clocked out
      if (!data[r][DA_TM.CLOCK_OUT]) return { success: false, error: 'NOT_CLOCKED_OUT' };

      var now = new Date().toISOString();
      tmSheet.getRange(r + 1, DA_TM.SUPERVISOR_STATUS + 1).setValue('Approved');
      tmSheet.getRange(r + 1, DA_TM.SUPERVISOR_ID     + 1).setValue(supervisorId);
      tmSheet.getRange(r + 1, DA_TM.SUPERVISOR_NAME   + 1).setValue(supervisorName);
      tmSheet.getRange(r + 1, DA_TM.SUPERVISOR_AT     + 1).setValue(now);
      tmSheet.getRange(r + 1, DA_TM.DISPUTE_REASON    + 1).setValue('');

      return { success: true, approvedAt: now };
    }

    return { success: false, error: 'RECORD_NOT_FOUND' };

  } catch (e) {
    Logger.log('approveTimecardDA error: ' + e.message);
    return { success: false, error: 'SERVER_ERROR', message: e.message };
  }
}
```

### Add `disputeTimecardDA` function

```javascript
// Params: { recordId: string, supervisorName: string, supervisorId: string, reason: string }
// reason is REQUIRED — PAGA paper trail demands a written explanation.
function disputeTimecardDA(body) {
  try {
    var recordId       = String(body.recordId       || '').trim();
    var supervisorName = String(body.supervisorName || '').trim();
    var supervisorId   = String(body.supervisorId   || '').trim();
    var reason         = String(body.reason         || '').trim();

    if (!recordId)       return { success: false, error: 'RECORD_ID_REQUIRED' };
    if (!supervisorName) return { success: false, error: 'SUPERVISOR_NAME_REQUIRED' };
    if (!supervisorId)   return { success: false, error: 'SUPERVISOR_ID_REQUIRED' };
    if (!reason)         return { success: false, error: 'REASON_REQUIRED', message: 'A reason is required to dispute a timecard.' };

    var tmSheet = getTMSheet();
    var data    = tmSheet.getDataRange().getValues();

    for (var r = 1; r < data.length; r++) {
      if (String(data[r][DA_TM.RECORD_ID]) !== recordId) continue;

      var now = new Date().toISOString();
      tmSheet.getRange(r + 1, DA_TM.SUPERVISOR_STATUS + 1).setValue('Disputed');
      tmSheet.getRange(r + 1, DA_TM.SUPERVISOR_ID     + 1).setValue(supervisorId);
      tmSheet.getRange(r + 1, DA_TM.SUPERVISOR_NAME   + 1).setValue(supervisorName);
      tmSheet.getRange(r + 1, DA_TM.SUPERVISOR_AT     + 1).setValue(now);
      tmSheet.getRange(r + 1, DA_TM.DISPUTE_REASON    + 1).setValue(reason);

      return { success: true, disputedAt: now };
    }

    return { success: false, error: 'RECORD_NOT_FOUND' };

  } catch (e) {
    Logger.log('disputeTimecardDA error: ' + e.message);
    return { success: false, error: 'SERVER_ERROR', message: e.message };
  }
}
```

### Update `getNotificationsDA` — add TIMECARD_PENDING

In `getNotificationsDA`, find the comment line `// ── PENDING TIME-OFF REQUESTS ─────` and add a new block **before it**:

```javascript
    // ── PENDING TIMECARD APPROVALS ───────────────────────────────────────
    if (role === 'management' || role === 'admin' || role === 'compliance') {
      try {
        var tcResult = getTimecardApprovalQueueDA({});
        if (tcResult.success && tcResult.pendingCount > 0) {
          notifications.push({
            id:        'tc-pending-' + tcResult.weekStart,
            type:      'TIMECARD_PENDING',
            severity:  tcResult.pendingCount > 5 ? 'urgent' : 'warning',
            title:     tcResult.pendingCount + ' timecard' + (tcResult.pendingCount === 1 ? '' : 's') + ' pending approval',
            body:      'Week of ' + tcResult.weekStart + '. Review in HR → Timecards.',
            timestamp: new Date().toISOString(),
            href:      '/hr?tab=timecards'
          });
        }
      } catch (tcErr) {
        Logger.log('getNotificationsDA TimecardPending error: ' + tcErr.message);
      }
    }
```

The `TIMECARD_PENDING` type must also be added to the JSDoc comment at the top of `getNotificationsDA`:

```javascript
// Types: 'STALE_JOB' | 'COMPLIANCE' | 'TIME_OFF_PENDING' | 'TIMECARD_PENDING'
```

---

## FEATURE 3 — Tech PWA: Post-ClockOut Attestation Modal

### File: `tech-pwa/src/app/job/[jobId]/page.tsx`

**Context:** After a successful `clockOut` API call, the component currently navigates back or updates state. We intercept this and show an attestation modal first.

**State additions** (add to existing state declarations):
```typescript
const [showAttestation, setShowAttestation] = useState(false);
const [attestationRecordId, setAttestationRecordId] = useState<string | null>(null);
const [attestationSigning, setAttestationSigning] = useState(false);
const [attestationDone, setAttestationDone] = useState(false);
```

**After successful clockOut response**, instead of immediately navigating, do:
```typescript
// After: const data = await clockOut(...)
if (data.success) {
  setAttestationRecordId(activeRecordId); // activeRecordId was stored at clock-in
  setShowAttestation(true);
  // Do NOT navigate yet — wait for attestation
}
```

**`signAttestation` API call** (add to `tech-pwa/src/lib/dashboard-api.ts` — see Feature 4):

**Attestation modal JSX** (add at the bottom of the return, before closing `</div>`):

```tsx
{showAttestation && !attestationDone && (
  <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm">
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full max-w-sm mx-4 mb-8 bg-zinc-900 border border-zinc-700 rounded-2xl p-6 shadow-2xl"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-white font-semibold text-base">Confirm Your Time</h3>
          <p className="text-zinc-400 text-sm">Required before you go</p>
        </div>
      </div>

      <p className="text-zinc-300 text-sm leading-relaxed mb-6">
        I confirm that my clock-in, breaks, and clock-out for today are accurate and complete.
      </p>

      <button
        onClick={async () => {
          if (attestationSigning || !attestationRecordId) return;
          setAttestationSigning(true);
          try {
            await signAttestation(attestationRecordId);
          } catch {
            // Best-effort — do not block the tech
          }
          setAttestationDone(true);
          setShowAttestation(false);
          router.push('/jobs');
        }}
        disabled={attestationSigning}
        className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold text-sm transition-colors"
      >
        {attestationSigning ? 'Saving…' : 'I Confirm'}
      </button>

      <p className="text-zinc-600 text-xs text-center mt-3">
        This confirmation is required by APT Maintenance policy.
      </p>
    </motion.div>
  </div>
)}
```

**Important:** The modal is non-dismissible — there is no close button, no backdrop click handler, and no "skip" link. The tech can only proceed by tapping "I Confirm". If the API call fails, `attestationDone` is still set to `true` and navigation proceeds (best-effort — do not block the tech from leaving).

---

## FEATURE 4 — `tech-pwa/src/lib/dashboard-api.ts`: New API Functions

### New type: `TimecardRecord`

Add to the types section (or to `types.ts` — consistent with existing pattern):

```typescript
export interface TimecardRecord {
  recordId:         string;
  jobId:            string;
  techId:           string;
  techName:         string;
  category:         string;
  address:          string;
  date:             string;       // 'YYYY-MM-DD'
  clockIn:          string;       // ISO timestamp
  clockOut:         string;       // ISO timestamp
  breakMinutes:     number;
  actualHours:      number;
  mealWarning:      boolean;
  attestation:      'Pending' | 'Signed';
  attestedAt:       string;
  supervisorStatus: 'Pending' | 'Approved' | 'Disputed';
  supervisorId:     string;
  supervisorName:   string;
  supervisorAt:     string;
  disputeReason:    string;
}

export interface TimecardApprovalQueueResponse {
  success:      boolean;
  records:      TimecardRecord[];
  weekStart:    string;
  weekEnd:      string;
  pendingCount: number;
}
```

### `signAttestation` — calls **TechPWA.gs** (not DashboardAPI.gs)

```typescript
export async function signAttestation(recordId: string): Promise<{ success: boolean }> {
  const token = getAuthToken(); // existing helper that reads stored session token
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ action: 'signAttestation', token, recordId })
  });
  return res.json();
}
```

### `getTimecardApprovalQueue`

```typescript
export async function getTimecardApprovalQueue(
  weekStart?: string
): Promise<TimecardApprovalQueueResponse> {
  return dashboardRequest('getTimecardApprovalQueue', { weekStart: weekStart ?? '' });
}
```

### `approveTimecard`

```typescript
export async function approveTimecard(
  recordId: string,
  supervisorName: string,
  supervisorId: string
): Promise<{ success: boolean; approvedAt?: string; error?: string }> {
  return dashboardRequest('approveTimecard', { recordId, supervisorName, supervisorId });
}
```

### `disputeTimecard`

```typescript
export async function disputeTimecard(
  recordId: string,
  supervisorName: string,
  supervisorId: string,
  reason: string
): Promise<{ success: boolean; disputedAt?: string; error?: string }> {
  return dashboardRequest('disputeTimecard', { recordId, supervisorName, supervisorId, reason });
}
```

---

## FEATURE 5 — CC2.0 `/hr` Page: Timecards Tab

### Overview

The existing `/hr` page has tabs for time-off requests. Add a new **"Timecards"** tab alongside them. The `?tab=timecards` query param activates it (matches the `href` from the notifications bell).

### Role gate

The Timecards tab is visible to: `management`, `admin`, `hr`, `compliance`.
Only `management` and `admin` roles see the Approve and Dispute action buttons. HR and compliance see the data as read-only.

### Tab addition

In the existing tab bar (wherever the HR page renders its current tabs), add:

```tsx
<button
  onClick={() => setActiveTab('timecards')}
  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
    activeTab === 'timecards'
      ? 'bg-zinc-700 text-white'
      : 'text-zinc-400 hover:text-zinc-200'
  }`}
>
  Timecards
  {pendingTimecardCount > 0 && (
    <span className="ml-2 px-1.5 py-0.5 text-xs font-bold rounded-full bg-amber-500 text-black">
      {pendingTimecardCount}
    </span>
  )}
</button>
```

### State for Timecards tab

```typescript
const [activeTab, setActiveTab] = useState<'timeoff' | 'timecards'>(() => {
  // activate from URL param ?tab=timecards
  if (typeof window !== 'undefined') {
    return new URLSearchParams(window.location.search).get('tab') === 'timecards'
      ? 'timecards'
      : 'timeoff';
  }
  return 'timeoff';
});

const [timecards, setTimecards] = useState<TimecardRecord[]>([]);
const [tcLoading, setTcLoading] = useState(false);
const [tcWeekStart, setTcWeekStart] = useState(''); // '' = current week
const [tcPendingCount, setTcPendingCount] = useState(0);
const [tcError, setTcError] = useState<string | null>(null);

// Supervisor identity — required for approve/dispute actions
const [supervisorName, setSupervisorName] = useState('');
const [supervisorId, setSupervisorId]     = useState('');

// Dispute modal
const [disputingRecord, setDisputingRecord] = useState<TimecardRecord | null>(null);
const [disputeReason, setDisputeReason]     = useState('');
const [actionLoading, setActionLoading]     = useState<string | null>(null); // recordId currently actioning
```

### Data load

```typescript
async function loadTimecards() {
  setTcLoading(true);
  setTcError(null);
  try {
    const res = await getTimecardApprovalQueue(tcWeekStart || undefined);
    if (res.success) {
      setTimecards(res.records);
      setTcPendingCount(res.pendingCount);
    } else {
      setTcError('Failed to load timecards.');
    }
  } catch {
    setTcError('Network error loading timecards.');
  } finally {
    setTcLoading(false);
  }
}

useEffect(() => {
  if (activeTab === 'timecards') loadTimecards();
}, [activeTab, tcWeekStart]);
```

### Supervisor identity guard

Before any approve/dispute action fires, check that `supervisorName` is set. If not, surface a toast error: "Select your name before approving."

Show a supervisor picker at the top of the Timecards panel:

```tsx
<div className="flex items-center gap-3 mb-6 p-4 bg-zinc-800/50 rounded-xl border border-zinc-700">
  <span className="text-zinc-400 text-sm whitespace-nowrap">Approving as:</span>
  <select
    value={supervisorName}
    onChange={(e) => {
      const val = e.target.value;
      setSupervisorName(val);
      setSupervisorId(val.toLowerCase().replace(/\s+/g, '_'));
    }}
    className="flex-1 bg-zinc-900 border border-zinc-600 text-white text-sm rounded-lg px-3 py-2"
  >
    <option value="">— Select your name —</option>
    <option value="Brandon Bittner">Brandon Bittner</option>
    <option value="Keith Berry">Keith Berry</option>
    <option value="Bemenet Petros">Bemenet Petros</option>
    <option value="Ana">Ana</option>
  </select>
</div>
```

Only show this picker for `management` and `admin` roles. HR/compliance skip it (read-only).

### Timecards table

Render records in a table grouped by tech name (sort: tech name ASC, then date ASC within each tech).

Each row:
```tsx
<tr key={rec.recordId} className="border-b border-zinc-800">
  <td className="py-3 px-4 text-sm text-white">{rec.techName}</td>
  <td className="py-3 px-4 text-sm text-zinc-300">{rec.date}</td>
  <td className="py-3 px-4 text-sm text-zinc-300">{rec.category}</td>
  <td className="py-3 px-4 text-sm text-zinc-400 font-mono text-xs">
    {formatTime(rec.clockIn)} → {formatTime(rec.clockOut)}
  </td>
  <td className="py-3 px-4 text-sm text-zinc-300">{rec.actualHours.toFixed(2)}h</td>
  <td className="py-3 px-4">
    <AttestationBadge status={rec.attestation} />
  </td>
  <td className="py-3 px-4">
    <SupervisorStatusBadge status={rec.supervisorStatus} />
  </td>
  {canApprove && (
    <td className="py-3 px-4">
      {rec.supervisorStatus === 'Pending' && (
        <div className="flex gap-2">
          <button
            onClick={() => handleApprove(rec.recordId)}
            disabled={actionLoading === rec.recordId}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors disabled:opacity-50"
          >
            Approve
          </button>
          <button
            onClick={() => setDisputingRecord(rec)}
            disabled={actionLoading === rec.recordId}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-600 hover:bg-amber-500 text-white transition-colors disabled:opacity-50"
          >
            Dispute
          </button>
        </div>
      )}
      {rec.supervisorStatus === 'Approved' && (
        <span className="text-xs text-zinc-500">by {rec.supervisorName}</span>
      )}
      {rec.supervisorStatus === 'Disputed' && (
        <span className="text-xs text-red-400">Disputed: {rec.disputeReason}</span>
      )}
    </td>
  )}
</tr>
```

#### `AttestationBadge` component (inline, no new file):
```tsx
function AttestationBadge({ status }: { status: string }) {
  if (status === 'Signed') {
    return <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400">Attested</span>;
  }
  return <span className="px-2 py-1 rounded-full text-xs font-medium bg-zinc-700 text-zinc-400">Pending</span>;
}
```

#### `SupervisorStatusBadge` component (inline, no new file):
```tsx
function SupervisorStatusBadge({ status }: { status: string }) {
  if (status === 'Approved') {
    return <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400">Approved</span>;
  }
  if (status === 'Disputed') {
    return <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400">Disputed</span>;
  }
  return <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400">Pending</span>;
}
```

#### `formatTime` helper (inline):
```typescript
function formatTime(iso: string): string {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'America/Los_Angeles' });
}
```

#### `handleApprove` action:
```typescript
async function handleApprove(recordId: string) {
  if (!supervisorName) { showToast('Select your name before approving.', 'error'); return; }
  setActionLoading(recordId);
  try {
    const res = await approveTimecard(recordId, supervisorName, supervisorId);
    if (res.success) {
      showToast('Timecard approved.', 'success');
      await loadTimecards();
    } else {
      showToast(res.error || 'Failed to approve.', 'error');
    }
  } finally {
    setActionLoading(null);
  }
}
```

#### `handleDispute` (from dispute modal submit):
```typescript
async function handleDispute() {
  if (!supervisorName)  { showToast('Select your name before disputing.', 'error'); return; }
  if (!disputeReason.trim()) { showToast('A reason is required.', 'error'); return; }
  if (!disputingRecord) return;
  setActionLoading(disputingRecord.recordId);
  try {
    const res = await disputeTimecard(disputingRecord.recordId, supervisorName, supervisorId, disputeReason.trim());
    if (res.success) {
      showToast('Timecard marked as disputed.', 'success');
      setDisputingRecord(null);
      setDisputeReason('');
      await loadTimecards();
    } else {
      showToast(res.error || 'Failed to dispute.', 'error');
    }
  } finally {
    setActionLoading(null);
  }
}
```

### Dispute modal

```tsx
{disputingRecord && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl p-6 shadow-2xl"
    >
      <h3 className="text-white font-semibold text-base mb-1">Dispute Timecard</h3>
      <p className="text-zinc-400 text-sm mb-4">
        {disputingRecord.techName} — {disputingRecord.date}
        {' '}({disputingRecord.actualHours.toFixed(2)}h)
      </p>

      <label className="block text-zinc-400 text-sm mb-2">Reason (required for PAGA record)</label>
      <textarea
        value={disputeReason}
        onChange={(e) => setDisputeReason(e.target.value)}
        rows={3}
        placeholder="Describe the discrepancy or issue with this timecard…"
        className="w-full bg-zinc-800 border border-zinc-600 text-white text-sm rounded-lg px-3 py-2 resize-none focus:outline-none focus:border-zinc-400 mb-4"
      />

      <div className="flex gap-3">
        <button
          onClick={() => { setDisputingRecord(null); setDisputeReason(''); }}
          className="flex-1 py-2.5 rounded-xl border border-zinc-600 text-zinc-300 text-sm hover:bg-zinc-800 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleDispute}
          disabled={!disputeReason.trim() || actionLoading === disputingRecord.recordId}
          className="flex-1 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white text-sm font-semibold transition-colors"
        >
          {actionLoading === disputingRecord.recordId ? 'Saving…' : 'Submit Dispute'}
        </button>
      </div>
    </motion.div>
  </div>
)}
```

### Skeleton loader for Timecards tab

While `tcLoading` is true, show 5 skeleton rows:

```tsx
{tcLoading && Array.from({ length: 5 }).map((_, i) => (
  <div key={i} className="h-12 bg-zinc-800 animate-pulse rounded-lg mb-2" />
))}
```

---

## VERIFICATION STEPS

Verify each item in a browser before marking the sprint complete.

**TechPWA.gs:**
- [ ] `tsc --noEmit` in tech-pwa passes with 0 errors
- [ ] Clock in to a job → clock out → attestation modal appears immediately, no navigation away
- [ ] Tapping "I Confirm" calls `signAttestation`, modal closes, navigates to /jobs
- [ ] In Time Records sheet: row for the test session has `Attestation = 'Signed'`, `Attestation At` populated
- [ ] New rows appended by clock-in have `Attestation = 'Pending'`, `Supervisor Status = 'Pending'` in cols 25–31

**DashboardAPI.gs:**
- [ ] `getTimecardApprovalQueue` returns current week's clocked-out records
- [ ] `approveTimecard` without supervisorName returns `{ error: 'SUPERVISOR_NAME_REQUIRED' }`
- [ ] `disputeTimecard` without reason returns `{ error: 'REASON_REQUIRED' }`
- [ ] After approve: Time Records row has `Supervisor Status = 'Approved'`, supervisor name/timestamp populated
- [ ] After dispute: Time Records row has `Supervisor Status = 'Disputed'`, `Dispute Reason` populated
- [ ] Notifications bell shows TIMECARD_PENDING notification when pendingCount > 0 (management/admin/compliance roles)
- [ ] Notification href = `/hr?tab=timecards`

**CC2.0 /hr page:**
- [ ] "Timecards" tab appears for management, admin, hr, compliance roles
- [ ] `?tab=timecards` URL param activates the tab on load (notification bell link works)
- [ ] Timecard records load with correct clock-in/out times (Pacific timezone)
- [ ] Attestation badge shows "Attested" (emerald) or "Pending" (gray)
- [ ] Supervisor status badge shows "Approved" (emerald) / "Disputed" (red) / "Pending" (amber)
- [ ] Approving without selecting supervisor name shows toast error
- [ ] Approve action updates row in-place (via `loadTimecards()` reload, no full page refresh)
- [ ] Dispute modal requires non-empty reason field before Submit is enabled
- [ ] Dispute action updates row correctly
- [ ] HR and compliance roles: Approve/Dispute buttons do NOT appear (read-only view)
- [ ] Dark mode: no light-mode bleed on any new elements
- [ ] Framer Motion on attestation modal (bottom-sheet enter) and dispute modal (scale enter)

---

## BRANDON ACTIONS (after deploy)

1. **Run `ensureTimecardColumns()`** from the TechPWA.gs Apps Script IDE (open TechPWA.gs → Run → ensureTimecardColumns). This adds the 7 new header strings to Time Records row 1. Verify headers appear in cols Y–AE.

2. **Deploy both scripts:**
   - Root: `clasp push --force && clasp deploy --deploymentId AKfycbySG8tbAaXyIRFXnq7x-Fp5Gvs7uG8RmAyBB_wSFcGmScbhI3SHSq2HoznowBcsi3mM9Q --description "v79 — employee attestation + ensureTimecardColumns"`
   - Dashboard: `cd dashboard-api && clasp push --force && clasp deploy --deploymentId AKfycbyum_KLprgPh51GxFiwhsoNHScc4TqIBrzZS0GPfHsnhrc9hAtp03AciyiydhfyJyxCCQ --description "v28 — supervisor timecard approval queue"`

3. **Communicate to supervisors (Keith, Bem, Brandon):** At end of each week (Friday EOD target), open CC2.0 → HR → Timecards, select your name, review the week's records, and approve or dispute each.

---

*Spec authored by Claude Code. Do not deviate from column indices, action names, or UI component structure. The seven new Time Records columns are append-only — never reorder existing columns.*
