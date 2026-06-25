# Node Description Batch 113 of 412

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

- "agents_gsd_intel_updater_agent_apis_json_api_surfaces": "apis.json -- API Surfaces" | kind=entity | source=.github/agents/gsd-intel-updater.agent.md:L130 | neighbors=[Intel File Schemas]
- "agents_gsd_intel_updater_agent_arch_md_architecture_summary": "arch.md -- Architecture Summary" | kind=entity | source=.github/agents/gsd-intel-updater.agent.md:L183 | neighbors=[Intel File Schemas]
- "agents_gsd_intel_updater_agent_config_gate": "Config Gate" | kind=entity | source=.github/agents/gsd-intel-updater.agent.md:L53 | neighbors=[Upstream Input]
- "agents_gsd_intel_updater_agent_context_quality_tiers": "Context Quality Tiers" | kind=entity | source=.github/agents/gsd-intel-updater.agent.md:L318 | neighbors=[Completion Protocol]
- "agents_gsd_intel_updater_agent_core_principle": "Core Principle" | kind=entity | source=.github/agents/gsd-intel-updater.agent.md:L33 | neighbors=[GSD Intel Updater]
- "agents_gsd_intel_updater_agent_deps_json_dependency_chains": "deps.json -- Dependency Chains" | kind=entity | source=.github/agents/gsd-intel-updater.agent.md:L147 | neighbors=[Intel File Schemas]
- "agents_gsd_intel_updater_agent_files_json_file_graph": "files.json -- File Graph" | kind=entity | source=.github/agents/gsd-intel-updater.agent.md:L111 | neighbors=[Intel File Schemas]
- "agents_gsd_intel_updater_agent_forbidden_files": "Forbidden Files" | kind=entity | source=.github/agents/gsd-intel-updater.agent.md:L95 | neighbors=[GSD Intel Updater]
- "agents_gsd_intel_updater_agent_from_gsd_map_codebase_query_command": "From `/gsd-map-codebase --query` Command" | kind=entity | source=.github/agents/gsd-intel-updater.agent.md:L47 | neighbors=[Upstream Input]
- "agents_gsd_intel_updater_agent_output_budget": "Output Budget" | kind=entity | source=.github/agents/gsd-intel-updater.agent.md:L286 | neighbors=[GSD Intel Updater]
- "agents_gsd_intel_updater_agent_partial_updates": "Partial Updates" | kind=entity | source=.github/agents/gsd-intel-updater.agent.md:L278 | neighbors=[GSD Intel Updater]
- "agents_gsd_intel_updater_agent_project_scope": "Project Scope" | kind=entity | source=.github/agents/gsd-intel-updater.agent.md:L58 | neighbors=[GSD Intel Updater]
- "agents_gsd_intel_updater_agent_stack_json_tech_stack": "stack.json -- Tech Stack" | kind=entity | source=.github/agents/gsd-intel-updater.agent.md:L166 | neighbors=[Intel File Schemas]
- "agents_gsd_intel_updater_agent_step_1_orientation": "Step 1: Orientation" | kind=entity | source=.github/agents/gsd-intel-updater.agent.md:L211 | neighbors=[Exploration Process]
- "agents_gsd_intel_updater_agent_step_2_stack_detection": "Step 2: Stack Detection" | kind=entity | source=.github/agents/gsd-intel-updater.agent.md:L218 | neighbors=[Exploration Process]
- "agents_gsd_intel_updater_agent_step_3_file_graph": "Step 3: File Graph" | kind=entity | source=.github/agents/gsd-intel-updater.agent.md:L225 | neighbors=[Exploration Process]
- "agents_gsd_intel_updater_agent_step_4_api_surface": "Step 4: API Surface" | kind=entity | source=.github/agents/gsd-intel-updater.agent.md:L236 | neighbors=[Exploration Process]
- "agents_gsd_intel_updater_agent_step_5_dependencies": "Step 5: Dependencies" | kind=entity | source=.github/agents/gsd-intel-updater.agent.md:L245 | neighbors=[Exploration Process]
- "agents_gsd_intel_updater_agent_step_6_5_self_check": "Step 6.5: Self-Check" | kind=entity | source=.github/agents/gsd-intel-updater.agent.md:L259 | neighbors=[Exploration Process]
- "agents_gsd_intel_updater_agent_step_6_architecture": "Step 6: Architecture" | kind=entity | source=.github/agents/gsd-intel-updater.agent.md:L254 | neighbors=[Exploration Process]
- "agents_gsd_intel_updater_agent_step_7_snapshot": "Step 7: Snapshot" | kind=entity | source=.github/agents/gsd-intel-updater.agent.md:L271 | neighbors=[Exploration Process]
- "agents_gsd_intel_updater_hooks": "hooks:" | kind=entity | source=.claude/agents/gsd-intel-updater.md:L6 | neighbors=[gsd-intel-updater.md]
- "agents_gsd_intel_updater_md_agents_gsd_intel_updater_apis_json_api_surfaces": "apis.json -- API Surfaces" | kind=entity | source=agents/gsd-intel-updater.md:L128 | neighbors=[Intel File Schemas]
- "agents_gsd_intel_updater_md_agents_gsd_intel_updater_arch_md_architecture_summary": "arch.md -- Architecture Summary" | kind=entity | source=agents/gsd-intel-updater.md:L181 | neighbors=[Intel File Schemas]
- "agents_gsd_intel_updater_md_agents_gsd_intel_updater_completion_protocol": "Completion Protocol" | kind=entity | source=agents/gsd-intel-updater.md:L305 | neighbors=[Context Quality Tiers]
- "agents_gsd_intel_updater_md_agents_gsd_intel_updater_config_gate": "Config Gate" | kind=entity | source=agents/gsd-intel-updater.md:L51 | neighbors=[Upstream Input]
- "agents_gsd_intel_updater_md_agents_gsd_intel_updater_context_quality_tiers": "Context Quality Tiers" | kind=entity | source=agents/gsd-intel-updater.md:L316 | neighbors=[Completion Protocol]
- "agents_gsd_intel_updater_md_agents_gsd_intel_updater_deps_json_dependency_chains": "deps.json -- Dependency Chains" | kind=entity | source=agents/gsd-intel-updater.md:L145 | neighbors=[Intel File Schemas]
- "agents_gsd_intel_updater_md_agents_gsd_intel_updater_files_json_file_graph": "files.json -- File Graph" | kind=entity | source=agents/gsd-intel-updater.md:L109 | neighbors=[Intel File Schemas]
- "agents_gsd_intel_updater_md_agents_gsd_intel_updater_from_gsd_map_codebase_query_command": "From `/gsd:map-codebase --query` Command" | kind=entity | source=agents/gsd-intel-updater.md:L45 | neighbors=[Upstream Input]
- "agents_gsd_intel_updater_md_agents_gsd_intel_updater_stack_json_tech_stack": "stack.json -- Tech Stack" | kind=entity | source=agents/gsd-intel-updater.md:L164 | neighbors=[Intel File Schemas]
- "agents_gsd_intel_updater_md_agents_gsd_intel_updater_step_1_orientation": "Step 1: Orientation" | kind=entity | source=agents/gsd-intel-updater.md:L209 | neighbors=[Exploration Process]
- "agents_gsd_intel_updater_md_agents_gsd_intel_updater_step_2_stack_detection": "Step 2: Stack Detection" | kind=entity | source=agents/gsd-intel-updater.md:L216 | neighbors=[Exploration Process]
- "agents_gsd_intel_updater_md_agents_gsd_intel_updater_step_3_file_graph": "Step 3: File Graph" | kind=entity | source=agents/gsd-intel-updater.md:L223 | neighbors=[Exploration Process]
- "agents_gsd_intel_updater_md_agents_gsd_intel_updater_step_4_api_surface": "Step 4: API Surface" | kind=entity | source=agents/gsd-intel-updater.md:L234 | neighbors=[Exploration Process]
- "agents_gsd_intel_updater_md_agents_gsd_intel_updater_step_5_dependencies": "Step 5: Dependencies" | kind=entity | source=agents/gsd-intel-updater.md:L243 | neighbors=[Exploration Process]
- "agents_gsd_intel_updater_md_agents_gsd_intel_updater_step_6_5_self_check": "Step 6.5: Self-Check" | kind=entity | source=agents/gsd-intel-updater.md:L257 | neighbors=[Exploration Process]
- "agents_gsd_intel_updater_md_agents_gsd_intel_updater_step_6_architecture": "Step 6: Architecture" | kind=entity | source=agents/gsd-intel-updater.md:L252 | neighbors=[Exploration Process]
- "agents_gsd_intel_updater_md_agents_gsd_intel_updater_step_7_snapshot": "Step 7: Snapshot" | kind=entity | source=agents/gsd-intel-updater.md:L269 | neighbors=[Exploration Process]
- "agents_gsd_nyquist_auditor_agent_escalate": "ESCALATE" | kind=entity | source=.github/agents/gsd-nyquist-auditor.agent.md:L168 | neighbors=[gsd-nyquist-auditor.agent.md]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-112.json

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
