import { config } from 'dotenv';
config({ path: '.env.local' });

import { db } from '../src/lib/db';
import { employees } from '../src/lib/schema';

async function main() {
  const allEmployees = await db.select().from(employees);
  console.log(`Found ${allEmployees.length} employees:`);
  allEmployees.forEach(e => console.log(`- ${e.name} (Badge: ${e.badge}, Role: ${e.role}, Active: ${e.isActive})`));
}

main().catch(console.error);
