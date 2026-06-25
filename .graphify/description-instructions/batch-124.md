# Node Description Batch 125 of 412

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

- "agents_gsd_ui_researcher_agent_color": "Color" | kind=entity | source=.github/agents/gsd-ui-researcher.agent.md:L154 | neighbors=[What to Ask]
- "agents_gsd_ui_researcher_agent_copywriting": "Copywriting" | kind=entity | source=.github/agents/gsd-ui-researcher.agent.md:L160 | neighbors=[What to Ask]
- "agents_gsd_ui_researcher_agent_output_ui_spec_md": "Output: UI-SPEC.md" | kind=entity | source=.github/agents/gsd-ui-researcher.agent.md:L203 | neighbors=[gsd-ui-researcher.agent.md]
- "agents_gsd_ui_researcher_agent_registry_only_if_shadcn_initialized": "Registry (only if shadcn initialized)" | kind=entity | source=.github/agents/gsd-ui-researcher.agent.md:L166 | neighbors=[What to Ask]
- "agents_gsd_ui_researcher_agent_shadcn_initialization_gate": "shadcn Initialization Gate" | kind=entity | source=.github/agents/gsd-ui-researcher.agent.md:L117 | neighbors=[gsd-ui-researcher.agent.md]
- "agents_gsd_ui_researcher_agent_spacing": "Spacing" | kind=entity | source=.github/agents/gsd-ui-researcher.agent.md:L144 | neighbors=[What to Ask]
- "agents_gsd_ui_researcher_agent_step_1_load_context": "Step 1: Load Context" | kind=entity | source=.github/agents/gsd-ui-researcher.agent.md:L224 | neighbors=[gsd-ui-researcher.agent.md]
- "agents_gsd_ui_researcher_agent_step_2_scout_existing_ui": "Step 2: Scout Existing UI" | kind=entity | source=.github/agents/gsd-ui-researcher.agent.md:L231 | neighbors=[gsd-ui-researcher.agent.md]
- "agents_gsd_ui_researcher_agent_step_3_shadcn_gate": "Step 3: shadcn Gate" | kind=entity | source=.github/agents/gsd-ui-researcher.agent.md:L249 | neighbors=[gsd-ui-researcher.agent.md]
- "agents_gsd_ui_researcher_agent_step_4_design_contract_questions": "Step 4: Design Contract Questions" | kind=entity | source=.github/agents/gsd-ui-researcher.agent.md:L253 | neighbors=[gsd-ui-researcher.agent.md]
- "agents_gsd_ui_researcher_agent_step_5_compile_ui_spec_md": "Step 5: Compile UI-SPEC.md" | kind=entity | source=.github/agents/gsd-ui-researcher.agent.md:L262 | neighbors=[gsd-ui-researcher.agent.md]
- "agents_gsd_ui_researcher_agent_step_6_commit_optional": "Step 6: Commit (optional)" | kind=entity | source=.github/agents/gsd-ui-researcher.agent.md:L281 | neighbors=[gsd-ui-researcher.agent.md]
- "agents_gsd_ui_researcher_agent_step_7_return_structured_result": "Step 7: Return Structured Result" | kind=entity | source=.github/agents/gsd-ui-researcher.agent.md:L287 | neighbors=[gsd-ui-researcher.agent.md]
- "agents_gsd_ui_researcher_agent_tool_priority": "Tool Priority" | kind=entity | source=.github/agents/gsd-ui-researcher.agent.md:L85 | neighbors=[gsd-ui-researcher.agent.md]
- "agents_gsd_ui_researcher_agent_typography": "Typography" | kind=entity | source=.github/agents/gsd-ui-researcher.agent.md:L148 | neighbors=[What to Ask]
- "agents_gsd_ui_researcher_agent_ui_spec_blocked": "UI-SPEC Blocked" | kind=entity | source=.github/agents/gsd-ui-researcher.agent.md:L323 | neighbors=[gsd-ui-researcher.agent.md]
- "agents_gsd_ui_researcher_agent_ui_spec_complete": "UI-SPEC Complete" | kind=entity | source=.github/agents/gsd-ui-researcher.agent.md:L293 | neighbors=[gsd-ui-researcher.agent.md]
- "agents_gsd_ui_researcher_hooks": "hooks:" | kind=entity | source=.claude/agents/gsd-ui-researcher.md:L6 | neighbors=[gsd-ui-researcher.md]
- "agents_gsd_ui_researcher_matcher_write_edit": "- matcher: \"Write|Edit\"" | kind=entity | source=.claude/agents/gsd-ui-researcher.md:L8 | neighbors=[gsd-ui-researcher.md]
- "agents_gsd_ui_researcher_md_agents_gsd_ui_researcher_color": "Color" | kind=entity | source=agents/gsd-ui-researcher.md:L152 | neighbors=[What to Ask]
- "agents_gsd_ui_researcher_md_agents_gsd_ui_researcher_copywriting": "Copywriting" | kind=entity | source=agents/gsd-ui-researcher.md:L158 | neighbors=[What to Ask]
- "agents_gsd_ui_researcher_md_agents_gsd_ui_researcher_output_ui_spec_md": "Output: UI-SPEC.md" | kind=entity | source=agents/gsd-ui-researcher.md:L201 | neighbors=[gsd-ui-researcher.md]
- "agents_gsd_ui_researcher_md_agents_gsd_ui_researcher_registry_only_if_shadcn_initialized": "Registry (only if shadcn initialized)" | kind=entity | source=agents/gsd-ui-researcher.md:L164 | neighbors=[What to Ask]
- "agents_gsd_ui_researcher_md_agents_gsd_ui_researcher_shadcn_initialization_gate": "shadcn Initialization Gate" | kind=entity | source=agents/gsd-ui-researcher.md:L115 | neighbors=[gsd-ui-researcher.md]
- "agents_gsd_ui_researcher_md_agents_gsd_ui_researcher_spacing": "Spacing" | kind=entity | source=agents/gsd-ui-researcher.md:L142 | neighbors=[What to Ask]
- "agents_gsd_ui_researcher_md_agents_gsd_ui_researcher_step_1_load_context": "Step 1: Load Context" | kind=entity | source=agents/gsd-ui-researcher.md:L222 | neighbors=[gsd-ui-researcher.md]
- "agents_gsd_ui_researcher_md_agents_gsd_ui_researcher_step_2_scout_existing_ui": "Step 2: Scout Existing UI" | kind=entity | source=agents/gsd-ui-researcher.md:L229 | neighbors=[gsd-ui-researcher.md]
- "agents_gsd_ui_researcher_md_agents_gsd_ui_researcher_step_3_shadcn_gate": "Step 3: shadcn Gate" | kind=entity | source=agents/gsd-ui-researcher.md:L247 | neighbors=[gsd-ui-researcher.md]
- "agents_gsd_ui_researcher_md_agents_gsd_ui_researcher_step_4_design_contract_questions": "Step 4: Design Contract Questions" | kind=entity | source=agents/gsd-ui-researcher.md:L251 | neighbors=[gsd-ui-researcher.md]
- "agents_gsd_ui_researcher_md_agents_gsd_ui_researcher_step_5_compile_ui_spec_md": "Step 5: Compile UI-SPEC.md" | kind=entity | source=agents/gsd-ui-researcher.md:L260 | neighbors=[gsd-ui-researcher.md]
- "agents_gsd_ui_researcher_md_agents_gsd_ui_researcher_step_6_commit_optional": "Step 6: Commit (optional)" | kind=entity | source=agents/gsd-ui-researcher.md:L279 | neighbors=[gsd-ui-researcher.md]
- "agents_gsd_ui_researcher_md_agents_gsd_ui_researcher_step_7_return_structured_result": "Step 7: Return Structured Result" | kind=entity | source=agents/gsd-ui-researcher.md:L285 | neighbors=[gsd-ui-researcher.md]
- "agents_gsd_ui_researcher_md_agents_gsd_ui_researcher_tool_priority": "Tool Priority" | kind=entity | source=agents/gsd-ui-researcher.md:L83 | neighbors=[gsd-ui-researcher.md]
- "agents_gsd_ui_researcher_md_agents_gsd_ui_researcher_typography": "Typography" | kind=entity | source=agents/gsd-ui-researcher.md:L146 | neighbors=[What to Ask]
- "agents_gsd_ui_researcher_md_agents_gsd_ui_researcher_ui_spec_blocked": "UI-SPEC Blocked" | kind=entity | source=agents/gsd-ui-researcher.md:L321 | neighbors=[gsd-ui-researcher.md]
- "agents_gsd_ui_researcher_md_agents_gsd_ui_researcher_ui_spec_complete": "UI-SPEC Complete" | kind=entity | source=agents/gsd-ui-researcher.md:L291 | neighbors=[gsd-ui-researcher.md]
- "agents_gsd_ui_researcher_posttooluse": "PostToolUse:" | kind=entity | source=.claude/agents/gsd-ui-researcher.md:L7 | neighbors=[gsd-ui-researcher.md]
- "agents_gsd_ui_researcher_type_command": "- type: command" | kind=entity | source=.claude/agents/gsd-ui-researcher.md:L10 | neighbors=[gsd-ui-researcher.md]
- "agents_gsd_verifier_agent_api_route_stubs": "API Route Stubs" | kind=entity | source=.github/agents/gsd-verifier.agent.md:L865 | neighbors=[gsd-verifier.agent.md]
- "agents_gsd_verifier_agent_create_verification_md": "Create VERIFICATION.md" | kind=entity | source=.github/agents/gsd-verifier.agent.md:L673 | neighbors=[gsd-verifier.agent.md]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-124.json

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
