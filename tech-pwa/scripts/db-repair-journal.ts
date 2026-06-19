import { config } from 'dotenv';
config({ path: '.env.local' });

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { Pool } from 'pg';

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL_UNPOOLED });
  const client = await pool.connect();

  try {
    await client.query(`CREATE SCHEMA IF NOT EXISTS drizzle`);
    await client.query(`
      CREATE TABLE IF NOT EXISTS drizzle."__drizzle_migrations" (
        id SERIAL PRIMARY KEY,
        hash TEXT NOT NULL,
        created_at BIGINT
      )
    `);

    const journalPath = path.join(process.cwd(), 'drizzle', 'meta', '_journal.json');
    const journal = JSON.parse(fs.readFileSync(journalPath, 'utf-8'));

    const toMark = journal.entries.filter((e: { idx: number }) => e.idx < 4);

    for (const entry of toMark) {
      const sql = fs.readFileSync(
        path.join(process.cwd(), 'drizzle', `${entry.tag}.sql`),
        'utf-8'
      );
      const hash = crypto.createHash('sha256').update(sql).digest('hex');

      const existing = await client.query(
        'SELECT id FROM drizzle."__drizzle_migrations" WHERE hash = $1',
        [hash]
      );

      if (existing.rows.length === 0) {
        await client.query(
          'INSERT INTO drizzle."__drizzle_migrations" (hash, created_at) VALUES ($1, $2)',
          [hash, entry.when]
        );
        console.log(`Recorded: ${entry.tag}`);
      } else {
        console.log(`Already recorded: ${entry.tag}`);
      }
    }

    console.log('Repair complete — run npm run db:migrate to apply remaining migrations.');
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
