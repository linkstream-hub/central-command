import { Client } from 'pg';
import { config } from 'dotenv';
config({ path: '.env.local' });

const DB = process.env.DATABASE_URL_UNPOOLED!;

async function run() {
  const client = new Client({ connectionString: DB });
  await client.connect();
  console.log('Connected.');

  // ── STEP 1: Load employee lookup (badge → id) ──────────────────────────
  const empRows = await client.query(`SELECT id, badge FROM employees WHERE badge IS NOT NULL`);
  const badgeToId = new Map<string, number>(empRows.rows.map(r => [r.badge, r.id]));
  console.log(`Loaded ${badgeToId.size} employee badge mappings.`);

  // ── STEP 2: Load all time records ──────────────────────────────────────
  const trRows = await client.query(`
    SELECT id, record_id, tech_id, date, clock_in, clock_out,
           break_start, break_end, break_minutes, actual_hours,
           attestation, attestation_at, meal_warning
    FROM time_records
    ORDER BY date ASC, clock_in ASC
  `);
  console.log(`Found ${trRows.rows.length} time records to process.`);

  let shiftsCreated = 0, shiftsSkipped = 0;
  let breaksCreated = 0, breaksSkipped = 0;
  let attestationsCreated = 0, attestationsSkipped = 0;
  let fksWired = 0, fksMissing = 0;

  // ── STEP 3: Create shifts (one per unique techId+date) ─────────────────
  // Group records by (tech_id, date)
  const shiftGroups = new Map<string, typeof trRows.rows>();
  for (const row of trRows.rows) {
    const key = `${row.tech_id}::${row.date}`;
    if (!shiftGroups.has(key)) shiftGroups.set(key, []);
    shiftGroups.get(key)!.push(row);
  }

  const shiftKeyToId = new Map<string, number>(); // "techId::date" → shifts.id

  for (const [key, records] of shiftGroups) {
    const [techId, date] = key.split('::');
    const employeeId = badgeToId.get(techId);
    if (!employeeId) {
      console.log(`  SKIP shift ${key} — no employee found for badge "${techId}"`);
      shiftsSkipped++;
      continue;
    }

    // Use earliest clockIn as shiftStart, latest clockOut as shiftEnd
    const starts = records.map(r => r.clock_in).filter(Boolean);
    const ends = records.map(r => r.clock_out).filter(Boolean);
    const shiftStart = starts.length ? new Date(Math.min(...starts.map((d: string) => new Date(d).getTime()))) : null;
    const shiftEnd = ends.length ? new Date(Math.max(...ends.map((d: string) => new Date(d).getTime()))) : null;

    if (!shiftStart) {
      console.log(`  SKIP shift ${key} — no clock_in timestamp`);
      shiftsSkipped++;
      continue;
    }

    const shiftId = `SHIFT-${techId}-${date}`;
    const totalBreakMinutes = records.reduce((sum, r) => sum + (r.break_minutes || 0), 0);
    const actualHours = records.reduce((sum, r) => sum + (r.actual_hours || 0), 0) || null;

    const res = await client.query(`
      INSERT INTO shifts (org_id, shift_id, employee_id, shift_date, shift_start, shift_end,
                          total_break_minutes, actual_hours, status)
      VALUES ('APT-CA', $1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (shift_id) DO NOTHING
      RETURNING id
    `, [shiftId, employeeId, date, shiftStart, shiftEnd, totalBreakMinutes, actualHours,
        shiftEnd ? 'Complete' : 'Active']);

    if (res.rows.length > 0) {
      shiftKeyToId.set(key, res.rows[0].id);
      shiftsCreated++;
    } else {
      // Already exists — fetch id
      const existing = await client.query(`SELECT id FROM shifts WHERE shift_id = $1`, [shiftId]);
      if (existing.rows.length > 0) shiftKeyToId.set(key, existing.rows[0].id);
      shiftsSkipped++;
    }
  }
  console.log(`Shifts: ${shiftsCreated} created, ${shiftsSkipped} skipped.`);

  // ── STEP 4: Wire time_records FKs ──────────────────────────────────────
  for (const row of trRows.rows) {
    const key = `${row.tech_id}::${row.date}`;
    const shiftDbId = shiftKeyToId.get(key);
    const employeeId = badgeToId.get(row.tech_id);

    if (shiftDbId || employeeId) {
      await client.query(`
        UPDATE time_records
        SET shift_id = COALESCE($1, shift_id),
            employee_id = COALESCE($2, employee_id)
        WHERE id = $3
      `, [shiftDbId ?? null, employeeId ?? null, row.id]);
      fksWired++;
    } else {
      fksMissing++;
    }
  }
  console.log(`FKs wired: ${fksWired}, missing employee: ${fksMissing}.`);

  // ── STEP 5: Create breaks ───────────────────────────────────────────────
  for (const row of trRows.rows) {
    if (!row.break_start) continue;

    const res = await client.query(`
      INSERT INTO breaks (org_id, time_record_id, break_number, break_start, break_end,
                          break_minutes, break_type)
      VALUES ('APT-CA', $1, 1, $2, $3, $4, 'meal')
      ON CONFLICT DO NOTHING
      RETURNING id
    `, [row.record_id, row.break_start, row.break_end, row.break_minutes]);

    if (res.rows.length > 0) breaksCreated++;
    else breaksSkipped++;
  }
  console.log(`Breaks: ${breaksCreated} created, ${breaksSkipped} skipped.`);

  // ── STEP 6: Create attestations ─────────────────────────────────────────
  for (const row of trRows.rows) {
    if (!row.attestation || row.attestation.trim() === '') continue;

    const key = `${row.tech_id}::${row.date}`;
    const shiftDbId = shiftKeyToId.get(key);
    const employeeId = badgeToId.get(row.tech_id);

    if (!shiftDbId || !employeeId) {
      console.log(`  SKIP attestation for record ${row.record_id} — missing shift/employee`);
      attestationsSkipped++;
      continue;
    }

    const signedAt = row.attestation_at ? new Date(row.attestation_at) : new Date();
    const mealCompliant = !row.meal_warning; // mealWarning=true → violation → not compliant

    const res = await client.query(`
      INSERT INTO attestations (org_id, shift_id, employee_id, shift_date, attestation_text,
                                signed_at, meal_compliant, rest_compliant, overtime_hours)
      VALUES ('APT-CA', $1, $2, $3, $4, $5, $6, true, 0)
      ON CONFLICT (shift_id) DO NOTHING
      RETURNING id
    `, [shiftDbId, employeeId, row.date, row.attestation, signedAt, mealCompliant]);

    if (res.rows.length > 0) attestationsCreated++;
    else attestationsSkipped++;
  }
  console.log(`Attestations: ${attestationsCreated} created, ${attestationsSkipped} skipped.`);

  await client.end();
  console.log('\n✅ P3-2 migration complete.');
  console.log(`   Shifts: ${shiftsCreated} created`);
  console.log(`   Breaks: ${breaksCreated} created`);
  console.log(`   Attestations: ${attestationsCreated} created`);
  console.log(`   FK updates: ${fksWired} rows updated`);
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
