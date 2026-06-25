# Node Description Batch 357 of 412

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

- "research_architecture_anti_pattern_3_calling_apps_script_urls_directly_from_frontend": "Anti-Pattern 3: Calling Apps Script URLs Directly from Frontend" | kind=entity | source=.planning/research/ARCHITECTURE.md:L361 | neighbors=[Anti-Patterns]
- "research_architecture_anti_pattern_4_making_neon_writes_fatal": "Anti-Pattern 4: Making Neon Writes Fatal" | kind=entity | source=.planning/research/ARCHITECTURE.md:L369 | neighbors=[Anti-Patterns]
- "research_architecture_anti_pattern_5_automating_code_js_deployment": "Anti-Pattern 5: Automating Code.js Deployment" | kind=entity | source=.planning/research/ARCHITECTURE.md:L377 | neighbors=[Anti-Patterns]
- "research_architecture_api_request_flow_cc2_0_dashboard": "API Request Flow (CC2.0 Dashboard)" | kind=entity | source=.planning/research/ARCHITECTURE.md:L268 | neighbors=[Data Flow]
- "research_architecture_component_responsibilities": "Component Responsibilities" | kind=entity | source=.planning/research/ARCHITECTURE.md:L73 | neighbors=[Standard Architecture]
- "research_architecture_external_services": "External Services" | kind=entity | source=.planning/research/ARCHITECTURE.md:L389 | neighbors=[Integration Points]
- "research_architecture_internal_boundaries": "Internal Boundaries" | kind=entity | source=.planning/research/ARCHITECTURE.md:L401 | neighbors=[Integration Points]
- "research_architecture_multi_tenancy_architecture": "Multi-Tenancy Architecture" | kind=entity | source=.planning/research/ARCHITECTURE.md:L324 | neighbors=[Architecture Research]
- "research_architecture_neon_shadow_write_flow": "Neon Shadow-Write Flow" | kind=entity | source=.planning/research/ARCHITECTURE.md:L307 | neighbors=[Data Flow]
- "research_architecture_open_architecture_gaps": "Open Architecture Gaps" | kind=entity | source=.planning/research/ARCHITECTURE.md:L431 | neighbors=[Architecture Research]
- "research_architecture_pattern_1_action_dispatch_api_dashboardapi_gs": "Pattern 1: Action-Dispatch API (DashboardAPI.gs)" | kind=entity | source=.planning/research/ARCHITECTURE.md:L146 | neighbors=[Architectural Patterns]
- "research_architecture_pattern_2_shadow_write_dual_write_migration": "Pattern 2: Shadow-Write Dual-Write Migration" | kind=entity | source=.planning/research/ARCHITECTURE.md:L170 | neighbors=[Architectural Patterns]
- "research_architecture_pattern_3_dual_auth_never_mixed": "Pattern 3: Dual Auth — Never Mixed" | kind=entity | source=.planning/research/ARCHITECTURE.md:L198 | neighbors=[Architectural Patterns]
- "research_architecture_pattern_4_edge_proxy_as_security_perimeter": "Pattern 4: Edge Proxy as Security Perimeter" | kind=entity | source=.planning/research/ARCHITECTURE.md:L216 | neighbors=[Architectural Patterns]
- "research_architecture_pattern_5_dispatch_queue_as_immutable_state_machine": "Pattern 5: Dispatch Queue as Immutable State Machine" | kind=entity | source=.planning/research/ARCHITECTURE.md:L224 | neighbors=[Architectural Patterns]
- "research_architecture_scaling_considerations": "Scaling Considerations" | kind=entity | source=.planning/research/ARCHITECTURE.md:L414 | neighbors=[Architecture Research]
- "research_architecture_sources": "Sources" | kind=entity | source=.planning/research/ARCHITECTURE.md:L447 | neighbors=[Architecture Research]
- "research_architecture_structure_rationale": "Structure Rationale" | kind=entity | source=.planning/research/ARCHITECTURE.md:L136 | neighbors=[Recommended Project Structure]
- "research_architecture_system_overview": "System Overview" | kind=entity | source=.planning/research/ARCHITECTURE.md:L11 | neighbors=[Standard Architecture]
- "research_architecture_tech_auth_flow": "Tech Auth Flow" | kind=entity | source=.planning/research/ARCHITECTURE.md:L287 | neighbors=[Data Flow]
- "research_architecture_work_order_lifecycle": "Work Order Lifecycle" | kind=entity | source=.planning/research/ARCHITECTURE.md:L236 | neighbors=[Data Flow]
- "research_features": "FEATURES.md" | kind=entity | source=.planning/research/FEATURES.md:L1 | neighbors=[Feature Research]
- "research_features_add_after_validation_v1_x": "Add After Validation (v1.x)" | kind=entity | source=.planning/research/FEATURES.md:L120 | neighbors=[MVP Definition]
- "research_features_anti_features_commonly_requested_often_problematic": "Anti-Features (Commonly Requested, Often Problematic)" | kind=entity | source=.planning/research/FEATURES.md:L52 | neighbors=[Feature Landscape]
- "research_features_competitor_feature_analysis": "Competitor Feature Analysis" | kind=entity | source=.planning/research/FEATURES.md:L161 | neighbors=[Feature Research]
- "research_features_dependency_notes": "Dependency Notes" | kind=entity | source=.planning/research/FEATURES.md:L98 | neighbors=[Feature Dependencies]
- "research_features_differentiators_competitive_advantage": "Differentiators (Competitive Advantage)" | kind=entity | source=.planning/research/FEATURES.md:L33 | neighbors=[Feature Landscape]
- "research_features_feature_prioritization_matrix": "Feature Prioritization Matrix" | kind=entity | source=.planning/research/FEATURES.md:L139 | neighbors=[Feature Research]
- "research_features_future_consideration_v2": "Future Consideration (v2+)" | kind=entity | source=.planning/research/FEATURES.md:L128 | neighbors=[MVP Definition]
- "research_features_launch_with_neon_cutover_v1": "Launch With (Neon cutover v1)" | kind=entity | source=.planning/research/FEATURES.md:L112 | neighbors=[MVP Definition]
- "research_features_sources": "Sources" | kind=entity | source=.planning/research/FEATURES.md:L180 | neighbors=[Feature Research]
- "research_features_table_stakes_users_expect_these": "Table Stakes (Users Expect These)" | kind=entity | source=.planning/research/FEATURES.md:L11 | neighbors=[Feature Landscape]
- "research_pitfalls": "PITFALLS.md" | kind=entity | source=.planning/research/PITFALLS.md:L1 | neighbors=[Pitfalls Research]
- "research_pitfalls_integration_gotchas": "Integration Gotchas" | kind=entity | source=.planning/research/PITFALLS.md:L178 | neighbors=[Pitfalls Research]
- "research_pitfalls_looks_done_but_isn_t_checklist": "\"Looks Done But Isn't\" Checklist" | kind=entity | source=.planning/research/PITFALLS.md:L231 | neighbors=[Pitfalls Research]
- "research_pitfalls_performance_traps": "Performance Traps" | kind=entity | source=.planning/research/PITFALLS.md:L193 | neighbors=[Pitfalls Research]
- "research_pitfalls_pitfall_1_dispatch_queue_column_index_drift": "Pitfall 1: Dispatch Queue Column Index Drift" | kind=entity | source=.planning/research/PITFALLS.md:L11 | neighbors=[Critical Pitfalls]
- "research_pitfalls_pitfall_2_auth_hook_cross_contamination": "Pitfall 2: Auth Hook Cross-Contamination" | kind=entity | source=.planning/research/PITFALLS.md:L30 | neighbors=[Critical Pitfalls]
- "research_pitfalls_pitfall_3_shadow_write_silent_failure": "Pitfall 3: Shadow-Write Silent Failure" | kind=entity | source=.planning/research/PITFALLS.md:L49 | neighbors=[Critical Pitfalls]
- "research_pitfalls_pitfall_4_code_js_deployed_via_automation": "Pitfall 4: Code.js Deployed via Automation" | kind=entity | source=.planning/research/PITFALLS.md:L68 | neighbors=[Critical Pitfalls]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-356.json

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
