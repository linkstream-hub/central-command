import { config } from 'dotenv';
config({ path: '.env.local' });

import { db } from '../src/lib/db';
import { jobs, employees } from '../src/lib/schema';
import { eq, inArray, isNotNull } from 'drizzle-orm';

function normalizeName(name: string): string {
  if (!name) return '';
  name = name.trim();
  // Remove #101 or similar badges appended
  name = name.split('#')[0].trim();
  // Convert "Last, First" -> "First Last"
  if (name.includes(',')) {
    const parts = name.split(',');
    if (parts.length === 2) {
      name = `${parts[1].trim()} ${parts[0].trim()}`;
    }
  }
  // Hardcoded fixes for known duplicates shown in screenshots
  if (name === 'Arteaga' || name === 'Jose Manuel') return 'Jose Manuel Arteaga';
  if (name === 'Cabrera' || name === 'Salvador' || name === 'Salvador V.') return 'Salvador Cabrera';
  if (name === 'Diaz') return 'Manuel Diaz';
  if (name === 'Daniel Embaye') return 'Daniel Embaye';
  if (name === 'Embaye, Daniel') return 'Daniel Embaye';
  if (name === 'Federico Santos Eduardo') return 'Federico Santos';
  if (name === 'Quizon') return 'Ronnie Quizon';
  if (name === 'Jaya, Boyette') return 'Boyette Johnson';
  if (name === 'La, Jimmy') return 'Jimmy La';
  if (name === 'Jimmy') return 'Jimmy La';
  
  return name;
}

async function main() {
  console.log('Starting Tech Data Cleanup...');

  // 1. Fetch all jobs with assigned techs
  const allJobs = await db.select({ id: jobs.id, tech: jobs.tech }).from(jobs).where(isNotNull(jobs.tech));
  console.log(`Found ${allJobs.length} jobs with assigned techs.`);

  const uniqueNormalizedNames = new Set<string>();
  const jobsToUpdate: { id: number, newTech: string }[] = [];

  for (const job of allJobs) {
    if (!job.tech) continue;
    
    // Handle comma separated multiple techs? The UI seems to split them.
    // Actually the schedule API splits them by comma. 
    // Wait! "Arteaga, Jose Manuel" contains a comma! 
    // Our schedule API does `row.tech.includes(',') ? row.tech.split(',')`.
    // THIS is why "Arteaga, Jose Manuel" was splitting into two techs!
    // We MUST normalize "Last, First" first, without splitting multiple techs, or handle them properly.
    
    // Let's assume a job is assigned to 1 tech. If multiple, we just normalize the whole string.
    // Wait, let's normalize properly.
    let cleanName = normalizeName(job.tech);
    
    if (cleanName !== job.tech) {
      jobsToUpdate.push({ id: job.id, newTech: cleanName });
    }
    uniqueNormalizedNames.add(cleanName);
  }

  console.log(`Found ${uniqueNormalizedNames.size} unique normalized tech names.`);

  // 2. Insert missing techs into Employees table
  const existingEmployees = await db.select().from(employees);
  const existingNames = new Set(existingEmployees.map(e => e.name));

  for (const name of uniqueNormalizedNames) {
    if (!existingNames.has(name) && name.length > 2) {
      console.log(`Inserting missing tech: ${name}`);
      await db.insert(employees).values({
        orgId: 'APT-CA',
        name: name,
        role: 'tech',
        isActive: true,
      });
    }
  }

  // 3. Update jobs with dirty names
  console.log(`Updating ${jobsToUpdate.length} jobs with normalized tech names...`);
  let updatedCount = 0;
  for (const update of jobsToUpdate) {
    await db.update(jobs).set({ tech: update.newTech }).where(eq(jobs.id, update.id));
    updatedCount++;
    if (updatedCount % 50 === 0) console.log(`Updated ${updatedCount} jobs...`);
  }

  console.log('Cleanup Complete!');
}

main().catch(console.error);
