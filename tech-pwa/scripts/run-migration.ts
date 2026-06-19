import { Client } from 'pg';
import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

config({ path: '.env.local' });

const MIGRATION = path.join(__dirname, '../drizzle/0003_mysterious_darkhawk.sql');

async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL_UNPOOLED });
  await client.connect();
  console.log('Connected.\n');

  const raw = fs.readFileSync(MIGRATION, 'utf-8');
  const statements = raw.split('--> statement-breakpoint').map(s => s.trim()).filter(Boolean);
  console.log(`${statements.length} statements to execute.\n`);

  for (let i = 0; i < statements.length; i++) {
    const preview = statements[i].slice(0, 80).replace(/\n/g, ' ');
    process.stdout.write(`[${i + 1}/${statements.length}] ${preview}... `);
    try {
      await client.query(statements[i]);
      console.log('OK');
    } catch (err) {
      const code = (err as NodeJS.ErrnoException & { code?: string }).code;
      const alreadyExists = new Set(['42P07', '42701', '42710', '42P16']);
      if (code && alreadyExists.has(code)) {
        console.log('SKIPPED (already exists)');
      } else {
        console.log('FAILED');
        console.error('\nError:', (err as Error).message);
        await client.end();
        process.exit(1);
      }
    }
  }

  await client.end();
  console.log('\n✅ All statements applied.');
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
