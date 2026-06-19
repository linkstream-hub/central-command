import { config } from 'dotenv';
config({ path: '.env.local' });

import { parse } from 'csv-parse/sync';
import * as fs from 'fs';
import { db } from '../src/lib/db';
import { employees } from '../src/lib/schema';
import { eq } from 'drizzle-orm';

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
  return name;
}

async function main() {
  console.log('Reading Master Tech Roster from Downloads...');
  const CSV_URL = 'https://docs.google.com/spreadsheets/d/1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4/gviz/tq?tqx=out:csv&sheet=Tech%20Roster';
  const res = await fetch(CSV_URL);
  const text = await res.text();
  
  const records = parse(text, {
    columns: true,
    skip_empty_lines: true,
  });

  console.log(`Parsed ${records.length} valid technicians from the master CSV.`);

  console.log('Deactivating all existing dirty/typo techs in the database...');
  await db.update(employees).set({ isActive: false });

  let insertedCount = 0;
  
  for (const row of records as Record<string, string>[]) {
    const rawName = row['Name'];
    const cleanName = normalizeName(rawName);
    const badge = row['Badge #'] || null;
    const phone = row['Phone'] || null;
    
    // Check if tech exists by name
    const existing = await db.select().from(employees).where(eq(employees.name, cleanName));
    
    if (existing.length > 0) {
      // Reactivate and update
      await db.update(employees)
        .set({ 
          isActive: true, 
          badge: badge,
          phone: phone,
          role: 'tech' 
        })
        .where(eq(employees.id, existing[0].id));
    } else {
      // Insert new clean tech
      await db.insert(employees).values({
        orgId: 'APT-CA',
        name: cleanName,
        badge: badge,
        phone: phone,
        role: 'tech',
        isActive: true,
      });
    }
    insertedCount++;
  }

  console.log(`\nRoster Sync Complete! Successfully synced ${insertedCount} active technicians.`);
}

main().catch(console.error);
