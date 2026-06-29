# SPEC P2-2 — Compliance Activation + Infrastructure Truth
# Branch: feat/p2-2-compliance-activation
# Priority: CRITICAL — PAGA exposure accumulating since April 26

---

## GOAL

Close the compliance monitoring gap: the CA Break Compliance Monitor n8n workflow exists,
is Published, but has never fired because nothing calls its webhook. This sprint wires the
trigger, decommissions the ghost Flowise service, exports n8n to version control, and
corrects the documented system state.

Every pay period this stays broken = undetected CA meal/rest violations = PAGA liability.

---

## BRANDON ACTIONS — do these BEFORE AG starts (they unblock AG tasks)

**B1 — Deploy Railway sentinel changes**
In Railway dashboard → apt-infrastructure project → "Apply 11 changes" → Deploy.
These add GITHUB_REPO + GITHUB_TOKEN to all 5 sentinels (optional vars for GitHub issue alerts).
Safe to deploy. No functional change to running services.

**B2 — Get n8n webhook URL**
In n8n UI (https://n8n-production-4f36b.up.railway.app):
1. Open "CA Break Compliance Monitor" workflow
2. Click the Webhook node
3. Copy the **Production URL** (not the Test URL)
4. Provide this URL to AG as the value for Script Property `N8N_COMPLIANCE_WEBHOOK`

**B3 — Add Script Property to TechPWA GAS project**
In GAS console → Lead Parsing project → Project Settings → Script Properties:
- Key: `N8N_COMPLIANCE_WEBHOOK`
- Value: the webhook URL from B2

**B4 — Get n8n API key for workflow export**
In n8n UI → Settings (bottom left) → n8n API → Create an API key.
Run: `python tools/n8n/export.py --url https://n8n-production-4f36b.up.railway.app --api-key YOUR_KEY`
Then: `git add tools/n8n/workflows/ && git commit -m "chore: export n8n workflows to version control"`

**B5 — Decommission Flowise**
In Railway dashboard → apt-infrastructure → flowise service → Settings → Delete Service.
Zero data or flows to preserve. Confirm deletion.

---

## AG TASKS

### Task 1 — Branch setup (mandatory, report output)
```powershell
git branch --show-current   # must output: feat/p2-2-compliance-activation
git ls-remote --heads origin feat/p2-2-compliance-activation  # must be non-empty
git log main..HEAD --oneline  # paste output
```
Mismatch on branch = STOP, report to Claude Code.

### Task 2 — Add compliance webhook call to TechPWA.gs signAttestation()

File: `TechPWA.gs`
Function: `signAttestation()`

After the attestation write succeeds (after the Time Records sheet write, before the return),
add a fire-and-forget POST to the compliance webhook:

```javascript
// Fire compliance check — non-blocking, failure must not break attestation
const complianceWebhook = PropertiesService.getScriptProperties()
  .getProperty('N8N_COMPLIANCE_WEBHOOK');
if (complianceWebhook) {
  try {
    UrlFetchApp.fetch(complianceWebhook, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({
        badgeNumber: badgeNumber,
        date: new Date().toISOString(),
        trigger: 'attestation_signed'
      }),
      muteHttpExceptions: true
    });
  } catch (e) {
    console.warn('Compliance webhook failed (non-fatal):', e.message);
  }
}
```

CRITICAL: `muteHttpExceptions: true` and the try/catch are non-negotiable.
If the webhook is down, the attestation must still succeed. Never block a tech's clock-out
on an external service call.

### Task 3 — Add compliance webhook call to TechPWA.gs handleClockOut()

Same pattern as Task 2. Add the same fire-and-forget block inside `handleClockOut()`,
after the clock-out record is written successfully. Trigger value: `'clock_out'`.

This gives the compliance engine two trigger points:
- Clock-out: immediate check for shift anomalies
- Attestation: final confirmation check

### Task 4 — Update ARCHITECTURE.md GAS trigger inventory

In the GAS Trigger Inventory section, find the Lead Parsing Project table and update the
`dailyScheduleSheetSync` note if the trigger has been confirmed deleted in B1 context.
No other ARCHITECTURE.md changes needed (Claude Code made corrections in S94).

### Task 5 — tsc, diff, push

```powershell
cd tech-pwa && npx tsc --noEmit   # must be zero errors
git diff main...HEAD > artifacts/ag_diff.txt
git add artifacts/ag_diff.txt && git commit -m "chore: update diff artifact"
git push origin HEAD
```

Output the JSON completion block and stop:
```json
{"phase":"implement","status":"complete","tsc_errors":0,"diff_lines":<count>,"commit":"<sha>"}
```
IMPLEMENT COMPLETE — diff ready for review

---

## Task 6 (separate test sprint) — Verify compliance webhook fires

Evidence required in `artifacts/ag_test_results.txt`:

1. **Script Property exists:**
   In GAS console → Lead Parsing → Script Properties → confirm `N8N_COMPLIANCE_WEBHOOK` is set.
   Paste: `N8N_COMPLIANCE_WEBHOOK present: [YES/NO]`

2. **Test webhook call:**
   In GAS console, run a one-off test function that calls the webhook with a dummy payload.
   Paste the n8n execution ID from the n8n UI Executions tab (proves the webhook fired).
   Format: `n8n execution ID: [id from Executions tab]`

3. **ComplianceAlerts sheet:**
   After a test fire, check the ComplianceAlerts tab in the APT Lead Intake Master sheet.
   Paste: `ComplianceAlerts rows after test: [count]` and one example row if violations written.

4. **Playwright:**
   ```powershell
   cd tech-pwa && npx playwright test
   ```
   Paste summary line: `______`

5. **n8n Executions tab:**
   Screenshot of n8n Executions tab showing at least 1 successful execution.
   Commit screenshot to `artifacts/p2-2-n8n-execution.png`.

---

## Task 7 (test sprint) — Confirm Flowise decommissioned

Paste: `flowise-production-3609.up.railway.app — [UNREACHABLE / still reachable]`

---

## Task 8 — Merge gate

Only after Claude Code issues "Clear to merge."

---

## EXPECTED FILE CHANGES

| File | Change |
|---|---|
| `TechPWA.gs` | Add webhook call in `signAttestation()` and `handleClockOut()` |
| `artifacts/ag_diff.txt` | Updated diff |
| `tools/n8n/workflows/ca-break-compliance-monitor.json` | Exported workflow (Brandon runs export script) |
| `tools/n8n/workflows/MANIFEST.json` | Generated by export script |

No other files. Any other file appearing in the diff = STOP, flag to Claude Code.

---

## WHAT THIS SPRINT DOES NOT INCLUDE

- Meal premium dollar calculation — that is P2-3 (requires this sprint to be working first)
- Time Records → Neon migration — later phase
- n8n workflow node changes — workflow is correct, only the trigger was missing
- Any changes to the n8n workflow itself — do not edit it, only call it

---

## POST-SPRINT STATE

After this sprint merges:
- Compliance alerts will write to ComplianceAlerts tab on every attestation sign and clock-out
- sentinel-time-anomaly will start detecting real violations (was always returning empty)
- Flowise is gone from Railway
- n8n workflows are in version control
- PAGA exposure detection is active

The meal premium dollar calculation (P2-3) can now be built on top of a working detection pipeline.
