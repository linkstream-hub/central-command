import { config } from 'dotenv';
config({ path: '.env.local' });
import { Client } from 'pg';

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL_UNPOOLED,
  });

  await client.connect();

  console.log("--- Executing Phase 1: Un-archiving recent WOs ---");

  // Update jobs from June 1, 2026 onwards that are currently 'Archived'
  const result = await client.query(`
    UPDATE jobs 
    SET status = 'Needs Review' 
    WHERE status = 'Archived' AND timestamp >= '2026-06-01'
    RETURNING job_id, timestamp
  `);

  console.log(`Successfully updated ${result.rowCount} Work Orders from 'Archived' to 'Needs Review'.`);
  
  await client.end();
}

main().catch(console.error);
