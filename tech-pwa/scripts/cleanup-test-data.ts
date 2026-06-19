import { config } from 'dotenv';
config({ path: '.env.local' }); // Ensure env vars are loaded!

import { db } from '../src/lib/db';
import { jobs } from '../src/lib/schema';
import { eq, like, or } from 'drizzle-orm';

async function main() {
  console.log('🧹 Sweeping dummy data from Neon Database...');

  try {
    const result = await db.delete(jobs).where(
      or(
        like(jobs.address, '%9999 Manual Test Ave%'),
        like(jobs.address, '%Test Address%')
      )
    ).returning({ deletedId: jobs.jobId, address: jobs.address });

    console.log(`✅ Successfully deleted ${result.length} dummy Work Orders.`);
    result.forEach(r => console.log(`   - Deleted: ${r.address} (${r.deletedId})`));

  } catch (error) {
    console.error('❌ Failed to clean up dummy data:', error);
  }
}

main().catch(console.error);
