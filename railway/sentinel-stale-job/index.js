/**
 * sentinel-stale-job/index.js
 * SENTINEL: Stale Job / Aging Queue Monitor
 *
 * Runs every 4 hours. Flags jobs that have sat in certain statuses
 * beyond configurable thresholds:
 *   - 'New'               > 48h  → STALE_NEW
 *   - 'PTE Required'      > 72h  → STALE_PTE
 *   - 'Ready to Schedule' > 24h  → STALE_READY
 *   - 'Scheduled'         past   → MISSED_APPOINTMENT
 *
 * Required env vars:
 *   DASHBOARD_API_URL, DASHBOARD_API_KEY
 *
 * Optional:
 *   GITHUB_REPO, GITHUB_TOKEN, POLL_MS (default: 14400000 = 4h)
 */

import fetch from 'node-fetch';

const API_URL  = process.env.DASHBOARD_API_URL;
const API_KEY  = process.env.DASHBOARD_API_KEY;
const GH_REPO  = process.env.GITHUB_REPO;
const GH_TOKEN = process.env.GITHUB_TOKEN;
const POLL_MS  = Number(process.env.POLL_MS) || 4 * 60 * 60 * 1000;

const THRESHOLDS_MS = {
  'New'               : 48 * 3600 * 1000,
  'PTE Required'      : 72 * 3600 * 1000,
  'Ready to Schedule' : 24 * 3600 * 1000,
};

async function apiRequest(action, payload = {}) {
  const res  = await fetch(API_URL, {
    method : 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body   : JSON.stringify({ action, apiKey: API_KEY, ...payload }),
    signal : AbortSignal.timeout(30_000),
  });
  return res.json();
}

async function runStaleJobScan() {
  console.log(`[${new Date().toISOString()}] Running stale-job scan…`);
  try {
    const res = await apiRequest('getDispatchData');
    if (!res.success) { console.warn('getDispatchData failed:', res.error); return; }

    const now    = Date.now();
    const stale  = [];
    const missed = [];

    for (const job of (res.jobs || [])) {
      if (job.status === 'Archived' || job.status === 'Complete' || job.status === 'In Progress') continue;

      const created = job.timestamp ? new Date(job.timestamp).getTime() : 0;
      const age     = created ? now - created : 0;

      // Missed appointment check
      if (job.status === 'Scheduled' && job.scheduledDate) {
        const apptDate = new Date(job.scheduledDate + 'T23:59:59-07:00').getTime();
        if (now > apptDate) {
          missed.push({ jobId: job.jobId, address: job.address, scheduledDate: job.scheduledDate });
        }
      }

      // Staleness by status
      const threshold = THRESHOLDS_MS[job.status];
      if (threshold && age > threshold) {
        stale.push({ jobId: job.jobId, address: job.address, status: job.status, ageHours: Math.round(age / 3600000) });
      }
    }

    if (stale.length === 0 && missed.length === 0) {
      console.log('✅  No stale or missed jobs detected.');
      return;
    }

    console.warn(`⚠️   Stale: ${stale.length} | Missed: ${missed.length}`);

    const body = [
      `**Sentinel: Stale Job Monitor**`,
      ``,
      stale.length  ? `### Stale Jobs (${stale.length})\n` + stale.map(j => `- \`${j.jobId}\` ${j.address} | Status: ${j.status} | Age: ${j.ageHours}h`).join('\n') : null,
      missed.length ? `### Missed Appointments (${missed.length})\n` + missed.map(j => `- \`${j.jobId}\` ${j.address} | Was: ${j.scheduledDate}`).join('\n') : null,
    ].filter(Boolean).join('\n');

    await raiseGitHubIssue(
      `[STALE JOB] ${stale.length} stale + ${missed.length} missed — ${new Date().toISOString()}`,
      body
    );
  } catch (err) {
    console.error('runStaleJobScan error:', err.message);
  }
}

async function raiseGitHubIssue(title, body) {
  if (!GH_REPO || !GH_TOKEN) { console.log('[GitHub] Skipping — env not configured.'); return; }
  const res = await fetch(`https://api.github.com/repos/${GH_REPO}/issues`, {
    method : 'POST',
    headers: { Authorization: `token ${GH_TOKEN}`, 'Content-Type': 'application/json', 'User-Agent': 'sentinel-stale-job/1.0' },
    body   : JSON.stringify({ title, body, labels: ['sentinel', 'stale-job'] })
  });
  const issue = await res.json();
  console.log(`📋  GitHub Issue: ${issue.html_url}`);
}

if (!API_URL) { console.error('FATAL: DASHBOARD_API_URL not set.'); process.exit(1); }

console.log(`[sentinel-stale-job] Starting. Poll: ${POLL_MS / 3600000}h`);
runStaleJobScan();
setInterval(runStaleJobScan, POLL_MS);
