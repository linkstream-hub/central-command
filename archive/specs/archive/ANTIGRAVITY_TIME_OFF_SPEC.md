# ANTIGRAVITY SPEC — Time Off Manager Backend Integration
# Sprint: Time Off Manager Phase 1 — Backend only
# Date: April 23, 2026
# Author: Claude Code

---

## CONTEXT

The AppSheet Time Off Manager has a backing Google Sheet with 3 tabs:
- **Employees** — employee records (Employee ID = badge number)
- **AccrualRules** — tenure-based accrual tiers
- **Time Off Requests** — all leave requests

Sheet ID: `1KeDnWdFK3R_nNHMZIEGbx49xBWq02AnEsXOBXArHgbk`
Sheet URL: https://docs.google.com/spreadsheets/d/1KeDnWdFK3R_nNHMZIEGbx49xBWq02AnEsXOBXArHgbk/edit

**BEFORE DEPLOYMENT:** The sheet must be shared with `workorder@aptmaintenanceinc.com` as **Editor**
so that both TechPWA.gs and DashboardAPI.gs (which run as workorder@) can access it.

---

## COLUMN SCHEMAS

### Employees tab
Columns (header-based, read dynamically):
- `Employee ID` — badge number (join key to Tech Roster)
- `Full Name` — "Last, First" format
- `Email`
- `Hire Date`
- `Total Hours Worked`
- `Role` — "User" or "Admin"

### AccrualRules tab
Columns:
- `Rule ID` — UUID
- `Rule Name` — e.g. "New Hire Accrual", "3 Year Tenure", "8 Year Tenure"
- `Accrual Rate` — text string: "2 weeks per year", "3 weeks per year", etc.
- `Max` — hours cap (number)

Tenure rules (10 total): New Hire → 0yr, 3 Year Tenure → 3yr, 8 Year Tenure → 8yr,
13 Year Tenure → 13yr, 18 Year Tenure → 18yr, 23 Year Tenure → 23yr. Others are non-tenure named.

### Time Off Requests tab
Columns:
- `Request ID` — UUID (primary key)
- `Leave Type` — "Vacation" or "Sick"
- `Request Type` — "Full Day(s)" or blank (hourly)
- `Start Date`
- `End Date`
- `Hours` — number
- `Reason` — text
- `Status` — "Pending", "Approved", "Denied", "Cancelled"
- `Legal Alert` — text (system-written)
- `Manager Notes` — text
- `Employee ID` — badge number (may not exist yet — see note below)

**IMPORTANT:** The `Employee ID` column may not yet exist in the Time Off Requests tab.
If it doesn't exist, add it as a new column header in row 1 before appending any data.
AppSheet will not break from an extra column it doesn't know about.

---

## CA LEGAL REQUIREMENTS — NON-NEGOTIABLE

1. **Sick leave (CA Labor Code 246.5):** `leaveType === 'Sick'` MUST be auto-approved on submission.
   Set `Status = 'Approved'` and `Legal Alert = 'CA_SICK_AUTO_APPROVED'` immediately.
   Never route sick leave for manager approval. Never deny sick leave.

2. **Denial paper trail (PAGA):** `denyTimeOff` MUST require a reason string.
   Write it to `Manager Notes`. Return an error if reason is missing.

3. **Sick accrual (CA minimum):** 1 hour per 30 hours worked, cap 48 hours (company with 26+ employees).
   Source: `Total Hours Worked` column in Employees tab.

---

## FILES TO MODIFY

### 1. `TechPWA.gs` (repo root)

#### Step 1 — Add 2 GET actions in `doGet()`

Find this exact block:
```javascript
    return jsonResponse({ success: false, error: 'UNKNOWN_ACTION' });
  } catch(err) {
    Logger.log('doGet error: ' + err.message);
```

Replace with:
```javascript
    if (action === 'getTimeOffHistory') {
      var tech = validateToken(token);
      if (!tech) return jsonResponse({ success: false, error: 'INVALID_TOKEN' });
      return jsonResponse(handleGetTimeOffHistory(tech));
    }

    if (action === 'getTimeOffBalance') {
      var tech = validateToken(token);
      if (!tech) return jsonResponse({ success: false, error: 'INVALID_TOKEN' });
      return jsonResponse(handleGetTimeOffBalance(tech));
    }

    return jsonResponse({ success: false, error: 'UNKNOWN_ACTION' });
  } catch(err) {
    Logger.log('doGet error: ' + err.message);
```

#### Step 2 — Add 2 POST actions in `doPost()`

Find this exact line:
```javascript
    if (action === 'flagIssue')     return jsonResponse(handleFlagIssue(body, tech));

    return jsonResponse({ success: false, error: 'UNKNOWN_ACTION' });
```

Replace with:
```javascript
    if (action === 'flagIssue')     return jsonResponse(handleFlagIssue(body, tech));
    if (action === 'requestTimeOff') return jsonResponse(handleRequestTimeOff(body, tech));
    if (action === 'cancelTimeOff')  return jsonResponse(handleCancelTimeOff(body, tech));

    return jsonResponse({ success: false, error: 'UNKNOWN_ACTION' });
```

#### Step 3 — Append this entire block at the end of TechPWA.gs (after the closing `}` of setupPWASheets)

```javascript
// ─────────────────────────────────────────────
// TIME OFF MANAGER — Tech-facing endpoints
// Backing sheet ID: 1KeDnWdFK3R_nNHMZIEGbx49xBWq02AnEsXOBXArHgbk
// DEPLOY NOTE: Share that sheet with workorder@aptmaintenanceinc.com as Editor
// ─────────────────────────────────────────────

var TOM_SHEET_ID = '1KeDnWdFK3R_nNHMZIEGbx49xBWq02AnEsXOBXArHgbk';
var TOM_TABS = {
  EMPLOYEES:     'Employees',
  ACCRUAL_RULES: 'AccrualRules',
  TIME_OFF_REQS: 'Time Off Requests'
};

function getTomSheet(tabName) {
  return SpreadsheetApp.openById(TOM_SHEET_ID).getSheetByName(tabName);
}

// Returns { headerName: 0basedIndex } map for any TOM sheet
function getTomColMap(sheet) {
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var map = {};
  headers.forEach(function(h, i) { if (h) map[String(h).trim()] = i; });
  return map;
}

// Appends a missing column header and registers it in colMap in-place
function ensureTomColumn(sheet, colMap, colName) {
  if (colMap[colName] !== undefined) return;
  var nextCol = sheet.getLastColumn() + 1;
  sheet.getRange(1, nextCol).setValue(colName);
  colMap[colName] = nextCol - 1; // 0-based
}

function handleRequestTimeOff(body, tech) {
  var leaveType   = String(body.leaveType   || '').trim();
  var requestType = String(body.requestType || 'Full Day(s)').trim();
  var startDate   = String(body.startDate   || '').trim();
  var endDate     = String(body.endDate     || startDate).trim();
  var hours       = parseFloat(body.hours   || 0);
  var reason      = String(body.reason      || '').trim();

  if (!leaveType || !startDate) {
    return { success: false, error: 'MISSING_FIELDS', message: 'leaveType and startDate required.' };
  }
  if (leaveType !== 'Vacation' && leaveType !== 'Sick') {
    return { success: false, error: 'INVALID_LEAVE_TYPE', message: 'leaveType must be Vacation or Sick.' };
  }

  // CA Labor Code 246.5 — sick leave is auto-approved on submission; cannot be gated
  var status     = (leaveType === 'Sick') ? 'Approved' : 'Pending';
  var legalAlert = (leaveType === 'Sick') ? 'CA_SICK_AUTO_APPROVED' : '';

  try {
    var sheet = getTomSheet(TOM_TABS.TIME_OFF_REQS);
    var col   = getTomColMap(sheet);
    ensureTomColumn(sheet, col, 'Employee ID');

    var requestId = Utilities.getUuid().toUpperCase();
    var numCols   = sheet.getLastColumn();
    var newRow    = new Array(numCols).fill('');

    function setCol(name, val) { if (col[name] !== undefined) newRow[col[name]] = val; }
    setCol('Request ID',   requestId);
    setCol('Leave Type',   leaveType);
    setCol('Request Type', requestType);
    setCol('Start Date',   startDate);
    setCol('End Date',     endDate);
    setCol('Hours',        hours > 0 ? hours : '');
    setCol('Reason',       reason);
    setCol('Status',       status);
    setCol('Legal Alert',  legalAlert);
    setCol('Employee ID',  tech.badge);

    sheet.appendRow(newRow);

    return {
      success:      true,
      requestId:    requestId,
      status:       status,
      autoApproved: (leaveType === 'Sick'),
      message:      (leaveType === 'Sick')
        ? 'Sick leave recorded and auto-approved per CA Labor Code 246.5.'
        : 'Vacation request submitted. Pending manager approval.'
    };
  } catch (e) {
    Logger.log('handleRequestTimeOff error: ' + e.message);
    return { success: false, error: 'SERVER_ERROR', message: e.message };
  }
}

function handleGetTimeOffHistory(tech) {
  try {
    var sheet    = getTomSheet(TOM_TABS.TIME_OFF_REQS);
    var col      = getTomColMap(sheet);
    var data     = sheet.getDataRange().getValues();
    var empIdCol = col['Employee ID'];
    if (empIdCol === undefined) return { success: true, requests: [] };

    var requests = [];
    for (var r = 1; r < data.length; r++) {
      var row = data[r];
      if (String(row[empIdCol] || '').trim() !== tech.badge) continue;
      var req = {};
      Object.keys(col).forEach(function(k) {
        var val = row[col[k]];
        if (val instanceof Date) val = Utilities.formatDate(val, 'America/Los_Angeles', 'yyyy-MM-dd');
        req[k] = val;
      });
      requests.push(req);
    }
    requests.sort(function(a, b) {
      return String(b['Start Date'] || '').localeCompare(String(a['Start Date'] || ''));
    });
    return { success: true, requests: requests };
  } catch (e) {
    Logger.log('handleGetTimeOffHistory error: ' + e.message);
    return { success: false, error: 'SERVER_ERROR', message: e.message };
  }
}

function handleGetTimeOffBalance(tech) {
  try {
    var tomSs = SpreadsheetApp.openById(TOM_SHEET_ID);

    var empSheet = tomSs.getSheetByName(TOM_TABS.EMPLOYEES);
    var empCol   = getTomColMap(empSheet);
    var empData  = empSheet.getDataRange().getValues();
    var empRow   = null;
    for (var e = 1; e < empData.length; e++) {
      if (String(empData[e][empCol['Employee ID']] || '').trim() === tech.badge) {
        empRow = empData[e]; break;
      }
    }
    if (!empRow) return { success: false, error: 'EMPLOYEE_NOT_FOUND' };

    var hireDate       = empRow[empCol['Hire Date']];
    var totalHrsWorked = parseFloat(empRow[empCol['Total Hours Worked']] || 0);
    var tenureYears    = hireDate ? (new Date() - new Date(hireDate)) / (365.25 * 24 * 60 * 60 * 1000) : 0;

    // CA Sick: 1h per 30h worked, cap 48h (26+ employee company)
    var sickAccrued = Math.min(totalHrsWorked / 30, 48);

    // Vacation: lookup AccrualRules by tenure
    var accSheet = tomSs.getSheetByName(TOM_TABS.ACCRUAL_RULES);
    var accCol   = getTomColMap(accSheet);
    var accData  = accSheet.getDataRange().getValues();
    var rules    = [];
    for (var ar = 1; ar < accData.length; ar++) {
      var rName = String(accData[ar][accCol['Rule Name']]    || '').trim();
      var rRate = String(accData[ar][accCol['Accrual Rate']] || '').trim();
      var rMax  = parseFloat(accData[ar][accCol['Max']]      || 0);
      rules.push({ name: rName, minTenure: tomParseTenureThreshold(rName), hrsPerYear: tomParseAccrualRate(rRate), max: rMax });
    }
    rules.sort(function(a, b) { return b.minTenure - a.minTenure; });

    var appliedRule = rules[rules.length - 1] || { name: 'New Hire Accrual', hrsPerYear: 80, max: 50 };
    for (var ri = 0; ri < rules.length; ri++) {
      if (tenureYears >= rules[ri].minTenure) { appliedRule = rules[ri]; break; }
    }
    var vacAccrued = Math.min(tenureYears * appliedRule.hrsPerYear, appliedRule.max);

    var torSheet  = tomSs.getSheetByName(TOM_TABS.TIME_OFF_REQS);
    var torCol    = getTomColMap(torSheet);
    var torData   = torSheet.getDataRange().getValues();
    var sickUsed  = 0, vacUsed = 0;
    var torEmpCol = torCol['Employee ID'];

    if (torEmpCol !== undefined) {
      for (var tr = 1; tr < torData.length; tr++) {
        var tRow = torData[tr];
        if (String(tRow[torEmpCol] || '').trim() !== tech.badge) continue;
        if (String(tRow[torCol['Status']] || '').trim() !== 'Approved') continue;
        var tType  = String(tRow[torCol['Leave Type']] || '').trim();
        var tHours = parseFloat(tRow[torCol['Hours']]  || 0);
        if (tType === 'Sick')     sickUsed += tHours;
        if (tType === 'Vacation') vacUsed  += tHours;
      }
    }

    return {
      success:     true,
      tenureYears: Math.round(tenureYears * 10) / 10,
      appliedRule: appliedRule.name,
      sick: {
        accrued:   Math.round(sickAccrued * 10) / 10,
        used:      Math.round(sickUsed    * 10) / 10,
        available: Math.round(Math.max(sickAccrued - sickUsed, 0) * 10) / 10
      },
      vacation: {
        accrued:   Math.round(vacAccrued * 10) / 10,
        used:      Math.round(vacUsed    * 10) / 10,
        available: Math.round(Math.max(vacAccrued - vacUsed, 0) * 10) / 10
      }
    };
  } catch (e) {
    Logger.log('handleGetTimeOffBalance error: ' + e.message);
    return { success: false, error: 'SERVER_ERROR', message: e.message };
  }
}

function handleCancelTimeOff(body, tech) {
  var requestId = String(body.requestId || '').trim();
  if (!requestId) return { success: false, error: 'MISSING_FIELDS', message: 'requestId required.' };

  try {
    var sheet     = getTomSheet(TOM_TABS.TIME_OFF_REQS);
    var col       = getTomColMap(sheet);
    var data      = sheet.getDataRange().getValues();
    var ridCol    = col['Request ID'];
    var empIdCol  = col['Employee ID'];
    var statusCol = col['Status'];
    var ltCol     = col['Leave Type'];

    for (var r = 1; r < data.length; r++) {
      if (String(data[r][ridCol] || '').trim() !== requestId) continue;
      if (empIdCol !== undefined && String(data[r][empIdCol] || '').trim() !== tech.badge) {
        return { success: false, error: 'FORBIDDEN' };
      }
      var currentStatus = String(data[r][statusCol] || '').trim();
      var leaveType     = String(data[r][ltCol]     || '').trim();
      // Pending always cancellable. Auto-approved Sick cancellable by tech.
      // Manager-approved Vacation cannot be self-cancelled.
      if (currentStatus === 'Pending' || (currentStatus === 'Approved' && leaveType === 'Sick')) {
        sheet.getRange(r + 1, statusCol + 1).setValue('Cancelled');
        return { success: true, requestId: requestId };
      }
      return {
        success: false, error: 'CANNOT_CANCEL',
        message: 'Approved vacation requests cannot be self-cancelled. Contact your manager.'
      };
    }
    return { success: false, error: 'NOT_FOUND' };
  } catch (e) {
    Logger.log('handleCancelTimeOff error: ' + e.message);
    return { success: false, error: 'SERVER_ERROR', message: e.message };
  }
}

// "3 Year Tenure" → 3, "New Hire Accrual" / anything else → 0
function tomParseTenureThreshold(ruleName) {
  var m = String(ruleName || '').match(/^(\d+)\s+Year\s+Tenure/i);
  return m ? parseInt(m[1]) : 0;
}

// "2 weeks per year" → 80h, "2.5 weeks per year" → 100h
function tomParseAccrualRate(rateStr) {
  var m = String(rateStr || '').match(/([\d.]+)\s+weeks?\s+per\s+year/i);
  return m ? parseFloat(m[1]) * 40 : 80;
}
```

---

### 2. `dashboard-api/DashboardAPI.gs`

#### Step 1 — Add 4 actions in `doPost()`

Find this exact block:
```javascript
    if (action === 'suggestTechs') return daResponse(suggestTechsDA(body));
    if (action === 'sendSms')      return daResponse(sendSmsDA(body));

    return daResponse({ success: false, error: 'UNKNOWN_ACTION', action: action });
```

Replace with:
```javascript
    if (action === 'suggestTechs') return daResponse(suggestTechsDA(body));
    if (action === 'sendSms')      return daResponse(sendSmsDA(body));

    if (action === 'getTimeOffRequests')   return daResponse(getTimeOffRequestsDA(body));
    if (action === 'submitTimeOffRequest') return daResponse(submitTimeOffRequestDA(body));
    if (action === 'approveTimeOff')       return daResponse(approveTimeOffDA(body));
    if (action === 'denyTimeOff')          return daResponse(denyTimeOffDA(body));

    return daResponse({ success: false, error: 'UNKNOWN_ACTION', action: action });
```

#### Step 2 — Append this entire block at the end of DashboardAPI.gs (after testAccess function)

```javascript
// ─────────────────────────────────────────────
// TIME OFF MANAGER — Dashboard/HR-facing endpoints
// Backing sheet ID: 1KeDnWdFK3R_nNHMZIEGbx49xBWq02AnEsXOBXArHgbk
// DEPLOY NOTE: Share that sheet with workorder@aptmaintenanceinc.com as Editor
// ─────────────────────────────────────────────

var TOM_SHEET_ID_DA = '1KeDnWdFK3R_nNHMZIEGbx49xBWq02AnEsXOBXArHgbk';
var TOM_TABS_DA = {
  EMPLOYEES:     'Employees',
  ACCRUAL_RULES: 'AccrualRules',
  TIME_OFF_REQS: 'Time Off Requests'
};

function getTomSheetDA(tabName) {
  return SpreadsheetApp.openById(TOM_SHEET_ID_DA).getSheetByName(tabName);
}

function getTomColMapDA(sheet) {
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var map = {};
  headers.forEach(function(h, i) { if (h) map[String(h).trim()] = i; });
  return map;
}

function ensureTomColumnDA(sheet, colMap, colName) {
  if (colMap[colName] !== undefined) return;
  var nextCol = sheet.getLastColumn() + 1;
  sheet.getRange(1, nextCol).setValue(colName);
  colMap[colName] = nextCol - 1;
}

// Ana's view — all requests with employee info joined. Cancelled rows hidden.
// Params: { filterStatus: 'Pending' | 'Approved' | 'Denied' | '' (all) }
function getTimeOffRequestsDA(params) {
  try {
    var filterStatus = String((params && params.filterStatus) || '').trim();

    var torSheet = getTomSheetDA(TOM_TABS_DA.TIME_OFF_REQS);
    var torCol   = getTomColMapDA(torSheet);
    var torData  = torSheet.getDataRange().getValues();

    var empSheet = getTomSheetDA(TOM_TABS_DA.EMPLOYEES);
    var empCol   = getTomColMapDA(empSheet);
    var empData  = empSheet.getDataRange().getValues();

    var empMap = {};
    for (var e = 1; e < empData.length; e++) {
      var eid = String(empData[e][empCol['Employee ID']] || '').trim();
      if (eid) empMap[eid] = {
        name:  String(empData[e][empCol['Full Name']] || '').trim(),
        email: String(empData[e][empCol['Email']]     || '').trim()
      };
    }

    var torEmpCol = torCol['Employee ID'];
    var statusCol = torCol['Status'];
    var requests  = [];

    for (var r = 1; r < torData.length; r++) {
      var row    = torData[r];
      var status = String(row[statusCol] || '').trim();
      if (status === 'Cancelled') continue;
      if (filterStatus && status !== filterStatus) continue;

      var req = {};
      Object.keys(torCol).forEach(function(k) {
        var val = row[torCol[k]];
        if (val instanceof Date) val = Utilities.formatDate(val, 'America/Los_Angeles', 'yyyy-MM-dd');
        req[k] = val;
      });
      req._rowIndex = r + 1;
      if (torEmpCol !== undefined) {
        var empId       = String(row[torEmpCol] || '').trim();
        req._employee   = empMap[empId] || { name: 'Unknown', email: '' };
        req._employeeId = empId;
      }
      requests.push(req);
    }

    // Pending first, then by Start Date descending
    requests.sort(function(a, b) {
      var ap = (a['Status'] === 'Pending') ? 0 : 1;
      var bp = (b['Status'] === 'Pending') ? 0 : 1;
      if (ap !== bp) return ap - bp;
      return String(b['Start Date'] || '').localeCompare(String(a['Start Date'] || ''));
    });

    return { success: true, requests: requests };
  } catch (e) {
    Logger.log('getTimeOffRequestsDA error: ' + e.message);
    return { success: false, error: 'SERVER_ERROR', message: e.message };
  }
}

// Salaried staff submit via CC2.0 HR page.
// Params: { employeeId, leaveType, requestType, startDate, endDate, hours, reason }
function submitTimeOffRequestDA(body) {
  var employeeId  = String(body.employeeId  || '').trim();
  var leaveType   = String(body.leaveType   || '').trim();
  var requestType = String(body.requestType || 'Full Day(s)').trim();
  var startDate   = String(body.startDate   || '').trim();
  var endDate     = String(body.endDate     || startDate).trim();
  var hours       = parseFloat(body.hours   || 0);
  var reason      = String(body.reason      || '').trim();

  if (!employeeId || !leaveType || !startDate) return { success: false, error: 'MISSING_FIELDS' };
  if (leaveType !== 'Vacation' && leaveType !== 'Sick') return { success: false, error: 'INVALID_LEAVE_TYPE' };

  var status     = (leaveType === 'Sick') ? 'Approved' : 'Pending';
  var legalAlert = (leaveType === 'Sick') ? 'CA_SICK_AUTO_APPROVED' : '';

  try {
    var sheet = getTomSheetDA(TOM_TABS_DA.TIME_OFF_REQS);
    var col   = getTomColMapDA(sheet);
    ensureTomColumnDA(sheet, col, 'Employee ID');

    var requestId = Utilities.getUuid().toUpperCase();
    var numCols   = sheet.getLastColumn();
    var newRow    = new Array(numCols).fill('');

    function setCol(name, val) { if (col[name] !== undefined) newRow[col[name]] = val; }
    setCol('Request ID',   requestId);
    setCol('Leave Type',   leaveType);
    setCol('Request Type', requestType);
    setCol('Start Date',   startDate);
    setCol('End Date',     endDate);
    setCol('Hours',        hours > 0 ? hours : '');
    setCol('Reason',       reason);
    setCol('Status',       status);
    setCol('Legal Alert',  legalAlert);
    setCol('Employee ID',  employeeId);

    sheet.appendRow(newRow);
    return { success: true, requestId: requestId, status: status, autoApproved: (leaveType === 'Sick') };
  } catch (e) {
    Logger.log('submitTimeOffRequestDA error: ' + e.message);
    return { success: false, error: 'SERVER_ERROR', message: e.message };
  }
}

// Ana approves a vacation request.
// Params: { requestId, managerNotes }
function approveTimeOffDA(body) {
  var requestId    = String(body.requestId    || '').trim();
  var managerNotes = String(body.managerNotes || '').trim();
  if (!requestId) return { success: false, error: 'MISSING_FIELDS' };

  try {
    var sheet  = getTomSheetDA(TOM_TABS_DA.TIME_OFF_REQS);
    var col    = getTomColMapDA(sheet);
    var data   = sheet.getDataRange().getValues();
    var ridCol = col['Request ID'];

    for (var r = 1; r < data.length; r++) {
      if (String(data[r][ridCol] || '').trim() !== requestId) continue;
      if (String(data[r][col['Status']] || '').trim() === 'Approved') {
        return { success: true, requestId: requestId, alreadyApproved: true };
      }
      sheet.getRange(r + 1, col['Status'] + 1).setValue('Approved');
      if (managerNotes && col['Manager Notes'] !== undefined) {
        sheet.getRange(r + 1, col['Manager Notes'] + 1).setValue(managerNotes);
      }
      return { success: true, requestId: requestId };
    }
    return { success: false, error: 'NOT_FOUND' };
  } catch (e) {
    Logger.log('approveTimeOffDA error: ' + e.message);
    return { success: false, error: 'SERVER_ERROR', message: e.message };
  }
}

// Ana denies a vacation request. Reason mandatory — PAGA paper trail.
// Sick leave CANNOT be denied (CA Labor Code 246.5).
// Params: { requestId, reason }
function denyTimeOffDA(body) {
  var requestId = String(body.requestId || '').trim();
  var reason    = String(body.reason    || '').trim();
  if (!requestId) return { success: false, error: 'MISSING_FIELDS' };
  if (!reason)    return { success: false, error: 'REASON_REQUIRED', message: 'Denial reason required for PAGA compliance.' };

  try {
    var sheet  = getTomSheetDA(TOM_TABS_DA.TIME_OFF_REQS);
    var col    = getTomColMapDA(sheet);
    var data   = sheet.getDataRange().getValues();
    var ridCol = col['Request ID'];
    var ltCol  = col['Leave Type'];

    for (var r = 1; r < data.length; r++) {
      if (String(data[r][ridCol] || '').trim() !== requestId) continue;
      if (String(data[r][ltCol] || '').trim() === 'Sick') {
        return { success: false, error: 'CANNOT_DENY_SICK', message: 'Sick leave cannot be denied under CA Labor Code 246.5.' };
      }
      sheet.getRange(r + 1, col['Status'] + 1).setValue('Denied');
      if (col['Manager Notes'] !== undefined) {
        sheet.getRange(r + 1, col['Manager Notes'] + 1).setValue(reason);
      }
      return { success: true, requestId: requestId };
    }
    return { success: false, error: 'NOT_FOUND' };
  } catch (e) {
    Logger.log('denyTimeOffDA error: ' + e.message);
    return { success: false, error: 'SERVER_ERROR', message: e.message };
  }
}
```

---

## DEPLOY COMMANDS

After implementing, Antigravity runs both deploys:

### TechPWA.gs (root project — bound script, no separate clasp deploy needed)
TechPWA.gs is a bound script and is deployed as part of the main Lead Parsing project.
No separate deploy required — changes take effect on next request after `clasp push --force`.

Actually — TechPWA.gs is deployed as a SEPARATE web app via the main project's `clasp push`:
```
cd A:/PTOW/1_APT_Central_Command
clasp push --force
clasp deploy --deploymentId AKfycbyFgHHDrZm1NZBG2iQ3czdeRxSGuvjkqyLkx7OCjdkA5vRBCm3IQ1RAEyrbgVp-Y4xs1g --description "v74 — Time Off Manager backend (TechPWA)"
```

### DashboardAPI.gs (dashboard-api/ project)
```
cd A:/PTOW/1_APT_Central_Command/dashboard-api
clasp push --force
clasp deploy --deploymentId AKfycbyum_KLprgPh51GxFiwhsoNHScc4TqIBrzZS0GPfHsnhrc9hAtp03AciyiydhfyJyxCCQ --description "v17 — Time Off Manager backend (DashboardAPI)"
```

---

## WHAT NOT TO CHANGE

- Do NOT modify any existing functions in either file
- Do NOT rename, move, or delete any `.gs` files
- Do NOT touch the doGet/doPost structure beyond the specific line insertions above
- Do NOT add any frontend code — this spec is backend only

---

## VERIFICATION STEPS

After deploy, verify in browser / Postman:

1. **TechPWA requestTimeOff (Sick):** POST `{ action: 'requestTimeOff', token: <valid>, leaveType: 'Sick', startDate: '2026-05-01', reason: 'not feeling well' }` → response `{ success: true, status: 'Approved', autoApproved: true }`

2. **TechPWA requestTimeOff (Vacation):** Same but `leaveType: 'Vacation'` → response `{ success: true, status: 'Pending', autoApproved: false }`

3. **TechPWA getTimeOffHistory:** GET `?action=getTimeOffHistory&token=<valid>` → returns array with both requests above

4. **TechPWA getTimeOffBalance:** GET `?action=getTimeOffBalance&token=<valid>` → returns `{ sick: { accrued, used, available }, vacation: { accrued, used, available } }`

5. **DashboardAPI getTimeOffRequests:** POST `{ action: 'getTimeOffRequests' }` → returns array with the vacation request (sick is already approved, pending vacation appears)

6. **DashboardAPI approveTimeOff:** POST `{ action: 'approveTimeOff', requestId: '<uuid>' }` → `{ success: true }`

7. **DashboardAPI denyTimeOff (sick — must fail):** POST `{ action: 'denyTimeOff', requestId: '<sick-uuid>', reason: 'test' }` → `{ success: false, error: 'CANNOT_DENY_SICK' }`

8. **DashboardAPI denyTimeOff (no reason — must fail):** POST `{ action: 'denyTimeOff', requestId: '<vac-uuid>' }` → `{ success: false, error: 'REASON_REQUIRED' }`

9. **Check TOM sheet** — verify rows appear correctly in Time Off Requests tab with Employee ID column populated.
