import { db } from '../src/lib/db';
import { employees } from '../src/lib/schema';
import { sql } from 'drizzle-orm';

async function main() {
  const r = await db.execute(sql`
    SELECT
      COUNT(*) total,
      COUNT(pin_hash) with_pin_hash,
      COUNT(*) FILTER (WHERE pin_hash IS NULL) null_pin_hash,
      MIN(LENGTH(pin_hash)) min_len,
      MAX(LENGTH(pin_hash)) max_len,
      (SELECT pin_hash FROM employees WHERE pin_hash IS NOT NULL LIMIT 1) sample
    FROM employees
  `);
  console.log(r.rows[0]);
  process.exit(0);
}

main();
