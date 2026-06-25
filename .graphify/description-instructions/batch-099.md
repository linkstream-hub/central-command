# Node Description Batch 100 of 412

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

- "28_sentinel_diet_28_context_phase_boundary": "Phase Boundary" | kind=entity | source=.planning/phases/28-sentinel-diet/28-CONTEXT.md:L8 | neighbors=[Phase 28: Sentinel Consolidation — Neon…]
- "28_sentinel_diet_28_context_sentinel_sources_read_in_full_read_source_before_porting": "Sentinel sources (read in full — read-source-before-porting)" | kind=entity | source=.planning/phases/28-sentinel-diet/28-CONTEXT.md:L40 | neighbors=[Canonical References]
- "28_sentinel_diet_28_context_specific_ideas": "Specific Ideas" | kind=entity | source=.planning/phases/28-sentinel-diet/28-CONTEXT.md:L55 | neighbors=[Phase 28: Sentinel Consolidation — Neon…]
- "28_sentinel_diet_28_research": "28-RESEARCH.md" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L1 | neighbors=[Phase 28: Sentinel Consolidation — Neon…]
- "28_sentinel_diet_28_research_anti_patterns_to_avoid": "Anti-Patterns to Avoid" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L182 | neighbors=[Architecture Patterns]
- "28_sentinel_diet_28_research_applicable_asvs_categories": "Applicable ASVS Categories" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L379 | neighbors=[Security Domain]
- "28_sentinel_diet_28_research_architectural_responsibility_map": "Architectural Responsibility Map" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L53 | neighbors=[Phase 28: Sentinel Consolidation — Neon…]
- "28_sentinel_diet_28_research_assumptions_log": "Assumptions Log" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L407 | neighbors=[Phase 28: Sentinel Consolidation — Neon…]
- "28_sentinel_diet_28_research_claude_s_discretion": "Claude's Discretion" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L19 | neighbors=[User Constraints (from CONTEXT.md)]
- "28_sentinel_diet_28_research_core_all_already_in_project_no_new_packages": "Core (all already in project — no new packages)" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L67 | neighbors=[Standard Stack]
- "28_sentinel_diet_28_research_critical_discovery_sentinels_directory": "Critical Discovery: Sentinels Directory" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L97 | neighbors=[Phase 28: Sentinel Consolidation — Neon…]
- "28_sentinel_diet_28_research_deferred_ideas_out_of_scope": "Deferred Ideas (OUT OF SCOPE)" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L24 | neighbors=[User Constraints (from CONTEXT.md)]
- "28_sentinel_diet_28_research_don_t_hand_roll": "Don't Hand-Roll" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L191 | neighbors=[Phase 28: Sentinel Consolidation — Neon…]
- "28_sentinel_diet_28_research_environment_availability": "Environment Availability" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L334 | neighbors=[Phase 28: Sentinel Consolidation — Neon…]
- "28_sentinel_diet_28_research_error_workflow_wiring_set_in_n8n_workflow_settings": "Error workflow wiring (set in n8n workflow Settings)" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L276 | neighbors=[Code Examples]
- "28_sentinel_diet_28_research_known_threat_patterns": "Known Threat Patterns" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L389 | neighbors=[Security Domain]
- "28_sentinel_diet_28_research_locked_decisions": "Locked Decisions" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L12 | neighbors=[User Constraints (from CONTEXT.md)]
- "28_sentinel_diet_28_research_metadata": "Metadata" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L465 | neighbors=[Phase 28: Sentinel Consolidation — Neon…]
- "28_sentinel_diet_28_research_neon_consumption_api_sent_03_verification": "Neon Consumption API (SENT-03 verification)" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L303 | neighbors=[Code Examples]
- "28_sentinel_diet_28_research_open_questions": "Open Questions" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L420 | neighbors=[Phase 28: Sentinel Consolidation — Neon…]
- "28_sentinel_diet_28_research_package_legitimacy_audit": "Package Legitimacy Audit" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L88 | neighbors=[Phase 28: Sentinel Consolidation — Neon…]
- "28_sentinel_diet_28_research_pattern_connect_query_disconnect_n8n_postgres_node": "Pattern: Connect-Query-Disconnect (n8n Postgres node)" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L168 | neighbors=[Architecture Patterns]
- "28_sentinel_diet_28_research_pattern_n8n_schedule_trigger_work_hours_only": "Pattern: n8n Schedule Trigger (work-hours only)" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L149 | neighbors=[Architecture Patterns]
- "28_sentinel_diet_28_research_phase_requirements": "Phase Requirements" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L32 | neighbors=[Phase 28: Sentinel Consolidation — Neon…]
- "28_sentinel_diet_28_research_phase_requirements_test_map": "Phase Requirements → Test Map" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L361 | neighbors=[Validation Architecture]
- "28_sentinel_diet_28_research_pitfall_1_sentinel_source_gap": "Pitfall 1: Sentinel Source Gap" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L222 | neighbors=[Common Pitfalls]
- "28_sentinel_diet_28_research_pitfall_2_n8n_timezone_default_utc": "Pitfall 2: n8n Timezone Default (UTC)" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L228 | neighbors=[Common Pitfalls]
- "28_sentinel_diet_28_research_pitfall_3_held_connections_via_n8n_postgres_connection_pool": "Pitfall 3: Held Connections via n8n Postgres Connection Pool" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L234 | neighbors=[Common Pitfalls]
- "28_sentinel_diet_28_research_pitfall_4_spec_architect_is_not_a_neon_poller": "Pitfall 4: spec-architect Is Not a Neon Poller" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L240 | neighbors=[Common Pitfalls]
- "28_sentinel_diet_28_research_pitfall_5_deleting_railway_services_before_n8n_parity_confirmed": "Pitfall 5: Deleting Railway Services Before n8n Parity Confirmed" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L246 | neighbors=[Common Pitfalls]
- "28_sentinel_diet_28_research_primary_high_confidence": "Primary (HIGH confidence)" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L446 | neighbors=[Sources]
- "28_sentinel_diet_28_research_railway_api_list_service_env_vars_brandon_run_script_pattern": "Railway API: list service env vars (Brandon-run script pattern)" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L287 | neighbors=[Code Examples]
- "28_sentinel_diet_28_research_recommended_n8n_workflow_structure": "Recommended n8n Workflow Structure" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L136 | neighbors=[Architecture Patterns]
- "28_sentinel_diet_28_research_runtime_state_inventory": "Runtime State Inventory" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L204 | neighbors=[Phase 28: Sentinel Consolidation — Neon…]
- "28_sentinel_diet_28_research_schedule_trigger_json_structure_n8n_workflow_node": "Schedule Trigger JSON structure (n8n workflow node)" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L256 | neighbors=[Code Examples]
- "28_sentinel_diet_28_research_secondary_medium_confidence": "Secondary (MEDIUM confidence)" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L454 | neighbors=[Sources]
- "28_sentinel_diet_28_research_state_of_the_art": "State of the Art" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L398 | neighbors=[Phase 28: Sentinel Consolidation — Neon…]
- "28_sentinel_diet_28_research_summary": "Summary" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L43 | neighbors=[Phase 28: Sentinel Consolidation — Neon…]
- "28_sentinel_diet_28_research_supporting": "Supporting" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L77 | neighbors=[Standard Stack]
- "28_sentinel_diet_28_research_system_architecture_diagram": "System Architecture Diagram" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L109 | neighbors=[Architecture Patterns]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-099.json

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
