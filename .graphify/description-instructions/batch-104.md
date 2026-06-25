# Node Description Batch 105 of 412

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

- "agent_gsd_code_reviewer": "gsd-code-reviewer" | kind=entity | source=agents/gsd-code-reviewer.md | neighbors=[gsd-code-fixer]
- "agent_gsd_debug_session_manager": "gsd-debug-session-manager" | kind=entity | source=agents/gsd-debug-session-manager.md | neighbors=[gsd-debugger]
- "agent_gsd_debugger": "gsd-debugger" | kind=entity | source=agents/gsd-debugger.md | neighbors=[gsd-debug-session-manager]
- "agent_gsd_doc_classifier": "gsd-doc-classifier" | kind=entity | source=agents/gsd-doc-classifier.md | neighbors=[gsd-doc-synthesizer]
- "agent_gsd_doc_synthesizer": "gsd-doc-synthesizer" | kind=entity | source=agents/gsd-doc-synthesizer.md | neighbors=[gsd-doc-classifier]
- "agent_introspection_debugging_skill": "SKILL.md" | kind=entity | source=.github/skills/ecc/agent-introspection-debugging/SKILL.md:L1 | neighbors=[Agent Introspection Debugging]
- "agent_introspection_debugging_skill_integration_with_ecc": "Integration with ECC" | kind=entity | source=.github/skills/ecc/agent-introspection-debugging/SKILL.md:L138 | neighbors=[Agent Introspection Debugging]
- "agent_introspection_debugging_skill_output_standard": "Output Standard" | kind=entity | source=.github/skills/ecc/agent-introspection-debugging/SKILL.md:L145 | neighbors=[Agent Introspection Debugging]
- "agent_introspection_debugging_skill_phase_1_failure_capture": "Phase 1: Failure Capture" | kind=entity | source=.github/skills/ecc/agent-introspection-debugging/SKILL.md:L36 | neighbors=[Four-Phase Loop]
- "agent_introspection_debugging_skill_phase_2_root_cause_diagnosis": "Phase 2: Root-Cause Diagnosis" | kind=entity | source=.github/skills/ecc/agent-introspection-debugging/SKILL.md:L60 | neighbors=[Four-Phase Loop]
- "agent_introspection_debugging_skill_phase_3_contained_recovery": "Phase 3: Contained Recovery" | kind=entity | source=.github/skills/ecc/agent-introspection-debugging/SKILL.md:L79 | neighbors=[Four-Phase Loop]
- "agent_introspection_debugging_skill_phase_4_introspection_report": "Phase 4: Introspection Report" | kind=entity | source=.github/skills/ecc/agent-introspection-debugging/SKILL.md:L103 | neighbors=[Four-Phase Loop]
- "agent_introspection_debugging_skill_recovery_heuristics": "Recovery Heuristics" | kind=entity | source=.github/skills/ecc/agent-introspection-debugging/SKILL.md:L119 | neighbors=[Agent Introspection Debugging]
- "agent_introspection_debugging_skill_scope_boundaries": "Scope Boundaries" | kind=entity | source=.github/skills/ecc/agent-introspection-debugging/SKILL.md:L21 | neighbors=[Agent Introspection Debugging]
- "agent_introspection_debugging_skill_when_to_activate": "When to Activate" | kind=entity | source=.github/skills/ecc/agent-introspection-debugging/SKILL.md:L13 | neighbors=[Agent Introspection Debugging]
- "agent_meta_agent": "meta-agent" | kind=entity | neighbors=[SPRINT_ADW_FLAG_GATE_AND_HOOKS.md]
- "agent_sort_skill": "SKILL.md" | kind=entity | source=.github/skills/ecc/agent-sort/SKILL.md:L1 | neighbors=[Agent Sort]
- "agent_sort_skill_1_read_the_repo": "1. Read the repo" | kind=entity | source=.github/skills/ecc/agent-sort/SKILL.md:L95 | neighbors=[Core Workflow]
- "agent_sort_skill_2_build_the_evidence_table": "2. Build the evidence table" | kind=entity | source=.github/skills/ecc/agent-sort/SKILL.md:L107 | neighbors=[Core Workflow]
- "agent_sort_skill_3_decide_daily_vs_library": "3. Decide DAILY vs LIBRARY" | kind=entity | source=.github/skills/ecc/agent-sort/SKILL.md:L126 | neighbors=[Core Workflow]
- "agent_sort_skill_4_build_the_install_plan": "4. Build the install plan" | kind=entity | source=.github/skills/ecc/agent-sort/SKILL.md:L140 | neighbors=[Core Workflow]
- "agent_sort_skill_5_create_the_optional_library_router": "5. Create the optional library router" | kind=entity | source=.github/skills/ecc/agent-sort/SKILL.md:L152 | neighbors=[Core Workflow]
- "agent_sort_skill_6_verify_the_result": "6. Verify the result" | kind=entity | source=.github/skills/ecc/agent-sort/SKILL.md:L166 | neighbors=[Core Workflow]
- "agent_sort_skill_classification_model": "Classification Model" | kind=entity | source=.github/skills/ecc/agent-sort/SKILL.md:L39 | neighbors=[Agent Sort]
- "agent_sort_skill_evidence_sources": "Evidence Sources" | kind=entity | source=.github/skills/ecc/agent-sort/SKILL.md:L50 | neighbors=[Agent Sort]
- "agent_sort_skill_handoffs": "Handoffs" | kind=entity | source=.github/skills/ecc/agent-sort/SKILL.md:L182 | neighbors=[Agent Sort]
- "agent_sort_skill_non_negotiable_rules": "Non-Negotiable Rules" | kind=entity | source=.github/skills/ecc/agent-sort/SKILL.md:L21 | neighbors=[Agent Sort]
- "agent_sort_skill_output_format": "Output Format" | kind=entity | source=.github/skills/ecc/agent-sort/SKILL.md:L196 | neighbors=[Agent Sort]
- "agent_sort_skill_outputs": "Outputs" | kind=entity | source=.github/skills/ecc/agent-sort/SKILL.md:L29 | neighbors=[Agent Sort]
- "agent_sort_skill_parallel_review_passes": "Parallel Review Passes" | kind=entity | source=.github/skills/ecc/agent-sort/SKILL.md:L74 | neighbors=[Agent Sort]
- "agent_sort_skill_when_to_use": "When to Use" | kind=entity | source=.github/skills/ecc/agent-sort/SKILL.md:L13 | neighbors=[Agent Sort]
- "agents": "AGENTS.md" | kind=entity | source=AGENTS.md:L1 | neighbors=[Instructions for GSD]
- "agents_ag_plan_reviewer": "ag-plan-reviewer.md" | kind=entity | source=.claude/agents/ag-plan-reviewer.md:L1 | neighbors=[Purpose]
- "agents_ag_plan_reviewer_instructions": "Instructions" | kind=entity | source=.claude/agents/ag-plan-reviewer.md:L20 | neighbors=[Purpose]
- "agents_ag_plan_reviewer_report": "Report" | kind=entity | source=.claude/agents/ag-plan-reviewer.md:L27 | neighbors=[Purpose]
- "agents_ag_plan_reviewer_the_four_gate_categories": "The Four Gate Categories" | kind=entity | source=.claude/agents/ag-plan-reviewer.md:L13 | neighbors=[Purpose]
- "agents_diff_reviewer": "diff-reviewer.md" | kind=entity | source=.claude/agents/diff-reviewer.md:L1 | neighbors=[Purpose]
- "agents_diff_reviewer_instructions": "Instructions" | kind=entity | source=.claude/agents/diff-reviewer.md:L13 | neighbors=[Purpose]
- "agents_diff_reviewer_report": "Report" | kind=entity | source=.claude/agents/diff-reviewer.md:L20 | neighbors=[Purpose]
- "agents_domain": "domain.md" | kind=entity | source=docs/agents/domain.md:L1 | neighbors=[Domain Docs]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-104.json

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
