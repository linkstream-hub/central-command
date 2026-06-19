import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../src/lib/schema';
import { eq } from 'drizzle-orm';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function audit() {
  if (!process.env.DATABASE_URL) {
    console.error('ERROR: DATABASE_URL not found in .env.local');
    return;
  }

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql, { schema });

  console.log('--- DATABASE AUDIT: SEARCHING FOR DEV ARTIFACTS ---');
  
  try {
    const devComments = await db.select()
      .from(schema.jobComments)
      .where(eq(schema.jobComments.authorName, 'Dev Admin'));
    
    console.log(`Found ${devComments.length} comments from "Dev Admin".`);
    
    if (devComments.length > 0) {
      console.log('\nSample artifacts:');
      devComments.slice(0, 5).forEach(c => {
        console.log(`- [Job ${c.jobId}] ${c.content.substring(0, 50)}...`);
      });
    }
  } catch (error) {
    console.error('Audit failed:', error);
  }
}

audit();
