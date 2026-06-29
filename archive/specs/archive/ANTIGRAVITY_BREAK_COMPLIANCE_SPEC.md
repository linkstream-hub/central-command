# ANTIGRAVITY SPRINT — CA Break Compliance + TOM Phase 2
**Author:** Claude Code
**Date:** April 26, 2026
**Theme:** Close the two biggest open compliance gaps — CA wage/hour break enforcement (PAGA exposure) and Google Calendar blocking for approved leave. Both feed the schedule grid's OUT cells and the compliance defense record.

**Files touched:**
- `TechPWA.gs` — add `fireComplianceWebhook()` helper + calls in all clock handlers
- `dashboard-api/DashboardAPI.gs` — `getComplianceAlerts` action + `approveTimeOff` Calendar integration
- `dashboard-api/appsscript.json` — enable Calendar advanced service
- `tech-pwa/src/app/live/page.tsx` — fetch compliance alerts alongside live field status
- `tech-pwa/src/components/dashboard/TechAvailabilityPanel.tsx` — compliance badge on tech cards
- `n8n/workflows/ca_break_compliance.json` — NEW: n8n workflow JSON (Brandon imports into Railway n8n)

**Do not touch:** Code.js, ScheduleMiner.js, Calendar.js, schedule/page.tsx, JobQueueTable.tsx, JobDetailModal.tsx, or any component not listed above.

---

## ARCHITECTURE DECISION (Claude Code)

**Pattern:** TechPWA.gs → n8n (Railway) → ComplianceAlerts sheet → DashboardAPI.gs → CC2.0 /live

1. TechPWA.gs fires a fire-and-forget POST webhook to n8n on every clock event
2. n8n evaluates CA break rules against that tech's Time Records for the day
3. n8n writes any violations to a new "ComplianceAlerts" tab in APT Lead Intake Master
4. DashboardAPI.gs reads ComplianceAlerts and exposes them via `getComplianceAlerts`
5. CC2.0 /live page fetches and shows a compliance badge on affected tech availability cards

**Why n8n for rule evaluation, not Flowise:** CA break rules are deterministic arithmetic (time thresholds and durations), not AI reasoning. n8n JavaScript function nodes handle this cleanly without LLM overhead. Flowise is reserved for AI-enhanced features in future sprints.

**Why webhook, not polling:** Clock events are the natural compliance trigger. Webhooks fire in real-time. n8n Railway is already live at https://n8n-production-4f36b.up.railway.app — no added infrastructure needed.

---

## FEATURE 1 — TOM Phase 2: Google Calendar Blocking on Leave Approval

### What it does
When Ana approves a time-off request in the CC2.0 HR page, `approveTimeOff` creates a blocking event on the APT HR calendar covering the full date range. When a request is denied or cancelled after approval, the calendar event is deleted.

### Prerequisite (Brandon action — before deploying this sprint)
In DashboardAPI.gs Apps Script project (dashboard-api/), go to:
**Project Settings → Script Properties → Add property:**
- Key: `APT_HR_CALENDAR_ID`
- Value: The Google Calendar ID for the APT team/HR calendar (visible in Google Calendar settings for that calendar, format: `xxxxxxxx@group.calendar.google.com`)

### `dashboard-api/appsscript.json` — enable Calendar API

Add to `dependencies.enabledAdvancedServices`:
```json
{
  "userSymbol": "Calendar",
  "serviceId": "calendar",
  "version": "v3"
}
```

Full updated dependencies block:
```json
"dependencies": {
  "enabledAdvancedServices": [
    {
      "userSymbol": "Calendar",
      "serviceId": "calendar",
      "version": "v3"
    }
  ]
}
```

### `dashboard-api/DashboardAPI.gs` — `approveTimeOff` handler

Find the existing `approveTimeOff` handler (action `=== 'approveTimeOff'`). After writing Approved status to TOM sheet, add:

```javascript
// Calendar blocking on approval
function blockCalendarForLeave(empName, startDate, endDate, requestId) {
  try {
    var calId = PropertiesService.getScriptProperties().getProperty('APT_HR_CALENDAR_ID');
    if (!calId) return null;

    var start = new Date(startDate + 'T00:00:00');
    var end   = new Date(endDate   + 'T00:00:00');
    end.setDate(end.getDate() + 1); // all-day event end is exclusive

    var event = Calendar.Events.insert({
      summary: 'TIME OFF — ' + empName,
      start:   { date: startDate },
      end:     { date: Utilities.formatDate(end, 'America/Los_Angeles', 'yyyy-MM-dd') },
      description: 'Approved leave. Request ID: ' + requestId,
      colorId: '4' // flamingo — visible but not alarming
    }, calId);

    return event.id;
  } catch(e) {
    Logger.log('blockCalendarForLeave error: ' + e.message);
    return null;
  }
}
```

In the `approveTimeOff` handler, after writing Approved to TOM sheet:
```javascript
var calEventId = blockCalendarForLeave(empName, startDate, endDate, requestId);
if (calEventId) {
  // Write calendar event ID back to TOM sheet row (col 12 — the last col, or a new col if needed)
  // Find the row by requestId and write calEventId to a "Cal Event ID" column
  // TOM TimeOffRequests columns end at col 11 (0-indexed). Add col 12 for Cal Event ID.
  torSheet.getRange(rowIndex + 2, 13).setValue(calEventId); // col 13 = index 12 = new
}
```

### `dashboard-api/DashboardAPI.gs` — `denyTimeOff` handler

Find the existing `denyTimeOff` handler. Add calendar event deletion:

```javascript
function deleteCalendarLeaveBlock(calEventId) {
  try {
    var calId = PropertiesService.getScriptProperties().getProperty('APT_HR_CALENDAR_ID');
    if (!calId || !calEventId) return;
    Calendar.Events.remove(calId, calEventId);
  } catch(e) {
    Logger.log('deleteCalendarLeaveBlock error: ' + e.message);
  }
}
```

In `denyTimeOff` handler, read col 13 (calEventId) for the row before writing Denied, then call `deleteCalendarLeaveBlock(calEventId)`.

---

## FEATURE 2 — CA Break Compliance Foundation

### Part A: TechPWA.gs — Compliance Webhook

Add this helper to TechPWA.gs (near the top of the file, after constants):

```javascript
function fireComplianceWebhook(techName, employeeId, eventType, jobId, shiftDate) {
  try {
    var webhookUrl = PropertiesService.getScriptProperties().getProperty('N8N_COMPLIANCE_WEBHOOK_URL');
    if (!webhookUrl) return; // silently skip if not configured

    var payload = JSON.stringify({
      techName:   techName,
      employeeId: employeeId,
      eventType:  eventType,  // clockIn | clockOut | startBreak | endBreak | markComplete
      timestamp:  new Date().toISOString(),
      jobId:      jobId || '',
      shiftDate:  shiftDate || Utilities.formatDate(new Date(), 'America/Los_Angeles', 'yyyy-MM-dd')
    });

    UrlFetchApp.fetch(webhookUrl, {
      method:  'post',
      contentType: 'application/json',
      payload: payload,
      muteHttpExceptions: true  // never throw — clock events must not fail due to webhook
    });
  } catch(e) {
    Logger.log('fireComplianceWebhook silenced: ' + e.message);
    // intentionally swallowed — webhook failure must never break clock events
  }
}
```

**Add `fireComplianceWebhook(...)` call to each clock handler after the sheet write succeeds:**

In `handleClockIn`:
```javascript
fireComplianceWebhook(techName, employeeId, 'clockIn', jobId, shiftDate);
```

In `handleClockOut`:
```javascript
fireComplianceWebhook(techName, employeeId, 'clockOut', jobId, shiftDate);
```

In `handleStartBreak`:
```javascript
fireComplianceWebhook(techName, employeeId, 'startBreak', jobId, shiftDate);
```

In `handleEndBreak`:
```javascript
fireComplianceWebhook(techName, employeeId, 'endBreak', jobId, shiftDate);
```

In `handleMarkComplete`:
```javascript
fireComplianceWebhook(techName, employeeId, 'markComplete', jobId, shiftDate);
```

Use the actual variable names for `techName`, `employeeId`, `jobId`, and `shiftDate` as they appear in each handler — do not rename them.

**Prerequisite (Brandon action):** After deploying TechPWA.gs, set Script Property in TechPWA.gs project:
- Key: `N8N_COMPLIANCE_WEBHOOK_URL`
- Value: The n8n webhook URL (created when the n8n workflow is imported and activated — see Part E)

### Part B: ComplianceAlerts Sheet Setup

Add this utility to `dashboard-api/DashboardAPI.gs`:

```javascript
function ensureComplianceAlertsSheet() {
  var ss    = SpreadsheetApp.openById(DA_SPREADSHEET_ID);
  var sheet = ss.getSheetByName('ComplianceAlerts');
  if (!sheet) {
    sheet = ss.insertSheet('ComplianceAlerts');
    sheet.getRange(1, 1, 1, 10).setValues([[
      'Alert ID', 'Employee Name', 'Employee ID', 'Violation Type',
      'Shift Date', 'Total Hours', 'Premium Amount', 'Status', 'Created At', 'Resolved At'
    ]]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}
```

Violation types: `REST_BREAK_DUE` | `MEAL_BREAK_DUE` | `MEAL_PREMIUM` | `SECOND_MEAL_DUE` | `SECOND_MEAL_PREMIUM`
Status values: `Active` | `Resolved` | `Dismissed`

### Part C: DashboardAPI.gs — `getComplianceAlerts` action

Add to the `doPost` action switch:

```javascript
case 'getComplianceAlerts':
  result = getComplianceAlertsDA();
  break;
```

Add the handler:

```javascript
function getComplianceAlertsDA() {
  try {
    var ss    = SpreadsheetApp.openById(DA_SPREADSHEET_ID);
    var sheet = ss.getSheetByName('ComplianceAlerts');
    if (!sheet || sheet.getLastRow() < 2) {
      return { success: true, alerts: [] };
    }

    var today     = Utilities.formatDate(new Date(), 'America/Los_Angeles', 'yyyy-MM-dd');
    var yesterday = Utilities.formatDate(new Date(Date.now() - 86400000), 'America/Los_Angeles', 'yyyy-MM-dd');
    var rows      = sheet.getDataRange().getValues().slice(1);
    var alerts    = [];

    rows.forEach(function(row) {
      var status    = String(row[7] || '').trim();
      var shiftDate = String(row[4] || '').trim().slice(0, 10);
      if (status !== 'Active') return;
      if (shiftDate < yesterday) return; // only show today + yesterday

      alerts.push({
        alertId:       String(row[0] || ''),
        employeeName:  String(row[1] || ''),
        employeeId:    String(row[2] || ''),
        violationType: String(row[3] || ''),
        shiftDate:     shiftDate,
        totalHours:    Number(row[5]) || 0,
        premiumAmount: Number(row[6]) || 0,
        status:        status,
        createdAt:     String(row[8] || '')
      });
    });

    return { success: true, alerts: alerts };
  } catch(e) {
    Logger.log('getComplianceAlertsDA error: ' + e.message);
    return { success: false, error: e.message, alerts: [] };
  }
}
```

### Part D: `dashboard-api.ts` — add type + fetch

Add to `tech-pwa/src/lib/dashboard-api.ts`:

```typescript
export interface ComplianceAlert {
  alertId: string;
  employeeName: string;
  employeeId: string;
  violationType: 'REST_BREAK_DUE' | 'MEAL_BREAK_DUE' | 'MEAL_PREMIUM' | 'SECOND_MEAL_DUE' | 'SECOND_MEAL_PREMIUM';
  shiftDate: string;
  totalHours: number;
  premiumAmount: number;
  status: 'Active' | 'Resolved' | 'Dismissed';
  createdAt: string;
}
```

### Part E: n8n Workflow — `n8n/workflows/ca_break_compliance.json`

Create file `n8n/workflows/ca_break_compliance.json`. This is a complete n8n workflow export that Brandon imports into the Railway n8n instance. The workflow must implement the following logic exactly.

**Workflow name:** `CA Break Compliance Monitor`

**Nodes (in order):**

**Node 1 — Webhook Trigger**
- Type: `n8n-nodes-base.webhook`
- HTTP Method: POST
- Path: `ca-compliance`
- Response: `Immediately` (don't wait for processing)
- The full webhook URL will be: `https://n8n-production-4f36b.up.railway.app/webhook/ca-compliance`
  - This is what goes in TechPWA.gs Script Property `N8N_COMPLIANCE_WEBHOOK_URL`

**Node 2 — Read Time Records**
- Type: `n8n-nodes-base.googleSheets`
- Operation: `getAll`
- Spreadsheet ID: `1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4` (APT Lead Intake Master)
- Sheet Name: `Time Records`
- Filters: Return all rows where Employee ID column matches `{{ $json.body.employeeId }}` AND the date portion of Clock In matches `{{ $json.body.shiftDate }}`

**Node 3 — Calculate Shift State**
- Type: `n8n-nodes-base.function`
- JavaScript:

```javascript
// CA Break Rule Thresholds
const REST_BREAK_THRESHOLD_MINUTES  = 240; // 4 hours
const MEAL_BREAK_THRESHOLD_MINUTES  = 300; // 5 hours
const SECOND_MEAL_THRESHOLD_MINUTES = 600; // 10 hours
const MEAL_BREAK_MIN_DURATION       = 30;  // minutes for a compliant meal break

const records  = items; // rows from Time Records sheet
const body     = $node["Webhook"].json.body;
const eventType = body.eventType;
const now      = new Date(body.timestamp);

// Build timeline of events from Time Records rows
// Time Records key columns (match TechPWA.gs TR_COL constants):
// Read existing column headers from first row to map dynamically
// Expected columns include: Clock In, Clock Out, Break Start, Break End
// Parse times from the rows and sort chronologically

let clockInTime   = null;
let clockOutTime  = null;
let breaks        = []; // [{start, end, duration}]

for (const item of records) {
  const row = item.json;
  // Parse clock-in — use whichever column name TechPWA.gs writes
  if (row['Clock In'] && !clockInTime) {
    clockInTime = new Date(row['Clock In']);
  }
  if (row['Clock Out']) {
    clockOutTime = new Date(row['Clock Out']);
  }
  if (row['Break Start'] && row['Break End']) {
    const bStart = new Date(row['Break Start']);
    const bEnd   = new Date(row['Break End']);
    breaks.push({
      start:    bStart,
      end:      bEnd,
      duration: (bEnd - bStart) / 60000 // minutes
    });
  }
}

// If no clock-in found, we can't evaluate
if (!clockInTime) {
  return [{ json: { violations: [], premiums: [], canEvaluate: false } }];
}

const endTime             = clockOutTime || now;
const totalWorkedMs       = (endTime - clockInTime) - breaks.reduce((sum, b) => sum + (b.end - b.start), 0);
const totalWorkedMinutes  = totalWorkedMs / 60000;

// Find compliant meal breaks (>= 30 min)
const mealBreaks          = breaks.filter(b => b.duration >= MEAL_BREAK_MIN_DURATION);
const hasMealBreak        = mealBreaks.length >= 1;
const hasSecondMealBreak  = mealBreaks.length >= 2;

// Time since last break end (or since clock-in if no breaks)
const lastBreakEnd        = breaks.length > 0
  ? Math.max(...breaks.map(b => b.end.getTime()))
  : clockInTime.getTime();
const minutesSinceBreak   = (endTime.getTime() - lastBreakEnd) / 60000;

const violations = [];
const premiums   = [];

// Rule 1: REST_BREAK_DUE — 4h+ worked with no break in last 4h (warning, not violation)
if (totalWorkedMinutes >= REST_BREAK_THRESHOLD_MINUTES && minutesSinceBreak >= REST_BREAK_THRESHOLD_MINUTES) {
  violations.push({ type: 'REST_BREAK_DUE', totalHours: +(totalWorkedMinutes / 60).toFixed(2), premiumAmount: 0 });
}

// Rule 2: MEAL_BREAK_DUE — 5h+ worked without compliant meal break (warning)
if (totalWorkedMinutes >= MEAL_BREAK_THRESHOLD_MINUTES && !hasMealBreak) {
  violations.push({ type: 'MEAL_BREAK_DUE', totalHours: +(totalWorkedMinutes / 60).toFixed(2), premiumAmount: 0 });
}

// Rule 3: MEAL_PREMIUM — clocked out with 5h+ worked and no meal break (1h premium)
if (eventType === 'clockOut' && totalWorkedMinutes >= MEAL_BREAK_THRESHOLD_MINUTES && !hasMealBreak) {
  premiums.push({ type: 'MEAL_PREMIUM', totalHours: +(totalWorkedMinutes / 60).toFixed(2), premiumAmount: 1 }); // 1h at regular rate — payroll team calculates dollar amount
}

// Rule 4: SECOND_MEAL_DUE — 10h+ worked without second meal
if (totalWorkedMinutes >= SECOND_MEAL_THRESHOLD_MINUTES && !hasSecondMealBreak) {
  violations.push({ type: 'SECOND_MEAL_DUE', totalHours: +(totalWorkedMinutes / 60).toFixed(2), premiumAmount: 0 });
}

// Rule 5: SECOND_MEAL_PREMIUM — clocked out with 10h+ and no second meal
if (eventType === 'clockOut' && totalWorkedMinutes >= SECOND_MEAL_THRESHOLD_MINUTES && !hasSecondMealBreak) {
  premiums.push({ type: 'SECOND_MEAL_PREMIUM', totalHours: +(totalWorkedMinutes / 60).toFixed(2), premiumAmount: 1 });
}

return [{ json: {
  violations: [...violations, ...premiums],
  canEvaluate: true,
  techName: body.techName,
  employeeId: body.employeeId,
  shiftDate: body.shiftDate,
  totalWorkedMinutes,
  hasMealBreak,
  hasSecondMealBreak
}}];
```

**Node 4 — IF: Any Violations?**
- Type: `n8n-nodes-base.if`
- Condition: `{{ $json.violations.length > 0 }}` is `true`

**Node 5 (true branch) — Write to ComplianceAlerts Sheet**
- Type: `n8n-nodes-base.googleSheets`
- Operation: `append`
- Spreadsheet ID: `1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4`
- Sheet Name: `ComplianceAlerts`
- For each violation in `{{ $json.violations }}`, write one row:
  - Alert ID: `{{ 'CA-' + $now.toFormat('yyyyMMdd-HHmmss') + '-' + $json.employeeId }}`
  - Employee Name: `{{ $json.techName }}`
  - Employee ID: `{{ $json.employeeId }}`
  - Violation Type: `{{ $currentItem.type }}`
  - Shift Date: `{{ $json.shiftDate }}`
  - Total Hours: `{{ $currentItem.totalHours }}`
  - Premium Amount: `{{ $currentItem.premiumAmount }}`
  - Status: `Active`
  - Created At: `{{ $now.toISO() }}`
  - Resolved At: (empty)

**Node 6 (true branch, after write) — Respond OK**
- Type: `n8n-nodes-base.respondToWebhook`
- Response: `{ "received": true, "violations": {{ $json.violations.length }} }`

**Node 7 (false branch) — Respond OK (no violations)**
- Type: `n8n-nodes-base.respondToWebhook`
- Response: `{ "received": true, "violations": 0 }`

### Part F: CC2.0 — Compliance Badge on Tech Availability Cards

#### `tech-pwa/src/app/live/page.tsx`

Add state:
```typescript
const [complianceAlerts, setComplianceAlerts] = useState<ComplianceAlert[]>([]);
```

Import `ComplianceAlert` from `dashboard-api.ts`.

In `loadLiveData()`, fetch compliance alerts in parallel with live field status:
```typescript
const [fieldRes, complianceRes] = await Promise.all([
  dashboardRequest('getLiveFieldStatus', {}),
  dashboardRequest('getComplianceAlerts', {})
]);
if (fieldRes.success) setTechStatuses(fieldRes.techs ?? []);
if (complianceRes.success) setComplianceAlerts(complianceRes.alerts ?? []);
```

Pass to `TechAvailabilityPanel`:
```tsx
<TechAvailabilityPanel
  techStatuses={techStatuses}
  complianceAlerts={complianceAlerts}   // ADD
  // ... existing props unchanged
/>
```

#### `tech-pwa/src/components/dashboard/TechAvailabilityPanel.tsx`

Add to props interface:
```typescript
interface TechAvailabilityPanelProps {
  // ... existing props ...
  complianceAlerts?: ComplianceAlert[];
}
```

In the tech card render, before the tech name:
```typescript
const techAlerts = complianceAlerts?.filter(a => a.employeeName === tech.techName) ?? [];
const hasPremium = techAlerts.some(a => a.violationType.includes('PREMIUM'));
```

Add badge to tech card (after the status indicator, before the name):
```tsx
{techAlerts.length > 0 && (
  <div
    title={techAlerts.map(a => a.violationType.replace(/_/g, ' ')).join(', ')}
    className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider ${
      hasPremium
        ? 'bg-red-500/20 border border-red-500/30 text-red-400'
        : 'bg-amber-500/20 border border-amber-500/30 text-amber-400'
    }`}
  >
    <AlertTriangle size={8} className="shrink-0" />
    {hasPremium ? 'PREMIUM' : 'BREAK'}
  </div>
)}
```

Import `AlertTriangle` from `lucide-react` (already imported in most dashboard components).

---

## WHAT TO KEEP UNCHANGED

- All existing clock event logic in TechPWA.gs — only add the webhook call after existing writes succeed
- All existing DnD logic in SchedulingDispatch.tsx
- All existing tab/filter/sort logic in JobQueueTable.tsx
- All existing modal phases in JobDetailModal.tsx
- Code.js, ScheduleMiner.js, Calendar.js — do not touch
- schedule/page.tsx — do not touch

---

## DEPLOYMENT ORDER

1. **Antigravity ships code** (TechPWA.gs, DashboardAPI.gs, dashboard-api.ts, live/page.tsx, TechAvailabilityPanel.tsx, n8n/workflows/ca_break_compliance.json)
2. **Brandon: import n8n workflow** — open Railway n8n at https://n8n-production-4f36b.up.railway.app → Settings → Import → paste `ca_break_compliance.json` → Activate workflow → Copy webhook URL
3. **Brandon: set Script Properties:**
   - In TechPWA.gs project: `N8N_COMPLIANCE_WEBHOOK_URL` = webhook URL from step 2
   - In DashboardAPI.gs project: `APT_HR_CALENDAR_ID` = APT HR calendar ID
4. **Deploy TechPWA.gs:** clasp push + deploy (v75)
5. **Deploy DashboardAPI.gs:** clasp push + deploy (v27 — `"v27 — CA break compliance alerts + TOM calendar blocking"`)
6. **Frontend:** auto-deploys via Vercel on push to main

---

## VERIFICATION

Write results to `AG_DONE.md` with these commands:

```
# 1. Webhook helper in TechPWA.gs
grep -n "fireComplianceWebhook" TechPWA.gs

# 2. getComplianceAlerts action in DashboardAPI.gs
grep -n "getComplianceAlerts" dashboard-api/DashboardAPI.gs

# 3. Calendar blocking in approveTimeOff
grep -n "blockCalendarForLeave\|APT_HR_CALENDAR_ID" dashboard-api/DashboardAPI.gs

# 4. ComplianceAlert type in dashboard-api.ts
grep -n "ComplianceAlert" tech-pwa/src/lib/dashboard-api.ts

# 5. Badge render in TechAvailabilityPanel
grep -n "techAlerts\|PREMIUM\|BREAK" tech-pwa/src/components/dashboard/TechAvailabilityPanel.tsx

# 6. n8n workflow file exists
ls n8n/workflows/ca_break_compliance.json

# 7. TypeScript clean
npx tsc --noEmit  (from tech-pwa/)
```

---

## CA BREAK LAW REFERENCE (for n8n logic validation)

| Rule | Threshold | Type | Consequence |
|-|-|-|-|
| Rest break | Every 4h of work | Warning (no penalty) | Employer encourages break |
| First meal break | Before end of 5th hour | Violation if missed | +1h premium at regular rate |
| Second meal break | Before end of 10th hour | Violation if missed | +1h premium at regular rate |
| Meal break duration | ≥ 30 consecutive minutes, duty-free | Compliant | Short break doesn't count |

Source: CA Labor Code §512, IWC Wage Order 5-2001. PAGA penalties: $100/violation first offense, $200 subsequent. Class exposure on a crew of 28 is material.

---

*Generated: April 26, 2026 | APT Central Command — Session 25*
*Next after this sprint: Internal Communications Phase 1 (Height model — contextual threads on job objects), then Notifications Center (replace broadcast emails with in-system alerts).*
