/**
 * sentinel-wc-scanner/index.js
 * SENTINEL: Workers' Compensation Coverage Scanner
 *
 * Runs nightly (configurable). Scans the Dispatch Queue for jobs that have
 * no WC code set (column 27 / DA_DQ.WC_CODE). Uses Claude to suggest the
 * appropriate NCCI class code based on the job's service category and description.
 * Files a GitHub issue with all unclassified jobs.
 *
 * Required env vars:
 *   DASHBOARD_API_URL, DASHBOARD_API_KEY, ANTHROPIC_API_KEY
 *
 * Optional:
 *   GITHUB_REPO, GITHUB_TOKEN, POLL_MS (default: 86400000 = 24h)
 */

import fetch from 'node-fetch';
import Anthropic from '@anthropic-ai/sdk';

const API_URL  = process.env.DASHBOARD_API_URL;
const API_KEY  = process.env.DASHBOARD_API_KEY;
const GH_REPO  = process.env.GITHUB_REPO;
const GH_TOKEN = process.env.GITHUB_TOKEN;
const POLL_MS  = Number(process.env.POLL_MS) || 24 * 60 * 60 * 1000;

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

async function runWcScan() {
  console.log(`[${new Date().toISOString()}] Running WC code scan…`);
  try {
    const res = await apiRequest('getDispatchData');
    if (!res.success) { console.warn('getDispatchData failed:', res.error); return; }

    const unclassified = (res.jobs || []).filter(j =>
      j.status !== 'Archived' && j.status !== 'Complete' && !j.wcCode
    );

    if (unclassified.length === 0) {
      console.log('✅  All active jobs have WC codes.');
      return;
    }

    console.warn(`⚠️   ${unclassified.length} job(s) missing WC codes.`);

    // Ask Claude to suggest codes
    const prompt = `You are a workers' compensation specialist. For each job below, suggest the most appropriate NCCI class code. Return JSON array: [{jobId, category, description, suggestedCode, rationale}]\n\n${JSON.stringify(unclassified.slice(0, 20).map(j => ({ jobId: j.jobId, category: j.serviceCategory, description: (j.description || '').slice(0, 200) })), null, 2)}`;

    const aiRes = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }]
    });

    const suggestions = aiRes.content[0]?.text || 'No suggestions generated.';

    await raiseGitHubIssue(
      `[WC SCAN] ${unclassified.length} job(s) missing WC codes — ${new Date().toISOString()}`,
      `**Sentinel: WC Scanner**\n\n**${unclassified.length}** active job(s) are missing Workers' Comp classification codes.\n\n**AI Suggestions:**\n\`\`\`\n${suggestions}\n\`\`\``
    );
  } catch (err) {
    console.error('runWcScan error:', err.message);
  }
}

async function raiseGitHubIssue(title, body) {
  if (!GH_REPO || !GH_TOKEN) { console.log('[GitHub] Skipping — env not configured.'); return; }
  const res = await fetch(`https://api.github.com/repos/${GH_REPO}/issues`, {
    method : 'POST',
    headers: { Authorization: `token ${GH_TOKEN}`, 'Content-Type': 'application/json', 'User-Agent': 'sentinel-wc-scanner/1.0' },
    body   : JSON.stringify({ title, body, labels: ['sentinel', 'compliance', 'wc-code'] })
  });
  const issue = await res.json();
  console.log(`📋  GitHub Issue: ${issue.html_url}`);
}

if (!API_URL) { console.error('FATAL: DASHBOARD_API_URL not set.'); process.exit(1); }

console.log(`[sentinel-wc-scanner] Starting. Poll: ${POLL_MS / 3600000}h`);
runWcScan();
setInterval(runWcScan, POLL_MS);
