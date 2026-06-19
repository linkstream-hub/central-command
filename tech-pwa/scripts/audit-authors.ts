import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../src/lib/schema';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function audit() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL not found');
    return;
  }

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql, { schema });

  console.log('--- DATABASE AUDIT: UNIQUE AUTHORS ---');
  
  try {
    const comments = await db.select().from(schema.jobComments);
    const authors = new Map<string, number>();
    
    comments.forEach(c => {
      const author = c.authorName || 'NULL';
      authors.set(author, (authors.get(author) || 0) + 1);
    });
    
    console.log('Unique Authors:');
    authors.forEach((count, author) => {
      console.log(`- ${author}: ${count} comments`);
    });

    console.log('\n--- SAMPLE COMMENTS ---');
    comments.slice(0, 10).forEach(c => {
        console.log(`[${c.authorName}] ${c.content.substring(0, 50)}`);
    });
  } catch (error) {
    console.error('Audit failed:', error);
  }
}

audit();
