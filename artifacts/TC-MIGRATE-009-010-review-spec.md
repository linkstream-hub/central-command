# Task Card Review Spec — TC-MIGRATE-009-010
# Apply migrations 0009 + 0010 to production Neon DB
# Status: AWAITING EXTERNAL REVIEW before Brandon approves Task Card
# Date: 2026-06-29

---

## For Reviewers

This spec is submitted to multiple AI reviewers (ChatGPT, Claude, DeepSeek, Grok) for independent evaluation before approval.

**Your job:** Identify flaws, gaps, risks, or better approaches. Every claim below was derived from direct source file reads and live DB queries — not from docs or memory. Be specific. Cite line numbers or SQL where relevant.

**Standards this task must meet:**
- **Karpathy guidelines**: State assumptions explicitly. Minimum SQL to solve the problem. Surgical changes only. Verifiable success criteria. Run once, verify — no iterative debug loops.
- **Pocock TDD**: RED (confirm broken) → GREEN (apply fix) → verify. No production change without a failure state that the change provably resolves.
- **Lead dev standard**: What would a professional grade dev team do? No shortcuts. Rollback plan must be tested or testable. No silent failures.

---

## 1. System Context

```yaml
app: APT Central Command
stack:
  framework: Next.js 16.2.6 (Turbopack)
  orm: Drizzle ORM + drizzle-kit
  db: Neon Postgres (serverless HTTP via @neondatabase/serverless)
  deploy: Vercel (auto-deploy on merge to main)
  neon_project: purple-dust-72858226
  migration_mode: MANUAL — no atomic migration in CI/CD pipeline
    note: "npm run build" = "next build" only; migrations run manually against prod DB
    known_issue: P1-002 in KNOWN_ISSUES.md — fix in Phase 2

constraints:
  feature_freeze: ACTIVE — no new features; only recovery/emergency fixes
  this_task: qualifies as emergency fix — shipped code is silently broken in production
  no_downtime_requirement: app must remain live during migration
  neon_serverless: HTTP-only connections; no persistent TCP; supports transactions via BEGIN/COMMIT
```

---

## 2. Problem Statement

**UploadThing photo upload is silently broken in production.**

PR #25 (merged to main, commit `2319af8f`, deployed 2026-06-29) ships UploadThing as the photo upload mechanism for field technicians. The application code references a `job_photos` table. That table does not exist in production.

**Confirmed by Neon query 2026-06-29:**
```sql
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public' AND table_name = 'job_photos';
-- Returns: 0 rows
```

**Failure mode:** When a field tech uploads a photo, UploadThing calls `/api/uploadthing` → `onUploadComplete` → `db.insert(jobPhotos).values(...)`. This hits:
```
NeonDbError: relation "job_photos" does not exist
```
No error boundary exists in `onUploadComplete` — the error propagates to the UploadThing SDK unhandled.

**Scope:** Only photo uploads are broken. No other functionality is affected.

---

## 3. Root Cause

Two migrations were never applied to the current production Neon project.

**Migration history:**

| File | Content | Applied to prod? | Evidence |
|---|---|---|---|
| `drizzle/0009_curly_rumiko_fujikawa.sql` | `CREATE TABLE "job_photos" (...)` | **NO** | `job_photos` absent in prod |
| `drizzle/0010_uploadthing.sql` | `ALTER TABLE "job_photos" ...` | **NO** | depends on 0009 |

**Why not applied:** Migrations in this project are applied manually. The team shipped PR #25 (UploadThing code) without applying the corresponding DB migrations to production.

**Drizzle tracking table state (production):**
```
drizzle.__drizzle_migrations: 7 rows (IDs 1-7, covering migrations 0000-0006 only)
```
Migrations 0007-0010 are all absent from the tracking table. Some were applied manually without updating the tracking table (confirmed: 0008's `DROP COLUMN dispatch_sent_at` ran, column is absent).

---

## 4. The Exact SQL

**migration 0009** — `drizzle/0009_curly_rumiko_fujikawa.sql` (verbatim):
```sql
CREATE TABLE "job_photos" (
  "id" serial PRIMARY KEY NOT NULL,
  "org_id" text DEFAULT 'APT-CA' NOT NULL,
  "job_id" integer NOT NULL,
  "employee_id" integer NOT NULL,
  "photo_type" text NOT NULL,
  "file_name" text NOT NULL,
  "photo_data" text NOT NULL,
  "created_at" timestamp DEFAULT now()
);
```

**migration 0010** — `drizzle/0010_uploadthing.sql` (verbatim):
```sql
ALTER TABLE "job_photos" ALTER COLUMN "job_id" SET DATA TYPE text;
ALTER TABLE "job_photos" RENAME COLUMN "photo_data" TO "photo_url";
```

**Net result after both run (what production schema will look like):**
```sql
CREATE TABLE "job_photos" (
  "id"           serial PRIMARY KEY NOT NULL,
  "org_id"       text    NOT NULL DEFAULT 'APT-CA',
  "job_id"       text    NOT NULL,          -- integer in 0009, changed to text by 0010
  "employee_id"  integer NOT NULL,
  "photo_type"   text    NOT NULL,
  "file_name"    text    NOT NULL,
  "photo_url"    text    NOT NULL,          -- was "photo_data" in 0009, renamed by 0010
  "created_at"   timestamp DEFAULT now()
);
```

---

## 5. Schema Alignment Verification

Three sources must agree: SQL migrations, Drizzle ORM schema, application code.

**Drizzle ORM schema** (`tech-pwa/src/lib/schema.ts:175-184`, verbatim):
```typescript
export const jobPhotos = pgTable('job_photos', {
  id: serial('id').primaryKey(),
  orgId: text('org_id').notNull().default('APT-CA'),
  jobId: text('job_id').notNull(),          // text — matches post-0010 state
  employeeId: integer('employee_id').notNull(),
  photoType: text('photo_type').notNull(),
  fileName: text('file_name').notNull(),
  photoUrl: text('photo_url').notNull(),    // photo_url — matches post-0010 state
  createdAt: timestamp('created_at').defaultNow(),
});
```

**Application code** (`tech-pwa/src/app/api/uploadthing/core.ts:30-37`, verbatim):
```typescript
await db.insert(jobPhotos).values({
  orgId: 'APT-CA',
  jobId: metadata.jobId,       // string — comes from z.object({ jobId: z.string() })
  employeeId: metadata.employeeId,  // number — from verifyFieldSession()
  photoType: metadata.photoType,    // string
  fileName: file.name,              // string
  photoUrl: file.url,               // string — uses photoUrl (post-0010 column name)
});
```

**Alignment check:**

| Column | 0009 SQL | 0010 SQL | schema.ts | core.ts | Aligned? |
|---|---|---|---|---|---|
| id | serial PK | — | serial PK | (not set — auto) | YES |
| org_id | text DEFAULT 'APT-CA' | — | text default 'APT-CA' | `orgId: 'APT-CA'` | YES |
| job_id | integer NOT NULL | → text NOT NULL | text NOT NULL | `jobId: string` | YES (requires both 0009+0010) |
| employee_id | integer NOT NULL | — | integer NOT NULL | `employeeId: number` | YES |
| photo_type | text NOT NULL | — | text NOT NULL | `photoType: string` | YES |
| file_name | text NOT NULL | — | text NOT NULL | `fileName: string` | YES |
| photo_data / photo_url | text NOT NULL | → renamed photo_url | photo_url NOT NULL | `photoUrl: url` | YES (requires 0010) |
| created_at | timestamp DEFAULT now() | — | timestamp defaultNow() | (not set — auto) | YES |

**Conclusion:** schema.ts and core.ts reflect the POST-0010 state. Both migrations must be applied. Applying only 0009 would leave a type mismatch (`job_id integer` vs code expecting `text`).

---

## 6. Notable Omissions in the Schema

**Reviewers: evaluate whether these are acceptable or must be addressed before migration.**

1. **No foreign key from `job_photos.job_id` to `jobs`**: `job_id` is a text natural key that references `jobs.job_id` (also text), but no FK constraint is defined. No referential integrity enforcement in DB. A photo can be inserted for a non-existent job. Intentional or oversight?

2. **No index on `job_id`**: Queries filtering photos by job will do full table scans. Not a concern now (table is new, zero rows), but worth noting.

3. **`org_id` hardcoded to `'APT-CA'`**: Single-tenant hardcode. Matches the pattern used throughout this codebase. Not a defect for current scope.

4. **No FK from `employee_id` to `employees.id`**: Same pattern as above — no referential integrity.

---

## 7. Proposed Execution Plan

**Executor:** AG (backend agent) via Neon MCP SQL tool or Neon dashboard SQL editor.
**Approver:** Brandon (owner) — must approve Task Card before execution.
**No code changes.** SQL only.

### Pre-flight checks (run first, verify before proceeding)

```sql
-- 1. Confirm job_photos does not exist (should return 0 rows)
SELECT COUNT(*) FROM information_schema.tables
WHERE table_schema = 'public' AND table_name = 'job_photos';

-- 2. Confirm drizzle tracking state (should show max id=7)
SELECT id, hash, created_at FROM drizzle.__drizzle_migrations ORDER BY id;

-- 3. Confirm no active writes in flight (informational only)
SELECT COUNT(*) FROM pg_stat_activity WHERE state = 'active';
```

**Stop if:** job_photos already exists (do not run 0009). Investigate first.

### Execution (single transaction)

```sql
BEGIN;

-- Migration 0009: create table
CREATE TABLE "job_photos" (
  "id"           serial PRIMARY KEY NOT NULL,
  "org_id"       text DEFAULT 'APT-CA' NOT NULL,
  "job_id"       integer NOT NULL,
  "employee_id"  integer NOT NULL,
  "photo_type"   text NOT NULL,
  "file_name"    text NOT NULL,
  "photo_data"   text NOT NULL,
  "created_at"   timestamp DEFAULT now()
);

-- Migration 0010: align with Drizzle schema and application code
ALTER TABLE "job_photos" ALTER COLUMN "job_id" SET DATA TYPE text;
ALTER TABLE "job_photos" RENAME COLUMN "photo_data" TO "photo_url";

-- Update drizzle tracking (using journal timestamps from _journal.json as created_at)
-- NOTE: hash values are placeholders — see open question #1 below
INSERT INTO drizzle.__drizzle_migrations (hash, created_at) VALUES
  ('0009_curly_rumiko_fujikawa', 1782442057037),
  ('0010_uploadthing',           1782614334253);

COMMIT;
```

**If any statement fails:** ROLLBACK fires automatically. No partial state.

### Post-execution verification

```sql
-- 1. Table exists with correct structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'job_photos'
ORDER BY ordinal_position;

-- Expected: id(serial/int4), org_id(text, default APT-CA), job_id(text), 
--           employee_id(int4), photo_type(text), file_name(text),
--           photo_url(text), created_at(timestamp)

-- 2. Drizzle tracking updated
SELECT id, hash FROM drizzle.__drizzle_migrations ORDER BY id;
-- Expected: 9 rows (ids 1-9), last two matching the inserts above

-- 3. Test insert (rollback immediately)
BEGIN;
INSERT INTO job_photos (job_id, employee_id, photo_type, file_name, photo_url)
VALUES ('TEST-001', 1, 'receipt', 'test.jpg', 'https://example.com/test.jpg');
SELECT * FROM job_photos WHERE job_id = 'TEST-001';
ROLLBACK;
-- Expected: 1 row visible inside transaction, 0 rows after rollback
```

---

## 8. Rollback Plan

**If the migration succeeds but the feature still breaks:**
- No data exists in `job_photos` yet (table is new, zero rows guaranteed)
- Safe to drop:
```sql
DROP TABLE IF EXISTS "job_photos";
DELETE FROM drizzle.__drizzle_migrations WHERE hash IN ('0009_curly_rumiko_fujikawa', '0010_uploadthing');
```
- Table can be recreated cleanly on retry

**If the migration transaction fails:**
- ROLLBACK fires automatically (wrapped in BEGIN/COMMIT)
- No partial state possible
- Re-run from scratch

**Rollback does not require a Vercel deployment.** Code referencing `job_photos` already exists in production — if table is dropped, the error state returns to where it was before.

---

## 9. Success Criteria (Karpathy-style — verifiable, not prose)

| Criterion | How to Verify | Pass Condition |
|---|---|---|
| Table exists with correct schema | `\d job_photos` in psql or information_schema query | 8 columns, types match schema.ts |
| job_id is text (not integer) | `SELECT data_type FROM information_schema.columns WHERE table_name='job_photos' AND column_name='job_id'` | `text` |
| photo_url column exists (not photo_data) | Same query, column_name='photo_url' | Returns 1 row |
| Drizzle tracking updated | Count rows in `drizzle.__drizzle_migrations` | 9 rows (was 7) |
| No rows lost (new table, zero rows expected) | `SELECT COUNT(*) FROM job_photos` | 0 |
| Test insert succeeds | BEGIN → INSERT → SELECT → ROLLBACK | SELECT returns 1 row inside transaction |
| UploadThing functional in browser | Field tech uploads photo on a test job | Photo appears, no Sentry error, URL stored in job_photos |

---

## 10. Open Questions for Reviewers

**Q1 — Drizzle hash correctness:**
The `hash` column in `drizzle.__drizzle_migrations` is a SHA-256 of the migration file content. The `apply-0007-prod.sql` precedent used the migration tag string as hash (e.g., `'curly_kree'`), not the real SHA-256. This worked because drizzle-kit reads the hash to detect tampering/drift. Using the tag name as hash is not correct and could cause `drizzle-kit generate` to mismatch on future runs.

**Should we compute the real SHA-256 hashes and use those?** Command to compute:
```bash
# On the repo machine:
sha256sum tech-pwa/drizzle/0009_curly_rumiko_fujikawa.sql
sha256sum tech-pwa/drizzle/0010_uploadthing.sql
```
Or skip tracking entirely (don't INSERT into `__drizzle_migrations`) since migrations are always applied manually anyway. Risk: `drizzle-kit migrate` will attempt to re-apply them if ever run.

**Q2 — Single transaction risk on Neon serverless:**
Neon's serverless HTTP driver supports transactions, but long-running transactions can be killed by the 10-second function timeout on Vercel. This migration runs against Neon directly via the Neon dashboard SQL editor (not through the Next.js app), so the function timeout does not apply. Confirm: is the proposed BEGIN/COMMIT approach safe when executed via Neon dashboard or psql, not via the app?

**Q3 — Missing FK constraints:**
`job_photos.job_id` (text) references `jobs.job_id` (text) by convention but not by DB constraint. `job_photos.employee_id` (integer) references `employees.id` (integer) by convention but not by DB constraint. Should FKs be added in a follow-up migration, or is the no-FK pattern intentional for this system (matches all other tables in the schema)?

**Q4 — No index on job_id:**
Should migration 0009 include `CREATE INDEX idx_job_photos_job_id ON job_photos (job_id);`? Photo lookup by job is the only read pattern. Table will be small (low-volume photo uploads), so this is low priority but worth deciding now before data exists.

**Q5 — Zero test coverage:**
Codegraph confirms `jobPhotos` has no covering tests (only callers: `scripts/count.ts` and `uploadthing/core.ts`). Pocock TDD standard requires RED → GREEN. Proposed RED test: query production for `SELECT COUNT(*) FROM job_photos` → fails with `relation does not exist`. That IS the RED state (production error, confirmed). GREEN: migration applied, same query returns 0 rows (table exists, empty). Is this sufficient TDD evidence for a schema migration, or is a unit/integration test for `onUploadComplete` required before closing the gate?

**Q6 — `workflow_events` table also missing:**
Migration 0007 (`workflow_events` CREATE TABLE) was also never applied to the current Neon project. Is `workflow_events` used by active production code paths? If yes, this is a second broken feature. Should TC-MIGRATE-009-010 also apply 0007, or remain scoped to the UploadThing fix only?

---

## 11. What Is NOT In Scope

- No application code changes
- No Vercel environment variable changes
- No changes to drizzle schema files
- No changes to other tables
- Migration 0007 (`workflow_events`) — separate decision (see Q6)
- Migration 0008 (`dispatch_sent_at` DROP) — already applied manually; skip

---

## 12. Assumptions (stated explicitly per Karpathy standard)

1. `job_photos` does not exist in production at time of execution. (Confirmed 2026-06-29 by query.)
2. No rows in `job_photos` can exist (table doesn't exist).
3. Neon dashboard SQL editor supports multi-statement transactions with BEGIN/COMMIT.
4. The `drizzle.__drizzle_migrations` table schema accepts TEXT for the `hash` column (current rows confirm this).
5. No other migration (0009 or 0010) was applied manually and bypassed tracking. (Confirmed: `job_photos` absent proves 0009 never ran.)
6. The `verifyFieldSession()` function returns `{ employeeId: number }` — the integer type matches `employee_id integer NOT NULL`. (Confirmed from `employees` table column type.)
7. Executing via Neon dashboard SQL editor is not subject to Vercel's serverless timeout.
8. Feature freeze exception applies: this is an emergency fix for shipped-but-broken code, not a new feature.

---

## 13. Drizzle Migration Journal Reference

For reviewers who want to verify hash computation approach:

`tech-pwa/drizzle/meta/_journal.json` entries for 0009 and 0010:
```json
{
  "idx": 9,
  "version": "7",
  "when": 1782442057037,
  "tag": "0009_curly_rumiko_fujikawa",
  "breakpoints": true
},
{
  "idx": 10,
  "version": "7",
  "when": 1782614334253,
  "tag": "0010_uploadthing",
  "breakpoints": true
}
```

The `when` timestamps are what will be inserted as `created_at` in the tracking table.
