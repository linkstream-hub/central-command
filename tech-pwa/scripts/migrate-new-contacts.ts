import { Client } from 'pg';
import { config } from 'dotenv';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

config({ path: '.env.local' });

async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL_UNPOOLED });
  await client.connect();

  const csvPath = path.join(__dirname, 'data', 'new-contacts.csv');
  const fileContent = fs.readFileSync(csvPath, 'utf-8');
  const records = parse(fileContent, { skip_empty_lines: true, from_line: 2 });

  let totalRows = records.length;
  let inserted = 0;
  let skippedDuplicate = 0;
  let skippedBlank = 0;

  for (const row of records) {
    if (row.join('').trim() === '') {
      skippedBlank++;
      continue;
    }

    const timestampStr = row[0] || null;
    const created_at = timestampStr ? new Date(timestampStr) : null;
    const source_lead_id = row[1] || null;
    const address = row[2] || null;
    const unit = row[3] || null;
    const client_name = row[4] || null;
    const manager_name = row[5] || null;
    const manager_email = row[6] || null;
    const access_info = row[7] || null;
    const notes = row[8] || null;
    const status = row[9] || null;
    const sender_email = row[10] || null;
    const gmail_msg_id = row[11] || null;

    if (gmail_msg_id) {
      const dupCheck = await client.query(
        `SELECT id FROM new_contact_queue WHERE gmail_msg_id = $1 AND org_id = 'APT-CA'`,
        [gmail_msg_id]
      );
      if (dupCheck.rows.length > 0) {
        skippedDuplicate++;
        console.log(`SKIP duplicate gmail_msg_id: ${gmail_msg_id}`);
        continue;
      }
    } else if (!source_lead_id && !address && !client_name) {
       // if all these are blank, let's treat it as a blank row skip
       skippedBlank++;
       continue;
    }

    await client.query(
      `INSERT INTO new_contact_queue (
        org_id, created_at, source_lead_id, address, unit,
        client_name, manager_name, manager_email, access_info,
        notes, status, sender_email, gmail_msg_id,
        reviewed_by, reviewed_at
      ) VALUES (
        'APT-CA', $1, $2, $3, $4,
        $5, $6, $7, $8,
        $9, $10, $11, $12,
        null, null
      )`,
      [
        created_at, source_lead_id, address, unit,
        client_name, manager_name, manager_email, access_info,
        notes, status, sender_email, gmail_msg_id
      ]
    );
    inserted++;
  }

  console.log('=== migrate-new-contacts REPORT ===');
  console.log(`Total rows:            ${totalRows}`);
  console.log(`Inserted:              ${inserted}`);
  console.log(`Skipped (duplicate):   ${skippedDuplicate}`);
  console.log(`Skipped (blank):       ${skippedBlank}`);

  await client.end();
}

run().catch(console.error);
