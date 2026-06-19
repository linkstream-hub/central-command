import { Client } from 'pg';
import { config } from 'dotenv';
config({ path: '.env.local' });

(async () => {
  const c = new Client({ connectionString: process.env.DATABASE_URL_UNPOOLED });
  await c.connect();

  const results = await Promise.all([
    c.query(`SELECT COUNT(*) FROM time_records`),
    c.query(`SELECT COUNT(*) FROM time_records WHERE shift_id IS NOT NULL`),
    c.query(`SELECT COUNT(*) FROM time_records WHERE employee_id IS NOT NULL`),
    c.query(`SELECT COUNT(*) FROM shifts`),
    c.query(`SELECT COUNT(*) FROM breaks`),
    c.query(`SELECT COUNT(*) FROM attestations`),
    // Spot-check: 5 records with full FK chain
    c.query(`SELECT tr.record_id, tr.tech_id, tr.date, s.shift_id, e.name as emp_name
             FROM time_records tr
             JOIN shifts s ON tr.shift_id = s.id
             JOIN employees e ON tr.employee_id = e.id
             LIMIT 5`),
  ]);

  console.log('time_records total:', results[0].rows[0].count);
  console.log('time_records with shift_id:', results[1].rows[0].count);
  console.log('time_records with employee_id:', results[2].rows[0].count);
  console.log('shifts:', results[3].rows[0].count);
  console.log('breaks:', results[4].rows[0].count);
  console.log('attestations:', results[5].rows[0].count);
  console.log('Spot-check (5 records with full chain):');
  console.log(JSON.stringify(results[6].rows, null, 2));

  await c.end();
})();
