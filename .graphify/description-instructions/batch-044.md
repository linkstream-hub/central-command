# Node Description Batch 45 of 49

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
For a code symbol (kind=code-symbol — a function, class, or constant),
describe what the function/symbol does based on its name, source location
and neighbors — e.g. "Resolves the configured ontology profile from graphify.yaml.".
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "login_page_loginpage": "LoginPage()" | kind=code-symbol | source=tech-pwa/src/app/login/page.tsx:L17 | neighbors=[page.tsx]
- "migrate_techs_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/migrate-techs/route.ts:L15 | neighbors=[route.ts]
- "migrate_techs_route_initial_techs": "INITIAL_TECHS" | kind=code-symbol | source=tech-pwa/src/app/api/migrate-techs/route.ts:L8 | neighbors=[route.ts]
- "notifications_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/notifications/route.ts:L8 | neighbors=[route.ts]
- "parse_route_genai": "genAI" | kind=code-symbol | source=tech-pwa/src/app/api/parse/route.ts:L7 | neighbors=[route.ts]
- "properties_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/properties/route.ts:L6 | neighbors=[route.ts]
- "public_sw": "sw.js" | kind=code-symbol | source=tech-pwa/public/sw.js:L1 | neighbors=[01bf641 Initial commit — clean history]
- "sandbox_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/sandbox/route.ts:L4 | neighbors=[route.ts]
- "schema_ts": "Database Schema" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts | neighbors=[Comms Route]
- "script_seed_test_data": "seed-test-data.ts" | kind=code-symbol | source=tech-pwa/scripts/seed-test-data.ts | neighbors=[SPRINT_GO_LIVE_VALIDATION.md]
- "scripts_analyze_wos_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/analyze-wos.ts:L8 | neighbors=[analyze-wos.ts]
- "scripts_audit_authors_audit": "audit()" | kind=code-symbol | source=tech-pwa/scripts/audit-authors.ts:L9 | neighbors=[audit-authors.ts]
- "scripts_audit_dev_artifacts_audit": "audit()" | kind=code-symbol | source=tech-pwa/scripts/audit-dev-artifacts.ts:L11 | neighbors=[audit-dev-artifacts.ts]
- "scripts_backfill_gmail_threads_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/backfill-gmail-threads.ts:L6 | neighbors=[backfill-gmail-threads.ts]
- "scripts_check_job_client": "{ Client }" | kind=code-symbol | source=tech-pwa/scripts/check-job.js:L1 | neighbors=[check-job.js]
- "scripts_check_latest_jobs_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/check-latest-jobs.ts:L7 | neighbors=[check-latest-jobs.ts]
- "scripts_check_neon_counts_checkcounts": "checkCounts()" | kind=code-symbol | source=tech-pwa/scripts/check-neon-counts.mjs:L3 | neighbors=[check-neon-counts.mjs]
- "scripts_check_neon_statuses_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/check-neon-statuses.ts:L5 | neighbors=[check-neon-statuses.ts]
- "scripts_check_neon_wos_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/check-neon-wos.ts:L5 | neighbors=[check-neon-wos.ts]
- "scripts_cleanup_test_data_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/cleanup-test-data.ts:L8 | neighbors=[cleanup-test-data.ts]
- "scripts_db_fix_db": "db" | kind=code-symbol | source=tech-pwa/scripts/db-fix.ts:L7 | neighbors=[db-fix.ts]
- "scripts_db_repair_journal_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/db-repair-journal.ts:L9 | neighbors=[db-repair-journal.ts]
- "scripts_fix_archived_wos_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/fix-archived-wos.ts:L5 | neighbors=[fix-archived-wos.ts]
- "scripts_inspect_jane_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/inspect-jane.ts:L5 | neighbors=[inspect-jane.ts]
- "scripts_list_employees_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/list-employees.ts:L7 | neighbors=[list-employees.ts]
- "scripts_migrate_from_csv_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/migrate-from-csv.ts:L9 | neighbors=[migrate-from-csv.ts]
- "scripts_migrate_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/migrate.ts:L8 | neighbors=[migrate.ts]
- "scripts_migrate_new_contacts_run": "run()" | kind=code-symbol | source=tech-pwa/scripts/migrate-new-contacts.ts:L9 | neighbors=[migrate-new-contacts.ts]
- "scripts_migrate_time_records_run": "run()" | kind=code-symbol | source=tech-pwa/scripts/migrate-time-records.ts:L7 | neighbors=[migrate-time-records.ts]
- "scripts_query_neon_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/query-neon.ts:L5 | neighbors=[query-neon.ts]
- "scripts_reparse_lapham_run": "run()" | kind=code-symbol | source=tech-pwa/scripts/reparse-lapham.ts:L7 | neighbors=[reparse-lapham.ts]
- "scripts_run_migration_migration": "MIGRATION" | kind=code-symbol | source=tech-pwa/scripts/run-migration.ts:L8 | neighbors=[run-migration.ts]
- "scripts_run_migration_run": "run()" | kind=code-symbol | source=tech-pwa/scripts/run-migration.ts:L10 | neighbors=[run-migration.ts]
- "scripts_sanitize_dev_artifacts_sanitize": "sanitize()" | kind=code-symbol | source=tech-pwa/scripts/sanitize-dev-artifacts.ts:L11 | neighbors=[sanitize-dev-artifacts.ts]
- "scripts_seed_addresses": "ADDRESSES" | kind=code-symbol | source=tech-pwa/scripts/seed.ts:L27 | neighbors=[seed.ts]
- "scripts_seed_categories": "CATEGORIES" | kind=code-symbol | source=tech-pwa/scripts/seed.ts:L25 | neighbors=[seed.ts]
- "scripts_seed_db": "db" | kind=code-symbol | source=tech-pwa/scripts/seed.ts:L16 | neighbors=[seed.ts]
- "scripts_seed_distribution": "DISTRIBUTION" | kind=code-symbol | source=tech-pwa/scripts/seed.ts:L36 | neighbors=[seed.ts]
- "scripts_seed_email_types": "EMAIL_TYPES" | kind=code-symbol | source=tech-pwa/scripts/seed.ts:L24 | neighbors=[seed.ts]
- "scripts_seed_orgs_run": "run()" | kind=code-symbol | source=tech-pwa/scripts/seed-orgs.ts:L5 | neighbors=[seed-orgs.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-044.json

Keep each description factual and concise (one sentence). No markdown, no prose
outside the JSON object. It is acceptable to omit a node if context is
insufficient — but include every node you can ground confidently.

Example answer format:
```json
{
  "node_id_1": "Resolves the configured ontology profile from graphify.yaml.",
  "node_id_2": "Colonel James Barclay, an antagonist in The Crooked Man."
}
```
