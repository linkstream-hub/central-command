// Wave 0 discovery: enumerate Railway sentinel services, read env var NAMES (not values),
// fetch recent deploy logs to recover SQL/check logic.
// Reads RAILWAY_TOKEN from tech-pwa/.env.local in-process —
// token never touches argv or stdout.
const fs = require('fs');
const path = require('path');

const envFile = fs.readFileSync(path.join(__dirname, '../../tech-pwa/.env.local'), 'utf8');
const env = {};
envFile.split(/\r?\n/).forEach((line) => {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) env[m[1]] = m[2].replace(/^"|"$/g, '');
});

const token = env.RAILWAY_TOKEN;
if (!token) {
  console.error('missing RAILWAY_TOKEN in tech-pwa/.env.local');
  process.exit(1);
}

const GQL = 'https://backboard.railway.app/graphql/v2';
const projectId = 'c905a353-0927-4eeb-85f1-11c11d392a08';

async function gql(query, variables) {
  const res = await fetch(GQL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  return res.json();
}

(async () => {
  // ─── Step 1: Enumerate services and environments ───────────────────────────
  console.log('=== STEP 1: Project topology ===');
  let environmentId = null;
  let sentinelServices = [];

  try {
    const j = await gql(`
      query($id: String!) {
        project(id: $id) {
          name
          services { edges { node { id name } } }
          environments { edges { node { id name } } }
        }
      }
    `, { id: projectId });

    if (j.errors) {
      console.log('ERROR (project query):', JSON.stringify(j.errors).slice(0, 200));
    } else {
      const p = j.data.project;
      console.log('Project:', p.name);

      console.log('\nAll services:');
      for (const { node } of p.services.edges) {
        console.log(' ', node.name, '|', node.id);
        if (node.name.toLowerCase().includes('sentinel')) {
          sentinelServices.push({ id: node.id, name: node.name });
        }
      }

      console.log('\nAll environments:');
      for (const { node } of p.environments.edges) {
        console.log(' ', node.name, '|', node.id);
        // Prefer 'production' environment; fall back to first found
        if (!environmentId || node.name.toLowerCase() === 'production') {
          environmentId = node.id;
        }
      }

      console.log('\nSentinel services identified:', sentinelServices.length);
      for (const s of sentinelServices) {
        console.log(' ', s.name, '|', s.id);
      }
      console.log('Using environmentId:', environmentId);
    }
  } catch (err) {
    console.log('ERROR (project query):', String(err).slice(0, 200));
  }

  if (!sentinelServices.length || !environmentId) {
    console.log('\nWARNING: No sentinel services or no environment found — continuing with whatever was discovered.');
  }

  // ─── Step 2: Per-sentinel env var KEY NAMES + DATABASE_URL presence ────────
  console.log('\n=== STEP 2: Env var key names per sentinel (no values printed) ===');

  for (const svc of sentinelServices) {
    console.log(`\n--- ${svc.name} (${svc.id}) ---`);
    try {
      const j = await gql(`
        query($projectId: String!, $environmentId: String!, $serviceId: String!) {
          variables(projectId: $projectId, environmentId: $environmentId, serviceId: $serviceId)
        }
      `, { projectId, environmentId, serviceId: svc.id });

      if (j.errors) {
        console.log('  ERROR (variables query):', JSON.stringify(j.errors).slice(0, 200));
        continue;
      }

      const vars = j.data.variables || {};
      const keys = Object.keys(vars);
      const hasDatabaseUrl = keys.some((k) => k === 'DATABASE_URL');

      console.log('  Env var key names:', keys.join(', ') || '(none)');
      console.log('  DATABASE_URL present:', hasDatabaseUrl);
    } catch (err) {
      console.log('  ERROR (variables query):', String(err).slice(0, 200));
    }
  }

  // ─── Step 3: Recent deploy logs per sentinel (SQL/check logic recovery) ────
  console.log('\n=== STEP 3: Recent deploy logs per sentinel (SQL recovery surface) ===');

  for (const svc of sentinelServices) {
    console.log(`\n--- ${svc.name} deploy logs ---`);
    let deploymentId = null;

    // Get latest deployment id
    try {
      const j = await gql(`
        query($input: DeploymentListInput!, $first: Int) {
          deployments(input: $input, first: $first) {
            edges { node { id status createdAt } }
          }
        }
      `, {
        input: { projectId, serviceId: svc.id, environmentId },
        first: 1,
      });

      if (j.errors) {
        console.log('  ERROR (deployments query):', JSON.stringify(j.errors).slice(0, 200));
        continue;
      }

      const edges = (j.data.deployments || {}).edges || [];
      if (!edges.length) {
        console.log('  No deployments found for this service.');
        continue;
      }
      deploymentId = edges[0].node.id;
      console.log('  Latest deployment:', deploymentId, '| status:', edges[0].node.status, '| created:', edges[0].node.createdAt);
    } catch (err) {
      console.log('  ERROR (deployments query):', String(err).slice(0, 200));
      continue;
    }

    // Fetch deploy logs
    try {
      const j = await gql(`
        query($deploymentId: String!, $limit: Int) {
          deploymentLogs(deploymentId: $deploymentId, limit: $limit) {
            message
            timestamp
          }
        }
      `, { deploymentId, limit: 200 });

      if (j.errors) {
        console.log('  ERROR (deploymentLogs query):', JSON.stringify(j.errors).slice(0, 200));
        continue;
      }

      const logs = j.data.deploymentLogs || [];
      if (!logs.length) {
        console.log('  No log lines returned.');
      } else {
        console.log(`  Log lines (${logs.length}):`);
        for (const line of logs) {
          console.log('  [' + (line.timestamp || '') + ']', line.message || '');
        }
      }
    } catch (err) {
      console.log('  ERROR (deploymentLogs query):', String(err).slice(0, 200));
    }
  }

  console.log('\n=== DONE ===');
  console.log('STOP — paste this entire output back to Claude Code for SENTINEL_INVENTORY.md');
})();
