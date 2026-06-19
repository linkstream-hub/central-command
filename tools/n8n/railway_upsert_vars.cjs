// One-shot: upsert Phase 25 intake-workflow env vars on the Railway n8n service.
// Reads RAILWAY_TOKEN + DASHBOARD_API_KEY from tech-pwa/.env.local directly —
// secrets never touch argv or stdout.
const fs = require('fs');
const path = require('path');

const envFile = fs.readFileSync(path.join(__dirname, '../../tech-pwa/.env.local'), 'utf8');
const env = {};
envFile.split(/\r?\n/).forEach((line) => {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) env[m[1]] = m[2].replace(/^"|"$/g, '');
});

const token = env.RAILWAY_TOKEN;
const dashboardKey = env.DASHBOARD_API_KEY;
if (!token || !dashboardKey) {
  console.error('missing RAILWAY_TOKEN or DASHBOARD_API_KEY in .env.local');
  process.exit(1);
}

const ids = {
  projectId: 'c905a353-0927-4eeb-85f1-11c11d392a08',
  environmentId: 'dc5f2d57-7a83-43b9-b3d0-3f95792678ea',
  serviceId: '68dca13c-ee80-4043-8ab4-c9f82762364d',
};

const vars = [
  ['GEMINI_API_KEY', '${{shared.GEMINI_API_KEY}}'],
  ['DASHBOARD_API_URL', '${{shared.DASHBOARD_API_URL}}'],
  ['DASHBOARD_API_KEY', dashboardKey],
];

(async () => {
  for (const [name, value] of vars) {
    const res = await fetch('https://backboard.railway.app/graphql/v2', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: 'mutation($input: VariableUpsertInput!) { variableUpsert(input: $input) }',
        variables: { input: { ...ids, name, value } },
      }),
    });
    const j = await res.json();
    console.log(name, '->', j.errors ? 'ERROR: ' + JSON.stringify(j.errors).slice(0, 200) : 'upserted');
  }
})();
