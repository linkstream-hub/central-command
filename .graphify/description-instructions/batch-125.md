# Node Description Batch 126 of 412

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

- "agents_gsd_verifier_agent_final_artifact_status": "Final Artifact Status" | kind=entity | source=.github/agents/gsd-verifier.agent.md:L250 | neighbors=[Step 4: Verify Artifacts (Three Levels)]
- "agents_gsd_verifier_agent_mvp_mode_verification": "MVP Mode Verification" | kind=entity | source=.github/agents/gsd-verifier.agent.md:L646 | neighbors=[gsd-verifier.agent.md]
- "agents_gsd_verifier_agent_pattern_api_database": "Pattern: API → Database" | kind=entity | source=.github/agents/gsd-verifier.agent.md:L344 | neighbors=[Step 5: Verify Key Links (Wiring)]
- "agents_gsd_verifier_agent_pattern_component_api": "Pattern: Component → API" | kind=entity | source=.github/agents/gsd-verifier.agent.md:L335 | neighbors=[Step 5: Verify Key Links (Wiring)]
- "agents_gsd_verifier_agent_pattern_form_handler": "Pattern: Form → Handler" | kind=entity | source=.github/agents/gsd-verifier.agent.md:L353 | neighbors=[Step 5: Verify Key Links (Wiring)]
- "agents_gsd_verifier_agent_pattern_state_render": "Pattern: State → Render" | kind=entity | source=.github/agents/gsd-verifier.agent.md:L362 | neighbors=[Step 5: Verify Key Links (Wiring)]
- "agents_gsd_verifier_agent_react_component_stubs": "React Component Stubs" | kind=entity | source=.github/agents/gsd-verifier.agent.md:L849 | neighbors=[gsd-verifier.agent.md]
- "agents_gsd_verifier_agent_return_to_orchestrator": "Return to Orchestrator" | kind=entity | source=.github/agents/gsd-verifier.agent.md:L794 | neighbors=[gsd-verifier.agent.md]
- "agents_gsd_verifier_agent_step_0_check_for_previous_verification": "Step 0: Check for Previous Verification" | kind=entity | source=.github/agents/gsd-verifier.agent.md:L74 | neighbors=[gsd-verifier.agent.md]
- "agents_gsd_verifier_agent_step_1_load_context_initial_mode_only": "Step 1: Load Context (Initial Mode Only)" | kind=entity | source=.github/agents/gsd-verifier.agent.md:L94 | neighbors=[gsd-verifier.agent.md]
- "agents_gsd_verifier_agent_step_10_structure_gap_output_if_gaps_found": "Step 10: Structure Gap Output (If Gaps Found)" | kind=entity | source=.github/agents/gsd-verifier.agent.md:L605 | neighbors=[gsd-verifier.agent.md]
- "agents_gsd_verifier_agent_step_2_establish_must_haves_initial_mode_only": "Step 2: Establish Must-Haves (Initial Mode Only)" | kind=entity | source=.github/agents/gsd-verifier.agent.md:L105 | neighbors=[gsd-verifier.agent.md]
- "agents_gsd_verifier_agent_step_3_verify_observable_truths": "Step 3: Verify Observable Truths" | kind=entity | source=.github/agents/gsd-verifier.agent.md:L160 | neighbors=[gsd-verifier.agent.md]
- "agents_gsd_verifier_agent_step_3b_check_verification_overrides": "Step 3b: Check Verification Overrides" | kind=entity | source=.github/agents/gsd-verifier.agent.md:L178 | neighbors=[gsd-verifier.agent.md]
- "agents_gsd_verifier_agent_step_4b_data_flow_trace_level_4": "Step 4b: Data-Flow Trace (Level 4)" | kind=entity | source=.github/agents/gsd-verifier.agent.md:L259 | neighbors=[gsd-verifier.agent.md]
- "agents_gsd_verifier_agent_step_6_check_requirements_coverage": "Step 6: Check Requirements Coverage" | kind=entity | source=.github/agents/gsd-verifier.agent.md:L371 | neighbors=[gsd-verifier.agent.md]
- "agents_gsd_verifier_agent_step_7_scan_for_anti_patterns": "Step 7: Scan for Anti-Patterns" | kind=entity | source=.github/agents/gsd-verifier.agent.md:L399 | neighbors=[gsd-verifier.agent.md]
- "agents_gsd_verifier_agent_step_7b_behavioral_spot_checks": "Step 7b: Behavioral Spot-Checks" | kind=entity | source=.github/agents/gsd-verifier.agent.md:L441 | neighbors=[gsd-verifier.agent.md]
- "agents_gsd_verifier_agent_step_7c_probe_execution": "Step 7c: Probe Execution" | kind=entity | source=.github/agents/gsd-verifier.agent.md:L491 | neighbors=[gsd-verifier.agent.md]
- "agents_gsd_verifier_agent_step_8_identify_human_verification_needs": "Step 8: Identify Human Verification Needs" | kind=entity | source=.github/agents/gsd-verifier.agent.md:L528 | neighbors=[gsd-verifier.agent.md]
- "agents_gsd_verifier_agent_step_9_determine_overall_status": "Step 9: Determine Overall Status" | kind=entity | source=.github/agents/gsd-verifier.agent.md:L558 | neighbors=[gsd-verifier.agent.md]
- "agents_gsd_verifier_agent_step_9b_filter_deferred_items": "Step 9b: Filter Deferred Items" | kind=entity | source=.github/agents/gsd-verifier.agent.md:L578 | neighbors=[gsd-verifier.agent.md]
- "agents_gsd_verifier_agent_wiring_red_flags": "Wiring Red Flags" | kind=entity | source=.github/agents/gsd-verifier.agent.md:L878 | neighbors=[gsd-verifier.agent.md]
- "agents_gsd_verifier_hooks": "hooks:" | kind=entity | source=.claude/agents/gsd-verifier.md:L6 | neighbors=[gsd-verifier.md]
- "agents_gsd_verifier_matcher_write_edit": "- matcher: \"Write|Edit\"" | kind=entity | source=.claude/agents/gsd-verifier.md:L8 | neighbors=[gsd-verifier.md]
- "agents_gsd_verifier_md_agents_gsd_verifier_api_route_stubs": "API Route Stubs" | kind=entity | source=agents/gsd-verifier.md:L863 | neighbors=[gsd-verifier.md]
- "agents_gsd_verifier_md_agents_gsd_verifier_create_verification_md": "Create VERIFICATION.md" | kind=entity | source=agents/gsd-verifier.md:L671 | neighbors=[gsd-verifier.md]
- "agents_gsd_verifier_md_agents_gsd_verifier_final_artifact_status": "Final Artifact Status" | kind=entity | source=agents/gsd-verifier.md:L248 | neighbors=[Step 4: Verify Artifacts (Three Levels)]
- "agents_gsd_verifier_md_agents_gsd_verifier_mvp_mode_verification": "MVP Mode Verification" | kind=entity | source=agents/gsd-verifier.md:L644 | neighbors=[gsd-verifier.md]
- "agents_gsd_verifier_md_agents_gsd_verifier_pattern_api_database": "Pattern: API → Database" | kind=entity | source=agents/gsd-verifier.md:L342 | neighbors=[Step 5: Verify Key Links (Wiring)]
- "agents_gsd_verifier_md_agents_gsd_verifier_pattern_component_api": "Pattern: Component → API" | kind=entity | source=agents/gsd-verifier.md:L333 | neighbors=[Step 5: Verify Key Links (Wiring)]
- "agents_gsd_verifier_md_agents_gsd_verifier_pattern_form_handler": "Pattern: Form → Handler" | kind=entity | source=agents/gsd-verifier.md:L351 | neighbors=[Step 5: Verify Key Links (Wiring)]
- "agents_gsd_verifier_md_agents_gsd_verifier_pattern_state_render": "Pattern: State → Render" | kind=entity | source=agents/gsd-verifier.md:L360 | neighbors=[Step 5: Verify Key Links (Wiring)]
- "agents_gsd_verifier_md_agents_gsd_verifier_react_component_stubs": "React Component Stubs" | kind=entity | source=agents/gsd-verifier.md:L847 | neighbors=[gsd-verifier.md]
- "agents_gsd_verifier_md_agents_gsd_verifier_return_to_orchestrator": "Return to Orchestrator" | kind=entity | source=agents/gsd-verifier.md:L792 | neighbors=[gsd-verifier.md]
- "agents_gsd_verifier_md_agents_gsd_verifier_step_0_check_for_previous_verification": "Step 0: Check for Previous Verification" | kind=entity | source=agents/gsd-verifier.md:L72 | neighbors=[gsd-verifier.md]
- "agents_gsd_verifier_md_agents_gsd_verifier_step_1_load_context_initial_mode_only": "Step 1: Load Context (Initial Mode Only)" | kind=entity | source=agents/gsd-verifier.md:L92 | neighbors=[gsd-verifier.md]
- "agents_gsd_verifier_md_agents_gsd_verifier_step_10_structure_gap_output_if_gaps_found": "Step 10: Structure Gap Output (If Gaps Found)" | kind=entity | source=agents/gsd-verifier.md:L603 | neighbors=[gsd-verifier.md]
- "agents_gsd_verifier_md_agents_gsd_verifier_step_2_establish_must_haves_initial_mode_only": "Step 2: Establish Must-Haves (Initial Mode Only)" | kind=entity | source=agents/gsd-verifier.md:L103 | neighbors=[gsd-verifier.md]
- "agents_gsd_verifier_md_agents_gsd_verifier_step_3_verify_observable_truths": "Step 3: Verify Observable Truths" | kind=entity | source=agents/gsd-verifier.md:L158 | neighbors=[gsd-verifier.md]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-125.json

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
