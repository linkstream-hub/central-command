# Node Description Batch 178 of 412

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

- "claude_agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_research_blocked": "Research Blocked" | kind=entity | source=.claude/agents/gsd-phase-researcher.md:L822 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_research_complete": "Research Complete" | kind=entity | source=.claude/agents/gsd-phase-researcher.md:L794 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_research_md_structure": "RESEARCH.md Structure" | kind=entity | source=.claude/agents/gsd-phase-researcher.md:L252 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_1_3_load_graph_context": "Step 1.3: Load Graph Context" | kind=entity | source=.claude/agents/gsd-phase-researcher.md:L550 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_1_5_architectural_responsibility_mapping": "Step 1.5: Architectural Responsibility Mapping" | kind=entity | source=.claude/agents/gsd-phase-researcher.md:L586 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_1_receive_scope_and_load_context": "Step 1: Receive Scope and Load Context" | kind=entity | source=.claude/agents/gsd-phase-researcher.md:L517 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_1_run_legitimacy_check_via_seam": "Step 1 — Run legitimacy check via seam" | kind=entity | source=.claude/agents/gsd-phase-researcher.md:L198 | neighbors=[Package Legitimacy Gate] | lang=en
- "claude_agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_2_5_runtime_state_inventory_rename_refactor_migration_phases_only": "Step 2.5: Runtime State Inventory (rename / refactor / migration phases only)" | kind=entity | source=.claude/agents/gsd-phase-researcher.md:L623 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_2_6_environment_availability_audit": "Step 2.6: Environment Availability Audit" | kind=entity | source=.claude/agents/gsd-phase-researcher.md:L643 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_2_ecosystem_specific_registry_verification": "Step 2 — Ecosystem-specific registry verification" | kind=entity | source=.claude/agents/gsd-phase-researcher.md:L221 | neighbors=[Package Legitimacy Gate] | lang=en
- "claude_agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_2_identify_research_domains": "Step 2: Identify Research Domains" | kind=entity | source=.claude/agents/gsd-phase-researcher.md:L613 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_3_check_for_suspicious_postinstall_scripts_node_js_phases": "Step 3 — Check for suspicious postinstall scripts (Node.js phases)" | kind=entity | source=.claude/agents/gsd-phase-researcher.md:L239 | neighbors=[Package Legitimacy Gate] | lang=en
- "claude_agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_3_execute_research_protocol": "Step 3: Execute Research Protocol" | kind=entity | source=.claude/agents/gsd-phase-researcher.md:L705 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_5_quality_check": "Step 5: Quality Check" | kind=entity | source=.claude/agents/gsd-phase-researcher.md:L722 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_6_write_research_md": "Step 6: Write RESEARCH.md" | kind=entity | source=.claude/agents/gsd-phase-researcher.md:L730 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_7_commit_research_optional": "Step 7: Commit Research (optional)" | kind=entity | source=.claude/agents/gsd-phase-researcher.md:L782 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_8_return_structured_result": "Step 8: Return Structured Result" | kind=entity | source=.claude/agents/gsd-phase-researcher.md:L788 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_a_build_a_research_plan_input_file": "Step A — Build a research-plan input file" | kind=entity | source=.claude/agents/gsd-phase-researcher.md:L94 | neighbors=[Research Plan via Code Seam] | lang=pt
- "claude_agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_b_obtain_the_fetch_plan": "Step B — Obtain the fetch plan" | kind=entity | source=.claude/agents/gsd-phase-researcher.md:L111 | neighbors=[Research Plan via Code Seam] | lang=en
- "claude_agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_c_execute_the_indicated_fetch": "Step C — Execute the indicated fetch" | kind=entity | source=.claude/agents/gsd-phase-researcher.md:L123 | neighbors=[Research Plan via Code Seam] | lang=en
- "claude_agents_gsd_phase_researcher_md_agents_gsd_phase_researcher_step_d_cache_each_digest": "Step D — Cache each digest" | kind=entity | source=.claude/agents/gsd-phase-researcher.md:L144 | neighbors=[Research Plan via Code Seam] | lang=en
- "claude_agents_gsd_plan_checker_md_agents_gsd_plan_checker_check_8a_automated_verify_presence": "Check 8a — Automated Verify Presence" | kind=entity | source=.claude/agents/gsd-plan-checker.md:L456 | neighbors=[Dimension 8: Nyquist Compliance] | lang=pt
- "claude_agents_gsd_plan_checker_md_agents_gsd_plan_checker_check_8b_feedback_latency_assessment": "Check 8b — Feedback Latency Assessment" | kind=entity | source=.claude/agents/gsd-plan-checker.md:L463 | neighbors=[Dimension 8: Nyquist Compliance] | lang=en
- "claude_agents_gsd_plan_checker_md_agents_gsd_plan_checker_check_8c_sampling_continuity": "Check 8c — Sampling Continuity" | kind=entity | source=.claude/agents/gsd-plan-checker.md:L470 | neighbors=[Dimension 8: Nyquist Compliance] | lang=en
- "claude_agents_gsd_plan_checker_md_agents_gsd_plan_checker_check_8d_wave_0_completeness": "Check 8d — Wave 0 Completeness" | kind=entity | source=.claude/agents/gsd-plan-checker.md:L474 | neighbors=[Dimension 8: Nyquist Compliance] | lang=en
- "claude_agents_gsd_plan_checker_md_agents_gsd_plan_checker_check_8e_validation_md_existence_gate": "Check 8e — VALIDATION.md Existence (Gate)" | kind=entity | source=.claude/agents/gsd-plan-checker.md:L443 | neighbors=[Dimension 8: Nyquist Compliance] | lang=en
- "claude_agents_gsd_plan_checker_md_agents_gsd_plan_checker_dimension_1_requirement_coverage": "Dimension 1: Requirement Coverage" | kind=entity | source=.claude/agents/gsd-plan-checker.md:L112 | neighbors=[gsd-plan-checker.md] | lang=en
- "claude_agents_gsd_plan_checker_md_agents_gsd_plan_checker_dimension_11_research_resolution_1602": "Dimension 11: Research Resolution (#1602)" | kind=entity | source=.claude/agents/gsd-plan-checker.md:L560 | neighbors=[gsd-plan-checker.md] | lang=en
- "claude_agents_gsd_plan_checker_md_agents_gsd_plan_checker_dimension_12_pattern_compliance_1861": "Dimension 12: Pattern Compliance (#1861)" | kind=entity | source=.claude/agents/gsd-plan-checker.md:L599 | neighbors=[gsd-plan-checker.md] | lang=en
- "claude_agents_gsd_plan_checker_md_agents_gsd_plan_checker_dimension_2_task_completeness": "Dimension 2: Task Completeness" | kind=entity | source=.claude/agents/gsd-plan-checker.md:L140 | neighbors=[gsd-plan-checker.md] | lang=en
- "claude_agents_gsd_plan_checker_md_agents_gsd_plan_checker_dimension_3_dependency_correctness": "Dimension 3: Dependency Correctness" | kind=entity | source=.claude/agents/gsd-plan-checker.md:L173 | neighbors=[gsd-plan-checker.md] | lang=en
- "claude_agents_gsd_plan_checker_md_agents_gsd_plan_checker_dimension_4_key_links_planned": "Dimension 4: Key Links Planned" | kind=entity | source=.claude/agents/gsd-plan-checker.md:L203 | neighbors=[gsd-plan-checker.md] | lang=en
- "claude_agents_gsd_plan_checker_md_agents_gsd_plan_checker_dimension_5_scope_sanity": "Dimension 5: Scope Sanity" | kind=entity | source=.claude/agents/gsd-plan-checker.md:L237 | neighbors=[gsd-plan-checker.md] | lang=en
- "claude_agents_gsd_plan_checker_md_agents_gsd_plan_checker_dimension_6_verification_derivation": "Dimension 6: Verification Derivation" | kind=entity | source=.claude/agents/gsd-plan-checker.md:L272 | neighbors=[gsd-plan-checker.md] | lang=en
- "claude_agents_gsd_plan_checker_md_agents_gsd_plan_checker_dimension_7_context_compliance_if_context_md_exists": "Dimension 7: Context Compliance (if CONTEXT.md exists)" | kind=entity | source=.claude/agents/gsd-plan-checker.md:L301 | neighbors=[gsd-plan-checker.md] | lang=en
- "claude_agents_gsd_plan_checker_md_agents_gsd_plan_checker_dimension_7b_scope_reduction_detection": "Dimension 7b: Scope Reduction Detection" | kind=entity | source=.claude/agents/gsd-plan-checker.md:L346 | neighbors=[gsd-plan-checker.md] | lang=en
- "claude_agents_gsd_plan_checker_md_agents_gsd_plan_checker_dimension_7c_architectural_tier_compliance": "Dimension 7c: Architectural Tier Compliance" | kind=entity | source=.claude/agents/gsd-plan-checker.md:L391 | neighbors=[gsd-plan-checker.md] | lang=en
- "claude_agents_gsd_plan_checker_md_agents_gsd_plan_checker_dimension_8_output": "Dimension 8 Output" | kind=entity | source=.claude/agents/gsd-plan-checker.md:L481 | neighbors=[Dimension 8: Nyquist Compliance] | lang=en
- "claude_agents_gsd_plan_checker_md_agents_gsd_plan_checker_dimension_9_cross_plan_data_contracts": "Dimension 9: Cross-Plan Data Contracts" | kind=entity | source=.claude/agents/gsd-plan-checker.md:L497 | neighbors=[gsd-plan-checker.md] | lang=en
- "claude_agents_gsd_plan_checker_md_agents_gsd_plan_checker_issue_format": "Issue Format" | kind=entity | source=.claude/agents/gsd-plan-checker.md:L843 | neighbors=[gsd-plan-checker.md] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-177.json

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
