# CENTRAL COMMAND — INCIDENT RUNBOOK
# What to do when something breaks. Written for Brandon as sole responder.
# Last updated: 2026-05-19

---

## QUICK REFERENCE — DASHBOARDS

| System | Dashboard URL | What to check |
|---|---|---|
| Vercel (CC2.0) | vercel.com → central-command project | Deployments, logs, env vars |
| Neon (database) | console.neon.tech | Branch health, connection status |
| GAS — Lead Parsing | script.google.com → "APT Lead Intake" project | Executions, triggers |
| GAS — Dashboard API | script.google.com → "APT Dashboard API" project | Executions, deployments |
| Cloudflare | dash.cloudflare.com | Worker status, logs |
| Sentry | sentry.io → APT Central Command | Error feed, recent events |
| UptimeRobot | uptimerobot.com | Monitor status, alert history |
| Railway | railway.app | Sentinel containers, n8n, Flowise |
| GitHub Actions | github.com/BGB-CRB-Holdings/central-command/actions | CI/CD runs |

---

## ROLLBACK PROCEDURES

### Roll back CC2.0 (Next.js / Vercel)
1. Vercel dashboard → `central-command` project → **Deployments**
2. Find the last successful production deployment (green checkmark)
3. Click the three-dot menu → **Instant Rollback**
4. Production URL reverts within 30 seconds. No code change needed.

### Roll back DashboardAPI.gs
1. `cd dashboard-api && clasp deployments` — lists all deployment versions
2. `clasp deploy --deploymentId AKfycbyum_KLprgPh51GxFiwhsoNHScc4TqIBrzZS0GPfHsnhrc9hAtp03AciyiydhfyJyxCCQ --versionNumber N` — redeploys version N
3. Or in GAS console: script.google.com → Dashboard API project → Deploy → Manage Deployments → select previous version

### Roll back TechPWA.gs
Same pattern as DashboardAPI.gs but from root dir with TechPWA deployment ID.
Current: v84. Previous versions visible in GAS console under Manage Deployments.

### Roll back Code.js
`clasp deploy --deploymentId AKfycbyFgHHDrZm1NZBG2iQ3czdeRxSGuvjkqyLkx7OCjdkA5vRBCm3IQ1RAEyrbgVp-Y4xs1g --versionNumber N`
**Never automate Code.js deploy.** Has active email triggers.

---

## SCENARIO 1 — No new work orders appearing in dashboard

**Expected behavior:** New maintenance request emails processed every 15 min, M–F 6:30am–7pm PT.  
**Alarm:** No new WOs for >1 hour during business hours, or morning audit report not received at 6:30am.

### Step 1 — Confirm emails are arriving
Open Gmail as `workorder@aptmaintenanceinc.com`. Is new mail coming in? If no new mail: forwarding from PM company's system has broken — contact PM company IT, not an APT system issue.

### Step 2 — Check GAS execution log
GAS console → Lead Parsing project → **Executions**. Filter last 2 hours.  
Look for: red X (failure), timeout, quota errors.

| Error | Cause | Fix |
|---|---|---|
| `Exception: Service invoked too many times in a short time: gmail` | Gmail API quota exhausted | Wait ~1 hour for quota reset. Quota resets daily at midnight Pacific. |
| `Exception: Quota exceeded for quota metric 'generate_content'` | Gemini API daily quota hit | Set `GEMINI_MODEL` Script Property to `gemini-1.5-flash` (cheaper quota). Revert next day. |
| `Exception: Service Sheets...` | Sheets API quota | Wait for reset. Or check if another script is hammering the sheet. |
| Timeout (>6 min execution) | Email backlog too large | Temporarily increase trigger frequency or run `checkNewLeadEmails()` manually. |
| Trigger not found in execution log | Time-based trigger was deleted | Run `setupTrigger()` in GAS console to reinstall. |

### Step 3 — Verify triggers are alive
GAS console → Lead Parsing project → **Triggers** (clock icon). You should see:
- `checkNewLeadEmails` — time-driven, every 15 minutes, M–F 6:30am–7pm PT
- `morningAuditReport` — time-driven, ~6:30am daily

If missing: run the setup function in the GAS console to recreate.

### Step 4 — Check Gemini API dashboard
console.cloud.google.com → APIs & Services → Generative Language API → Quotas.  
If quota is showing red: wait for daily reset. No fix needed — parsing resumes automatically.

---

## SCENARIO 2 — Dashboard goes blank or returns errors

**Symptoms:** dispatch.aptmaintenanceinc.com shows blank screen, 500 error, spinning forever, or "API key not configured" message. UptimeRobot fires alert.

### Step 1 — Check Vercel deployment status
Vercel dashboard → `central-command` → Deployments.  
Is the current production deployment green? If red: **Instant Rollback** to the last green deployment. Done.

### Step 2 — Check if it's an API key mismatch
The dashboard goes silently dark if `DASHBOARD_API_KEY` in Vercel env doesn't match `DASHBOARD_API_KEY` Script Property in DashboardAPI.gs.

Check:
1. Vercel → Settings → Environment Variables → `DASHBOARD_API_KEY` — copy value
2. GAS console → Dashboard API project → Project Settings → Script Properties → `DASHBOARD_API_KEY` — compare

If they don't match: update the GAS Script Property to match Vercel (or vice versa). Vercel change takes effect on next deploy; GAS change takes effect immediately.

### Step 3 — Check DashboardAPI.gs execution log
GAS console → Dashboard API project → Executions. Look for failures.

### Step 4 — Check Cloudflare Worker
Cloudflare dashboard → Workers & Pages → `apt-dashboard-api`.  
Check: is the Worker active? Any errors in the metrics? The Worker URL is `api.aptmaintenanceinc.com`.  
If Worker is throwing errors: check Worker code and verify the GAS deployment URL it proxies to is current.

### Step 5 — Check GitHub Actions
Actions tab → `deploy-apps-script.yml`. Did the last deploy to DashboardAPI.gs succeed?  
If it failed: check the logs. May need to re-push to main or manually run clasp deploy.

---

## SCENARIO 3 — Neon database unreachable

**Symptoms:** Dashboard loads but shows empty/stale data. Sentry fires `NeonDbError` or `connection refused`. API routes returning 500.

### Step 1 — Check Neon status
console.neon.tech → your project. Is the branch `main` (production) showing as healthy?  
Also check: neon.tech/docs or their status page for ongoing outages.

**Important:** Most CC2.0 operations fall back gracefully — DashboardAPI.gs reads from Google Sheets, so the core dispatch view still works during a Neon outage. Neon-only features (job comments, comms messages from Neon) will show empty.

### Step 2 — Verify DATABASE_URL is correct
Vercel → Settings → Environment Variables → `DATABASE_URL`.  
Compare to the pooled connection string shown in Neon console → `main` branch → Connection Details.  
If they differ: update Vercel env and trigger a redeploy.

### Step 3 — Wait
Neon outages are rare and typically resolve in <30 minutes. No action needed unless DATABASE_URL is wrong.

---

## SCENARIO 4 — Vercel deploy fails after a push to main

**Symptoms:** Push to `main` triggers Vercel deployment that fails. Vercel sends failure email. Previous production deployment stays live — nothing is broken for users.

### Step 1 — Read the Vercel build log
Vercel → Deployments → failed deployment → **Build Logs**. The error is almost always one of:

| Error | Fix |
|---|---|
| TypeScript error | Fix the type error locally. CI should have caught this — if it didn't, check `ci.yml`. |
| Missing env var | Add the missing variable to Vercel → Settings → Environment Variables. Retrigger deploy. |
| `Cannot find module` | Dependency not in `package.json`. Run `npm install <pkg>` locally, commit `package.json` + `package-lock.json`. |
| Out of memory during build | Next.js build OOM — rare. Contact Claude Code. |

### Step 2 — Retrigger
After fixing the cause: push a new commit to `main`. Vercel auto-deploys. Or: Vercel dashboard → failed deployment → **Redeploy**.

### Step 3 — If urgent and unfixable
Vercel → Deployments → last successful green deployment → **Instant Rollback**. Reverts prod immediately while fix is developed.

---

## SCENARIO 5 — Tech PWA returns 500 / techs can't log in

**Symptoms:** Techs get error on login, clock-in fails, or mark-complete fails. `workorder@aptmaintenanceinc.com` receives `[TechPWA ERROR]` email with stack trace.

### Step 1 — Read the error email
The error email includes the action that failed (`login`, `clockIn`, `markComplete`, etc.) and the stack trace. This is your primary diagnostic.

### Step 2 — Check TechPWA.gs execution log
GAS console → Lead Parsing project (TechPWA.gs lives here) → Executions. Find the failed execution.

### Step 3 — Diagnose by action

| Failed action | Likely cause | Fix |
|---|---|---|
| `login` | Tech Roster sheet read failed, or badge/PIN not found | Check Tech Roster tab in Google Sheets. Verify tech is listed and ACTIVE=true. |
| `clockIn` / `clockOut` | Time Records sheet write failed (quota or permission) | Check Sheets quota. Check Time Records tab is accessible. |
| `markComplete` | Dispatch Queue write failed | Check Dispatch Queue tab. Check Neon write in `/api/jobs/[jobId]` logs. |
| Any | GAS deployment is broken | Roll back TechPWA.gs to previous version (see Rollback section above). |

### Step 4 — Test the CF Worker directly
The Tech PWA goes through `pwa-api.aptmaintenanceinc.com` (Cloudflare Worker).  
If the CF Worker is down: Cloudflare dashboard → Workers & Pages → `apt-techpwa-api`. Check status and metrics.

### Step 5 — Emergency: tech can't clock in before shift
If a tech can't clock in and needs to start their shift, the Dispatcher can manually add a Time Record row to the Time Records sheet with the correct start time. This is a manual override — document it and reconcile later.

---

## SCENARIO 6 — GitHub Actions CI fails on a PR

**Symptoms:** PR to `main` shows failing CI check. Merging is blocked.

### Check the failing job
GitHub → Actions → the failing run. Read the log.

| Job | Common failure | Fix |
|---|---|---|
| `ci.yml` (tsc) | TypeScript error in the branch | Fix the type error |
| `ci.yml` (lint) | ESLint violation | Fix the lint error or add a targeted `// eslint-disable-next-line` with reason |
| `ci.yml` (build) | Next.js build failure | Same as Vercel build failures above |
| `e2e.yml` | E2E test failing | Check the Playwright HTML report artifact uploaded in the job. Read the failure. |
| `deploy-apps-script.yml` | clasp auth expired | clasp login (re-auth) — then re-push |

---

## SCENARIO 7 — Railway Sentinel fires an alert

Five Sentinels run continuously: `health`, `time-anomaly`, `wc-scanner`, `stale-job`, `spec-architect`. They write alerts to the `SentinelLog` tab in Google Sheets.

### Reading a Sentinel alert
Open Google Sheets → APT Lead Intake Master → **SentinelLog** tab.  
Each row has: timestamp, sentinel name, severity, message.

| Sentinel | What it detects | Typical response |
|---|---|---|
| `health` | Component availability | Check the component listed. Cross-reference with this runbook. |
| `time-anomaly` | Clock-in/out gaps, missed punches, double punches | Review the tech's time record. Correct manually if needed. |
| `wc-scanner` | Workers Comp code missing or invalid | Open the job in dispatch dashboard, add the WC code. |
| `stale-job` | Job stuck in a status too long | Check the job — is it actually complete? Update status manually. |
| `spec-architect` | Architecture drift or spec violations | Review with Claude Code at next session. Not urgent. |

---

## SECRET ROTATION SCHEDULE

| Secret | Location | Rotate When | How |
|---|---|---|---|
| `DASHBOARD_API_KEY` | Vercel env (server-only) + GAS Script Property | On suspected exposure | Generate new UUID. Update Vercel env (`DASHBOARD_API_KEY`, no NEXT_PUBLIC prefix). Update GAS Script Property. Must match in both places. |
| `AUTH_SECRET` / `NEXTAUTH_SECRET` | Vercel env | Annually or on suspected exposure | Generate: `openssl rand -base64 32`. Update Vercel env. Triggers logout of all sessions. |
| `DATABASE_URL` | Vercel env | Managed by Neon | If compromised: Neon console → reset connection string. Update Vercel env. |
| `RESEND_API_KEY` | Vercel env | On suspected exposure | Resend dashboard → rotate key. Update Vercel env. |
| `GEMINI_API_KEY` | GAS Script Property | On suspected exposure | GCP console → API keys → regenerate. Update GAS Script Property. |
| `E2E_AUTH_SECRET` | GitHub Actions secrets | Annually | GitHub → Repo settings → Secrets → update value. Must also match locally in `.env.local`. |
| Tech session tokens | Tech Roster col M (Sheets) | On suspected compromise | No rotation mechanism today. Wipe col M for affected tech — forces re-login. |

---

## SLO (Service Level Objective)

`dispatch.aptmaintenanceinc.com` available M–F 6:00am–8:00pm Pacific.  
Monitored by UptimeRobot every 5 minutes. Alert fires to brandon@ on failure.  
Target: <15-minute mean time to detect (MTTD). Target: <60-minute mean time to resolve (MTTR) for dashboard outages.

---

## WHO HAS ACCESS TO WHAT

| System | Brandon | AG (Claude Code CLI) |
|---|---|---|
| Vercel dashboard | ✅ | ❌ |
| Neon console | ✅ | ❌ |
| GAS console (script.google.com) | ✅ | ❌ |
| Cloudflare dashboard | ✅ | ❌ |
| Sentry | ✅ | ❌ |
| GitHub repo | ✅ | ✅ (via gh CLI) |
| clasp (GAS CLI) | ✅ (terminal) | ✅ (terminal) |
| Railway | ✅ | ❌ |

In an emergency where Brandon is unavailable: Claude Code can deploy GAS changes via clasp and push fixes to GitHub. Everything else requires Brandon's Google/Cloudflare login.

---

*Add new scenarios as incidents occur. Each real incident is a runbook entry.*
