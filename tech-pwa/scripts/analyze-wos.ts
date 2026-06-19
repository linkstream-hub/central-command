import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { db } from '../src/lib/db';
import { jobs, commsMessages } from '../src/lib/schema';
import { desc, isNotNull, sql } from 'drizzle-orm';

async function main() {
  console.log('Analyzing WO data in Neon DB...\n');

  try {
    const allJobs = await db.select({
      id: jobs.id,
      jobId: jobs.jobId,
      timestamp: jobs.timestamp,
      gmailMsgId: jobs.gmailMsgId,
    }).from(jobs).orderBy(desc(jobs.timestamp));

    console.log(`Total WOs in system: ${allJobs.length}`);

    const allThreads = await db.select({
      id: commsMessages.id,
      jobId: commsMessages.jobId,
    }).from(commsMessages);

    const jobsWithThreadRows = new Set(allThreads.map(t => t.jobId));
    console.log(`Total thread messages saved: ${allThreads.length}`);
    console.log(`WOs that have at least one thread message: ${jobsWithThreadRows.size}`);
    
    // Additional analysis
    const jobsWithGmailMsgId = allJobs.filter(j => j.gmailMsgId && j.gmailMsgId.trim() !== '');
    console.log(`WOs with a gmail_msg_id (root email): ${jobsWithGmailMsgId.length}`);

  } catch (err) {
    console.error('Error analyzing WOs:', err);
  } finally {
    process.exit(0);
  }
}

main().catch(console.error);
