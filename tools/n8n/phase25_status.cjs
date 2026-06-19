// Phase 25 intake workflow — execution status. Run anytime: node tools/n8n/phase25_status.cjs
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
  const wf = await (await fetch(`${N8N_URL}/workflows/${id}`, { headers: { 'X-N8N-API-KEY': KEY } })).json();
  console.log(`workflow: ${wf.name} | active: ${wf.active}`);

  const ex = await (await fetch(`${N8N_URL}/executions?workflowId=${id}&limit=10`, { headers: { 'X-N8N-API-KEY': KEY } })).json();
  const runs = ex.data || [];
  if (runs.length === 0) { console.log('no executions yet — waiting for the first inbound email'); return; }
  runs.forEach((e) => {
    console.log(`- ${e.startedAt} | status: ${e.status} | finished: ${e.finished}${e.status === 'error' ? '  <-- ERROR, tell Claude' : ''}`);
  });
})().catch((e) => { console.error('FATAL:', e.message); process.exit(1); });
