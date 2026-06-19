// Phase 25 cutover — FINAL step: activate the intake workflow.
// ONLY run after: (1) phase25_n8n_setup.cjs succeeded, (2) the GAS stub is
// deployed via `clasp push --force` (checkNewLeadEmails returns immediately).
// Activating while GAS still polls = duplicate WOs.
const fs = require('fs');
const path = require('path');

const envFile = fs.readFileSync(path.join(__dirname, '../../tech-pwa/.env.local'), 'utf8');
const env = {};
envFile.split(/\r?\n/).forEach((l) => {
  const m = l.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) env[m[1]] = m[2].replace(/^"|"$/g, '');
});

const N8N_URL = 'https://n8n-production-4f36b.up.railway.app/api/v1';
const KEY = env.N8N_API_KEY;
const id = fs.readFileSync(path.join(__dirname, '.phase25_workflow_id'), 'utf8').trim();

(async () => {
  const res = await fetch(`${N8N_URL}/workflows/${id}/activate`, {
    method: 'POST',
    headers: { 'X-N8N-API-KEY': KEY },
  });
  const j = await res.json();
  console.log('activate:', res.status === 200 ? `ACTIVE (workflow ${id})` : `HTTP ${res.status} ${JSON.stringify(j).slice(0, 300)}`);
})().catch((e) => { console.error('FATAL:', e.message); process.exit(1); });
