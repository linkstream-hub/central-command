import { Client } from 'pg';
import { config } from 'dotenv';
config({ path: '.env.local' });

(async () => {
  const c = new Client({ connectionString: process.env.DATABASE_URL_UNPOOLED });
  await c.connect();
  const tables = await c.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name");
  const empCount = await c.query('SELECT COUNT(*) FROM employees');
  const orgCount = await c.query('SELECT COUNT(*) FROM orgs');
  console.log('Tables (' + tables.rows.length + '):', tables.rows.map(r => r.table_name));
  console.log('employees row count:', empCount.rows[0].count);
  console.log('orgs row count:', orgCount.rows[0].count);
  await c.end();
})();
