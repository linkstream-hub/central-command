/**
 * sentinel-time-anomaly/index.js
 * SENTINEL: Time Record Anomaly Detector
 *
 * Runs every hour. Fetches time records via DashboardAPI and flags:
 *   - Shifts > 10h without a meal break logged
 *   - Missing clock-outs from previous day
 *   - CA labor law violations (meal premium triggers)
 *
 * Required env vars:
 *   DASHBOARD_API_URL, DASHBOARD_API_KEY, ANTHROPIC_API_KEY
 *
 * Optional:
 *   GITHUB_REPO, GITHUB_TOKEN, POLL_MS (default: 3600000)
 */

import fetch from 'node-fetch';
import Anthropic from '@anthropic-ai/sdk';

const API_URL  = process.env.DASHBOARD_API_URL;
const API_KEY  = process.env.DASHBOARD_API_KEY;
const GH_REPO  = process.env.GITHUB_REPO;
const GH_TOKEN = process.env.GITHUB_TOKEN;
const POLL_MS  = Number(process.env.POLL_MS) || 60 * 60 * 1000;

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function apiRequest(action, payload = {}) {
  const res  = await fetch(API_URL, {
    method : 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body   : JSON.stringify({ action, apiKey: API_KEY, ...payload }),
    signal : AbortSignal.timeout(30_000),
  });
  return res.json();
}

async function runAudit() {
  console.log(`[${new Date().toISOString()}] Running time-anomaly audit…`);
  try {
    // Fetch live compliance status which already has anomaly detection
    const res = await apiRequest('getComplianceAlerts');
    if (!res.success) {
      console.warn('getComplianceAlerts returned failure:', res.error);
      return;
    }

    const alerts = (res.alerts || []).filter(a => a.status === 'Active');
    if (alerts.length === 0) {
      console.log('✅  No active compliance anomalies detected.');
      return;
    }

    console.warn(`⚠️   ${alerts.length} active compliance alert(s) found.`);

    // Use Claude to summarize violations
    const summary = await anthropic.messages.create({
      model      : 'claude-3-haiku-20240307',
      max_tokens : 512,
      messages   : [{
        role   : 'user',
        content: `You are a CA labor law compliance assistant. Summarize the following compliance alerts in plain English for an operations manager. Be concise and actionable.\n\n${JSON.stringify(alerts, null, 2)}`
      }]
    });
    const summaryText = summary.content[0]?.text || JSON.stringify(alerts);

    await raiseGitHubIssue(
      `[TIME ANOMALY] ${alerts.length} CA compliance alert(s) — ${new Date().toISOString()}`,
      `**Sentinel: Time Anomaly Detector**\n\n${summaryText}\n\n---\n**Raw alerts:** \`\`\`json\n${JSON.stringify(alerts, null, 2)}\n\`\`\``
    );
  } catch (err) {
    console.error('runAudit error:', err.message);
  }
}

async function raiseGitHubIssue(title, body) {
  if (!GH_REPO || !GH_TOKEN) { console.log('[GitHub] Skipping issue — env not configured.'); return; }
  const res = await fetch(`https://api.github.com/repos/${GH_REPO}/issues`, {
    method : 'POST',
    headers: { Authorization: `token ${GH_TOKEN}`, 'Content-Type': 'application/json', 'User-Agent': 'sentinel-time-anomaly/1.0' },
    body   : JSON.stringify({ title, body, labels: ['sentinel', 'compliance', 'time-anomaly'] })
  });
  const issue = await res.json();
  console.log(`📋  GitHub Issue: ${issue.html_url}`);
}

if (!API_URL) { console.error('FATAL: DASHBOARD_API_URL not set.'); process.exit(1); }

console.log(`[sentinel-time-anomaly] Starting. Poll: ${POLL_MS / 60000}min`);
runAudit();
setInterval(runAudit, POLL_MS);
