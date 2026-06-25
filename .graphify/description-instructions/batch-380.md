# Node Description Batch 381 of 412

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

- "tdd_workflow_skill_step_7_verify_coverage": "Step 7: Verify Coverage" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L166 | neighbors=[TDD Workflow Steps]
- "tdd_workflow_skill_success_metrics": "Success Metrics" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L452 | neighbors=[Test-Driven Development Workflow]
- "tdd_workflow_skill_supabase_mock": "Supabase Mock" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L310 | neighbors=[Mocking External Services]
- "tdd_workflow_skill_test_file_organization": "Test File Organization" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L285 | neighbors=[Test-Driven Development Workflow]
- "tdd_workflow_skill_unit_test_pattern_jest_vitest": "Unit Test Pattern (Jest/Vitest)" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L174 | neighbors=[Testing Patterns]
- "tdd_workflow_skill_unit_tests": "Unit Tests" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L32 | neighbors=[3. Test Types]
- "tdd_workflow_skill_watch_mode_during_development": "Watch Mode During Development" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L418 | neighbors=[Continuous Testing]
- "tdd_workflow_skill_when_to_activate": "When to Activate" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L11 | neighbors=[Test-Driven Development Workflow]
- "team_page_dayschedule": "DaySchedule" | kind=code-symbol | source=tech-pwa/src/app/team/page.tsx:L12 | neighbors=[page.tsx]
- "team_page_teampage": "TeamPage()" | kind=code-symbol | source=tech-pwa/src/app/team/page.tsx:L23 | neighbors=[page.tsx]
- "tech_pwa_block_11_tech_p_4fd4e_ete_shows_attestation_modal_chromium_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-4fd4e-ete-shows-attestation-modal-chromium/error-context.md:L12 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_4fd4e_ete_shows_attestation_modal_chromium_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-4fd4e-ete-shows-attestation-modal-chromium/error-context.md:L1 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_4fd4e_ete_shows_attestation_modal_chromium_error_context_page_snapshot": "Page snapshot" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-4fd4e-ete-shows-attestation-modal-chromium/error-context.md:L24 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_4fd4e_ete_shows_attestation_modal_chromium_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-4fd4e-ete-shows-attestation-modal-chromium/error-context.md:L7 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_4fd4e_ete_shows_attestation_modal_chromium_error_context_test_source": "Test source" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-4fd4e-ete-shows-attestation-modal-chromium/error-context.md:L56 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_4fd4e_ete_shows_attestation_modal_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-4fd4e-ete-shows-attestation-modal-mobile/error-context.md:L12 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_4fd4e_ete_shows_attestation_modal_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-4fd4e-ete-shows-attestation-modal-mobile/error-context.md:L1 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_4fd4e_ete_shows_attestation_modal_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-4fd4e-ete-shows-attestation-modal-mobile/error-context.md:L7 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_54d94_on_clock_in_fires_only_once_chromium_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-54d94-on-Clock-In-fires-only-once-chromium/error-context.md:L12 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_54d94_on_clock_in_fires_only_once_chromium_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-54d94-on-Clock-In-fires-only-once-chromium/error-context.md:L1 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_54d94_on_clock_in_fires_only_once_chromium_error_context_page_snapshot": "Page snapshot" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-54d94-on-Clock-In-fires-only-once-chromium/error-context.md:L24 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_54d94_on_clock_in_fires_only_once_chromium_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-54d94-on-Clock-In-fires-only-once-chromium/error-context.md:L7 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_54d94_on_clock_in_fires_only_once_chromium_error_context_test_source": "Test source" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-54d94-on-Clock-In-fires-only-once-chromium/error-context.md:L56 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_54d94_on_clock_in_fires_only_once_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-54d94-on-Clock-In-fires-only-once-mobile/error-context.md:L12 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_54d94_on_clock_in_fires_only_once_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-54d94-on-Clock-In-fires-only-once-mobile/error-context.md:L1 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_54d94_on_clock_in_fires_only_once_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-54d94-on-Clock-In-fires-only-once-mobile/error-context.md:L7 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_60bd6_job_navigates_to_job_detail_chromium_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-60bd6-job-navigates-to-job-detail-chromium/error-context.md:L12 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_60bd6_job_navigates_to_job_detail_chromium_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-60bd6-job-navigates-to-job-detail-chromium/error-context.md:L1 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_60bd6_job_navigates_to_job_detail_chromium_error_context_page_snapshot": "Page snapshot" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-60bd6-job-navigates-to-job-detail-chromium/error-context.md:L24 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_60bd6_job_navigates_to_job_detail_chromium_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-60bd6-job-navigates-to-job-detail-chromium/error-context.md:L7 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_60bd6_job_navigates_to_job_detail_chromium_error_context_test_source": "Test source" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-60bd6-job-navigates-to-job-detail-chromium/error-context.md:L56 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_60bd6_job_navigates_to_job_detail_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-60bd6-job-navigates-to-job-detail-mobile/error-context.md:L12 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_60bd6_job_navigates_to_job_detail_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-60bd6-job-navigates-to-job-detail-mobile/error-context.md:L1 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_60bd6_job_navigates_to_job_detail_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-60bd6-job-navigates-to-job-detail-mobile/error-context.md:L7 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_6bc05_ob_sorts_above_standard_job_chromium_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-6bc05-ob-sorts-above-STANDARD-job-chromium/error-context.md:L12 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_6bc05_ob_sorts_above_standard_job_chromium_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-6bc05-ob-sorts-above-STANDARD-job-chromium/error-context.md:L1 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_6bc05_ob_sorts_above_standard_job_chromium_error_context_page_snapshot": "Page snapshot" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-6bc05-ob-sorts-above-STANDARD-job-chromium/error-context.md:L24 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_6bc05_ob_sorts_above_standard_job_chromium_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-6bc05-ob-sorts-above-STANDARD-job-chromium/error-context.md:L7 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_6bc05_ob_sorts_above_standard_job_chromium_error_context_test_source": "Test source" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-6bc05-ob-sorts-above-STANDARD-job-chromium/error-context.md:L56 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_6bc05_ob_sorts_above_standard_job_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-6bc05-ob-sorts-above-STANDARD-job-mobile/error-context.md:L12 | neighbors=[error-context.md]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-380.json

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
