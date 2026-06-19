import { Client } from 'pg';
import { config } from 'dotenv';
config({ path: '.env.local' });

async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL_UNPOOLED });
  await client.connect();

  await client.query(`
    INSERT INTO orgs (org_id, parent_org_id, entity_type, name, timezone, is_active)
    VALUES
      ('HOLDING', NULL,     'holding',     'BGB-CRB Holdings LLC', 'America/Los_Angeles', true),
      ('APT-CA',  'HOLDING','maintenance', 'APT Maintenance Inc.', 'America/Los_Angeles', true)
    ON CONFLICT (org_id) DO NOTHING
  `);

  const result = await client.query(
    `SELECT org_id, entity_type, name FROM orgs ORDER BY id`
  );
  console.log('Orgs:', JSON.stringify(result.rows, null, 2));

  await client.end();
  console.log('✅ Orgs seeded.');
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
