import { Client } from 'pg';
import { config } from 'dotenv';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

config({ path: '.env.local' });

function normalizeAddressKey(address: string, unit: string): string {
  let addr = String(address || '').replace(/##/g, '#');
  const embeddedUnit = addr.match(/#(\w+)/);
  if (embeddedUnit && !unit) unit = embeddedUnit[1];
  addr = addr.replace(/#\w+/g, '').trim();
  addr = addr.split(',')[0].trim();
  addr = addr.replace(
    /\b(avenue|ave|street|st|boulevard|blvd|drive|dr|road|rd|lane|ln|way|place|pl|court|ct|terrace|terr)\b\.?/gi,
    (m) => m.replace(/\.$/, '').toLowerCase()
  );
  addr = addr.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
  unit = String(unit || '').toLowerCase().replace(/[^a-z0-9]/g, '').trim();
  return addr + '||' + unit;
}

async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL_UNPOOLED });
  await client.connect();

  const employeeMap = new Map<string, string>();
  const empRes = await client.query(`SELECT id, name FROM employees WHERE is_active = true`);
  for (const row of empRes.rows) {
    employeeMap.set((row.name || '').trim().toLowerCase(), row.id);
  }

  const propertyMap = new Map<string, string>();
  const propRes = await client.query(`SELECT id, address_key FROM properties WHERE org_id = 'APT-CA'`);
  for (const row of propRes.rows) {
    propertyMap.set(row.address_key, row.id);
  }

  const csvPath = path.join(__dirname, 'data', 'dispatch-queue.csv');
  const fileContent = fs.readFileSync(csvPath, 'utf-8');
  const records = parse(fileContent, { skip_empty_lines: true, from_line: 2 });

  let totalRows = records.length;
  let rowsSkipped = 0;
  let jobsInserted = 0;
  let jobsUpdated = 0;
  let jobsWithEmployee = 0;
  let jobsWithProperty = 0;
  const unmatchedTechs = new Set<string>();
  let unmatchedAddressesCount = 0;

  for (const row of records) {
    const job_id = (row[1] || '').trim();
    if (!job_id) {
      rowsSkipped++;
      continue;
    }

    const timestampStr = row[0] || null;
    const timestamp = timestampStr ? new Date(timestampStr) : null;
    const priority = row[2] || null;
    const email_type = row[3] || null;
    const category = row[4] || null;
    const address = row[5] || null;
    const unit = row[6] || null;
    const description = row[7] || null;
    const timing = row[8] || null;
    const access_info = row[9] || null;
    const rm_name = row[10] || null;
    const rm_email = row[11] || null;
    const tenant_name = row[12] || null;
    const tenant_phone = row[13] || null;
    const pte = row[14] || null;
    const estimate = row[15] || null;
    const tech = row[16] || null;

    const scheduled_date_time = row[17] || '';
    let scheduled_date = null;
    let scheduled_time = null;
    if (scheduled_date_time) {
      const parts = scheduled_date_time.split('|');
      scheduled_date = parts[0] || null;
      scheduled_time = parts[1] || null;
    }

    const est_hours_str = row[18];
    const est_hours = est_hours_str ? parseFloat(est_hours_str) : null;

    const status = row[19] || null;
    const notes = row[20] || null;
    const gmail_msg_id = row[21] || null;
    const calendar_event_id = row[22] || null;
    const tenant_email = row[23] || null;
    const tenant_pref = row[24] || null;
    const tenant_pets = row[25] || null;
    const wc_code = row[26] || null;
    const tracking_token = row[28] || null;
    const tenant_scheduled = String(row[29] || '').toUpperCase() === 'TRUE';

    let employee_id = null;
    if (tech && tech.trim()) {
      const empMatch = employeeMap.get(tech.trim().toLowerCase());
      if (empMatch) {
        employee_id = empMatch;
        jobsWithEmployee++;
      } else {
        unmatchedTechs.add(tech.trim());
      }
    }

    let property_id = null;
    if (address) {
      const address_key = normalizeAddressKey(address, unit || '');
      const propMatch = propertyMap.get(address_key);
      if (propMatch) {
        property_id = propMatch;
        jobsWithProperty++;
      } else {
        unmatchedAddressesCount++;
      }
    }

    const res = await client.query(
      `INSERT INTO jobs (
        org_id, job_id, timestamp, priority, email_type, category,
        address, unit, description, timing, access_info,
        rm_name, rm_email, tenant_name, tenant_phone,
        pte, estimate, tech, employee_id, scheduled_date,
        scheduled_time, est_hours, status, notes, gmail_msg_id,
        calendar_event_id, tenant_email, tenant_pref, tenant_pets,
        wc_code, tracking_token, tenant_scheduled, property_id
      ) VALUES (
        'APT-CA', $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10,
        $11, $12, $13, $14,
        $15, $16, $17, $18, $19,
        $20, $21, $22, $23, $24,
        $25, $26, $27, $28,
        $29, $30, $31, $32
      )
      ON CONFLICT (job_id) DO UPDATE SET
        employee_id = COALESCE(EXCLUDED.employee_id, jobs.employee_id),
        property_id = COALESCE(EXCLUDED.property_id, jobs.property_id),
        status = EXCLUDED.status,
        tech = EXCLUDED.tech
      RETURNING id, xmax`,
      [
        job_id, timestamp, priority, email_type, category,
        address, unit, description, timing, access_info,
        rm_name, rm_email, tenant_name, tenant_phone,
        pte, estimate, tech, employee_id, scheduled_date,
        scheduled_time, est_hours, status, notes, gmail_msg_id,
        calendar_event_id, tenant_email, tenant_pref, tenant_pets,
        wc_code, tracking_token, tenant_scheduled, property_id
      ]
    );

    if (res.rows[0].xmax == 0) {
      jobsInserted++;
    } else {
      jobsUpdated++;
    }
  }

  console.log('=== migrate-dispatch-queue REPORT ===');
  console.log(`Total rows:               ${totalRows}`);
  console.log(`Rows skipped (blank job_id): ${rowsSkipped}`);
  console.log(`Jobs inserted (new):      ${jobsInserted}`);
  console.log(`Jobs updated (existing):  ${jobsUpdated}`);
  console.log(`Jobs with employee_id:    ${jobsWithEmployee}`);
  console.log(`Jobs with property_id:    ${jobsWithProperty}`);
  console.log(`Unmatched tech names:     [${Array.from(unmatchedTechs).join(', ')}]`);
  console.log(`Unmatched addresses:      ${unmatchedAddressesCount}`);

  await client.end();
}

run().catch(console.error);
