# Node Description Batch 177 of 412

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

- "claude_agents_gsd_integration_checker_md_agents_gsd_integration_checker_step_3_verify_api_coverage": "Step 3: Verify API Coverage" | kind=entity | source=.claude/agents/gsd-integration-checker.md:L158 | neighbors=[gsd-integration-checker.md]
- "claude_agents_gsd_integration_checker_md_agents_gsd_integration_checker_step_4_verify_auth_protection": "Step 4: Verify Auth Protection" | kind=entity | source=.claude/agents/gsd-integration-checker.md:L205 | neighbors=[gsd-integration-checker.md]
- "claude_agents_gsd_integration_checker_md_agents_gsd_integration_checker_step_6_compile_integration_report": "Step 6: Compile Integration Report" | kind=entity | source=.claude/agents/gsd-integration-checker.md:L343 | neighbors=[gsd-integration-checker.md]
- "claude_agents_gsd_intel_updater_md_agents_gsd_intel_updater_anti_patterns": "Anti-Patterns" | kind=entity | source=.claude/agents/gsd-intel-updater.md:L332 | neighbors=[GSD Intel Updater]
- "claude_agents_gsd_intel_updater_md_agents_gsd_intel_updater_apis_json_api_surfaces": "apis.json -- API Surfaces" | kind=entity | source=.claude/agents/gsd-intel-updater.md:L131 | neighbors=[Intel File Schemas]
- "claude_agents_gsd_intel_updater_md_agents_gsd_intel_updater_arch_md_architecture_summary": "arch.md -- Architecture Summary" | kind=entity | source=.claude/agents/gsd-intel-updater.md:L184 | neighbors=[Intel File Schemas]
- "claude_agents_gsd_intel_updater_md_agents_gsd_intel_updater_config_gate": "Config Gate" | kind=entity | source=.claude/agents/gsd-intel-updater.md:L54 | neighbors=[Upstream Input]
- "claude_agents_gsd_intel_updater_md_agents_gsd_intel_updater_context_quality_tiers": "Context Quality Tiers" | kind=entity | source=.claude/agents/gsd-intel-updater.md:L319 | neighbors=[Completion Protocol]
- "claude_agents_gsd_intel_updater_md_agents_gsd_intel_updater_core_principle": "Core Principle" | kind=entity | source=.claude/agents/gsd-intel-updater.md:L34 | neighbors=[GSD Intel Updater]
- "claude_agents_gsd_intel_updater_md_agents_gsd_intel_updater_deps_json_dependency_chains": "deps.json -- Dependency Chains" | kind=entity | source=.claude/agents/gsd-intel-updater.md:L148 | neighbors=[Intel File Schemas]
- "claude_agents_gsd_intel_updater_md_agents_gsd_intel_updater_files_json_file_graph": "files.json -- File Graph" | kind=entity | source=.claude/agents/gsd-intel-updater.md:L112 | neighbors=[Intel File Schemas]
- "claude_agents_gsd_intel_updater_md_agents_gsd_intel_updater_forbidden_files": "Forbidden Files" | kind=entity | source=.claude/agents/gsd-intel-updater.md:L96 | neighbors=[GSD Intel Updater]
- "claude_agents_gsd_intel_updater_md_agents_gsd_intel_updater_from_gsd_map_codebase_query_command": "From `/gsd-map-codebase --query` Command" | kind=entity | source=.claude/agents/gsd-intel-updater.md:L48 | neighbors=[Upstream Input]
- "claude_agents_gsd_intel_updater_md_agents_gsd_intel_updater_output_budget": "Output Budget" | kind=entity | source=.claude/agents/gsd-intel-updater.md:L287 | neighbors=[GSD Intel Updater]
- "claude_agents_gsd_intel_updater_md_agents_gsd_intel_updater_partial_updates": "Partial Updates" | kind=entity | source=.claude/agents/gsd-intel-updater.md:L279 | neighbors=[GSD Intel Updater]
- "claude_agents_gsd_intel_updater_md_agents_gsd_intel_updater_project_scope": "Project Scope" | kind=entity | source=.claude/agents/gsd-intel-updater.md:L59 | neighbors=[GSD Intel Updater]
- "claude_agents_gsd_intel_updater_md_agents_gsd_intel_updater_stack_json_tech_stack": "stack.json -- Tech Stack" | kind=entity | source=.claude/agents/gsd-intel-updater.md:L167 | neighbors=[Intel File Schemas]
- "claude_agents_gsd_intel_updater_md_agents_gsd_intel_updater_step_1_orientation": "Step 1: Orientation" | kind=entity | source=.claude/agents/gsd-intel-updater.md:L212 | neighbors=[Exploration Process]
- "claude_agents_gsd_intel_updater_md_agents_gsd_intel_updater_step_2_stack_detection": "Step 2: Stack Detection" | kind=entity | source=.claude/agents/gsd-intel-updater.md:L219 | neighbors=[Exploration Process]
- "claude_agents_gsd_intel_updater_md_agents_gsd_intel_updater_step_3_file_graph": "Step 3: File Graph" | kind=entity | source=.claude/agents/gsd-intel-updater.md:L226 | neighbors=[Exploration Process]
- "claude_agents_gsd_intel_updater_md_agents_gsd_intel_updater_step_4_api_surface": "Step 4: API Surface" | kind=entity | source=.claude/agents/gsd-intel-updater.md:L237 | neighbors=[Exploration Process]
- "claude_agents_gsd_intel_updater_md_agents_gsd_intel_updater_step_5_dependencies": "Step 5: Dependencies" | kind=entity | source=.claude/agents/gsd-intel-updater.md:L246 | neighbors=[Exploration Process]
- "claude_agents_gsd_intel_updater_md_agents_gsd_intel_updater_step_6_5_self_check": "Step 6.5: Self-Check" | kind=entity | source=.claude/agents/gsd-intel-updater.md:L260 | neighbors=[Exploration Process]
- "claude_agents_gsd_intel_updater_md_agents_gsd_intel_updater_step_6_architecture": "Step 6: Architecture" | kind=entity | source=.claude/agents/gsd-intel-updater.md:L255 | neighbors=[Exploration Process]
- "claude_agents_gsd_intel_updater_md_agents_gsd_intel_updater_step_7_snapshot": "Step 7: Snapshot" | kind=entity | source=.claude/agents/gsd-intel-updater.md:L272 | neighbors=[Exploration Process]
- "claude_agents_gsd_nyquist_auditor_md_agents_gsd_nyquist_auditor_escalate": "ESCALATE" | kind=entity | source=.claude/agents/gsd-nyquist-auditor.md:L174 | neighbors=[gsd-nyquist-auditor.md]
- "claude_agents_gsd_nyquist_auditor_md_agents_gsd_nyquist_auditor_gaps_filled": "GAPS FILLED" | kind=entity | source=.claude/agents/gsd-nyquist-auditor.md:L130 | neighbors=[gsd-nyquist-auditor.md]
- "claude_agents_gsd_nyquist_auditor_md_agents_gsd_nyquist_auditor_partial": "PARTIAL" | kind=entity | source=.claude/agents/gsd-nyquist-auditor.md:L152 | neighbors=[gsd-nyquist-auditor.md]
- "claude_agents_gsd_pattern_mapper_md_agents_gsd_pattern_mapper_pattern_mapping_complete": "Pattern Mapping Complete" | kind=entity | source=.claude/agents/gsd-pattern-mapper.md:L279 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_pattern_mapper_md_agents_gsd_pattern_mapper_patterns_md_structure": "PATTERNS.md Structure" | kind=entity | source=.claude/agents/gsd-pattern-mapper.md:L162 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_pattern_mapper_md_agents_gsd_pattern_mapper_step_1_receive_scope_and_load_context": "Step 1: Receive Scope and Load Context" | kind=entity | source=.claude/agents/gsd-pattern-mapper.md:L79 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_pattern_mapper_md_agents_gsd_pattern_mapper_step_2_classify_files": "Step 2: Classify Files" | kind=entity | source=.claude/agents/gsd-pattern-mapper.md:L87 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_pattern_mapper_md_agents_gsd_pattern_mapper_step_3_find_closest_analogs": "Step 3: Find Closest Analogs" | kind=entity | source=.claude/agents/gsd-pattern-mapper.md:L96 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_pattern_mapper_md_agents_gsd_pattern_mapper_step_4_extract_patterns_from_analogs": "Step 4: Extract Patterns from Analogs" | kind=entity | source=.claude/agents/gsd-pattern-mapper.md:L120 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_pattern_mapper_md_agents_gsd_pattern_mapper_step_5_identify_shared_patterns": "Step 5: Identify Shared Patterns" | kind=entity | source=.claude/agents/gsd-pattern-mapper.md:L141 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_pattern_mapper_md_agents_gsd_pattern_mapper_step_6_write_patterns_md": "Step 6: Write PATTERNS.md" | kind=entity | source=.claude/agents/gsd-pattern-mapper.md:L150 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_pattern_mapper_md_agents_gsd_pattern_mapper_step_7_return_structured_result": "Step 7: Return Structured Result" | kind=entity | source=.claude/agents/gsd-pattern-mapper.md:L156 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_detect_test_infrastructure": "Detect Test Infrastructure" | kind=entity | source=.claude/agents/gsd-phase-researcher.md:L713 | neighbors=[Step 4: Validation Architecture Researc…]
- "claude_agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_identify_wave_0_gaps": "Identify Wave 0 Gaps" | kind=entity | source=.claude/agents/gsd-phase-researcher.md:L719 | neighbors=[Step 4: Validation Architecture Researc…]
- "claude_agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_map_requirements_to_tests": "Map Requirements to Tests" | kind=entity | source=.claude/agents/gsd-phase-researcher.md:L716 | neighbors=[Step 4: Validation Architecture Researc…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-176.json

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
