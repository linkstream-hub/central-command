import { config } from 'dotenv';
config({ path: '.env.local' });
import { db } from '../src/lib/db';
import { jobs } from '../src/lib/schema';
import { desc } from 'drizzle-orm';

async function main() {
  const latestJobs = await db.select().from(jobs).orderBy(desc(jobs.timestamp)).limit(5);
  console.log('Latest 5 jobs in Neon:');
  latestJobs.forEach(j => console.log(`${j.jobId} - ${j.timestamp} - ${j.status}`));
}
main().catch(console.error);
