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

  const csvPath = path.join(__dirname, 'data', 'master-directory.csv');
  const fileContent = fs.readFileSync(csvPath, 'utf-8');
  const records = parse(fileContent, { skip_empty_lines: true, from_line: 2 });

  const clientMap = new Map<string, string>(); // key -> id
  
  let totalRows = records.length;
  let rowsSkipped = 0;
  let clientsCreated = 0;
  let clientsExisting = 0;
  let propertiesCreated = 0;
  let propertiesUpdated = 0;

  for (const row of records) {
    let clientName = (row[1] || '').trim();
    const managerName = (row[2] || '').trim();
    const address = (row[3] || '').trim();
    const managerEmail = (row[4] || '').trim();
    const accessInfo = (row[5] || '').trim();

    if (!address) {
      rowsSkipped++;
      continue;
    }

    let clientKey = clientName.toLowerCase();
    let type = 'pm_company';

    if (!clientKey) {
      clientName = 'Unknown';
      clientKey = 'unknown';
      type = 'private_owner';
    } else if (clientKey === 'private owner') {
      type = 'private_owner';
    }

    let clientId = clientMap.get(clientKey);

    if (!clientId) {
      // Upsert client
      const clientRes = await client.query(
        `INSERT INTO clients (org_id, name, type, contact_name, contact_email) 
         VALUES ('APT-CA', $1, $2, $3, $4) 
         ON CONFLICT DO NOTHING RETURNING id`,
        [clientName, type, managerName, managerEmail]
      );
      
      if (clientRes.rows.length > 0) {
        clientId = clientRes.rows[0].id;
        clientsCreated++;
      } else {
        const existRes = await client.query(
          `SELECT id FROM clients WHERE org_id = 'APT-CA' AND LOWER(name) = $1`,
          [clientKey]
        );
        if (existRes.rows.length > 0) {
          clientId = existRes.rows[0].id;
          clientsExisting++;
        }
      }
      if (clientId) {
        clientMap.set(clientKey, clientId);
      }
    }

    if (!clientId) continue;

    const addressKey = normalizeAddressKey(address, '');
    
    // Upsert property
    const propRes = await client.query(
      `INSERT INTO properties (org_id, client_id, address, address_key, rm_name, rm_email, access_info) 
       VALUES ('APT-CA', $1, $2, $3, $4, $5, $6) 
       ON CONFLICT (org_id, address_key) DO UPDATE SET 
       rm_name = EXCLUDED.rm_name, 
       rm_email = EXCLUDED.rm_email, 
       access_info = EXCLUDED.access_info 
       RETURNING id, xmax`,
      [clientId, address, addressKey, managerName, managerEmail, accessInfo]
    );

    if (propRes.rows[0].xmax == 0) {
      propertiesCreated++;
    } else {
      propertiesUpdated++;
    }
  }

  console.log('=== migrate-master-directory REPORT ===');
  console.log(`Total rows:         ${totalRows}`);
  console.log(`Rows skipped (blank address): ${rowsSkipped}`);
  console.log(`Clients created:    ${clientsCreated}`);
  console.log(`Clients existing:   ${clientsExisting}`);
  console.log(`Properties created: ${propertiesCreated}`);
  console.log(`Properties updated (conflict): ${propertiesUpdated}`);

  await client.end();
}

run().catch(console.error);
