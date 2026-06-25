# Node Description Batch 120 of 412

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

- "agents_gsd_project_researcher_agent_feasibility_md_feasibility_mode_only": "FEASIBILITY.md (feasibility mode only)" | kind=entity | source=.github/agents/gsd-project-researcher.agent.md:L433 | neighbors=[gsd-project-researcher.agent.md] | lang=en
- "agents_gsd_project_researcher_agent_features_md": "FEATURES.md" | kind=entity | source=.github/agents/gsd-project-researcher.agent.md:L248 | neighbors=[gsd-project-researcher.agent.md] | lang=en
- "agents_gsd_project_researcher_agent_pitfalls_md": "PITFALLS.md" | kind=entity | source=.github/agents/gsd-project-researcher.agent.md:L350 | neighbors=[gsd-project-researcher.agent.md] | lang=en
- "agents_gsd_project_researcher_agent_research_blocked": "Research Blocked" | kind=entity | source=.github/agents/gsd-project-researcher.agent.md:L564 | neighbors=[gsd-project-researcher.agent.md] | lang=en
- "agents_gsd_project_researcher_agent_research_complete": "Research Complete" | kind=entity | source=.github/agents/gsd-project-researcher.agent.md:L523 | neighbors=[gsd-project-researcher.agent.md] | lang=en
- "agents_gsd_project_researcher_agent_stack_md": "STACK.md" | kind=entity | source=.github/agents/gsd-project-researcher.agent.md:L197 | neighbors=[gsd-project-researcher.agent.md] | lang=en
- "agents_gsd_project_researcher_agent_step_1_receive_research_scope": "Step 1: Receive Research Scope" | kind=entity | source=.github/agents/gsd-project-researcher.agent.md:L470 | neighbors=[gsd-project-researcher.agent.md] | lang=en
- "agents_gsd_project_researcher_agent_step_2_identify_research_domains": "Step 2: Identify Research Domains" | kind=entity | source=.github/agents/gsd-project-researcher.agent.md:L474 | neighbors=[gsd-project-researcher.agent.md] | lang=en
- "agents_gsd_project_researcher_agent_step_3_execute_research": "Step 3: Execute Research" | kind=entity | source=.github/agents/gsd-project-researcher.agent.md:L481 | neighbors=[gsd-project-researcher.agent.md] | lang=en
- "agents_gsd_project_researcher_agent_step_4_quality_check": "Step 4: Quality Check" | kind=entity | source=.github/agents/gsd-project-researcher.agent.md:L485 | neighbors=[gsd-project-researcher.agent.md] | lang=en
- "agents_gsd_project_researcher_agent_step_5_write_output_files": "Step 5: Write Output Files" | kind=entity | source=.github/agents/gsd-project-researcher.agent.md:L489 | neighbors=[gsd-project-researcher.agent.md] | lang=en
- "agents_gsd_project_researcher_agent_step_6_return_structured_result": "Step 6: Return Structured Result" | kind=entity | source=.github/agents/gsd-project-researcher.agent.md:L515 | neighbors=[gsd-project-researcher.agent.md] | lang=en
- "agents_gsd_project_researcher_agent_step_a_build_a_research_plan_input_file": "Step A — Build a research-plan input file" | kind=entity | source=.github/agents/gsd-project-researcher.agent.md:L54 | neighbors=[Research Plan via Code Seam] | lang=pt
- "agents_gsd_project_researcher_agent_step_b_obtain_the_fetch_plan": "Step B — Obtain the fetch plan" | kind=entity | source=.github/agents/gsd-project-researcher.agent.md:L71 | neighbors=[Research Plan via Code Seam] | lang=en
- "agents_gsd_project_researcher_agent_step_c_execute_the_indicated_fetch": "Step C — Execute the indicated fetch" | kind=entity | source=.github/agents/gsd-project-researcher.agent.md:L83 | neighbors=[Research Plan via Code Seam] | lang=en
- "agents_gsd_project_researcher_agent_step_d_cache_each_digest": "Step D — Cache each digest" | kind=entity | source=.github/agents/gsd-project-researcher.agent.md:L104 | neighbors=[Research Plan via Code Seam] | lang=en
- "agents_gsd_project_researcher_agent_summary_md": "SUMMARY.md" | kind=entity | source=.github/agents/gsd-project-researcher.agent.md:L145 | neighbors=[gsd-project-researcher.agent.md] | lang=en
- "agents_gsd_project_researcher_hooks": "hooks:" | kind=entity | source=.claude/agents/gsd-project-researcher.md:L6 | neighbors=[gsd-project-researcher.md] | lang=en
- "agents_gsd_project_researcher_matcher_write_edit": "- matcher: \"Write|Edit\"" | kind=entity | source=.claude/agents/gsd-project-researcher.md:L8 | neighbors=[gsd-project-researcher.md] | lang=en
- "agents_gsd_project_researcher_md_agents_gsd_project_researcher_architecture_md": "ARCHITECTURE.md" | kind=entity | source=agents/gsd-project-researcher.md:L298 | neighbors=[gsd-project-researcher.md] | lang=en
- "agents_gsd_project_researcher_md_agents_gsd_project_researcher_comparison_md_comparison_mode_only": "COMPARISON.md (comparison mode only)" | kind=entity | source=agents/gsd-project-researcher.md:L390 | neighbors=[gsd-project-researcher.md] | lang=en
- "agents_gsd_project_researcher_md_agents_gsd_project_researcher_feasibility_md_feasibility_mode_only": "FEASIBILITY.md (feasibility mode only)" | kind=entity | source=agents/gsd-project-researcher.md:L431 | neighbors=[gsd-project-researcher.md] | lang=en
- "agents_gsd_project_researcher_md_agents_gsd_project_researcher_features_md": "FEATURES.md" | kind=entity | source=agents/gsd-project-researcher.md:L246 | neighbors=[gsd-project-researcher.md] | lang=en
- "agents_gsd_project_researcher_md_agents_gsd_project_researcher_pitfalls_md": "PITFALLS.md" | kind=entity | source=agents/gsd-project-researcher.md:L348 | neighbors=[gsd-project-researcher.md] | lang=en
- "agents_gsd_project_researcher_md_agents_gsd_project_researcher_research_blocked": "Research Blocked" | kind=entity | source=agents/gsd-project-researcher.md:L562 | neighbors=[gsd-project-researcher.md] | lang=en
- "agents_gsd_project_researcher_md_agents_gsd_project_researcher_research_complete": "Research Complete" | kind=entity | source=agents/gsd-project-researcher.md:L521 | neighbors=[gsd-project-researcher.md] | lang=en
- "agents_gsd_project_researcher_md_agents_gsd_project_researcher_stack_md": "STACK.md" | kind=entity | source=agents/gsd-project-researcher.md:L195 | neighbors=[gsd-project-researcher.md] | lang=en
- "agents_gsd_project_researcher_md_agents_gsd_project_researcher_step_1_receive_research_scope": "Step 1: Receive Research Scope" | kind=entity | source=agents/gsd-project-researcher.md:L468 | neighbors=[gsd-project-researcher.md] | lang=en
- "agents_gsd_project_researcher_md_agents_gsd_project_researcher_step_2_identify_research_domains": "Step 2: Identify Research Domains" | kind=entity | source=agents/gsd-project-researcher.md:L472 | neighbors=[gsd-project-researcher.md] | lang=en
- "agents_gsd_project_researcher_md_agents_gsd_project_researcher_step_3_execute_research": "Step 3: Execute Research" | kind=entity | source=agents/gsd-project-researcher.md:L479 | neighbors=[gsd-project-researcher.md] | lang=en
- "agents_gsd_project_researcher_md_agents_gsd_project_researcher_step_4_quality_check": "Step 4: Quality Check" | kind=entity | source=agents/gsd-project-researcher.md:L483 | neighbors=[gsd-project-researcher.md] | lang=en
- "agents_gsd_project_researcher_md_agents_gsd_project_researcher_step_5_write_output_files": "Step 5: Write Output Files" | kind=entity | source=agents/gsd-project-researcher.md:L487 | neighbors=[gsd-project-researcher.md] | lang=en
- "agents_gsd_project_researcher_md_agents_gsd_project_researcher_step_6_return_structured_result": "Step 6: Return Structured Result" | kind=entity | source=agents/gsd-project-researcher.md:L513 | neighbors=[gsd-project-researcher.md] | lang=en
- "agents_gsd_project_researcher_md_agents_gsd_project_researcher_step_a_build_a_research_plan_input_file": "Step A — Build a research-plan input file" | kind=entity | source=agents/gsd-project-researcher.md:L52 | neighbors=[Research Plan via Code Seam] | lang=pt
- "agents_gsd_project_researcher_md_agents_gsd_project_researcher_step_b_obtain_the_fetch_plan": "Step B — Obtain the fetch plan" | kind=entity | source=agents/gsd-project-researcher.md:L69 | neighbors=[Research Plan via Code Seam] | lang=en
- "agents_gsd_project_researcher_md_agents_gsd_project_researcher_step_c_execute_the_indicated_fetch": "Step C — Execute the indicated fetch" | kind=entity | source=agents/gsd-project-researcher.md:L81 | neighbors=[Research Plan via Code Seam] | lang=en
- "agents_gsd_project_researcher_md_agents_gsd_project_researcher_step_d_cache_each_digest": "Step D — Cache each digest" | kind=entity | source=agents/gsd-project-researcher.md:L102 | neighbors=[Research Plan via Code Seam] | lang=en
- "agents_gsd_project_researcher_md_agents_gsd_project_researcher_summary_md": "SUMMARY.md" | kind=entity | source=agents/gsd-project-researcher.md:L143 | neighbors=[gsd-project-researcher.md] | lang=en
- "agents_gsd_project_researcher_posttooluse": "PostToolUse:" | kind=entity | source=.claude/agents/gsd-project-researcher.md:L7 | neighbors=[gsd-project-researcher.md] | lang=en
- "agents_gsd_project_researcher_type_command": "- type: command" | kind=entity | source=.claude/agents/gsd-project-researcher.md:L10 | neighbors=[gsd-project-researcher.md] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-119.json

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
