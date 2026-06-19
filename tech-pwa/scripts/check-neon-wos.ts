import { config } from 'dotenv';
config({ path: '.env.local' });
import { Client } from 'pg';

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL_UNPOOLED,
  });

  await client.connect();

  console.log("--- WO Analysis (pg direct) ---");

  // Get total WOs
  const { rows: allJobs } = await client.query('SELECT job_id, timestamp, gmail_msg_id FROM jobs ORDER BY timestamp DESC');
  console.log(`Total WOs in Neon DB: ${allJobs.length}`);
  
  if (allJobs.length > 0) {
    console.log(`Most recent WO timestamp: ${allJobs[0].timestamp}`);
    console.log(`Most recent WO ID: ${allJobs[0].job_id}`);
  }

  // Count WOs with email threads
  const jobsWithMsgId = allJobs.filter(j => j.gmail_msg_id && j.gmail_msg_id.trim() !== '');
  console.log(`\nWOs with a Gmail Msg ID (Thread reference): ${jobsWithMsgId.length} out of ${allJobs.length}`);

  // Look at actual thread messages in DB
  const { rows: allThreads } = await client.query('SELECT job_id FROM comms_messages');
  console.log(`Total thread messages in comms_messages DB table: ${allThreads.length}`);
  
  const jobsWithThreadRows = new Set(allThreads.map(t => t.job_id));
  console.log(`WOs that have at least one message row in comms_messages table: ${jobsWithThreadRows.size} out of ${allJobs.length}`);

  await client.end();
}

main().catch(console.error);
