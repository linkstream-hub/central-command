import { parse } from 'csv-parse/sync';
import { db } from '../src/lib/db';
import { properties, tenantContacts, jobs, newContactQueue } from '../src/lib/schema';
import { eq } from 'drizzle-orm';

const SHEET_ID = '1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;

async function main() {
  console.log('Downloading CSV from Google Sheets...');
  const res = await fetch(CSV_URL);
  const text = await res.text();
  
  console.log('Parsing CSV...');
  const records = parse(text, {
    columns: true,
    skip_empty_lines: true,
  });

  console.log(`Parsed ${records.length} rows.`);

  const propertyMap = new Map<string, number>(); // addressKey -> id
  let propInsertCount = 0;
  let jobInsertCount = 0;

  for (const row of records as Record<string, string>[]) {
    const address = (row['Property Address'] || '').trim();
    const unit = (row['Unit'] || '').trim();
    const city = (row['City'] || 'Oakland').trim();
    const rmName = (row['RM Name'] || '').trim();
    const rmEmail = (row['RM Email'] || '').trim();
    const accessInfo = (row['Access / Lockbox Info'] || '').trim();
    
    // 1. Handle Property
    let propId: number | null = null;
    if (address) {
      const addressKey = `${address.toLowerCase()}-${unit.toLowerCase()}-${city.toLowerCase()}`;
      if (!propertyMap.has(addressKey)) {
        // Try to insert property
        try {
          const [inserted] = await db.insert(properties).values({
            orgId: 'APT-CA',
            address,
            unit,
            city,
            addressKey,
            rmName,
            rmEmail,
            accessInfo
          }).onConflictDoUpdate({
            target: [properties.orgId, properties.addressKey],
            set: { rmName, rmEmail, accessInfo }
          }).returning({ id: properties.id });
          
          propertyMap.set(addressKey, inserted.id);
          propInsertCount++;
          console.log(`Upserted property: ${address} ${unit ? `Unit ${unit}` : ''}`);
        } catch (e) {
          console.error(`Failed to insert property ${addressKey}:`, (e as Error).message);
        }
      }
      propId = propertyMap.get(addressKey) || null;
    }

    // 2. Handle Job
    const jobId = row['Lead ID'] || `APT-MIG-${Date.now()}-${Math.floor(Math.random()*1000)}`;
    const category = row['Service Category'];
    const priority = row['Urgency'];
    const description = row['Description'];
    const timing = row['Preferred Timing'];
    
    try {
      await db.insert(jobs).values({
        orgId: 'APT-CA',
        propertyId: propId,
        jobId,
        address,
        unit,
        category,
        priority,
        description,
        timing,
        accessInfo,
        rmName,
        rmEmail,
        tenantName: row['Tenant Name'],
        tenantPhone: row['Tenant Phone'],
        tenantEmail: row['Tenant Email'],
        status: 'Archived', // Start as archived so we don't flood the dashboard, only live ones will be updated later or we can set based on a missing column? Wait, the sheet has no status!
        emailType: row['Email Type'],
        timestamp: row['Timestamp'] ? new Date(row['Timestamp']) : new Date(),
      }).onConflictDoNothing();
      jobInsertCount++;
    } catch (e) {
      console.error(`Failed to insert job ${jobId}:`, (e as Error).message);
    }
  }

  console.log(`\nMigration Complete!`);
  console.log(`Inserted/Updated ${propInsertCount} unique properties.`);
  console.log(`Inserted ${jobInsertCount} jobs.`);
}

main().catch(console.error);
