// Phase 28 — APT Sentinel Checks workflow importer
// Imports tools/n8n/workflows/phase-28-sentinel-checks.json into n8n with the
// PTOW Error Handler wired as errorWorkflow (instance-specific id resolved at import time).
// Mirrors phase25_n8n_setup.cjs steps 3-4.
//
// Usage: node tools/neon/phase28_import_sentinel.cjs
// Requires: N8N_API_KEY in tech-pwa/.env.local
// Does NOT activate the workflow — activation is a manual Brandon step.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../..');
const envFile = fs.readFileSync(path.join(ROOT, 'tech-pwa/.env.local'), 'utf8');
const env = {};
envFile.split(/\r?\n/).forEach((l) => {
  const m = l.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) env[m[1]] = m[2].replace(/^"|"$/g, '');
});

const N8N_URL = 'https://n8n-production-4f36b.up.railway.app/api/v1';
const KEY = env.N8N_API_KEY;
if (!KEY) {
  console.error('ERROR: N8N_API_KEY not found in tech-pwa/.env.local');
  process.exit(1);
}

async function api(method, p, body) {
  const res = await fetch(`${N8N_URL}${p}`, {
    method,
    headers: { 'X-N8N-API-KEY': KEY, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = { raw: text.slice(0, 300) }; }
  return { status: res.status, json };
}

(async () => {
  // Step 1 — resolve PTOW Error Handler workflow id by name
  console.log('Step 1: resolving PTOW Error Handler workflow id...');
  const list = await api('GET', '/workflows?limit=100');
  if (list.status !== 200) {
    console.error(`ERROR: GET /workflows failed (HTTP ${list.status}):`, JSON.stringify(list.json).slice(0, 200));
    process.exit(1);
  }
  const workflows = list.json.data || list.json || [];
  const errorHandler = workflows.find((w) => w.name === 'PTOW Error Handler');
  if (!errorHandler) {
    console.error('ERROR: PTOW Error Handler workflow not found in n8n — import it first (phase25_n8n_setup.cjs step 2)');
    process.exit(1);
  }
  const ptowId = errorHandler.id;
  console.log(`  PTOW Error Handler found — id: ${ptowId}`);

  // Step 2 — read sentinel workflow source and POST with errorWorkflow injected
  console.log('\nStep 2: importing APT Sentinel Checks workflow...');
  const wfSrc = JSON.parse(
    fs.readFileSync(path.join(ROOT, 'tools/n8n/workflows/phase-28-sentinel-checks.json'), 'utf8')
  );
  const settings = { ...wfSrc.settings, errorWorkflow: ptowId };
  const imported = await api('POST', '/workflows', {
    name: wfSrc.name,
    nodes: wfSrc.nodes,
    connections: wfSrc.connections,
    settings,
  });
  if (imported.status !== 200) {
    console.error(`ERROR: POST /workflows failed (HTTP ${imported.status}):`, JSON.stringify(imported.json).slice(0, 300));
    process.exit(1);
  }
  const newId = imported.json.id;
  console.log(`  Imported — new workflow id: ${newId}`);

  // Step 3 — verify bindings post-import
  console.log('\nStep 3: verifying bindings...');
  const check = await api('GET', `/workflows/${newId}`);
  if (check.status !== 200) {
    console.error(`ERROR: GET /workflows/${newId} failed (HTTP ${check.status}):`, JSON.stringify(check.json).slice(0, 200));
    process.exit(1);
  }
  const nodes = check.json.nodes || [];
  const pgNodes = nodes.filter((n) => n.type === 'n8n-nodes-base.postgres');
  const tz = check.json.settings && check.json.settings.timezone;
  const ewId = check.json.settings && check.json.settings.errorWorkflow;
  const active = check.json.active;

  console.log(`  node count: ${nodes.length}`);
  console.log(`  postgres nodes: ${pgNodes.length}`);

  const tzOk = tz === 'America/Los_Angeles';
  console.log(`  timezone: ${tz || '(missing)'} ${tzOk ? '✓' : '✗ EXPECTED America/Los_Angeles'}`);

  const ewOk = ewId === ptowId;
  console.log(`  errorWorkflow: ${ewId || '(missing)'} ${ewOk ? '✓' : `✗ EXPECTED ${ptowId}`}`);

  let allCredsOk = true;
  pgNodes.forEach((n) => {
    const credName = n.credentials && n.credentials.postgres && n.credentials.postgres.name;
    const credOk = credName === 'Neon Postgres';
    console.log(`  node "${n.name}" postgres cred: ${credName || '(missing)'} ${credOk ? '✓' : '✗ EXPECTED "Neon Postgres"'}`);
    if (!credOk) allCredsOk = false;
  });

  console.log(`  active: ${active} (expected false — not yet activated)`);

  if (!tzOk || !ewOk || !allCredsOk) {
    console.error('\nWARNING: one or more binding assertions failed (see ✗ above). Investigate before activating.');
  } else {
    console.log('\nAll binding assertions passed ✓');
  }

  // Step 4 — write workflow id to disk and print activation instruction
  const idFile = path.join(__dirname, '.phase28_workflow_id');
  fs.writeFileSync(idFile, newId);
  console.log(`\nWorkflow id written to: ${idFile}`);
  console.log('\nDONE — imported INACTIVE. Brandon: activate in n8n UI, then Execute Workflow once and check the Execution log + Neon Monitoring graph.');
})().catch((e) => { console.error('FATAL:', e.message); process.exit(1); });
