/**
 * Neon Diagnostics — reads .ops/credentials.env, queries Neon API
 * Brandon runs: node tools/neon/neon_diagnostics.cjs
 *
 * Reports:
 *  - Project autosuspend settings
 *  - Endpoint compute config (min/max CU, autosuspend delay)
 *  - Current month compute consumption (CU-hours used vs included)
 *  - Active endpoints (any with non-IDLE state = blocking suspend)
 */

'use strict';

const path = require('path');
const fs   = require('fs');
const https = require('https');

// ── Load creds ─────────────────────────────────────────────────────────────
const credsPath = path.resolve(__dirname, '../../.ops/credentials.env');
if (!fs.existsSync(credsPath)) {
  console.error('[ERROR] .ops/credentials.env not found. Create it first.');
  process.exit(1);
}

const creds = Object.fromEntries(
  fs.readFileSync(credsPath, 'utf8')
    .split('\n')
    .filter(l => l.includes('=') && !l.startsWith('#'))
    .map(l => {
      const idx = l.indexOf('=');
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
    })
);

const NEON_API_KEY  = creds.NEON_API_KEY;
const NEON_PROJECT_ID = creds.NEON_PROJECT_ID;

if (!NEON_API_KEY || !NEON_PROJECT_ID) {
  console.error('[ERROR] NEON_API_KEY and NEON_PROJECT_ID required in .ops/credentials.env');
  process.exit(1);
}

// ── HTTP helper ─────────────────────────────────────────────────────────────
function neonGet(endpoint) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'console.neon.tech',
      path: `/api/v2${endpoint}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${NEON_API_KEY}`,
        'Accept': 'application/json',
      },
    };
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try { resolve(JSON.parse(body)); }
          catch (e) { reject(new Error(`Parse error: ${body.slice(0, 200)}`)); }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body.slice(0, 300)}`));
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

// ── Main ────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n=== Neon Diagnostics — ${new Date().toISOString()} ===\n`);

  // 1. Project info
  const project = await neonGet(`/projects/${NEON_PROJECT_ID}`);
  const p = project.project;
  console.log('PROJECT');
  console.log(`  Name:         ${p.name}`);
  console.log(`  ID:           ${p.id}`);
  console.log(`  Region:       ${p.region_id}`);
  console.log(`  Created:      ${p.created_at}`);
  if (p.consumption_period_active) {
    const c = p.consumption_period_active;
    const usedPct = c.active_time_seconds
      ? ((c.active_time_seconds / 3600) / 100 * 100).toFixed(1)
      : 'n/a';
    console.log(`  Period start: ${c.period_start || 'n/a'}`);
    console.log(`  Period end:   ${c.period_end   || 'n/a'}`);
  }
  console.log();

  // 2. Consumption
  try {
    const cons = await neonGet(`/projects/${NEON_PROJECT_ID}/consumption`);
    console.log('COMPUTE CONSUMPTION (current billing period)');
    console.log(`  compute_time_seconds: ${cons.compute_time_seconds ?? 'n/a'}`);
    const cuHours = cons.compute_time_seconds ? (cons.compute_time_seconds / 3600).toFixed(2) : 'n/a';
    console.log(`  CU-hours used:        ${cuHours}`);
    // Free tier = 100 CU-hr/month for compute (Neon free plan)
    if (cons.compute_time_seconds) {
      const pct = (cuHours / 100 * 100).toFixed(1);
      console.log(`  vs 100 CU-hr free:    ${pct}%`);
    }
    if (cons.active_time_seconds) {
      console.log(`  active_time_seconds:  ${cons.active_time_seconds}`);
    }
    console.log();
  } catch (e) {
    console.warn(`  [WARN] Consumption endpoint failed: ${e.message}`);
    console.log();
  }

  // 3. Branches + endpoints
  const branches = await neonGet(`/projects/${NEON_PROJECT_ID}/branches`);
  console.log(`BRANCHES (${branches.branches.length})`);
  for (const b of branches.branches) {
    console.log(`  ${b.name} (${b.id})`);
  }
  console.log();

  // 4. Endpoints — autosuspend config
  const endpoints = await neonGet(`/projects/${NEON_PROJECT_ID}/endpoints`);
  console.log(`ENDPOINTS (${endpoints.endpoints.length})`);
  for (const ep of endpoints.endpoints) {
    console.log(`  ${ep.id}`);
    console.log(`    branch:           ${ep.branch_id}`);
    console.log(`    state:            ${ep.current_state}`);
    // Neon API field varies by version — check both known names
    const suspendSecs = ep.autosuspend_duration_seconds ?? ep.suspend_timeout_seconds ?? ep.pg_settings?.autosuspend_timeout ?? null;
    console.log(`    autosuspend:      ${suspendSecs !== null ? suspendSecs + 's (' + (suspendSecs/60).toFixed(0) + 'min)' : 'not in response — check Neon console'}`);
    console.log(`    min_cu:           ${ep.autoscaling_limit_min_cu ?? ep.compute_min ?? 'n/a'}`);
    console.log(`    max_cu:           ${ep.autoscaling_limit_max_cu ?? ep.compute_max ?? 'n/a'}`);
    // Dump raw fields for diagnosis if autosuspend missing
    if (suspendSecs === null) {
      const known = ['id','branch_id','current_state','type','autosuspend_duration_seconds','suspend_timeout_seconds','autoscaling_limit_min_cu','autoscaling_limit_max_cu'];
      const extra = Object.keys(ep).filter(k => !known.includes(k));
      if (extra.length) console.log(`    raw fields:       ${extra.join(', ')}`);
    }
    if (ep.current_state !== 'idle') {
      console.log(`    ⚠️  NOT IDLE — endpoint is active/starting, preventing autosuspend`);
    }
  }
  console.log();

  // 5. Summary verdict
  console.log('VERDICT');
  const nonIdle = endpoints.endpoints.filter(ep => ep.current_state !== 'idle');
  if (nonIdle.length === 0) {
    console.log('  ✓ All endpoints idle — autosuspend active');
  } else {
    console.log(`  ⚠️  ${nonIdle.length} endpoint(s) NOT idle — Neon endpoint held awake`);
    for (const ep of nonIdle) {
      console.log(`     ${ep.id} → state=${ep.current_state}`);
    }
  }

  // Neon free tier: autosuspend_duration_seconds=0 means "use platform default (5 min)"
  // not "disabled". Paid plans return a positive integer or explicit value.
  const endpointSuspendInfo = endpoints.endpoints.map(ep => ({
    ep,
    suspendSecs: ep.autosuspend_duration_seconds ?? ep.suspend_timeout_seconds ?? ep.pg_settings?.autosuspend_timeout ?? null,
    minCu: ep.autoscaling_limit_min_cu ?? ep.compute_min ?? null,
  }));
  const allSuspendOk = endpointSuspendInfo.every(
    ({ minCu }) => minCu === null || minCu <= 0.25
  );
  if (allSuspendOk) {
    console.log('  ✓ Scale-to-zero active (free tier: 5 min default), min_cu ≤ 0.25 on all endpoints');
  } else {
    for (const { ep, minCu } of endpointSuspendInfo) {
      if (minCu !== null && minCu > 0.25) {
        console.log(`  ✗ ${ep.id}: min_cu=${minCu} > 0.25 — wastes compute when idle`);
      }
    }
  }
  console.log('  NOTE: autosuspend_duration_seconds=0 on free tier = platform default (5 min), not disabled');
  console.log();
}

main().catch(err => {
  console.error('[FATAL]', err.message);
  process.exit(1);
});
