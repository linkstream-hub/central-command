// DashboardAPI.gs
// Apps Script backend for the Central Command Next.js dashboard.
// Deploy as a SEPARATE web app from the dispatch dashboard and TechPWA.
//   Execute as: Me (User deploying)
//   Who has access: Anyone
//
// SETUP: In Apps Script Script Properties, add:
//   GEMINI_API_KEY      — same key as Code.js
//   DASHBOARD_API_KEY   — any UUID secret; also add to Vercel env as DASHBOARD_API_KEY
//   DASHBOARD_BASE_URL  — base URL for tenant scheduling links (e.g. https://central-command-pi.vercel.app)
//
// Or run setScriptProperties() once from the GAS editor to auto-provision all properties.
//
// CORS: POST requests use Content-Type: text/plain to avoid preflight failures.
//   Body is still JSON. The Next.js server sends all API calls server-side.
//
// AUTH: Every request body must include { apiKey: "<DASHBOARD_API_KEY>" }.
//   Requests without a valid key get 401-equivalent error response.

/**
 * ONE-TIME SETUP: Run this once from the GAS editor (▶ Run → setScriptProperties)
 * to provision all required Script Properties for DashboardAPI.gs.
 *
 * IMPORTANT: Fill in DASHBOARD_API_KEY and GEMINI_API_KEY before running.
 * DASHBOARD_BASE_URL is pre-filled to production; update if the Vercel URL changes.
 */
// ─────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────
var DA_SHEETS = {
  DISPATCH_QUEUE: "Dispatch Queue",
  TECH_ROSTER: "Tech Roster",
  TIME_RECORDS: "Time Records",
  JOB_PERFORMANCE: "Job Performance History",
  HIST_ASSIGNMENTS: "Historical Assignments",
  HIST_INSIGHTS: "Historical Tech Insights",
  MASTER_DIR: "Master Directory",
  TRADE_DURATIONS: "Trade Duration Defaults",
};

var DA_SCHEDULE_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1Rs80CuKTj_KxTYyOKzIQaDHWh3vhdGlrJRMZaBIKGQA/edit";

var DA_GEMINI_MODEL = "gemini-2.5-flash";

// Dispatch Queue — 0-based column indices (matches CLAUDE.md 1-based map minus 1)
var DA_DQ = {
  TIMESTAMP: 0,
  LEAD_ID: 1,
  PRIORITY: 2,
  EMAIL_TYPE: 3,
  CATEGORY: 4,
  ADDRESS: 5,
  UNIT: 6,
  DESC: 7,
  TIMING: 8,
  ACCESS: 9,
  RM_NAME: 10,
  RM_EMAIL: 11,
  TEN_NAME: 12,
  TEN_PHONE: 13,
  PTE: 14,
  ESTIMATE: 15,
  TECH: 16,
  SCHED: 17,
  EST_HRS: 18,
  STATUS: 19,
  NOTES: 20,
  MSG_ID: 21,
  CAL_EVT: 22,
  TEN_EMAIL: 23,
  TEN_PREF: 24,
  TEN_PETS: 25,
  WC_CODE: 26,
  ENTITY_ID: 27,
  TRACKING_TOKEN: 28,
  TENANT_SCHED: 29, // ← NEW (cols 29–30; Claude Code adds headers manually)
};

// Tech Roster — 0-based column indices
var DA_TR = {
  NAME: 0,
  BADGE: 1,
  RANK: 2,
  CARPENTRY: 3,
  PLUMBING: 4,
  ELECTRICAL: 5,
  FINISH_CARP: 6,
  STRUCTURAL: 7,
  LANDSCAPING: 8,
  JANITORIAL: 9,
  PHONE: 10,
  PIN_HASH: 11,
  SESSION_TOKEN: 12,
  TOKEN_EXPIRY: 13,
  ROLE: 14,
  ACTIVE: 15,
  HOURLY_RATE: 16,
  PUSH_SUB: 17,
  ENTITY_ID: 18,
};

// Staff Roster — 0-based column indices
var DA_SR = {
  EMAIL: 0,
  NAME: 1,
  ADMIN: 2,
  DISPATCH: 3,
  PEOPLE: 4,
  FINANCE: 5,
  INTEL: 6,
  ACTIVE: 7,
};

// Service category → Tech Roster skill column mapping
var DA_SKILL_COLS = {
  Carpentry: 3,
  Plumbing: 4,
  Electrical: 5,
  "Finish Carpentry": 6,
  Structural: 7,
  Landscaping: 8,
  Janitorial: 9,
  Turnover: 9,
  "General Repair": 3,
};

// Time Records — 0-based column indices (mirrors TM_COL in TechPWA.gs)
var DA_TM = {
  RECORD_ID: 0,
  JOB_ID: 1,
  TECH_ID: 2,
  TECH_NAME: 3,
  CATEGORY: 4,
  ADDRESS: 5,
  UNIT: 6,
  CLOCK_IN: 7,
  CLOCK_OUT: 8,
  BREAK_START: 9,
  BREAK_END: 10,
  BREAK_MINUTES: 11,
  ACTUAL_HOURS: 12,
  EST_HOURS: 13,
  STATUS: 14,
  NOTES: 15,
  RECEIPT_IDS: 16,
  MEAL_WARNING: 17,
  DATE: 18,
  LAT_IN: 19,
  LNG_IN: 20,
  LAT_OUT: 21,
  LNG_OUT: 22,
  ENTITY_ID: 23,
  ATTESTATION: 24,
  ATTESTATION_AT: 25,
  SUPERVISOR_STATUS: 26,
  SUPERVISOR_ID: 27,
  SUPERVISOR_NAME: 28,
  SUPERVISOR_AT: 29,
  DISPUTE_REASON: 30,
};

// CA compliance thresholds (minutes worked)
var CA_REST_WARNING = 240; // 4 hours — rest break due
var CA_MEAL_WARNING = 300; // 5 hours — meal break required
var CA_MEAL_REQUIRED = 300;
var CA_SECOND_MEAL = 570; // 9.5 hours — second meal required

// ─────────────────────────────────────────────
// HTTP ENTRY POINTS
// ─────────────────────────────────────────────

function doGet(e) {
  try {
    return ContentService.createTextOutput(
      JSON.stringify({
        service: "Central Command Dashboard API",
        version: "1.0",
        status: "ok",
        ts: new Date().toISOString(),
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    GmailApp.sendEmail(
      "brandon@aptmaintenanceinc.com",
      "[DashboardAPI ERROR] " + (err.message || String(err)),
      "Stack: " + (err.stack || "unavailable") + "\n\nAction: GET",
    );
    return daResponse({
      success: false,
      error: "SERVER_ERROR",
      message: err.message,
    });
  }
}

function doPost(e) {
  try {
    var body = {};
    if (e.postData && e.postData.contents) {
      var raw = e.postData.contents.trim();
      if (raw.charAt(0) !== "{" && raw.charAt(0) !== "[") {
        return daResponse({ success: false, error: "INVALID_REQUEST" });
      }
      try {
        body = JSON.parse(raw);
      } catch (parseErr) {
        return daResponse({ success: false, error: "INVALID_JSON" });
      }
    }

    // Public actions — skip API key check (tenant self-scheduling only)
    var action = body.action;
    var publicActions = ["getAvailableSlots", "tenantSelfSchedule"];
    if (!validateApiKey(body.apiKey) && publicActions.indexOf(action) === -1) {
      return daResponse({ success: false, error: "UNAUTHORIZED" });
    }

    // ── Read actions ──────────────────────────────────────────
    if (action === "getDispatchData") return daResponse(getDispatchDataDA());
    if (action === "getJobById") return daResponse(getJobByIdDA(body.jobId));
    if (action === "getTodaySchedule") return daResponse(getTodaySchedule());
    if (action === "getWeekSchedule") return daResponse(getWeekSchedule(body));
    if (action === "getLiveFieldStatus")
      return daResponse(getLiveFieldStatus());
    if (action === "getComplianceStatus")
      return daResponse(getComplianceStatus());
    if (action === "getTechList") return daResponse(getTechListDA());
    if (action === "getTradeDurations")
      return daResponse(getTradeDurationsDA());
    if (action === "getTechAvailability")
      return daResponse(getTechAvailabilityWeekDA(body.weekStart));
    if (action === "getCalendarData")
      return daResponse(getCalendarDataDA(body));
    if (action === "getJobHistory")
      return daResponse(getJobHistory(body.address));
    if (action === "getGmailThread")
      return daResponse(getGmailThreadDA(body.msgId, body.address));
    if (action === "getDraftReply") return daResponse(getDraftReplyDA(body));
    if (action === "validatePasscode")
      return daResponse(validatePasscode(body));
    if (action === "getStaffPermissions")
      return daResponse(getStaffPermissionsDA(body));
    if (action === "getUnprocessedThreads")
      return daResponse(getUnprocessedThreadsDA());

    // ── Write actions ─────────────────────────────────────────
    if (action === "updateJob") return daResponse(updateJobDA(body.job));
    if (action === "archiveJob") return daResponse(archiveJobDA(body.rowIndex));
    if (action === "createManualJob")
      return daResponse(createManualJobDA(body));
    if (action === "replyToThread")
      return daResponse(replyToThreadDA(body.msgId, body.replyBody));
    if (action === "markThreadProcessed")
      return daResponse(markThreadProcessedDA(body.threadId));
    if (action === "suggestTechs") return daResponse(suggestTechsDA(body));
    if (action === "sendSms") return daResponse(sendSmsDA(body));
    if (action === "generateDoc") return daResponse(handleGenerateDoc(body));
    if (action === "savePushSubscription")
      return daResponse(handleSavePushSub(body));

    if (action === "getTimeOffRequests")
      return daResponse(getTimeOffRequestsDA(body));
    if (action === "submitTimeOffRequest")
      return daResponse(submitTimeOffRequestDA(body));
    if (action === "approveTimeOff") return daResponse(approveTimeOffDA(body));
    if (action === "denyTimeOff") return daResponse(denyTimeOffDA(body));
    if (action === "getTimecardApprovalQueue")
      return daResponse(getTimecardApprovalQueueDA(body));
    if (action === "approveTimecard")
      return daResponse(approveTimecardDA(body));
    if (action === "disputeTimecard")
      return daResponse(disputeTimecardDA(body));

    if (action === "submitFeedback")
      return daResponse(handleSubmitFeedback(body));
    if (action === "getFeedback") return daResponse(handleGetFeedback(body));
    if (action === "updateFeedbackStatus")
      return daResponse(handleUpdateFeedbackStatus(body));

    if (action === "getComplianceAlerts")
      return daResponse(getComplianceAlertsDA());
    if (action === "getNotifications")
      return daResponse(getNotificationsDA(body));
    if (action === "getJobComments") return daResponse(getJobCommentsDA(body));
    if (action === "addJobComment") return daResponse(addJobCommentDA(body));
    if (action === "getAvailableSlots")
      return daResponse(getAvailableSlotsDA(body));
    if (action === "tenantSelfSchedule")
      return daResponse(tenantSelfScheduleDA(body));
    if (action === "generateScheduleLink")
      return daResponse(generateScheduleLinkDA(body));

    // ── Sentinel write-back endpoints ──────────────────────────────────────
    if (action === "logSentinelEvent")
      return daResponse(logSentinelEventDA(body));
    if (action === "logComplianceAnomalies")
      return daResponse(logComplianceAnomaliesDA(body));
    if (action === "logWcScanResult")
      return daResponse(logWcScanResultDA(body));
    if (action === "logStaleJobAlert")
      return daResponse(logStaleJobAlertDA(body));

    return daResponse({
      success: false,
      error: "UNKNOWN_ACTION",
      action: action,
    });
  } catch (err) {
    GmailApp.sendEmail(
      "brandon@aptmaintenanceinc.com",
      "[DashboardAPI ERROR] " + (err.message || String(err)),
      "Stack: " +
        (err.stack || "unavailable") +
        "\n\nAction: " +
        (body && body.action ? body.action : "unknown"),
    );
    return daResponse({
      success: false,
      error: "SERVER_ERROR",
      message: err.message,
    });
  }
}

// ─────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────

function validateApiKey(key) {
  var stored =
    PropertiesService.getScriptProperties().getProperty("DASHBOARD_API_KEY");
  if (!stored) return false;
  return key === stored;
}

function getGeminiKey() {
  return (
    PropertiesService.getScriptProperties().getProperty("GEMINI_API_KEY") || ""
  );
}

// ── Passcode validation — reads from Script Properties so creds stay out of repo
// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function daResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function getDQSheet() {
  return SpreadsheetApp.openById(
    "1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4",
  ).getSheetByName(DA_SHEETS.DISPATCH_QUEUE);
}

function getTRSheet() {
  return SpreadsheetApp.openById(
    "1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4",
  ).getSheetByName(DA_SHEETS.TECH_ROSTER);
}

function getTMSheet() {
  return SpreadsheetApp.openById(
    "1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4",
  ).getSheetByName(DA_SHEETS.TIME_RECORDS);
}

// One-shot: backfill scheduledDate (col 18) for Scheduled rows that have a sync note
// but empty col 18. Run once from Apps Script IDE — safe to re-run.
// Translates sheet status strings → frontend JobStatus type names.
// Frontend types.ts uses the new names; sheet may still have old values from before migration.
var STATUS_TO_FRONTEND = {
  Open: "Needs Review",
  "Ready to Schedule": "Ready to Schedule",
  "PTE-Pending": "PTE Required",
  "Tenant Contacted": "PTE Required",
  "Approval Needed": "Awaiting Approval",
  Scheduled: "Scheduled",
  "In Progress": "In Progress",
  Complete: "Complete",
  Archived: "Archived",
};

// Reverse map: frontend status → sheet value for writes.
var STATUS_TO_SHEET = {
  "Needs Review": "Open",
  New: "Open",
  "Ready to Schedule": "Ready to Schedule",
  "PTE Required": "PTE-Pending",
  "Awaiting Approval": "Approval Needed",
  Scheduled: "Scheduled",
  "In Progress": "In Progress",
  Complete: "Complete",
  Archived: "Archived",
};

function normalizeStatusForFrontend(raw) {
  var s = String(raw || "").trim();
  return STATUS_TO_FRONTEND[s] || s || "Needs Review";
}

function normalizeStatusForSheet(frontendStatus) {
  var s = String(frontendStatus || "").trim();
  return STATUS_TO_SHEET[s] || s || "Open";
}

function rowToJob(row, rowIndex) {
  var sched = parseScheduledDate(row[DA_DQ.SCHED]);
  return {
    rowIndex: rowIndex,
    id: String(row[DA_DQ.LEAD_ID] || ""),
    timestamp: String(row[DA_DQ.TIMESTAMP] || ""),
    priority: String(row[DA_DQ.PRIORITY] || "4-STANDARD"),
    emailType: String(row[DA_DQ.EMAIL_TYPE] || ""),
    serviceCategory: String(row[DA_DQ.CATEGORY] || ""),
    address: String(row[DA_DQ.ADDRESS] || ""),
    unit: String(row[DA_DQ.UNIT] || ""),
    description: String(row[DA_DQ.DESC] || ""),
    preferredTiming:
      row[DA_DQ.TIMING] instanceof Date
        ? Utilities.formatDate(
            row[DA_DQ.TIMING],
            Session.getScriptTimeZone(),
            "MMM d, yyyy",
          )
        : String(row[DA_DQ.TIMING] || ""),
    accessInfo: String(row[DA_DQ.ACCESS] || ""),
    rmName: String(row[DA_DQ.RM_NAME] || ""),
    rmEmail: String(row[DA_DQ.RM_EMAIL] || ""),
    tenantName: String(row[DA_DQ.TEN_NAME] || ""),
    tenantPhone: String(row[DA_DQ.TEN_PHONE] || ""),
    pteGranted: String(row[DA_DQ.PTE] || ""),
    estimateNeeded: String(row[DA_DQ.ESTIMATE] || ""),
    assignedTech: String(row[DA_DQ.TECH] || ""),
    scheduledDate: sched.date,
    scheduledTime: sched.time,
    estHours: String(row[DA_DQ.EST_HRS] || ""),
    status: normalizeStatusForFrontend(row[DA_DQ.STATUS]),
    notes: String(row[DA_DQ.NOTES] || "")
      .replace(/\[CONTACTED:[^\]]+\]/g, "")
      .replace(/\s*\[Synced from scheduling sheet [^\]]+\]/g, "")
      .trim(),
    gmailMsgId: String(row[DA_DQ.MSG_ID] || ""),
    calendarEventId: String(row[DA_DQ.CAL_EVT] || ""),
    tenantEmail: String(row[DA_DQ.TEN_EMAIL] || ""),
    tenantPrefContact: String(row[DA_DQ.TEN_PREF] || ""),
    tenantHasPets: String(row[DA_DQ.TEN_PETS] || ""),
    trackingToken: String(row[DA_DQ.TRACKING_TOKEN] || ""),
    tenantScheduled: String(row[DA_DQ.TENANT_SCHED] || "") === "Yes",
    entityId: String(row[DA_DQ.ENTITY_ID] || "APT-CA"),
  };
}

// ─────────────────────────────────────────────
// DISPATCH DATA
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// SCHEDULE VIEWS
// ─────────────────────────────────────────────

// Returns all jobs scheduled today, grouped by tech.
// Shape: { success: true, date: "2026-04-18", byTech: { "TechName": [job, ...] }, unassigned: [job, ...] }
// Returns jobs for the current work week, grouped by tech then date.
// Reads the scheduling sheet tabs directly so future-week assignments are visible
// even before dailyScheduleSheetSync has run and written col 18.
// Shape: { success: true, week: { start, end }, byTech: { "Tech": { "2026-04-18": [job, ...] } }, unassigned: [job, ...] }
// ─────────────────────────────────────────────
// LIVE FIELD STATUS
// ─────────────────────────────────────────────

// Returns all active techs with real-time status: active, on-break, complete (last 4h), or unassigned.
// Shape: { success: true, techs: [{ techId, techName, status, minutesWorked, jobAddress, clockInTime }] }
// ─────────────────────────────────────────────
// COMPLIANCE STATUS
// ─────────────────────────────────────────────

// For every currently-clocked-in tech, returns their CA compliance state.
// Shape: { success: true, records: [{ techId, techName, elapsedMin, breakMin, status, violations }] }
// ─────────────────────────────────────────────
// TECH LIST
// ─────────────────────────────────────────────

// Returns all active techs from Tech Roster.
// Shape: { success: true, techs: [{ name, badge, role, phone, active, skills: { Carpentry: 1, ... } }] }
// ─────────────────────────────────────────────
// JOB HISTORY
// ─────────────────────────────────────────────

// Looks up an address across Dispatch Queue + Historical Assignments to build job history.
// Shape: { success: true, address, matches: [{ source, date, tech, category, status, notes }] }
// ─────────────────────────────────────────────
// UPDATE / ARCHIVE JOB
// ─────────────────────────────────────────────

function createManualJobDA(body) {
  try {
    var sheet = getDQSheet();
    if (!sheet)
      return { success: false, error: "Dispatch Queue sheet not found" };

    var address = String(body.address || "").trim();
    var description = String(body.description || "").trim();
    if (!address || !description)
      return { success: false, error: "address and description are required" };

    var now = new Date();
    var leadId = "MANUAL-" + now.getTime();
    var priority = String(body.priority || "4-STANDARD");
    var unit = String(body.unit || "");
    var category = String(body.serviceCategory || "");
    var rmName = String(body.rmName || "");
    var rmEmail = String(body.rmEmail || "");
    var tenantName = String(body.tenantName || "");
    var tenantPhone = String(body.tenantPhone || "");
    var tenantEmail = String(body.tenantEmail || "");
    var accessInfo = String(body.accessInfo || "");
    var assignedTech = String(body.assignedTech || "");
    var estHours = body.estHours || "";
    var notes = String(body.notes || "Manually entered via schedule page");
    var entityId = String(body.entityId || "APT-CA");

    var scheduledValue = "";
    if (body.scheduledDate) {
      scheduledValue = body.scheduledDate;
      if (body.scheduledTime) scheduledValue += "|" + body.scheduledTime;
    }

    // Status: Scheduled if tech+date provided, otherwise Ready to Schedule
    var status =
      assignedTech && body.scheduledDate ? "Scheduled" : "Ready to Schedule";

    // WC code — resolve from category + tech hourly rate
    var wcCode = "";
    if (assignedTech && category) {
      var hourlyRate = getTechHourlyRateDA(assignedTech);
      wcCode = resolveWCCode(category, hourlyRate);
    }

    // Build 30-column row matching DA_DQ column map exactly
    var newRow = new Array(30).fill("");
    newRow[DA_DQ.TIMESTAMP] = now;
    newRow[DA_DQ.LEAD_ID] = leadId;
    newRow[DA_DQ.PRIORITY] = priority;
    newRow[DA_DQ.EMAIL_TYPE] = "manual_entry";
    newRow[DA_DQ.CATEGORY] = category;
    newRow[DA_DQ.ADDRESS] = address;
    newRow[DA_DQ.UNIT] = unit;
    newRow[DA_DQ.DESC] = description;
    newRow[DA_DQ.TIMING] = "";
    newRow[DA_DQ.ACCESS] = accessInfo;
    newRow[DA_DQ.RM_NAME] = rmName;
    newRow[DA_DQ.RM_EMAIL] = rmEmail;
    newRow[DA_DQ.TEN_NAME] = tenantName;
    newRow[DA_DQ.TEN_PHONE] = tenantPhone;
    newRow[DA_DQ.PTE] = "N/A";
    newRow[DA_DQ.ESTIMATE] = "No";
    newRow[DA_DQ.TECH] = assignedTech;
    newRow[DA_DQ.SCHED] = scheduledValue;
    newRow[DA_DQ.EST_HRS] = estHours;
    newRow[DA_DQ.STATUS] = status;
    newRow[DA_DQ.NOTES] = notes;
    newRow[DA_DQ.MSG_ID] = "";
    newRow[DA_DQ.CAL_EVT] = "";
    newRow[DA_DQ.TEN_EMAIL] = tenantEmail;
    newRow[DA_DQ.TEN_PREF] = "";
    newRow[DA_DQ.TEN_PETS] = "";
    newRow[DA_DQ.WC_CODE] = wcCode;
    newRow[DA_DQ.ENTITY_ID] = entityId;
    newRow[DA_DQ.TRACKING_TOKEN] = "";
    newRow[DA_DQ.TENANT_SCHED] = false;

    sheet.appendRow(newRow);

    // Sync to Neon — added Phase 13: ensures manually-created jobs appear in /live after write-path flip
    try {
      var baseUrl = PropertiesService.getScriptProperties().getProperty('DASHBOARD_BASE_URL') || 'https://dispatch.aptmaintenanceinc.com';
      var apiKey  = PropertiesService.getScriptProperties().getProperty('DASHBOARD_API_KEY');
      if (apiKey) {
        var jobData = {
          jobId:        leadId,
          timestamp:    now,
          priority:     priority,
          emailType:    'manual_entry',
          category:     category,
          address:      address,
          unit:         unit,
          description:  description,
          accessInfo:   accessInfo,
          rmName:       rmName,
          rmEmail:      rmEmail,
          tenantName:   tenantName,
          tenantPhone:  tenantPhone,
          tenantEmail:  tenantEmail,
          tech:         assignedTech,
          scheduledDate: body.scheduledDate || '',
          scheduledTime: body.scheduledTime || '',
          estHours:     parseFloat(estHours) || 0,
          status:       status,
          notes:        notes,
          wcCode:       wcCode,
          entityId:     entityId
        };
        UrlFetchApp.fetch(baseUrl + '/api/jobs/sync', {
          method:          'post',
          contentType:     'application/json',
          headers:         { 'DASHBOARD_API_KEY': apiKey },
          payload:         JSON.stringify(jobData),
          muteHttpExceptions: true
        });
      }
    } catch (e) {
      Logger.log('createManualJobDA Neon sync failed: ' + e.message);
    }

    // Apply row color matching updateJobDA
    var newRowIndex = sheet.getLastRow();
    var range = sheet.getRange(newRowIndex, 1, 1, 30);
    if (status === "Scheduled") range.setBackground("#D4EDDA");
    else range.setBackground("#111318");

    // Fire push notification if tech assigned with a date
    if (assignedTech && body.scheduledDate) {
      var techRow = getTechRowByName(assignedTech);
      if (techRow && techRow[DA_TR.PUSH_SUB]) {
        try {
          var sub = JSON.parse(techRow[DA_TR.PUSH_SUB]);
          var pushPayload = {
            title: "New Job Assigned",
            body:
              "You have been scheduled at " +
              address +
              " on " +
              body.scheduledDate +
              ".",
            url: "/jobs",
          };
          var dashBase =
            PropertiesService.getScriptProperties().getProperty(
              "DASHBOARD_BASE_URL",
            ) || "https://dispatch.aptmaintenanceinc.com";
          UrlFetchApp.fetch(dashBase + "/api/push/send", {
            method: "post",
            contentType: "application/json",
            payload: JSON.stringify({
              subscription: sub,
              payload: pushPayload,
            }),
            muteHttpExceptions: true,
          });
        } catch (e) {
          Logger.log("Push failed for manual job: " + e);
        }
      }
    }

    return {
      success: true,
      rowIndex: newRowIndex,
      leadId: leadId,
      status: status,
    };
  } catch (e) {
    Logger.log("createManualJobDA error: " + e.message);
    return { success: false, error: e.message };
  }
}

// ─────────────────────────────────────────────
// GMAIL THREAD
// ─────────────────────────────────────────────

/**
 * Strips quoted reply chains from email plain text.
 * Removes:
 *   - Lines starting with ">" (standard plaintext quoting)
 *   - The "On [date], [person] wrote:" attribution line and everything after it
 *   - Gmail/Apple Mail forwarded header blocks ("---------- Forwarded message ---------")
 * Preserves the first occurrence of a forwarded block in the FIRST message only (index 0).
 */
function stripQuotedText(body, isFirstMessage) {
  if (!body) return "";

  var lines = body.split("\n");
  var result = [];
  var i = 0;

  while (i < lines.length) {
    var line = lines[i];
    var trimmed = line.trim();

    // "On [date] ... wrote:" attribution — signals start of quoted block.
    // Gmail sometimes wraps this across two lines; check next line too.
    if (/^On .+wrote:\s*$/i.test(trimmed)) {
      break; // Everything from here is quoted
    }
    if (
      /^On .+,\s*$/.test(trimmed) &&
      i + 1 < lines.length &&
      /wrote:\s*$/i.test(lines[i + 1].trim())
    ) {
      break; // Two-line attribution — stop here
    }

    // Standard > quoting
    if (trimmed.startsWith(">")) {
      i++;
      continue;
    }

    // Forwarded message header block — keep in first message only
    if (/^-{5,}\s*(Forwarded|Original)\s+message/i.test(trimmed)) {
      if (isFirstMessage) {
        // Include the forwarded header + its content (no stripping inside forwarded blocks)
        result.push(line);
        i++;
        continue;
      } else {
        break; // Replies: cut at the forwarded block
      }
    }

    result.push(line);
    i++;
  }

  // Trim trailing blank lines
  while (result.length > 0 && result[result.length - 1].trim() === "") {
    result.pop();
  }

  return result.join("\n");
}

/**
 * Saves a GmailAttachment to Drive under APT Email Attachments/{address}/
 * Returns the file's shareable URL, or null on failure.
 */
function saveAttachmentToDrive(attachment, address) {
  try {
    var rootFolderName = "APT Email Attachments";
    var rootFolders = DriveApp.getFoldersByName(rootFolderName);
    var rootFolder = rootFolders.hasNext()
      ? rootFolders.next()
      : DriveApp.createFolder(rootFolderName);

    // Sanitize address for use as folder name
    var folderName = (address || "Attachments")
      .replace(/[\/\\:*?"<>|]/g, "")
      .trim()
      .substring(0, 100);
    var subFolders = rootFolder.getFoldersByName(folderName);
    var subFolder = subFolders.hasNext()
      ? subFolders.next()
      : rootFolder.createFolder(folderName);

    // Deduplicate filename
    var baseName = attachment.getName();
    var fileName = baseName;
    var counter = 1;
    while (subFolder.getFilesByName(fileName).hasNext()) {
      var dot = baseName.lastIndexOf(".");
      fileName =
        dot !== -1
          ? baseName.substring(0, dot) + "_" + counter + baseName.substring(dot)
          : baseName + "_" + counter;
      counter++;
    }

    var file = subFolder.createFile(attachment.copyBlob());
    file.setName(fileName);
    file.setSharing(DriveApp.Access.DOMAIN, DriveApp.Permission.VIEW);

    return file.getDownloadUrl();
  } catch (e) {
    Logger.log("saveAttachmentToDrive error: " + e.message);
    return null;
  }
}

function getGmailThreadDA(msgId, address) {
  if (!msgId) return { success: false, error: "msgId required" };
  try {
    var message = GmailApp.getMessageById(msgId);
    if (!message) return { success: false, error: "Message not found" };

    var thread = message.getThread();
    var messages = thread.getMessages();

    var result = messages.map(function (m, index) {
      var rawFrom = m.getFrom();
      var emailMatch = rawFrom.match(/<([^>]+)>/);
      var fromEmail = emailMatch ? emailMatch[1] : rawFrom;
      var fromName = emailMatch
        ? rawFrom
            .replace(/<[^>]+>/, "")
            .trim()
            .replace(/^"|"$/g, "")
        : rawFrom;

      // ── Body: strip quoted chains ──────────────────────────────
      var rawBody = m.getPlainBody();
      if (!rawBody || rawBody.trim() === "") {
        rawBody = m
          .getBody()
          .replace(/<[^>]+>/g, " ")
          .replace(/\s{2,}/g, " ")
          .trim();
      }
      var body = stripQuotedText(rawBody, index === 0);
      if (body.length > 8000) {
        body = body.substring(0, 8000) + "\n\n[Message truncated]";
      }

      // ── Attachments → Google Drive ──────────────────────────────
      var attachments = [];
      try {
        var rawAttachments = m.getAttachments();
        rawAttachments.forEach(function (att) {
          var mimeType = att.getContentType();
          var sizeBytes = att.getSize();
          var isImage = mimeType.indexOf("image/") === 0;

          var attObj = {
            name: att.getName(),
            mimeType: mimeType,
            size: sizeBytes,
            url: null,
          };

          // Save to Drive and get a shareable URL
          var driveUrl = saveAttachmentToDrive(att, address);
          if (driveUrl) {
            attObj.url = driveUrl;
          }

          attachments.push(attObj);
        });
      } catch (attErr) {
        Logger.log(
          "getAttachments error for msg " + m.getId() + ": " + attErr.message,
        );
      }

      return {
        id: m.getId(),
        from: fromName || fromEmail,
        fromEmail: fromEmail,
        toEmail: m.getTo(),
        date: Utilities.formatDate(
          m.getDate(),
          Session.getScriptTimeZone(),
          "MMM d, yyyy 'at' h:mm a",
        ),
        subject: m.getSubject(),
        body: body,
        isOutbound:
          fromEmail.toLowerCase().indexOf("aptmaintenanceinc.com") !== -1,
        attachments: attachments,
      };
    });

    return {
      success: true,
      threadId: thread.getId(),
      subject: thread.getFirstMessageSubject(),
      messageCount: messages.length,
      messages: result,
    };
  } catch (e) {
    Logger.log("getGmailThreadDA error: " + e.message);
    return { success: false, error: e.message };
  }
}

function replyToThreadDA(msgId, replyBody) {
  if (!msgId || !replyBody)
    return { success: false, error: "msgId and replyBody required" };
  try {
    var message = GmailApp.getMessageById(msgId);
    if (!message) return { success: false, error: "Message not found" };
    message.getThread().replyAll(replyBody);
    return { success: true };
  } catch (e) {
    Logger.log("replyToThreadDA error: " + e.message);
    return { success: false, error: e.message };
  }
}
function getUnprocessedThreadsDA() {
  try {
    var query =
      "to:" + WORKORDER_EMAIL + " newer_than:2d -label:" + PROCESSED_LABEL;
    var threads = GmailApp.search(query, 0, 10);
    var results = threads.map(function (t) {
      var messages = t.getMessages();
      var lastMsg = messages[messages.length - 1];
      return {
        threadId: t.getId(),
        msgId: lastMsg.getId(),
        from: lastMsg.getFrom(),
        subject: lastMsg.getSubject(),
        body: lastMsg.getPlainBody().substring(0, 5000),
        date: lastMsg.getDate().toISOString(),
      };
    });
    return { success: true, threads: results };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

function markThreadProcessedDA(threadId) {
  if (!threadId) return { success: false, error: "threadId required" };
  try {
    var thread = GmailApp.getThreadById(threadId);
    var label =
      GmailApp.getUserLabelByName(PROCESSED_LABEL) ||
      GmailApp.createLabel(PROCESSED_LABEL);
    thread.addLabel(label);
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// ─────────────────────────────────────────────
// GEMINI DRAFT REPLY
// ─────────────────────────────────────────────

function getDraftReplyDA(body) {
  var apiKey = getGeminiKey();
  if (!apiKey)
    return {
      success: false,
      error: "GEMINI_API_KEY not set",
      subject: "",
      replyBody: "",
    };

  var j = body.jobData || {};
  var replyType = body.replyType || "general";

  var threadPreview = "";
  var originalSubject = "";

  // Load thread preview from Leads sheet if leadId provided
  if (body.leadId) {
    var leadsSheet = SpreadsheetApp.openById(
      "1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4",
    ).getSheetByName("Leads");
    if (leadsSheet) {
      var leadsData = leadsSheet.getDataRange().getValues();
      for (var i = 1; i < leadsData.length; i++) {
        if (String(leadsData[i][1]) === body.leadId) {
          originalSubject = String(leadsData[i][33] || "");
          threadPreview = String(leadsData[i][34] || "");
          break;
        }
      }
    }
  }

  var context =
    "You are drafting a professional email on behalf of APT Maintenance Inc., " +
    "a Bay Area property maintenance company.\n\n" +
    "ORIGINAL EMAIL SUBJECT: " +
    originalSubject +
    "\n" +
    "ORIGINAL EMAIL PREVIEW:\n" +
    threadPreview.substring(0, 1500) +
    "\n\n" +
    "JOB DETAILS:\n" +
    "- Property: " +
    (j.address || "") +
    (j.unit ? " Unit " + j.unit : "") +
    "\n" +
    "- Issue: " +
    (j.description || "") +
    "\n" +
    "- Service Type: " +
    (j.serviceCategory || "") +
    "\n" +
    "- Status: " +
    (j.status || "") +
    "\n" +
    (j.tenantName ? "- Tenant: " + j.tenantName + "\n" : "") +
    (j.tenantPhone ? "- Tenant Phone: " + j.tenantPhone + "\n" : "") +
    (j.rmName ? "- RM: " + j.rmName + "\n" : "") +
    (j.assignedTech ? "- Assigned Tech: " + j.assignedTech + "\n" : "") +
    (j.scheduledDate ? "- Scheduled: " + j.scheduledDate + "\n" : "") +
    "\nREPLY TYPE: " +
    replyType +
    "\n\n";

  var stakeholder = (body.stakeholder || "REQUESTER").toUpperCase();
  var instruction;
  if (stakeholder === "TENANT") {
    instruction =
      "Draft a professional access-coordination email to the tenant at this property. " +
      "Subject: 'Scheduling Maintenance Access to Your Residence'. " +
      "Content: 1) We are reaching out on behalf of their property management team regarding a maintenance service request for their residence. " +
      "2) Our records indicate they prefer to be present while work is completed. " +
      "3) We need to coordinate a date and time that works for them — please reply with availability over the next few days or use the scheduling link provided. " +
      "4) Once a time is confirmed, we will ensure service is completed during the agreed window. " +
      "Do NOT ask for 'permission to enter' — the tenant has already indicated they prefer to be present, so this email is purely about scheduling when they will be home. " +
      "Use their name if available. Keep it professional and under 150 words. " +
      'Signed "APT Maintenance".';
  } else if (stakeholder === "TECH") {
    instruction =
      "Draft a brief field briefing for the assigned technician. " +
      "Summarize the job: property address, issue description, any access notes, and scheduled date/time. " +
      'Keep it under 80 words. Plain text, no greeting needed. Signed "Dispatch".';
  } else {
    instruction =
      "Draft a brief, professional follow-up email to the Resident Manager. " +
      "Acknowledge receipt of the work order, confirm the next steps, " +
      "and provide any scheduling details if available. " +
      "Keep it under 100 words. Do not use internal lead IDs in the subject. " +
      'Use the property address in the subject line. Signed "APT Maintenance".';
  }

  var prompt =
    context +
    instruction +
    "\n\nRespond ONLY with a JSON object in this exact format, no markdown:\n" +
    '{"subject":"...","body":"..."}';

  var url =
    "https://generativelanguage.googleapis.com/v1beta/models/" +
    DA_GEMINI_MODEL +
    ":generateContent?key=" +
    apiKey;

  try {
    var res = UrlFetchApp.fetch(url, {
      method: "POST",
      contentType: "application/json",
      muteHttpExceptions: true,
      payload: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: 600 },
      }),
    });
    var json = JSON.parse(res.getContentText());
    var rawText = json.candidates[0].content.parts[0].text;

    // Extract JSON from response
    var match = rawText.match(/\{[\s\S]*\}/);
    var draft = match ? JSON.parse(match[0]) : {};
    return {
      success: true,
      subject: draft.subject || "",
      replyBody: draft.body || "",
    };
  } catch (e) {
    Logger.log("getDraftReplyDA error: " + e.message);
    return { success: false, error: e.message, subject: "", replyBody: "" };
  }
}

// ─────────────────────────────────────────────
// SUGGEST TECHS
// ─────────────────────────────────────────────

// Scores techs for a job. Mirrors SuggestTechs.js logic.
// Params: { serviceCategory, address, proposedDate }
// Returns: { success: true, suggestions: [{ name, score, reasons, estimatedHrs, availableToday, jobsToday }] }
function suggestTechsDA(params) {
  try {
    var category = params.serviceCategory || "General Repair";
    var address = (params.address || "").toLowerCase().trim();
    var dateStr = params.proposedDate || todayStr();

    var durations = loadDurationsDA();
    var assignments = loadAssignmentsDA();
    var inactive = getInactiveTechNamesDA();
    var avail = getTechAvailabilityDA(dateStr);
    var estHrs = durations[category] || durations["General Repair"] || 4;

    var scores = buildTechScoresDA(
      category,
      address,
      assignments,
      inactive,
      avail,
    );

    if (scores.length === 0) {
      return {
        success: true,
        suggestions: [
          {
            name: "No suggestion available",
            score: 0,
            reasons: ["No historical assignment data for " + category + " yet"],
            estimatedHrs: estHrs,
            availableToday: true,
          },
        ],
      };
    }

    return {
      success: true,
      suggestions: scores.slice(0, 3).map(function (s) {
        return {
          name: s.name,
          score: s.score,
          reasons: s.reasons,
          estimatedHrs: estHrs,
          availableToday: s.availableToday,
          jobsToday: s.jobsToday,
        };
      }),
    };
  } catch (e) {
    Logger.log("suggestTechsDA error: " + e.message);
    return { success: false, error: e.message };
  }
}

function buildTechScoresDA(category, address, assignments, inactive, avail) {
  var techScores = {};

  // Factor 1: Trade frequency (0-50 pts)
  var tradeCounts = assignments["trade||" + category] || {};
  var maxTrade = Math.max.apply(null, Object.values(tradeCounts).concat([1]));
  Object.keys(tradeCounts).forEach(function (tech) {
    if (inactive.indexOf(tech) !== -1) return;
    if (!techScores[tech])
      techScores[tech] = { name: tech, score: 0, reasons: [] };
    var pts = (tradeCounts[tech] / maxTrade) * 50;
    techScores[tech].score += pts;
    techScores[tech].tradeCount = tradeCounts[tech];
    techScores[tech].reasons.push(
      tradeCounts[tech] +
        " prior " +
        category +
        " assignment" +
        (tradeCounts[tech] > 1 ? "s" : ""),
    );
  });

  // Factor 2: Address familiarity (0-30 pts)
  if (address) {
    var addrCounts = assignments["addr||" + address] || {};
    Object.keys(addrCounts).forEach(function (tech) {
      if (inactive.indexOf(tech) !== -1) return;
      if (!techScores[tech])
        techScores[tech] = { name: tech, score: 0, reasons: [] };
      var pts = Math.min(addrCounts[tech] * 10, 30);
      techScores[tech].score += pts;
      techScores[tech].reasons.push(
        "Worked at this address " +
          addrCounts[tech] +
          " time" +
          (addrCounts[tech] > 1 ? "s" : ""),
      );
    });
  }

  // Factor 3: Keith's skill rating (0-20 pts)
  var skillRatings = loadSkillRatingsDA(category);
  Object.keys(skillRatings).forEach(function (tech) {
    if (inactive.indexOf(tech) !== -1) return;
    if (!techScores[tech])
      techScores[tech] = { name: tech, score: 0, reasons: [] };
    var pts = ((4 - skillRatings[tech]) / 3) * 20;
    techScores[tech].score += pts;
    techScores[tech].skillRating = skillRatings[tech];
    if (!techScores[tech].tradeCount) {
      techScores[tech].reasons.push(
        "Skill rank: " +
          skillRatings[tech] +
          "/3 for " +
          category +
          " (1=best)",
      );
    }
  });

  // Factor 4: Availability penalty (-20 pts if overloaded)
  var result = Object.values(techScores);
  result.forEach(function (ts) {
    var jobsToday = avail[ts.name] || 0;
    ts.jobsToday = jobsToday;
    ts.availableToday = jobsToday < 4;
    if (jobsToday >= 4) {
      ts.score -= 20;
      ts.reasons.push("\u26a0 Already has " + jobsToday + " jobs today");
    } else if (jobsToday > 0) {
      ts.reasons.push(
        jobsToday +
          " job" +
          (jobsToday > 1 ? "s" : "") +
          " already scheduled today",
      );
    } else {
      ts.reasons.push("Available today");
    }
  });

  result.sort(function (a, b) {
    return b.score - a.score;
  });
  return result;
}

function loadDurationsDA() {
  var ss = SpreadsheetApp.openById(
    "1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4",
  );
  var sheet = ss.getSheetByName(DA_SHEETS.TRADE_DURATIONS);
  var map = {};
  if (!sheet || sheet.getLastRow() < 2) return map;
  sheet
    .getDataRange()
    .getValues()
    .slice(1)
    .forEach(function (row) {
      var cat = String(row[0] || "").trim();
      var hrs = Number(row[1]);
      if (cat && hrs > 0) map[cat] = hrs;
    });
  return map;
}

function loadAssignmentsDA() {
  var ss = SpreadsheetApp.openById(
    "1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4",
  );
  var result = {};

  // Source 1: Historical Assignments sheet
  var haSheet = ss.getSheetByName(DA_SHEETS.HIST_ASSIGNMENTS);
  if (haSheet && haSheet.getLastRow() >= 2) {
    var haData = haSheet.getDataRange().getValues();
    var COL = {};
    haData[0].forEach(function (h, i) {
      COL[String(h).trim()] = i;
    });
    haData.slice(1).forEach(function (row) {
      var tech = String(row[COL["Tech Name"]] || "").trim();
      var empNum = String(row[COL["Employee #"]] || "").trim();
      var category = String(row[COL["Classified Category"]] || "").trim();
      if (!tech || !category) return;
      var techKey = empNum ? tech + " #" + empNum : tech;
      var tKey = "trade||" + category;
      if (!result[tKey]) result[tKey] = {};
      result[tKey][techKey] = (result[tKey][techKey] || 0) + 1;
    });
  }

  // Source 2: Dispatch Queue (live learning)
  var dqSheet = getDQSheet();
  if (dqSheet && dqSheet.getLastRow() >= 2) {
    var dqData = dqSheet
      .getRange(2, 1, dqSheet.getLastRow() - 1, 20)
      .getValues();
    dqData.forEach(function (row) {
      var category = String(row[4] || "").trim();
      var address = String(row[5] || "")
        .trim()
        .toLowerCase();
      var tech = String(row[16] || "").trim();
      var status = String(row[19] || "").trim();
      if (!tech || !category || status === "Archived") return;
      var tKey = "trade||" + category;
      if (!result[tKey]) result[tKey] = {};
      result[tKey][tech] = (result[tKey][tech] || 0) + 1;
      if (address) {
        var aKey = "addr||" + address;
        if (!result[aKey]) result[aKey] = {};
        result[aKey][tech] = (result[aKey][tech] || 0) + 1;
      }
    });
  }

  return result;
}

function loadSkillRatingsDA(category) {
  var colIdx = DA_SKILL_COLS[category];
  if (colIdx === undefined) colIdx = DA_SKILL_COLS["General Repair"];
  var sheet = getTRSheet();
  var map = {};
  if (!sheet || sheet.getLastRow() < 2) return map;
  var data = sheet.getDataRange().getValues();
  data.slice(1).forEach(function (row) {
    var name = String(row[DA_TR.NAME] || "").trim();
    var active = row[DA_TR.ACTIVE];
    if (!name || active === false || active === "FALSE") return;
    var rating = Number(row[colIdx]);
    if (rating >= 1 && rating <= 3) map[name] = rating;
  });
  return map;
}

function getInactiveTechNamesDA() {
  var sheet = getTRSheet();
  var names = [];
  if (!sheet || sheet.getLastRow() < 2) return names;
  sheet
    .getDataRange()
    .getValues()
    .slice(1)
    .forEach(function (row) {
      var active = row[DA_TR.ACTIVE];
      if (active === false || active === "FALSE") {
        names.push(String(row[DA_TR.NAME] || "").trim());
      }
    });
  return names;
}

function getTechAvailabilityDA(dateStr) {
  var sheet = getDQSheet();
  var avail = {};
  if (!sheet || sheet.getLastRow() < 2) return avail;
  var data = sheet.getDataRange().getValues();
  data.slice(1).forEach(function (row) {
    var status = String(row[DA_DQ.STATUS] || "");
    if (status === "Archived" || status === "Complete") return;
    var rawSched = String(row[DA_DQ.SCHED] || "");
    var schedDate = rawSched.split("|")[0] || "";
    if (schedDate !== dateStr) return;
    var tech = String(row[DA_DQ.TECH] || "").trim();
    if (!tech) return;
    avail[tech] = (avail[tech] || 0) + 1;
  });
  return avail;
}

// ─────────────────────────────────────────────
// SMS — STUB (activates when OpenPhone approved)
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// SCHEDULING SHEET HELPERS (mirrors ScheduleMiner.js — standalone copies)
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// FEEDBACK SYSTEM
// ─────────────────────────────────────────────

function handleSubmitFeedback(body) {
  try {
    var ss = SpreadsheetApp.openById(
      "1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4",
    );
    var sheet = ss.getSheetByName("Dispatcher Feedback");
    if (!sheet) {
      sheet = ss.insertSheet("Dispatcher Feedback");
      sheet.appendRow([
        "Timestamp",
        "Category",
        "Subject",
        "Details",
        "Related Job ID",
        "Status",
        "Admin Notes",
        "Submitted By",
      ]);
      sheet.getRange(1, 1, 1, 8).setFontWeight("bold").setBackground("#f3f3f3");
      sheet.setFrozenRows(1);
    }
    var row = [
      new Date().toISOString(),
      body.category || "General",
      body.subject || "",
      body.details || "",
      body.relatedJobId || "",
      "New",
      "",
      body.submittedBy || "Dispatch",
    ];
    sheet.appendRow(row);
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

function handleGetFeedback(body) {
  try {
    var ss = SpreadsheetApp.openById(
      "1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4",
    );
    var sheet = ss.getSheetByName("Dispatcher Feedback");
    if (!sheet) return { success: true, items: [] };

    var rows = sheet.getDataRange().getValues();
    var items = [];
    for (var i = 1; i < rows.length; i++) {
      var r = rows[i];
      items.push({
        rowIndex: i + 1,
        timestamp: r[0],
        category: r[1],
        subject: r[2],
        details: r[3],
        relatedJobId: r[4],
        status: r[5],
        adminNotes: r[6],
        submittedBy: r[7],
      });
    }
    items.reverse();
    return { success: true, items: items };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

function handleUpdateFeedbackStatus(body) {
  try {
    var ss = SpreadsheetApp.openById(
      "1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4",
    );
    var sheet = ss.getSheetByName("Dispatcher Feedback");
    if (!sheet || !body.rowIndex) throw new Error("Missing sheet or rowIndex");
    if (body.status) sheet.getRange(body.rowIndex, 6).setValue(body.status);
    if (body.adminNotes !== undefined)
      sheet.getRange(body.rowIndex, 7).setValue(body.adminNotes);
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

function parseTechCellDA(text) {
  var lines = text
    .split("\n")
    .map(function (l) {
      return l.trim();
    })
    .filter(Boolean);
  var result = { name: "", employeeNum: "" };
  lines.forEach(function (line, i) {
    if (i === 0) {
      result.name = line.replace(/^["']|["']$/g, "").trim();
      return;
    }
    if (/^#\d+$/.test(line)) result.employeeNum = line.replace("#", "");
  });
  return result;
}

// ─────────────────────────────────────────────
// TRADE DURATIONS
// ─────────────────────────────────────────────

// Returns the full Trade Duration Defaults map for the frontend scheduling picker.
// Shape: { success: true, durations: { "Plumbing": 3, "Carpentry": 4, ... } }
function getTradeDurationsDA() {
  try {
    return { success: true, durations: loadDurationsDA() };
  } catch (e) {
    Logger.log("getTradeDurationsDA error: " + e.message);
    return { success: false, error: e.message, durations: {} };
  }
}

// ─────────────────────────────────────────────
// TECH AVAILABILITY (week view for scheduling picker)
// ─────────────────────────────────────────────

// WC class code map: service category + hourly rate → WC code
// Used when writing completed job records for payroll reporting.
var DA_WC_CODES = {
  Electrical: [
    { code: "5140-1", desc: "Electrical Wiring >= $36/hr", minWage: 36 },
    { code: "5190-1", desc: "Electrical Wiring < $36/hr", minWage: 0 },
  ],
  Plumbing: [
    { code: "5187-1", desc: "Plumbing Operations >= $32/hr", minWage: 32 },
    { code: "5183-1", desc: "Plumbing Operations < $32/hr", minWage: 0 },
  ],
  Carpentry: [
    { code: "5432-1", desc: "Carpentry >= $41/hr", minWage: 41 },
    { code: "5403-1", desc: "Carpentry < $41/hr", minWage: 0 },
  ],
  "General Repair": [
    { code: "5432-1", desc: "Carpentry >= $41/hr", minWage: 41 },
    { code: "5403-1", desc: "Carpentry < $41/hr", minWage: 0 },
  ],
  "Finish Carpentry": [
    { code: "5146-1", desc: "Cabinet/Fixture/Trim Install", minWage: 0 },
  ],
  Painting: [
    { code: "5482-1", desc: "Painting/Wallpaper >= $32/hr", minWage: 32 },
    { code: "5474-1", desc: "Painting/Wallpaper < $32/hr", minWage: 0 },
  ],
  "Painting/Drywall": [
    { code: "5482-1", desc: "Painting/Wallpaper >= $32/hr", minWage: 32 },
    { code: "5474-1", desc: "Painting/Wallpaper < $32/hr", minWage: 0 },
  ],
  Janitorial: [
    { code: "9015-1", desc: "Building Operations - Other", minWage: 0 },
  ],
  Turnover: [
    { code: "9015-1", desc: "Building Operations - Other", minWage: 0 },
  ],
  "Multi-trade": [
    { code: "9015-1", desc: "Building Operations - Other", minWage: 0 },
  ],
};

// Look up a tech's hourly rate from Tech Roster col Q by display name.
// Returns 0 if not found (resolveWCCode treats 0 as lowest wage tier).
function getTechHourlyRateDA(techName) {
  try {
    var sheet = getTRSheet();
    if (!sheet) return 0;
    var data = sheet.getDataRange().getValues();
    var name = (techName || "").trim().toLowerCase();
    for (var i = 1; i < data.length; i++) {
      if ((data[i][DA_TR.NAME] || "").trim().toLowerCase() === name) {
        return Number(data[i][DA_TR.HOURLY_RATE]) || 0;
      }
    }
    return 0;
  } catch (e) {
    Logger.log("getTechHourlyRateDA error: " + e.message);
    return 0;
  }
}

// Resolve WC code for a given category and hourly wage.
function resolveWCCode(category, hourlyWage) {
  var wage = Number(hourlyWage) || 0;
  var tiers = DA_WC_CODES[category] || DA_WC_CODES["General Repair"];
  var sorted = tiers.slice().sort(function (a, b) {
    return b.minWage - a.minWage;
  });
  for (var i = 0; i < sorted.length; i++) {
    if (wage >= sorted[i].minWage) return sorted[i];
  }
  return sorted[sorted.length - 1];
}

// Returns committed hours per tech per day for the next 14 days.
// Used by the scheduling picker to show capacity before dispatch selects a date.
// Shape: { success: true, availability: { "Tech Name": { "2026-04-21": 4.5, ... } } }
function getTechAvailabilityWeekDA(weekStart) {
  try {
    // Build the 5 weekday dates for the requested week
    var weekDates = [];
    var cursor = new Date(
      (weekStart || new Date().toISOString().slice(0, 10)) + "T12:00:00",
    );
    while (weekDates.length < 5) {
      var dow = cursor.getDay();
      if (dow !== 0 && dow !== 6) {
        weekDates.push(
          Utilities.formatDate(cursor, "America/Los_Angeles", "yyyy-MM-dd"),
        );
      }
      cursor.setDate(cursor.getDate() + 1);
    }

    var rangeStart = weekDates[0];
    var rangeEnd = weekDates[weekDates.length - 1];

    // Read TimeOffRequests from TOM sheet
    var tomSS = SpreadsheetApp.openById(TOM_SHEET_ID_DA);
    var torSheet = tomSS.getSheetByName("TimeOffRequests");
    if (!torSheet || torSheet.getLastRow() < 2) {
      return { success: true, outDates: {} };
    }

    var rows = torSheet.getDataRange().getValues().slice(1);
    // outDates: { "Tech Name": ["2026-04-28", "2026-04-29", ...] }
    var outDates = {};

    rows.forEach(function (row) {
      var status = String(row[6] || "").trim();
      if (status !== "Approved") return;

      var empName = String(row[2] || "").trim();
      var startDate = String(row[4] || "")
        .trim()
        .slice(0, 10);
      var endDate = String(row[5] || "")
        .trim()
        .slice(0, 10);

      if (!empName || !startDate || !endDate) return;
      // Check overlap with the week window
      if (endDate < rangeStart || startDate > rangeEnd) return;

      // Enumerate each date in the leave range that falls in the week
      weekDates.forEach(function (d) {
        if (d >= startDate && d <= endDate) {
          if (!outDates[empName]) outDates[empName] = [];
          if (outDates[empName].indexOf(d) === -1) outDates[empName].push(d);
        }
      });
    });

    return { success: true, outDates: outDates };
  } catch (e) {
    Logger.log("getTechAvailabilityWeekDA error: " + e.message);
    return { success: false, error: e.message, outDates: {} };
  }
}

// Unified calendar data for the /calendar page.
// Params: { month: 'YYYY-MM', view: 'dispatch' | 'team' | 'both' }
// Returns:
//   dispatchDays: { 'YYYY-MM-DD': [{ tech, jobCount, estHours, hasUrgent }] }
//   teamDays:     { 'YYYY-MM-DD': [{ name, leaveType }] }
// dispatchDays only populated if view === 'dispatch' || 'both'
// teamDays only populated if view === 'team' || 'both'
function updateMasterDirectoryAccessDA(address, newAccessInfo) {
  try {
    var ss = SpreadsheetApp.openById(
      "1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4",
    );
    var sheet = ss.getSheetByName(DA_SHEETS.MASTER_DIR);
    if (!sheet) return;
    var data = sheet.getDataRange().getValues();
    var addrIdx = 0; // Assuming Address is Col A
    var accessIdx = -1;

    // Auto-detect Access column
    data[0].forEach(function (h, i) {
      if (String(h).toLowerCase().indexOf("access") !== -1) accessIdx = i;
    });

    if (accessIdx === -1) return;

    var searchAddr = String(address).toLowerCase().trim();

    for (var i = 1; i < data.length; i++) {
      var rowAddr = String(data[i][addrIdx] || "")
        .toLowerCase()
        .trim();
      if (
        rowAddr &&
        (searchAddr.indexOf(rowAddr) !== -1 ||
          rowAddr.indexOf(searchAddr) !== -1)
      ) {
        sheet.getRange(i + 1, accessIdx + 1).setValue(newAccessInfo);
        Logger.log("Master Directory access updated for: " + rowAddr);
      }
    }
  } catch (e) {
    Logger.log("updateMasterDirectoryAccessDA error: " + e.message);
  }
}

function testAccess() {
  var ss = SpreadsheetApp.openById(
    "1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4",
  );
  Logger.log("Spreadsheet: " + ss.getName());
  var sheet = ss.getSheetByName("Dispatch Queue");
  Logger.log("Sheet found: " + !!sheet);
  if (sheet) Logger.log("Rows: " + sheet.getLastRow());
}

// ─────────────────────────────────────────────
// TIME OFF MANAGER — Dashboard/HR-facing endpoints
// Backing sheet ID: 1KeDnWdFK3R_nNHMZIEGbx49xBWq02AnEsXOBXArHgbk
// DEPLOY NOTE: Share that sheet with workorder@aptmaintenanceinc.com as Editor
// ─────────────────────────────────────────────

var TOM_SHEET_ID_DA = "1KeDnWdFK3R_nNHMZIEGbx49xBWq02AnEsXOBXArHgbk";
var TOM_TABS_DA = {
  EMPLOYEES: "Employees",
  ACCRUAL_RULES: "AccrualRules",
  TIME_OFF_REQS: "Time Off Requests",
};

function getTomSheetDA(tabName) {
  return SpreadsheetApp.openById(TOM_SHEET_ID_DA).getSheetByName(tabName);
}

function getTomColMapDA(sheet) {
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var map = {};
  headers.forEach(function (h, i) {
    if (h) map[String(h).trim()] = i;
  });
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
    var filterStatus = String((params && params.filterStatus) || "").trim();

    var torSheet = getTomSheetDA(TOM_TABS_DA.TIME_OFF_REQS);
    var torCol = getTomColMapDA(torSheet);
    var torData = torSheet.getDataRange().getValues();

    var empSheet = getTomSheetDA(TOM_TABS_DA.EMPLOYEES);
    var empCol = getTomColMapDA(empSheet);
    var empData = empSheet.getDataRange().getValues();

    var empMap = {};
    for (var e = 1; e < empData.length; e++) {
      var eid = String(empData[e][empCol["Employee ID"]] || "").trim();
      if (eid)
        empMap[eid] = {
          name: String(empData[e][empCol["Full Name"]] || "").trim(),
          email: String(empData[e][empCol["Email"]] || "").trim(),
        };
    }

    var torEmpCol = torCol["Employee ID"];
    var statusCol = torCol["Status"];
    var requests = [];

    for (var r = 1; r < torData.length; r++) {
      var row = torData[r];
      var status = String(row[statusCol] || "").trim();
      if (status === "Cancelled") continue;
      if (filterStatus && status !== filterStatus) continue;

      var req = {};
      Object.keys(torCol).forEach(function (k) {
        var val = row[torCol[k]];
        if (val instanceof Date)
          val = Utilities.formatDate(val, "America/Los_Angeles", "yyyy-MM-dd");
        req[k] = val;
      });
      req._rowIndex = r + 1;
      if (torEmpCol !== undefined) {
        var empId = String(row[torEmpCol] || "").trim();
        req._employee = empMap[empId] || { name: "Unknown", email: "" };
        req._employeeId = empId;
      }
      requests.push(req);
    }

    // Pending first, then by Start Date descending
    requests.sort(function (a, b) {
      var ap = a["Status"] === "Pending" ? 0 : 1;
      var bp = b["Status"] === "Pending" ? 0 : 1;
      if (ap !== bp) return ap - bp;
      return String(b["Start Date"] || "").localeCompare(
        String(a["Start Date"] || ""),
      );
    });

    return { success: true, requests: requests };
  } catch (e) {
    Logger.log("getTimeOffRequestsDA error: " + e.message);
    return { success: false, error: "SERVER_ERROR", message: e.message };
  }
}

// Salaried staff submit via CC2.0 HR page.
// Params: { employeeId, leaveType, requestType, startDate, endDate, hours, reason }
function submitTimeOffRequestDA(body) {
  var employeeId = String(body.employeeId || "").trim();
  var leaveType = String(body.leaveType || "").trim();
  var requestType = String(body.requestType || "Full Day(s)").trim();
  var startDate = String(body.startDate || "").trim();
  var endDate = String(body.endDate || startDate).trim();
  var hours = parseFloat(body.hours || 0);
  var reason = String(body.reason || "").trim();

  if (!employeeId || !leaveType || !startDate)
    return { success: false, error: "MISSING_FIELDS" };
  if (leaveType !== "Vacation" && leaveType !== "Sick")
    return { success: false, error: "INVALID_LEAVE_TYPE" };

  var status = leaveType === "Sick" ? "Approved" : "Pending";
  var legalAlert = leaveType === "Sick" ? "CA_SICK_AUTO_APPROVED" : "";

  try {
    var sheet = getTomSheetDA(TOM_TABS_DA.TIME_OFF_REQS);
    var col = getTomColMapDA(sheet);
    ensureTomColumnDA(sheet, col, "Employee ID");

    var requestId = Utilities.getUuid().toUpperCase();
    var numCols = sheet.getLastColumn();
    var newRow = new Array(numCols).fill("");

    function setCol(name, val) {
      if (col[name] !== undefined) newRow[col[name]] = val;
    }
    setCol("Request ID", requestId);
    setCol("Leave Type", leaveType);
    setCol("Request Type", requestType);
    setCol("Start Date", startDate);
    setCol("End Date", endDate);
    setCol("Hours", hours > 0 ? hours : "");
    setCol("Reason", reason);
    setCol("Status", status);
    setCol("Legal Alert", legalAlert);
    setCol("Employee ID", employeeId);

    sheet.appendRow(newRow);
    return {
      success: true,
      requestId: requestId,
      status: status,
      autoApproved: leaveType === "Sick",
    };
  } catch (e) {
    Logger.log("submitTimeOffRequestDA error: " + e.message);
    return { success: false, error: "SERVER_ERROR", message: e.message };
  }
}

// Ana approves a vacation request.
// Params: { requestId, managerNotes }
function approveTimeOffDA(body) {
  var requestId = String(body.requestId || "").trim();
  var managerNotes = String(body.managerNotes || "").trim();
  if (!requestId) return { success: false, error: "MISSING_FIELDS" };

  try {
    var sheet = getTomSheetDA(TOM_TABS_DA.TIME_OFF_REQS);
    var col = getTomColMapDA(sheet);
    var data = sheet.getDataRange().getValues();
    var ridCol = col["Request ID"];

    for (var r = 1; r < data.length; r++) {
      if (String(data[r][ridCol] || "").trim() !== requestId) continue;
      if (String(data[r][col["Status"]] || "").trim() === "Approved") {
        return { success: true, requestId: requestId, alreadyApproved: true };
      }
      sheet.getRange(r + 1, col["Status"] + 1).setValue("Approved");
      if (managerNotes && col["Manager Notes"] !== undefined) {
        sheet.getRange(r + 1, col["Manager Notes"] + 1).setValue(managerNotes);
      }

      // Calendar blocking on approval
      var empName = String(
        data[r][col["Full Name"]] ||
          data[r][col["Employee Name"]] ||
          "Employee",
      );
      var startDate = String(data[r][col["Start Date"]] || "")
        .trim()
        .slice(0, 10);
      var endDate = String(data[r][col["End Date"]] || startDate)
        .trim()
        .slice(0, 10);

      var calEventId = blockCalendarForLeave(
        empName,
        startDate,
        endDate,
        requestId,
      );
      if (calEventId) {
        // Write calendar event ID back to TOM sheet col 13 (index 12)
        sheet.getRange(r + 1, 13).setValue(calEventId);
      }

      return { success: true, requestId: requestId };
    }
    return { success: false, error: "NOT_FOUND" };
  } catch (e) {
    Logger.log("approveTimeOffDA error: " + e.message);
    return { success: false, error: "SERVER_ERROR", message: e.message };
  }
}

// Ana denies a vacation request. Reason mandatory — PAGA paper trail.
// Sick leave CANNOT be denied (CA Labor Code 246.5).
// Params: { requestId, reason }
function denyTimeOffDA(body) {
  var requestId = String(body.requestId || "").trim();
  var reason = String(body.reason || "").trim();
  if (!requestId) return { success: false, error: "MISSING_FIELDS" };
  if (!reason)
    return {
      success: false,
      error: "REASON_REQUIRED",
      message: "Denial reason required for PAGA compliance.",
    };

  try {
    var sheet = getTomSheetDA(TOM_TABS_DA.TIME_OFF_REQS);
    var col = getTomColMapDA(sheet);
    var data = sheet.getDataRange().getValues();
    var ridCol = col["Request ID"];
    var ltCol = col["Leave Type"];

    for (var r = 1; r < data.length; r++) {
      if (String(data[r][ridCol] || "").trim() !== requestId) continue;
      if (String(data[r][ltCol] || "").trim() === "Sick") {
        return {
          success: false,
          error: "CANNOT_DENY_SICK",
          message: "Sick leave cannot be denied under CA Labor Code 246.5.",
        };
      }

      // Read calendar event ID (col 13) before updating status
      var calEventId = String(data[r][12] || "").trim(); // col 13 is index 12
      if (calEventId) {
        deleteCalendarLeaveBlock(calEventId);
        sheet.getRange(r + 1, 13).setValue(""); // Clear the ID
      }

      sheet.getRange(r + 1, col["Status"] + 1).setValue("Denied");
      if (col["Manager Notes"] !== undefined) {
        sheet.getRange(r + 1, col["Manager Notes"] + 1).setValue(reason);
      }
      return { success: true, requestId: requestId };
    }
    return { success: false, error: "NOT_FOUND" };
  } catch (e) {
    Logger.log("denyTimeOffDA error: " + e.message);
    return { success: false, error: "SERVER_ERROR", message: e.message };
  }
}

// ─────────────────────────────────────────────
// CC2.0 PHASE 3 — DOCGEN INTEGRATION
// Integration with AE_DocGen (Double Great Brain)
// ─────────────────────────────────────────────

function handleGenerateDoc(body) {
  var leadId = body.leadId;
  var docType = body.docType || "ESTIMATE"; // ESTIMATE, WORK_ORDER, INVOICE

  Logger.log("DOCGEN REQUEST: " + docType + " for Lead " + leadId);

  /*
  // TODO: CONNECTION TO AE_DocGen BRAIN REQUIRED
  // This will call the DocGen engine (e.g. Documentero or local AE_DocGen service)
  // to produce a PDF and returned its ID/URL.
  
  const BRAIN_API_URL = '...'; 
  const res = UrlFetchApp.fetch(BRAIN_API_URL, {
    method: 'post',
    payload: { action: 'generate', leadId: leadId, template: docType }
  });
  const data = JSON.parse(res.getContentText());
  */

  return {
    success: true,
    message: "DocGen Engine Triggered (Safety-Gated)",
    url: null, // Would be PDF URL
    status: "PENDING_CONNECTION",
  };
}

// ─────────────────────────────────────────────
// CC2.0 PHASE 4 — PUSH NOTIFICATIONS
// ─────────────────────────────────────────────

function handleSavePushSub(body) {
  var token = body.token;
  var sub = body.subscription;
  if (!token || !sub)
    return { saved: false, error: "Missing token or subscription" };

  var tr = getTRSheet();
  var data = tr.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][DA_TR.SESSION_TOKEN] === token) {
      tr.getRange(i + 1, DA_TR.PUSH_SUB + 1).setValue(JSON.stringify(sub));
      return { saved: true };
    }
  }
  return { saved: false, error: "Token not found" };
}

function getTechRowByName(techNameBadge) {
  var tr = getTRSheet();
  var data = tr.getDataRange().getValues();
  var needle = String(techNameBadge || "")
    .trim()
    .toLowerCase();
  for (var i = 1; i < data.length; i++) {
    // Primary: "Name #Badge" format
    var rowName = (
      data[i][DA_TR.NAME] +
      " #" +
      data[i][DA_TR.BADGE]
    ).toLowerCase();
    if (rowName === needle) return data[i];
    // Fallback: name-only (CC2.0 writes name without badge number)
    var nameOnly = String(data[i][DA_TR.NAME] || "")
      .trim()
      .toLowerCase();
    if (nameOnly === needle) return data[i];
  }
  return null;
}

// ─────────────────────────────────────────────
// CALENDAR INTEGRATION (TOM Phase 2)
// ─────────────────────────────────────────────

function blockCalendarForLeave(empName, startDate, endDate, requestId) {
  try {
    var calId =
      PropertiesService.getScriptProperties().getProperty("APT_HR_CALENDAR_ID");
    if (!calId) return null;

    var start = new Date(startDate + "T00:00:00");
    var end = new Date(endDate + "T00:00:00");
    end.setDate(end.getDate() + 1); // all-day event end is exclusive

    var event = Calendar.Events.insert(
      {
        summary: "TIME OFF — " + empName,
        start: { date: startDate },
        end: {
          date: Utilities.formatDate(end, "America/Los_Angeles", "yyyy-MM-dd"),
        },
        description: "Approved leave. Request ID: " + requestId,
        colorId: "4", // flamingo — visible but not alarming
      },
      calId,
    );

    return event.id;
  } catch (e) {
    Logger.log("blockCalendarForLeave error: " + e.message);
    return null;
  }
}

function deleteCalendarLeaveBlock(calEventId) {
  try {
    var calId =
      PropertiesService.getScriptProperties().getProperty("APT_HR_CALENDAR_ID");
    if (!calId || !calEventId) return;
    Calendar.Events.remove(calId, calEventId);
  } catch (e) {
    Logger.log("deleteCalendarLeaveBlock error: " + e.message);
  }
}

// ─────────────────────────────────────────────
// COMPLIANCE ALERTS
// ─────────────────────────────────────────────

function ensureComplianceAlertsSheet() {
  var ss = SpreadsheetApp.openById(
    "1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4",
  );
  var sheet = ss.getSheetByName("ComplianceAlerts");
  if (!sheet) {
    sheet = ss.insertSheet("ComplianceAlerts");
    sheet
      .getRange(1, 1, 1, 10)
      .setValues([
        [
          "Alert ID",
          "Employee Name",
          "Employee ID",
          "Violation Type",
          "Shift Date",
          "Total Hours",
          "Premium Amount",
          "Status",
          "Created At",
          "Resolved At",
        ],
      ]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, 10).setFontWeight("bold").setBackground("#f3f3f3");
  }
  return sheet;
}

function getComplianceAlertsDA() {
  try {
    var ss = SpreadsheetApp.openById(
      "1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4",
    );
    var sheet = ss.getSheetByName("ComplianceAlerts");
    if (!sheet || sheet.getLastRow() < 2) {
      return { success: true, alerts: [] };
    }

    var today = Utilities.formatDate(
      new Date(),
      "America/Los_Angeles",
      "yyyy-MM-dd",
    );
    var yesterday = Utilities.formatDate(
      new Date(Date.now() - 86400000),
      "America/Los_Angeles",
      "yyyy-MM-dd",
    );
    var rows = sheet.getDataRange().getValues().slice(1);
    var alerts = [];

    rows.forEach(function (row) {
      var status = String(row[7] || "").trim();
      var shiftDate = String(row[4] || "")
        .trim()
        .slice(0, 10);
      if (status !== "Active") return;
      if (shiftDate < yesterday) return; // only show today + yesterday

      alerts.push({
        alertId: String(row[0] || ""),
        employeeName: String(row[1] || ""),
        employeeId: String(row[2] || ""),
        violationType: String(row[3] || ""),
        shiftDate: shiftDate,
        totalHours: Number(row[5]) || 0,
        premiumAmount: Number(row[6]) || 0,
        status: status,
        createdAt: String(row[8] || ""),
      });
    });

    return { success: true, alerts: alerts };
  } catch (e) {
    Logger.log("getComplianceAlertsDA error: " + e.message);
    return { success: false, error: e.message, alerts: [] };
  }
}

// Unified notification aggregator for the bell panel.
// Params: { role: 'dispatch' | 'hr' | 'compliance' | 'management' | 'admin' }
// Returns: { success: true, notifications: Notification[], unreadCount: number }
// Notification shape: { id, type, severity, title, body, timestamp, href }
// Types: 'STALE_JOB' | 'COMPLIANCE' | 'TIME_OFF_PENDING' | 'TIMECARD_PENDING'
// Severity: 'urgent' | 'warning' | 'info'
// ─────────────────────────────────────────────
// JOB COMMENTS (Internal Thread)
// ─────────────────────────────────────────────

function getJobCommentsSheet() {
  var ss = SpreadsheetApp.openById(
    "1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4",
  );
  var sheet = ss.getSheetByName("JobComments");
  if (!sheet) {
    sheet = ss.insertSheet("JobComments");
    sheet
      .getRange(1, 1, 1, 6)
      .setValues([
        ["Comment ID", "Lead ID", "Author", "Role", "Body", "Timestamp"],
      ]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Returns all comments for a given Lead ID, sorted oldest-first.
// Params: { leadId: string }
// Returns: { success: true, comments: JobComment[] }
function getJobCommentsDA(params) {
  try {
    var leadId = String((params && params.leadId) || "").trim();
    if (!leadId)
      return { success: false, error: "MISSING_LEAD_ID", comments: [] };

    var sheet = getJobCommentsSheet();
    if (sheet.getLastRow() < 2) return { success: true, comments: [] };

    var data = sheet.getDataRange().getValues().slice(1);
    var comments = [];

    data.forEach(function (row) {
      if (String(row[1] || "").trim() !== leadId) return;
      var body = String(row[4] || "").trim();
      if (!body) return;
      comments.push({
        id: String(row[0] || "").trim(),
        leadId: String(row[1] || "").trim(),
        author: String(row[2] || "").trim(),
        role: String(row[3] || "").trim(),
        body: body,
        timestamp: String(row[5] || "").trim(),
      });
    });

    // Sort oldest-first (timestamp ascending)
    comments.sort(function (a, b) {
      return String(a.timestamp || "").localeCompare(String(b.timestamp || ""));
    });

    return { success: true, comments: comments };
  } catch (e) {
    Logger.log("getJobCommentsDA error: " + e.message);
    return { success: false, error: e.message, comments: [] };
  }
}

// Appends a new comment to the JobComments sheet.
// Params: { leadId, author, role, body }
// Returns: { success: true, comment: JobComment }
function addJobCommentDA(params) {
  try {
    var leadId = String((params && params.leadId) || "").trim();
    var author = String((params && params.author) || "").trim();
    var role = String((params && params.role) || "dispatch").trim();
    var body = String((params && params.body) || "").trim();

    if (!leadId || !author || !body) {
      return { success: false, error: "MISSING_FIELDS" };
    }
    // Hard cap: 2000 chars per comment
    if (body.length > 2000) body = body.slice(0, 2000);

    var now = new Date();
    var timestamp = Utilities.formatDate(
      now,
      "America/Los_Angeles",
      "yyyy-MM-dd'T'HH:mm:ss",
    );
    var id =
      "c_" + now.getTime() + "_" + Math.random().toString(36).slice(2, 6);

    var sheet = getJobCommentsSheet();
    sheet.appendRow([id, leadId, author, role, body, timestamp]);

    return {
      success: true,
      comment: {
        id: id,
        leadId: leadId,
        author: author,
        role: role,
        body: body,
        timestamp: timestamp,
      },
    };
  } catch (e) {
    Logger.log("addJobCommentDA error: " + e.message);
    return { success: false, error: e.message };
  }
}

// ─────────────────────────────────────────────
// TENANT SELF-SCHEDULING
// ─────────────────────────────────────────────

// Public: returns available tech + time-slot options for a tracked job.
// Params: { token: string }
// Returns: { success: true, job: {...}, availableSlots: [{date, displayLabel, techSlots:[{tech,time}]}] }
function getAvailableSlotsDA(params) {
  try {
    var token = String((params && params.token) || "").trim();
    if (!token) return { success: false, error: "MISSING_TOKEN" };

    var sheet = getDQSheet();
    if (!sheet || sheet.getLastRow() < 2)
      return { success: false, error: "NO_DATA" };

    var data = sheet.getDataRange().getValues();
    var matchRow = null,
      matchIdx = -1;

    data.slice(1).forEach(function (row, i) {
      if (String(row[DA_DQ.TRACKING_TOKEN] || "").trim() === token) {
        matchRow = row;
        matchIdx = i + 2;
      }
    });

    if (!matchRow) return { success: false, error: "INVALID_TOKEN" };

    // Check if already scheduled by tenant
    if (String(matchRow[DA_DQ.TENANT_SCHED] || "") === "Yes") {
      return {
        success: false,
        error: "ALREADY_SCHEDULED",
        alreadyScheduled: true,
      };
    }

    var job = rowToJob(matchRow, matchIdx);

    // Build 5 available business-day slots from tomorrow
    var slots = [];
    var cursor = new Date();
    cursor.setDate(cursor.getDate() + 1); // start from tomorrow
    var slotsAdded = 0;

    while (slotsAdded < 5) {
      var dow = cursor.getDay();
      if (dow !== 0 && dow !== 6) {
        var dateStr = Utilities.formatDate(
          cursor,
          "America/Los_Angeles",
          "yyyy-MM-dd",
        );
        var label = Utilities.formatDate(
          cursor,
          "America/Los_Angeles",
          "EEE, MMM d",
        );
        slots.push({
          date: dateStr,
          displayLabel: label,
          timeOptions: ["08:00 AM", "10:00 AM", "12:00 PM", "02:00 PM"],
        });
        slotsAdded++;
      }
      cursor.setDate(cursor.getDate() + 1);
    }

    return { success: true, job: job, availableSlots: slots };
  } catch (e) {
    Logger.log("getAvailableSlotsDA error: " + e.message);
    return { success: false, error: e.message };
  }
}

// Public: records the tenant's self-scheduled time and notes it in the DQ.
// Params: { token, selectedDate, selectedTime, tenantName }
// Returns: { success: true }
function tenantSelfScheduleDA(params) {
  try {
    var token = String((params && params.token) || "").trim();
    var selectedDate = String((params && params.selectedDate) || "").trim();
    var selectedTime = String((params && params.selectedTime) || "").trim();
    var tenantName = String((params && params.tenantName) || "").trim();

    if (!token || !selectedDate || !selectedTime) {
      return { success: false, error: "MISSING_PARAMS" };
    }

    var sheet = getDQSheet();
    if (!sheet || sheet.getLastRow() < 2)
      return { success: false, error: "NO_DATA" };

    var data = sheet.getDataRange().getValues();
    var matchIdx = -1;

    data.slice(1).forEach(function (row, i) {
      if (String(row[DA_DQ.TRACKING_TOKEN] || "").trim() === token) {
        matchIdx = i + 2;
      }
    });

    if (matchIdx === -1) return { success: false, error: "INVALID_TOKEN" };

    // Write the tenant's preferred date/time into the schedule column and mark tenant-scheduled
    var schedValue = selectedDate + "|" + selectedTime;
    var now = new Date();
    var nowLabel = Utilities.formatDate(
      now,
      "America/Los_Angeles",
      "MMM d, yyyy h:mm a 'PT'",
    );
    var noteAppend =
      "\n[TENANT SELF-SCHEDULED: " +
      schedValue +
      " by " +
      (tenantName || "Tenant") +
      " on " +
      nowLabel +
      "]";

    sheet.getRange(matchIdx, DA_DQ.SCHED + 1).setValue(schedValue);
    sheet.getRange(matchIdx, DA_DQ.TENANT_SCHED + 1).setValue("Yes");
    sheet.getRange(matchIdx, DA_DQ.STATUS + 1).setValue("Ready to Schedule");

    var existingNotes = String(
      sheet.getRange(matchIdx, DA_DQ.NOTES + 1).getValue() || "",
    );
    sheet
      .getRange(matchIdx, DA_DQ.NOTES + 1)
      .setValue(existingNotes + noteAppend);

    return {
      success: true,
      scheduledDate: selectedDate,
      scheduledTime: selectedTime,
    };
  } catch (e) {
    Logger.log("tenantSelfScheduleDA error: " + e.message);
    return { success: false, error: e.message };
  }
}

// Internal (auth-gated): generates a single-use tracking token and writes it to the DQ.
// Params: { rowIndex }
// Returns: { success: true, token, link }
function generateScheduleLinkDA(params) {
  try {
    var rowIndex = Number((params && params.rowIndex) || 0);
    if (!rowIndex) return { success: false, error: "MISSING_ROW_INDEX" };

    var sheet = getDQSheet();
    if (!sheet) return { success: false, error: "NO_SHEET" };

    // Generate a unique token
    var token = Utilities.getUuid().replace(/-/g, "");

    sheet.getRange(rowIndex, DA_DQ.TRACKING_TOKEN + 1).setValue(token);

    var baseUrl =
      PropertiesService.getScriptProperties().getProperty(
        "DASHBOARD_BASE_URL",
      ) || "https://central-command.vercel.app";
    var link = baseUrl + "/schedule/" + token;

    return { success: true, token: token, link: link };
  } catch (e) {
    Logger.log("generateScheduleLinkDA error: " + e.message);
    return { success: false, error: e.message };
  }
}

// ─────────────────────────────────────────────
// SENTINEL WRITE-BACK ENDPOINTS
// ─────────────────────────────────────────────

// Returns or creates the SentinelLog sheet.
function getSentinelLogSheet() {
  var ss = SpreadsheetApp.openById(
    "1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4",
  );
  var sheet = ss.getSheetByName("SentinelLog");
  if (!sheet) {
    sheet = ss.insertSheet("SentinelLog");
    sheet
      .getRange(1, 1, 1, 6)
      .setValues([
        [
          "Timestamp",
          "Sentinel",
          "Event Type",
          "Severity",
          "Summary",
          "Payload",
        ],
      ]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Generic sentinel event logger.
// Params: { sentinel, eventType, severity, summary, payload }
function logSentinelEventDA(params) {
  try {
    var sentinel = String((params && params.sentinel) || "unknown").trim();
    var eventType = String((params && params.eventType) || "INFO").trim();
    var severity = String((params && params.severity) || "info").trim();
    var summary = String((params && params.summary) || "").trim();
    var payload =
      params && params.payload
        ? JSON.stringify(params.payload).slice(0, 2000)
        : "";

    var sheet = getSentinelLogSheet();
    var ts = Utilities.formatDate(
      new Date(),
      "America/Los_Angeles",
      "yyyy-MM-dd'T'HH:mm:ss",
    );
    sheet.appendRow([ts, sentinel, eventType, severity, summary, payload]);

    return { success: true };
  } catch (e) {
    Logger.log("logSentinelEventDA error: " + e.message);
    return { success: false, error: e.message };
  }
}

// Logs compliance anomaly batch from sentinel-time-anomaly.
// Params: { anomalies: [{techId, techName, violationType, detail}] }
function logComplianceAnomaliesDA(params) {
  try {
    var anomalies =
      params && Array.isArray(params.anomalies) ? params.anomalies : [];
    if (anomalies.length === 0) return { success: true, logged: 0 };

    var sheet = getSentinelLogSheet();
    var ts = Utilities.formatDate(
      new Date(),
      "America/Los_Angeles",
      "yyyy-MM-dd'T'HH:mm:ss",
    );

    anomalies.forEach(function (a) {
      var summary =
        "CA violation: " +
        (a.violationType || "UNKNOWN") +
        " — " +
        (a.techName || a.techId);
      sheet.appendRow([
        ts,
        "time-anomaly",
        "COMPLIANCE_VIOLATION",
        "warning",
        summary,
        JSON.stringify(a).slice(0, 500),
      ]);
    });

    return { success: true, logged: anomalies.length };
  } catch (e) {
    Logger.log("logComplianceAnomaliesDA error: " + e.message);
    return { success: false, error: e.message };
  }
}

// Logs WC code scan results from sentinel-wc-scanner.
// Params: { unclassifiedCount, suggestions: [{jobId, suggestedCode, rationale}] }
function logWcScanResultDA(params) {
  try {
    var count = Number((params && params.unclassifiedCount) || 0);
    var suggestions =
      params && Array.isArray(params.suggestions) ? params.suggestions : [];

    var summary = count + " job(s) missing WC codes";
    var sheet = getSentinelLogSheet();
    var ts = Utilities.formatDate(
      new Date(),
      "America/Los_Angeles",
      "yyyy-MM-dd'T'HH:mm:ss",
    );
    sheet.appendRow([
      ts,
      "wc-scanner",
      "WC_SCAN",
      count > 0 ? "warning" : "info",
      summary,
      JSON.stringify(suggestions).slice(0, 1000),
    ]);

    return { success: true };
  } catch (e) {
    Logger.log("logWcScanResultDA error: " + e.message);
    return { success: false, error: e.message };
  }
}

// Logs stale job alerts from sentinel-stale-job.
// Params: { stale: [{jobId, ageHours, status}], missed: [{jobId, scheduledDate}] }
function logStaleJobAlertDA(params) {
  try {
    var stale = params && Array.isArray(params.stale) ? params.stale : [];
    var missed = params && Array.isArray(params.missed) ? params.missed : [];

    var summary =
      stale.length + " stale + " + missed.length + " missed appointment(s)";
    var sheet = getSentinelLogSheet();
    var ts = Utilities.formatDate(
      new Date(),
      "America/Los_Angeles",
      "yyyy-MM-dd'T'HH:mm:ss",
    );
    var payload = JSON.stringify({ stale: stale, missed: missed }).slice(
      0,
      1000,
    );
    var sev = stale.length + missed.length > 0 ? "warning" : "info";
    sheet.appendRow([ts, "stale-job", "STALE_JOB_SCAN", sev, summary, payload]);

    return { success: true };
  } catch (e) {
    Logger.log("logStaleJobAlertDA error: " + e.message);
    return { success: false, error: e.message };
  }
}

/**
 * archiveStaleJobs()
 * Cleanup task requested for Sprint 32.
 * Run this from the Apps Script editor to see dry run, then runConfirmed to apply.
 */
function archiveStaleJobs() {
  var ss = SpreadsheetApp.openById(
    "1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4",
  );
  var dispatchSheet = ss.getSheetByName(DA_SHEETS.DISPATCH_QUEUE);
  if (!dispatchSheet) {
    Logger.log("Dispatch sheet not found.");
    return;
  }

  var data = dispatchSheet.getDataRange().getValues();
  var cutoff = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000); // rolling 10-day window
  var toArchive = [];

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var id = String(row[DA_DQ.LEAD_ID] || "").trim();
    var status = String(row[DA_DQ.STATUS] || "").trim();
    var timestamp = row[DA_DQ.TIMESTAMP];

    if (!id) continue;
    if (
      status === "Archived" ||
      status === "Complete" ||
      status === "Scheduled"
    )
      continue;

    var jobDate = timestamp instanceof Date ? timestamp : new Date(timestamp);
    if (isNaN(jobDate.getTime())) continue;

    if (jobDate < cutoff) {
      toArchive.push({
        rowIndex: i + 1,
        id: id,
        date: jobDate.toISOString().split("T")[0],
        status: status,
      });
    }
  }

  Logger.log(
    "=== DRY RUN � " +
      toArchive.length +
      " jobs would be archived (before March 23) ===",
  );
  toArchive.forEach(function (j) {
    Logger.log(
      "ARCHIVE ? Row " +
        j.rowIndex +
        " | " +
        j.id +
        " | " +
        j.date +
        " | " +
        j.status,
    );
  });
  Logger.log("=== Run archiveStaleJobsConfirmed() to apply ===");
}

function archiveStaleJobsConfirmed() {
  var ss = SpreadsheetApp.openById(
    "1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4",
  );
  var dispatchSheet = ss.getSheetByName(DA_SHEETS.DISPATCH_QUEUE);
  if (!dispatchSheet) {
    Logger.log("Dispatch sheet not found.");
    return;
  }

  var data = dispatchSheet.getDataRange().getValues();
  var cutoff = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000); // rolling 10-day window
  var archived = 0;
  var errors = 0;

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var id = String(row[DA_DQ.LEAD_ID] || "").trim();
    var status = String(row[DA_DQ.STATUS] || "").trim();
    var timestamp = row[DA_DQ.TIMESTAMP];

    if (!id) continue;
    if (
      status === "Archived" ||
      status === "Complete" ||
      status === "Scheduled"
    )
      continue;

    var jobDate = timestamp instanceof Date ? timestamp : new Date(timestamp);
    if (isNaN(jobDate.getTime())) continue;

    if (jobDate < cutoff) {
      try {
        dispatchSheet.getRange(i + 1, DA_DQ.STATUS + 1).setValue("Archived");
        dispatchSheet
          .getRange(i + 1, 1, 1, 26)
          .setBackground("#2a2a2a")
          .setFontColor("#666666");
        archived++;
      } catch (e) {
        Logger.log("Error archiving row " + (i + 1) + ": " + e.message);
        errors++;
      }
    }
  }

  Logger.log(
    "=== Done. Archived: " + archived + " | Errors: " + errors + " ===",
  );
}

/**
 * Reads the 'Staff Roster' tab to determine granular permissions for a Google user.
 */
function getStaffPermissionsDA(data) {
  try {
    var email = (data.email || "").toLowerCase().trim();
    if (!email) return { success: false, error: "EMAIL_REQUIRED" };

    var ss = SpreadsheetApp.openById(
      "1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4",
    );
    var sheet = ss.getSheetByName("Staff Roster");
    if (!sheet) return { success: false, error: "STAFF_ROSTER_NOT_FOUND" };

    var rows = sheet.getDataRange().getValues();
    // rows[0] = headers, skip it
    for (var i = 1; i < rows.length; i++) {
      var row = rows[i];
      if ((row[DA_SR.EMAIL] || "").toLowerCase().trim() !== email) continue;
      var isActive = row[DA_SR.ACTIVE] === true || String(row[DA_SR.ACTIVE]).toLowerCase() === "true";
      if (!isActive)
        return { success: false, error: "INACTIVE" };

      return {
        success: true,
        permissions: {
          name: String(row[DA_SR.NAME] || email),
          admin: row[DA_SR.ADMIN] === true,
          dispatch: row[DA_SR.DISPATCH] === true,
          people: row[DA_SR.PEOPLE] === true,
          finance: row[DA_SR.FINANCE] === true,
          intel: row[DA_SR.INTEL] === true,
        },
      };
    }

    return { success: false, error: "NOT_FOUND" };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// ─────────────────────────────────────────────
// PAGA MEAL PREMIUM AUTOMATION (Sprint 1)
// ─────────────────────────────────────────────

/**
 * Calculates meal premiums for a given time record based on CA PAGA rules.
 * @param {Object} record { clockIn, clockOut, breakStart, breakMinutes }
 * @returns {Object} { premiumHours: number, violations: string[] }
 */
function calculateMealPremiumsDA(record) {
  if (!record.clockIn || !record.clockOut)
    return { premiumHours: 0, violations: [] };

  var clockIn = new Date(record.clockIn);
  var clockOut = new Date(record.clockOut);
  var breakStart = record.breakStart ? new Date(record.breakStart) : null;
  var breakMinutes = parseFloat(record.breakMinutes || 0);

  // Total elapsed minutes (gross)
  var elapsedMinutes = (clockOut - clockIn) / 60000;
  // Net minutes (excluding unpaid breaks)
  var netMinutes = elapsedMinutes - breakMinutes;

  var violations = [];
  var premiumHours = 0;

  // Rule 1: 1st Meal required if shift > 5 hours (300 min)
  // Must be started before end of 5th hour.
  if (elapsedMinutes > 300) {
    var v1 = null;
    if (breakMinutes < 30) {
      v1 = "Missed 1st Meal Period";
    } else if (breakStart && (breakStart - clockIn) / 60000 > 300) {
      v1 = "Late 1st Meal Period";
    }

    if (v1) {
      violations.push(v1);
      premiumHours = 1; // Pay 1 hour premium
    }
  }

  // Rule 2: 2nd Meal required if shift > 10 hours (600 min)
  // If we only track one break interval, a shift > 10h with < 60m total break is a violation.
  if (elapsedMinutes > 600) {
    if (breakMinutes < 60) {
      violations.push("Missed/Short 2nd Meal Period");
      premiumHours += 1; // CA LC §226.7: each missed meal period = 1 separate hour premium
    }
  }

  return {
    premiumHours: premiumHours,
    violations: violations,
  };
}

// ─────────────────────────────────────────────
// TIMECARD APPROVAL QUEUE
// ─────────────────────────────────────────────

// Returns time records where tech has attested (Signed) but supervisor hasn't acted (Pending).
// Shape: { success, records: [TimecardRecord], weekStart, weekEnd, pendingCount }
function getTimecardApprovalQueueDA(params) {
  try {
    var sheet = getTMSheet();
    if (!sheet || sheet.getLastRow() < 2) {
      return {
        success: true,
        records: [],
        weekStart: "",
        weekEnd: "",
        pendingCount: 0,
      };
    }

    var data = sheet.getDataRange().getValues();
    var records = [];

    data.slice(1).forEach(function (row) {
      var recordId = String(row[0] || "").trim();
      var attestation = String(row[24] || "").trim();
      var supervisorStatus = String(row[26] || "").trim();
      if (!recordId) return;
      // Queue: tech signed, supervisor still pending
      if (attestation !== "Signed" || supervisorStatus !== "Pending") return;

      var clockIn = row[7] ? new Date(row[7]).toISOString() : "";
      var clockOut = row[8] ? new Date(row[8]).toISOString() : "";
      var breakMin = Number(row[11] || 0);
      var actualHrs = 0;
      if (clockIn && clockOut) {
        actualHrs =
          Math.round(
            ((new Date(row[8]) - new Date(row[7])) / 3600000 - breakMin / 60) *
              100,
          ) / 100;
      }

      records.push({
        recordId: recordId,
        jobId: String(row[1] || ""),
        techId: String(row[2] || ""),
        techName: String(row[3] || ""),
        category: String(row[4] || ""),
        address: String(row[5] || ""),
        date: String(row[18] || ""),
        clockIn: clockIn,
        clockOut: clockOut,
        breakMinutes: breakMin,
        actualHours: actualHrs,
        mealWarning: String(row[17] || "").toUpperCase() === "TRUE",
        attestation: attestation,
        attestedAt: row[25] ? new Date(row[25]).toISOString() : "",
        supervisorStatus: supervisorStatus,
        supervisorId: String(row[27] || ""),
        supervisorName: String(row[28] || ""),
        supervisorAt: row[29] ? new Date(row[29]).toISOString() : "",
        disputeReason: String(row[30] || ""),
      });
    });

    // Derive week range from records or use current week
    var laFmt = function (d) {
      return Utilities.formatDate(d, "America/Los_Angeles", "yyyy-MM-dd");
    };
    var dates = records
      .map(function (r) {
        return r.date;
      })
      .filter(Boolean)
      .sort();
    var weekStart = dates.length ? dates[0] : laFmt(new Date());
    var weekEnd = dates.length ? dates[dates.length - 1] : laFmt(new Date());

    return {
      success: true,
      records: records,
      weekStart: weekStart,
      weekEnd: weekEnd,
      pendingCount: records.length,
    };
  } catch (e) {
    Logger.log("getTimecardApprovalQueueDA error: " + e.message);
    return {
      success: false,
      error: e.message,
      records: [],
      weekStart: "",
      weekEnd: "",
      pendingCount: 0,
    };
  }
}

function approveTimecardDA(params) {
  try {
    var recordId = String(params.recordId || "").trim();
    var approver = String(params.approverName || "").trim();
    var approverId = String(params.approverId || "").trim();
    if (!recordId) return { success: false, error: "recordId required" };

    var sheet = getTMSheet();
    if (!sheet || sheet.getLastRow() < 2)
      return { success: false, error: "No records" };
    var data = sheet.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
      if (String(data[i][0] || "").trim() !== recordId) continue;
      var row = i + 1;
      var now = new Date();
      sheet.getRange(row, 27).setValue("Approved"); // SUPERVISOR_STATUS
      sheet.getRange(row, 28).setValue(approverId); // SUPERVISOR_ID
      sheet.getRange(row, 29).setValue(approver); // SUPERVISOR_NAME
      sheet.getRange(row, 30).setValue(now.toISOString()); // SUPERVISOR_AT
      return { success: true };
    }
    return { success: false, error: "Record not found" };
  } catch (e) {
    Logger.log("approveTimecardDA error: " + e.message);
    return { success: false, error: e.message };
  }
}

function disputeTimecardDA(params) {
  try {
    var recordId = String(params.recordId || "").trim();
    var reason = String(params.reason || "").trim();
    var disputer = String(params.disputerName || "").trim();
    var disputerId = String(params.disputerId || "").trim();
    if (!recordId) return { success: false, error: "recordId required" };
    if (!reason) return { success: false, error: "reason required" };

    var sheet = getTMSheet();
    if (!sheet || sheet.getLastRow() < 2)
      return { success: false, error: "No records" };
    var data = sheet.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
      if (String(data[i][0] || "").trim() !== recordId) continue;
      var row = i + 1;
      var now = new Date();
      sheet.getRange(row, 27).setValue("Disputed"); // SUPERVISOR_STATUS
      sheet.getRange(row, 28).setValue(disputerId); // SUPERVISOR_ID
      sheet.getRange(row, 29).setValue(disputer); // SUPERVISOR_NAME
      sheet.getRange(row, 30).setValue(now.toISOString()); // SUPERVISOR_AT
      sheet.getRange(row, 31).setValue(reason); // DISPUTE_REASON
      return { success: true };
    }
    return { success: false, error: "Record not found" };
  } catch (e) {
    Logger.log("disputeTimecardDA error: " + e.message);
    return { success: false, error: e.message };
  }
}
