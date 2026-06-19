// ============================================================
// APT MAINTENANCE — Complete System Code.gs
// ============================================================

const WORKORDER_EMAIL    = "workorder@aptmaintenanceinc.com";
const ALERT_EMAIL        = "brandon@aptmaintenanceinc.com";
const OPS_EMAIL = "keith@aptmaintenanceinc.com";
const LEADS_SHEET_NAME   = "Leads";
const HISTORICAL_SHEET   = "Historical Leads";
const REVIEW_SHEET_NAME  = "New Contacts";
const DISPATCH_SHEET     = "Dispatch Queue";
const LAPHAM_TAB_NAME    = "Master Directory";
const PROCESSED_LABEL    = "APT-Processed";
const TURNOVER_LABEL     = "APT/Turnover";
const INSPECTION_LABEL   = "APT/Inspection";
const POLL_MINUTES       = 15;
const GEMINI_MODEL       = PropertiesService.getScriptProperties().getProperty('GEMINI_MODEL') || "gemini-2.5-flash";

// ── SET TO true WHEN READY TO SEND REAL AUTO-REPLIES ────────
const AUTO_REPLY_ENABLED = false;

const COL_PROP_ID     = 0;  // A: Property ID
const COL_CLIENT      = 1;  // B: Client
const COL_RM_NAME     = 2;  // C: Manager Name
const COL_ADDRESS     = 3;  // D: Property Address
const COL_RM_EMAIL    = 4;  // E: Access Email
const COL_ACCESS_INFO = 5;  // F: Property Notes

const KNOWN_SENDERS = `KNOWN SENDERS:
APT Internal: brandon@,keith@,tsegab@,bemenet@ aptmaintenanceinc.com — classify normally
Lapham staff: maintenance@laphamcompany.com, website@laphamcompany.com
turnovers.lapham@gmail.com → turnover
cooneysam@gmail.com → inspection
RMs may use @lapham-rm.com, @gmail.com, or address-based emails — match by property address
Lapham webform: website@laphamcompany.com OR "Submitted values are:" OR "Webform submission from: Maintenance Request" → structured form — extract all tenant fields, then classify emailType by content (turnover/inspection/adhoc_workorder) like any other email`;

const LAPHAM_FORM_FORMAT = `
LAPHAM WEBFORM FIELDS (present when sender is website@laphamcompany.com or body contains "Submitted values are:" or "Webform submission from: Maintenance Request"):
Extract: Name/Address/Unit/Phone/Email/PreferredContact/Pets/PTE-choice/Description
PTE: Yes="permission to enter my dwelling while I am not there", No="I do not give permission to enter without my presence", N/A=turnover/inspection
Still classify emailType by work content — turnover, inspection, or adhoc_workorder. Do NOT use "lapham_form" as emailType.`;

// ============================================================
// MAIN LIVE POLLING LOOP
// ============================================================
function checkNewLeadEmails() {
  return; // Migrated to n8n (Phase 25 cutover) — polling owned by phase-19-email-polling workflow
  try {
    var apiKey = getApiKey();
  if (!apiKey) return;
  var now  = new Date();
  var hour = now.getHours();
  var day  = now.getDay(); // 0 = Sunday, 6 = Saturday
  var min  = now.getMinutes();
  if (day === 0 || day === 6) { Logger.log("[Live] Weekend — skipping."); return; }
  if (hour < 6 || (hour === 6 && min < 30) || hour >= 19) { Logger.log("[Live] Outside business hours (6:30am–7pm M-F) — skipping."); return; }

  var laphamDb      = loadLaphamDatabase();
  var ss            = SpreadsheetApp.getActiveSpreadsheet();
  var leadsSheet    = ss.getSheetByName(LEADS_SHEET_NAME);
  var reviewSheet   = ss.getSheetByName(REVIEW_SHEET_NAME);
  var dispatchSheet = ss.getSheetByName(DISPATCH_SHEET);
  if (!leadsSheet || !reviewSheet || !dispatchSheet) {
    Logger.log("ERROR: One or more required sheets not found.");
    return;
  }
  var processedIds  = getProcessedMessageIds(leadsSheet, 36);

  var query   = "to:" + WORKORDER_EMAIL + " newer_than:2d";
  var threads = GmailApp.search(query, 0, 100);
  Logger.log("[Live] " + threads.length + " thread(s) to process.");
    var batchCount = 0;
    var LIVE_BATCH_MAX = 5;

  threads.forEach(function(thread) {
    if (batchCount >= LIVE_BATCH_MAX) return;
    var messages         = thread.getMessages();
    var firstUnprocessed = null;
    for (var i = 0; i < messages.length; i++) {
      if (!messages[i]) continue;
      if (!processedIds.has(messages[i].getId())) {
        firstUnprocessed = messages[i];
        break;
  }
}
    if (!firstUnprocessed) return;

var sender = firstUnprocessed.getFrom();

// Skip emails sent FROM workorder@ (our own outbound replies)
if (sender.indexOf(WORKORDER_EMAIL) !== -1) {
  applyProcessedLabel(thread);
  return;
}

// ── THREAD-LEVEL DEDUP ──────────────────────────────────────
// If any message in this thread is already logged in the Leads
// sheet, this is a reply on a known thread — skip it entirely.
// This prevents duplicate jobs from back-and-forth email replies.
var threadAlreadyLogged = messages.some(function(m) {
  return m && processedIds.has(m.getId());
});
    if (threadAlreadyLogged) {
      try {
        var replyJobId = getJobIdForThread(dispatchSheet, messages);
        if (replyJobId) {
          writeInboundReplyToNeon(replyJobId, firstUnprocessed);
        } else {
          Logger.log('[InboundReply] No jobId found for thread: ' + firstUnprocessed.getSubject());
        }
      } catch (e) {
        Logger.log('[InboundReply] Error capturing reply: ' + e.message);
      }
      applyProcessedLabel(thread);
      Logger.log("[ThreadDedup] Skipped reply on known thread: " + firstUnprocessed.getSubject());
      batchCount++;
      return;
    }
// ────────────────────────────────────────────────────────────
    var subject        = firstUnprocessed.getSubject();
    var fullBody       = firstUnprocessed.getPlainBody();
    var previewBody    = fullBody.substring(0, 500);
    if (shouldSkipEmail(sender, subject, previewBody)) {
      applyProcessedLabel(thread); batchCount++; return;
    }
    var threadContext  = buildThreadContext(messages);
    var date           = firstUnprocessed.getDate();
    var msgId          = firstUnprocessed.getId();
    var existingLabels = thread.getLabels().reduce(function(acc, l) {
      if (!l) return acc;
      try { acc.push(l.getName()); } catch(e) { /* stale label — deleted from Gmail */ }
      return acc;
    }, []);
    var preLabeled     = {
      turnover:   existingLabels.indexOf(TURNOVER_LABEL) !== -1,
      inspection: existingLabels.indexOf(INSPECTION_LABEL) !== -1
    };

    var parsed = detectLaphamForm(sender, subject, fullBody)
              || parseWithGemini(apiKey, sender, subject, threadContext, laphamDb, preLabeled);
    if (!parsed) { applyProcessedLabel(thread); return; }

    enrichFromLaphamDb(parsed, laphamDb, sender);

    // If rmName still blank after DB lookup, fall back to sender display name.
    // Covers group emails like maintenance@laphamcompany.com where the FROM
    // header carries the actual person's name (e.g. "Joy Gim & Bianca Cervantes").
    if (!parsed.rmName && parsed.senderName) {
      parsed.rmName = parsed.senderName;
    }

    checkForMissingEmail(parsed, laphamDb, reviewSheet);

    var leadId = logToSheet(leadsSheet, parsed, sender, subject, threadContext, date, msgId, false);
    if (parsed.confidence === "Low") sendLowConfidenceAlert(parsed, leadId, subject, sender);
    addToDispatchQueue(dispatchSheet, parsed, leadId, msgId);
    applyClassificationLabels(thread, parsed, existingLabels);
    routeLead(parsed, leadId, firstUnprocessed);
    flagNewContactsForReview(reviewSheet, parsed, laphamDb, leadId);
    applyProcessedLabel(thread);
    batchCount++;
    Utilities.sleep(500);
    Logger.log("[Live] Done: " + leadId + " | " + parsed.emailType + " | PTE: " + parsed.pteGranted);
  });
  } catch (err) {
    GmailApp.sendEmail(
      'brandon@aptmaintenanceinc.com',
      '[Code.js ERROR] checkNewLeadEmails: ' + (err.message || String(err)),
      'Stack: ' + (err.stack || 'unavailable')
    );
  }
}
// ============================================================
// LAPHAM WEBFORM DETECTION
// Bypasses Gemini for structured form submissions from website@laphamcompany.com.
// Returns a fully-populated parsed object (confidence "High"), or null if not a form.
// ============================================================
function detectLaphamForm(sender, subject, body) {
  var isLaphamSender = sender.indexOf('website@laphamcompany.com') !== -1;
  var isFormBody     = body.indexOf('Submitted values are:') !== -1
                    || body.indexOf('Webform submission from: Maintenance Request') !== -1;

  if (!isLaphamSender && !isFormBody) return null;

  // Extract a named field — tries each label name in order.
  // Supports two formats:
  //   Same-line:  "Field: Value" or "Field Value"
  //   Two-line:   "Field\nValue" (Lapham webform HTML rendered as plain text via Apple Mail forward)
  function field(names) {
    for (var i = 0; i < names.length; i++) {
      // Same-line: label + optional colon/space + value on same line
      var re = new RegExp('(?:^|\\n)' + names[i] + '\\s*:?\\s*([^\\n]+)', 'i');
      var m  = body.match(re);
      if (m && m[1].trim()) return m[1].trim();
      // Two-line: label on one line (with any trailing text/colon), value on next line
      // Handles forwarded Lapham forms where Apple Mail renders <b>Field</b><br>Value as Field\nValue
      var re2 = new RegExp('(?:^|\\n)' + names[i] + '[^\\n]*\\n\\s*([^\\n]+)', 'i');
      var m2  = body.match(re2);
      if (m2 && m2[1].trim()) return m2[1].trim();
    }
    return '';
  }

  function fieldFromBody(names, targetBody) {
    for (var i = 0; i < names.length; i++) {
      var re  = new RegExp('(?:^|\\n)' + names[i] + '\\s*:?\\s*([^\\n]+)', 'i');
      var m   = targetBody.match(re);
      if (m && m[1].trim()) return m[1].trim();
      var re2 = new RegExp('(?:^|\\n)' + names[i] + '[^\\n]*\\n\\s*([^\\n]+)', 'i');
      var m2  = targetBody.match(re2);
      if (m2 && m2[1].trim()) return m2[1].trim();
    }
    return '';
  }

  var forwardedBody = '';
  var fwdIdx = body.indexOf('---------- Forwarded message ---------');
  if (fwdIdx !== -1) {
    forwardedBody = body.substring(fwdIdx);
    forwardedBody = forwardedBody.replace(/^> ?/gm, '');
  }

  var tenantName  = field(['Name', 'Full Name', 'Submitted By', 'Your Name', 'First and Last Name']) || (forwardedBody ? fieldFromBody(['Name', 'Full Name', 'Submitted By', 'Your Name', 'First and Last Name'], forwardedBody) : '');
  var address     = field(['Address', 'Property Address', 'Property', 'Location', 'Street Address']) || (forwardedBody ? fieldFromBody(['Address', 'Property Address', 'Property', 'Location', 'Street Address'], forwardedBody) : '');
  var unit        = field(['Unit', 'Unit #', 'Unit Number', 'Apt', 'Apartment', 'Suite']) || (forwardedBody ? fieldFromBody(['Unit', 'Unit #', 'Unit Number', 'Apt', 'Apartment', 'Suite'], forwardedBody) : '');
  var phone       = field(['Phone', 'Phone Number', 'Mobile', 'Cell', 'Mobile Number']) || (forwardedBody ? fieldFromBody(['Phone', 'Phone Number', 'Mobile', 'Cell', 'Mobile Number'], forwardedBody) : '');
  var tenantEmail = field(['Email', 'Email Address', 'Your Email']) || (forwardedBody ? fieldFromBody(['Email', 'Email Address', 'Your Email'], forwardedBody) : '');
  var prefContact = field(['Preferred Contact', 'Preferred Contact Method', 'Contact Method', 'Best Way to Reach']) || (forwardedBody ? fieldFromBody(['Preferred Contact', 'Preferred Contact Method', 'Contact Method', 'Best Way to Reach'], forwardedBody) : '');
  var pets        = field(['Pets', 'Do you have pets', 'Pets in Unit', 'Have Pets']) || (forwardedBody ? fieldFromBody(['Pets', 'Do you have pets', 'Pets in Unit', 'Have Pets'], forwardedBody) : '');
  var pteRaw      = field(['Permission to Enter', 'PTE', 'Entry Permission', 'permission to enter']) || (forwardedBody ? fieldFromBody(['Permission to Enter', 'PTE', 'Entry Permission', 'permission to enter'], forwardedBody) : '');
  // Full Lapham label tried first so same-line match fails (nothing after colon on label line)
  // and two-line match correctly captures the description on the following line.
  var description = field(['Description', 'Issue', 'Problem', 'Repair Needed', 'Request', 'Details', 'Message',
                           'Please describe in detail the maintenance problem below',
                           'Please describe']) || (forwardedBody ? fieldFromBody(['Description', 'Issue', 'Problem', 'Repair Needed', 'Request', 'Details', 'Message',
                           'Please describe in detail the maintenance problem below',
                           'Please describe'], forwardedBody) : '');

  if (!description && forwardedBody) {
    description = forwardedBody.replace(/^[-\s]+Forwarded message[-\s]+/i, '').replace(/^[A-Z][^:]+:.*$/gm, '').replace(/\s+/g, ' ').trim();
  }

  if (tenantEmail) tenantEmail = tenantEmail.replace(/<mailto:[^>]+>/g, '').trim();
  if (typeof rmEmail !== 'undefined' && rmEmail) rmEmail = rmEmail.replace(/<mailto:[^>]+>/g, '').trim();

  // PTE — match the webform's exact radio button phrases first, then simple yes/no
  var pteGranted = 'Not Applicable';
  var pteLower   = (pteRaw || '').toLowerCase();
  if      (pteLower.indexOf('permission to enter my dwelling while i am not there') !== -1) pteGranted = 'Yes';
  else if (pteLower.indexOf('do not give permission') !== -1 || pteLower.indexOf('without my presence') !== -1) pteGranted = 'No';
  else if (pteLower === 'yes' || pteLower === 'y') pteGranted = 'Yes';
  else if (pteLower === 'no'  || pteLower === 'n') pteGranted = 'No';

  // Pets
  var tenantHasPets = 'Unknown';
  var petsLower     = (pets || '').toLowerCase();
  if      (petsLower === 'yes' || petsLower === 'y') tenantHasPets = 'Yes';
  else if (petsLower === 'no'  || petsLower === 'n') tenantHasPets = 'No';

  // Preferred contact
  var tenantPrefContact = 'Unknown';
  var prefLower         = (prefContact || '').toLowerCase();
  if      (prefLower.indexOf('phone') !== -1 || prefLower.indexOf('call') !== -1 || prefLower.indexOf('text') !== -1) tenantPrefContact = 'Phone';
  else if (prefLower.indexOf('email') !== -1) tenantPrefContact = 'Email';

  // Email type — inspect description + subject for turnover/inspection keywords
  var emailType = 'adhoc_workorder';
  var scanText  = ((description || '') + ' ' + (subject || '')).toLowerCase();
  if      (scanText.indexOf('turnover') !== -1 || scanText.indexOf('move out') !== -1 || scanText.indexOf('move-out') !== -1) emailType = 'turnover';
  else if (scanText.indexOf('inspection') !== -1) emailType = 'inspection';

  var serviceCategory = 'Unknown';
  if (scanText.indexOf('plumbing') !== -1 || scanText.indexOf('leak') !== -1 || scanText.indexOf('drain') !== -1) {
    serviceCategory = 'Plumbing';
  } else if (scanText.indexOf('electrical') !== -1 || scanText.indexOf('outlet') !== -1 || scanText.indexOf('breaker') !== -1) {
    serviceCategory = 'Electrical';
  } else if (scanText.indexOf('hvac') !== -1 || scanText.indexOf('cooling') !== -1 || scanText.indexOf('heating') !== -1) {
    serviceCategory = 'HVAC';
  } else if (scanText.indexOf('carpentry') !== -1 || scanText.indexOf('lock') !== -1) {
    serviceCategory = 'Carpentry';
  } else if (scanText.indexOf('appliance') !== -1) {
    serviceCategory = 'Appliance';
  } else if (scanText.indexOf('pest') !== -1) {
    serviceCategory = 'General Repair';
  } else if (scanText.indexOf('general') !== -1) {
    serviceCategory = 'General Repair';
  }

  Logger.log('[LaphamForm] Detected — address: ' + (address || 'LOOKUP_BY_SENDER') + ' | pte: ' + pteGranted);

  return {
    emailType:              emailType,
    senderName:             'Lapham Webform',
    senderEmail:            'website@laphamcompany.com',
    senderType:             'PM Office Staff',
    companyName:            'Lapham',
    propertyAddress:        address || 'LOOKUP_BY_SENDER',
    unitNumber:             unit,
    city:                   '',
    leadType:               emailType === 'turnover' ? 'Unit Turnover' : emailType === 'inspection' ? 'Inspection' : 'Unknown',
    serviceCategory:        serviceCategory,
    urgency:                'Standard',
    description:            description || '(No description — see original email)',
    preferredTiming:        '',
    accessInfo:             '',
    rmName:                 '',
    rmEmail:                '',
    tenantName:             tenantName,
    tenantPhone:            phone,
    tenantEmail:            tenantEmail,
    tenantPreferredContact: tenantPrefContact,
    tenantHasPets:          tenantHasPets,
    pteGranted:             pteGranted,
    pteNotes:               pteRaw,
    estimateNeeded:         'No',
    isLaphamForm:           true,
    multipleItems:          false,
    itemList:               [],
    subjectLineAddressUsed: false,
    senderLookupNeeded:     !address,
    newContactDetected:     false,
    newContactNotes:        '',
    confidence:             'High',
    confidenceNotes:        'Structured Lapham webform — Gemini bypassed'
  };
}

// ============================================================
// LOW CONFIDENCE ALERT
// Fires when Gemini returns confidence "Low" — queues Needs Review
// and emails brandon@ so nothing slips past unnoticed.
// ============================================================
function sendLowConfidenceAlert(parsed, leadId, subject, sender) {
  var body =
    'A new lead was parsed with LOW confidence and needs manual review.\n\n' +
    'Lead ID:  ' + leadId + '\n' +
    'From:     ' + sender + '\n' +
    'Subject:  ' + subject + '\n' +
    'Address:  ' + (parsed.propertyAddress || '(unknown)') + '\n' +
    'Type:     ' + (parsed.emailType       || '(unknown)') + '\n' +
    'Notes:    ' + (parsed.confidenceNotes || '') + '\n\n' +
    'The job has been queued as "Needs Review" in the Dispatch Queue.';
  try {
    GmailApp.sendEmail(
      ALERT_EMAIL,
      '[APT] Low Confidence Lead — ' + leadId + ' — ' + (parsed.propertyAddress || 'Unknown Address'),
      body
    );
  } catch(e) {
    Logger.log('[LowConfidenceAlert] Email failed: ' + e.message);
  }
}

// ============================================================
// GEMINI PARSING AGENT
// ============================================================
function parseWithGemini(apiKey, sender, subject, threadContext, laphamDb, preLabeled) {
 
  // Smart property context — only include relevant properties
  // to avoid burning tokens on irrelevant data
  var propertyContext = buildSmartPropertyContext(laphamDb, sender, subject);
 
  var preLabelHint = preLabeled.turnover   ? "HINT: Team labeled this APT/Turnover." :
                     preLabeled.inspection ? "HINT: Team labeled this APT/Inspection." : "";
 
  var prompt =
    "You are a work order intake agent for APT Maintenance (Bay Area property maintenance).\n"
    + "Parse emails to workorder@aptmaintenanceinc.com. Extract structured data. Return ONLY raw JSON.\n\n"
    + KNOWN_SENDERS + "\n\n"
    + LAPHAM_FORM_FORMAT + "\n"
    + propertyContext + "\n"
    + preLabelHint + "\n\n"
    + "FROM: " + sender + "\n"
    + "SUBJECT: " + subject + "\n\n"
    + "THREAD:\n" + threadContext.substring(0, 2000) + "\n\n"
    + "RULES: Scan full thread. Extract address from subject if not in body. "
    + "If no address found set propertyAddress=LOOKUP_BY_SENDER. "
    + "Urgency: Urgent=active leak/sewage/no heat/no electricity/flooding/fire/word 'emergency' ONLY. "
    + "Standard=most repairs. Flexible=quotes/turnovers/inspections. Never Urgent for frustration alone.\n\n"
    + "Return ONLY this JSON (no markdown, no backticks):\n"
    + '{"emailType":"adhoc_workorder|turnover|inspection|new_inquiry|internal_forward|unknown",'
    + '"senderName":"","senderEmail":"","senderType":"Resident Manager|PM Office Staff|APT Internal|Unknown",'
    + '"companyName":"","propertyAddress":"","unitNumber":"","city":"",'
    + '"leadType":"Urgent Repair|Unit Turnover|Recurring Maintenance|Quote Request|Inspection|New Client Inquiry|Unknown",'
    + '"serviceCategory":"Plumbing|Electrical|Carpentry|Painting|HVAC|Appliance|Junk Removal|Windows|General Repair|Multi-trade|Renovation|Unknown",'
    + '"urgency":"Urgent|Standard|Flexible","description":"1-2 sentence plain trade language",'
    + '"preferredTiming":"","accessInfo":"","rmName":"","rmEmail":"",'
    + '"tenantName":"","tenantPhone":"","tenantEmail":"",'
    + '"tenantPreferredContact":"Phone|Email|Unknown","tenantHasPets":"Yes|No|Unknown",'
    + '"pteGranted":"Yes|No|Not Applicable","pteNotes":"",'
    + '"isLaphamForm":false,"multipleItems":false,"itemList":[],'
    + '"estimateNeeded":"Yes|No|Unknown (Yes=quote request/renovation/multi-trade/scope unclear. No=standard repair with defined scope)","subjectLineAddressUsed":false,'
    + '"senderLookupNeeded":false,"newContactDetected":false,"newContactNotes":"",'
    + '"confidence":"High|Medium|Low","confidenceNotes":""}';
 
  var url = "https://generativelanguage.googleapis.com/v1beta/models/" + GEMINI_MODEL + ":generateContent?key=" + apiKey;
 
  try {
    var res = UrlFetchApp.fetch(url, {
      method: "POST",
      contentType: "application/json",
      muteHttpExceptions: true,
      payload: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.1, maxOutputTokens: 2048 }
      })
    });
 
    var httpCode = res.getResponseCode();
    var rawBody  = res.getContentText();
    Logger.log("Gemini HTTP " + httpCode + " | Length: " + rawBody.length);
 
    if (httpCode !== 200) {
      Logger.log("Gemini error: " + rawBody.substring(0, 300));
      return null;
    }
 
    var json    = JSON.parse(rawBody);
    var rawText = json && json.candidates && json.candidates[0] &&
                  json.candidates[0].content && json.candidates[0].content.parts &&
                  json.candidates[0].content.parts[0]
                  ? json.candidates[0].content.parts[0].text : "";
 
    if (!rawText) {
      Logger.log("Gemini empty text. Full: " + rawBody.substring(0, 400));
      return null;
    }
 
    Logger.log("Gemini raw (first 200): " + rawText.substring(0, 200));
 
    var parsed = extractJson(rawText);
    if (!parsed) {
      Logger.log("JSON extract failed: " + rawText.substring(0, 300));
      return null;
    }

    if (parsed.tenantEmail) {
      parsed.tenantEmail = parsed.tenantEmail.replace(/^<mailto:|>$/g, '').trim();
    }

    if (!parsed.propertyAddress || parsed.propertyAddress === "Unknown" || parsed.propertyAddress === "") {
      var extracted = extractAddressFromSubject(subject);
      if (extracted) {
        parsed.propertyAddress        = extracted;
        parsed.subjectLineAddressUsed = true;
      } else {
        parsed.propertyAddress    = "LOOKUP_BY_SENDER";
        parsed.senderLookupNeeded = true;
      }
    }
 
    return parsed;
 
  } catch(e) {
    Logger.log("parseWithGemini exception: " + e.message);
    return null;
  }
}

function extractJson(text) {
  if (!text || !text.trim()) return null;

  var strategies = [
    function() { return JSON.parse(text.trim()); },
    function() {
      var m = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
      return m ? JSON.parse(m[1].trim()) : null;
    },
    function() {
      var start = text.indexOf('{');
      var end   = text.lastIndexOf('}');
      if (start === -1 || end === -1 || end <= start) return null;
      return JSON.parse(text.substring(start, end + 1));
    },
    function() {
      var start = text.indexOf('{');
      var end   = text.lastIndexOf('}');
      if (start === -1 || end === -1) return null;
      var cleaned = text.substring(start, end + 1)
        .replace(/,\s*([}\]])/g, '$1')
        .replace(/'/g, '"')
        .replace(/:\s*True/g,  ': true')
        .replace(/:\s*False/g, ': false')
        .replace(/:\s*None/g,  ': null');
      return JSON.parse(cleaned);
    }
  ];

  for (var i = 0; i < strategies.length; i++) {
    try {
      var result = strategies[i]();
      if (result && typeof result === 'object') return result;
    } catch(e) {}
  }
  return null;
}

function loadLaphamDatabase() {
  try {
    var ss    = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(LAPHAM_TAB_NAME);
    if (!sheet) {
      Logger.log('WARNING: "' + LAPHAM_TAB_NAME + '" tab not found in active spreadsheet.');
      return [];
    }
 
    var data = sheet.getDataRange().getValues();
    var db   = [];
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      if (!row[COL_ADDRESS] && !row[COL_RM_EMAIL]) continue;
 
      // Handle hyphen-separated address ranges like "530-536 41st St"
      // by expanding them into individual address entries
      var rawAddress = String(row[COL_ADDRESS] || "").trim();
      var addresses  = expandAddressRange(rawAddress);
 
      addresses.forEach(function(addr) {
        db.push({
          propId    : String(row[COL_PROP_ID]     || "").trim(),
          client    : String(row[COL_CLIENT]      || "Lapham").trim(),
          rmName    : String(row[COL_RM_NAME]     || "").trim(),
          address   : addr,
          rmEmail   : String(row[COL_RM_EMAIL]    || "").trim().toLowerCase(),
          accessInfo: String(row[COL_ACCESS_INFO] || "").trim(),
          rowIndex  : i + 1
        });
      });
    }
    Logger.log("Master Directory loaded: " + db.length + " properties.");
    return db;
  } catch(e) {
    Logger.log("Master Directory error: " + e.message);
    return [];
  }
}
 
// Expands "530-536 41st St, Oakland" into ["530 41st St, Oakland", "536 41st St, Oakland"]
// Handles patterns like "1930, 1936, 1940 E. 29th St" as well
function expandAddressRange(address) {
  if (!address) return [];
 
  // Pattern 1: "530-536 41st St" — hyphenated number range
  var hyphenMatch = address.match(/^(\d+)-(\d+)\s+(.+)$/);
  if (hyphenMatch) {
    var start  = parseInt(hyphenMatch[1]);
    var end    = parseInt(hyphenMatch[2]);
    var suffix = hyphenMatch[3].trim();
    var step   = (end - start) <= 10 ? 2 : Math.round((end - start) / 5); // even numbers only
    var addrs  = [];
    for (var n = start; n <= end; n += step) {
      addrs.push(n + " " + suffix);
    }
    // Always include both endpoints
    if (addrs[addrs.length - 1] !== end + " " + suffix) {
      addrs.push(end + " " + suffix);
    }
    return addrs;
  }
 
  // Pattern 2: "1930, 1936, 1940 E. 29th St & 1935, 1941 E. 30th St" — comma/ampersand list
  // Split on & first, then handle each segment
  var segments = address.split(/\s*&\s*/);
  var results  = [];
  segments.forEach(function(seg) {
    seg = seg.trim();
    // Check if segment has comma-separated numbers before a street name
    var commaMatch = seg.match(/^([\d,\s]+?)\s+([A-Za-z].+)$/);
    if (commaMatch) {
      var numbers = commaMatch[1].split(',').map(function(n){ return n.trim(); }).filter(Boolean);
      var street  = commaMatch[2].trim();
      numbers.forEach(function(num) {
        if (num) results.push(num + " " + street);
      });
    } else {
      results.push(seg);
    }
  });
 
  return results.length > 0 ? results : [address];
}
function enrichFromLaphamDb(parsed, laphamDb, senderRaw) {
  var record = null;
 
  if (parsed.propertyAddress && parsed.propertyAddress !== "LOOKUP_BY_SENDER") {
    record = lookupByAddress(laphamDb, parsed.propertyAddress);
  }
 
  if (!record) {
    var senderEmail = extractEmail(senderRaw).toLowerCase();
    for (var i = 0; i < laphamDb.length; i++) {
      if (laphamDb[i].rmEmail && laphamDb[i].rmEmail === senderEmail) {
        record = laphamDb[i];
        if (!parsed.propertyAddress || parsed.propertyAddress === "LOOKUP_BY_SENDER") {
          parsed.propertyAddress    = record.address;
          parsed.senderLookupNeeded = false;
        }
        break;
      }
    }
  }
 
  if (record) {
    parsed.rmName        = parsed.rmName  || record.rmName;
    parsed.rmEmail       = parsed.rmEmail || record.rmEmail;
    parsed.laphamPropId  = record.propId;
    parsed.propertyKnown = true;
    parsed.dbRowIndex    = record.rowIndex;
 
    // ── ACCESS INFO CHANGE DETECTION ──────────────────────
    // If the email contains new access info that differs from
    // what we have on file, flag it for review
    var existingAccess = normalizeAccessInfo(record.accessInfo);
    var newAccess      = normalizeAccessInfo(parsed.accessInfo);
 
    if (newAccess && existingAccess && newAccess !== existingAccess) {
      // Check if the new info contains codes/numbers not in existing
      var newCodes      = extractCodes(parsed.accessInfo);
      var existingCodes = extractCodes(record.accessInfo);
      var trulyNew      = newCodes.filter(function(c) {
        return existingCodes.indexOf(c) === -1;
      });
 
      if (trulyNew.length > 0) {
        parsed.accessInfoChanged  = true;
        parsed.accessInfoNew      = parsed.accessInfo;
        parsed.accessInfoExisting = record.accessInfo;
        Logger.log("Access info change detected for " + parsed.propertyAddress
          + " | New codes: " + trulyNew.join(", "));
      }
    }
 
    // Use existing access info as fallback if none in email
    // Merge access info — Master Directory is the authority on codes/combinations
    // Email may add context (e.g. "keys in lockbox") but should not replace stored codes
  if (record.accessInfo && parsed.accessInfo) {
    // Both exist — combine them, Master Directory first
  parsed.accessInfo = record.accessInfo + " | " + parsed.accessInfo;
} else {
  // Only one exists — use whichever is present
  parsed.accessInfo = record.accessInfo || parsed.accessInfo;
}
 
  } else {
    parsed.propertyKnown = false;
    if (parsed.propertyAddress && parsed.propertyAddress !== "LOOKUP_BY_SENDER"
        && parsed.propertyAddress !== "Unknown") {
      parsed.newContactDetected = true;
      parsed.newContactNotes    = parsed.newContactNotes || "Property not in Master Directory.";
    }
  }
}
// Normalizes access info for comparison (lowercase, strip punctuation)
function normalizeAccessInfo(text) {
  if (!text) return "";
  return String(text).toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
 
// Extracts numeric codes from access info text
// Catches lockbox codes, intercom codes, gate codes etc.
function extractCodes(text) {
  if (!text) return [];
  var matches = String(text).match(/\b\d{3,6}\b/g) || [];
  return matches.filter(function(m, i, arr) {
    return arr.indexOf(m) === i; // deduplicate
  });
}
function checkForMissingEmail(parsed, laphamDb, reviewSheet) {
  if (!parsed.propertyKnown || !parsed.dbRowIndex) return;
  var record = null;
  for (var i = 0; i < laphamDb.length; i++) {
    if (laphamDb[i].rowIndex === parsed.dbRowIndex) { record = laphamDb[i]; break; }
  }
  if (!record || record.rmEmail) return;

  var existing = getColumnValues(reviewSheet, 3);
  var key = (parsed.propertyAddress || "").toLowerCase().trim();
  if (key && existing.has(key)) return;

  reviewSheet.appendRow([
    Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm"),
    "MISSING-EMAIL",
    parsed.propertyAddress || "",
    parsed.unitNumber      || "",
    parsed.companyName     || "Lapham",
    parsed.rmName          || "",
    "",
    parsed.accessInfo      || "",
    "RM email missing. Incoming from: " + (parsed.senderEmail || "unknown") + ". Add to row " + parsed.dbRowIndex + " of Master Directory.",
    "Add Email to Master Directory"
  ]);
}

function lookupByAddress(laphamDb, addressRaw) {
  if (!addressRaw || laphamDb.length === 0) return null;

  var targetKey = normalizeAddressKey(addressRaw, "");

  // First pass — exact normalized match
  for (var i = 0; i < laphamDb.length; i++) {
    var knownKey = normalizeAddressKey(laphamDb[i].address, "");
    if (knownKey === targetKey) return laphamDb[i];
  }

  // Second pass — street number + first word of street name match
  // Handles "3126 College Ave" vs "3126 College Ave, Berkeley"
  var targetTokens = targetKey.split("||")[0].split(" ").slice(0, 2).join(" ");
  for (var j = 0; j < laphamDb.length; j++) {
    var knownTokens = normalizeAddressKey(laphamDb[j].address, "").split("||")[0].split(" ").slice(0, 2).join(" ");
    if (knownTokens === targetTokens && targetTokens.length > 3) return laphamDb[j];
  }

  return null;
}
function isPropertyLevelAccessInfo(text) {
  if (!text) return false;
  var t = text.toLowerCase().trim();

  if (t.length < 5) return false;

  var jobSpecific = [
    "unit is vacant", "unit vacant", "vacant for turnover", "turnover",
    "no access info", "see original email", "n/a", "none",
    "must be present", "call.*to schedule", "tenant.*present",
    "do not enter", "contact tenant first"
  ];
  for (var i = 0; i < jobSpecific.length; i++) {
    if (new RegExp(jobSpecific[i], 'i').test(t)) return false;
  }

  if (/\d{3}[-.]?\d{3}[-.]?\d{4}/.test(t)) return false;

  var propertySignals = [
    /\b\d{3,6}\b/,
    /lockbox/i, /key/i, /gate/i, /intercom/i,
    /code/i, /combo/i, /combination/i,
    /entrance/i, /front door/i,
    /manager.{0,10}unit/i, /office/i
  ];
  for (var j = 0; j < propertySignals.length; j++) {
    if (propertySignals[j].test(t)) return true;
  }

  return false;
}
// ============================================================
// ROUTING
// ============================================================
function routeLead(parsed, leadId, message) {
  if (parsed.emailType === "inspection" && parsed.multipleItems) sendInspectionSummary(parsed, leadId);
}

// ── Commented out — dashboard handles these now ──────────────
// function draftTenantContact(parsed, leadId) { ... }
// function sendUrgentAlert(parsed, leadId) { ... }
// function sendTurnoverFlag(parsed, leadId) { ... }

function sendInspectionSummary(parsed, leadId) {
  var items = (parsed.itemList || []).map(function(item, i) { return "  " + (i+1) + ". " + item; }).join("\n") || "  See original email";
  GmailApp.sendEmail(OPS_EMAIL,
    "[INSPECTION] " + leadId + " — " + (parsed.propertyAddress || ""),
    "Inspection work order.\n\nLead: " + leadId
    + "\nProperty: " + (parsed.propertyAddress || "") + " " + (parsed.unitNumber || "")
    + "\nAccess: " + (parsed.accessInfo || "None on file")
    + "\n\nItems:\n" + items
    + "\nRM: " + (parsed.rmName || "") + " | " + (parsed.rmEmail || "")
  );
}

// ============================================================
// DISPATCH QUEUE
// ============================================================
function addToDispatchQueue(dispatchSheet, parsed, leadId, msgId) {
  // Skip clearly internal APT communications with no work order content
  if (parsed.emailType === "unknown" && parsed.senderType === "APT Internal") return;

  var neonOnly = PropertiesService.getScriptProperties().getProperty('WRITE_PATH_NEON_ONLY') === 'true';

  // LOOKUP_BY_SENDER — address couldn't be resolved from email or Master Directory.
  // Queue as "Needs Review" so Robert/Keith can identify the property and resolve it.
  // Every lead that hits workorder@ must be visible — nothing dropped silently.
  if (parsed.propertyAddress === "LOOKUP_BY_SENDER") {
    var senderDisplay = parsed.rmEmail || "unknown sender";
    var rowData = [
      Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm"),
      leadId,
      "4-STANDARD",
      parsed.emailType       || "",
      parsed.serviceCategory || "",
      "Unmatched — " + senderDisplay,  // address col — sender shown for context
      "",            // Unit
      parsed.description || "",
      "",            // Preferred Timing
      "",            // Access Info
      parsed.rmName  || "",
      parsed.rmEmail || "",
      "",            // Tenant Name
      "",            // Tenant Phone
      "",            // PTE Granted
      "",            // Estimate Needed
      "",            // Assigned Tech
      "",            // Scheduled Date
      "",            // Est. Hours
      "Needs Review",
      "",            // Notes
      msgId || "",   // Gmail Msg ID
      "",            // Calendar Event ID
      "",            // Tenant Email
      "",            // Tenant Pref Contact
      "",            // Tenant Has Pets
      "",            // WC_CODE
      "APT-CA"       // ENTITY_ID
    ];
    if (!neonOnly) { dispatchSheet.appendRow(rowData); }

    // Sync to Neon
    try {
      if (typeof syncJobToNeon === 'function') {
        syncJobToNeon(getJobDataFromRow(rowData));
      }
    } catch (e) {
      Logger.log('Shadow-sync failed for LOOKUP_BY_SENDER: ' + e.message);
    }

    Logger.log("LOOKUP_BY_SENDER queued as Needs Review: " + leadId + " | " + senderDisplay);
    return;
  }

  // Skip duplicates — open job already exists at this address
  if (parsed.propertyAddress && isDuplicateJob(dispatchSheet, parsed.propertyAddress, parsed.unitNumber, parsed.emailType)) {
    Logger.log("Duplicate job skipped for: " + parsed.propertyAddress + " | " + leadId);
    return;
  }

  var priority = parsed.urgency === "Urgent"   ? "1-URGENT"
    : parsed.emailType === "turnover"          ? "2-TURNOVER"
    : parsed.pteGranted === "No"               ? "3-PTE-PENDING"
    : "4-STANDARD";

  var rowData = [
    Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm"),
    leadId,
    priority,
    parsed.emailType                      || "",
    parsed.serviceCategory                || "",
    sanitizeAddress(parsed.propertyAddress) || "",
    parsed.unitNumber                     || "",
    parsed.description     || "",
    parsed.preferredTiming || "",
    parsed.accessInfo      || "",
    parsed.rmName          || "",
    parsed.rmEmail         || "",
    parsed.tenantName      || "",
    parsed.tenantPhone     || "",
    parsed.pteGranted      || "",
    parsed.estimateNeeded  || "",
    "",           // Assigned Tech
    "",           // Scheduled Date
    "",           // Est. Hours
    parsed.confidence === "Low"              ? "Needs Review"
      : parsed.pteGranted === "No"          ? "PTE Required"
      : parsed.estimateNeeded === "Yes"     ? "Awaiting Approval"
      : "Ready to Schedule",               // Status
    "",           // Notes
    msgId || "",                         // Gmail Msg ID — col 22
    "",                                  // Calendar Event ID — col 23
    parsed.tenantEmail           || "",  // Tenant Email — col 24
    parsed.tenantPreferredContact || "", // Tenant Pref Contact — col 25
    parsed.tenantHasPets         || "",  // Tenant Has Pets — col 26
    parsed.wcCode                || "",  // WC_CODE — col 27
    "APT-CA"                             // ENTITY_ID — col 28
  ];
  if (!neonOnly) { dispatchSheet.appendRow(rowData); }

  // Sync to Neon
  try {
    if (typeof syncJobToNeon === 'function') {
      syncJobToNeon(getJobDataFromRow(rowData));
    }
  } catch (e) {
    Logger.log('Shadow-sync failed for new job: ' + e.message);
  }

  if (!neonOnly) {
    var newRow = dispatchSheet.getLastRow();
    var range  = dispatchSheet.getRange(newRow, 1, 1, 26);
    if      (priority === "1-URGENT")      range.setBackground("#FFE0CC");
    else if (priority === "3-PTE-PENDING") range.setBackground("#FFF3CD");
    else if (priority === "2-TURNOVER")    range.setBackground("#D4EDDA");
  }
}

// ============================================================
// SHEET LOGGING
// ============================================================
function logToSheet(sheet, parsed, senderEmail, subject, threadBody, date, msgId, isBackfill) {
var leadId = getNextLeadId(sheet, isBackfill);

  sheet.appendRow([
    Utilities.formatDate(date, Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm"),
    leadId,
    parsed.senderName             || "",
    senderEmail,
    parsed.senderType             || "",
    parsed.companyName            || "",
    sanitizeAddress(parsed.propertyAddress) || "",
    parsed.unitNumber                       || "",
    parsed.city                   || "",
    parsed.laphamPropId           || "",
    parsed.emailType              || "",
    parsed.leadType               || "",
    parsed.serviceCategory        || "",
    parsed.urgency                || "",
    parsed.description            || "",
    parsed.preferredTiming        || "",
    parsed.accessInfo             || "",
    parsed.rmName                 || "",
    parsed.rmEmail                || "",
    parsed.tenantName             || "",
    parsed.tenantPhone            || "",
    parsed.tenantEmail            || "",
    parsed.tenantPreferredContact || "",
    parsed.tenantHasPets          || "",
    parsed.pteGranted             || "",
    parsed.pteNotes               || "",
    parsed.estimateNeeded         || "",
    parsed.propertyKnown ? "Yes" : "No",
    parsed.subjectLineAddressUsed ? "Yes" : "No",
    parsed.confidence             || "",
    parsed.confidenceNotes        || "",
    isBackfill ? "N/A" : "Pending",
    "New",
    subject,
    threadBody.substring(0, 600),
    msgId
  ]);

  var newRow = sheet.getLastRow();
  var range  = sheet.getRange(newRow, 1, 1, 36);
  if      (parsed.urgency    === "Urgent")      range.setBackground("#FFE0CC");
  else if (parsed.pteGranted === "No")          range.setBackground("#FFF3CD");
  else if (parsed.emailType  === "turnover")    range.setBackground("#D4EDDA");
  else if (parsed.emailType  === "inspection")  range.setBackground("#E8D5F5");
  else if (parsed.emailType  === "new_inquiry") range.setBackground("#CCE5FF");

  if (parsed.confidence === "Low") {
    sheet.getRange(newRow, 30).setNote("Low confidence — verify manually.");
  }

  return leadId;
}
function getNextLeadId(sheet, isBackfill) {
  var prefix = isBackfill ? "HIST" : "APT";
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return prefix + "-00001";
 
  // Read all existing Lead IDs from col B and find the max number
  var ids = sheet.getRange(2, 2, lastRow - 1, 1).getValues()
    .map(function(r) { return String(r[0] || ""); })
    .filter(function(id) { return id.match(/^(APT|HIST)-\d+$/); })
    .map(function(id) { return parseInt(id.split("-")[1], 10); })
    .filter(function(n) { return !isNaN(n); });
 
  var maxId = ids.length > 0 ? Math.max.apply(null, ids) : 0;
  return prefix + "-" + String(maxId + 1).padStart(5, "0");
}
// ============================================================
// NEW CONTACT FLAGGING
// ============================================================
function flagNewContactsForReview(reviewSheet, parsed, laphamDb, leadId) {
  // ── KNOWN OFFICE EMAILS — never use as RM email ──────────
  var OFFICE_EMAILS = [
    "maintenance@laphamcompany.com",
    "website@laphamcompany.com",
    "info@laphamcompany.com"
  ];

  // ── ACCESS INFO CHANGE DETECTION (known properties) ──────
  if (parsed.accessInfoChanged && parsed.propertyKnown) {
    var existingKeys = getColumnValues(reviewSheet, 3);
    var accessKey    = normalizeAddressKey(parsed.propertyAddress, "") + "_access";
    if (!existingKeys.has(accessKey)) {
      reviewSheet.appendRow([
        Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm"),
        leadId,
        sanitizeAddress(parsed.propertyAddress || ""),
        parsed.unitNumber      || "",
        normalizeClientName(parsed.companyName || ""),
        parsed.rmName          || "",
        isOfficeEmail(parsed.rmEmail, OFFICE_EMAILS) ? "" : (parsed.rmEmail || ""),
        isPropertyLevelAccessInfo(parsed.accessInfoNew || "") ? parsed.accessInfoNew : "",
        'ACCESS INFO MAY HAVE CHANGED. On file: "' + (parsed.accessInfoExisting || "") 
          + '" | From email: "' + (parsed.accessInfoNew || "") + '"',
        "Verify & Update Master Directory",
        parsed.senderEmail || "",
        parsed.gmailMsgId  || ""
      ]);
      Logger.log("Access info change flagged: " + parsed.propertyAddress);
    }
    return;
  }

  // ── NEW PROPERTY DETECTION ────────────────────────────────
  if (!parsed.newContactDetected || parsed.propertyKnown) return;

  // Skip if address is not actionable
  if (!parsed.propertyAddress 
      || parsed.propertyAddress === "LOOKUP_BY_SENDER"
      || parsed.propertyAddress === "Unknown") return;

  // Skip if this is an APT internal sender
  if (parsed.senderType === "APT Internal") return;

  // Skip if already flagged
  var existing = getColumnValues(reviewSheet, 3);
  var addrKey  = normalizeAddressKey(parsed.propertyAddress, parsed.unitNumber || "");
  if (existing.has(addrKey)) return;

  // Clean the data before writing
  var cleanRmEmail   = isOfficeEmail(parsed.rmEmail, OFFICE_EMAILS) ? "" : (parsed.rmEmail || "");
  var cleanAccess    = isPropertyLevelAccessInfo(parsed.accessInfo || "") 
                       ? sanitizeAddress(parsed.accessInfo) : "";
  var cleanClient    = normalizeClientName(parsed.companyName || "");
  var cleanAddress   = sanitizeAddress(parsed.propertyAddress || "");

  // Build a meaningful notes field
  var notes = parsed.newContactNotes || "Property not in Master Directory.";
  if (!cleanRmEmail && parsed.rmEmail) {
    notes += " RM email '" + parsed.rmEmail + "' appears to be an office address — verify directly.";
  }
  if (!cleanAccess && parsed.accessInfo) {
    notes += " Access info '" + parsed.accessInfo + "' appears job-specific — verify with RM.";
  }

  reviewSheet.appendRow([
    Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm"),
    leadId,
    cleanAddress,
    parsed.unitNumber  || "",
    cleanClient,
    parsed.rmName      || "",
    cleanRmEmail,
    cleanAccess,
    notes,
    "Pending Review",
    parsed.senderEmail || "",
    parsed.gmailMsgId  || ""   // col 12 — original email link
  ]);

  Logger.log("New contact flagged: " + cleanAddress + " | " + leadId);
}

// ── HELPER — checks if an email is a known office address ──
function isOfficeEmail(email, officeEmails) {
  if (!email) return false;
  var e = email.toLowerCase().trim();
  for (var i = 0; i < officeEmails.length; i++) {
    if (e === officeEmails[i].toLowerCase()) return true;
  }
  return false;
}
// ── Maps all Lapham company name variants to canonical "Lapham" ──
function normalizeClientName(client) {
  if (!client) return "";
  var c = client.toLowerCase().trim();
  if (c.indexOf("lapham") !== -1) return "Lapham";
  return client.trim();
}
// ============================================================
// GMAIL LABELS
// ============================================================
function applyClassificationLabels(thread, parsed, existingLabels) {
  try {
    if (parsed.emailType === "turnover" && existingLabels.indexOf(TURNOVER_LABEL) === -1) {
      var lbl = GmailApp.getUserLabelByName(TURNOVER_LABEL) || GmailApp.createLabel(TURNOVER_LABEL);
      thread.addLabel(lbl);
    }
    if (parsed.emailType === "inspection" && existingLabels.indexOf(INSPECTION_LABEL) === -1) {
      var lbl2 = GmailApp.getUserLabelByName(INSPECTION_LABEL) || GmailApp.createLabel(INSPECTION_LABEL);
      thread.addLabel(lbl2);
    }
  } catch(e) { Logger.log("Label error: " + e.message); }
}

function applyProcessedLabel(thread) {
  try {
    var lbl = GmailApp.getUserLabelByName(PROCESSED_LABEL) || GmailApp.createLabel(PROCESSED_LABEL);
    thread.addLabel(lbl);
  } catch(e) { Logger.log("Processed label error: " + e.message); }
}

// ============================================================
// ADDRESS HELPERS
// ============================================================
function extractAddressFromSubject(subject) {
  var match = subject.match(/\b(\d{2,5}\s+[A-Za-z][A-Za-z0-9\s\.]{3,35}(?:Ave|St|Blvd|Way|Dr|Ln|Rd|Pl|Ct|Terr?|Hwy|Telegraph|Broadway|College|Piedmont|Harrison|Madison|Regent|Moss|Stannage|Hanover|Dwight|Liberty|Warwick|Ruby|Merritt|Adeline|Claremont|Shattuck)[^\-\|\n]*)/i);
  return match ? match[1].replace(/\s+/g, " ").trim() : null;
}

// ============================================================
// SHEET HELPERS
// ============================================================
function getProcessedMessageIds(sheet, msgIdCol) {
  var ids  = new Set();
  var last = sheet.getLastRow();
  if (last < 2) return ids;
  sheet.getRange(2, msgIdCol, last - 1, 1).getValues()
    .forEach(function(r) { if (r[0]) ids.add(String(r[0])); });
  return ids;
}

function getColumnValues(sheet, col) {
  var vals = new Set();
  var last = sheet.getLastRow();
  if (last < 2) return vals;
  sheet.getRange(2, col, last - 1, 1).getValues()
    .forEach(function(r) { if (r[0]) vals.add(String(r[0]).toLowerCase().trim()); });
  return vals;
}

// ============================================================
// UTILITIES
// ============================================================
function buildThreadContext(messages) {
  return messages.slice(-3).map(function(m, i) {
    return "--- Msg " + (i+1) + " | From: " + m.getFrom() + " | " + m.getDate() + " ---\n" + m.getPlainBody().substring(0, 2000);
  }).join("\n\n");
}

function extractEmail(raw) {
  var m = raw.match(/<([^>]+)>/) || raw.match(/[\w.-]+@[\w.-]+\.\w+/);
  return m ? (m[1] || m[0]).toLowerCase() : raw.toLowerCase();
}

function sanitizeAddress(address) {
  if (!address) return address;
  return String(address)
    .replace(/##/g, "#")           // ## → #
    .replace(/\s{2,}/g, " ")       // collapse double spaces
    .trim();
}

function fmtAddr(parsed) {
  if (!parsed.propertyAddress || parsed.propertyAddress === "Unknown" || parsed.propertyAddress === "LOOKUP_BY_SENDER") return "";
  return " at " + parsed.propertyAddress + (parsed.unitNumber ? " Unit " + parsed.unitNumber : "");
}

function getApiKey() {
  var key = PropertiesService.getScriptProperties().getProperty("GEMINI_API_KEY");
  if (!key) Logger.log("ERROR: GEMINI_API_KEY not set.");
  return key;
}

// ============================================================
// TRIGGER SETUP
// ============================================================
function setupTrigger() {
  ScriptApp.getProjectTriggers().forEach(function(t) {
    if (t.getHandlerFunction() === "checkNewLeadEmails") ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger("checkNewLeadEmails").timeBased().everyMinutes(POLL_MINUTES).create();
  Logger.log("Live trigger set: every " + POLL_MINUTES + " minutes.");
}

// ============================================================
// DASHBOARD BACKEND
// ============================================================
// ============================================================
// NEW CONTACTS
// ============================================================
function addToMasterDirectory(contact) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(LAPHAM_TAB_NAME);
  if (!sheet) throw new Error('"' + LAPHAM_TAB_NAME + '" tab not found');
 
  var cleanAddress = (contact.address || '')
    .replace(/\s*(unit|apt|#|suite|ste|unit\s*#)\s*[\w-]+/gi, '')
    .trim();
 
  var cleanAccess = (contact.accessInfo || '');
  if (/\d{3}[-.]?\d{3}[-.]?\d{4}/.test(cleanAccess) ||
      /tenant|must be present|call.*to schedule/i.test(cleanAccess)) {
    cleanAccess = '';
  }
 
  var propId = (contact.client && contact.client !== 'Lapham')
    ? 'APT-P-' + String(sheet.getLastRow()).padStart(3, '0')
    : '';
 
  sheet.appendRow([
    propId,
    contact.client    || 'Lapham',
    contact.rmName    || '',
    cleanAddress,
    contact.rmEmail   || '',
    cleanAccess
  ]);
 
  var reviewSheet = ss.getSheetByName(REVIEW_SHEET_NAME);
  if (reviewSheet && contact.rowIndex) {
    reviewSheet.getRange(contact.rowIndex, 10).setValue('Added');
  }
 
  return true;
}
function dismissNewContact(rowIndex) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(REVIEW_SHEET_NAME);
  if (sheet && rowIndex) {
    sheet.getRange(rowIndex, 10).setValue('Dismissed');
  }
}

// ============================================================
// DASHBOARD COMMUNICATIONS
// ============================================================
function sendDashboardEmail(params) {
  var body = params.body + '\n\n—\nSent via APT Dispatch Dashboard\nRef: ' + (params.leadId || '');
  GmailApp.sendEmail(
    params.to,
    params.subject,
    body,
    { name: 'APT Maintenance', replyTo: WORKORDER_EMAIL }
  );
  Logger.log('Dashboard email sent to ' + params.to + ' | ' + params.leadId);

  // Log contact timestamp to dispatch queue Notes field for follow-up tracking
  if (params.logContact && params.leadId) {
    try {
      var ss            = SpreadsheetApp.getActiveSpreadsheet();
      var dispatchSheet = ss.getSheetByName(DISPATCH_SHEET);
      if (dispatchSheet) {
        var data      = dispatchSheet.getDataRange().getValues();
        var timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm");
        var method    = params.contactMethod || "email";
        var tag       = "[CONTACTED: " + timestamp + " | " + method + "]";
        for (var i = 1; i < data.length; i++) {
          if (String(data[i][1]) === params.leadId) {
            var existing = String(data[i][20] || "").replace(/\[CONTACTED:[^\]]+\]/g, "").trim();
            dispatchSheet.getRange(i + 1, 21).setValue(existing ? existing + "\n" + tag : tag);
            break;
          }
        }
      }
    } catch(e) {
      Logger.log("sendDashboardEmail contact log error: " + e.message);
    }
  }

  return true;
}
// ============================================================
// OPTION B — MINI-INBOX: Thread fetch + reply
// ============================================================

function getGmailThread(msgId) {
  if (!msgId) return { error: 'No message ID provided' };
  try {
    var message = GmailApp.getMessageById(msgId);
    if (!message) return { error: 'Message not found' };

    var thread   = message.getThread();
    var messages = thread.getMessages();

    var result = messages.map(function(m) {
      var rawFrom = m.getFrom();
      // Strip display name angle-bracket format for cleaner rendering
      var emailMatch = rawFrom.match(/<([^>]+)>/);
      var fromEmail  = emailMatch ? emailMatch[1] : rawFrom;
      var fromName   = emailMatch ? rawFrom.replace(/<[^>]+>/, '').trim().replace(/^"|"$/g, '') : rawFrom;

      // Prefer plain body; fall back to stripping HTML tags from HTML body
      var body = m.getPlainBody();
      if (!body || body.trim() === '') {
        body = m.getBody().replace(/<[^>]+>/g, ' ').replace(/\s{2,}/g, ' ').trim();
      }
      // Truncate very long bodies — dispatcher doesn't need full quoted history
      if (body.length > 2000) body = body.substring(0, 2000) + '\n\n[Message truncated — view in Gmail for full text]';

      return {
        id      : m.getId(),
        from    : fromName || fromEmail,
        fromEmail: fromEmail,
        date    : Utilities.formatDate(m.getDate(), Session.getScriptTimeZone(), "MMM d, yyyy 'at' h:mm a"),
        subject : m.getSubject(),
        body    : body,
        isOutbound: fromEmail.toLowerCase().indexOf('aptmaintenanceinc.com') !== -1
      };
    });

    return {
      threadId      : thread.getId(),
      subject       : thread.getFirstMessageSubject(),
      messageCount  : messages.length,
      messages      : result
    };
  } catch(e) {
    Logger.log('getGmailThread error: ' + e.message);
    return { error: e.message };
  }
}

function replyToThread(msgId, body) {
  if (!msgId || !body) return { success: false, error: 'Missing msgId or body' };
  try {
    var message = GmailApp.getMessageById(msgId);
    if (!message) return { success: false, error: 'Original message not found' };

    var sig = '\n\n—\nRobert\nDispatcher | APT Maintenance\n510-747-9713 | workorder@aptmaintenanceinc.com';
    var fullBody = body + sig;

    // GmailApp.reply sends from the account that owns the script (workorder@)
    // The 'name' option sets the display name on the outbound message
    message.reply(fullBody, {
      name: 'Robert @ APT Maintenance'
    });

    Logger.log('replyToThread: replied on thread for msg ' + msgId);
    return { success: true };
  } catch(e) {
    Logger.log('replyToThread error: ' + e.message);
    return { success: false, error: e.message };
  }
}
function getDraftReply(params) {
  var apiKey = getApiKey();
  if (!apiKey) return { subject: '', body: '' };

  var ss             = SpreadsheetApp.getActiveSpreadsheet();
  var leadsSheet     = ss.getSheetByName(LEADS_SHEET_NAME);
  var threadPreview  = '';
  var originalSubject = '';

  if (leadsSheet && params.leadId) {
    var data = leadsSheet.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
      if (String(data[i][1]) === params.leadId) {
        originalSubject = String(data[i][33] || '');
        threadPreview   = String(data[i][34] || '');
        break;
      }
    }
  }

  var j = params.jobData;
  var context =
    "You are drafting a professional email on behalf of APT Maintenance Inc., "
    + "a Bay Area property maintenance company.\n\n"
    + "ORIGINAL EMAIL SUBJECT: " + originalSubject + "\n"
    + "ORIGINAL EMAIL PREVIEW:\n" + threadPreview.substring(0, 1500) + "\n\n"
    + "JOB DETAILS:\n"
    + "- Property: " + (j.address || '') + (j.unit ? ' Unit ' + j.unit : '') + "\n"
    + "- Issue: " + (j.description || '') + "\n"
    + "- Service Type: " + (j.serviceCategory || '') + "\n"
    + "- Status: " + (j.status || '') + "\n"
    + (j.tenantName   ? "- Tenant: "        + j.tenantName   + "\n" : '')
    + (j.tenantPhone  ? "- Tenant Phone: "  + j.tenantPhone  + "\n" : '')
    + (j.rmName       ? "- RM: "            + j.rmName       + "\n" : '')
    + (j.assignedTech ? "- Assigned Tech: " + j.assignedTech + "\n" : '')
    + (j.scheduledDate ? "- Scheduled: "    + j.scheduledDate + "\n" : '')
    + "\nREPLY TYPE: " + params.replyType + "\n\n";

  var instruction = "Draft a brief, professional follow-up email to the Resident Manager. "
    + "Acknowledge receipt of the work order, confirm the next steps, "
    + "and provide any scheduling details if available. "
    + "Keep it under 100 words. Do not use internal lead IDs in the subject. "
    + "Use the property address in the subject line. Signed 'APT Maintenance'.";

  var prompt = context + instruction
    + "\n\nRespond ONLY with a JSON object in this exact format, no markdown:\n"
    + '{"subject":"...","body":"..."}';

  var url = "https://generativelanguage.googleapis.com/v1beta/models/" + GEMINI_MODEL + ":generateContent?key=" + apiKey;
  try {
    var res  = UrlFetchApp.fetch(url, {
      method: "POST", contentType: "application/json", muteHttpExceptions: true,
      payload: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: 600 }
      })
    });
    var json    = JSON.parse(res.getContentText());
    var rawText = json.candidates[0].content.parts[0].text;
    var draft   = extractJson(rawText);
    return draft || { subject: '', body: '' };
  } catch(e) {
    Logger.log('getDraftReply error: ' + e.message);
    return { subject: '', body: '' };
  }
}
function morningAuditReport() {
  var day = new Date().getDay(); // 0 = Sunday, 6 = Saturday
  if (day === 0 || day === 6) { Logger.log("[Audit] Weekend — skipping briefing."); return; }

  var ss            = SpreadsheetApp.getActiveSpreadsheet();
  var dispatchSheet = ss.getSheetByName(DISPATCH_SHEET);
  if (!dispatchSheet || dispatchSheet.getLastRow() < 2) return;

  var data = dispatchSheet.getDataRange().getValues();
  var jobs = data.slice(1).filter(function(r) { return r[1]; }); // skip empty rows

  // Count by status and priority
  var open      = 0, urgent  = 0, pte     = 0;
  var turnovers = 0, approval = 0, scheduled = 0, complete = 0;

  jobs.forEach(function(r) {
    var status   = String(r[19] || "").trim();
    var priority = String(r[2]  || "").trim();
    var pteVal   = String(r[14] || "").trim();

    if (status === "Complete" || status === "Archived") { complete++; return; }

    open++;
    if (priority === "1-URGENT")                          urgent++;
    if (pteVal   === "No" && status !== "Complete")       pte++;
    if (priority === "2-TURNOVER")                        turnovers++;
    if (status   === "Awaiting Approval")                  approval++;
    if (status   === "Scheduled")                         scheduled++;
  });

  var today     = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "EEEE, MMMM d, yyyy");
  var todayStr  = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");

  // Find jobs scheduled for today
  var scheduledToday = jobs.filter(function(r) {
    var rawDate = String(r[17] || "").split("|")[0].trim();
    var status  = String(r[19] || "").trim();
    return rawDate === todayStr && status !== "Complete" && status !== "Archived";
  });

  var todayLines = scheduledToday.length > 0
    ? scheduledToday.map(function(r) {
        var addr  = String(r[5]  || "Unknown address");
        var unit  = String(r[6]  || "");
        var tech  = String(r[16] || "Unassigned");
        var time  = String(r[17] || "").split("|")[1] || "TBD";
        return "  " + time + " · " + addr + (unit ? " #" + unit : "") + " → " + tech;
      }).join("\n")
    : "  (none scheduled)";

  var report =
    "APT DISPATCH — MORNING BRIEFING\n"
    + today + "\n"
    + "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n"
    + "QUEUE STATUS\n"
    + "  Open jobs:       " + open      + "\n"
    + "  🔴 Urgent:       " + urgent    + "\n"
    + "  🔑 PTE Pending:  " + pte       + "\n"
    + "  🏠 Turnovers:    " + turnovers + "\n"
    + "  ✳ Needs Approval:" + approval  + "\n"
    + "  📅 Scheduled:    " + scheduled + "\n"
    + "  ✓ Complete:      " + complete  + "\n\n"
    + "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    + "SCHEDULED TODAY\n"
    + todayLines + "\n\n"
    + (function() {
        var nowMs = new Date().getTime();
        var stale = jobs.filter(function(r) {
          if (String(r[19] || "").trim() !== "Tenant Contacted") return false;
          var notes = String(r[20] || "");
          var m = notes.match(/\[CONTACTED: (\d{4}-\d{2}-\d{2} \d{2}:\d{2}) \| (\w+)\]/);
          if (!m) return false;
          return (nowMs - new Date(m[1]).getTime()) >= 48 * 3600000;
        });
        if (stale.length === 0) return "";
        return "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
          + "⏰ FOLLOW-UP DUE (" + stale.length + " job" + (stale.length > 1 ? "s" : "") + " — no response 48h+)\n"
          + stale.map(function(r) {
              var addr = String(r[5] || "Unknown");
              var unit = String(r[6] || "");
              var rm   = String(r[10] || "");
              var notes = String(r[20] || "");
              var m = notes.match(/\[CONTACTED: (\d{4}-\d{2}-\d{2} \d{2}:\d{2}) \| (\w+)\]/);
              var since = m ? m[1] : "unknown";
              return "  " + addr + (unit ? " #" + unit : "") + (rm ? " · " + rm : "") + " (last: " + since + ")";
            }).join("\n") + "\n\n";
      })()
    + "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    + (urgent > 0    ? "⚠ " + urgent    + " URGENT job(s) require immediate attention.\n" : "")
    + (pte > 0       ? "⚠ " + pte       + " job(s) waiting on tenant access.\n"          : "")
    + (approval > 0  ? "⚠ " + approval  + " job(s) awaiting Keith / Bem approval.\n"     : "")
    + (urgent === 0 && pte === 0 && approval === 0 ? "✓ No blockers. Queue is clean.\n"   : "")
    + "\nDashboard: https://dispatch.aptmaintenanceinc.com";

  var subjectFlag = urgent > 0    ? "🔴 " + urgent + " URGENT — "
    : pte > 0                     ? "🔑 " + pte    + " PTE Pending — "
    : approval > 0                ? "✳ Approval Needed — "
    : "✓ All Clear — ";

  GmailApp.sendEmail(
    ALERT_EMAIL,
    "APT Dispatch Briefing — " + subjectFlag + today,
    report,
    {
      cc: "keith@aptmaintenanceinc.com, tsegab@aptmaintenanceinc.com, robert@aptmaintenanceinc.com"
    }
  );

  Logger.log("Morning briefing sent. Open: " + open + " | Urgent: " + urgent + " | Scheduled today: " + scheduledToday.length);
}

// function backfillDispatchMsgIds() {
//   var ss            = SpreadsheetApp.getActiveSpreadsheet();
//   var leadsSheet    = ss.getSheetByName(LEADS_SHEET_NAME);
//   var dispatchSheet = ss.getSheetByName(DISPATCH_SHEET);
//   if (!leadsSheet || !dispatchSheet) {
//     Logger.log("Could not find sheets.");
//     return;
//   }

//   // Build a map of LeadID -> MsgID from the Leads sheet
//   var leadsData = leadsSheet.getDataRange().getValues();
//   var msgIdMap  = {};
//   for (var i = 1; i < leadsData.length; i++) {
//     var leadId = String(leadsData[i][1] || '').trim();
//     var msgId  = String(leadsData[i][35] || '').trim();
//     if (leadId && msgId) msgIdMap[leadId] = msgId;
//   }

//   // Now update Dispatch Queue column 22 for any row missing a message ID
//   var dispatchData = dispatchSheet.getDataRange().getValues();
//   var updated = 0;
//   for (var j = 1; j < dispatchData.length; j++) {
//     var dLeadId = String(dispatchData[j][1] || '').trim();
//     var dMsgId  = String(dispatchData[j][21] || '').trim();
//     if (dLeadId && !dMsgId && msgIdMap[dLeadId]) {
//       dispatchSheet.getRange(j + 1, 22).setValue(msgIdMap[dLeadId]);
//       updated++;
//     }
//   }
//   Logger.log("Backfilled Gmail Msg IDs for " + updated + " dispatch rows.");
// }

// ── UPDATED getDispatchHeaders() — REPLACE EXISTING FUNCTION ─
// Adds col 23: Calendar Event ID

// ============================================================
// UPDATED updateJob() — replace your existing updateJob()
// Changes vs previous version:
//   - If status is not Scheduled, OR date/time are blank,
//     deletes any existing calendar event and clears col 23
//   - If status IS Scheduled with date+time, creates/updates event
// ============================================================
// ============================================================
// 1. CATCH-UP RUN — processes emails missed during today's failure window
// Run once manually, then delete
// ============================================================
// function catchUpMissedEmails() {
//   var apiKey = getApiKey();
//   if (!apiKey) return;

//   var laphamDb      = loadLaphamDatabase();
//   var ss            = SpreadsheetApp.getActiveSpreadsheet();
//   var leadsSheet    = ss.getSheetByName(LEADS_SHEET_NAME);
//   var reviewSheet   = ss.getSheetByName(REVIEW_SHEET_NAME);
//   var dispatchSheet = ss.getSheetByName(DISPATCH_SHEET);
//   if (!leadsSheet || !reviewSheet || !dispatchSheet) {
//     Logger.log("ERROR: Required sheets not found."); return;
//   }
//   var processedIds = getProcessedMessageIds(leadsSheet, 36);

//   // Search last 3 days to catch anything missed during the failure window
//   var query   = "to:" + WORKORDER_EMAIL + " newer_than:3d";
//   var threads = GmailApp.search(query, 0, 100);
//   Logger.log("[CatchUp] " + threads.length + " threads in 3-day window.");

//   var processed = 0;
//   var skipped   = 0;

//   threads.forEach(function(thread) {
//     var messages = thread.getMessages();
//     var firstUnprocessed = null;
//     for (var i = 0; i < messages.length; i++) {
//       if (!messages[i]) continue;
//       if (!processedIds.has(messages[i].getId())) {
//         firstUnprocessed = messages[i]; break;
//       }
//     }
//     if (!firstUnprocessed) { skipped++; return; }

//     var sender = firstUnprocessed.getFrom();
//     if (sender.indexOf(WORKORDER_EMAIL) !== -1) {
//       applyProcessedLabel(thread); skipped++; return;
//     }

//     // Pre-filter before calling Gemini
//     var subject = firstUnprocessed.getSubject();
//     var preview = firstUnprocessed.getPlainBody().substring(0, 500);
//     if (shouldSkipEmail(sender, subject, preview)) {
//       applyProcessedLabel(thread); skipped++;
//       Logger.log("[CatchUp] Pre-filtered: " + subject);
//       return;
//     }

//     var threadContext  = buildThreadContext(messages);
//     var date           = firstUnprocessed.getDate();
//     var msgId          = firstUnprocessed.getId();
//     var existingLabels = thread.getLabels().map(function(l){ return l.getName(); });
//     var preLabeled     = {
//       turnover:   existingLabels.indexOf(TURNOVER_LABEL) !== -1,
//       inspection: existingLabels.indexOf(INSPECTION_LABEL) !== -1
//     };

//     var parsed = parseWithGemini(apiKey, sender, subject, threadContext, laphamDb, preLabeled);
//     if (!parsed) { applyProcessedLabel(thread); return; }

//     enrichFromLaphamDb(parsed, laphamDb, sender);
//     checkForMissingEmail(parsed, laphamDb, reviewSheet);

//     var leadId = logToSheet(leadsSheet, parsed, sender, subject, threadContext, date, msgId, false);
//     addToDispatchQueue(dispatchSheet, parsed, leadId, msgId);
//     applyClassificationLabels(thread, parsed, existingLabels);
//     routeLead(parsed, leadId, firstUnprocessed);
//     flagNewContactsForReview(reviewSheet, parsed, laphamDb, leadId);
//     applyProcessedLabel(thread);

//     processed++;
//     Utilities.sleep(1500); // conservative delay between Gemini calls
//     Logger.log("[CatchUp] Done: " + leadId + " | " + parsed.emailType);
//   });

//   Logger.log("[CatchUp] Complete. Processed: " + processed + " | Skipped: " + skipped);
// }

// ============================================================
// 2. PRE-FILTER — skip emails that are clearly not work orders
// Call this BEFORE parseWithGemini in checkNewLeadEmails
// Returns true if the email should be skipped
// ============================================================
function shouldSkipEmail(sender, subject, bodyPreview) {
  var s = (subject || "").toLowerCase();
  var b = (bodyPreview || "").toLowerCase();
  var from = (sender || "").toLowerCase();

  // Skip auto-replies, delivery failures, out-of-office
  if (s.indexOf("auto-reply") !== -1) return true;
  if (s.indexOf("out of office") !== -1) return true;
  if (s.indexOf("delivery failed") !== -1) return true;
  if (s.indexOf("mailer-daemon") !== -1) return true;
  if (s.indexOf("undeliverable") !== -1) return true;
  if (from.indexOf("mailer-daemon") !== -1) return true;
  if (from.indexOf("no-reply") !== -1 && from.indexOf("lapham") === -1) return true;

  // Skip emails that are purely administrative with no repair content
  var adminSubjects = [
    "thank you", "thanks!", "received", "confirmed", "invoice",
    "payment", "receipt", "statement", "for rent", "vacancy",
    "rent ready", "re: re: re:"
  ];
  for (var i = 0; i < adminSubjects.length; i++) {
    if (s === adminSubjects[i]) return true; // exact match only — don't skip "thank you for the repair"
  }

  // Skip if body contains no repair/maintenance signals at all
  // Only skip if BOTH subject and body lack any work order signal
  var workOrderSignals = [
    "repair", "fix", "broken", "leak", "plumb", "electric", "hvac",
    "heat", "water", "window", "door", "paint", "unit", "tenant",
    "maintenance", "turnover", "inspection", "work order", "schedule",
    "access", "lockbox", "entry", "pest", "mold", "damage", "replace",
    "install", "appliance", "stove", "fridge", "toilet", "sink", "fan",
    "light", "outlet", "circuit", "roof", "floor", "wall", "ceiling"
  ];

  var hasSignal = false;
  for (var j = 0; j < workOrderSignals.length; j++) {
    if (s.indexOf(workOrderSignals[j]) !== -1 || b.indexOf(workOrderSignals[j]) !== -1) {
      hasSignal = true; break;
    }
  }

  // Only skip if absolutely no work order signal present
  // Be conservative — false negatives (missing a lead) are worse than false positives
  if (!hasSignal) {
    Logger.log("[PreFilter] No work order signal in: " + subject);
    return true;
  }

  return false;
}

// ============================================================
// 3. UNIT-AWARE DUPLICATE DETECTION — replace isDuplicateJob()
// ============================================================
function isDuplicateJob(dispatchSheet, address, unitNumber, emailType) {
  var data    = dispatchSheet.getDataRange().getValues();
  var normKey = normalizeAddressKey(address, unitNumber);

  for (var i = 1; i < data.length; i++) {
    var existingAddress = String(data[i][5]  || "");
    var existingUnit    = String(data[i][6]  || "");
    var existingStatus  = String(data[i][19] || "").toLowerCase().trim();
    var existingType    = String(data[i][3]  || "").toLowerCase().trim();

    if (existingStatus === "complete" || existingStatus === "archived") continue;
    if (existingType === "turnover" || emailType === "turnover") continue;

    var existingKey = normalizeAddressKey(existingAddress, existingUnit);
    if (existingKey === normKey) return true;
  }
  return false;
}

function buildSmartPropertyContext(laphamDb, sender, subject) {
  if (!laphamDb || laphamDb.length === 0) return "";

  var senderEmail  = extractEmail(sender).toLowerCase();
  var subjectLower = (subject || "").toLowerCase();
  var matched      = [];

  for (var i = 0; i < laphamDb.length; i++) {
    var prop  = laphamDb[i];
    var score = 0;

    if (prop.rmEmail && prop.rmEmail === senderEmail) score += 10;

    if (prop.address) {
      var addrTokens = prop.address.toLowerCase().split(/\s+/).slice(0, 3);
      addrTokens.forEach(function(token) {
        if (token.length > 3 && subjectLower.indexOf(token) !== -1) score += 2;
      });
    }

    if (score > 0) matched.push({ prop: prop, score: score });
  }

  matched.sort(function(a, b) { return b.score - a.score; });
  var top = matched.slice(0, 5);

  if (top.length === 0) return "";

  return "KNOWN PROPERTIES (matched to this email):\n"
    + top.map(function(m) {
        return "- " + m.prop.address
          + (m.prop.rmName  ? " | RM: " + m.prop.rmName  : "")
          + (m.prop.rmEmail ? " | Email: " + m.prop.rmEmail : "");
      }).join("\n");
}
function normalizeAddressKey(address, unit) {
  // Normalize ## → # first
  var addr = String(address || "").replace(/##/g, "#");

  // Extract unit embedded in address string (e.g. "3053 Dohr #4", "40 Moss Ave #106")
  var embeddedUnit = addr.match(/#(\w+)/);
  if (embeddedUnit && !unit) {
    unit = embeddedUnit[1];
  }
  addr = addr.replace(/#\w+/g, "").trim();

  // Strip city/state suffix — everything from first comma onward
  // e.g. "3126 College Ave, Berkeley, CA" → "3126 College Ave"
  addr = addr.split(",")[0].trim();

  // Strip common directional suffixes that vary by email
  // e.g. "Ave." vs "Ave" vs "Avenue"
  addr = addr.replace(/\b(avenue|ave|street|st|boulevard|blvd|drive|dr|road|rd|lane|ln|way|place|pl|court|ct|terrace|terr)\b\.?/gi, function(m) {
    return m.replace(/\.$/, "").toLowerCase();
  });

  // Lowercase, strip remaining punctuation, collapse spaces
  addr = addr.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();
  unit = String(unit || "").toLowerCase().replace(/[^a-z0-9]/g, "").trim();

  return addr + "||" + unit;
}

// ============================================================
// INBOUND REPLY DETECTION (Sprint 6A)
// ============================================================

/**
 * Searches Dispatch Queue Col 22 (Gmail Msg ID, 1-indexed) for any message ID in the thread.
 * Returns Lead ID from Col 2 if found, null otherwise.
 */
function getJobIdForThread(dispatchSheet, messages) {
  var data   = dispatchSheet.getDataRange().getValues();
  var msgIds = messages.map(function(m) { return m ? m.getId() : null; });
  for (var row = 1; row < data.length; row++) {
    var sheetMsgId = String(data[row][21] || '').trim(); // Col 22, 0-indexed = 21
    if (sheetMsgId && msgIds.indexOf(sheetMsgId) !== -1) {
      return String(data[row][1] || '').trim(); // Col 2, 0-indexed = 1
    }
  }
  return null;
}

/**
 * Posts inbound reply details to the Dashboard API for storage in Neon.
 */
function writeInboundReplyToNeon(jobId, message) {
  var baseUrl = PropertiesService.getScriptProperties().getProperty('DASHBOARD_API_URL');
  var apiKey  = PropertiesService.getScriptProperties().getProperty('DASHBOARD_API_KEY');
  if (!baseUrl || !apiKey) {
    Logger.log('writeInboundReplyToNeon skipped: DASHBOARD_API_URL or DASHBOARD_API_KEY not set');
    return;
  }
  var fullBody  = message.getPlainBody() || '';
  var fromEmail = message.getFrom()      || '';
  var subject   = message.getSubject()   || '';
  var sentAt    = message.getDate().toISOString();
  var messageId = message.getId();
  var threadId  = message.getThread().getId();
  try {
    UrlFetchApp.fetch(baseUrl + '/api/comms/inbound', {
      method:             'post',
      contentType:        'application/json',
      headers:            { 'x-api-key': apiKey },
      payload:            JSON.stringify({
        jobId:       jobId,
        messageId:   messageId,
        threadId:    threadId,
        fromEmail:   fromEmail,
        toEmail:     'workorder@aptmaintenanceinc.com',
        subject:     subject,
        bodyPreview: fullBody.substring(0, 500),
        fullBody:    fullBody,
        sentAt:      sentAt
      }),
      muteHttpExceptions: true
    });
    Logger.log('writeInboundReplyToNeon OK: ' + jobId + ' | ' + messageId);
  } catch (e) {
    Logger.log('writeInboundReplyToNeon error [' + jobId + ']: ' + e.message);
    // Non-fatal — email processing continues regardless
  }
}