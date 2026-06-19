import { config } from 'dotenv';
config({ path: '.env.local' });
import { Client } from 'pg';
import { getThreadByMessageId } from '../src/lib/gmail-client';

async function main() {
  console.log("--- Starting Gmail Thread Backfill (pg version) ---");

  const client = new Client({
    connectionString: process.env.DATABASE_URL_UNPOOLED,
  });
  await client.connect();

  // 1. Find jobs that have a gmailMsgId but NO messages in commsMessages
  const { rows: allJobs } = await client.query(`
    SELECT job_id, gmail_msg_id 
    FROM jobs 
    WHERE gmail_msg_id IS NOT NULL AND gmail_msg_id != ''
  `);

  const { rows: allComms } = await client.query('SELECT job_id FROM comms_messages');
  const jobsWithComms = new Set(allComms.map(c => c.job_id));
  
  const jobsToBackfill = allJobs.filter(j => !jobsWithComms.has(j.job_id));
  console.log(`Found ${jobsToBackfill.length} jobs to backfill.`);

  // Limit to 5 for safety test
  const batch = jobsToBackfill.slice(0, 5);

  let successCount = 0;
  for (const job of batch) {
    try {
      console.log(`Backfilling job ${job.job_id} (Msg ID: ${job.gmail_msg_id})...`);
      const thread = await getThreadByMessageId(job.gmail_msg_id);
      
      for (const msg of thread.messages) {
        await client.query(`
          INSERT INTO comms_messages 
          (job_id, message_id, thread_id, direction, stakeholder, from_email, to_email, subject, body_preview, full_body, sent_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          ON CONFLICT (message_id) DO NOTHING
        `, [
          job.job_id,
          msg.messageId,
          msg.threadId,
          'inbound',
          'TENANT',
          msg.fromEmail,
          msg.toEmail,
          msg.subject,
          msg.bodyPreview,
          msg.fullBody,
          msg.sentAt
        ]);
      }
      successCount++;
    } catch (err: any) {
      console.error(`Failed to backfill job ${job.job_id}:`, err.message);
    }
  }

  console.log(`\nBackfill test complete. Successfully backfilled ${successCount} out of ${batch.length} jobs processed.`);
  await client.end();
}

main().catch(console.error);
