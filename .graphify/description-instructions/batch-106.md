# Node Description Batch 107 of 412

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
LANGUAGE: each entry has a `lang=` marker giving the language of its source.
Write that entry's description in EXACTLY that language. Do not translate to
a single common language — match each node's source language individually.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "agents_gsd_codebase_mapper_agent_concerns_md_template_concerns_focus": "CONCERNS.md Template (concerns focus)" | kind=entity | source=.github/agents/gsd-codebase-mapper.agent.md:L721 | neighbors=[gsd-codebase-mapper.agent.md] | lang=en
- "agents_gsd_codebase_mapper_agent_conventions_md_template_quality_focus": "CONVENTIONS.md Template (quality focus)" | kind=entity | source=.github/agents/gsd-codebase-mapper.agent.md:L531 | neighbors=[gsd-codebase-mapper.agent.md] | lang=en
- "agents_gsd_codebase_mapper_agent_integrations_md_template_tech_focus": "INTEGRATIONS.md Template (tech focus)" | kind=entity | source=.github/agents/gsd-codebase-mapper.agent.md:L264 | neighbors=[gsd-codebase-mapper.agent.md] | lang=en
- "agents_gsd_codebase_mapper_agent_stack_md_template_tech_focus": "STACK.md Template (tech focus)" | kind=entity | source=.github/agents/gsd-codebase-mapper.agent.md:L199 | neighbors=[gsd-codebase-mapper.agent.md] | lang=en
- "agents_gsd_codebase_mapper_agent_structure_md_template_arch_focus": "STRUCTURE.md Template (arch focus)" | kind=entity | source=.github/agents/gsd-codebase-mapper.agent.md:L462 | neighbors=[gsd-codebase-mapper.agent.md] | lang=en
- "agents_gsd_codebase_mapper_agent_testing_md_template_quality_focus": "TESTING.md Template (quality focus)" | kind=entity | source=.github/agents/gsd-codebase-mapper.agent.md:L611 | neighbors=[gsd-codebase-mapper.agent.md] | lang=en
- "agents_gsd_codebase_mapper_hooks": "hooks:" | kind=entity | source=.claude/agents/gsd-codebase-mapper.md:L6 | neighbors=[gsd-codebase-mapper.md] | lang=en
- "agents_gsd_codebase_mapper_matcher_write_edit": "- matcher: \"Write|Edit\"" | kind=entity | source=.claude/agents/gsd-codebase-mapper.md:L8 | neighbors=[gsd-codebase-mapper.md] | lang=en
- "agents_gsd_codebase_mapper_md_agents_gsd_codebase_mapper_architecture_md_template_arch_focus": "ARCHITECTURE.md Template (arch focus)" | kind=entity | source=agents/gsd-codebase-mapper.md:L332 | neighbors=[gsd-codebase-mapper.md] | lang=en
- "agents_gsd_codebase_mapper_md_agents_gsd_codebase_mapper_concerns_md_template_concerns_focus": "CONCERNS.md Template (concerns focus)" | kind=entity | source=agents/gsd-codebase-mapper.md:L719 | neighbors=[gsd-codebase-mapper.md] | lang=en
- "agents_gsd_codebase_mapper_md_agents_gsd_codebase_mapper_conventions_md_template_quality_focus": "CONVENTIONS.md Template (quality focus)" | kind=entity | source=agents/gsd-codebase-mapper.md:L529 | neighbors=[gsd-codebase-mapper.md] | lang=en
- "agents_gsd_codebase_mapper_md_agents_gsd_codebase_mapper_integrations_md_template_tech_focus": "INTEGRATIONS.md Template (tech focus)" | kind=entity | source=agents/gsd-codebase-mapper.md:L262 | neighbors=[gsd-codebase-mapper.md] | lang=en
- "agents_gsd_codebase_mapper_md_agents_gsd_codebase_mapper_stack_md_template_tech_focus": "STACK.md Template (tech focus)" | kind=entity | source=agents/gsd-codebase-mapper.md:L197 | neighbors=[gsd-codebase-mapper.md] | lang=en
- "agents_gsd_codebase_mapper_md_agents_gsd_codebase_mapper_structure_md_template_arch_focus": "STRUCTURE.md Template (arch focus)" | kind=entity | source=agents/gsd-codebase-mapper.md:L460 | neighbors=[gsd-codebase-mapper.md] | lang=en
- "agents_gsd_codebase_mapper_md_agents_gsd_codebase_mapper_testing_md_template_quality_focus": "TESTING.md Template (quality focus)" | kind=entity | source=agents/gsd-codebase-mapper.md:L609 | neighbors=[gsd-codebase-mapper.md] | lang=en
- "agents_gsd_codebase_mapper_posttooluse": "PostToolUse:" | kind=entity | source=.claude/agents/gsd-codebase-mapper.md:L7 | neighbors=[gsd-codebase-mapper.md] | lang=en
- "agents_gsd_codebase_mapper_type_command": "- type: command" | kind=entity | source=.claude/agents/gsd-codebase-mapper.md:L10 | neighbors=[gsd-codebase-mapper.md] | lang=en
- "agents_gsd_debug_session_manager_agent_3a_root_cause_found": "3a. ROOT CAUSE FOUND" | kind=entity | source=.github/agents/gsd-debug-session-manager.agent.md:L98 | neighbors=[Step 3: Handle Agent Return] | lang=pt
- "agents_gsd_debug_session_manager_agent_3b_tdd_checkpoint": "3b. TDD CHECKPOINT" | kind=entity | source=.github/agents/gsd-debug-session-manager.agent.md:L170 | neighbors=[Step 3: Handle Agent Return] | lang=en
- "agents_gsd_debug_session_manager_agent_3c_debug_complete": "3c. DEBUG COMPLETE" | kind=entity | source=.github/agents/gsd-debug-session-manager.agent.md:L191 | neighbors=[Step 3: Handle Agent Return] | lang=en
- "agents_gsd_debug_session_manager_agent_3d_checkpoint_reached": "3d. CHECKPOINT REACHED" | kind=entity | source=.github/agents/gsd-debug-session-manager.agent.md:L195 | neighbors=[Step 3: Handle Agent Return] | lang=en
- "agents_gsd_debug_session_manager_agent_3e_investigation_inconclusive": "3e. INVESTIGATION INCONCLUSIVE" | kind=entity | source=.github/agents/gsd-debug-session-manager.agent.md:L245 | neighbors=[Step 3: Handle Agent Return] | lang=en
- "agents_gsd_debug_session_manager_agent_step_1_read_debug_file": "Step 1: Read Debug File" | kind=entity | source=.github/agents/gsd-debug-session-manager.agent.md:L35 | neighbors=[gsd-debug-session-manager.agent.md] | lang=en
- "agents_gsd_debug_session_manager_agent_step_2_spawn_gsd_debugger_agent": "Step 2: Spawn gsd-debugger Agent" | kind=entity | source=.github/agents/gsd-debug-session-manager.agent.md:L51 | neighbors=[gsd-debug-session-manager.agent.md] | lang=en
- "agents_gsd_debug_session_manager_agent_step_4_return_compact_summary": "Step 4: Return Compact Summary" | kind=entity | source=.github/agents/gsd-debug-session-manager.agent.md:L267 | neighbors=[gsd-debug-session-manager.agent.md] | lang=en
- "agents_gsd_debug_session_manager_hooks": "hooks:" | kind=entity | source=.claude/agents/gsd-debug-session-manager.md:L6 | neighbors=[gsd-debug-session-manager.md] | lang=en
- "agents_gsd_debug_session_manager_matcher_write_edit": "- matcher: \"Write|Edit\"" | kind=entity | source=.claude/agents/gsd-debug-session-manager.md:L8 | neighbors=[gsd-debug-session-manager.md] | lang=en
- "agents_gsd_debug_session_manager_md_agents_gsd_debug_session_manager_3a_root_cause_found": "3a. ROOT CAUSE FOUND" | kind=entity | source=agents/gsd-debug-session-manager.md:L96 | neighbors=[Step 3: Handle Agent Return] | lang=pt
- "agents_gsd_debug_session_manager_md_agents_gsd_debug_session_manager_3b_tdd_checkpoint": "3b. TDD CHECKPOINT" | kind=entity | source=agents/gsd-debug-session-manager.md:L168 | neighbors=[Step 3: Handle Agent Return] | lang=en
- "agents_gsd_debug_session_manager_md_agents_gsd_debug_session_manager_3c_debug_complete": "3c. DEBUG COMPLETE" | kind=entity | source=agents/gsd-debug-session-manager.md:L189 | neighbors=[Step 3: Handle Agent Return] | lang=en
- "agents_gsd_debug_session_manager_md_agents_gsd_debug_session_manager_3d_checkpoint_reached": "3d. CHECKPOINT REACHED" | kind=entity | source=agents/gsd-debug-session-manager.md:L193 | neighbors=[Step 3: Handle Agent Return] | lang=en
- "agents_gsd_debug_session_manager_md_agents_gsd_debug_session_manager_3e_investigation_inconclusive": "3e. INVESTIGATION INCONCLUSIVE" | kind=entity | source=agents/gsd-debug-session-manager.md:L243 | neighbors=[Step 3: Handle Agent Return] | lang=en
- "agents_gsd_debug_session_manager_md_agents_gsd_debug_session_manager_step_1_read_debug_file": "Step 1: Read Debug File" | kind=entity | source=agents/gsd-debug-session-manager.md:L33 | neighbors=[gsd-debug-session-manager.md] | lang=en
- "agents_gsd_debug_session_manager_md_agents_gsd_debug_session_manager_step_2_spawn_gsd_debugger_agent": "Step 2: Spawn gsd-debugger Agent" | kind=entity | source=agents/gsd-debug-session-manager.md:L49 | neighbors=[gsd-debug-session-manager.md] | lang=en
- "agents_gsd_debug_session_manager_md_agents_gsd_debug_session_manager_step_4_return_compact_summary": "Step 4: Return Compact Summary" | kind=entity | source=agents/gsd-debug-session-manager.md:L265 | neighbors=[gsd-debug-session-manager.md] | lang=en
- "agents_gsd_debug_session_manager_posttooluse": "PostToolUse:" | kind=entity | source=.claude/agents/gsd-debug-session-manager.md:L7 | neighbors=[gsd-debug-session-manager.md] | lang=en
- "agents_gsd_debug_session_manager_type_command": "- type: command" | kind=entity | source=.claude/agents/gsd-debug-session-manager.md:L10 | neighbors=[gsd-debug-session-manager.md] | lang=en
- "agents_gsd_debugger_agent_after_checkpoint": "After Checkpoint" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L1278 | neighbors=[gsd-debugger.agent.md] | lang=en
- "agents_gsd_debugger_agent_balance_research_and_reasoning": "Balance Research and Reasoning" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L708 | neighbors=[gsd-debugger.agent.md] | lang=en
- "agents_gsd_debugger_agent_binary_search_divide_and_conquer": "Binary Search / Divide and Conquer" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L164 | neighbors=[gsd-debugger.agent.md] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-106.json

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
