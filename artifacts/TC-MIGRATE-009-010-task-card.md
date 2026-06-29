---
id: TC-MIGRATE-009-010
status: DONE — 2026-06-29 (CC via Neon MCP)
priority: P1 — CRITICAL (UploadThing broken in production)
executor: CC (Neon MCP run_sql_transaction)
branch: n/a — schema-only, no code changes
freeze_override: YES — emergency schema fix for shipped PR #25
created: 2026-06-29
---

# TC-MIGRATE-009-010: Apply job_photos migrations to production

## Problem

Migrations 0009 and 0010 never applied to current Neon project `purple-dust-72858226`.
UploadThing (PR #25, LIVE) calls `db.insert(jobPhotos)` in `core.ts:onUploadComplete`.
`job_photos` table does not exist → every photo upload fails at DB insert.
Confirmed by direct Neon query 2026-06-29. Logged P1-009 in KNOWN_ISSUES.md.

## Scope

Schema-only. No application code changes. Migrations 0009 + 0010 only.

## Evidence (confirmed — not assumed)

```yaml
production_project: purple-dust-72858226
table_absent: job_photos (SELECT COUNT(*) → relation does not exist)
drizzle_tracking_rows: 7 (hashes 0000-0006 only)
uploadthing_code: tech-pwa/src/app/api/uploadthing/core.ts — LIVE, PR #25 merged
migration_files:
  0009: tech-pwa/drizzle/0009_curly_rumiko_fujikawa.sql
  0010: tech-pwa/drizzle/0010_uploadthing.sql
```

## SHA-256 hashes (computed 2026-06-29 on repo machine)

```
0009: 8221d1198d76e6c7702eb4054a6edf19c4a876661ba9d4bc654940201f7fac4e
0010: b89faaddd562dc889392f6f42e71d2ee4938484278210056288b4d3cf84dd666
```

## 4-way external review consensus

| Question | Verdict | Unanimous |
|---|---|---|
| Use real SHA-256 hashes | YES | 4/4 |
| BEGIN/COMMIT via Neon dashboard safe | YES | 4/4 |
| FK constraints in this migration | NO — defer | 4/4 |
| Add index on job_id | YES | 3/4 (DeepSeek dissented) |
| Production RED/GREEN sufficient TDD | YES | 4/4 |
| Exclude migration 0007 | YES | 4/4 |

Lead dev verdict on index: DeepSeek "write overhead" concern inapplicable on empty table (~1ms). Adding now avoids future `CONCURRENTLY` migration on live data. Grok's `CONCURRENTLY` suggestion unnecessary on empty table — regular `CREATE INDEX` correct.

## Execution SQL

**Execute via Neon MCP `run_sql_transaction` only. Do NOT run through Next.js app.**

```sql
BEGIN;

-- Migration 0009: create job_photos table
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

-- Migration 0010: align with schema.ts and core.ts
ALTER TABLE "job_photos" ALTER COLUMN "job_id" SET DATA TYPE text;
ALTER TABLE "job_photos" RENAME COLUMN "photo_data" TO "photo_url";

-- Index: only read pattern is lookup by job_id; add while table is empty (zero cost)
CREATE INDEX idx_job_photos_job_id ON job_photos (job_id);

-- Drizzle tracking: real SHA-256 hashes
INSERT INTO drizzle.__drizzle_migrations (hash, created_at) VALUES
  ('8221d1198d76e6c7702eb4054a6edf19c4a876661ba9d4bc654940201f7fac4e', 1782442057037),
  ('b89faaddd562dc889392f6f42e71d2ee4938484278210056288b4d3cf84dd666', 1782614334253);

COMMIT;
```

## Rollback

Table is empty at creation (zero UploadThing rows exist — UploadThing has been broken since PR #25 merged). Safe to drop.

```sql
DROP TABLE IF EXISTS "job_photos";
DELETE FROM drizzle.__drizzle_migrations
  WHERE hash IN (
    '8221d1198d76e6c7702eb4054a6edf19c4a876661ba9d4bc654940201f7fac4e',
    'b89faaddd562dc889392f6f42e71d2ee4938484278210056288b4d3cf84dd666'
  );
```

## Success criteria (verifiable)

| Check | Query | Pass |
|---|---|---|
| Table exists | `SELECT to_regclass('public.job_photos')` | returns `job_photos` |
| Columns correct | `SELECT column_name, data_type FROM information_schema.columns WHERE table_name='job_photos'` | job_id=text, photo_url=text, no photo_data |
| Index exists | `SELECT indexname FROM pg_indexes WHERE tablename='job_photos'` | idx_job_photos_job_id present |
| Drizzle tracking | `SELECT hash FROM drizzle.__drizzle_migrations ORDER BY created_at` | 9 rows total (0000-0009, 0010) |
| Test insert/select | `BEGIN; INSERT INTO job_photos(org_id,job_id,employee_id,photo_type,file_name,photo_url) VALUES('APT-CA','test-job-1',1,'before','test.jpg','https://example.com'); SELECT * FROM job_photos; ROLLBACK;` | row returned, no error |

## Assumptions

- `drizzle.__drizzle_migrations.created_at` is epoch milliseconds (matches 0000-0006 pattern)
- Neon project `purple-dust-72858226` is current production target
- No UploadThing data exists yet (table was absent — confirmed)
