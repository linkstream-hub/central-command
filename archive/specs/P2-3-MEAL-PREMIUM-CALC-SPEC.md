# SPEC: P2-3 — Meal Premium Calculation
**Phase:** 2 — Compliance Foundation
**Session:** 96
**Branch:** `feat/p2-3-meal-premium-calc`
**Status:** Ready for execution

---

## GOAL

Populate `premiumAmount` in every ComplianceAlerts row written by the CA Break Compliance Monitor n8n workflow. Today the `Calculate Shift State` function node has no code — it is a stub that passes through raw sheet data unchanged, so `violations[0].premiumAmount` is always undefined and ComplianceAlerts rows have a blank dollar column.

CA Labor Code 226.7: one hour of pay at the employee's regular rate for each missed or short meal period. The dollar amount is already tracked structurally (ComplianceAlerts col 6 = "Premium Amount") — it just needs the value computed.

---

## OUTCOME (definition of done)

A clock-out or attestation event that meets a CA meal-period violation threshold writes a ComplianceAlerts row with a non-zero dollar value in the "Premium Amount" column. A clean shift (no violations) writes no row. Evidence: paste the exact ComplianceAlerts row values into `artifacts/ag_test_results.txt`.

---

## ROOT CAUSE

Two gaps in the existing pipeline:

1. **`Calculate Shift State` node has no code.** `tools/n8n/workflows/ca-break-compliance-monitor.json` shows `"parameters": {}` — a bare function node stub. Nothing computes violations or premiumAmount.

2. **Webhook payloads do not include `hourlyRate`.** The `Calculate Shift State` node needs the tech's regular rate to compute the dollar amount (violations × hourlyRate). Neither `handleClockOut()`'s inline payload (TechPWA.gs ~line 536) nor `fireComplianceWebhook()` (TechPWA.gs line 162) sends `hourlyRate`. The Tech Roster row already has it (`tech.hourlyRate` — col Q, index 16).

---

## FILES TO MODIFY (exactly these three — no others)

| File | Change |
|---|---|
| `TechPWA.gs` | Add `hourlyRate` to webhook payloads |
| n8n UI — CA Break Compliance Monitor | Write `Calculate Shift State` code; fix `Any Violations?` condition |
| `tools/n8n/workflows/ca-break-compliance-monitor.json` | Export after n8n UI edits |

---

## CA LABOR CODE RULES BEING IMPLEMENTED

These must be reproduced **exactly** as in `calculateMealPremiums()` (TechPWA.gs line 1774). Do not invent new thresholds.

| Condition | Violation | Premium |
|---|---|---|
| `elapsedMinutes > 300` AND `breakMinutes < 30` | Missed 1st Meal Period | 1 × hourlyRate |
| `elapsedMinutes > 300` AND `breakMinutes >= 30` AND break started > 300 min after clockIn | Late 1st Meal Period | 1 × hourlyRate |
| `elapsedMinutes > 600` AND `breakMinutes < 60` | Missed/Short 2nd Meal Period | 1 × hourlyRate |

`elapsedMinutes` = total minutes from clockIn to clockOut (not counting breaks — same as `(clockOut - clockIn) / 60000`, which is the gross elapsed time used in `calculateMealPremiums`).

**P2-3 handles the first violation only.** If both a 1st and 2nd meal violation are present, one ComplianceAlerts row is written (the most severe — 1st meal takes precedence). Full multi-violation looping (one row per violation) is P2-4.

---

## TASK LIST

### Task 1 — Branch setup (STOP if any check fails)
```powershell
git branch --show-current
# Must output: feat/p2-3-meal-premium-calc
# Mismatch = STOP, report to Claude Code

git ls-remote --heads origin feat/p2-3-meal-premium-calc
# Must be non-empty. If empty: git push -u origin feat/p2-3-meal-premium-calc first.

git log main..HEAD --oneline
# Paste output here: ______
# If empty on a pre-existing branch, rebase from main before starting.
```

---

### Task 2 — ✅ RESOLVED BY CLAUDE CODE (no AG action needed)

Header names confirmed from `TechPWA.gs` line 1040–1047 (sheet initialization code):

| TM_COL constant | Index | Confirmed header name |
|---|---|---|
| CLOCK_IN | 7 | `Clock In` |
| CLOCK_OUT | 8 | `Clock Out` |
| BREAK_START | 9 | `Break Start` |
| BREAK_MINUTES | 11 | `Break Duration (min)` |

Use these exact strings in the Task 5 JavaScript. Skip to Task 3.

---

### Task 3 — TechPWA.gs: add `hourlyRate` to `fireComplianceWebhook()`

**File:** `TechPWA.gs`

**Change 1 of 2 — function signature and payload (line 162):**

Old:
```javascript
function fireComplianceWebhook(techName, employeeId, eventType, jobId, shiftDate) {
  try {
    var webhookUrl = PropertiesService.getScriptProperties().getProperty('N8N_COMPLIANCE_WEBHOOK');
    if (!webhookUrl) return; // silently skip if not configured

    var payload = JSON.stringify({
      techName:   techName,
      employeeId: employeeId,
      eventType:  eventType,  // clockIn | clockOut | startBreak | endBreak | markComplete
      timestamp:  new Date().toISOString(),
      jobId:      jobId || '',
      shiftDate:  shiftDate || Utilities.formatDate(new Date(), 'America/Los_Angeles', 'yyyy-MM-dd')
    });
```

New:
```javascript
function fireComplianceWebhook(techName, employeeId, eventType, jobId, shiftDate, hourlyRate) {
  try {
    var webhookUrl = PropertiesService.getScriptProperties().getProperty('N8N_COMPLIANCE_WEBHOOK');
    if (!webhookUrl) return; // silently skip if not configured

    var payload = JSON.stringify({
      techName:    techName,
      employeeId:  employeeId,
      eventType:   eventType,  // clockIn | clockOut | startBreak | endBreak | markComplete
      timestamp:   new Date().toISOString(),
      jobId:       jobId || '',
      shiftDate:   shiftDate || Utilities.formatDate(new Date(), 'America/Los_Angeles', 'yyyy-MM-dd'),
      hourlyRate:  parseFloat(hourlyRate || 0)
    });
```

**Change 2 of 2 — update ALL 7 call sites to pass `tech.hourlyRate`:**

| Line (approx) | Current call | Updated call |
|---|---|---|
| ~479 | `fireComplianceWebhook(tech.name, tech.badge, 'clockIn', jobId, dateStr)` | `fireComplianceWebhook(tech.name, tech.badge, 'clockIn', jobId, dateStr, tech.hourlyRate)` |
| ~580 | `fireComplianceWebhook(tech.name, tech.badge, 'startBreak', result.row[TM_COL.JOB_ID], result.row[TM_COL.DATE])` | `fireComplianceWebhook(tech.name, tech.badge, 'startBreak', result.row[TM_COL.JOB_ID], result.row[TM_COL.DATE], tech.hourlyRate)` |
| ~610 | `fireComplianceWebhook(tech.name, tech.badge, 'endBreak', result.row[TM_COL.JOB_ID], result.row[TM_COL.DATE])` | `fireComplianceWebhook(tech.name, tech.badge, 'endBreak', result.row[TM_COL.JOB_ID], result.row[TM_COL.DATE], tech.hourlyRate)` |
| ~684 | `fireComplianceWebhook(tech.name, tech.badge, 'markComplete', jobId, result.row[TM_COL.DATE])` | `fireComplianceWebhook(tech.name, tech.badge, 'markComplete', jobId, result.row[TM_COL.DATE], tech.hourlyRate)` |
| ~753 | `fireComplianceWebhook(tech.name, tech.badge, 'startShift', null, dateStr)` | `fireComplianceWebhook(tech.name, tech.badge, 'startShift', null, dateStr, tech.hourlyRate)` |
| ~769 | `fireComplianceWebhook(tech.name, tech.badge, 'endShift', null, row[TM_COL.DATE])` | `fireComplianceWebhook(tech.name, tech.badge, 'endShift', null, row[TM_COL.DATE], tech.hourlyRate)` |
| ~1419 | `fireComplianceWebhook(tech.name, tech.badge, 'attestation_signed', recordId, null)` | `fireComplianceWebhook(tech.name, tech.badge, 'attestation_signed', recordId, null, tech.hourlyRate)` |

**STOP AND FLAG:** Before updating call sites, run `grep -n "fireComplianceWebhook" TechPWA.gs` and paste the output here. Verify the line numbers match the list above. If any call site is missing or different, flag to Claude Code before proceeding.

---

### Task 4 — TechPWA.gs: add `hourlyRate` to `handleClockOut()` inline webhook payload

**File:** `TechPWA.gs` (~line 536)

The inline webhook in `handleClockOut()` does NOT use `fireComplianceWebhook()` — it has its own `UrlFetchApp.fetch` call. Find this block:

```javascript
payload: JSON.stringify({
  techName: tech.name,
  employeeId: tech.badge,
  eventType: 'clock_out',
  timestamp: new Date().toISOString(),
  jobId: result.row[TM_COL.JOB_ID] || '',
  shiftDate: result.row[TM_COL.DATE] || ''
}),
```

Replace with:
```javascript
payload: JSON.stringify({
  techName:   tech.name,
  employeeId: tech.badge,
  eventType:  'clock_out',
  timestamp:  new Date().toISOString(),
  jobId:      result.row[TM_COL.JOB_ID] || '',
  shiftDate:  result.row[TM_COL.DATE] || '',
  hourlyRate: parseFloat(tech.hourlyRate || 0)
}),
```

---

### Task 5 — n8n UI: write `Calculate Shift State` function node code

Open the CA Break Compliance Monitor workflow in n8n. Click the **Calculate Shift State** node. It is currently empty — `parameters: {}`. Open the code editor.

The function node is **legacy typeVersion 1** (not the newer Code node). Use this JavaScript exactly, substituting the exact header names you found in Task 2 for the HEADER_* placeholders:

```javascript
var record      = items[0].json;
var webhookBody = $node["Webhook"].json.body;

var clockInRaw  = record["Clock In"];
var clockOutRaw = record["Clock Out"];

// If no clock-out yet, no premium can be calculated — pass through with empty violations.
if (!clockInRaw || !clockOutRaw) {
  return [{ json: {
    techName:      webhookBody.techName   || '',
    employeeId:    webhookBody.employeeId || '',
    shiftDate:     webhookBody.shiftDate  || '',
    hasViolations: false,
    violations:    []
  }}];
}

var clockIn      = new Date(clockInRaw);
var clockOut     = new Date(clockOutRaw);
var breakStart   = record["Break Start"] ? new Date(record["Break Start"]) : null;
var breakMinutes = parseFloat(record["Break Duration (min)"] || 0);
var hourlyRate   = parseFloat(webhookBody.hourlyRate || 0);

var elapsedMinutes = (clockOut - clockIn) / 60000;
var violations     = [];

// CA Labor Code 226.7 — mirrors calculateMealPremiums() in TechPWA.gs
if (elapsedMinutes > 300) {
  var firstMealViolation = null;
  if (breakMinutes < 30) {
    firstMealViolation = 'Missed 1st Meal Period';
  } else if (breakStart && (breakStart - clockIn) / 60000 > 300) {
    firstMealViolation = 'Late 1st Meal Period';
  }
  if (firstMealViolation) {
    violations.push({
      type:          firstMealViolation,
      totalHours:    Math.round(elapsedMinutes / 60 * 100) / 100,
      premiumAmount: hourlyRate
    });
  }
}

if (elapsedMinutes > 600 && breakMinutes < 60) {
  violations.push({
    type:          'Missed/Short 2nd Meal Period',
    totalHours:    Math.round(elapsedMinutes / 60 * 100) / 100,
    premiumAmount: hourlyRate
  });
}

// P2-3: output one item. Write node uses violations[0].
// If both violations present, violations[0] is the 1st meal violation (higher priority).
// Full multi-violation looping is P2-4.
return [{ json: {
  techName:      webhookBody.techName   || '',
  employeeId:    webhookBody.employeeId || '',
  shiftDate:     webhookBody.shiftDate  || '',
  hasViolations: violations.length > 0,
  violations:    violations
}}];
```

Save the node. Do NOT activate the workflow yet.

---

### Task 6 — n8n UI: fix `Any Violations?` IF node condition

The `Any Violations?` IF node currently has no condition — `parameters: {}`. Open it and set:

| Setting | Value |
|---|---|
| Value 1 | `{{ $json.hasViolations }}` |
| Operation | `equal` |
| Value 2 | `true` (boolean) |

True branch (output 1) → Write to ComplianceAlerts Sheet  
False branch (output 2) → Respond OK (No Violations)

Verify the node connections are still correct after saving (they were already wired — just confirm they did not change).

Activate the workflow if it was deactivated.

---

### Task 7 — Export updated n8n workflow

```powershell
python tools/n8n/export.py --url $env:N8N_URL --api-key $env:N8N_API_KEY
git add tools/n8n/workflows/
```

Verify `ca-break-compliance-monitor.json` was updated (check `git diff --stat` shows a change to that file). The updated JSON must contain non-empty `parameters` for both `Calculate Shift State` and `Any Violations?` nodes.

---

### Task 8 (N-2) — tsc, push, diff artifact, report to Claude Code

```powershell
npx tsc --noEmit
# Must be zero errors. Fix any before proceeding.

git push origin HEAD

git diff main...HEAD > artifacts/ag_diff.txt
git add artifacts/ag_diff.txt
git commit -m "chore: ag_diff artifact for P2-3 review"
git push origin HEAD
```

Post to Claude Code: "P2-3 diff ready." **Stop. Wait for PASS.**

---

### Task 9 (N-1) — Test sprint (SEPARATE SESSION)

**PREREQUISITE:** Claude Code has issued PASS on the diff.

**Test A — Violation path (primary):**

POST a test webhook to n8n that triggers a meal violation. Use `curl` or Postman:
```
POST https://n8n-production-4f36b.up.railway.app/webhook/ca-compliance
Content-Type: application/json

{
  "techName": "Test Tech",
  "employeeId": "<a real badge# that has a Time Records row for shiftDate>",
  "eventType": "clock_out",
  "shiftDate": "<the date of that row, format: YYYY-MM-DD>",
  "hourlyRate": 25.00
}
```

To use a real Time Records row: pick any recent date where a tech clocked in for > 5 hours with breakMinutes < 30 in the Time Records sheet (this is the "Missed 1st Meal Period" condition).

After the webhook fires, open the ComplianceAlerts tab in the APT Lead Intake Master sheet. Find the new row. Paste the full row values (all columns) into `artifacts/ag_test_results.txt`:
```
Alert ID: ______
Employee Name: ______
Employee ID: ______
Violation Type: ______   (must be "Missed 1st Meal Period" or "Late 1st Meal Period")
Shift Date: ______
Total Hours: ______
Premium Amount: ______   (MUST BE A DOLLAR VALUE — e.g. 25.00, not blank)
Status: ______
Created At: ______
```

**Test B — No-violation path:**
POST a webhook with a badge# and date where the tech worked < 5 hours (or took a full 30+ min break). Confirm NO new row appears in ComplianceAlerts. Paste into `ag_test_results.txt`:
```
No-violation test: badge ______, date ______. ComplianceAlerts row count before: ______, after: ______. (must be unchanged)
```

**Test C — Attestation path:**
Trigger a real attestation from the tech PWA dev server for a qualifying shift. Confirm n8n workflow executes and ComplianceAlerts row appears. Paste the n8n execution ID:
```
n8n execution ID for attestation test: ______
```

After all tests: kill the dev server.

Post to Claude Code: "P2-3 test results ready." **Stop. Wait for clear-to-merge.**

---

### Task 10 (N) — Merge

Merge via PR only after Claude Code issues **"Clear to merge."** Not before.

---

## KNOWN ISSUES / OUT OF SCOPE

- **Duplicate rows:** A clock-out event triggers the webhook twice — once from `handleClockOut()` inline and once from `signAttestation()` if the tech attests on the same clock-out. This pre-existing duplication is unchanged by P2-3. Dedup logic is P2-5.
- **Multi-violation looping:** If a shift has both a 1st and 2nd meal violation, P2-3 writes only one row (`violations[0]`). Full per-violation row writing requires an n8n split/loop node. That is P2-4.
- **Hourly rate = 0:** If a tech has no hourly rate in Tech Roster col Q, `premiumAmount` will be 0. This is a data quality issue, not a code bug. Reported in `ag_test_results.txt` if observed.

---

## CLAUDE CODE REVIEW CHECKLIST (run before PASS)

- [ ] `wc -l artifacts/ag_diff.txt` → non-zero
- [ ] `git log main..HEAD --oneline` on `feat/p2-3-meal-premium-calc` → shows commits
- [ ] Diff touches only: `TechPWA.gs`, `tools/n8n/workflows/ca-break-compliance-monitor.json`, `artifacts/ag_diff.txt`
- [ ] `fireComplianceWebhook` function signature now has 6 params (added `hourlyRate`)
- [ ] All 7 call sites updated — grep for `fireComplianceWebhook(` and count
- [ ] `handleClockOut` inline payload includes `hourlyRate: parseFloat(tech.hourlyRate || 0)`
- [ ] No `as any` in diff
- [ ] n8n JSON: `Calculate Shift State` node `parameters` is non-empty (contains the function code)
- [ ] n8n JSON: `Any Violations?` node `parameters` is non-empty (contains the condition)
- [ ] `ag_test_results.txt`: "Premium Amount" field has a numeric dollar value, not blank
- [ ] `ag_test_results.txt`: No-violation test shows row count unchanged
- [ ] `ag_test_results.txt`: No API keys, tokens, or secret-resembling strings
- [ ] No `npx playwright test` required for this sprint (no Next.js changes) — confirm zero TypeScript files changed
