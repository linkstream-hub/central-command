// Adds INTAKE_COMMS_ENABLED env gate to the intake workflow's production IF node.
// Comms (requester auto-replies + tenant coordination emails) stay OFF until the
// Railway var INTAKE_COMMS_ENABLED=true is set — WO creation is unaffected.
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

const GATED = "={{ $env.NODE_ENV === 'production' && $env.INTAKE_COMMS_ENABLED === 'true' }}";

(async () => {
  const get = await fetch(`${N8N_URL}/workflows/${id}`, { headers: { 'X-N8N-API-KEY': KEY } });
  const wf = await get.json();

  const gate = wf.nodes.find((n) => n.name === 'IF: Production?');
  if (!gate) { console.error('IF: Production? node not found'); process.exit(1); }
  gate.parameters.conditions.boolean[0].value1 = GATED;

  const put = await fetch(`${N8N_URL}/workflows/${id}`, {
    method: 'PUT',
    headers: { 'X-N8N-API-KEY': KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: wf.name, nodes: wf.nodes, connections: wf.connections, settings: wf.settings }),
  });
  const j = await put.json();
  if (put.status !== 200) { console.error('PUT failed:', put.status, JSON.stringify(j).slice(0, 300)); process.exit(1); }

  const check = await fetch(`${N8N_URL}/workflows/${id}`, { headers: { 'X-N8N-API-KEY': KEY } });
  const wf2 = await check.json();
  const g2 = wf2.nodes.find((n) => n.name === 'IF: Production?');
  console.log('comms gate now:', g2.parameters.conditions.boolean[0].value1);
  console.log('Comms OFF until Railway var INTAKE_COMMS_ENABLED=true is set. WO creation unaffected.');
})().catch((e) => { console.error('FATAL:', e.message); process.exit(1); });
