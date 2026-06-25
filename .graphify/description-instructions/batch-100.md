# Node Description Batch 101 of 412

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

- "28_sentinel_diet_28_research_tertiary_low_confidence_assumed": "Tertiary (LOW confidence / ASSUMED)" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L458 | neighbors=[Sources]
- "28_sentinel_diet_28_research_test_framework": "Test Framework" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L353 | neighbors=[Validation Architecture]
- "28_sentinel_diet_28_research_wave_0_discovery_task_mandatory_no_planner_skip": "Wave 0 Discovery Task (Mandatory — No Planner Skip)" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L313 | neighbors=[Phase 28: Sentinel Consolidation — Neon…]
- "28_sentinel_diet_28_research_wave_0_gaps": "Wave 0 Gaps" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L368 | neighbors=[Validation Architecture]
- "28_sentinel_diet_28_validation": "28-VALIDATION.md" | kind=entity | source=.planning/phases/28-sentinel-diet/28-VALIDATION.md:L1 | neighbors=[Phase 28 — Validation Strategy]
- "28_sentinel_diet_28_validation_manual_only_verifications": "Manual-Only Verifications" | kind=entity | source=.planning/phases/28-sentinel-diet/28-VALIDATION.md:L61 | neighbors=[Phase 28 — Validation Strategy]
- "28_sentinel_diet_28_validation_per_task_verification_map": "Per-Task Verification Map" | kind=entity | source=.planning/phases/28-sentinel-diet/28-VALIDATION.md:L38 | neighbors=[Phase 28 — Validation Strategy]
- "28_sentinel_diet_28_validation_sampling_rate": "Sampling Rate" | kind=entity | source=.planning/phases/28-sentinel-diet/28-VALIDATION.md:L28 | neighbors=[Phase 28 — Validation Strategy]
- "28_sentinel_diet_28_validation_test_infrastructure": "Test Infrastructure" | kind=entity | source=.planning/phases/28-sentinel-diet/28-VALIDATION.md:L16 | neighbors=[Phase 28 — Validation Strategy]
- "28_sentinel_diet_28_validation_validation_sign_off": "Validation Sign-Off" | kind=entity | source=.planning/phases/28-sentinel-diet/28-VALIDATION.md:L71 | neighbors=[Phase 28 — Validation Strategy]
- "28_sentinel_diet_28_validation_wave_0_requirements": "Wave 0 Requirements" | kind=entity | source=.planning/phases/28-sentinel-diet/28-VALIDATION.md:L52 | neighbors=[Phase 28 — Validation Strategy]
- "28_sentinel_diet_sentinel_inventory": "SENTINEL_INVENTORY.md" | kind=entity | source=.planning/phases/28-sentinel-diet/SENTINEL_INVENTORY.md:L1 | neighbors=[Sentinel Inventory — Phase 28]
- "28_sentinel_diet_sentinel_inventory_critical_discovery": "Critical Discovery" | kind=entity | source=.planning/phases/28-sentinel-diet/SENTINEL_INVENTORY.md:L9 | neighbors=[Sentinel Inventory — Phase 28]
- "28_sentinel_diet_sentinel_inventory_sentinel_spec_architect": "sentinel-spec-architect" | kind=entity | source=.planning/phases/28-sentinel-diet/SENTINEL_INVENTORY.md:L74 | neighbors=[Per-Service Detail]
- "28_sentinel_diet_sentinel_inventory_sentinel_stale_job": "sentinel-stale-job" | kind=entity | source=.planning/phases/28-sentinel-diet/SENTINEL_INVENTORY.md:L62 | neighbors=[Per-Service Detail]
- "28_sentinel_diet_sentinel_inventory_sentinel_time_anomaly": "sentinel-time-anomaly" | kind=entity | source=.planning/phases/28-sentinel-diet/SENTINEL_INVENTORY.md:L50 | neighbors=[Per-Service Detail]
- "28_sentinel_diet_sentinel_inventory_sentinel_wc_scanner": "sentinel-wc-scanner" | kind=entity | source=.planning/phases/28-sentinel-diet/SENTINEL_INVENTORY.md:L38 | neighbors=[Per-Service Detail]
- "28_sentinel_diet_sentinel_inventory_service_inventory": "Service Inventory" | kind=entity | source=.planning/phases/28-sentinel-diet/SENTINEL_INVENTORY.md:L19 | neighbors=[Sentinel Inventory — Phase 28]
- "28_sentinel_diet_sentinel_inventory_wave_1_build_inputs": "Wave 1 Build Inputs" | kind=entity | source=.planning/phases/28-sentinel-diet/SENTINEL_INVENTORY.md:L85 | neighbors=[Sentinel Inventory — Phase 28]
- "28_sentinel_diet_sentinel_inventory_wave_2_deletion_inputs": "Wave 2 Deletion Inputs" | kind=entity | source=.planning/phases/28-sentinel-diet/SENTINEL_INVENTORY.md:L102 | neighbors=[Sentinel Inventory — Phase 28]
- "ab_2288": "AB 2288" | kind=entity | source=docs/APT_COMPLIANCE_HR_BLUEPRINT.md | neighbors=[PAGA Compliance]
- "accessibility_accessibilit_15359_has_no_critical_violations_chromium_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-15359--has-no-critical-violations-chromium/error-context.md:L12 | neighbors=[error-context.md]
- "accessibility_accessibilit_15359_has_no_critical_violations_chromium_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-15359--has-no-critical-violations-chromium/error-context.md:L1 | neighbors=[error-context.md]
- "accessibility_accessibilit_15359_has_no_critical_violations_chromium_error_context_page_snapshot": "Page snapshot" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-15359--has-no-critical-violations-chromium/error-context.md:L24 | neighbors=[error-context.md]
- "accessibility_accessibilit_15359_has_no_critical_violations_chromium_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-15359--has-no-critical-violations-chromium/error-context.md:L7 | neighbors=[error-context.md]
- "accessibility_accessibilit_15359_has_no_critical_violations_chromium_error_context_test_source": "Test source" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-15359--has-no-critical-violations-chromium/error-context.md:L56 | neighbors=[error-context.md]
- "accessibility_accessibilit_15359_has_no_critical_violations_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-15359--has-no-critical-violations-mobile/error-context.md:L12 | neighbors=[error-context.md]
- "accessibility_accessibilit_15359_has_no_critical_violations_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-15359--has-no-critical-violations-mobile/error-context.md:L1 | neighbors=[error-context.md]
- "accessibility_accessibilit_15359_has_no_critical_violations_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-15359--has-no-critical-violations-mobile/error-context.md:L7 | neighbors=[error-context.md]
- "accessibility_accessibilit_30196_has_no_critical_violations_chromium_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-30196--has-no-critical-violations-chromium/error-context.md:L12 | neighbors=[error-context.md]
- "accessibility_accessibilit_30196_has_no_critical_violations_chromium_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-30196--has-no-critical-violations-chromium/error-context.md:L1 | neighbors=[error-context.md]
- "accessibility_accessibilit_30196_has_no_critical_violations_chromium_error_context_page_snapshot": "Page snapshot" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-30196--has-no-critical-violations-chromium/error-context.md:L24 | neighbors=[error-context.md]
- "accessibility_accessibilit_30196_has_no_critical_violations_chromium_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-30196--has-no-critical-violations-chromium/error-context.md:L7 | neighbors=[error-context.md]
- "accessibility_accessibilit_30196_has_no_critical_violations_chromium_error_context_test_source": "Test source" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-30196--has-no-critical-violations-chromium/error-context.md:L56 | neighbors=[error-context.md]
- "accessibility_accessibilit_30196_has_no_critical_violations_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-30196--has-no-critical-violations-mobile/error-context.md:L12 | neighbors=[error-context.md]
- "accessibility_accessibilit_30196_has_no_critical_violations_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-30196--has-no-critical-violations-mobile/error-context.md:L1 | neighbors=[error-context.md]
- "accessibility_accessibilit_30196_has_no_critical_violations_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-30196--has-no-critical-violations-mobile/error-context.md:L7 | neighbors=[error-context.md]
- "accessibility_accessibilit_9fbbd_has_no_critical_violations_chromium_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-9fbbd--has-no-critical-violations-chromium/error-context.md:L12 | neighbors=[error-context.md]
- "accessibility_accessibilit_9fbbd_has_no_critical_violations_chromium_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-9fbbd--has-no-critical-violations-chromium/error-context.md:L1 | neighbors=[error-context.md]
- "accessibility_accessibilit_9fbbd_has_no_critical_violations_chromium_error_context_page_snapshot": "Page snapshot" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-9fbbd--has-no-critical-violations-chromium/error-context.md:L24 | neighbors=[error-context.md]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-100.json

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
