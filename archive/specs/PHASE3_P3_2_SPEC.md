# P3-2: TIME RECORDS MIGRATION SPEC
# Branch: feat/p3-2-time-records-migration
# Depends on: P3-1 merged (PR #818)
# Last updated: 2026-05-26 (Session 99)

---

## GOAL

Normalize the existing Neon `time_records` rows into the `shifts`, `breaks`, and `attestations`
tables. Wire up `time_records.shift_id` and `time_records.employee_id` FKs. No GAS calls needed —
Neon already has the data from P2 shadow writes. This is Neon-to-Neon normalization only.

**Definition of Done:**
- `shifts` table populated: one row per unique (techId, date) pair found in time_records
- `time_records.shift_id` FK wired to the correct shifts.id
- `time_records.employee_id` FK wired (employees.badge = time_records.techId)
- `breaks` table populated: one row per time_record with breakStart set
- `attestations` table populated: one row per time_record with attestation text set
- Migration script runs without errors against dev Neon (ep-snowy-block)
- Row counts verified: spot-check 5 records manually
- `npx tsc --noEmit` → 0 errors

---

## BRANCH SETUP (Task 0 — do this first, paste output before proceeding)

```powershell
git branch --show-current          # Must be: feat/p3-2-time-records-migration
git ls-remote --heads origin feat/p3-2-time-records-migration  # Must be non-empty
git log main..HEAD --oneline       # Must be empty (clean branch from main)
```

If branch doesn't exist: `git checkout -b feat/p3-2-time-records-migration && git push -u origin HEAD`

---

## FILES TO CREATE OR MODIFY

**New (2 files):**
- `tech-pwa/scripts/migrate-time-records.ts` — migration script (main deliverable)
- `tech-pwa/scripts/verify-p3-2.ts` — verification query script

**Modified (1 file):**
- `tech-pwa/package.json` — no change needed (pg and tsx already installed from P3-1)

**Scope boundary:** Only these files. No changes to schema.ts, routes, or any other file.

---

## TASK 1 — Read current state

Run this query against DATABASE_URL_UNPOOLED to understand the data:

```typescript
// Quick inline check — not a committed file
import { Client } from 'pg';
import { config } from 'dotenv';
config({ path: '.env.local' });
const c = new Client({ connectionString: process.env.DATABASE_URL_UNPOOLED });
await c.connect();
const tr = await c.query(`SELECT COUNT(*) as total,
  COUNT(DISTINCT (tech_id, date)) as unique_shifts,
  COUNT(CASE WHEN break_start IS NOT NULL THEN 1 END) as with_breaks,
  COUNT(CASE WHEN attestation IS NOT NULL AND attestation != '' THEN 1 END) as with_attestations,
  COUNT(CASE WHEN shift_id IS NOT NULL THEN 1 END) as already_linked
  FROM time_records`);
console.log('time_records state:', tr.rows[0]);
const emp = await c.query(`SELECT COUNT(*) as total FROM employees`);
console.log('employees:', emp.rows[0]);
await c.end();
```

Paste the output. Do not proceed to Task 2 until I confirm the data state.

---

## TASK 2 — Write migrate-time-records.ts

Create `tech-pwa/scripts/migrate-time-records.ts` with this exact logic:

```typescript
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
```

Run it: `cd tech-pwa && npx tsx scripts/migrate-time-records.ts`

Paste the full output. Do not proceed to Task 3 until I confirm.

---

## TASK 3 — Write verify-p3-2.ts and run it

Create `tech-pwa/scripts/verify-p3-2.ts`:

```typescript
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
```

Run: `npx tsx scripts/verify-p3-2.ts`
Paste full output. Stop here. Wait for my confirmation before Task 4.

---

## TASK 4 — tsc, push diff, artifact

```powershell
cd A:/PTOW/1_APT_Central_Command/tech-pwa
npx tsc --noEmit 2>&1         # Must be 0 errors

cd A:/PTOW/1_APT_Central_Command
git push origin HEAD
git diff origin/main...HEAD > artifacts/ag_diff.txt
git add artifacts/ag_diff.txt
git commit -m "chore(p3-2): add diff artifact for review"
git push origin HEAD
```

Paste: tsc output + line count of diff. Stop. Wait for PASS.

---

## TASK 5 — Test sprint (separate from Task 4)

After PASS on Task 4:

1. Dev server: `cd tech-pwa && npm run dev` (DATABASE_URL → ep-snowy-block pooled endpoint)
2. Verify in browser:
   - GET `/api/techs` → status 200 (still works after migration)
   - GET `/api/field/live` → status 200, employee count unchanged
3. `npx playwright test` → paste summary line
4. Kill dev server
5. Write `artifacts/ag_test_results.txt`:
   - shifts count from verify-p3-2.ts output: `______`
   - breaks count: `______`
   - attestations count: `______`
   - Spot-check 5 records: paste the JSON rows
   - /api/techs status: `______`
   - /api/field/live employee count: `______`
   - Playwright summary line: `______`
6. Commit + push artifact. Stop. Wait for clear-to-merge.

---

## TASK 6 — Merge (only after "Clear to merge" from Claude Code)

```powershell
gh pr create --title "feat(p3-2): time records migration — shifts/breaks/attestations normalized"
gh pr merge --squash
```
