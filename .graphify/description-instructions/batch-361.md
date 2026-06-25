# Node Description Batch 362 of 412

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

- "scheduling_block_5_7_sch_47952_tech_rows_and_date_columns_chromium_error_context_test_source": "Test source" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-47952--tech-rows-and-date-columns-chromium/error-context.md:L56 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_47952_tech_rows_and_date_columns_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-47952--tech-rows-and-date-columns-mobile/error-context.md:L12 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_47952_tech_rows_and_date_columns_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-47952--tech-rows-and-date-columns-mobile/error-context.md:L1 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_47952_tech_rows_and_date_columns_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-47952--tech-rows-and-date-columns-mobile/error-context.md:L7 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_b6038_unscheduled_jobs_in_sidebar_chromium_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-b6038-unscheduled-jobs-in-sidebar-chromium/error-context.md:L12 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_b6038_unscheduled_jobs_in_sidebar_chromium_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-b6038-unscheduled-jobs-in-sidebar-chromium/error-context.md:L1 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_b6038_unscheduled_jobs_in_sidebar_chromium_error_context_page_snapshot": "Page snapshot" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-b6038-unscheduled-jobs-in-sidebar-chromium/error-context.md:L24 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_b6038_unscheduled_jobs_in_sidebar_chromium_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-b6038-unscheduled-jobs-in-sidebar-chromium/error-context.md:L7 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_b6038_unscheduled_jobs_in_sidebar_chromium_error_context_test_source": "Test source" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-b6038-unscheduled-jobs-in-sidebar-chromium/error-context.md:L56 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_b6038_unscheduled_jobs_in_sidebar_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-b6038-unscheduled-jobs-in-sidebar-mobile/error-context.md:L12 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_b6038_unscheduled_jobs_in_sidebar_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-b6038-unscheduled-jobs-in-sidebar-mobile/error-context.md:L1 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_b6038_unscheduled_jobs_in_sidebar_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-b6038-unscheduled-jobs-in-sidebar-mobile/error-context.md:L7 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_dd77e_ows_correct_tech_assignment_chromium_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-dd77e-ows-correct-tech-assignment-chromium/error-context.md:L12 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_dd77e_ows_correct_tech_assignment_chromium_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-dd77e-ows-correct-tech-assignment-chromium/error-context.md:L1 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_dd77e_ows_correct_tech_assignment_chromium_error_context_page_snapshot": "Page snapshot" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-dd77e-ows-correct-tech-assignment-chromium/error-context.md:L24 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_dd77e_ows_correct_tech_assignment_chromium_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-dd77e-ows-correct-tech-assignment-chromium/error-context.md:L7 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_dd77e_ows_correct_tech_assignment_chromium_error_context_test_source": "Test source" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-dd77e-ows-correct-tech-assignment-chromium/error-context.md:L56 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_dd77e_ows_correct_tech_assignment_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-dd77e-ows-correct-tech-assignment-mobile/error-context.md:L12 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_dd77e_ows_correct_tech_assignment_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-dd77e-ows-correct-tech-assignment-mobile/error-context.md:L1 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_dd77e_ows_correct_tech_assignment_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-dd77e-ows-correct-tech-assignment-mobile/error-context.md:L7 | neighbors=[error-context.md]
- "schema_ts": "Database Schema" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts | neighbors=[Comms Route]
- "scripts_analyze_wos_main": "main()" | kind=code-symbol | source=tech-pwa/scripts/analyze-wos.ts:L8 | neighbors=[analyze-wos.ts]
- "scripts_audit_authors_audit": "audit()" | kind=code-symbol | source=tech-pwa/scripts/audit-authors.ts:L9 | neighbors=[audit-authors.ts]
- "scripts_audit_dev_artifacts_audit": "audit()" | kind=code-symbol | source=tech-pwa/scripts/audit-dev-artifacts.ts:L11 | neighbors=[audit-dev-artifacts.ts]
- "scripts_changeset_readme_md_changeset_readme": "README.md" | kind=entity | source=scripts/changeset/README.md:L1 | neighbors=[changeset/ — release-notes tooling]
- "scripts_changeset_readme_md_changeset_readme_examples": "Examples" | kind=entity | source=scripts/changeset/README.md:L102 | neighbors=[`cli.cjs extract`]
- "scripts_changeset_readme_md_changeset_readme_exit_codes": "Exit codes" | kind=entity | source=scripts/changeset/README.md:L58 | neighbors=[`cli.cjs extract`]
- "scripts_changeset_readme_md_changeset_readme_flags": "Flags" | kind=entity | source=scripts/changeset/README.md:L31 | neighbors=[`cli.cjs extract`]
- "scripts_changeset_readme_md_changeset_readme_output_shape": "Output shape" | kind=entity | source=scripts/changeset/README.md:L80 | neighbors=[`cli.cjs extract`]
- "scripts_changeset_readme_md_changeset_readme_version_validation": "Version validation" | kind=entity | source=scripts/changeset/README.md:L41 | neighbors=[`cli.cjs extract`]
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

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-361.json

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
