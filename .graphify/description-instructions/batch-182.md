# Node Description Batch 183 of 412

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

- "claude_agents_gsd_ui_researcher_md_agents_gsd_ui_researcher_step_5_compile_ui_spec_md": "Step 5: Compile UI-SPEC.md" | kind=entity | source=.claude/agents/gsd-ui-researcher.md:L268 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_ui_researcher_md_agents_gsd_ui_researcher_step_6_commit_optional": "Step 6: Commit (optional)" | kind=entity | source=.claude/agents/gsd-ui-researcher.md:L287 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_ui_researcher_md_agents_gsd_ui_researcher_step_7_return_structured_result": "Step 7: Return Structured Result" | kind=entity | source=.claude/agents/gsd-ui-researcher.md:L293 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_ui_researcher_md_agents_gsd_ui_researcher_tool_priority": "Tool Priority" | kind=entity | source=.claude/agents/gsd-ui-researcher.md:L91 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_ui_researcher_md_agents_gsd_ui_researcher_typography": "Typography" | kind=entity | source=.claude/agents/gsd-ui-researcher.md:L154 | neighbors=[What to Ask]
- "claude_agents_gsd_ui_researcher_md_agents_gsd_ui_researcher_ui_spec_blocked": "UI-SPEC Blocked" | kind=entity | source=.claude/agents/gsd-ui-researcher.md:L329 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_ui_researcher_md_agents_gsd_ui_researcher_ui_spec_complete": "UI-SPEC Complete" | kind=entity | source=.claude/agents/gsd-ui-researcher.md:L299 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_verifier_md_agents_gsd_verifier_api_route_stubs": "API Route Stubs" | kind=entity | source=.claude/agents/gsd-verifier.md:L871 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_verifier_md_agents_gsd_verifier_create_verification_md": "Create VERIFICATION.md" | kind=entity | source=.claude/agents/gsd-verifier.md:L679 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_verifier_md_agents_gsd_verifier_final_artifact_status": "Final Artifact Status" | kind=entity | source=.claude/agents/gsd-verifier.md:L256 | neighbors=[Step 4: Verify Artifacts (Three Levels)]
- "claude_agents_gsd_verifier_md_agents_gsd_verifier_mvp_mode_verification": "MVP Mode Verification" | kind=entity | source=.claude/agents/gsd-verifier.md:L652 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_verifier_md_agents_gsd_verifier_pattern_api_database": "Pattern: API → Database" | kind=entity | source=.claude/agents/gsd-verifier.md:L350 | neighbors=[Step 5: Verify Key Links (Wiring)]
- "claude_agents_gsd_verifier_md_agents_gsd_verifier_pattern_component_api": "Pattern: Component → API" | kind=entity | source=.claude/agents/gsd-verifier.md:L341 | neighbors=[Step 5: Verify Key Links (Wiring)]
- "claude_agents_gsd_verifier_md_agents_gsd_verifier_pattern_form_handler": "Pattern: Form → Handler" | kind=entity | source=.claude/agents/gsd-verifier.md:L359 | neighbors=[Step 5: Verify Key Links (Wiring)]
- "claude_agents_gsd_verifier_md_agents_gsd_verifier_pattern_state_render": "Pattern: State → Render" | kind=entity | source=.claude/agents/gsd-verifier.md:L368 | neighbors=[Step 5: Verify Key Links (Wiring)]
- "claude_agents_gsd_verifier_md_agents_gsd_verifier_react_component_stubs": "React Component Stubs" | kind=entity | source=.claude/agents/gsd-verifier.md:L855 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_verifier_md_agents_gsd_verifier_return_to_orchestrator": "Return to Orchestrator" | kind=entity | source=.claude/agents/gsd-verifier.md:L800 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_verifier_md_agents_gsd_verifier_step_0_check_for_previous_verification": "Step 0: Check for Previous Verification" | kind=entity | source=.claude/agents/gsd-verifier.md:L80 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_verifier_md_agents_gsd_verifier_step_1_load_context_initial_mode_only": "Step 1: Load Context (Initial Mode Only)" | kind=entity | source=.claude/agents/gsd-verifier.md:L100 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_verifier_md_agents_gsd_verifier_step_10_structure_gap_output_if_gaps_found": "Step 10: Structure Gap Output (If Gaps Found)" | kind=entity | source=.claude/agents/gsd-verifier.md:L611 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_verifier_md_agents_gsd_verifier_step_2_establish_must_haves_initial_mode_only": "Step 2: Establish Must-Haves (Initial Mode Only)" | kind=entity | source=.claude/agents/gsd-verifier.md:L111 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_verifier_md_agents_gsd_verifier_step_3_verify_observable_truths": "Step 3: Verify Observable Truths" | kind=entity | source=.claude/agents/gsd-verifier.md:L166 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_verifier_md_agents_gsd_verifier_step_3b_check_verification_overrides": "Step 3b: Check Verification Overrides" | kind=entity | source=.claude/agents/gsd-verifier.md:L184 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_verifier_md_agents_gsd_verifier_step_4b_data_flow_trace_level_4": "Step 4b: Data-Flow Trace (Level 4)" | kind=entity | source=.claude/agents/gsd-verifier.md:L265 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_verifier_md_agents_gsd_verifier_step_6_check_requirements_coverage": "Step 6: Check Requirements Coverage" | kind=entity | source=.claude/agents/gsd-verifier.md:L377 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_verifier_md_agents_gsd_verifier_step_7_scan_for_anti_patterns": "Step 7: Scan for Anti-Patterns" | kind=entity | source=.claude/agents/gsd-verifier.md:L405 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_verifier_md_agents_gsd_verifier_step_7b_behavioral_spot_checks": "Step 7b: Behavioral Spot-Checks" | kind=entity | source=.claude/agents/gsd-verifier.md:L447 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_verifier_md_agents_gsd_verifier_step_7c_probe_execution": "Step 7c: Probe Execution" | kind=entity | source=.claude/agents/gsd-verifier.md:L497 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_verifier_md_agents_gsd_verifier_step_8_identify_human_verification_needs": "Step 8: Identify Human Verification Needs" | kind=entity | source=.claude/agents/gsd-verifier.md:L534 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_verifier_md_agents_gsd_verifier_step_9_determine_overall_status": "Step 9: Determine Overall Status" | kind=entity | source=.claude/agents/gsd-verifier.md:L564 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_verifier_md_agents_gsd_verifier_step_9b_filter_deferred_items": "Step 9b: Filter Deferred Items" | kind=entity | source=.claude/agents/gsd-verifier.md:L584 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_verifier_md_agents_gsd_verifier_wiring_red_flags": "Wiring Red Flags" | kind=entity | source=.claude/agents/gsd-verifier.md:L884 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_apt_central_command_claude_md": "APT CENTRAL COMMAND — CLAUDE.md" | kind=entity | source=CLAUDE.md:L1 | neighbors=[CLAUDE.md]
- "claude_auth_context_never_mix_wrong_hook_redirect_loop": "AUTH CONTEXT (never mix — wrong hook = redirect loop)" | kind=entity | source=CLAUDE.md:L137 | neighbors=[Ops reference. Non-narrative. Load refs…]
- "claude_claude": "CLAUDE.md" | kind=entity | source=.claude/CLAUDE.md:L1 | neighbors=[graphify]
- "claude_claude_graphify": "graphify" | kind=entity | source=.claude/CLAUDE.md:L1 | neighbors=[CLAUDE.md]
- "claude_deploy": "DEPLOY" | kind=entity | source=CLAUDE.md:L117 | neighbors=[Ops reference. Non-narrative. Load refs…]
- "claude_domain_docs": "Domain docs" | kind=entity | source=CLAUDE.md:L189 | neighbors=[Agent skills]
- "claude_gas_migration_status": "GAS MIGRATION STATUS" | kind=entity | source=CLAUDE.md:L195 | neighbors=[Ops reference. Non-narrative. Load refs…]
- "claude_graphify": "graphify" | kind=entity | source=CLAUDE.md:L211 | neighbors=[Ops reference. Non-narrative. Load refs…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-182.json

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
