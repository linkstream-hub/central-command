# Node Description Batch 358 of 412

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

- "research_pitfalls_pitfall_5_ag_self_reporting_without_browser_evidence": "Pitfall 5: AG Self-Reporting Without Browser Evidence" | kind=entity | source=.planning/research/PITFALLS.md:L87 | neighbors=[Critical Pitfalls]
- "research_pitfalls_pitfall_6_next_public_prefix_exposes_server_secrets_to_browser": "Pitfall 6: NEXT_PUBLIC_ Prefix Exposes Server Secrets to Browser" | kind=entity | source=.planning/research/PITFALLS.md:L106 | neighbors=[Critical Pitfalls]
- "research_pitfalls_pitfall_7_dashboardapi_gs_auth_change_applied_to_fewer_than_three_call_sites": "Pitfall 7: DashboardAPI.gs Auth Change Applied to Fewer Than Three Call Sites" | kind=entity | source=.planning/research/PITFALLS.md:L125 | neighbors=[Critical Pitfalls]
- "research_pitfalls_pitfall_8_reading_from_neon_before_shadow_write_validation": "Pitfall 8: Reading from Neon Before Shadow-Write Validation" | kind=entity | source=.planning/research/PITFALLS.md:L144 | neighbors=[Critical Pitfalls]
- "research_pitfalls_pitfall_to_phase_mapping": "Pitfall-to-Phase Mapping" | kind=entity | source=.planning/research/PITFALLS.md:L258 | neighbors=[Pitfalls Research]
- "research_pitfalls_recovery_strategies": "Recovery Strategies" | kind=entity | source=.planning/research/PITFALLS.md:L245 | neighbors=[Pitfalls Research]
- "research_pitfalls_security_mistakes": "Security Mistakes" | kind=entity | source=.planning/research/PITFALLS.md:L205 | neighbors=[Pitfalls Research]
- "research_pitfalls_sources": "Sources" | kind=entity | source=.planning/research/PITFALLS.md:L275 | neighbors=[Pitfalls Research]
- "research_pitfalls_technical_debt_patterns": "Technical Debt Patterns" | kind=entity | source=.planning/research/PITFALLS.md:L163 | neighbors=[Pitfalls Research]
- "research_pitfalls_ux_pitfalls": "UX Pitfalls" | kind=entity | source=.planning/research/PITFALLS.md:L218 | neighbors=[Pitfalls Research]
- "research_project_architecture": "ARCHITECTURE.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/research-project/ARCHITECTURE.md:L1 | neighbors=[Architecture Research Template]
- "research_project_architecture_architecture_research_template": "Architecture Research Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/research-project/ARCHITECTURE.md:L1 | neighbors=[ARCHITECTURE.md]
- "research_project_features": "FEATURES.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/research-project/FEATURES.md:L1 | neighbors=[Features Research Template]
- "research_project_features_features_research_template": "Features Research Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/research-project/FEATURES.md:L1 | neighbors=[FEATURES.md]
- "research_project_pitfalls": "PITFALLS.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/research-project/PITFALLS.md:L1 | neighbors=[Pitfalls Research Template]
- "research_project_pitfalls_pitfalls_research_template": "Pitfalls Research Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/research-project/PITFALLS.md:L1 | neighbors=[PITFALLS.md]
- "research_project_stack_core": "Core" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/research-project/STACK.md:L42 | neighbors=[STACK.md]
- "research_project_stack_dev_dependencies": "Dev dependencies" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/research-project/STACK.md:L48 | neighbors=[STACK.md]
- "research_project_stack_stack_research_template": "Stack Research Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/research-project/STACK.md:L1 | neighbors=[STACK.md]
- "research_project_stack_supporting": "Supporting" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/research-project/STACK.md:L45 | neighbors=[STACK.md]
- "research_project_summary": "SUMMARY.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/research-project/SUMMARY.md:L1 | neighbors=[Research Summary Template]
- "research_project_summary_research_summary_template": "Research Summary Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/research-project/SUMMARY.md:L1 | neighbors=[SUMMARY.md]
- "research_stack": "STACK.md" | kind=entity | source=.planning/research/STACK.md:L1 | neighbors=[Stack Research]
- "research_stack_alternatives_considered": "Alternatives Considered" | kind=entity | source=.planning/research/STACK.md:L76 | neighbors=[Stack Research]
- "research_stack_core_technologies": "Core Technologies" | kind=entity | source=.planning/research/STACK.md:L15 | neighbors=[Recommended Stack]
- "research_stack_development_tools": "Development Tools" | kind=entity | source=.planning/research/STACK.md:L42 | neighbors=[Recommended Stack]
- "research_stack_installation": "Installation" | kind=entity | source=.planning/research/STACK.md:L54 | neighbors=[Stack Research]
- "research_stack_sources": "Sources" | kind=entity | source=.planning/research/STACK.md:L143 | neighbors=[Stack Research]
- "research_stack_stack_patterns_by_variant": "Stack Patterns by Variant" | kind=entity | source=.planning/research/STACK.md:L105 | neighbors=[Stack Research]
- "research_stack_supporting_libraries": "Supporting Libraries" | kind=entity | source=.planning/research/STACK.md:L30 | neighbors=[Recommended Stack]
- "research_stack_version_compatibility": "Version Compatibility" | kind=entity | source=.planning/research/STACK.md:L131 | neighbors=[Stack Research]
- "research_stack_what_not_to_use": "What NOT to Use" | kind=entity | source=.planning/research/STACK.md:L91 | neighbors=[Stack Research]
- "research_summary": "SUMMARY.md" | kind=entity | source=.planning/research/SUMMARY.md:L1 | neighbors=[Project Research Summary]
- "research_summary_architecture_approach": "Architecture Approach" | kind=entity | source=.planning/research/SUMMARY.md:L66 | neighbors=[Key Findings]
- "research_summary_critical_pitfalls": "Critical Pitfalls" | kind=entity | source=.planning/research/SUMMARY.md:L86 | neighbors=[Key Findings]
- "research_summary_executive_summary": "Executive Summary" | kind=entity | source=.planning/research/SUMMARY.md:L10 | neighbors=[Project Research Summary]
- "research_summary_expected_features": "Expected Features" | kind=entity | source=.planning/research/SUMMARY.md:L37 | neighbors=[Key Findings]
- "research_summary_gaps_to_address": "Gaps to Address" | kind=entity | source=.planning/research/SUMMARY.md:L178 | neighbors=[Confidence Assessment]
- "research_summary_phase_1_job_comments_shadow_write": "Phase 1: `job_comments` Shadow-Write" | kind=entity | source=.planning/research/SUMMARY.md:L103 | neighbors=[Implications for Roadmap]
- "research_summary_phase_2_time_records_shadow_write": "Phase 2: `time_records` Shadow-Write" | kind=entity | source=.planning/research/SUMMARY.md:L110 | neighbors=[Implications for Roadmap]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-357.json

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
