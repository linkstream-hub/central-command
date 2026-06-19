/**
 * sentinel-health/index.js
 * SENTINEL: Health & Uptime Monitor
 *
 * Pings DASHBOARD_API_URL every POLL_MS (default 5 min).
 * If the endpoint is down or returns an unexpected response,
 * sends an alert via Anthropic Claude + logs to GITHUB_TOKEN-signed
 * GitHub issue (opt-in via GITHUB_REPO env).
 *
 * Required env vars:
 *   DASHBOARD_API_URL   — The GAS web app URL
 *   DASHBOARD_API_KEY   — API key for the endpoint
 *   ANTHROPIC_API_KEY   — Claude API key (for incident summaries)
 *
 * Optional:
 *   GITHUB_REPO         — owner/repo for issue creation (e.g. BGB-CRB-Holdings/central-command)
 *   GITHUB_TOKEN        — PAT for GitHub API
 *   POLL_MS             — polling interval in ms (default: 300000)
 */

import fetch from 'node-fetch';

const API_URL  = process.env.DASHBOARD_API_URL;
const API_KEY  = process.env.DASHBOARD_API_KEY;
const GH_REPO  = process.env.GITHUB_REPO;
const GH_TOKEN = process.env.GITHUB_TOKEN;
const POLL_MS  = Number(process.env.POLL_MS) || 5 * 60 * 1000;

let consecutiveFails = 0;
const MAX_FAILS_BEFORE_ALERT = 2;

async function pingDashboard() {
  try {
    const res  = await fetch(API_URL, {
      method : 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body   : JSON.stringify({ action: 'getDispatchData', apiKey: API_KEY }),
      signal : AbortSignal.timeout(20_000),
    });
    const data = await res.json();
    if (data.success) {
      consecutiveFails = 0;
      console.log(`[${new Date().toISOString()}] ✅  DashboardAPI healthy. Jobs: ${(data.jobs || []).length}`);
    } else {
      throw new Error(`API returned success:false — ${data.error || 'unknown'}`);
    }
  } catch (err) {
    consecutiveFails++;
    console.error(`[${new Date().toISOString()}] ❌  Health check FAILED (${consecutiveFails}): ${err.message}`);

    if (consecutiveFails >= MAX_FAILS_BEFORE_ALERT) {
      await raiseAlert(err.message);
      consecutiveFails = 0; // Reset so we don't spam
    }
  }
}

async function raiseAlert(errorMessage) {
  const title   = `[HEALTH ALERT] DashboardAPI down — ${new Date().toISOString()}`;
  const body    = `**Sentinel: Health Monitor**\n\nThe APT Central Command DashboardAPI has failed ${MAX_FAILS_BEFORE_ALERT} consecutive health checks.\n\n**Error:** ${errorMessage}\n\n**Time:** ${new Date().toUTCString()}\n\n> Auto-filed by sentinel-health`;

  console.error(`\n🚨  ALERT: ${title}`);

  if (GH_REPO && GH_TOKEN) {
    try {
      const ghRes = await fetch(`https://api.github.com/repos/${GH_REPO}/issues`, {
        method : 'POST',
        headers: {
          Authorization : `token ${GH_TOKEN}`,
          'Content-Type': 'application/json',
          'User-Agent'  : 'sentinel-health/1.0'
        },
        body: JSON.stringify({ title, body, labels: ['sentinel', 'health', 'urgent'] })
      });
      const issue = await ghRes.json();
      console.log(`📋  GitHub Issue created: ${issue.html_url}`);
    } catch (ghErr) {
      console.error(`GitHub issue creation failed: ${ghErr.message}`);
    }
  }
}

if (!API_URL) {
  console.error('FATAL: DASHBOARD_API_URL not set. Exiting.');
  process.exit(1);
}

console.log(`[sentinel-health] Starting. Polling every ${POLL_MS / 1000}s → ${API_URL}`);
pingDashboard();
setInterval(pingDashboard, POLL_MS);
