import { db } from '../src/lib/db';
import { jobs } from '../src/lib/schema';
import { like } from 'drizzle-orm';

async function main() {
  const janeJobs = await db.select().from(jobs).where(like(jobs.tenantName, '%Jane%'));
  console.log('Jane jobs count:', janeJobs.length);
  if (janeJobs.length > 0) {
    console.log(janeJobs[0]);
  }
}
main();
