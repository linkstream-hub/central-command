// ============================================================
// SuggestTechs.gs
// Tech suggestion engine for APT Central Command
//
// Uses three data sources ranked by reliability:
//   1. Keith's manual duration defaults (Trade Duration Defaults sheet)
//   2. Tech assignment frequency by trade (Historical Tech Insights sheet)
//   3. Tech availability today (APT Dispatch Google Calendar)
//
// CALLED FROM:
//   Dashboard via google.script.run.suggestTechsForJob(params)
//
// RETURNS:
//   Array of up to 3 suggestions, each with:
//     { name, score, reasons[], estimatedHrs, availableToday }
//
// SETUP:
//   1. Run setupTradeDurationSheet() once to create the input sheet
//   2. Have Keith fill in the duration defaults
//   3. The suggestion engine is then active automatically
// ============================================================

const DURATION_SHEET    = "Trade Duration Defaults";
const APT_DISPATCH_GCAL = "aptmaintenanceinc.com_hn09n7li3ib0lnc2u0p9qkljvk@group.calendar.google.com";
// Note: replace APT_DISPATCH_GCAL with the actual Calendar ID of
// the "APT Dispatch" Google Calendar created by Calendar.gs
// You can find it in Google Calendar → APT Dispatch → Settings → Calendar ID

// ============================================================
// SETUP — run once to create the duration defaults sheet
// ============================================================
// ============================================================
// MAIN ENTRY POINT
// Called from dashboard: google.script.run.suggestTechsForJob(params)
//
// params: {
//   serviceCategory: string,
//   address: string,
//   proposedDate: "YYYY-MM-DD" (optional — defaults to today)
// }
//
// Returns array of up to 3 suggestion objects
// ============================================================
function suggestTechsForJob(params) {
  try {
    var category    = params.serviceCategory || "General Repair";
    var address     = (params.address        || "").toLowerCase().trim();
    var dateStr     = params.proposedDate    || getTodayStr();

    // Load data sources
    var durations   = loadDurationDefaults();
    var assignments = loadTechAssignments();
    var inactive    = getInactiveTechNames();
    var availability = getTechAvailability(dateStr);

    // Get estimated hours for this trade
    var estHrs = durations[category] || durations["General Repair"] || 4;

    // Score all techs
    var scores = buildTechScores(category, address, assignments, inactive, availability);

    if (scores.length === 0) {
      return [{
        name: "No suggestion available",
        score: 0,
        reasons: ["No historical assignment data for " + category + " yet"],
        estimatedHrs: estHrs,
        availableToday: true
      }];
    }

    // Return top 3
    return scores.slice(0, 3).map(function(s) {
      return {
        name          : s.name,
        score         : s.score,
        reasons       : s.reasons,
        estimatedHrs  : estHrs,
        availableToday: s.availableToday,
        jobsToday     : s.jobsToday
      };
    });

  } catch(e) {
    Logger.log("suggestTechsForJob error: " + e.message);
    return [{ name: "Error", score: 0, reasons: [e.message], estimatedHrs: 4, availableToday: true }];
  }
}

// ============================================================
// SCORING ENGINE
// ============================================================
function buildTechScores(category, address, assignments, inactive, availability) {
  // Build a score for every tech who has ever been assigned
  var techScores = {};

  // ── Factor 1: Trade frequency (0-50 points) ──────────────
  // How often has this tech been assigned to this trade category?
  var tradeKey = "trade||" + category;
  var tradeCounts = assignments[tradeKey] || {};
  var maxTradeCount = Math.max.apply(null, Object.values(tradeCounts).concat([1]));

  Object.keys(tradeCounts).forEach(function(tech) {
    if (inactive.indexOf(tech) !== -1) return;
    if (!techScores[tech]) techScores[tech] = { name: tech, score: 0, reasons: [] };
    var normalized = (tradeCounts[tech] / maxTradeCount) * 50;
    techScores[tech].score    += normalized;
    techScores[tech].tradeCount = tradeCounts[tech];
    techScores[tech].reasons.push(
      tradeCounts[tech] + " prior " + category + " assignment" +
      (tradeCounts[tech] > 1 ? "s" : "")
    );
  });

  // ── Factor 2: Address familiarity (0-30 points) ──────────
  // Has this tech worked at this address before?
  if (address) {
    var addrKey = "addr||" + address;
    var addrCounts = assignments[addrKey] || {};
    Object.keys(addrCounts).forEach(function(tech) {
      if (inactive.indexOf(tech) !== -1) return;
      if (!techScores[tech]) techScores[tech] = { name: tech, score: 0, reasons: [] };
      var pts = Math.min(addrCounts[tech] * 10, 30);
      techScores[tech].score += pts;
      techScores[tech].reasons.push(
        "Worked at this address " + addrCounts[tech] + " time" +
        (addrCounts[tech] > 1 ? "s" : "")
      );
    });
  }

  // ── Factor 3: Keith's skill rating (0-20 points) ─────────
  var skillRatings = loadSkillRatings(category);
  Object.keys(skillRatings).forEach(function(tech) {
    if (inactive.indexOf(tech) !== -1) return;
    if (!techScores[tech]) techScores[tech] = { name: tech, score: 0, reasons: [] };
    var pts = ((4 - skillRatings[tech]) / 3) * 20; // scale 1-3 where 1=best; invert so rank 1 earns 20pts
    techScores[tech].score += pts;
    techScores[tech].skillRating = skillRatings[tech];
    // Only add skill reason if not already noted from trade frequency
    if (!techScores[tech].tradeCount) {
      techScores[tech].reasons.push(
        "Skill rank: " + skillRatings[tech] + "/3 for " + category + " (1=best)"
      );
    }
  });

  // ── Factor 4: Availability penalty (-20 points if busy) ──
  var result = Object.values(techScores);
  result.forEach(function(ts) {
    var jobsToday = availability[ts.name] || 0;
    ts.jobsToday      = jobsToday;
    ts.availableToday = jobsToday < 4; // over 4 jobs = at capacity
    if (jobsToday >= 4) {
      ts.score -= 20;
      ts.reasons.push("⚠ Already has " + jobsToday + " jobs today");
    } else if (jobsToday > 0) {
      ts.reasons.push(jobsToday + " job" + (jobsToday > 1 ? "s" : "") + " already scheduled today");
    } else {
      ts.reasons.push("Available today");
    }
  });

  // Sort by score descending
  result.sort(function(a, b) { return b.score - a.score; });
  return result;
}

// ============================================================
// DATA LOADERS
// ============================================================
function loadDurationDefaults() {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(DURATION_SHEET);
  if (!sheet) {
    Logger.log("Trade Duration Defaults sheet not found — run setupTradeDurationSheet()");
    return {};
  }
  var data   = sheet.getDataRange().getValues();
  var result = {};
  for (var i = 1; i < data.length; i++) {
    var trade = String(data[i][0] || "").trim();
    var hrs   = parseFloat(data[i][1] || 0);
    if (trade && hrs) result[trade] = hrs;
  }
  return result;
}

function loadTechAssignments() {
  // Returns two lookup maps merged from two sources:
  //   "trade||Plumbing" → { techKey: count }
  //   "addr||123 main"  → { techKey: count }
  //
  // Source 1: Historical Assignments (mined from pre-CC scheduling sheet)
  //   Columns: Date | Tech Name | Employee # | Phone | Skill Codes | Job Description | Classified Category | Source
  //   No address data available from mined records.
  //
  // Source 2: Dispatch Queue (live Central Command assignments)
  //   Col 5=Category, Col 6=Address, Col 17=Assigned Tech, Col 20=Status
  //   Provides address familiarity signal + ongoing learning loop.

  var ss     = SpreadsheetApp.getActiveSpreadsheet();
  var result = {};

  // ── Source 1: Historical Assignments ──
  var histSheet = ss.getSheetByName(BT_ASSIGN_SHEET);
  if (histSheet && histSheet.getLastRow() >= 2) {
    var histData = histSheet.getDataRange().getValues();
    var COL = {};
    histData[0].forEach(function(h, i) { COL[String(h).trim()] = i; });

    histData.slice(1).forEach(function(r) {
      var tech     = String(r[COL["Tech Name"]]           || "").trim();
      var empNum   = String(r[COL["Employee #"]]          || "").trim();
      var category = String(r[COL["Classified Category"]] || "").trim();
      if (!tech || !category) return;

      var techKey = empNum ? tech + " #" + empNum : tech;
      var tKey    = "trade||" + category;
      if (!result[tKey]) result[tKey] = {};
      result[tKey][techKey] = (result[tKey][techKey] || 0) + 1;
    });
  }

  // ── Source 2: Dispatch Queue (live assignments — the ongoing learning loop) ──
  var dqSheet = ss.getSheetByName("Dispatch Queue");
  if (dqSheet && dqSheet.getLastRow() >= 2) {
    var dqData = dqSheet.getRange(2, 1, dqSheet.getLastRow() - 1, 20).getValues();
    dqData.forEach(function(r) {
      var category = String(r[4]  || "").trim();         // Col 5
      var address  = String(r[5]  || "").trim().toLowerCase(); // Col 6
      var tech     = String(r[16] || "").trim();         // Col 17
      var status   = String(r[19] || "").trim();         // Col 20

      if (!tech || !category || status === "Archived") return;

      // Trade index
      var tKey = "trade||" + category;
      if (!result[tKey]) result[tKey] = {};
      result[tKey][tech] = (result[tKey][tech] || 0) + 1;

      // Address familiarity index — now available from live queue
      if (address) {
        var aKey = "addr||" + address;
        if (!result[aKey]) result[aKey] = {};
        result[aKey][tech] = (result[aKey][tech] || 0) + 1;
      }
    });
  }

  return result;
}

function loadSkillRatings(serviceCategory) {
  // Maps service category to Tech Roster skill column
  var skillColMap = {
    "Carpentry":    "Carpentry",
    "Painting":     "Carpentry",
    "General Repair":"Carpentry",
    "Renovation":   "Carpentry",
    "Drywall":      "Carpentry",
    "Plumbing":     "Plumbing",
    "Electrical":   "Electrical",
    "HVAC":         "Electrical",
    "Appliance":    "Electrical",
    "Windows":      "Finish Carp",
    "Flooring":     "Carpentry",
    "Structural":   "Structural",
    "Junk Removal": "Janitorial",
    "Fencing":      "Carpentry"
  };

  var skillCol = skillColMap[serviceCategory];
  if (!skillCol) return {};

  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Tech Roster");
  if (!sheet || sheet.getLastRow() < 2) return {};

  var data    = sheet.getDataRange().getValues();
  var headers = data[0].map(function(h){ return String(h).trim(); });
  var colIdx  = headers.indexOf(skillCol);
  if (colIdx === -1) return {};

  var result = {};
  for (var i = 1; i < data.length; i++) {
    var name   = String(data[i][0] || "").trim();
    var badge  = String(data[i][1] || "").trim();
    var rating = parseFloat(data[i][colIdx] || 0);
    if (name && badge && rating > 0) {
      result[name + " #" + badge] = rating;
    }
  }
  return result;
}

function getInactiveTechNames() {
  // Pull from the INACTIVE_EMPLOYEES constant in Dashboard.gs
  // Returns array of name strings
  try {
    return INACTIVE_EMPLOYEES.map(function(e){ return e.name; });
  } catch(err) {
    return [];
  }
}

function getTechAvailability(dateStr) {
  // Returns { techName: jobCount } for the given date
  // from the APT Dispatch Google Calendar
  var result = {};
  try {
    var cal = CalendarApp.getCalendarsByName("APT Dispatch");
    if (!cal || cal.length === 0) return result;

    var parts = dateStr.split("-");
    var start = new Date(parseInt(parts[0]), parseInt(parts[1])-1, parseInt(parts[2]), 0,  0,  0);
    var end   = new Date(parseInt(parts[0]), parseInt(parts[1])-1, parseInt(parts[2]), 23, 59, 59);

    var events = cal[0].getEvents(start, end);
    events.forEach(function(ev) {
      var desc  = ev.getDescription() || "";
      // Extract tech from TECH: line in dispatch event description
      var match = desc.match(/^TECH:\s*(.+)$/m);
      if (match) {
        var techs = match[1].split(",").map(function(t){ return t.trim(); });
        techs.forEach(function(tech) {
          result[tech] = (result[tech] || 0) + 1;
        });
      }
    });
  } catch(e) {
    Logger.log("getTechAvailability error: " + e.message);
  }
  return result;
}

function getTodayStr() {
  return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");
}

// ============================================================
// TEST
// ============================================================
