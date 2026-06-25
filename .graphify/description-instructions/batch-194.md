# Node Description Batch 195 of 412

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

- "design_primary": "Primary" | kind=entity | source=DESIGN.md:L116 | neighbors=[2. Colors: The Signal Palette]
- "design_secondary_status_semantic_system": "Secondary: Status Semantic System" | kind=entity | source=DESIGN.md:L130 | neighbors=[2. Colors: The Signal Palette]
- "design_shadow_vocabulary": "Shadow Vocabulary" | kind=entity | source=DESIGN.md:L173 | neighbors=[4. Elevation]
- "design_signature_job_priority_row": "Signature: Job Priority Row" | kind=entity | source=DESIGN.md:L215 | neighbors=[5. Components]
- "design_status_chips": "Status Chips" | kind=entity | source=DESIGN.md:L190 | neighbors=[5. Components]
- "dispatch_aptmaintenanceinc_com_prompts_cursor": "cursor.md" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-prompts/cursor.md:L1 | neighbors=[Design brief]
- "dispatch_aptmaintenanceinc_com_prompts_cursor_library": "Library" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-prompts/cursor.md:L19 | neighbors=[Design brief]
- "dispatch_aptmaintenanceinc_com_prompts_cursor_sections": "Sections" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-prompts/cursor.md:L14 | neighbors=[Design brief]
- "dispatch_aptmaintenanceinc_com_prompts_cursor_tokens": "Tokens" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-prompts/cursor.md:L5 | neighbors=[Design brief]
- "dispatch_aptmaintenanceinc_com_prompts_recipe_button": "recipe-button.md" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-prompts/recipe-button.md:L1 | neighbors=[Recipe: button]
- "dispatch_aptmaintenanceinc_com_prompts_recipe_button_anatomy_detected": "Anatomy (detected)" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-prompts/recipe-button.md:L7 | neighbors=[Recipe: button]
- "dispatch_block_2_summary_11e52_ble_and_filter_the_job_list_chromium_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/dispatch-Block-2-—-Summary-11e52-ble-and-filter-the-job-list-chromium/error-context.md:L12 | neighbors=[error-context.md]
- "dispatch_block_2_summary_11e52_ble_and_filter_the_job_list_chromium_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/dispatch-Block-2-—-Summary-11e52-ble-and-filter-the-job-list-chromium/error-context.md:L1 | neighbors=[error-context.md]
- "dispatch_block_2_summary_11e52_ble_and_filter_the_job_list_chromium_error_context_page_snapshot": "Page snapshot" | kind=entity | source=tech-pwa/test-results/dispatch-Block-2-—-Summary-11e52-ble-and-filter-the-job-list-chromium/error-context.md:L24 | neighbors=[error-context.md]
- "dispatch_block_2_summary_11e52_ble_and_filter_the_job_list_chromium_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/dispatch-Block-2-—-Summary-11e52-ble-and-filter-the-job-list-chromium/error-context.md:L7 | neighbors=[error-context.md]
- "dispatch_block_2_summary_11e52_ble_and_filter_the_job_list_chromium_error_context_test_source": "Test source" | kind=entity | source=tech-pwa/test-results/dispatch-Block-2-—-Summary-11e52-ble-and-filter-the-job-list-chromium/error-context.md:L56 | neighbors=[error-context.md]
- "dispatch_block_2_summary_11e52_ble_and_filter_the_job_list_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/dispatch-Block-2-—-Summary-11e52-ble-and-filter-the-job-list-mobile/error-context.md:L12 | neighbors=[error-context.md]
- "dispatch_block_2_summary_11e52_ble_and_filter_the_job_list_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/dispatch-Block-2-—-Summary-11e52-ble-and-filter-the-job-list-mobile/error-context.md:L1 | neighbors=[error-context.md]
- "dispatch_block_2_summary_11e52_ble_and_filter_the_job_list_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/dispatch-Block-2-—-Summary-11e52-ble-and-filter-the-job-list-mobile/error-context.md:L7 | neighbors=[error-context.md]
- "dispatch_block_2_summary_33efa_2_pte_pending_card_renders_chromium_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/dispatch-Block-2-—-Summary-33efa--2-PTE-Pending-card-renders-chromium/error-context.md:L12 | neighbors=[error-context.md]
- "dispatch_block_2_summary_33efa_2_pte_pending_card_renders_chromium_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/dispatch-Block-2-—-Summary-33efa--2-PTE-Pending-card-renders-chromium/error-context.md:L1 | neighbors=[error-context.md]
- "dispatch_block_2_summary_33efa_2_pte_pending_card_renders_chromium_error_context_page_snapshot": "Page snapshot" | kind=entity | source=tech-pwa/test-results/dispatch-Block-2-—-Summary-33efa--2-PTE-Pending-card-renders-chromium/error-context.md:L24 | neighbors=[error-context.md]
- "dispatch_block_2_summary_33efa_2_pte_pending_card_renders_chromium_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/dispatch-Block-2-—-Summary-33efa--2-PTE-Pending-card-renders-chromium/error-context.md:L7 | neighbors=[error-context.md]
- "dispatch_block_2_summary_33efa_2_pte_pending_card_renders_chromium_error_context_test_source": "Test source" | kind=entity | source=tech-pwa/test-results/dispatch-Block-2-—-Summary-33efa--2-PTE-Pending-card-renders-chromium/error-context.md:L56 | neighbors=[error-context.md]
- "dispatch_block_2_summary_33efa_2_pte_pending_card_renders_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/dispatch-Block-2-—-Summary-33efa--2-PTE-Pending-card-renders-mobile/error-context.md:L12 | neighbors=[error-context.md]
- "dispatch_block_2_summary_33efa_2_pte_pending_card_renders_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/dispatch-Block-2-—-Summary-33efa--2-PTE-Pending-card-renders-mobile/error-context.md:L1 | neighbors=[error-context.md]
- "dispatch_block_2_summary_33efa_2_pte_pending_card_renders_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/dispatch-Block-2-—-Summary-33efa--2-PTE-Pending-card-renders-mobile/error-context.md:L7 | neighbors=[error-context.md]
- "dispatch_block_2_summary_7653e_card_renders_non_zero_count_chromium_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/dispatch-Block-2-—-Summary-7653e-card-renders-non-zero-count-chromium/error-context.md:L12 | neighbors=[error-context.md]
- "dispatch_block_2_summary_7653e_card_renders_non_zero_count_chromium_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/dispatch-Block-2-—-Summary-7653e-card-renders-non-zero-count-chromium/error-context.md:L1 | neighbors=[error-context.md]
- "dispatch_block_2_summary_7653e_card_renders_non_zero_count_chromium_error_context_page_snapshot": "Page snapshot" | kind=entity | source=tech-pwa/test-results/dispatch-Block-2-—-Summary-7653e-card-renders-non-zero-count-chromium/error-context.md:L24 | neighbors=[error-context.md]
- "dispatch_block_2_summary_7653e_card_renders_non_zero_count_chromium_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/dispatch-Block-2-—-Summary-7653e-card-renders-non-zero-count-chromium/error-context.md:L7 | neighbors=[error-context.md]
- "dispatch_block_2_summary_7653e_card_renders_non_zero_count_chromium_error_context_test_source": "Test source" | kind=entity | source=tech-pwa/test-results/dispatch-Block-2-—-Summary-7653e-card-renders-non-zero-count-chromium/error-context.md:L56 | neighbors=[error-context.md]
- "dispatch_block_2_summary_7653e_card_renders_non_zero_count_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/dispatch-Block-2-—-Summary-7653e-card-renders-non-zero-count-mobile/error-context.md:L12 | neighbors=[error-context.md]
- "dispatch_block_2_summary_7653e_card_renders_non_zero_count_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/dispatch-Block-2-—-Summary-7653e-card-renders-non-zero-count-mobile/error-context.md:L1 | neighbors=[error-context.md]
- "dispatch_block_2_summary_7653e_card_renders_non_zero_count_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/dispatch-Block-2-—-Summary-7653e-card-renders-non-zero-count-mobile/error-context.md:L7 | neighbors=[error-context.md]
- "dispatch_block_3_coordin_66311_rity_badge_address_category_chromium_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-66311-rity-badge-address-category-chromium/error-context.md:L12 | neighbors=[error-context.md]
- "dispatch_block_3_coordin_66311_rity_badge_address_category_chromium_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-66311-rity-badge-address-category-chromium/error-context.md:L1 | neighbors=[error-context.md]
- "dispatch_block_3_coordin_66311_rity_badge_address_category_chromium_error_context_page_snapshot": "Page snapshot" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-66311-rity-badge-address-category-chromium/error-context.md:L24 | neighbors=[error-context.md]
- "dispatch_block_3_coordin_66311_rity_badge_address_category_chromium_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-66311-rity-badge-address-category-chromium/error-context.md:L7 | neighbors=[error-context.md]
- "dispatch_block_3_coordin_66311_rity_badge_address_category_chromium_error_context_test_source": "Test source" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-66311-rity-badge-address-category-chromium/error-context.md:L56 | neighbors=[error-context.md]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-194.json

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
