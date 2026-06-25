# Node Description Batch 33 of 49

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

- "lib_types_timeoffrequest": "TimeOffRequest" | kind=code-symbol | source=tech-pwa/src/lib/types.ts:L77 | neighbors=[page.tsx, types.ts]
- "live_page_formatdispatchdatelabel": "formatDispatchDateLabel()" | kind=code-symbol | source=tech-pwa/src/app/live/page.tsx:L35 | neighbors=[page.tsx, LivePage()]
- "live_page_getadjacentisodate": "getAdjacentIsoDate()" | kind=code-symbol | source=tech-pwa/src/app/live/page.tsx:L29 | neighbors=[page.tsx, page.test.ts]
- "live_page_gettodayisodate": "getTodayIsoDate()" | kind=code-symbol | source=tech-pwa/src/app/live/page.tsx:L25 | neighbors=[page.tsx, page.test.ts]
- "live_page_livepage": "LivePage()" | kind=code-symbol | source=tech-pwa/src/app/live/page.tsx:L64 | neighbors=[page.tsx, formatDispatchDateLabel()]
- "login_route_generatesessiontoken": "generateSessionToken()" | kind=code-symbol | source=tech-pwa/src/app/api/field/auth/login/route.ts:L15 | neighbors=[route.ts, POST()]
- "login_route_hashpin": "hashPin()" | kind=code-symbol | source=tech-pwa/src/app/api/field/auth/login/route.ts:L11 | neighbors=[route.ts, POST()]
- "login_route_hashtoken": "hashToken()" | kind=code-symbol | source=tech-pwa/src/app/api/field/auth/login/route.ts:L19 | neighbors=[route.ts, POST()]
- "n8n_export_api_get": "api_get()" | kind=code-symbol | source=tools/n8n/export.py:L43 | neighbors=[export.py, main()]
- "n8n_export_slugify": "slugify()" | kind=code-symbol | source=tools/n8n/export.py:L36 | neighbors=[export.py, main()]
- "n8n_import_api_post": "api_post()" | kind=code-symbol | source=tools/n8n/import.py:L29 | neighbors=[import.py, main()]
- "n8n_import_main": "main()" | kind=code-symbol | source=tools/n8n/import.py:L54 | neighbors=[import.py, api_post()]
- "nextauth_route": "route.ts" | kind=code-symbol | source=tech-pwa/src/app/api/auth/[...nextauth]/route.ts:L1 | neighbors=[01bf641 Initial commit — clean history, auth.ts]
- "parse_route_extractfield": "extractField()" | kind=code-symbol | source=tech-pwa/src/app/api/parse/route.ts:L110 | neighbors=[route.ts, POST()]
- "parse_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/parse/route.ts:L9 | neighbors=[route.ts, extractField()]
- "scripts_db_fix_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/db-fix.ts:L9 | neighbors=[db-fix.ts, sql]
- "scripts_db_fix_sql": "sql" | kind=code-symbol | source=tech-pwa/scripts/db-fix.ts:L6 | neighbors=[db-fix.ts, main()]
- "scripts_extract_legacy_data_fetch_data": "fetch_data()" | kind=code-symbol | source=scripts/extract_legacy_data.py:L19 | neighbors=[extract_legacy_data.py, main()]
- "scripts_extract_legacy_data_main": "main()" | kind=code-symbol | source=scripts/extract_legacy_data.py:L32 | neighbors=[extract_legacy_data.py, fetch_data()]
- "scripts_fix_tech_roster_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/fix-tech-roster.ts:L35 | neighbors=[fix-tech-roster.ts, normalizeName()]
- "scripts_fix_tech_roster_normalizename": "normalizeName()" | kind=code-symbol | source=tech-pwa/scripts/fix-tech-roster.ts:L8 | neighbors=[fix-tech-roster.ts, main()]
- "scripts_import_real_roster_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/import-real-roster.ts:L25 | neighbors=[import-real-roster.ts, normalizeName()]
- "scripts_import_real_roster_normalizename": "normalizeName()" | kind=code-symbol | source=tech-pwa/scripts/import-real-roster.ts:L10 | neighbors=[import-real-roster.ts, main()]
- "scripts_migrate_dispatch_queue_normalizeaddresskey": "normalizeAddressKey()" | kind=code-symbol | source=tech-pwa/scripts/migrate-dispatch-queue.ts:L9 | neighbors=[migrate-dispatch-queue.ts, run()]
- "scripts_migrate_dispatch_queue_run": "run()" | kind=code-symbol | source=tech-pwa/scripts/migrate-dispatch-queue.ts:L24 | neighbors=[migrate-dispatch-queue.ts, normalizeAddressKey()]
- "scripts_migrate_master_directory_normalizeaddresskey": "normalizeAddressKey()" | kind=code-symbol | source=tech-pwa/scripts/migrate-master-directory.ts:L9 | neighbors=[migrate-master-directory.ts, run()]
- "scripts_migrate_master_directory_run": "run()" | kind=code-symbol | source=tech-pwa/scripts/migrate-master-directory.ts:L24 | neighbors=[migrate-master-directory.ts, normalizeAddressKey()]
- "scripts_seed_pick": "pick()" | kind=code-symbol | source=tech-pwa/scripts/seed.ts:L47 | neighbors=[seed.ts, seed()]
- "scripts_seed_sql": "sql" | kind=code-symbol | source=tech-pwa/scripts/seed.ts:L15 | neighbors=[seed.ts, seed()]
- "scripts_verify_schema": "verify-schema.ts" | kind=code-symbol | source=tech-pwa/scripts/verify-schema.ts:L1 | neighbors=[01bf641 Initial commit — clean history, d7eb645 feat(p3-1): schema foundation —…]
- "send_route": "route.ts" | kind=code-symbol | source=tech-pwa/src/app/api/push/send/route.ts:L1 | neighbors=[01bf641 Initial commit — clean history, POST()]
- "sentinel_health_index_pingdashboard": "pingDashboard()" | kind=code-symbol | source=railway/sentinel-health/index.js:L32 | neighbors=[index.js, raiseAlert()]
- "sentinel_health_index_raisealert": "raiseAlert()" | kind=code-symbol | source=railway/sentinel-health/index.js:L58 | neighbors=[index.js, pingDashboard()]
- "sentinel_spec_architect_index_fetchclaudemd": "fetchClaudeMd()" | kind=code-symbol | source=railway/sentinel-spec-architect/index.js:L64 | neighbors=[index.js, ghGet()]
- "sentinel_spec_architect_index_ghpost": "ghPost()" | kind=code-symbol | source=railway/sentinel-spec-architect/index.js:L44 | neighbors=[index.js, createPR()]
- "sentinel_spec_architect_index_ghput": "ghPut()" | kind=code-symbol | source=railway/sentinel-spec-architect/index.js:L53 | neighbors=[index.js, createPR()]
- "sentinel_spec_architect_index_listexistingspecs": "listExistingSpecs()" | kind=code-symbol | source=railway/sentinel-spec-architect/index.js:L70 | neighbors=[index.js, ghGet()]
- "sentinel_stale_job_index_apirequest": "apiRequest()" | kind=code-symbol | source=railway/sentinel-stale-job/index.js:L33 | neighbors=[index.js, runStaleJobScan()]
- "sentinel_stale_job_index_raisegithubissue": "raiseGitHubIssue()" | kind=code-symbol | source=railway/sentinel-stale-job/index.js:L97 | neighbors=[index.js, runStaleJobScan()]
- "sentinel_time_anomaly_index_apirequest": "apiRequest()" | kind=code-symbol | source=railway/sentinel-time-anomaly/index.js:L28 | neighbors=[index.js, runAudit()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-032.json

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
