---
phase: operational-loop-1.1
type: execute
branch: feat/send-tenant-contact
files_modified:
  - Code.js
autonomous: true
---

# Spec: sendTenantContact() — PTE Coordination Email (Phase 1 Task 1.1)

## Problem
When a maintenance request arrives with `pteGranted=No`, the dispatch queue entry is created with
status "3-PTE-PENDING" and the PM receives an auto-reply saying "we will contact the tenant to
coordinate access." The actual tenant contact email is never sent — the coordination loop is broken.

## Solution
Add `sendTenantContact(parsed, leadId)` to `Code.js` and wire it in `routeLead()` for
`pteGranted === "No"` cases, guarded by a `TENANT_CONTACT_ENABLED = false` safety flag.

## Files Modified
- `Code.js` (root GAS project — Lead Parsing, clasp push from repo root)

---

## Implementation Tasks

### Task 1: Branch verify
Run `git branch --show-current`. Output must be `feat/send-tenant-contact`.
If not: STOP and report to Claude Code before touching any file.

### Task 2: Add TENANT_CONTACT_ENABLED constant
Location: line ~20 in Code.js, immediately after `AUTO_REPLY_ENABLED` (line 20).

Add this line right after `const AUTO_REPLY_ENABLED = false;`:
```js
const TENANT_CONTACT_ENABLED = false;   // Brandon enables when ready — mirrors AUTO_REPLY_ENABLED
```

### Task 3: Add sendTenantContact() function
Location: after `sendAutoReply()` function ends (line ~788), before the `// ── Commented out` comment (line ~790).

```js
function sendTenantContact(parsed, leadId) {
  if (!parsed.tenantEmail) {
    Logger.log('[TenantContact] Skipped — no tenant email | ' + leadId);
    return;
  }
  var addr = fmtAddr(parsed);
  var firstName = parsed.tenantName ? parsed.tenantName.split(' ')[0] : '';
  var hi = firstName ? 'Hi ' + firstName + ',' : 'Hi there,';
  var subject = '[APT Maintenance] Access Coordination — ' + (parsed.propertyAddress || 'Your Unit');
  var body = hi + '\n\n'
    + 'APT Maintenance has received a maintenance request for your unit' + addr + '. '
    + 'To schedule service, we need to coordinate access with you.\n\n'
    + 'Please reply with a few available times that work for you (mornings and afternoons typically work best). '
    + 'Our team will confirm a date and time as soon as possible.\n\n'
    + 'Work order reference: ' + leadId + '\n\n'
    + 'Thank you,\nAPT Maintenance\n' + OPS_EMAIL;
  try {
    GmailApp.sendEmail(parsed.tenantEmail, subject, body);
    Logger.log('[TenantContact] Sent to ' + parsed.tenantEmail + ' | ' + leadId);
  } catch (e) {
    Logger.log('[TenantContact] Failed | ' + leadId + ': ' + e.message);
  }
}
```

### Task 4: Wire in routeLead()
Location: `routeLead()` function, currently lines 751–754.

Replace the function body so it reads exactly:
```js
function routeLead(parsed, leadId, message) {
  if (AUTO_REPLY_ENABLED) sendAutoReply(message, parsed, leadId);
  if (parsed.emailType === "inspection" && parsed.multipleItems) sendInspectionSummary(parsed, leadId);
  if (TENANT_CONTACT_ENABLED && parsed.pteGranted === "No") sendTenantContact(parsed, leadId);
}
```

### Task 5: Add testSendTenantContact() manual test function
Location: immediately after `sendTenantContact()` closes, before the `// ── Commented out` comment block.

```js
function testSendTenantContact() {
  var mockParsed = {
    tenantName: 'Jane Smith',
    tenantEmail: OPS_EMAIL,
    propertyAddress: '123 Test St',
    unitNumber: 'Apt 4',
    pteGranted: 'No',
    pteNotes: 'Tenant prefers morning',
    rmName: 'Robert Magrino',
    rmEmail: 'robert@example.com',
  };
  sendTenantContact(mockParsed, 'TEST-001');
  Logger.log('[testSendTenantContact] Done — check ' + OPS_EMAIL + ' inbox');
}
```

### Task 6: Verify no regressions
Read Code.js after your edits and confirm ALL of the following:
- `AUTO_REPLY_ENABLED = false` is unchanged
- `TENANT_CONTACT_ENABLED = false` is on the line immediately after it
- `routeLead()` has exactly 3 lines (unchanged existing 2 + new PTE line)
- `sendTenantContact()` is between `sendAutoReply()` and the `// ── Commented out` block
- `testSendTenantContact()` is immediately after `sendTenantContact()`
- No other functions were modified
- No Sheets column indexes touched
- No Neon schema touched
- No auth tokens touched

### Task 7 (final): Diff artifact + commit
```
clasp push --force
git add Code.js
git diff main...HEAD > artifacts/ag_diff.txt
git add artifacts/ag_diff.txt
git commit -m "feat(gas): sendTenantContact() — PTE coordination email, wired in routeLead()"
git push origin HEAD
```
Post `artifacts/ag_diff.txt` to Claude Code. Stop. Wait for PASS.

### Task 8 (separate session): Test sprint
In the GAS editor (script.google.com), open the Lead Parsing project and:
1. Run `testSendTenantContact()` from the editor Run menu
2. Paste the exact Execution Log output into `artifacts/ag_test_results.txt`
3. Confirm log shows: `[TenantContact] Sent to keith@aptmaintenanceinc.com | TEST-001`
4. Confirm `[testSendTenantContact] Done` appears at the end
5. Kill any dev server if running (`Get-NetTCPConnection -LocalPort 3000,3001,3010 -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }`)
6. Post `artifacts/ag_test_results.txt` to Claude Code. Stop. Wait for clear-to-merge.

### Task 9: Merge
Merge only after Claude Code issues "Clear to merge." Not before.

---

## Edge Cases
- `tenantEmail` blank → skip + log `[TenantContact] Skipped` — never crash the lead flow
- `GmailApp.sendEmail()` throws → catch + log `[TenantContact] Failed` — main flow continues
- `tenantName` blank → degrade to "Hi there,"
- `pteGranted !== "No"` (Yes / Not Applicable) → `sendTenantContact` is NOT called
- `TENANT_CONTACT_ENABLED = false` — no email sent until Brandon enables manually
- `AUTO_REPLY_ENABLED` unchanged and unaffected by this change

## PTOW Gate Check (Claude Code pre-action review)
- Auth tokens or session storage keys: NO
- Neon schema changes: NO
- Google Sheets column indexes: NO
- Cross-system writes (Next.js + GAS + Neon in same action): NO
- New `/api/` routes replacing GAS: NO
**VERDICT: PASS — no flags required. AG may proceed.**

## Deployment
```
clasp push --force
```
Run from `C:/PTOW/1_APT_Central_Command/` (repo root).
Per CLAUDE.md: Code.js is manual-deploy only. Do NOT run `clasp deploy` — that is reserved for Brandon.
