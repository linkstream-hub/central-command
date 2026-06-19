// Phase 25 cutover — n8n setup (NO activation; that's phase25_activate.cjs, gated on the GAS stub deploy).
// 1. Create "Neon Postgres" credential from DATABASE_URL
// 2. Import PTOW Error Handler workflow (missing from instance)
// 3. Import phase-19-email-polling workflow with errorWorkflow wired to the real ID
// 4. Verify node/credential bindings
// 5. Delete the old Sheets-version Phase 19 workflow (0Ie7jHySZOGvGk7Q)
// Secrets read from tech-pwa/.env.local in-process; never printed.
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
const DB_URL = env.DATABASE_URL;
if (!KEY || !DB_URL) { console.error('missing N8N_API_KEY or DATABASE_URL in .env.local'); process.exit(1); }

const OLD_WORKFLOW_ID = '0Ie7jHySZOGvGk7Q';

async function api(method, p, body) {
  const res = await fetch(`${N8N_URL}${p}`, {
    method,
    headers: { 'X-N8N-API-KEY': KEY, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json; try { json = JSON.parse(text); } catch { json = { raw: text.slice(0, 300) }; }
  return { status: res.status, json };
}

(async () => {
  // 1. Postgres credential from DATABASE_URL (postgres://user:pass@host/db?sslmode=require)
  const u = new URL(DB_URL);
  const cred = await api('POST', '/credentials', {
    name: 'Neon Postgres',
    type: 'postgres',
    data: {
      host: u.hostname,
      port: Number(u.port || 5432),
      database: u.pathname.replace(/^\//, ''),
      user: decodeURIComponent(u.username),
      password: decodeURIComponent(u.password),
      ssl: 'require',
      allowUnauthorizedCerts: false,
      // explicit false required — absent sshTunnel trips the schema's if-branch
      // which then demands all 7 SSH fields (n8n credential schema quirk)
      sshTunnel: false,
    },
  });
  console.log('credential "Neon Postgres":', cred.status === 200 ? `created (id ${cred.json.id})` : `HTTP ${cred.status} ${JSON.stringify(cred.json).slice(0, 200)}`);
  if (cred.status !== 200) process.exit(1);

  // 2. Import PTOW Error Handler
  const ehSrc = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/n8n/workflows/ptow-error-handler.json'), 'utf8'));
  const eh = await api('POST', '/workflows', {
    name: ehSrc.name || 'PTOW Error Handler',
    nodes: ehSrc.nodes,
    connections: ehSrc.connections,
    settings: ehSrc.settings || {},
  });
  console.log('PTOW Error Handler import:', eh.status === 200 ? `id ${eh.json.id}` : `HTTP ${eh.status} ${JSON.stringify(eh.json).slice(0, 200)}`);
  if (eh.status !== 200) process.exit(1);

  // 3. Import intake workflow with errorWorkflow = real ID
  const wfSrc = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/n8n/workflows/phase-19-email-polling.json'), 'utf8'));
  const settings = { ...(wfSrc.settings || {}), errorWorkflow: eh.json.id };
  const wf = await api('POST', '/workflows', {
    name: wfSrc.name,
    nodes: wfSrc.nodes,
    connections: wfSrc.connections,
    settings,
  });
  console.log('intake workflow import:', wf.status === 200 ? `id ${wf.json.id}` : `HTTP ${wf.status} ${JSON.stringify(wf.json).slice(0, 200)}`);
  if (wf.status !== 200) process.exit(1);

  // 4. Verify bindings
  const check = await api('GET', `/workflows/${wf.json.id}`);
  const nodes = check.json.nodes || [];
  const gmail = nodes.find((n) => n.type === 'n8n-nodes-base.gmailTrigger');
  const pg = nodes.find((n) => n.type === 'n8n-nodes-base.postgres');
  console.log('verify: nodes =', nodes.length,
    '| gmail cred =', gmail && gmail.credentials && gmail.credentials.gmailOAuth2 && gmail.credentials.gmailOAuth2.name,
    '| pg cred =', pg && pg.credentials && pg.credentials.postgres && pg.credentials.postgres.name,
    '| active =', check.json.active,
    '| errorWorkflow =', check.json.settings && check.json.settings.errorWorkflow);

  // 5. Delete old Sheets-version workflow
  const del = await api('DELETE', `/workflows/${OLD_WORKFLOW_ID}`);
  console.log('old Phase 19 workflow delete:', del.status === 200 ? 'deleted' : `HTTP ${del.status} ${JSON.stringify(del.json).slice(0, 150)}`);

  fs.writeFileSync(path.join(__dirname, '.phase25_workflow_id'), wf.json.id);
  console.log('\nDONE — workflow imported INACTIVE. Activation is a separate gated step (phase25_activate.cjs).');
})().catch((e) => { console.error('FATAL:', e.message); process.exit(1); });
