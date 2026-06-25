# Node Description Batch 196 of 412

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

- "dispatch_block_3_coordin_66311_rity_badge_address_category_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-66311-rity-badge-address-category-mobile/error-context.md:L12 | neighbors=[error-context.md]
- "dispatch_block_3_coordin_66311_rity_badge_address_category_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-66311-rity-badge-address-category-mobile/error-context.md:L1 | neighbors=[error-context.md]
- "dispatch_block_3_coordin_66311_rity_badge_address_category_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-66311-rity-badge-address-category-mobile/error-context.md:L7 | neighbors=[error-context.md]
- "dispatch_block_3_coordin_75c29_shows_apt_3001_and_apt_3002_chromium_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-75c29-shows-APT-3001-and-APT-3002-chromium/error-context.md:L12 | neighbors=[error-context.md]
- "dispatch_block_3_coordin_75c29_shows_apt_3001_and_apt_3002_chromium_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-75c29-shows-APT-3001-and-APT-3002-chromium/error-context.md:L1 | neighbors=[error-context.md]
- "dispatch_block_3_coordin_75c29_shows_apt_3001_and_apt_3002_chromium_error_context_page_snapshot": "Page snapshot" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-75c29-shows-APT-3001-and-APT-3002-chromium/error-context.md:L24 | neighbors=[error-context.md]
- "dispatch_block_3_coordin_75c29_shows_apt_3001_and_apt_3002_chromium_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-75c29-shows-APT-3001-and-APT-3002-chromium/error-context.md:L7 | neighbors=[error-context.md]
- "dispatch_block_3_coordin_75c29_shows_apt_3001_and_apt_3002_chromium_error_context_test_source": "Test source" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-75c29-shows-APT-3001-and-APT-3002-chromium/error-context.md:L56 | neighbors=[error-context.md]
- "dispatch_block_3_coordin_75c29_shows_apt_3001_and_apt_3002_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-75c29-shows-APT-3001-and-APT-3002-mobile/error-context.md:L12 | neighbors=[error-context.md]
- "dispatch_block_3_coordin_75c29_shows_apt_3001_and_apt_3002_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-75c29-shows-APT-3001-and-APT-3002-mobile/error-context.md:L1 | neighbors=[error-context.md]
- "dispatch_block_3_coordin_75c29_shows_apt_3001_and_apt_3002_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-75c29-shows-APT-3001-and-APT-3002-mobile/error-context.md:L7 | neighbors=[error-context.md]
- "dispatch_block_3_coordin_8fd4c_shows_apt_3003_and_apt_3004_chromium_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-8fd4c-shows-APT-3003-and-APT-3004-chromium/error-context.md:L12 | neighbors=[error-context.md]
- "dispatch_block_3_coordin_8fd4c_shows_apt_3003_and_apt_3004_chromium_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-8fd4c-shows-APT-3003-and-APT-3004-chromium/error-context.md:L1 | neighbors=[error-context.md]
- "dispatch_block_3_coordin_8fd4c_shows_apt_3003_and_apt_3004_chromium_error_context_page_snapshot": "Page snapshot" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-8fd4c-shows-APT-3003-and-APT-3004-chromium/error-context.md:L24 | neighbors=[error-context.md]
- "dispatch_block_3_coordin_8fd4c_shows_apt_3003_and_apt_3004_chromium_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-8fd4c-shows-APT-3003-and-APT-3004-chromium/error-context.md:L7 | neighbors=[error-context.md]
- "dispatch_block_3_coordin_8fd4c_shows_apt_3003_and_apt_3004_chromium_error_context_test_source": "Test source" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-8fd4c-shows-APT-3003-and-APT-3004-chromium/error-context.md:L56 | neighbors=[error-context.md]
- "dispatch_block_3_coordin_8fd4c_shows_apt_3003_and_apt_3004_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-8fd4c-shows-APT-3003-and-APT-3004-mobile/error-context.md:L12 | neighbors=[error-context.md]
- "dispatch_block_3_coordin_8fd4c_shows_apt_3003_and_apt_3004_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-8fd4c-shows-APT-3003-and-APT-3004-mobile/error-context.md:L1 | neighbors=[error-context.md]
- "dispatch_block_3_coordin_8fd4c_shows_apt_3003_and_apt_3004_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-8fd4c-shows-APT-3003-and-APT-3004-mobile/error-context.md:L7 | neighbors=[error-context.md]
- "dispatch_block_3_coordin_aa983_filters_job_list_by_address_chromium_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-aa983-filters-job-list-by-address-chromium/error-context.md:L12 | neighbors=[error-context.md]
- "dispatch_block_3_coordin_aa983_filters_job_list_by_address_chromium_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-aa983-filters-job-list-by-address-chromium/error-context.md:L1 | neighbors=[error-context.md]
- "dispatch_block_3_coordin_aa983_filters_job_list_by_address_chromium_error_context_page_snapshot": "Page snapshot" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-aa983-filters-job-list-by-address-chromium/error-context.md:L24 | neighbors=[error-context.md]
- "dispatch_block_3_coordin_aa983_filters_job_list_by_address_chromium_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-aa983-filters-job-list-by-address-chromium/error-context.md:L7 | neighbors=[error-context.md]
- "dispatch_block_3_coordin_aa983_filters_job_list_by_address_chromium_error_context_test_source": "Test source" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-aa983-filters-job-list-by-address-chromium/error-context.md:L56 | neighbors=[error-context.md]
- "dispatch_block_3_coordin_aa983_filters_job_list_by_address_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-aa983-filters-job-list-by-address-mobile/error-context.md:L12 | neighbors=[error-context.md]
- "dispatch_block_3_coordin_aa983_filters_job_list_by_address_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-aa983-filters-job-list-by-address-mobile/error-context.md:L1 | neighbors=[error-context.md]
- "dispatch_block_3_coordin_aa983_filters_job_list_by_address_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-aa983-filters-job-list-by-address-mobile/error-context.md:L7 | neighbors=[error-context.md]
- "dispatch_block_4_job_det_31919_job_card_opens_detail_modal_chromium_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/dispatch-Block-4-—-Job-Det-31919-job-card-opens-detail-modal-chromium/error-context.md:L12 | neighbors=[error-context.md]
- "dispatch_block_4_job_det_31919_job_card_opens_detail_modal_chromium_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/dispatch-Block-4-—-Job-Det-31919-job-card-opens-detail-modal-chromium/error-context.md:L1 | neighbors=[error-context.md]
- "dispatch_block_4_job_det_31919_job_card_opens_detail_modal_chromium_error_context_page_snapshot": "Page snapshot" | kind=entity | source=tech-pwa/test-results/dispatch-Block-4-—-Job-Det-31919-job-card-opens-detail-modal-chromium/error-context.md:L24 | neighbors=[error-context.md]
- "dispatch_block_4_job_det_31919_job_card_opens_detail_modal_chromium_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/dispatch-Block-4-—-Job-Det-31919-job-card-opens-detail-modal-chromium/error-context.md:L7 | neighbors=[error-context.md]
- "dispatch_block_4_job_det_31919_job_card_opens_detail_modal_chromium_error_context_test_source": "Test source" | kind=entity | source=tech-pwa/test-results/dispatch-Block-4-—-Job-Det-31919-job-card-opens-detail-modal-chromium/error-context.md:L56 | neighbors=[error-context.md]
- "dispatch_block_4_job_det_31919_job_card_opens_detail_modal_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/dispatch-Block-4-—-Job-Det-31919-job-card-opens-detail-modal-mobile/error-context.md:L12 | neighbors=[error-context.md]
- "dispatch_block_4_job_det_31919_job_card_opens_detail_modal_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/dispatch-Block-4-—-Job-Det-31919-job-card-opens-detail-modal-mobile/error-context.md:L1 | neighbors=[error-context.md]
- "dispatch_block_4_job_det_31919_job_card_opens_detail_modal_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/dispatch-Block-4-—-Job-Det-31919-job-card-opens-detail-modal-mobile/error-context.md:L7 | neighbors=[error-context.md]
- "dispatch_block_4_job_det_39bd6_techs_panel_returns_results_chromium_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/dispatch-Block-4-—-Job-Det-39bd6-Techs-panel-returns-results-chromium/error-context.md:L12 | neighbors=[error-context.md]
- "dispatch_block_4_job_det_39bd6_techs_panel_returns_results_chromium_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/dispatch-Block-4-—-Job-Det-39bd6-Techs-panel-returns-results-chromium/error-context.md:L1 | neighbors=[error-context.md]
- "dispatch_block_4_job_det_39bd6_techs_panel_returns_results_chromium_error_context_page_snapshot": "Page snapshot" | kind=entity | source=tech-pwa/test-results/dispatch-Block-4-—-Job-Det-39bd6-Techs-panel-returns-results-chromium/error-context.md:L24 | neighbors=[error-context.md]
- "dispatch_block_4_job_det_39bd6_techs_panel_returns_results_chromium_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/dispatch-Block-4-—-Job-Det-39bd6-Techs-panel-returns-results-chromium/error-context.md:L7 | neighbors=[error-context.md]
- "dispatch_block_4_job_det_39bd6_techs_panel_returns_results_chromium_error_context_test_source": "Test source" | kind=entity | source=tech-pwa/test-results/dispatch-Block-4-—-Job-Det-39bd6-Techs-panel-returns-results-chromium/error-context.md:L56 | neighbors=[error-context.md]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-195.json

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
