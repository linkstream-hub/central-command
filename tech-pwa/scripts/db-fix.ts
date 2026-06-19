import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// Try both URLs if one fails
const url = process.env.DATABASE_URL_PREVIEW || process.env.DATABASE_URL!;
const sql = neon(url);
const db = drizzle(sql);

async function main() {
  try {
    // 1. Delete dummies
    const deleted = await sql`DELETE FROM jobs WHERE address ILIKE '%375 Staten%' OR tenant_name ILIKE '%Jane Doe%' RETURNING id, address`;
    console.log('Deleted dummy jobs:', deleted.length);

    // 2. Check jobs with null timestamps
    const nullTimestamps = await sql`SELECT id, created_at, timestamp FROM jobs WHERE timestamp IS NULL LIMIT 5`;
    console.log('Jobs with null timestamp:', nullTimestamps);

    // 3. Check most recent jobs by created_at
    const recent = await sql`SELECT id, address, status, timestamp, created_at FROM jobs ORDER BY created_at DESC LIMIT 5`;
    console.log('Most recent jobs by created_at:', recent);
    
    // 4. Update timestamp to created_at where null
    const updated = await sql`UPDATE jobs SET timestamp = created_at WHERE timestamp IS NULL RETURNING id`;
    console.log('Updated timestamps for jobs:', updated.length);

  } catch (error) {
    console.error('Error:', error);
  }
}
main();
