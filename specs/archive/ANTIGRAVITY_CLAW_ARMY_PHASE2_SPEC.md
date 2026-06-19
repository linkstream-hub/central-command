# ANTIGRAVITY_CLAW_ARMY_PHASE2_SPEC.md
# Claw Army Phase 2 — Railway Sentinels + Spec Architect
# Sprint 30 | Spec author: Claude Code | Date: 2026-04-28

---

## OVERVIEW

Phase 1 deployed three GitHub Actions soldiers (TS Guardian, Design Lint, Spec Auditor).
Phase 2 deploys five always-on Docker containers on Railway. These are persistent daemons —
they run continuously, not just on git push.

The strategic goal: the **Spec Architect** generates expert ANTIGRAVITY_*.md specs from
high-level goals, opens a PR, and waits for Claude Code review. This shifts Claude Code from
writing specs (expensive) to reviewing specs (cheap). Every other sentinel feeds operational
intelligence back into the system and fires alerts before issues surface in production.

---

## PREREQUISITE — API KEY SETUP (Brandon must do this before deployment)

### Anthropic API Key
1. Go to **console.anthropic.com** → API Keys → Create new key
2. Name it: `claw-army-production`
3. Copy the key (starts with `sk-ant-`)

### Add to GitHub Secrets (for GitHub Actions soldiers)
- Repo → Settings → Secrets and variables → Actions → New repository secret
- Name: `ANTHROPIC_API_KEY`
- Value: paste the key

### Add to Railway (for Railway sentinels)
- Railway dashboard → each service → Variables → add `ANTHROPIC_API_KEY = [key]`
- Also needed: `GITHUB_TOKEN` (a Personal Access Token with `repo` scope — for opening PRs)
  - GitHub → Settings → Developer settings → Personal access tokens → Generate new token
  - Scopes: `repo` (full)
  - Name: `claw-army-railway`

---

## ARCHITECTURE

All five sentinels are separate Railway services, each with its own Dockerfile.
They share a common pattern: poll or webhook → evaluate → act (write to sheet, open PR, send alert).

```
railway/
├── sentinel-health/
│   ├── Dockerfile
│   └── index.js
├── sentinel-time-anomaly/
│   ├── Dockerfile
│   └── index.js
├── sentinel-wc-scanner/
│   ├── Dockerfile
│   └── index.js
├── sentinel-stale-job/
│   ├── Dockerfile
│   └── index.js
└── sentinel-spec-architect/
    ├── Dockerfile
    └── index.js
```

All sentinels share the same base Dockerfile pattern:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY index.js ./
CMD ["node", "index.js"]
```

```json
{
  "name": "sentinel-[name]",
  "version": "1.0.0",
  "dependencies": {
    "@anthropic-ai/sdk": "^0.39.0",
    "node-fetch": "^3.3.2"
  }
}
```

All env vars are injected by Railway — never hardcoded.

---

## SENTINEL 1 — HEALTH SENTINEL

**Purpose:** Verify DashboardAPI and TechPWA.gs are alive. Alert brandon@ if either goes dark.
**Interval:** Every 10 minutes.

```javascript
// railway/sentinel-health/index.js
import fetch from 'node-fetch';

const DASHBOARD_API_URL = process.env.DASHBOARD_API_URL;
const TECHPWA_API_URL   = process.env.TECHPWA_API_URL;
const ALERT_WEBHOOK     = process.env.ALERT_WEBHOOK_URL; // n8n webhook on Railway

async function ping(name, url) {
  try {
    const start = Date.now();
    const res   = await fetch(url, { method: 'GET', signal: AbortSignal.timeout(10000) });
    const ms    = Date.now() - start;
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    console.log(`[HEALTH] ${name} OK — ${ms}ms`);
    return { ok: true, ms };
  } catch (e) {
    console.error(`[HEALTH] ${name} DOWN — ${e.message}`);
    return { ok: false, error: e.message };
  }
}

async function run() {
  const results = await Promise.all([
    ping('DashboardAPI', DASHBOARD_API_URL),
    ping('TechPWA',      TECHPWA_API_URL)
  ]);

  const failures = results.filter(r => !r.ok);
  if (failures.length > 0 && ALERT_WEBHOOK) {
    await fetch(ALERT_WEBHOOK, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({
        sentinel: 'HEALTH',
        failures: failures,
        ts      : new Date().toISOString()
      })
    });
  }
}

// Run immediately then every 10 min
run();
setInterval(run, 10 * 60 * 1000);
```

**Railway env vars:**
- `DASHBOARD_API_URL` — DashboardAPI.gs exec URL
- `TECHPWA_API_URL` — TechPWA.gs exec URL
- `ALERT_WEBHOOK_URL` — n8n Railway webhook URL for alerts

---

## SENTINEL 2 — TIME ANOMALY DETECTOR

**Purpose:** Scan Time Records for anomalous clock events. Log to ComplianceAlerts sheet.
**Interval:** Every 30 minutes.
**Anomaly definitions:**
- Shift > 14 hours without a clock-out
- Clock-in and clock-out on different calendar dates (cross-midnight)
- Clock-in with no paired clock-out for > 12 hours (missing punch)

```javascript
// railway/sentinel-time-anomaly/index.js
import fetch from 'node-fetch';

const API_URL  = process.env.DASHBOARD_API_URL;
const API_KEY  = process.env.DASHBOARD_API_KEY;

async function dashboardRequest(action, body) {
  const res = await fetch(API_URL, {
    method : 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body   : JSON.stringify({ action, apiKey: API_KEY, ...body })
  });
  return res.json();
}

async function run() {
  console.log('[TIME-ANOMALY] Scanning time records…');
  const data = await dashboardRequest('getTimeRecordsForAudit', {});
  if (!data.success || !data.records) {
    console.error('[TIME-ANOMALY] Failed to fetch records:', data.error);
    return;
  }

  const anomalies = [];
  const now       = Date.now();

  data.records.forEach(rec => {
    const clockIn  = rec.clockInTs  ? new Date(rec.clockInTs).getTime()  : null;
    const clockOut = rec.clockOutTs ? new Date(rec.clockOutTs).getTime() : null;

    if (!clockIn) return;

    const elapsedMs = (clockOut || now) - clockIn;
    const elapsedH  = elapsedMs / (1000 * 60 * 60);

    // Anomaly: > 14 hours on shift
    if (elapsedH > 14) {
      anomalies.push({
        type      : 'LONG_SHIFT',
        techName  : rec.techName,
        hoursOn   : elapsedH.toFixed(1),
        clockIn   : rec.clockInTs,
        clockOut  : rec.clockOutTs || 'STILL ACTIVE',
        message   : `${rec.techName} has been on shift for ${elapsedH.toFixed(1)} hours`
      });
    }

    // Anomaly: Cross-midnight (different calendar date for in/out)
    if (clockIn && clockOut) {
      const inDate  = new Date(clockIn).toDateString();
      const outDate = new Date(clockOut).toDateString();
      if (inDate !== outDate) {
        anomalies.push({
          type     : 'CROSS_MIDNIGHT',
          techName : rec.techName,
          clockIn  : rec.clockInTs,
          clockOut : rec.clockOutTs,
          message  : `${rec.techName} cross-midnight shift: in ${inDate}, out ${outDate}`
        });
      }
    }

    // Anomaly: No clock-out after 12 hours (missing punch)
    if (clockIn && !clockOut && elapsedH > 12) {
      anomalies.push({
        type     : 'MISSING_CLOCKOUT',
        techName : rec.techName,
        clockIn  : rec.clockInTs,
        hoursOn  : elapsedH.toFixed(1),
        message  : `${rec.techName} clocked in ${elapsedH.toFixed(1)} hours ago with no clock-out`
      });
    }
  });

  if (anomalies.length > 0) {
    console.log(`[TIME-ANOMALY] Found ${anomalies.length} anomalies. Logging…`);
    await dashboardRequest('logComplianceAnomalies', { anomalies });
  } else {
    console.log('[TIME-ANOMALY] No anomalies found.');
  }
}

run();
setInterval(run, 30 * 60 * 1000);
```

**DashboardAPI.gs endpoint needed:** `getTimeRecordsForAudit` and `logComplianceAnomalies`
(add in the same sprint — see BACKEND ADDITIONS below).

---

## SENTINEL 3 — WC SCANNER

**Purpose:** Find Scheduled/Complete jobs with missing WC codes. Log weekly summary.
**Interval:** Every 6 hours.

```javascript
// railway/sentinel-wc-scanner/index.js
import fetch from 'node-fetch';

const API_URL = process.env.DASHBOARD_API_URL;
const API_KEY = process.env.DASHBOARD_API_KEY;

async function dashboardRequest(action, body) {
  const res = await fetch(API_URL, {
    method : 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body   : JSON.stringify({ action, apiKey: API_KEY, ...body })
  });
  return res.json();
}

async function run() {
  console.log('[WC-SCANNER] Scanning dispatch queue for missing WC codes…');
  const data = await dashboardRequest('getDispatchData', {});
  if (!data.success || !data.jobs) {
    console.error('[WC-SCANNER] Failed:', data.error);
    return;
  }

  const targeted  = ['Scheduled', 'Complete', 'In Progress'];
  const missing   = data.jobs.filter(j =>
    targeted.includes(j.status) && !j.wcCode && j.assignedTech
  );

  if (missing.length > 0) {
    console.warn(`[WC-SCANNER] ${missing.length} jobs missing WC code:`,
      missing.map(j => `${j.jobId} (${j.status})`).join(', '));
    await dashboardRequest('logWcScanResult', {
      count  : missing.length,
      jobIds : missing.map(j => j.jobId)
    });
  } else {
    console.log('[WC-SCANNER] All targeted jobs have WC codes. ✓');
  }
}

run();
setInterval(run, 6 * 60 * 60 * 1000);
```

---

## SENTINEL 4 — STALE JOB SENTINEL

**Purpose:** Alert when jobs sit in "New" status > 48h without status change.
**Interval:** Every hour.

```javascript
// railway/sentinel-stale-job/index.js
import fetch from 'node-fetch';

const API_URL = process.env.DASHBOARD_API_URL;
const API_KEY = process.env.DASHBOARD_API_KEY;

async function dashboardRequest(action, body) {
  const res = await fetch(API_URL, {
    method : 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body   : JSON.stringify({ action, apiKey: API_KEY, ...body })
  });
  return res.json();
}

async function run() {
  const data = await dashboardRequest('getDispatchData', {});
  if (!data.success || !data.jobs) return;

  const now    = Date.now();
  const cutoff = 48 * 60 * 60 * 1000;

  const stale = data.jobs.filter(j => {
    if (j.status !== 'New') return false;
    const ts = j.timestamp ? new Date(j.timestamp).getTime() : 0;
    return (now - ts) > cutoff;
  });

  if (stale.length > 0) {
    console.warn(`[STALE-JOB] ${stale.length} jobs stale > 48h`);
    await dashboardRequest('logStaleJobAlert', {
      count  : stale.length,
      jobIds : stale.map(j => j.jobId)
    });
  }
}

run();
setInterval(run, 60 * 60 * 1000);
```

---

## SENTINEL 5 — SPEC ARCHITECT (TIER 4)

**Purpose:** Accept a high-level goal, read CLAUDE.md for context, generate a production-grade
ANTIGRAVITY_*.md spec using the Claude API, open a GitHub PR for Claude Code review.

**Trigger:** HTTP POST to Railway service URL (Brandon sends goals here).

```javascript
// railway/sentinel-spec-architect/index.js
import http    from 'http';
import https   from 'https';
import fetch   from 'node-fetch';
import Anthropic from '@anthropic-ai/sdk';

const anthropic    = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO  = process.env.GITHUB_REPO; // "White-Jesus/central-command"
const SECRET_KEY   = process.env.SPEC_ARCHITECT_KEY; // simple shared secret to gate the webhook

// Fetch raw CLAUDE.md from GitHub main branch for context
async function fetchClaudeMd() {
  const url = `https://raw.githubusercontent.com/${GITHUB_REPO}/main/CLAUDE.md`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch CLAUDE.md');
  return res.text();
}

// Read latest spec files list from GitHub tree
async function listExistingSpecs() {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/git/trees/main?recursive=1`;
  const res = await fetch(url, {
    headers: { Authorization: `token ${GITHUB_TOKEN}`, 'User-Agent': 'claw-spec-architect' }
  });
  const data = await res.json();
  return (data.tree || [])
    .filter(f => f.path && f.path.match(/^ANTIGRAVITY_.*\.md$/))
    .map(f => f.path);
}

async function generateSpec(goal, claudeMd, existingSpecs) {
  const systemPrompt = `You are Spec Architect, a senior technical spec writer for APT Central Command.
Your job: given a high-level product goal, write a production-grade ANTIGRAVITY_*.md spec file
that Antigravity (a fullstack AI IDE) can execute without ambiguity.

RULES:
- Specs must include: exact file paths, exact function names, exact TypeScript types, complete JSX,
  exact column indexes from DA_DQ, exact business rules, and verification steps.
- Never use vague language like "update this function" — always quote the exact code to find and replace.
- Match the depth of existing specs (see CLAUDE.md and spec list for context).
- Use the established patterns: glassmorphism dark UI, Framer Motion animations, skeleton loaders,
  toast notifications, role-based access, DashboardAPI.gs backend pattern.
- Never add columns to Google Sheets in the spec — flag them as "Claude Code adds these manually."
- Start the file with the standard header: # ANTIGRAVITY_[NAME]_SPEC.md / # [Title] / # Sprint [N] | Spec author: Spec Architect | Date: [today]`;

  const userMessage = `CLAUDE.md (system context):
---
${claudeMd.substring(0, 20000)}
---

EXISTING SPEC FILES (do not duplicate what's already covered):
${existingSpecs.join('\n')}

HIGH-LEVEL GOAL:
${goal}

Write the complete ANTIGRAVITY spec file for this goal. Be exhaustive — every detail Antigravity
needs to implement this without asking questions.`;

  const response = await anthropic.messages.create({
    model      : 'claude-opus-4-7',
    max_tokens : 8000,
    system     : systemPrompt,
    messages   : [{ role: 'user', content: userMessage }]
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

async function createPR(specContent, goal) {
  const branchName  = 'spec/' + Date.now();
  const specTitle   = goal.substring(0, 40).replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '-').toUpperCase();
  const fileName    = `ANTIGRAVITY_${specTitle}_SPEC.md`;

  // Get main branch SHA
  const refRes  = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/git/ref/heads/main`, {
    headers: { Authorization: `token ${GITHUB_TOKEN}`, 'User-Agent': 'claw-spec-architect' }
  });
  const refData = await refRes.json();
  const sha     = refData.object.sha;

  // Create branch
  await fetch(`https://api.github.com/repos/${GITHUB_REPO}/git/refs`, {
    method : 'POST',
    headers: { Authorization: `token ${GITHUB_TOKEN}`, 'Content-Type': 'application/json', 'User-Agent': 'claw-spec-architect' },
    body   : JSON.stringify({ ref: `refs/heads/${branchName}`, sha })
  });

  // Create file
  await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${fileName}`, {
    method : 'PUT',
    headers: { Authorization: `token ${GITHUB_TOKEN}`, 'Content-Type': 'application/json', 'User-Agent': 'claw-spec-architect' },
    body   : JSON.stringify({
      message: `feat(spec): [Spec Architect] ${fileName}`,
      content : Buffer.from(specContent).toString('base64'),
      branch  : branchName
    })
  });

  // Open PR
  const prRes  = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/pulls`, {
    method : 'POST',
    headers: { Authorization: `token ${GITHUB_TOKEN}`, 'Content-Type': 'application/json', 'User-Agent': 'claw-spec-architect' },
    body   : JSON.stringify({
      title: `[SPEC ARCHITECT] ${fileName}`,
      body : `## Spec Architect Output\n\n**Goal:** ${goal}\n\n**File:** \`${fileName}\`\n\n**Review instructions:**\n- Check all file paths exist\n- Verify column indexes match DA_DQ/DA_TR maps\n- Confirm business logic matches operational requirements\n- Approve if ready for AG execution\n\n🤖 Generated by Spec Architect Sentinel`,
      head : branchName,
      base : 'main'
    })
  });
  const prData = await prRes.json();
  return prData.html_url;
}

// HTTP server to receive goals
const server = http.createServer(async (req, res) => {
  if (req.method !== 'POST' || req.url !== '/spec') {
    res.writeHead(404).end();
    return;
  }

  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', async () => {
    try {
      const payload = JSON.parse(body);
      if (payload.key !== SECRET_KEY) {
        res.writeHead(401).end(JSON.stringify({ error: 'UNAUTHORIZED' }));
        return;
      }

      const { goal } = payload;
      if (!goal) {
        res.writeHead(400).end(JSON.stringify({ error: 'MISSING_GOAL' }));
        return;
      }

      res.writeHead(202).end(JSON.stringify({ status: 'GENERATING', message: 'Spec generation started. PR will be opened when complete.' }));

      // Generate async (don't block response)
      (async () => {
        console.log(`[SPEC-ARCHITECT] Generating spec for: ${goal}`);
        const claudeMd      = await fetchClaudeMd();
        const existingSpecs = await listExistingSpecs();
        const specContent   = await generateSpec(goal, claudeMd, existingSpecs);
        const prUrl         = await createPR(specContent, goal);
        console.log(`[SPEC-ARCHITECT] PR opened: ${prUrl}`);
      })().catch(e => console.error('[SPEC-ARCHITECT] Error:', e.message));

    } catch (e) {
      res.writeHead(500).end(JSON.stringify({ error: e.message }));
    }
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log('[SPEC-ARCHITECT] Listening for goals…');
});
```

**How to send a goal to Spec Architect:**
```bash
curl -X POST https://[railway-spec-architect-url]/spec \
  -H "Content-Type: application/json" \
  -d '{"key": "[SPEC_ARCHITECT_KEY]", "goal": "Add a materials logging screen to the Tech PWA where techs can log parts used during a job with quantity and unit cost"}'
```

Spec Architect opens a PR. Claude Code reviews. If approved, merge and hand to AG.

**Railway env vars for Spec Architect:**
- `ANTHROPIC_API_KEY` — Claude API key
- `GITHUB_TOKEN` — PAT with `repo` scope
- `GITHUB_REPO` — `White-Jesus/central-command`
- `SPEC_ARCHITECT_KEY` — a secret string you choose (acts as API password)
- `PORT` — Railway sets this automatically

---

## ADDITIONAL DASHBOARDAPI.GS ENDPOINTS (needed by sentinels)

Add these to `dashboard-api/DashboardAPI.gs` in `doPost`:

```javascript
if (action === 'getTimeRecordsForAudit')  return daResponse(getTimeRecordsForAuditDA());
if (action === 'logComplianceAnomalies')  return daResponse(logComplianceAnomaliesDA(body));
if (action === 'logWcScanResult')         return daResponse(logWcScanResultDA(body));
if (action === 'logStaleJobAlert')        return daResponse(logStaleJobAlertDA(body));
```

### `getTimeRecordsForAuditDA()`

```javascript
function getTimeRecordsForAuditDA() {
  try {
    var ss     = SpreadsheetApp.openById('1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4');
    var sheet  = ss.getSheetByName('Time Records');
    if (!sheet || sheet.getLastRow() < 2) return { success: true, records: [] };
    var data   = sheet.getDataRange().getValues().slice(1);
    var records = [];

    data.forEach(function(row) {
      var techName = String(row[1] || '').trim();
      if (!techName) return;
      // Time Records: col 3 = clock-in ts, col 7 = clock-out ts (0-indexed)
      records.push({
        techName  : techName,
        jobId     : String(row[0] || '').trim(),
        clockInTs : row[3] ? Utilities.formatDate(new Date(row[3]), 'America/Los_Angeles', "yyyy-MM-dd'T'HH:mm:ss") : '',
        clockOutTs: row[7] ? Utilities.formatDate(new Date(row[7]), 'America/Los_Angeles', "yyyy-MM-dd'T'HH:mm:ss") : ''
      });
    });

    return { success: true, records: records };
  } catch (e) {
    return { success: false, error: e.message, records: [] };
  }
}
```

### `logComplianceAnomaliesDA(params)`

```javascript
function logComplianceAnomaliesDA(params) {
  try {
    var anomalies = (params && params.anomalies) || [];
    if (!anomalies.length) return { success: true };
    var ss    = SpreadsheetApp.openById('1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4');
    var sheet = ss.getSheetByName('ComplianceAlerts') || ss.insertSheet('ComplianceAlerts');
    var ts    = Utilities.formatDate(new Date(), 'America/Los_Angeles', "yyyy-MM-dd'T'HH:mm:ss");
    anomalies.forEach(function(a) {
      sheet.appendRow([ts, a.type, a.techName, a.message, 'SENTINEL', 'Open']);
    });
    return { success: true, logged: anomalies.length };
  } catch (e) { return { success: false, error: e.message }; }
}
```

### `logWcScanResultDA` and `logStaleJobAlertDA` — same pattern as above, write to `SentinelLog` tab:

```javascript
function logWcScanResultDA(params) {
  return logSentinelEvent('WC_SCAN', 'WC-SCANNER', JSON.stringify(params));
}
function logStaleJobAlertDA(params) {
  return logSentinelEvent('STALE_JOB', 'STALE-SENTINEL', JSON.stringify(params));
}

function logSentinelEvent(type, source, detail) {
  try {
    var ss    = SpreadsheetApp.openById('1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4');
    var tab   = ss.getSheetByName('SentinelLog') || ss.insertSheet('SentinelLog');
    var ts    = Utilities.formatDate(new Date(), 'America/Los_Angeles', "yyyy-MM-dd'T'HH:mm:ss");
    tab.appendRow([ts, type, source, detail]);
    return { success: true };
  } catch (e) { return { success: false, error: e.message }; }
}
```

---

## VERIFICATION STEPS

### Health Sentinel
1. After Railway deploy, check Railway logs — shows `[HEALTH] DashboardAPI OK — XXXms` every 10min.
2. Temporarily break the API URL env var → sentinel logs `[HEALTH] DOWN` and fires alert webhook.

### Time Anomaly Detector
1. Logs `[TIME-ANOMALY] Scanning time records…` every 30min in Railway logs.
2. Manually insert a test Time Record with clock-in 15 hours ago and no clock-out → `ComplianceAlerts` sheet gets a new `LONG_SHIFT` entry within 30min.

### WC Scanner
1. Logs `[WC-SCANNER] All targeted jobs have WC codes. ✓` every 6h when clean.
2. Set a Scheduled job's WC_CODE col to blank → `SentinelLog` tab gets a `WC_SCAN` entry.

### Stale Job Sentinel
1. Any job in "New" status with a timestamp > 48h ago → `SentinelLog` entry within 1 hour.

### Spec Architect
1. `curl -X POST https://[url]/spec -H "Content-Type: application/json" -d '{"key":"[key]","goal":"Add a test feature"}'` → returns `{"status":"GENERATING"}`.
2. Within 2 minutes, a PR appears on GitHub: `[SPEC ARCHITECT] ANTIGRAVITY_ADD-A-TEST-FEATURE_SPEC.md`.
3. PR contains a well-formed spec matching the ANTIGRAVITY spec template.
4. Wrong key → 401 response.
5. No goal in payload → 400 response.
