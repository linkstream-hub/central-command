// Adds an email alert to the PTOW Error Handler workflow and activates it.
// Any workflow failure (intake included) -> email to brandon@aptmaintenanceinc.com
// via Resend. The existing Sheets log row stays (historical record).
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
const ALERT_TO = 'brandon@aptmaintenanceinc.com';

async function api(method, p, body) {
  const res = await fetch(`${N8N_URL}${p}`, {
    method,
    headers: { 'X-N8N-API-KEY': KEY, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: res.status, json: await res.json() };
}

(async () => {
  // find the error handler by name
  const list = await api('GET', '/workflows?limit=50');
  const eh = list.json.data.find((w) => w.name === 'PTOW Error Handler');
  if (!eh) { console.error('PTOW Error Handler not found'); process.exit(1); }

  const get = await api('GET', `/workflows/${eh.id}`);
  const wf = get.json;

  if (wf.nodes.some((n) => n.name === 'Resend: Alert Brandon')) {
    console.log('alert node already present — skipping add');
  } else {
    const fmt = wf.nodes.find((n) => n.name === 'Format Error');
    const pos = fmt ? [fmt.position[0] + 220, fmt.position[1] + 160] : [600, 400];
    wf.nodes.push({
      name: 'Resend: Alert Brandon',
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.2,
      position: pos,
      parameters: {
        method: 'POST',
        url: 'https://api.resend.com/emails',
        sendHeaders: true,
        headerParameters: { parameters: [
          { name: 'Authorization', value: '=Bearer {{ $env.RESEND_API_KEY }}' },
          { name: 'Content-Type', value: 'application/json' },
        ]},
        sendBody: true,
        specifyBody: 'string',
        body: `={{ JSON.stringify({ from: 'noreply@aptmaintenanceinc.com', to: ['${ALERT_TO}'], subject: '[CC ALERT] Workflow failure: ' + $json.workflowName, text: 'Workflow: ' + $json.workflowName + '\\nError ID: ' + $json.errorId + '\\nExecution: ' + ($json.executionId || 'n/a') + '\\nTime: ' + new Date().toISOString() + '\\n\\nForward this email to Claude Code to investigate.' }) }}`,
      },
    });
    // wire Format Error -> alert (parallel to the Sheets log)
    const conns = wf.connections['Format Error'];
    if (conns && conns.main && conns.main[0]) {
      conns.main[0].push({ node: 'Resend: Alert Brandon', type: 'main', index: 0 });
    } else {
      wf.connections['Format Error'] = { main: [[{ node: 'Resend: Alert Brandon', type: 'main', index: 0 }]] };
    }
    const put = await api('PUT', `/workflows/${eh.id}`, {
      name: wf.name, nodes: wf.nodes, connections: wf.connections, settings: wf.settings,
    });
    if (put.status !== 200) { console.error('PUT failed:', put.status, JSON.stringify(put.json).slice(0, 250)); process.exit(1); }
    console.log('alert node added -> ' + ALERT_TO);
  }

  // error handler must itself be active to catch errors
  const act = await api('POST', `/workflows/${eh.id}/activate`);
  console.log('error handler active:', act.status === 200 ? 'yes' : `HTTP ${act.status} ${JSON.stringify(act.json).slice(0, 150)}`);
})().catch((e) => { console.error('FATAL:', e.message); process.exit(1); });
