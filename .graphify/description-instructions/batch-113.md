# Node Description Batch 114 of 412

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

- "agents_gsd_nyquist_auditor_agent_gaps_filled": "GAPS FILLED" | kind=entity | source=.github/agents/gsd-nyquist-auditor.agent.md:L124 | neighbors=[gsd-nyquist-auditor.agent.md]
- "agents_gsd_nyquist_auditor_agent_partial": "PARTIAL" | kind=entity | source=.github/agents/gsd-nyquist-auditor.agent.md:L146 | neighbors=[gsd-nyquist-auditor.agent.md]
- "agents_gsd_nyquist_auditor_md_agents_gsd_nyquist_auditor_escalate": "ESCALATE" | kind=entity | source=agents/gsd-nyquist-auditor.md:L166 | neighbors=[gsd-nyquist-auditor.md]
- "agents_gsd_nyquist_auditor_md_agents_gsd_nyquist_auditor_gaps_filled": "GAPS FILLED" | kind=entity | source=agents/gsd-nyquist-auditor.md:L122 | neighbors=[gsd-nyquist-auditor.md]
- "agents_gsd_nyquist_auditor_md_agents_gsd_nyquist_auditor_partial": "PARTIAL" | kind=entity | source=agents/gsd-nyquist-auditor.md:L144 | neighbors=[gsd-nyquist-auditor.md]
- "agents_gsd_pattern_mapper_agent_pattern_mapping_complete": "Pattern Mapping Complete" | kind=entity | source=.github/agents/gsd-pattern-mapper.agent.md:L273 | neighbors=[gsd-pattern-mapper.agent.md]
- "agents_gsd_pattern_mapper_agent_patterns_md_structure": "PATTERNS.md Structure" | kind=entity | source=.github/agents/gsd-pattern-mapper.agent.md:L156 | neighbors=[gsd-pattern-mapper.agent.md]
- "agents_gsd_pattern_mapper_agent_step_1_receive_scope_and_load_context": "Step 1: Receive Scope and Load Context" | kind=entity | source=.github/agents/gsd-pattern-mapper.agent.md:L73 | neighbors=[gsd-pattern-mapper.agent.md]
- "agents_gsd_pattern_mapper_agent_step_2_classify_files": "Step 2: Classify Files" | kind=entity | source=.github/agents/gsd-pattern-mapper.agent.md:L81 | neighbors=[gsd-pattern-mapper.agent.md]
- "agents_gsd_pattern_mapper_agent_step_3_find_closest_analogs": "Step 3: Find Closest Analogs" | kind=entity | source=.github/agents/gsd-pattern-mapper.agent.md:L90 | neighbors=[gsd-pattern-mapper.agent.md]
- "agents_gsd_pattern_mapper_agent_step_4_extract_patterns_from_analogs": "Step 4: Extract Patterns from Analogs" | kind=entity | source=.github/agents/gsd-pattern-mapper.agent.md:L114 | neighbors=[gsd-pattern-mapper.agent.md]
- "agents_gsd_pattern_mapper_agent_step_5_identify_shared_patterns": "Step 5: Identify Shared Patterns" | kind=entity | source=.github/agents/gsd-pattern-mapper.agent.md:L135 | neighbors=[gsd-pattern-mapper.agent.md]
- "agents_gsd_pattern_mapper_agent_step_6_write_patterns_md": "Step 6: Write PATTERNS.md" | kind=entity | source=.github/agents/gsd-pattern-mapper.agent.md:L144 | neighbors=[gsd-pattern-mapper.agent.md]
- "agents_gsd_pattern_mapper_agent_step_7_return_structured_result": "Step 7: Return Structured Result" | kind=entity | source=.github/agents/gsd-pattern-mapper.agent.md:L150 | neighbors=[gsd-pattern-mapper.agent.md]
- "agents_gsd_pattern_mapper_hooks": "hooks:" | kind=entity | source=.claude/agents/gsd-pattern-mapper.md:L6 | neighbors=[gsd-pattern-mapper.md]
- "agents_gsd_pattern_mapper_matcher_write_edit": "- matcher: \"Write|Edit\"" | kind=entity | source=.claude/agents/gsd-pattern-mapper.md:L8 | neighbors=[gsd-pattern-mapper.md]
- "agents_gsd_pattern_mapper_md_agents_gsd_pattern_mapper_pattern_mapping_complete": "Pattern Mapping Complete" | kind=entity | source=agents/gsd-pattern-mapper.md:L271 | neighbors=[gsd-pattern-mapper.md]
- "agents_gsd_pattern_mapper_md_agents_gsd_pattern_mapper_patterns_md_structure": "PATTERNS.md Structure" | kind=entity | source=agents/gsd-pattern-mapper.md:L154 | neighbors=[gsd-pattern-mapper.md]
- "agents_gsd_pattern_mapper_md_agents_gsd_pattern_mapper_step_1_receive_scope_and_load_context": "Step 1: Receive Scope and Load Context" | kind=entity | source=agents/gsd-pattern-mapper.md:L71 | neighbors=[gsd-pattern-mapper.md]
- "agents_gsd_pattern_mapper_md_agents_gsd_pattern_mapper_step_2_classify_files": "Step 2: Classify Files" | kind=entity | source=agents/gsd-pattern-mapper.md:L79 | neighbors=[gsd-pattern-mapper.md]
- "agents_gsd_pattern_mapper_md_agents_gsd_pattern_mapper_step_3_find_closest_analogs": "Step 3: Find Closest Analogs" | kind=entity | source=agents/gsd-pattern-mapper.md:L88 | neighbors=[gsd-pattern-mapper.md]
- "agents_gsd_pattern_mapper_md_agents_gsd_pattern_mapper_step_4_extract_patterns_from_analogs": "Step 4: Extract Patterns from Analogs" | kind=entity | source=agents/gsd-pattern-mapper.md:L112 | neighbors=[gsd-pattern-mapper.md]
- "agents_gsd_pattern_mapper_md_agents_gsd_pattern_mapper_step_5_identify_shared_patterns": "Step 5: Identify Shared Patterns" | kind=entity | source=agents/gsd-pattern-mapper.md:L133 | neighbors=[gsd-pattern-mapper.md]
- "agents_gsd_pattern_mapper_md_agents_gsd_pattern_mapper_step_6_write_patterns_md": "Step 6: Write PATTERNS.md" | kind=entity | source=agents/gsd-pattern-mapper.md:L142 | neighbors=[gsd-pattern-mapper.md]
- "agents_gsd_pattern_mapper_md_agents_gsd_pattern_mapper_step_7_return_structured_result": "Step 7: Return Structured Result" | kind=entity | source=agents/gsd-pattern-mapper.md:L148 | neighbors=[gsd-pattern-mapper.md]
- "agents_gsd_pattern_mapper_posttooluse": "PostToolUse:" | kind=entity | source=.claude/agents/gsd-pattern-mapper.md:L7 | neighbors=[gsd-pattern-mapper.md]
- "agents_gsd_pattern_mapper_type_command": "- type: command" | kind=entity | source=.claude/agents/gsd-pattern-mapper.md:L10 | neighbors=[gsd-pattern-mapper.md]
- "agents_gsd_phase_researcher_agent_detect_test_infrastructure": "Detect Test Infrastructure" | kind=entity | source=.github/agents/gsd-phase-researcher.agent.md:L707 | neighbors=[Step 4: Validation Architecture Researc…]
- "agents_gsd_phase_researcher_agent_identify_wave_0_gaps": "Identify Wave 0 Gaps" | kind=entity | source=.github/agents/gsd-phase-researcher.agent.md:L713 | neighbors=[Step 4: Validation Architecture Researc…]
- "agents_gsd_phase_researcher_agent_map_requirements_to_tests": "Map Requirements to Tests" | kind=entity | source=.github/agents/gsd-phase-researcher.agent.md:L710 | neighbors=[Step 4: Validation Architecture Researc…]
- "agents_gsd_phase_researcher_agent_research_blocked": "Research Blocked" | kind=entity | source=.github/agents/gsd-phase-researcher.agent.md:L816 | neighbors=[gsd-phase-researcher.agent.md]
- "agents_gsd_phase_researcher_agent_research_complete": "Research Complete" | kind=entity | source=.github/agents/gsd-phase-researcher.agent.md:L788 | neighbors=[gsd-phase-researcher.agent.md]
- "agents_gsd_phase_researcher_agent_research_md_structure": "RESEARCH.md Structure" | kind=entity | source=.github/agents/gsd-phase-researcher.agent.md:L246 | neighbors=[gsd-phase-researcher.agent.md]
- "agents_gsd_phase_researcher_agent_step_1_3_load_graph_context": "Step 1.3: Load Graph Context" | kind=entity | source=.github/agents/gsd-phase-researcher.agent.md:L544 | neighbors=[gsd-phase-researcher.agent.md]
- "agents_gsd_phase_researcher_agent_step_1_5_architectural_responsibility_mapping": "Step 1.5: Architectural Responsibility Mapping" | kind=entity | source=.github/agents/gsd-phase-researcher.agent.md:L580 | neighbors=[gsd-phase-researcher.agent.md]
- "agents_gsd_phase_researcher_agent_step_1_receive_scope_and_load_context": "Step 1: Receive Scope and Load Context" | kind=entity | source=.github/agents/gsd-phase-researcher.agent.md:L511 | neighbors=[gsd-phase-researcher.agent.md]
- "agents_gsd_phase_researcher_agent_step_1_run_legitimacy_check_via_seam": "Step 1 — Run legitimacy check via seam" | kind=entity | source=.github/agents/gsd-phase-researcher.agent.md:L192 | neighbors=[Package Legitimacy Gate]
- "agents_gsd_phase_researcher_agent_step_2_5_runtime_state_inventory_rename_refactor_migration_phases_only": "Step 2.5: Runtime State Inventory (rename / refactor / migration phases only)" | kind=entity | source=.github/agents/gsd-phase-researcher.agent.md:L617 | neighbors=[gsd-phase-researcher.agent.md]
- "agents_gsd_phase_researcher_agent_step_2_6_environment_availability_audit": "Step 2.6: Environment Availability Audit" | kind=entity | source=.github/agents/gsd-phase-researcher.agent.md:L637 | neighbors=[gsd-phase-researcher.agent.md]
- "agents_gsd_phase_researcher_agent_step_2_ecosystem_specific_registry_verification": "Step 2 — Ecosystem-specific registry verification" | kind=entity | source=.github/agents/gsd-phase-researcher.agent.md:L215 | neighbors=[Package Legitimacy Gate]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-113.json

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
