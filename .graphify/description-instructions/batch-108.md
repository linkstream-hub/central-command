# Node Description Batch 109 of 412

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

- "agents_gsd_debugger_agent_technique_selection": "Technique Selection" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L439 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_test_first_debugging": "Test-First Debugging" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L553 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_update_rules": "Update Rules" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L866 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_verification_checklist": "Verification Checklist" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L586 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_verification_mindset": "Verification Mindset" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L628 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_verification_red_flags": "Verification Red Flags" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L615 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_what_verified_means": "What \"Verified\" Means" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L467 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_when_to_read": "When to Read" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L790 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_when_to_reason_your_code": "When to Reason (Your Code)" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L671 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_when_to_research_external_knowledge": "When to Research (External Knowledge)" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L644 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_when_to_return_checkpoints": "When to Return Checkpoints" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L1207 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_when_to_write": "When to Write" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L794 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_agent_working_backwards": "Working Backwards" | kind=entity | source=.github/agents/gsd-debugger.agent.md:L287 | neighbors=[gsd-debugger.agent.md]
- "agents_gsd_debugger_file_location_806": "File Location" | kind=entity | source=agents/gsd-debugger.md:L806 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_file_location_814": "File Location" | kind=entity | source=.claude/agents/gsd-debugger.md:L814 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "agents_gsd_debugger_hooks": "hooks:" | kind=entity | source=.claude/agents/gsd-debugger.md:L6 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_matcher_write_edit": "- matcher: \"Write|Edit\"" | kind=entity | source=.claude/agents/gsd-debugger.md:L8 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_after_checkpoint": "After Checkpoint" | kind=entity | source=agents/gsd-debugger.md:L1276 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_balance_research_and_reasoning": "Balance Research and Reasoning" | kind=entity | source=agents/gsd-debugger.md:L706 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_binary_search_divide_and_conquer": "Binary Search / Divide and Conquer" | kind=entity | source=agents/gsd-debugger.md:L162 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_checkpoint_format": "Checkpoint Format" | kind=entity | source=agents/gsd-debugger.md:L1212 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_checkpoint_reached": "CHECKPOINT REACHED" | kind=entity | source=agents/gsd-debugger.md:L1369 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_checkpoint_types": "Checkpoint Types" | kind=entity | source=agents/gsd-debugger.md:L1237 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_combining_techniques": "Combining Techniques" | kind=entity | source=agents/gsd-debugger.md:L450 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_comment_out_everything": "Comment Out Everything" | kind=entity | source=agents/gsd-debugger.md:L367 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_debug_complete_goal_find_and_fix": "DEBUG COMPLETE (goal: find_and_fix)" | kind=entity | source=agents/gsd-debugger.md:L1307 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_decision_point_when_to_act": "Decision Point: When to Act" | kind=entity | source=agents/gsd-debugger.md:L95 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_delta_debugging": "Delta Debugging" | kind=entity | source=agents/gsd-debugger.md:L196 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_differential_debugging": "Differential Debugging" | kind=entity | source=agents/gsd-debugger.md:L309 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_entry_format": "Entry Format" | kind=entity | source=agents/gsd-debugger.md:L774 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_environment_verification": "Environment Verification" | kind=entity | source=agents/gsd-debugger.md:L500 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_evidence_quality": "Evidence Quality" | kind=entity | source=agents/gsd-debugger.md:L81 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_experimental_design_framework": "Experimental Design Framework" | kind=entity | source=agents/gsd-debugger.md:L67 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_falsifiability_requirement": "Falsifiability Requirement" | kind=entity | source=agents/gsd-debugger.md:L44 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_file_structure": "File Structure" | kind=entity | source=agents/gsd-debugger.md:L813 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_follow_the_indirection": "Follow the Indirection" | kind=entity | source=agents/gsd-debugger.md:L404 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_forming_hypotheses": "Forming Hypotheses" | kind=entity | source=agents/gsd-debugger.md:L60 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_git_bisect": "Git Bisect" | kind=entity | source=agents/gsd-debugger.md:L387 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_how_to_research": "How to Research" | kind=entity | source=agents/gsd-debugger.md:L687 | neighbors=[gsd-debugger.md]
- "agents_gsd_debugger_md_agents_gsd_debugger_hypothesis_testing_pitfalls": "Hypothesis Testing Pitfalls" | kind=entity | source=agents/gsd-debugger.md:L148 | neighbors=[gsd-debugger.md]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-108.json

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
