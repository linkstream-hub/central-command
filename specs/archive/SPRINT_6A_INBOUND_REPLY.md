# Sprint 6A — Code.js Inbound Reply Detection
*Spec author: Claude Code | Session 70*

**Goal:** When a tenant replies to a scheduling email, Code.js detects it and writes it to `comms_messages` in Neon so the Sprint 6B badge has real production data to display.

**Branch:** `feat/sprint6a-inbound-reply` off `main`

---

## Numbered Task List

### Task 1 — New Next.js route: `POST /api/comms/inbound`

**File:** `tech-pwa/src/app/api/comms/inbound/route.ts`

Auth: `x-api-key` header must match `process.env.DASHBOARD_API_KEY`. No session required — this is a server-to-server call from Code.js. Return 401 if key missing or mismatched.

Must export `export const dynamic = 'force-dynamic';`

Accepts JSON body:
```typescript
{
  jobId:       string;
  messageId:   string;
  threadId:    string;
  fromEmail:   string;
  toEmail:     string;
  subject:     string;
  bodyPreview: string;  // first 500 chars
  fullBody:    string;
  sentAt:      string;  // ISO 8601
}
```

Inserts to `comms_messages` with:
- `direction: 'inbound'`
- `stakeholder: 'TENANT'`
- All fields from body
- `.onConflictDoNothing()` — `message_id` is unique, safe to re-run

Returns `{ success: true }` on success, `{ success: false, error: string }` on failure.

**FLAG TO CLAUDE CODE before any deploy:** Confirm x-api-key pattern matches existing Code.js→Next.js auth (`patchJobStatusNeon` in TechPWA.gs uses `headers: { 'x-api-key': apiKey }`).

---

### Task 2 — Code.js helper: `getJobIdForThread(dispatchSheet, messages)`

**File:** `Code.js`

Searches Dispatch Queue Col 22 (Gmail Msg ID, 1-indexed) for any message ID in the thread. Returns Lead ID from Col 2 if found, null otherwise.

```javascript
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
```

---

### Task 3 — Code.js function: `writeInboundReplyToNeon(jobId, message)`

**File:** `Code.js`

```javascript
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
```

---

### Task 4 — Code.js: hook into `threadAlreadyLogged` branch

**File:** `Code.js`, at the `threadAlreadyLogged` block (~line 102)

Replace:
```javascript
if (threadAlreadyLogged) {
  applyProcessedLabel(thread);
  Logger.log("[ThreadDedup] Skipped reply on known thread: " + firstUnprocessed.getSubject());
  batchCount++;
  return;
}
```

With:
```javascript
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
```

---

### Task 5 — TypeScript check + artifacts

```
cd tech-pwa && npx tsc --noEmit
```
Zero errors required.

```
git diff main...HEAD > artifacts/ag_diff.txt
```

Update `artifacts/ag_test_results.txt` with:
- Confirmation that `POST /api/comms/inbound` returns 401 on bad key, 200 on valid key + observed response body
- Logger output from a real Code.js test run (Apps Script → Execution log showing `writeInboundReplyToNeon OK`)

Report one line: "Done. Commit hash: XXXXXXX"

---

## Flags to Claude Code (REQUIRED — raise before any deploy)

1. **Before pushing Next.js:** Confirm x-api-key auth on `/api/comms/inbound` matches existing pattern
2. **Before Code.js deploy:** Confirm cross-system write (Code.js → Next.js → Neon) cleared
3. **Code.js v81 is manual deploy only** — wait for explicit Claude Code clearance:
   `clasp deploy --deploymentId AKfycbyFgHHDrZm1NZBG2iQ3czdeRxSGuvjkqyLkx7OCjdkA5vRBCm3IQ1RAEyrbgVp-Y4xs1g --description "v81"`

---

## What Claude Code reviews next session

- `ag_diff.txt` directly (never prose)
- `/api/comms/inbound` — x-api-key check, `onConflictDoNothing`, `stakeholder='TENANT'`, `force-dynamic`
- `writeInboundReplyToNeon` — try/catch isolation, correct Script Property keys, non-fatal error handling
- `threadAlreadyLogged` hook — outer try/catch does not alter existing return path
- `ag_test_results.txt` — must include real observed API response and Logger output
