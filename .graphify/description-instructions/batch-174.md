# Node Description Batch 175 of 412

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

- "claude_agents_gsd_debug_session_manager_md_agents_gsd_debug_session_manager_3d_checkpoint_reached": "3d. CHECKPOINT REACHED" | kind=entity | source=.claude/agents/gsd-debug-session-manager.md:L201 | neighbors=[Step 3: Handle Agent Return]
- "claude_agents_gsd_debug_session_manager_md_agents_gsd_debug_session_manager_3e_investigation_inconclusive": "3e. INVESTIGATION INCONCLUSIVE" | kind=entity | source=.claude/agents/gsd-debug-session-manager.md:L251 | neighbors=[Step 3: Handle Agent Return]
- "claude_agents_gsd_debug_session_manager_md_agents_gsd_debug_session_manager_step_1_read_debug_file": "Step 1: Read Debug File" | kind=entity | source=.claude/agents/gsd-debug-session-manager.md:L41 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debug_session_manager_md_agents_gsd_debug_session_manager_step_2_spawn_gsd_debugger_agent": "Step 2: Spawn gsd-debugger Agent" | kind=entity | source=.claude/agents/gsd-debug-session-manager.md:L57 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debug_session_manager_md_agents_gsd_debug_session_manager_step_4_return_compact_summary": "Step 4: Return Compact Summary" | kind=entity | source=.claude/agents/gsd-debug-session-manager.md:L273 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_after_checkpoint": "After Checkpoint" | kind=entity | source=.claude/agents/gsd-debugger.md:L1284 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_balance_research_and_reasoning": "Balance Research and Reasoning" | kind=entity | source=.claude/agents/gsd-debugger.md:L714 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_binary_search_divide_and_conquer": "Binary Search / Divide and Conquer" | kind=entity | source=.claude/agents/gsd-debugger.md:L170 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_checkpoint_format": "Checkpoint Format" | kind=entity | source=.claude/agents/gsd-debugger.md:L1220 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_checkpoint_reached": "CHECKPOINT REACHED" | kind=entity | source=.claude/agents/gsd-debugger.md:L1377 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_checkpoint_types": "Checkpoint Types" | kind=entity | source=.claude/agents/gsd-debugger.md:L1245 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_combining_techniques": "Combining Techniques" | kind=entity | source=.claude/agents/gsd-debugger.md:L458 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_comment_out_everything": "Comment Out Everything" | kind=entity | source=.claude/agents/gsd-debugger.md:L375 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_debug_complete_goal_find_and_fix": "DEBUG COMPLETE (goal: find_and_fix)" | kind=entity | source=.claude/agents/gsd-debugger.md:L1315 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_decision_point_when_to_act": "Decision Point: When to Act" | kind=entity | source=.claude/agents/gsd-debugger.md:L103 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_delta_debugging": "Delta Debugging" | kind=entity | source=.claude/agents/gsd-debugger.md:L204 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_differential_debugging": "Differential Debugging" | kind=entity | source=.claude/agents/gsd-debugger.md:L317 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_entry_format": "Entry Format" | kind=entity | source=.claude/agents/gsd-debugger.md:L782 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_environment_verification": "Environment Verification" | kind=entity | source=.claude/agents/gsd-debugger.md:L508 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_evidence_quality": "Evidence Quality" | kind=entity | source=.claude/agents/gsd-debugger.md:L89 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_experimental_design_framework": "Experimental Design Framework" | kind=entity | source=.claude/agents/gsd-debugger.md:L75 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_falsifiability_requirement": "Falsifiability Requirement" | kind=entity | source=.claude/agents/gsd-debugger.md:L52 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_file_structure": "File Structure" | kind=entity | source=.claude/agents/gsd-debugger.md:L821 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_follow_the_indirection": "Follow the Indirection" | kind=entity | source=.claude/agents/gsd-debugger.md:L412 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_forming_hypotheses": "Forming Hypotheses" | kind=entity | source=.claude/agents/gsd-debugger.md:L68 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_git_bisect": "Git Bisect" | kind=entity | source=.claude/agents/gsd-debugger.md:L395 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_how_to_research": "How to Research" | kind=entity | source=.claude/agents/gsd-debugger.md:L695 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_hypothesis_testing_pitfalls": "Hypothesis Testing Pitfalls" | kind=entity | source=.claude/agents/gsd-debugger.md:L156 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_investigation_inconclusive": "INVESTIGATION INCONCLUSIVE" | kind=entity | source=.claude/agents/gsd-debugger.md:L1335 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_matching_logic": "Matching Logic" | kind=entity | source=.claude/agents/gsd-debugger.md:L804 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_minimal_reproduction": "Minimal Reproduction" | kind=entity | source=.claude/agents/gsd-debugger.md:L265 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_mode_flags": "Mode Flags" | kind=entity | source=.claude/agents/gsd-debugger.md:L1385 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_multiple_hypotheses_strategy": "Multiple Hypotheses Strategy" | kind=entity | source=.claude/agents/gsd-debugger.md:L122 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_observability_first": "Observability First" | kind=entity | source=.claude/agents/gsd-debugger.md:L348 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_purpose": "Purpose" | kind=entity | source=.claude/agents/gsd-debugger.md:L772 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_recovery_from_wrong_hypotheses": "Recovery from Wrong Hypotheses" | kind=entity | source=.claude/agents/gsd-debugger.md:L113 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_red_flags": "Red Flags" | kind=entity | source=.claude/agents/gsd-debugger.md:L748 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_regression_testing": "Regression Testing" | kind=entity | source=.claude/agents/gsd-debugger.md:L499 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_reproduction_verification": "Reproduction Verification" | kind=entity | source=.claude/agents/gsd-debugger.md:L485 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_research_vs_reasoning_decision_tree": "Research vs Reasoning Decision Tree" | kind=entity | source=.claude/agents/gsd-debugger.md:L724 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-174.json

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
