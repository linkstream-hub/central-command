import { config } from 'dotenv';
config({ path: '.env.local' });
import { Client } from 'pg';

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL_UNPOOLED,
  });

  await client.connect();

  const { rows } = await client.query('SELECT job_id, timestamp, status, priority, category FROM jobs ORDER BY timestamp DESC LIMIT 20');
  console.table(rows);

  await client.end();
}

main().catch(console.error);
