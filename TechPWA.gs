// TechPWA.gs
// Apps Script backend for the APT Tech PWA.
// Deployed as a SEPARATE web app from the dispatch dashboard.
// Execute as: Me | Who has access: Anyone
//
// CORS NOTE: POST requests must use Content-Type: text/plain (not application/json)
// to avoid CORS preflight failures. Body is still JSON — just sent as text/plain.
// The PWA syncQueue.ts handles this automatically.

// ─────────────────────────────────────────────
// SHEET NAMES
// ─────────────────────────────────────────────
var PWA_SHEETS = {
  TECH_ROSTER:      'Tech Roster',
  DISPATCH_QUEUE:   'Dispatch Queue',
  TIME_RECORDS:     'Time Records',
  JOB_PERFORMANCE:  'Job Performance History'
};

// Tech Roster column indices (0-based)
var TR_COL = {
  NAME:          0,
  BADGE:         1,
  RANK:          2,
  CARPENTRY:     3,
  PLUMBING:      4,
  ELECTRICAL:    5,
  FINISH_CARP:   6,
  STRUCTURAL:    7,
  LANDSCAPING:   8,
  JANITORIAL:    9,
  PHONE:         10,
  PIN_HASH:      11,
  SESSION_TOKEN: 12,
  TOKEN_EXPIRY:  13,
  ROLE:          14,
  ACTIVE:        15,
  HOURLY_RATE:   16,
  PUSH_SUB:      17,
  ENTITY_ID:     18
};

// Dispatch Queue column indices (0-based, CLAUDE.md is 1-based so subtract 1)
var DQ_COL = {
  TIMESTAMP:    0,
  LEAD_ID:      1,
  PRIORITY:     2,
  EMAIL_TYPE:   3,
  CATEGORY:     4,
  ADDRESS:      5,
  UNIT:         6,
  DESCRIPTION:  7,
  TIMING:       8,
  ACCESS:       9,
  RM_NAME:      10,
  RM_EMAIL:     11,
  TENANT_NAME:  12,
  TENANT_PHONE: 13,
  PTE:          14,
  ESTIMATE:     15,
  TECH:         16,
  SCHED:        17,
  EST_HOURS:    18,
  STATUS:       19,
  NOTES:        20,
  MSG_ID:       21,
  CAL_EVENT:    22,
  TENANT_EMAIL: 23,
  TENANT_PREF:  24,
  TENANT_PETS:  25,
  WC_CODE:      26,
  ENTITY_ID:    27
};

// Time Records column indices (0-based)
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

// ─────────────────────────────────────────────
// HTTP ENTRY POINTS
// ─────────────────────────────────────────────

function doGet(e) {
  return jsonResponse({ success: false, error: 'DEPRECATED', message: 'doGet is now handled by Next.js API routes.' });
}

function fireComplianceWebhook(techName, employeeId, eventType, jobId, shiftDate, hourlyRate) {
  try {
    var webhookUrl = PropertiesService.getScriptProperties().getProperty('N8N_COMPLIANCE_WEBHOOK');
    if (!webhookUrl) return; // silently skip if not configured

    var payload = JSON.stringify({
      techName:   techName,
      employeeId: employeeId,
      eventType:  eventType,  // clockIn | clockOut | startBreak | endBreak | markComplete
      timestamp:  new Date().toISOString(),
      jobId:      jobId || '',
      shiftDate:  shiftDate || Utilities.formatDate(new Date(), 'America/Los_Angeles', 'yyyy-MM-dd'),
      hourlyRate: parseFloat(hourlyRate || 0)
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

function doPost(e) {
  return jsonResponse({ success: false, error: 'DEPRECATED', message: 'doPost is now handled by Next.js API routes.' });
}

// ─────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────

function handleLogin(body) {
  return { success: false, error: 'DEPRECATED', message: 'Auth handled by Next.js API.' };
}

function handleChangePin(body, tech) {
  return { success: false, error: 'DEPRECATED', message: 'PIN change handled by Next.js API.' };
}

function validateToken(token) {
  if (!token) return null;
  
  var baseUrl = PropertiesService.getScriptProperties().getProperty('DASHBOARD_API_URL');
  var gasSecret = PropertiesService.getScriptProperties().getProperty('GAS_INTERNAL_SECRET');
  
  if (!baseUrl || !gasSecret) {
    Logger.log('validateToken error: DASHBOARD_API_URL or GAS_INTERNAL_SECRET not set');
    return null;
  }
  
  try {
    var response = UrlFetchApp.fetch(baseUrl + '/api/gas/validate-token', {
      method: 'post',
      contentType: 'application/json',
      headers: { 'X-GAS-Internal-Key': gasSecret },
      payload: JSON.stringify({ token: token }),
      muteHttpExceptions: true
    });
    
    var data = JSON.parse(response.getContentText());
    if (data.success && data.tech) {
      return {
        row: -1, // No longer used, but kept for object shape compatibility
        badge: data.tech.badge,
        name: data.tech.name,
        role: data.tech.role,
        entityId: data.tech.entityId || 'APT-CA',
        active: true,
        hourlyRate: data.tech.hourlyRate
      };
    }
    return null;
  } catch (e) {
    Logger.log('validateToken fetch error: ' + e.message);
    return null;
  }
}

// ─────────────────────────────────────────────
// JOBS
// ─────────────────────────────────────────────

function getTechJobs(tech, dateParam) {
  var targetDate = dateParam
    ? dateParam
    : Utilities.formatDate(new Date(), 'America/Los_Angeles', 'yyyy-MM-dd');

  var dq   = getDispatchQueueSheet();
  var data = dq.getDataRange().getValues();
  var jobs = [];

  for (var r = 1; r < data.length; r++) {
    var row    = data[r];
    var status = String(row[DQ_COL.STATUS] || '').trim();
    if (status === 'Archived' || status === 'Complete') continue;

    var assigned = String(row[DQ_COL.TECH] || '').trim();
    if (!isTechMatch(assigned, tech.badge, tech.name)) continue;

    var sched     = String(row[DQ_COL.SCHED] || '').trim();
    var schedDate = sched.split('|')[0] || '';
    var schedTime = sched.split('|')[1] || '';
    if (schedDate && schedDate !== targetDate) continue;

    // Check if this tech has an active record for this job
    var jobId      = String(row[DQ_COL.LEAD_ID] || '').trim();
    var activeRec  = findActiveRecord(jobId, tech.badge);

    jobs.push({
      jobId:           jobId,
      priority:        String(row[DQ_COL.PRIORITY]     || '').trim(),
      serviceCategory: String(row[DQ_COL.CATEGORY]     || '').trim(),
      address:         String(row[DQ_COL.ADDRESS]       || '').trim(),
      unit:            String(row[DQ_COL.UNIT]          || '').trim(),
      description:     String(row[DQ_COL.DESCRIPTION]   || '').trim(),
      scheduledDate:   schedDate,
      scheduledTime:   schedTime,
      estimatedHours:  parseFloat(row[DQ_COL.EST_HOURS] || 0),
      status:          status,
      rmName:          String(row[DQ_COL.RM_NAME]       || '').trim(),
      accessInfo:      String(row[DQ_COL.ACCESS]        || '').trim(),
      tenantName:      String(row[DQ_COL.TENANT_NAME]   || '').trim(),
      tenantPhone:     String(row[DQ_COL.TENANT_PHONE]  || '').trim(),
      clockedInAt:     activeRec ? activeRec.clockInTime : null,
      activeRecordId:  activeRec ? activeRec.recordId   : null
    });
  }

  // Sort: URGENT first, then by scheduled time
  jobs.sort(function(a, b) {
    var pa = parseInt(a.priority) || 9;
    var pb = parseInt(b.priority) || 9;
    if (pa !== pb) return pa - pb;
    return (a.scheduledTime || '').localeCompare(b.scheduledTime || '');
  });

  return { success: true, techName: tech.name, date: targetDate, jobs: jobs };
}

function getTechStatus(tech) {
  var tmSheet = getTimeRecordsSheet();
  var data    = tmSheet.getDataRange().getValues();

  for (var r = data.length - 1; r >= 1; r--) {
    var row    = data[r];
    var techId = String(row[TM_COL.TECH_ID] || '').trim();
    var status = String(row[TM_COL.STATUS]  || '').trim();
    if (techId !== tech.badge) continue;
    if (status !== 'active' && status !== 'on-break') continue;

    var activeRec = rowToTimeRecord(row);
    var job       = getJobById(activeRec.jobId);
    return { success: true, status: status, activeRecord: activeRec, job: job };
  }

  return { success: true, status: 'idle', activeRecord: null, job: null };
}

// ─────────────────────────────────────────────
// CLOCK ACTIONS
// ─────────────────────────────────────────────

function handleClockIn(body, tech) {
  return { success: false, error: 'DEPRECATED', message: 'handleClockIn is handled by Next.js API.' };
}

function handleClockOut(body, tech) {
  return { success: false, error: 'DEPRECATED', message: 'handleClockOut is handled by Next.js API.' };
}

function handleStartBreak(body, tech) {
  return { success: false, error: 'DEPRECATED', message: 'handleStartBreak is handled by Next.js API.' };
}

function handleEndBreak(body, tech) {
  return { success: false, error: 'DEPRECATED', message: 'handleEndBreak is handled by Next.js API.' };
}

function handleMarkComplete(body, tech) {
  return { success: false, error: 'DEPRECATED', message: 'handleMarkComplete is handled by Next.js API.' };
}

// ─────────────────────────────────────────────
// SHIFT WORKFLOW
// ─────────────────────────────────────────────

function getShiftStatus(tech) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PWA_SHEETS.TIME_RECORDS);
  var data  = sheet.getDataRange().getValues();
  
  for (var r = data.length - 1; r >= 1; r--) {
    var row = data[r];
    if (String(row[TM_COL.TECH_ID]) !== tech.badge) continue;
    if (row[TM_COL.JOB_ID] !== 'SHIFT') continue;
    
    if (row[TM_COL.STATUS] === 'active') {
      return {
        success: true,
        status: 'clocked-in',
        shift: {
          shiftId:   row[TM_COL.RECORD_ID],
          startTime: row[TM_COL.CLOCK_IN],
          date:      row[TM_COL.DATE]
        }
      };
    }
    // If most recent is completed, they are idle
    if (row[TM_COL.STATUS] === 'completed') break;
  }
  
  return { success: true, status: 'idle' };
}

function handleStartShift(body, tech) {
  var existing = getShiftStatus(tech);
  if (existing.status === 'clocked-in') {
    return { success: false, error: 'ALREADY_CLOCKED_IN' };
  }

  var now = new Date();
  var recordId = 'SH-' + now.getTime();
  var dateStr = Utilities.formatDate(now, 'America/Los_Angeles', 'yyyy-MM-dd');
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PWA_SHEETS.TIME_RECORDS);
  var row = [];
  row[TM_COL.RECORD_ID] = recordId;
  row[TM_COL.JOB_ID]    = 'SHIFT';
  row[TM_COL.TECH_ID]   = tech.badge;
  row[TM_COL.TECH_NAME] = tech.name;
  row[TM_COL.CLOCK_IN]  = now.toISOString();
  row[TM_COL.CLOCK_OUT] = '';
  row[TM_COL.DATE]      = dateStr;
  row[TM_COL.STATUS]    = 'active';
  row[TM_COL.ENTITY_ID] = tech.entityId || 'APT-CA';
  
  // Fill blanks for the rest
  for (var i = 0; i < 30; i++) if (row[i] === undefined) row[i] = '';
  
  sheet.appendRow(row);

  fireComplianceWebhook(tech.name, tech.badge, 'startShift', null, dateStr, tech.hourlyRate);
  
  return { success: true, shiftId: recordId, startTime: now.toISOString(), techName: tech.name };
}

function handleEndShift(body, tech) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PWA_SHEETS.TIME_RECORDS);
  var data  = sheet.getDataRange().getValues();
  var now   = new Date();
  
  for (var r = data.length - 1; r >= 1; r--) {
    var row = data[r];
    if (String(row[TM_COL.TECH_ID]) === tech.badge && row[TM_COL.JOB_ID] === 'SHIFT' && row[TM_COL.STATUS] === 'active') {
      sheet.getRange(r + 1, TM_COL.CLOCK_OUT + 1).setValue(now.toISOString());
      sheet.getRange(r + 1, TM_COL.STATUS + 1).setValue('completed');
      
      fireComplianceWebhook(tech.name, tech.badge, 'endShift', null, row[TM_COL.DATE], tech.hourlyRate);
      return { success: true, endTime: now.toISOString() };
    }
  }
  
  return { success: false, error: 'NO_ACTIVE_SHIFT' };
}

// ─────────────────────────────────────────────
// RECEIPT UPLOAD
// ─────────────────────────────────────────────

function handleUploadReceipt(body, tech) {
  var jobId       = String(body.jobId    || '').trim();
  var photoBase64 = String(body.photoBase64 || '').trim();
  var fileName    = String(body.fileName || 'receipt.jpg').trim();

  if (!photoBase64) return { success: false, error: 'UPLOAD_FAILED', message: 'No photo data.' };

  try {
    // Strip data URI prefix if present
    var base64Data = photoBase64.replace(/^data:image\/\w+;base64,/, '');
    var blob       = Utilities.newBlob(Utilities.base64Decode(base64Data), 'image/jpeg', fileName);

    var folder = getReceiptsFolder(jobId);
    var file   = folder.createFile(blob);
    file.setName(tech.badge + '_' + fileName);

    var fileId  = file.getId();
    var fileUrl = file.getUrl();

    // Append file ID to Time Records receipt column for this job+tech
    appendReceiptId(jobId, tech.badge, fileId);

    return { success: true, driveFileId: fileId, driveFileUrl: fileUrl };
  } catch(err) {
    Logger.log('uploadReceipt error: ' + err.message);
    return { success: false, error: 'UPLOAD_FAILED', message: err.message };
  }
}

// ─────────────────────────────────────────────
// FLAG ISSUE
// ─────────────────────────────────────────────

function handleFlagIssue(body, tech) {
  var jobId = String(body.jobId || '').trim();
  var notes = String(body.notes || '').trim();
  if (!notes) return { success: false, error: 'SERVER_ERROR', message: 'Notes required.' };

  var dq      = getDispatchQueueSheet();
  var data    = dq.getDataRange().getValues();
  var flagTag = '[FLAGGED by ' + tech.name + ' ' + new Date().toISOString() + ': ' + notes + ']';

  for (var r = 1; r < data.length; r++) {
    var rowJobId = String(data[r][DQ_COL.LEAD_ID] || '').trim();
    if (rowJobId !== jobId) continue;

    var existing = String(data[r][DQ_COL.NOTES] || '').trim();
    dq.getRange(r + 1, DQ_COL.NOTES + 1).setValue(existing ? existing + '\n' + flagTag : flagTag);
    return { success: true, message: 'Issue flagged.' };
  }

  return { success: false, error: 'JOB_NOT_FOUND' };
}

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function isTechMatch(assignedCell, badge, techName) {
  // Support crew: semicolon-separated (new) or comma-separated (legacy)
  // Accepts both "Name #Badge" format and name-only (CC2.0 assignment path)
  var segments = String(assignedCell || '').split(/[;,]/);
  return segments.some(function(seg) {
    var trimmed = seg.trim();
    var m = trimmed.match(/#(\d+)/);
    if (m) return m[1] === String(badge);
    // Name-only fallback: match tech name case-insensitively
    return techName ? trimmed.toLowerCase() === String(techName).toLowerCase() : false;
  });
}

function findActiveRecord(jobId, badge) {
  var tmSheet = getTimeRecordsSheet();
  var data    = tmSheet.getDataRange().getValues();
  for (var r = data.length - 1; r >= 1; r--) {
    var row    = data[r];
    var status = String(row[TM_COL.STATUS]  || '').trim();
    var rJobId = String(row[TM_COL.JOB_ID]  || '').trim();
    var rBadge = String(row[TM_COL.TECH_ID] || '').trim();
    if (rJobId === jobId && rBadge === String(badge) &&
        (status === 'active' || status === 'on-break')) {
      return rowToTimeRecord(row);
    }
  }
  return null;
}

function findActiveTechRecord(badge) {
  var tmSheet = getTimeRecordsSheet();
  var data    = tmSheet.getDataRange().getValues();
  for (var r = data.length - 1; r >= 1; r--) {
    var row    = data[r];
    var status = String(row[TM_COL.STATUS]  || '').trim();
    var rBadge = String(row[TM_COL.TECH_ID] || '').trim();
    if (rBadge === String(badge) && (status === 'active' || status === 'on-break')) {
      return rowToTimeRecord(row);
    }
  }
  return null;
}

function findAndLockRecord(recordId, badge) {
  var tmSheet = getTimeRecordsSheet();
  var data    = tmSheet.getDataRange().getValues();
  for (var r = 1; r < data.length; r++) {
    var row   = data[r];
    var recId = String(row[TM_COL.RECORD_ID] || '').trim();
    var rBadge = String(row[TM_COL.TECH_ID]  || '').trim();
    if (recId !== recordId) continue;
    if (rBadge !== String(badge)) return { found: false, error: 'INVALID_TOKEN' };
    return { found: true, row: row, sheetRow: r + 1 };
  }
  return { found: false, error: 'NOT_CLOCKED_IN' };
}

function getJobById(jobId) {
  var dq   = getDispatchQueueSheet();
  var data = dq.getDataRange().getValues();
  for (var r = 1; r < data.length; r++) {
    var rowId = String(data[r][DQ_COL.LEAD_ID] || '').trim();
    if (rowId !== jobId) continue;
    var sched = String(data[r][DQ_COL.SCHED] || '').trim();
    return {
      jobId:          jobId,
      serviceCategory: String(data[r][DQ_COL.CATEGORY]    || '').trim(),
      address:        String(data[r][DQ_COL.ADDRESS]       || '').trim(),
      unit:           String(data[r][DQ_COL.UNIT]          || '').trim(),
      description:    String(data[r][DQ_COL.DESCRIPTION]   || '').trim(),
      scheduledDate:  sched.split('|')[0] || '',
      scheduledTime:  sched.split('|')[1] || '',
      estimatedHours: parseFloat(data[r][DQ_COL.EST_HOURS] || 0),
      status:         String(data[r][DQ_COL.STATUS]        || '').trim(),
      rmName:         String(data[r][DQ_COL.RM_NAME]       || '').trim(),
      accessInfo:     String(data[r][DQ_COL.ACCESS]        || '').trim(),
      tenantName:     String(data[r][DQ_COL.TENANT_NAME]   || '').trim(),
      tenantPhone:    String(data[r][DQ_COL.TENANT_PHONE]  || '').trim()
    };
  }
  return null;
}

function updateJobStatus(body, tech) {
  return { success: false, error: 'DEPRECATED', message: 'updateJobStatus is handled by Next.js API.' };
}

function appendReceiptId(jobId, badge, fileId) {
  var tmSheet = getTimeRecordsSheet();
  var data    = tmSheet.getDataRange().getValues();
  for (var r = data.length - 1; r >= 1; r--) {
    var rJobId = String(data[r][TM_COL.JOB_ID]  || '').trim();
    var rBadge = String(data[r][TM_COL.TECH_ID]  || '').trim();
    var status = String(data[r][TM_COL.STATUS]   || '').trim();
    if (rJobId !== jobId || rBadge !== String(badge)) continue;
    if (status === 'complete') continue;
    var existing = String(data[r][TM_COL.RECEIPT_IDS] || '').trim();
    tmSheet.getRange(r + 1, TM_COL.RECEIPT_IDS + 1)
      .setValue(existing ? existing + ',' + fileId : fileId);
    return;
  }
}

function rowToTimeRecord(row) {
  return {
    recordId:            String(row[TM_COL.RECORD_ID]    || ''),
    jobId:               String(row[TM_COL.JOB_ID]       || ''),
    techId:              String(row[TM_COL.TECH_ID]       || ''),
    clockInTime:         row[TM_COL.CLOCK_IN]  ? new Date(row[TM_COL.CLOCK_IN]).toISOString()  : null,
    clockOutTime:        row[TM_COL.CLOCK_OUT] ? new Date(row[TM_COL.CLOCK_OUT]).toISOString() : null,
    breakStart:          row[TM_COL.BREAK_START] ? new Date(row[TM_COL.BREAK_START]).toISOString() : null,
    breakEnd:            row[TM_COL.BREAK_END]   ? new Date(row[TM_COL.BREAK_END]).toISOString()   : null,
    breakDurationMinutes: parseFloat(row[TM_COL.BREAK_MINUTES] || 0),
    actualHoursWorked:   row[TM_COL.ACTUAL_HOURS] ? parseFloat(row[TM_COL.ACTUAL_HOURS]) : null,
    status:              String(row[TM_COL.STATUS] || '')
  };
}

function getReceiptsFolder(jobId) {
  var rootName   = 'APT Job Receipts';
  var rootFolder;
  var roots = DriveApp.getFoldersByName(rootName);
  rootFolder = roots.hasNext() ? roots.next() : DriveApp.createFolder(rootName);

  var jobFolders = rootFolder.getFoldersByName(jobId);
  return jobFolders.hasNext() ? jobFolders.next() : rootFolder.createFolder(jobId);
}

function generateToken() {
  return Utilities.getUuid();
}

function hashPin(pin) {
  var raw = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(pin));
  return raw.map(function(b) {
    return ('0' + (b & 0xff).toString(16)).slice(-2);
  }).join('');
}

function hashToken(token) {
  var bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, token);
  return bytes.map(function(b) {
    return ('0' + (b & 0xFF).toString(16)).slice(-2);
  }).join('');
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ─────────────────────────────────────────────
// SHEET ACCESSORS
// ─────────────────────────────────────────────

function getTechRosterSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PWA_SHEETS.TECH_ROSTER);
}

function getDispatchQueueSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PWA_SHEETS.DISPATCH_QUEUE);
}

function getTimeRecordsSheet() {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(PWA_SHEETS.TIME_RECORDS);
  if (!sheet) { setupPWASheets(); sheet = ss.getSheetByName(PWA_SHEETS.TIME_RECORDS); }
  return sheet;
}

function getJobPerformanceSheet() {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(PWA_SHEETS.JOB_PERFORMANCE);
  if (!sheet) { setupPWASheets(); sheet = ss.getSheetByName(PWA_SHEETS.JOB_PERFORMANCE); }
  return sheet;
}

// ─────────────────────────────────────────────
// SETUP — run once before going live
// ─────────────────────────────────────────────

function setupPWASheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // Time Records
  if (!ss.getSheetByName(PWA_SHEETS.TIME_RECORDS)) {
    var tmSheet = ss.insertSheet(PWA_SHEETS.TIME_RECORDS);
    var tmHeaders = [
      'Record ID', 'Job ID', 'Tech Badge #', 'Tech Name',
      'Service Category', 'Address', 'Unit',
      'Clock In', 'Clock Out', 'Break Start', 'Break End',
      'Break Duration (min)', 'Actual Hours', 'Est. Hours',
      'Status', 'Notes', 'Receipt File IDs', 'Meal Warning', 'Date',
      'Lat In', 'Lng In', 'Lat Out', 'Lng Out'
    ];
    tmSheet.getRange(1, 1, 1, tmHeaders.length).setValues([tmHeaders])
      .setBackground('#1a1a2e').setFontColor('#ffffff').setFontWeight('bold');
    tmSheet.setFrozenRows(1);
    Logger.log('Time Records sheet created.');
  }

  // Job Performance History
  if (!ss.getSheetByName(PWA_SHEETS.JOB_PERFORMANCE)) {
    var jpSheet = ss.insertSheet(PWA_SHEETS.JOB_PERFORMANCE);
    var jpHeaders = [
      'Job ID', 'Tech Badge #', 'Tech Name', 'Service Category',
      'Address', 'Scheduled Date', 'Completion Date',
      'Est. Hours', 'Actual Hours', 'Variance (Actual - Est)', 'Has Receipt'
    ];
    jpSheet.getRange(1, 1, 1, jpHeaders.length).setValues([jpHeaders])
      .setBackground('#1a1a2e').setFontColor('#ffffff').setFontWeight('bold');
    jpSheet.setFrozenRows(1);
    Logger.log('Job Performance History sheet created.');
  }
}

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

// ─────────────────────────────────────────────
// CC2.0 AUTONOMOUS COMPLIANCE (PHASE 2)
// Logic for automated rest/meal warnings via SMS.
// ─────────────────────────────────────────────

/**
 * Compliance Scanner
 * Intended to be run via a Time-Based Trigger (e.g. every 15m)
 */
function scanComplianceViolations() {
  var tmSheet = getTimeRecordsSheet();
  var data    = tmSheet.getDataRange().getValues();
  var now     = new Date();
  
  for (var r = 1; r < data.length; r++) {
    var row    = data[r];
    var status = String(row[TM_COL.STATUS] || '').trim();
    if (status !== 'active') continue; // Only scan techs currently on a job
    
    var clockIn  = new Date(row[TM_COL.CLOCK_IN]);
    var elapsedM = (now - clockIn) / 60000;
    var badge    = String(row[TM_COL.TECH_ID] || '').trim();
    var techName = String(row[TM_COL.TECH_NAME] || '').trim();
    
    // Check 1: Rest Break due (4.5 hours)
    if (elapsedM >= 270 && elapsedM < 285) {
      triggerComplianceAlert(badge, techName, "REST_BREAK_DUE", "Rest break reminder: You've been working for 4.5 hours. Please take a 10-minute break soon.");
    }
    
    // Check 2: Meal Break imminent (4.75 hours)
    if (elapsedM >= 285 && elapsedM < 300) {
      triggerComplianceAlert(badge, techName, "MEAL_BREAK_URGENT", "URGENT MEAL WARNING: 5-hour CA threshold is approaching. You must start your 30-min meal break within 15 mins to avoid a violation.");
    }
  }
}

function triggerComplianceAlert(techBadge, techName, alertType, message) {
  // 1. Get Phone Number from Roster
  var roster = getTechRosterSheet();
  var rData  = roster.getDataRange().getValues();
  var phone  = '';
  for (var i=1; i<rData.length; i++) {
    if (String(rData[i][TR_COL.BADGE]) === techBadge) {
      phone = String(rData[i][TR_COL.PHONE] || '').trim();
      break;
    }
  }
  
  if (!phone) {
    Logger.log('Compliance Alert Logic: No phone for ' + techName);
    return;
  }
  
  // 2. Prevent Duplicate Alerts (Log to Notes)
  // TODO: Implement a de-duपिंग mechanism using a 'LAST_ALERT' column
  
  // 3. Fire SMS (PHASE 2 CONNECTION PENDING)
  Logger.log('COMPLIANCE ALERT [' + alertType + '] to ' + techName + ' (' + phone + '): ' + message);
  
  /* 
  // TODO: UNCOMMENT WHEN OPENPHONE (OR ACQUIRER) INTEGRATED
  const SMS_PROVIDER_URL = '...'; 
  const API_KEY = '...';
  
  UrlFetchApp.fetch(SMS_PROVIDER_URL, {
    method: 'post',
    payload: { to: phone, body: message, apiKey: API_KEY }
  });
  */
}

// ─────────────────────────────────────────────
// HELPERS (cont)
// ─────────────────────────────────────────────

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

    fireComplianceWebhook(tech.name, tech.badge, 'attestation_signed', recordId, null, tech.hourlyRate);

    return { success: true, signedAt: now };
  }

  return { success: false, error: 'RECORD_NOT_FOUND' };
}

/**
 * Utility to ensure the 7 new PAGA columns exist in the 'Time Records' sheet.
 * Brandon calls this once from GAS IDE after deploying.
 */
function ensureTimecardColumns() {
  var ss      = SpreadsheetApp.getActiveSpreadsheet();
  var tmSheet = ss.getSheetByName(PWA_SHEETS.TIME_RECORDS);
  if (!tmSheet) return;
  
  var headers = tmSheet.getRange(1, 1, 1, Math.max(tmSheet.getLastColumn(), 31)).getValues()[0];

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
    if (!headers[h.col - 1] || headers[h.col - 1] === '') {
      tmSheet.getRange(1, h.col).setValue(h.name);
    }
  });

  Logger.log('ensureTimecardColumns: done. Run from GAS IDE once after deploy.');
}

// ─────────────────────────────────────────────
// NEON SHADOW SYNC
// ─────────────────────────────────────────────

/**
 * Targeted PATCH to /api/jobs/[jobId] — updates only the supplied fields.
 * Uses x-api-key so the PATCH route skips email automation triggers.
 */
function patchJobStatusNeon(jobId, status) {
  var baseUrl = PropertiesService.getScriptProperties().getProperty('DASHBOARD_API_URL');
  var apiKey  = PropertiesService.getScriptProperties().getProperty('DASHBOARD_API_KEY');
  if (!baseUrl || !apiKey) {
    Logger.log('patchJobStatusNeon skipped: DASHBOARD_API_URL or DASHBOARD_API_KEY not set');
    return;
  }
  try {
    var url = baseUrl + '/api/jobs/' + encodeURIComponent(jobId);
    var response = UrlFetchApp.fetch(url, {
      method:          'patch',
      contentType:     'application/json',
      headers:         { 'x-api-key': apiKey },
      payload:         JSON.stringify({ status: status }),
      muteHttpExceptions: true
    });
    Logger.log('patchJobStatusNeon [' + jobId + '] → ' + status + ': ' + response.getContentText());
  } catch (e) {
    Logger.log('patchJobStatusNeon error [' + jobId + ']: ' + e.message);
  }
}

/**
 * Maps a Tech Roster row to a JSON object for Neon sync
 */
function getTechDataFromRow(row) {
  return {
    name:         String(row[TR_COL.NAME] || '').trim(),
    badge:        String(row[TR_COL.BADGE] || '').trim(),
    rank:         String(row[TR_COL.RANK] || '').trim(),
    phone:        String(row[TR_COL.PHONE] || '').trim(),
    pinHash:      String(row[TR_COL.PIN_HASH] || '').trim(),
    sessionToken: String(row[TR_COL.SESSION_TOKEN] || '').trim(),
    tokenExpiry:  row[TR_COL.TOKEN_EXPIRY] ? new Date(row[TR_COL.TOKEN_EXPIRY]).toISOString() : null,
    role:         String(row[TR_COL.ROLE] || 'tech').trim(),
    isActive:     (row[TR_COL.ACTIVE] === true || row[TR_COL.ACTIVE] === 'TRUE'),
    hourlyRate:   parseFloat(row[TR_COL.HOURLY_RATE] || 0),
    pushSub:      String(row[TR_COL.PUSH_SUB] || '').trim(),
    entityId:     String(row[TR_COL.ENTITY_ID] || '').trim(),
    carpentry:    parseFloat(row[TR_COL.CARPENTRY] || 0),
    plumbing:     parseFloat(row[TR_COL.PLUMBING] || 0),
    electrical:   parseFloat(row[TR_COL.ELECTRICAL] || 0),
    finishCarp:   parseFloat(row[TR_COL.FINISH_CARP] || 0),
    structural:   parseFloat(row[TR_COL.STRUCTURAL] || 0),
    landscaping:  parseFloat(row[TR_COL.LANDSCAPING] || 0),
    janitorial:   parseFloat(row[TR_COL.JANITORIAL] || 0)
  };
}

/**
 * Pushes tech data to the Neon shadow-write endpoint
 */
function syncTechToNeon(techData) {
  var baseUrl = PropertiesService.getScriptProperties().getProperty('DASHBOARD_API_URL');
  if (!baseUrl) {
    Logger.log('Sync Tech Skipped: DASHBOARD_API_URL not set');
    return;
  }
  var url = baseUrl + '/api/techs/sync';
  var apiKey = PropertiesService.getScriptProperties().getProperty('DASHBOARD_API_KEY');
  
  try {
    var response = UrlFetchApp.fetch(url, {
      method: 'post',
      contentType: 'application/json',
      headers: { 'DASHBOARD_API_KEY': apiKey },
      payload: JSON.stringify(techData),
      muteHttpExceptions: true
    });
    Logger.log('Sync Tech Result: ' + response.getContentText());
    return JSON.parse(response.getContentText());
  } catch (e) {
    Logger.log('Sync Tech Error: ' + e.message);
    return { success: false, error: e.message };
  }
}

/**
 * Migration utility to backfill all techs to Neon
 */
function bootstrapTechsToNeon() {
  var sheet = getTechRosterSheet();
  var data = sheet.getDataRange().getValues();
  var count = 0;
  
  for (var i = 1; i < data.length; i++) {
    var badge = String(data[i][TR_COL.BADGE] || '').trim();
    if (!badge) continue;
    
    var techData = getTechDataFromRow(data[i]);
    syncTechToNeon(techData);
    count++;
  }
  
  return 'Synced ' + count + ' techs to Neon.';
}

/**
 * Helper to safely convert a value to an ISO string or null
 */
function safeIsoDate(val) {
  if (!val) return null;
  try {
    var d = new Date(val);
    return (d instanceof Date && !isNaN(d.getTime())) ? d.toISOString() : null;
  } catch (e) {
    return null;
  }
}

/**
 * Maps a Dispatch Queue row to a JSON object for Neon sync
 */
function getJobDataFromRow(row) {
  return {
    jobId:          String(row[DQ_COL.LEAD_ID] || '').trim(),
    timestamp:      safeIsoDate(row[DQ_COL.TIMESTAMP]),
    priority:       String(row[DQ_COL.PRIORITY] || '').trim(),
    emailType:      String(row[DQ_COL.EMAIL_TYPE] || '').trim(),
    category:       String(row[DQ_COL.CATEGORY] || '').trim(),
    address:        String(row[DQ_COL.ADDRESS] || '').trim(),
    unit:           String(row[DQ_COL.UNIT] || '').trim(),
    description:    String(row[DQ_COL.DESCRIPTION] || '').trim(),
    timing:         String(row[DQ_COL.TIMING] || '').trim(),
    accessInfo:     String(row[DQ_COL.ACCESS] || '').trim(),
    rmName:         String(row[DQ_COL.RM_NAME] || '').trim(),
    rmEmail:        String(row[DQ_COL.RM_EMAIL] || '').trim(),
    tenantName:     String(row[DQ_COL.TENANT_NAME] || '').trim(),
    tenantPhone:    String(row[DQ_COL.TENANT_PHONE] || '').trim(),
    tenantEmail:    String(row[DQ_COL.TENANT_EMAIL] || '').trim(),
    pte:            String(row[DQ_COL.PTE] || '').trim(),
    estimate:       String(row[DQ_COL.ESTIMATE] || '').trim(),
    tech:           String(row[DQ_COL.TECH] || '').trim(),
    scheduledDate:  safeIsoDate(row[DQ_COL.SCHED]),
    estHours:       parseFloat(row[DQ_COL.EST_HOURS] || 0),
    status:         String(row[DQ_COL.STATUS] || 'Pending').trim(),
    notes:          String(row[DQ_COL.NOTES] || '').trim(),
    gmailMsgId:     String(row[DQ_COL.MSG_ID] || '').trim(),
    calendarEventId: String(row[DQ_COL.CAL_EVENT] || '').trim(),
    tenantPref:     String(row[DQ_COL.TENANT_PREF] || '').trim(),
    tenantPets:     String(row[DQ_COL.TENANT_PETS] || '').trim(),
    wcCode:         String(row[DQ_COL.WC_CODE] || '').trim(),
    entityId:       String(row[DQ_COL.ENTITY_ID] || 'APT-CA').trim()
  };
}

/**
 * Pushes job data to the Neon shadow-write endpoint
 */
function syncJobToNeon(jobData) {
  var baseUrl = PropertiesService.getScriptProperties().getProperty('DASHBOARD_API_URL');
  if (!baseUrl) {
    Logger.log('Sync Job Skipped: DASHBOARD_API_URL not set');
    return;
  }
  var url = baseUrl + '/api/jobs/sync';
  var apiKey = PropertiesService.getScriptProperties().getProperty('DASHBOARD_API_KEY');
  
  try {
    var response = UrlFetchApp.fetch(url, {
      method: 'post',
      contentType: 'application/json',
      headers: { 'DASHBOARD_API_KEY': apiKey },
      payload: JSON.stringify(jobData),
      muteHttpExceptions: true
    });
    var statusCode   = response.getResponseCode();
    var responseText = response.getContentText();
    Logger.log('Sync Job Result (' + statusCode + '): ' + responseText);
    if (statusCode !== 200 && statusCode !== 201) {
      var neonOnly = PropertiesService.getScriptProperties().getProperty('WRITE_PATH_NEON_ONLY') === 'true';
      if (neonOnly) {
        throw new Error('Neon sync failed HTTP ' + statusCode + ' (WRITE_PATH_NEON_ONLY=true): ' + responseText);
      }
      return { success: false, statusCode: statusCode, error: responseText };
    }
    return JSON.parse(responseText);
  } catch (e) {
    Logger.log('Sync Job Error: ' + e.message);
    var neonOnlyErr = PropertiesService.getScriptProperties().getProperty('WRITE_PATH_NEON_ONLY') === 'true';
    if (neonOnlyErr) { throw e; }
    return { success: false, error: e.message };
  }
}

/**
 * Migration utility to backfill all jobs to Neon
 */
function bootstrapJobsToNeon() {
  var sheet = getDispatchQueueSheet();
  var data = sheet.getDataRange().getValues();
  var count = 0;
  
  for (var i = 1; i < data.length; i++) {
    var jobId = String(data[i][DQ_COL.LEAD_ID] || '').trim();
    if (!jobId) continue;
    
    var jobData = getJobDataFromRow(data[i]);
    syncJobToNeon(jobData);
    count++;
  }
  
  return 'Synced ' + count + ' jobs to Neon.';
}

/**
 * Maps a Time Records row to a JSON object for Neon sync
 */
function getTimeRecordDataFromRow(row) {
  return {
    recordId:       String(row[TM_COL.RECORD_ID] || '').trim(),
    jobId:          String(row[TM_COL.JOB_ID] || '').trim(),
    techId:         String(row[TM_COL.TECH_ID] || '').trim(),
    techName:       String(row[TM_COL.TECH_NAME] || '').trim(),
    category:       String(row[TM_COL.CATEGORY] || '').trim(),
    address:        String(row[TM_COL.ADDRESS] || '').trim(),
    unit:           String(row[TM_COL.UNIT] || '').trim(),
    clockIn:        safeIsoDate(row[TM_COL.CLOCK_IN]),
    clockOut:       safeIsoDate(row[TM_COL.CLOCK_OUT]),
    breakStart:     safeIsoDate(row[TM_COL.BREAK_START]),
    breakEnd:       safeIsoDate(row[TM_COL.BREAK_END]),
    breakMinutes:   parseInt(row[TM_COL.BREAK_MINUTES] || 0),
    actualHours:    parseFloat(row[TM_COL.ACTUAL_HOURS] || 0),
    estHours:       parseFloat(row[TM_COL.EST_HOURS] || 0),
    status:         String(row[TM_COL.STATUS] || '').trim(),
    notes:          String(row[TM_COL.NOTES] || '').trim(),
    receiptIds:     String(row[TM_COL.RECEIPT_IDS] || '').trim(),
    mealWarning:    (row[TM_COL.MEAL_WARNING] === true || row[TM_COL.MEAL_WARNING] === 'TRUE'),
    date:           String(row[TM_COL.DATE] || '').trim(),
    latIn:          parseFloat(row[TM_COL.LAT_IN] || 0),
    lngIn:          parseFloat(row[TM_COL.LNG_IN] || 0),
    latOut:         parseFloat(row[TM_COL.LAT_OUT] || 0),
    lngOut:         parseFloat(row[TM_COL.LNG_OUT] || 0),
    entityId:       String(row[TM_COL.ENTITY_ID] || 'APT-CA').trim(),
    attestation:    String(row[TM_COL.ATTESTATION] || '').trim(),
    attestationAt:  safeIsoDate(row[TM_COL.ATTESTATION_AT]),
    supervisorStatus: String(row[TM_COL.SUPERVISOR_STATUS] || '').trim(),
    supervisorId:   String(row[TM_COL.SUPERVISOR_ID] || '').trim(),
    supervisorName: String(row[TM_COL.SUPERVISOR_NAME] || '').trim(),
    supervisorAt:   safeIsoDate(row[TM_COL.SUPERVISOR_AT]),
    disputeReason:  String(row[TM_COL.DISPUTE_REASON] || '').trim()
  };
}

/**
 * Pushes time record data to the Neon shadow-write endpoint
 */
function syncTimeRecordToNeon(trData) {
  var baseUrl = PropertiesService.getScriptProperties().getProperty('DASHBOARD_API_URL');
  if (!baseUrl) {
    Logger.log('Sync TR Skipped: DASHBOARD_API_URL not set');
    return;
  }
  var url = baseUrl + '/api/time-records/sync';
  var apiKey = PropertiesService.getScriptProperties().getProperty('DASHBOARD_API_KEY');
  
  try {
    var response = UrlFetchApp.fetch(url, {
      method: 'post',
      contentType: 'application/json',
      headers: { 'DASHBOARD_API_KEY': apiKey },
      payload: JSON.stringify(trData),
      muteHttpExceptions: true
    });
    Logger.log('Sync TR Result: ' + response.getContentText());
    return JSON.parse(response.getContentText());
  } catch (e) {
    Logger.log('Sync TR Error: ' + e.message);
    return { success: false, error: e.message };
  }
}

/**
 * Migration utility to backfill all time records to Neon
 */
function bootstrapTimeRecordsToNeon() {
  var sheet = getTimeRecordsSheet();
  var data = sheet.getDataRange().getValues();
  var count = 0;
  var skipped = 0;
  
  for (var i = 1; i < data.length; i++) {
    var recordId = String(data[i][TM_COL.RECORD_ID] || '').trim();
    var jobId = String(data[i][TM_COL.JOB_ID] || '').trim();
    var techId = String(data[i][TM_COL.TECH_ID] || '').trim();
    
    if (!recordId) continue;
    
    // Skip rows missing required foreign keys for the database
    if (!jobId || !techId) {
      Logger.log('Skipping TR ' + recordId + ': Missing jobId or techId');
      skipped++;
      continue;
    }
    
    var trData = getTimeRecordDataFromRow(data[i]);
    syncTimeRecordToNeon(trData);
    count++;
  }
  
  return 'Synced ' + count + ' time records. Skipped ' + skipped + ' invalid rows.';
}

/**
 * Sheet Helpers
 */
function getTechRosterSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PWA_SHEETS.TECH_ROSTER);
}
function getDispatchQueueSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PWA_SHEETS.DISPATCH_QUEUE);
}
function getTimeRecordsSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PWA_SHEETS.TIME_RECORDS);
}

// ─────────────────────────────────────────────
// PAGA MEAL PREMIUM AUTOMATION (Sprint 1)
// ─────────────────────────────────────────────

function calculateMealPremiums(record) {
  if (!record.clockIn || !record.clockOut) return { premiumHours: 0, violations: [] };

  var clockIn      = new Date(record.clockIn);
  var clockOut     = new Date(record.clockOut);
  var breakStart   = record.breakStart ? new Date(record.breakStart) : null;
  var breakMinutes = parseFloat(record.breakMinutes || 0);
  
  var elapsedMinutes = (clockOut - clockIn) / 60000;
  var violations = [];
  var premiumHours = 0;

  if (elapsedMinutes > 300) {
    var v1 = null;
    if (breakMinutes < 30) {
      v1 = 'Missed 1st Meal Period';
    } else if (breakStart && (breakStart - clockIn) / 60000 > 300) {
      v1 = 'Late 1st Meal Period';
    }
    
    if (v1) {
      violations.push(v1);
      premiumHours = 1;
    }
  }

  if (elapsedMinutes > 600) {
    if (breakMinutes < 60) {
      violations.push('Missed/Short 2nd Meal Period');
      premiumHours += 1; 
    }
  }

  return { premiumHours: premiumHours, violations: violations };
}

function getTechHourlyRate(techId) {
  var sheet = getTechRosterSheet();
  var data  = sheet.getDataRange().getValues();
  var id    = String(techId || '').trim();
  
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][TR_COL.BADGE]).trim() === id) {
      return parseFloat(data[i][TR_COL.HOURLY_RATE]) || 0;
    }
  }
  return 0;
}
