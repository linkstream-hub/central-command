# Node Description Batch 383 of 412

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

- "tech_pwa_block_11_tech_p_f9eae_testation_redirects_to_jobs_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-f9eae-testation-redirects-to-jobs-mobile/error-context.md:L1 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_f9eae_testation_redirects_to_jobs_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-f9eae-testation-redirects-to-jobs-mobile/error-context.md:L7 | neighbors=[error-context.md]
- "tech_pwa_check_dupes_neon": "{ neon }" | kind=code-symbol | source=tech-pwa/check-dupes.js:L2 | neighbors=[check-dupes.js]
- "tech_pwa_check_dupes_sql": "sql" | kind=code-symbol | source=tech-pwa/check-dupes.js:L3 | neighbors=[check-dupes.js]
- "tech_pwa_check_jobs_neon": "{ neon }" | kind=code-symbol | source=tech-pwa/check-jobs.js:L2 | neighbors=[check-jobs.js]
- "tech_pwa_check_jobs_sql": "sql" | kind=code-symbol | source=tech-pwa/check-jobs.js:L3 | neighbors=[check-jobs.js]
- "tech_pwa_check_statuses_neon": "{ neon }" | kind=code-symbol | source=tech-pwa/check-statuses.js:L2 | neighbors=[check-statuses.js]
- "tech_pwa_check_statuses_sql": "sql" | kind=code-symbol | source=tech-pwa/check-statuses.js:L3 | neighbors=[check-statuses.js]
- "tech_pwa_check_time_records_neon": "{ neon }" | kind=code-symbol | source=tech-pwa/check-time-records.js:L2 | neighbors=[check-time-records.js]
- "tech_pwa_check_time_records_sql": "sql" | kind=code-symbol | source=tech-pwa/check-time-records.js:L3 | neighbors=[check-time-records.js]
- "tech_pwa_eslint_config_eslintconfig": "eslintConfig" | kind=code-symbol | source=tech-pwa/eslint.config.mjs:L5 | neighbors=[eslint.config.mjs]
- "tech_pwa_get_all_gids_fs": "fs" | kind=code-symbol | source=tech-pwa/get-all-gids.js:L1 | neighbors=[get-all-gids.js]
- "tech_pwa_get_all_gids_html": "html" | kind=code-symbol | source=tech-pwa/get-all-gids.js:L2 | neighbors=[get-all-gids.js]
- "tech_pwa_get_gids_fs": "fs" | kind=code-symbol | source=tech-pwa/get-gids.js:L1 | neighbors=[get-gids.js]
- "tech_pwa_get_gids_html": "html" | kind=code-symbol | source=tech-pwa/get-gids.js:L2 | neighbors=[get-gids.js]
- "tech_pwa_next_config_nextconfig": "nextConfig" | kind=code-symbol | source=tech-pwa/next.config.ts:L13 | neighbors=[next.config.ts]
- "tech_pwa_next_config_sentryconfig": "sentryConfig" | kind=code-symbol | source=tech-pwa/next.config.ts:L76 | neighbors=[next.config.ts]
- "tech_pwa_next_config_withpwa": "withPWA" | kind=code-symbol | source=tech-pwa/next.config.ts:L5 | neighbors=[next.config.ts]
- "tech_pwa_postcss_config_config": "config" | kind=code-symbol | source=tech-pwa/postcss.config.mjs:L1 | neighbors=[postcss.config.mjs]
- "tech_pwa_project_log": "PROJECT_LOG.md" | kind=entity | source=tech-pwa/PROJECT_LOG.md:L1 | neighbors=[Project Log: Central Command (tech-pwa)]
- "tech_pwa_project_log_current_status_2026_05_11": "Current Status (2026-05-11)" | kind=entity | source=tech-pwa/PROJECT_LOG.md:L6 | neighbors=[Project Log: Central Command (tech-pwa)]
- "tech_pwa_project_log_next_steps": "Next Steps" | kind=entity | source=tech-pwa/PROJECT_LOG.md:L21 | neighbors=[Project Log: Central Command (tech-pwa)]
- "tech_pwa_project_log_overview": "Overview" | kind=entity | source=tech-pwa/PROJECT_LOG.md:L3 | neighbors=[Project Log: Central Command (tech-pwa)]
- "tech_pwa_project_log_recent_actions": "Recent Actions" | kind=entity | source=tech-pwa/PROJECT_LOG.md:L12 | neighbors=[Project Log: Central Command (tech-pwa)]
- "tech_pwa_project_log_technical_decisions": "Technical Decisions" | kind=entity | source=tech-pwa/PROJECT_LOG.md:L17 | neighbors=[Project Log: Central Command (tech-pwa)]
- "tech_pwa_readme_deploy_on_vercel": "Deploy on Vercel" | kind=entity | source=tech-pwa/README.md:L32 | neighbors=[README.md]
- "tech_pwa_readme_getting_started": "Getting Started" | kind=entity | source=tech-pwa/README.md:L3 | neighbors=[README.md]
- "tech_pwa_readme_learn_more": "Learn More" | kind=entity | source=tech-pwa/README.md:L23 | neighbors=[README.md]
- "tech_pwa_src_app_api_comms_jobid_route_ts_jobid_route_patch": "PATCH()" | kind=code-symbol | source=tech-pwa/src/app/api/comms/[jobId]/route.ts:L230 | neighbors=[route.ts]
- "tech_pwa_src_app_api_comms_jobid_route_ts_jobid_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/comms/[jobId]/route.ts:L158 | neighbors=[route.ts]
- "tech_pwa_src_app_api_jobs_sync_route_ts_sync_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/jobs/sync/route.ts:L8 | neighbors=[route.ts]
- "tech_pwa_src_app_api_techs_sync_route_ts_sync_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/techs/sync/route.ts:L8 | neighbors=[route.ts]
- "techs_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/techs/route.ts:L6 | neighbors=[route.ts]
- "templates_ai_spec": "AI-SPEC.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/AI-SPEC.md:L1 | neighbors=[AI-SPEC — Phase {N}: {phase_name}]
- "templates_ai_spec_1_system_classification": "1. System Classification" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/AI-SPEC.md:L8 | neighbors=[AI-SPEC — Phase {N}: {phase_name}]
- "templates_ai_spec_2_framework_decision": "2. Framework Decision" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/AI-SPEC.md:L56 | neighbors=[AI-SPEC — Phase {N}: {phase_name}]
- "templates_ai_spec_4_implementation_guidance": "4. Implementation Guidance" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/AI-SPEC.md:L114 | neighbors=[AI-SPEC — Phase {N}: {phase_name}]
- "templates_ai_spec_7_production_monitoring": "7. Production Monitoring" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/AI-SPEC.md:L214 | neighbors=[AI-SPEC — Phase {N}: {phase_name}]
- "templates_ai_spec_async_first_design": "Async-First Design" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/AI-SPEC.md:L146 | neighbors=[4b. AI Systems Best Practices]
- "templates_ai_spec_checklist": "Checklist" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/AI-SPEC.md:L229 | neighbors=[AI-SPEC — Phase {N}: {phase_name}]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-382.json

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
