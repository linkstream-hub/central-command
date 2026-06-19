# ANTIGRAVITY BACKEND SECURITY BRIEF
**Sprint**: Backend Hardening — Session Token Hashing + Error Alerting + Model Config
**Author**: Claude Code
**Files to touch**: `TechPWA.gs`, `Code.js`, `dashboard-api/DashboardAPI.gs`
**Do NOT touch**: any file in `tech-pwa/`, any `.html` files, `Calendar.js`, `SuggestTechs.js`, `ScheduleMiner.js`

---

## CHANGE 1 — Session Token Hashing (TechPWA.gs)

### Why
Session tokens (UUIDs) are currently stored as plain text in Tech Roster col M. Anyone with spreadsheet read access can impersonate any tech. Store a SHA-256 hash of the token instead; return the plain UUID to the client.

### Current behavior in `handleLogin`
```javascript
const sessionToken = Utilities.getUuid();
techRow[DA_TR.SESSION_TOKEN] = sessionToken;  // stored plain
// ... sheet write ...
return ContentService.createTextOutput(JSON.stringify({
  success: true,
  token: sessionToken,  // returned to client
  ...
}));
```

### New behavior in `handleLogin`
```javascript
const sessionToken = Utilities.getUuid();
const tokenHash = hashToken(sessionToken);
techRow[DA_TR.SESSION_TOKEN] = tokenHash;  // store HASH only
// ... sheet write unchanged ...
return ContentService.createTextOutput(JSON.stringify({
  success: true,
  token: sessionToken,  // return plain UUID to client (client stores this)
  ...
}));
```

### Add this helper function (add once, near top of TechPWA.gs alongside other helpers)
```javascript
function hashToken(token) {
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, token);
  return bytes.map(b => ('0' + (b & 0xFF).toString(16)).slice(-2)).join('');
}
```

### Current behavior in `validateToken`
```javascript
function validateToken(token) {
  // reads Tech Roster, finds row where col M === token (plain comparison)
  const sheet = SpreadsheetApp.openById(MASTER_SHEET_ID).getSheetByName("Tech Roster");
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][DA_TR.SESSION_TOKEN] === token) {
      // check expiry ...
      return { valid: true, techId: ..., techName: ... };
    }
  }
  return { valid: false };
}
```

### New behavior in `validateToken`
```javascript
function validateToken(token) {
  const tokenHash = hashToken(token);  // hash the incoming token
  const sheet = SpreadsheetApp.openById(MASTER_SHEET_ID).getSheetByName("Tech Roster");
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][DA_TR.SESSION_TOKEN] === tokenHash) {  // compare against hash
      // expiry check logic unchanged
      return { valid: true, techId: data[i][0], techName: data[i][1] };
    }
  }
  return { valid: false };
}
```

**Side effect**: All existing sessions are invalidated when this deploys (stored plain UUIDs won't match hashed lookups). Techs will see a login prompt on next app open. This is expected and acceptable.

---

## CHANGE 2 — GEMINI_MODEL Script Property (Code.js)

### Why
The Gemini model is hardcoded as a string literal. Upgrading the model requires a code change + deployment. A Script Property lets Brandon change it from the Apps Script console without touching code.

### Find this pattern in Code.js (there may be 1–3 occurrences)
```javascript
"gemini-2.0-flash"
// or
"gemini-2.5-flash"
// or similar hardcoded model string inside a UrlFetchApp.fetch() call to the Gemini API
```

### Replace with
```javascript
PropertiesService.getScriptProperties().getProperty('GEMINI_MODEL') || 'gemini-2.0-flash'
```

Do this replacement for every occurrence of a hardcoded Gemini model string in Code.js. Do not change any other logic — only the model string reference.

**Brandon must add this Script Property after deploy:**
Go to Apps Script → Project Settings → Script Properties → Add `GEMINI_MODEL` = `gemini-2.0-flash`
(If the property is absent, the fallback default kicks in — no breakage.)

---

## CHANGE 3 — Error Alerting at Entry Points

### Why
When an unhandled exception occurs in production, it silently fails. Brandon has no visibility. Adding a catch at each entry point sends an email to brandon@aptmaintenanceinc.com with the error details.

### Pattern to apply

For **TechPWA.gs** — wrap the existing `doPost` function body:
```javascript
function doPost(e) {
  try {
    // ALL existing doPost logic goes here — do not change it
    // just wrap it in this try/catch
  } catch (err) {
    GmailApp.sendEmail(
      'brandon@aptmaintenanceinc.com',
      '[TechPWA ERROR] ' + (err.message || String(err)),
      'Stack: ' + (err.stack || 'unavailable') + '\n\nRequest: ' + JSON.stringify(e)
    );
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'Internal server error' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

Apply the same pattern to `doGet` in TechPWA.gs.

For **DashboardAPI.gs** — wrap existing `doPost` body:
```javascript
function doPost(e) {
  try {
    // ALL existing doPost logic — do not change it
  } catch (err) {
    GmailApp.sendEmail(
      'brandon@aptmaintenanceinc.com',
      '[DashboardAPI ERROR] ' + (err.message || String(err)),
      'Stack: ' + (err.stack || 'unavailable') + '\n\nRequest: ' + JSON.stringify(e)
    );
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'Internal server error' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

Apply the same pattern to `doGet` in DashboardAPI.gs.

For **Code.js** — wrap `checkNewLeadEmails`:
```javascript
function checkNewLeadEmails() {
  try {
    // ALL existing logic — do not change it
  } catch (err) {
    GmailApp.sendEmail(
      'brandon@aptmaintenanceinc.com',
      '[Code.js ERROR] checkNewLeadEmails: ' + (err.message || String(err)),
      'Stack: ' + (err.stack || 'unavailable')
    );
  }
}
```

Do NOT wrap `morningAuditReport` — it already sends email; a try/catch there could cause email loops on certain failures.

---

## DEPLOYMENT INSTRUCTIONS (Antigravity does NOT deploy — Claude Code verifies first)

After implementing all three changes:

1. Run `cd A:\PTOW\1_APT_Central_Command && clasp push --force` for root project (Code.js + TechPWA.gs)
2. Run `cd dashboard-api && clasp push --force` for DashboardAPI
3. **Do NOT deploy Code.js** (root project) — it polls live email every 15min. `clasp push` only, no `clasp deploy`.
4. Deploy DashboardAPI: `clasp deploy --deploymentId AKfycbyum_KLprgPh51GxFiwhsoNHScc4TqIBrzZS0GPfHsnhrc9hAtp03AciyiydhfyJyxCCQ --description "v22 — session token hashing + error alerting"`
5. For TechPWA.gs: it is part of the root `.clasp.json` project. After push, deploy: `clasp deploy --deploymentId AKfycbyFgHHDrZm1NZBG2iQ3czdeRxSGuvjkqyLkx7OCjdkA5vRBCm3IQ1RAEyrbgVp-Y4xs1g --description "v76 — session token hashing + error alerting"`

---

## VERIFICATION (Claude Code checks after Antigravity commits)

```
grep -n "hashToken" TechPWA.gs                    # must appear in handleLogin + validateToken
grep -n "SHA_256" TechPWA.gs                      # must appear in hashToken helper
grep -n "GEMINI_MODEL" Code.js                    # must appear replacing hardcoded model string
grep -n "GmailApp.sendEmail" TechPWA.gs           # must appear in doPost + doGet catch blocks
grep -n "GmailApp.sendEmail" dashboard-api/DashboardAPI.gs  # must appear in doPost + doGet catch blocks
grep -n "GmailApp.sendEmail" Code.js              # must appear in checkNewLeadEmails catch block
```

---

*Generated: April 25, 2026 | APT Central Command — Session 24*
