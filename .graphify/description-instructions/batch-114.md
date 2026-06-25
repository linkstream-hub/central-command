# Node Description Batch 115 of 412

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

- "agents_gsd_phase_researcher_agent_step_2_identify_research_domains": "Step 2: Identify Research Domains" | kind=entity | source=.github/agents/gsd-phase-researcher.agent.md:L607 | neighbors=[gsd-phase-researcher.agent.md] | lang=en
- "agents_gsd_phase_researcher_agent_step_3_check_for_suspicious_postinstall_scripts_node_js_phases": "Step 3 — Check for suspicious postinstall scripts (Node.js phases)" | kind=entity | source=.github/agents/gsd-phase-researcher.agent.md:L233 | neighbors=[Package Legitimacy Gate] | lang=en
- "agents_gsd_phase_researcher_agent_step_3_execute_research_protocol": "Step 3: Execute Research Protocol" | kind=entity | source=.github/agents/gsd-phase-researcher.agent.md:L699 | neighbors=[gsd-phase-researcher.agent.md] | lang=en
- "agents_gsd_phase_researcher_agent_step_5_quality_check": "Step 5: Quality Check" | kind=entity | source=.github/agents/gsd-phase-researcher.agent.md:L716 | neighbors=[gsd-phase-researcher.agent.md] | lang=en
- "agents_gsd_phase_researcher_agent_step_6_write_research_md": "Step 6: Write RESEARCH.md" | kind=entity | source=.github/agents/gsd-phase-researcher.agent.md:L724 | neighbors=[gsd-phase-researcher.agent.md] | lang=en
- "agents_gsd_phase_researcher_agent_step_7_commit_research_optional": "Step 7: Commit Research (optional)" | kind=entity | source=.github/agents/gsd-phase-researcher.agent.md:L776 | neighbors=[gsd-phase-researcher.agent.md] | lang=en
- "agents_gsd_phase_researcher_agent_step_8_return_structured_result": "Step 8: Return Structured Result" | kind=entity | source=.github/agents/gsd-phase-researcher.agent.md:L782 | neighbors=[gsd-phase-researcher.agent.md] | lang=en
- "agents_gsd_phase_researcher_agent_step_a_build_a_research_plan_input_file": "Step A — Build a research-plan input file" | kind=entity | source=.github/agents/gsd-phase-researcher.agent.md:L88 | neighbors=[Research Plan via Code Seam] | lang=pt
- "agents_gsd_phase_researcher_agent_step_b_obtain_the_fetch_plan": "Step B — Obtain the fetch plan" | kind=entity | source=.github/agents/gsd-phase-researcher.agent.md:L105 | neighbors=[Research Plan via Code Seam] | lang=en
- "agents_gsd_phase_researcher_agent_step_c_execute_the_indicated_fetch": "Step C — Execute the indicated fetch" | kind=entity | source=.github/agents/gsd-phase-researcher.agent.md:L117 | neighbors=[Research Plan via Code Seam] | lang=en
- "agents_gsd_phase_researcher_agent_step_d_cache_each_digest": "Step D — Cache each digest" | kind=entity | source=.github/agents/gsd-phase-researcher.agent.md:L138 | neighbors=[Research Plan via Code Seam] | lang=en
- "agents_gsd_phase_researcher_hooks": "hooks:" | kind=entity | source=.claude/agents/gsd-phase-researcher.md:L6 | neighbors=[gsd-phase-researcher.md] | lang=en
- "agents_gsd_phase_researcher_matcher_write_edit": "- matcher: \"Write|Edit\"" | kind=entity | source=.claude/agents/gsd-phase-researcher.md:L8 | neighbors=[gsd-phase-researcher.md] | lang=en
- "agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_detect_test_infrastructure": "Detect Test Infrastructure" | kind=entity | source=agents/gsd-phase-researcher.md:L705 | neighbors=[Step 4: Validation Architecture Researc…] | lang=en
- "agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_identify_wave_0_gaps": "Identify Wave 0 Gaps" | kind=entity | source=agents/gsd-phase-researcher.md:L711 | neighbors=[Step 4: Validation Architecture Researc…] | lang=en
- "agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_map_requirements_to_tests": "Map Requirements to Tests" | kind=entity | source=agents/gsd-phase-researcher.md:L708 | neighbors=[Step 4: Validation Architecture Researc…] | lang=en
- "agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_research_blocked": "Research Blocked" | kind=entity | source=agents/gsd-phase-researcher.md:L814 | neighbors=[gsd-phase-researcher.md] | lang=en
- "agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_research_complete": "Research Complete" | kind=entity | source=agents/gsd-phase-researcher.md:L786 | neighbors=[gsd-phase-researcher.md] | lang=en
- "agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_research_md_structure": "RESEARCH.md Structure" | kind=entity | source=agents/gsd-phase-researcher.md:L244 | neighbors=[gsd-phase-researcher.md] | lang=en
- "agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_1_3_load_graph_context": "Step 1.3: Load Graph Context" | kind=entity | source=agents/gsd-phase-researcher.md:L542 | neighbors=[gsd-phase-researcher.md] | lang=en
- "agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_1_5_architectural_responsibility_mapping": "Step 1.5: Architectural Responsibility Mapping" | kind=entity | source=agents/gsd-phase-researcher.md:L578 | neighbors=[gsd-phase-researcher.md] | lang=en
- "agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_1_receive_scope_and_load_context": "Step 1: Receive Scope and Load Context" | kind=entity | source=agents/gsd-phase-researcher.md:L509 | neighbors=[gsd-phase-researcher.md] | lang=en
- "agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_1_run_legitimacy_check_via_seam": "Step 1 — Run legitimacy check via seam" | kind=entity | source=agents/gsd-phase-researcher.md:L190 | neighbors=[Package Legitimacy Gate] | lang=en
- "agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_2_5_runtime_state_inventory_rename_refactor_migration_phases_only": "Step 2.5: Runtime State Inventory (rename / refactor / migration phases only)" | kind=entity | source=agents/gsd-phase-researcher.md:L615 | neighbors=[gsd-phase-researcher.md] | lang=en
- "agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_2_6_environment_availability_audit": "Step 2.6: Environment Availability Audit" | kind=entity | source=agents/gsd-phase-researcher.md:L635 | neighbors=[gsd-phase-researcher.md] | lang=en
- "agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_2_ecosystem_specific_registry_verification": "Step 2 — Ecosystem-specific registry verification" | kind=entity | source=agents/gsd-phase-researcher.md:L213 | neighbors=[Package Legitimacy Gate] | lang=en
- "agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_2_identify_research_domains": "Step 2: Identify Research Domains" | kind=entity | source=agents/gsd-phase-researcher.md:L605 | neighbors=[gsd-phase-researcher.md] | lang=en
- "agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_3_check_for_suspicious_postinstall_scripts_node_js_phases": "Step 3 — Check for suspicious postinstall scripts (Node.js phases)" | kind=entity | source=agents/gsd-phase-researcher.md:L231 | neighbors=[Package Legitimacy Gate] | lang=en
- "agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_3_execute_research_protocol": "Step 3: Execute Research Protocol" | kind=entity | source=agents/gsd-phase-researcher.md:L697 | neighbors=[gsd-phase-researcher.md] | lang=en
- "agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_5_quality_check": "Step 5: Quality Check" | kind=entity | source=agents/gsd-phase-researcher.md:L714 | neighbors=[gsd-phase-researcher.md] | lang=en
- "agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_6_write_research_md": "Step 6: Write RESEARCH.md" | kind=entity | source=agents/gsd-phase-researcher.md:L722 | neighbors=[gsd-phase-researcher.md] | lang=en
- "agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_7_commit_research_optional": "Step 7: Commit Research (optional)" | kind=entity | source=agents/gsd-phase-researcher.md:L774 | neighbors=[gsd-phase-researcher.md] | lang=en
- "agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_8_return_structured_result": "Step 8: Return Structured Result" | kind=entity | source=agents/gsd-phase-researcher.md:L780 | neighbors=[gsd-phase-researcher.md] | lang=en
- "agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_a_build_a_research_plan_input_file": "Step A — Build a research-plan input file" | kind=entity | source=agents/gsd-phase-researcher.md:L86 | neighbors=[Research Plan via Code Seam] | lang=pt
- "agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_b_obtain_the_fetch_plan": "Step B — Obtain the fetch plan" | kind=entity | source=agents/gsd-phase-researcher.md:L103 | neighbors=[Research Plan via Code Seam] | lang=en
- "agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_c_execute_the_indicated_fetch": "Step C — Execute the indicated fetch" | kind=entity | source=agents/gsd-phase-researcher.md:L115 | neighbors=[Research Plan via Code Seam] | lang=en
- "agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_d_cache_each_digest": "Step D — Cache each digest" | kind=entity | source=agents/gsd-phase-researcher.md:L136 | neighbors=[Research Plan via Code Seam] | lang=en
- "agents_gsd_phase_researcher_posttooluse": "PostToolUse:" | kind=entity | source=.claude/agents/gsd-phase-researcher.md:L7 | neighbors=[gsd-phase-researcher.md] | lang=en
- "agents_gsd_phase_researcher_type_command": "- type: command" | kind=entity | source=.claude/agents/gsd-phase-researcher.md:L10 | neighbors=[gsd-phase-researcher.md] | lang=en
- "agents_gsd_plan_checker_agent_check_8a_automated_verify_presence": "Check 8a — Automated Verify Presence" | kind=entity | source=.github/agents/gsd-plan-checker.agent.md:L456 | neighbors=[Dimension 8: Nyquist Compliance] | lang=pt

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-114.json

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
