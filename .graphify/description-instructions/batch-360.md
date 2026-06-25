# Node Description Batch 361 of 412

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

- "schedule_redesign_sr_01_research_package_legitimacy_audit": "Package Legitimacy Audit" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L564 | neighbors=[Phase SR-01: Schedule Page Redesign - R…]
- "schedule_redesign_sr_01_research_phase_requirements_test_map": "Phase Requirements → Test Map" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L614 | neighbors=[Validation Architecture]
- "schedule_redesign_sr_01_research_primary_high_confidence": "Primary (HIGH confidence)" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L657 | neighbors=[Sources]
- "schedule_redesign_sr_01_research_recommended_build_order": "Recommended Build Order" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L544 | neighbors=[Phase SR-01: Schedule Page Redesign - R…]
- "schedule_redesign_sr_01_research_regression_risk_analysis": "Regression Risk Analysis" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L476 | neighbors=[Playwright Coverage]
- "schedule_redesign_sr_01_research_risk_1_token_scope_accent_change_is_platform_wide_high": "Risk 1: Token Scope — `--accent` Change is Platform-Wide (HIGH)" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L508 | neighbors=[Implementation Risks]
- "schedule_redesign_sr_01_research_risk_2_neon_schema_migration_high_requires_claude_code_gate": "Risk 2: Neon Schema Migration (HIGH — requires Claude Code gate)" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L514 | neighbors=[Implementation Risks]
- "schedule_redesign_sr_01_research_risk_3_gas_dependency_in_schedule_page_medium": "Risk 3: GAS Dependency in Schedule Page (MEDIUM)" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L524 | neighbors=[Implementation Risks]
- "schedule_redesign_sr_01_research_risk_4_font_loading_geist_npm_package_vs_next_font_low": "Risk 4: Font Loading — Geist npm Package vs next/font (LOW)" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L528 | neighbors=[Implementation Risks]
- "schedule_redesign_sr_01_research_risk_5_dnd_kit_on_tech_row_grid_low": "Risk 5: DnD Kit on Tech-Row Grid (LOW)" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L534 | neighbors=[Implementation Risks]
- "schedule_redesign_sr_01_research_risk_6_lock_and_send_webhook_url_not_yet_configured_medium": "Risk 6: Lock and Send Webhook URL Not Yet Configured (MEDIUM)" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L538 | neighbors=[Implementation Risks]
- "schedule_redesign_sr_01_research_secondary_medium_confidence": "Secondary (MEDIUM confidence)" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L672 | neighbors=[Sources]
- "schedule_redesign_sr_01_research_summary": "Summary" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L55 | neighbors=[Phase SR-01: Schedule Page Redesign - R…]
- "schedule_redesign_sr_01_research_tailwind_v4_implications": "Tailwind v4 Implications" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L448 | neighbors=[Design System Migration Plan]
- "schedule_redesign_sr_01_research_tertiary_low_confidence": "Tertiary (LOW confidence)" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L676 | neighbors=[Sources]
- "schedule_redesign_sr_01_research_test_framework": "Test Framework" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L605 | neighbors=[Validation Architecture]
- "schedule_redesign_sr_01_research_tests_currently_covering_schedule": "Tests Currently Covering `/schedule`" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L458 | neighbors=[Playwright Coverage]
- "schedule_redesign_sr_01_research_threat_patterns_for_this_phase": "Threat Patterns for This Phase" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L644 | neighbors=[Security Domain]
- "schedule_redesign_sr_01_research_token_changes_required": "Token Changes Required" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L392 | neighbors=[Design System Migration Plan]
- "schedule_redesign_sr_01_research_wave_0_gaps_before_implementation": "Wave 0 Gaps (before implementation)" | kind=entity | source=.planning/phases/schedule-redesign/sr-01-RESEARCH.md:L625 | neighbors=[Validation Architecture]
- "scheduling_block_5_7_sch_3bb3d_ar_in_coordination_all_feed_chromium_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-3bb3d-ar-in-coordination-ALL-feed-chromium/error-context.md:L12 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_3bb3d_ar_in_coordination_all_feed_chromium_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-3bb3d-ar-in-coordination-ALL-feed-chromium/error-context.md:L1 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_3bb3d_ar_in_coordination_all_feed_chromium_error_context_page_snapshot": "Page snapshot" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-3bb3d-ar-in-coordination-ALL-feed-chromium/error-context.md:L24 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_3bb3d_ar_in_coordination_all_feed_chromium_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-3bb3d-ar-in-coordination-ALL-feed-chromium/error-context.md:L7 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_3bb3d_ar_in_coordination_all_feed_chromium_error_context_test_source": "Test source" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-3bb3d-ar-in-coordination-ALL-feed-chromium/error-context.md:L56 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_3bb3d_ar_in_coordination_all_feed_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-3bb3d-ar-in-coordination-ALL-feed-mobile/error-context.md:L12 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_3bb3d_ar_in_coordination_all_feed_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-3bb3d-ar-in-coordination-ALL-feed-mobile/error-context.md:L1 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_3bb3d_ar_in_coordination_all_feed_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-3bb3d-ar-in-coordination-ALL-feed-mobile/error-context.md:L7 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_447c5_ads_with_pre_scheduled_jobs_chromium_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-447c5-ads-with-pre-scheduled-jobs-chromium/error-context.md:L12 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_447c5_ads_with_pre_scheduled_jobs_chromium_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-447c5-ads-with-pre-scheduled-jobs-chromium/error-context.md:L1 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_447c5_ads_with_pre_scheduled_jobs_chromium_error_context_page_snapshot": "Page snapshot" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-447c5-ads-with-pre-scheduled-jobs-chromium/error-context.md:L24 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_447c5_ads_with_pre_scheduled_jobs_chromium_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-447c5-ads-with-pre-scheduled-jobs-chromium/error-context.md:L7 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_447c5_ads_with_pre_scheduled_jobs_chromium_error_context_test_source": "Test source" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-447c5-ads-with-pre-scheduled-jobs-chromium/error-context.md:L56 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_447c5_ads_with_pre_scheduled_jobs_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-447c5-ads-with-pre-scheduled-jobs-mobile/error-context.md:L12 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_447c5_ads_with_pre_scheduled_jobs_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-447c5-ads-with-pre-scheduled-jobs-mobile/error-context.md:L1 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_447c5_ads_with_pre_scheduled_jobs_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-447c5-ads-with-pre-scheduled-jobs-mobile/error-context.md:L7 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_47952_tech_rows_and_date_columns_chromium_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-47952--tech-rows-and-date-columns-chromium/error-context.md:L12 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_47952_tech_rows_and_date_columns_chromium_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-47952--tech-rows-and-date-columns-chromium/error-context.md:L1 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_47952_tech_rows_and_date_columns_chromium_error_context_page_snapshot": "Page snapshot" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-47952--tech-rows-and-date-columns-chromium/error-context.md:L24 | neighbors=[error-context.md]
- "scheduling_block_5_7_sch_47952_tech_rows_and_date_columns_chromium_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/scheduling-Block-5-7-—-Sch-47952--tech-rows-and-date-columns-chromium/error-context.md:L7 | neighbors=[error-context.md]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-360.json

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
