// Tightens the intake workflow's Gmail polling from 15 min to 5 min.
// Bridge until Gmail push (Pub/Sub -> webhook) ships as its own sprint.
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
  const get = await fetch(`${N8N_URL}/workflows/${id}`, { headers: { 'X-N8N-API-KEY': KEY } });
  const wf = await get.json();
  const trigger = wf.nodes.find((n) => n.type === 'n8n-nodes-base.gmailTrigger');
  trigger.parameters.pollTimes = { item: [{ mode: 'everyX', value: 5, unit: 'minutes' }] };

  const put = await fetch(`${N8N_URL}/workflows/${id}`, {
    method: 'PUT',
    headers: { 'X-N8N-API-KEY': KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: wf.name, nodes: wf.nodes, connections: wf.connections, settings: wf.settings }),
  });
  if (put.status !== 200) { console.error('PUT failed:', put.status, JSON.stringify(await put.json()).slice(0, 250)); process.exit(1); }

  // PUT deactivates? verify + reactivate if needed
  const check = await (await fetch(`${N8N_URL}/workflows/${id}`, { headers: { 'X-N8N-API-KEY': KEY } })).json();
  if (!check.active) {
    const act = await fetch(`${N8N_URL}/workflows/${id}/activate`, { method: 'POST', headers: { 'X-N8N-API-KEY': KEY } });
    console.log('re-activated:', act.status === 200);
  }
  const t2 = check.nodes.find((n) => n.type === 'n8n-nodes-base.gmailTrigger');
  console.log('poll interval now:', JSON.stringify(t2.parameters.pollTimes.item[0]), '| active:', check.active || 're-activated above');
})().catch((e) => { console.error('FATAL:', e.message); process.exit(1); });
