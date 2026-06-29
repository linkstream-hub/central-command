# Phase 19 — Observability: n8n Error Workflow

**Status:** Ready for implementation  
**Branch:** `feat/phase-19-observability`  
**ADR:** None required — operational wiring, no architectural decision  
**Prereqs:** Phase 18 merged (EventBus + outbox table live)

---

## Scope

One deliverable: wire n8n's built-in error trigger to post operational failures to `DISCORD_OPS_WEBHOOK`.

Sentry is already complete (`tracesSampleRate: 0.1`, `withSentryConfig`, all 3 config files). No code changes needed for Sentry.

---

## Deliverable — n8n Error Workflow

### What it does

n8n has a global "Error Workflow" setting. When any workflow fails (execution error, node crash, timeout), n8n automatically triggers the designated error workflow and passes the failure context.

This workflow captures that context and posts to Discord so ops failures surface immediately.

### Workflow spec

**File:** `tools/n8n/workflows/cc-ops-error-alert.json`  
**Name in n8n:** `CC Ops Error Alert`  
**Trigger:** Error Trigger node (built-in n8n node — fires on workflow failure)

**Nodes:**

```
Error Trigger
  └─ HTTP Request: POST to {{ $env.DISCORD_OPS_WEBHOOK }}
```

**Discord message body:**
```json
{
  "content": "🔴 **n8n workflow failed**\n**Workflow:** {{ $json.workflow.name }}\n**Error:** {{ $json.execution.error.message }}\n**Execution:** {{ $json.execution.url }}"
}
```

**HTTP Request node config:**
- Method: POST
- URL: `{{ $env.DISCORD_OPS_WEBHOOK }}` (n8n env var, not credential)
- Body: JSON (content field above)
- No credentials needed — Discord webhook is an open URL

### n8n setup (Brandon action after workflow imported)

1. Import `cc-ops-error-alert.json` into n8n
2. Activate the workflow
3. Go to n8n Settings → Workflows → Error Workflow → select `CC Ops Error Alert`

---

## TDD Order

This phase has no vitest tests — the workflow is n8n JSON, not Next.js code.

Verification instead:

1. **RED:** Import workflow, trigger a test failure (deactivate any workflow, run it manually to force error)
2. **GREEN:** Confirm Discord message arrives in the ops channel
3. Activate `CC Ops Error Alert` as global error workflow

---

## Env Vars

`DISCORD_OPS_WEBHOOK` must be set in:
- n8n environment variables (Settings → Variables)
- Vercel env vars (for any future Next.js ops alerts)

Verify it exists before activating. If not set, add it now.

---

## Success Criteria

- [ ] `tools/n8n/workflows/cc-ops-error-alert.json` committed
- [ ] Workflow imported and active in n8n
- [ ] Set as global error workflow in n8n settings
- [ ] Test failure triggers Discord message in ops channel
- [ ] `DISCORD_OPS_WEBHOOK` confirmed set in n8n env vars

---

## Out of Scope

- Sentry — already complete
- Alerting on `workflow_events` failures — handled by outbox poller Resend alert (Phase 18)
- PagerDuty / SMS escalation — future phase if needed
