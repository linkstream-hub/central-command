# Node Description Batch 382 of 412

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
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

- "tech_pwa_block_11_tech_p_6bc05_ob_sorts_above_standard_job_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-6bc05-ob-sorts-above-STANDARD-job-mobile/error-context.md:L1 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_6bc05_ob_sorts_above_standard_job_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-6bc05-ob-sorts-above-STANDARD-job-mobile/error-context.md:L7 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_7ac9c_list_renders_assigned_jobs_chromium_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-7ac9c--list-renders-assigned-jobs-chromium/error-context.md:L12 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_7ac9c_list_renders_assigned_jobs_chromium_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-7ac9c--list-renders-assigned-jobs-chromium/error-context.md:L1 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_7ac9c_list_renders_assigned_jobs_chromium_error_context_page_snapshot": "Page snapshot" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-7ac9c--list-renders-assigned-jobs-chromium/error-context.md:L24 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_7ac9c_list_renders_assigned_jobs_chromium_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-7ac9c--list-renders-assigned-jobs-chromium/error-context.md:L7 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_7ac9c_list_renders_assigned_jobs_chromium_error_context_test_source": "Test source" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-7ac9c--list-renders-assigned-jobs-chromium/error-context.md:L56 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_7ac9c_list_renders_assigned_jobs_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-7ac9c--list-renders-assigned-jobs-mobile/error-context.md:L12 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_7ac9c_list_renders_assigned_jobs_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-7ac9c--list-renders-assigned-jobs-mobile/error-context.md:L1 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_7ac9c_list_renders_assigned_jobs_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-7ac9c--list-renders-assigned-jobs-mobile/error-context.md:L7 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_c003a_d_shifts_ui_to_active_state_chromium_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-c003a-d-shifts-UI-to-active-state-chromium/error-context.md:L12 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_c003a_d_shifts_ui_to_active_state_chromium_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-c003a-d-shifts-UI-to-active-state-chromium/error-context.md:L1 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_c003a_d_shifts_ui_to_active_state_chromium_error_context_page_snapshot": "Page snapshot" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-c003a-d-shifts-UI-to-active-state-chromium/error-context.md:L24 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_c003a_d_shifts_ui_to_active_state_chromium_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-c003a-d-shifts-UI-to-active-state-chromium/error-context.md:L7 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_c003a_d_shifts_ui_to_active_state_chromium_error_context_test_source": "Test source" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-c003a-d-shifts-UI-to-active-state-chromium/error-context.md:L56 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_c003a_d_shifts_ui_to_active_state_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-c003a-d-shifts-UI-to-active-state-mobile/error-context.md:L12 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_c003a_d_shifts_ui_to_active_state_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-c003a-d-shifts-UI-to-active-state-mobile/error-context.md:L1 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_c003a_d_shifts_ui_to_active_state_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-c003a-d-shifts-UI-to-active-state-mobile/error-context.md:L7 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_c5c2f_exists_and_is_not_disabled_chromium_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-c5c2f--exists-and-is-not-disabled-chromium/error-context.md:L12 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_c5c2f_exists_and_is_not_disabled_chromium_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-c5c2f--exists-and-is-not-disabled-chromium/error-context.md:L1 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_c5c2f_exists_and_is_not_disabled_chromium_error_context_page_snapshot": "Page snapshot" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-c5c2f--exists-and-is-not-disabled-chromium/error-context.md:L24 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_c5c2f_exists_and_is_not_disabled_chromium_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-c5c2f--exists-and-is-not-disabled-chromium/error-context.md:L7 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_c5c2f_exists_and_is_not_disabled_chromium_error_context_test_source": "Test source" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-c5c2f--exists-and-is-not-disabled-chromium/error-context.md:L56 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_c5c2f_exists_and_is_not_disabled_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-c5c2f--exists-and-is-not-disabled-mobile/error-context.md:L12 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_c5c2f_exists_and_is_not_disabled_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-c5c2f--exists-and-is-not-disabled-mobile/error-context.md:L1 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_c5c2f_exists_and_is_not_disabled_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-c5c2f--exists-and-is-not-disabled-mobile/error-context.md:L7 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_e4c3f_page_renders_balance_cards_chromium_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-e4c3f--page-renders-balance-cards-chromium/error-context.md:L12 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_e4c3f_page_renders_balance_cards_chromium_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-e4c3f--page-renders-balance-cards-chromium/error-context.md:L1 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_e4c3f_page_renders_balance_cards_chromium_error_context_page_snapshot": "Page snapshot" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-e4c3f--page-renders-balance-cards-chromium/error-context.md:L24 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_e4c3f_page_renders_balance_cards_chromium_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-e4c3f--page-renders-balance-cards-chromium/error-context.md:L7 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_e4c3f_page_renders_balance_cards_chromium_error_context_test_source": "Test source" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-e4c3f--page-renders-balance-cards-chromium/error-context.md:L56 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_e4c3f_page_renders_balance_cards_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-e4c3f--page-renders-balance-cards-mobile/error-context.md:L12 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_e4c3f_page_renders_balance_cards_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-e4c3f--page-renders-balance-cards-mobile/error-context.md:L1 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_e4c3f_page_renders_balance_cards_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-e4c3f--page-renders-balance-cards-mobile/error-context.md:L7 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_f9eae_testation_redirects_to_jobs_chromium_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-f9eae-testation-redirects-to-jobs-chromium/error-context.md:L12 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_f9eae_testation_redirects_to_jobs_chromium_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-f9eae-testation-redirects-to-jobs-chromium/error-context.md:L1 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_f9eae_testation_redirects_to_jobs_chromium_error_context_page_snapshot": "Page snapshot" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-f9eae-testation-redirects-to-jobs-chromium/error-context.md:L24 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_f9eae_testation_redirects_to_jobs_chromium_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-f9eae-testation-redirects-to-jobs-chromium/error-context.md:L7 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_f9eae_testation_redirects_to_jobs_chromium_error_context_test_source": "Test source" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-f9eae-testation-redirects-to-jobs-chromium/error-context.md:L56 | neighbors=[error-context.md]
- "tech_pwa_block_11_tech_p_f9eae_testation_redirects_to_jobs_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/tech-pwa-Block-11-—-Tech-P-f9eae-testation-redirects-to-jobs-mobile/error-context.md:L12 | neighbors=[error-context.md]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-381.json

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
