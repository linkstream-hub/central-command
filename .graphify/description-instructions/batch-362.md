# Node Description Batch 363 of 412

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
For an entity node (any other kind — e.g. a person, place, event, object),
describe what the entity is and its role, grounded in its type, its
relations (neighbors) and the provided citations/evidence — e.g.
"Lady Carfax, a wealthy heiress who disappears en route to Lausanne.".
Ground entity descriptions in the citations/evidence when present; do not
speculate beyond the context, so a node with no supporting context may be
left out of the reply.
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "scripts_list_employees_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/list-employees.ts:L7 | neighbors=[list-employees.ts]
- "scripts_migrate_from_csv_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/migrate-from-csv.ts:L9 | neighbors=[migrate-from-csv.ts]
- "scripts_migrate_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/migrate.ts:L8 | neighbors=[migrate.ts]
- "scripts_migrate_new_contacts_run": "run()" | kind=code-symbol | source=tech-pwa/scripts/migrate-new-contacts.ts:L9 | neighbors=[migrate-new-contacts.ts]
- "scripts_migrate_time_records_run": "run()" | kind=code-symbol | source=tech-pwa/scripts/migrate-time-records.ts:L7 | neighbors=[migrate-time-records.ts]
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
- "scripts_seed_priorities": "PRIORITIES" | kind=code-symbol | source=tech-pwa/scripts/seed.ts:L23 | neighbors=[seed.ts]
- "scripts_seed_rm_names": "RM_NAMES" | kind=code-symbol | source=tech-pwa/scripts/seed.ts:L33 | neighbors=[seed.ts]
- "scripts_seed_statuses": "STATUSES" | kind=code-symbol | source=tech-pwa/scripts/seed.ts:L18 | neighbors=[seed.ts]
- "scripts_seed_techs": "TECHS" | kind=code-symbol | source=tech-pwa/scripts/seed.ts:L34 | neighbors=[seed.ts]
- "scripts_test_gemini_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/test-gemini.ts:L6 | neighbors=[test-gemini.ts]
- "scripts_test_sheets_fetchsheet": "fetchSheet()" | kind=code-symbol | source=tech-pwa/scripts/test-sheets.js:L2 | neighbors=[test-sheets.js]
- "scripts_test_sprint_hashpin": "hashPin()" | kind=code-symbol | source=tech-pwa/scripts/test-sprint.ts:L10 | neighbors=[test-sprint.ts]
- "scripts_test_sprint_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/test-sprint.ts:L14 | neighbors=[test-sprint.ts]
- "scripts_test_sprint_request": "{ request }" | kind=code-symbol | source=tech-pwa/scripts/test-sprint.ts:L6 | neighbors=[test-sprint.ts]
- "scripts_test_webhook_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/test-webhook.ts:L4 | neighbors=[test-webhook.ts]
- "scripts_verify_hash_parity_nodehash": "nodeHash" | kind=code-symbol | source=scripts/verify-hash-parity.mjs:L3 | neighbors=[verify-hash-parity.mjs]
- "scripts_wipe_and_remigrate_run": "run()" | kind=code-symbol | source=tech-pwa/scripts/wipe-and-remigrate.ts:L8 | neighbors=[wipe-and-remigrate.ts]
- "send_role_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/push/send-role/route.ts:L25 | neighbors=[route.ts]
- "send_role_route_sendroleschema": "SendRoleSchema" | kind=code-symbol | source=tech-pwa/src/app/api/push/send-role/route.ts:L17 | neighbors=[route.ts]
- "send_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/push/send/route.ts:L17 | neighbors=[route.ts]
- "sentinel_spec_architect_index_anthropic": "anthropic" | kind=code-symbol | source=railway/sentinel-spec-architect/index.js:L25 | neighbors=[index.js]
- "sentinel_spec_architect_index_generatespec": "generateSpec()" | kind=code-symbol | source=railway/sentinel-spec-architect/index.js:L79 | neighbors=[index.js]
- "sentinel_spec_architect_index_server": "server" | kind=code-symbol | source=railway/sentinel-spec-architect/index.js:L152 | neighbors=[index.js]
- "sentinel_stale_job_index_thresholds_ms": "THRESHOLDS_MS" | kind=code-symbol | source=railway/sentinel-stale-job/index.js:L27 | neighbors=[index.js]
- "sentinel_time_anomaly_index_anthropic": "anthropic" | kind=code-symbol | source=railway/sentinel-time-anomaly/index.js:L26 | neighbors=[index.js]
- "sentinel_wc_scanner_index_anthropic": "anthropic" | kind=code-symbol | source=railway/sentinel-wc-scanner/index.js:L26 | neighbors=[index.js]
- "sentinels_worker_allowed_origins": "ALLOWED_ORIGINS" | kind=code-symbol | source=Sentinels/worker.js:L4 | neighbors=[worker.js]
- "services_event_bus_buserror": "BusError" | kind=code-symbol | source=tech-pwa/src/lib/services/event-bus.ts:L18 | neighbors=[event-bus.ts]
- "session_state_env_refs_local_env_local_gitignored_never_commit": "ENV REFS (local .env.local — gitignored, never commit)" | kind=entity | source=SESSION_STATE.md:L126 | neighbors=[Overwrite completely at session close. …]
- "session_state_gas_state": "GAS STATE" | kind=entity | source=SESSION_STATE.md:L107 | neighbors=[Overwrite completely at session close. …]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-362.json

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
