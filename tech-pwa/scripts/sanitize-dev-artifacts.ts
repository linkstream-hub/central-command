import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../src/lib/schema';
import { eq } from 'drizzle-orm';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function sanitize() {
  if (!process.env.DATABASE_URL) {
    console.error('ERROR: DATABASE_URL not found in .env.local');
    return;
  }

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql, { schema });

  console.log('--- DATABASE SANITIZATION: REMOVING DEV ARTIFACTS ---');
  
  try {
    const result = await db.delete(schema.jobComments)
      .where(eq(schema.jobComments.authorName, 'Dev Admin'))
      .returning();
    
    console.log(`Successfully removed ${result.length} artifacts from "Dev Admin".`);
    
    if (result.length > 0) {
      console.log('Deleted records summaries:');
      result.forEach(c => {
        console.log(`- [Job ${c.jobId}] ${c.content.substring(0, 50)}...`);
      });
    }
  } catch (error) {
    console.error('Sanitization failed:', error);
  }
}

sanitize();
