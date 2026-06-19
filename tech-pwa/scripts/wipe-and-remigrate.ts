import { Client } from 'pg';
import { config } from 'dotenv';
import { execSync } from 'child_process';
import path from 'path';

config({ path: '.env.local' });

async function run() {
  console.log('Connecting to database to wipe jobs...');
  const client = new Client({ connectionString: process.env.DATABASE_URL_UNPOOLED });
  await client.connect();

  const res = await client.query('DELETE FROM jobs');
  console.log(`Deleted ${res.rowCount} jobs from database.`);
  await client.end();

  console.log('\nRunning migrate-dispatch-queue.ts to insert true jobs...');
  execSync('npx tsx scripts/migrate-dispatch-queue.ts', { stdio: 'inherit' });

  console.log('\nDone!');
}

run().catch(console.error);
