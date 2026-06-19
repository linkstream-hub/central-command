import { Client } from 'pg';
import { config } from 'dotenv';
import path from 'path';

config({ path: path.resolve(__dirname, '../.env.local') });

async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL_UNPOOLED });
  await client.connect();

  console.log('Querying for jobs with missing data that have emails...');

  // Find all jobs that might be Lapham forms but missing descriptions or tenant info
  const res = await client.query(`
    SELECT j.id, j.job_id, j.email_type, j.description, c.full_body, c.subject, c.from_email
    FROM jobs j
    JOIN comms_messages c ON j.job_id = c.job_id
    WHERE c.full_body IS NOT NULL 
      AND (j.email_type ILIKE '%Lapham%' OR c.subject ILIKE '%Lapham%' OR c.from_email ILIKE '%lapham%')
  `);

  console.log(`Found ${res.rows.length} messages to analyze.`);

  let updatedCount = 0;

  for (const row of res.rows) {
    const body = row.full_body;
    
    // Lapham Regex Extractors
    const nameMatch = body.match(/\*Name\*\s+([^\n]+)/i);
    const phoneMatch = body.match(/\*Phone\*\s+([^\n]+)/i);
    const emailMatch = body.match(/\*Email\*\s+([^\n]+)/i);
    const addressMatch = body.match(/\*Address\*\s+([^\n]+)/i);
    const unitMatch = body.match(/\*Unit\*\s+([^\n]+)/i);
    const petsMatch = body.match(/\*If so, what kind\?\*\s+([^\n]+)/i);
    
    // Look for permission block
    const pteTextMatch = body.match(/\*Please choose an option:\*\s+([^\*]+)\*/i);
    let pteRaw = pteTextMatch ? pteTextMatch[1].trim() : '';
    let pteGranted = 'N/A';
    let newStatus = null;

    if (pteRaw.toLowerCase().includes('do not give permission')) {
      pteGranted = 'No';
      newStatus = 'PTE Required'; // Update status if PTE is not granted
    } else if (pteRaw.toLowerCase().includes('give permission')) {
      pteGranted = 'Yes';
    }

    // Look for description block
    const descMatch = body.match(/\*Please describe in detail the maintenance problem below:\*\s+([\s\S]*?)(\-\s*this is a perfect example|--|Thank you|$)/i);
    
    // Some forwards have a custom written top part (e.g. Merkeb wrote: "Tenant prefers to give access so please contact them at 9257598422 to schedule.")
    let forwarderComment = '';
    const forwardHeaderIndex = body.indexOf('Begin forwarded message:');
    if (forwardHeaderIndex !== -1) {
      forwarderComment = body.substring(0, forwardHeaderIndex).trim();
    }

    let description = descMatch ? descMatch[1].trim() : (row.description === 'No Description - see origninal email' ? '' : row.description);
    if (!description && forwarderComment) {
      description = forwarderComment; // Fallback to whatever the RM typed
    }

    const tName = nameMatch ? nameMatch[1].trim() : null;
    const tPhone = phoneMatch ? phoneMatch[1].trim() : null;
    const tEmail = emailMatch ? emailMatch[1].trim() : null;
    const tPets = petsMatch ? petsMatch[1].trim() : null;

    if (tName || tPhone || tEmail || pteGranted !== 'N/A' || (description && description !== row.description)) {
      const updateFields: string[] = [];
      const values: any[] = [];
      let paramCounter = 1;

      if (tName) { updateFields.push(`tenant_name = $${paramCounter++}`); values.push(tName); }
      if (tPhone) { updateFields.push(`tenant_phone = $${paramCounter++}`); values.push(tPhone); }
      if (tEmail) { updateFields.push(`tenant_email = $${paramCounter++}`); values.push(tEmail); }
      if (tPets) { updateFields.push(`tenant_pets = $${paramCounter++}`); values.push(tPets); }
      if (pteGranted !== 'N/A') { updateFields.push(`pte = $${paramCounter++}`); values.push(pteGranted); }
      if (description && description.trim() !== '') { updateFields.push(`description = $${paramCounter++}`); values.push(description.trim()); }
      
      // Update status ONLY if it's currently Needs Review and PTE is No
      if (newStatus) {
         updateFields.push(`status = CASE WHEN status = 'Needs Review' THEN $${paramCounter++} ELSE status END`); 
         values.push(newStatus);
      }

      if (updateFields.length > 0) {
        values.push(row.job_id); // The WHERE condition
        const query = `UPDATE jobs SET ${updateFields.join(', ')} WHERE job_id = $${paramCounter}`;
        await client.query(query, values);
        updatedCount++;
        console.log(`Updated job ${row.job_id} with parsed data.`);
      }
    }
  }

  console.log(`Finished parsing. Updated ${updatedCount} jobs.`);
  await client.end();
}

run().catch(console.error);
