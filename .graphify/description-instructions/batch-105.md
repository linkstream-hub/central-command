# Node Description Batch 106 of 412

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

- "agents_domain_before_exploring_read_these": "Before exploring, read these" | kind=entity | source=docs/agents/domain.md:L5 | neighbors=[Domain Docs]
- "agents_domain_file_structure": "File structure" | kind=entity | source=docs/agents/domain.md:L12 | neighbors=[Domain Docs]
- "agents_domain_flag_adr_conflicts": "Flag ADR conflicts" | kind=entity | source=docs/agents/domain.md:L39 | neighbors=[Domain Docs]
- "agents_domain_use_the_glossary_s_vocabulary": "Use the glossary's vocabulary" | kind=entity | source=docs/agents/domain.md:L33 | neighbors=[Domain Docs]
- "agents_gsd_advisor_researcher_agent_full_maturity": "full_maturity" | kind=entity | source=.github/agents/gsd-advisor-researcher.agent.md:L37 | neighbors=[gsd-advisor-researcher.agent.md]
- "agents_gsd_advisor_researcher_agent_minimal_decisive": "minimal_decisive" | kind=entity | source=.github/agents/gsd-advisor-researcher.agent.md:L48 | neighbors=[gsd-advisor-researcher.agent.md]
- "agents_gsd_advisor_researcher_agent_standard": "standard" | kind=entity | source=.github/agents/gsd-advisor-researcher.agent.md:L43 | neighbors=[gsd-advisor-researcher.agent.md]
- "agents_gsd_advisor_researcher_agent_tool_priority": "Tool Priority" | kind=entity | source=.github/agents/gsd-advisor-researcher.agent.md:L86 | neighbors=[gsd-advisor-researcher.agent.md]
- "agents_gsd_advisor_researcher_md_agents_gsd_advisor_researcher_full_maturity": "full_maturity" | kind=entity | source=agents/gsd-advisor-researcher.md:L35 | neighbors=[gsd-advisor-researcher.md]
- "agents_gsd_advisor_researcher_md_agents_gsd_advisor_researcher_minimal_decisive": "minimal_decisive" | kind=entity | source=agents/gsd-advisor-researcher.md:L46 | neighbors=[gsd-advisor-researcher.md]
- "agents_gsd_advisor_researcher_md_agents_gsd_advisor_researcher_standard": "standard" | kind=entity | source=agents/gsd-advisor-researcher.md:L41 | neighbors=[gsd-advisor-researcher.md]
- "agents_gsd_advisor_researcher_md_agents_gsd_advisor_researcher_tool_priority": "Tool Priority" | kind=entity | source=agents/gsd-advisor-researcher.md:L84 | neighbors=[gsd-advisor-researcher.md]
- "agents_gsd_ai_researcher_command_echo_ai_spec_written_2_dev_null_true": "command: \"echo 'AI-SPEC written' 2>/dev/null || true\"" | kind=entity | source=.claude/agents/gsd-ai-researcher.md:L11 | neighbors=[gsd-ai-researcher.md]
- "agents_gsd_ai_researcher_hooks": "hooks:" | kind=entity | source=.claude/agents/gsd-ai-researcher.md:L6 | neighbors=[gsd-ai-researcher.md]
- "agents_gsd_ai_researcher_matcher_write_edit": "- matcher: \"Write|Edit\"" | kind=entity | source=.claude/agents/gsd-ai-researcher.md:L8 | neighbors=[gsd-ai-researcher.md]
- "agents_gsd_ai_researcher_posttooluse": "PostToolUse:" | kind=entity | source=.claude/agents/gsd-ai-researcher.md:L7 | neighbors=[gsd-ai-researcher.md]
- "agents_gsd_ai_researcher_type_command": "- type: command" | kind=entity | source=.claude/agents/gsd-ai-researcher.md:L10 | neighbors=[gsd-ai-researcher.md]
- "agents_gsd_assumptions_analyzer_agent_full_maturity": "full_maturity" | kind=entity | source=.github/agents/gsd-assumptions-analyzer.agent.md:L35 | neighbors=[gsd-assumptions-analyzer.agent.md]
- "agents_gsd_assumptions_analyzer_agent_minimal_decisive": "minimal_decisive" | kind=entity | source=.github/agents/gsd-assumptions-analyzer.agent.md:L45 | neighbors=[gsd-assumptions-analyzer.agent.md]
- "agents_gsd_assumptions_analyzer_agent_standard": "standard" | kind=entity | source=.github/agents/gsd-assumptions-analyzer.agent.md:L40 | neighbors=[gsd-assumptions-analyzer.agent.md]
- "agents_gsd_assumptions_analyzer_md_agents_gsd_assumptions_analyzer_full_maturity": "full_maturity" | kind=entity | source=agents/gsd-assumptions-analyzer.md:L33 | neighbors=[gsd-assumptions-analyzer.md]
- "agents_gsd_assumptions_analyzer_md_agents_gsd_assumptions_analyzer_minimal_decisive": "minimal_decisive" | kind=entity | source=agents/gsd-assumptions-analyzer.md:L43 | neighbors=[gsd-assumptions-analyzer.md]
- "agents_gsd_assumptions_analyzer_md_agents_gsd_assumptions_analyzer_standard": "standard" | kind=entity | source=agents/gsd-assumptions-analyzer.md:L38 | neighbors=[gsd-assumptions-analyzer.md]
- "agents_gsd_code_fixer_agent_3_tier_verification": "3-Tier Verification" | kind=entity | source=.github/agents/gsd-code-fixer.agent.md:L94 | neighbors=[gsd-code-fixer.agent.md]
- "agents_gsd_code_fixer_agent_intelligent_fix_application": "Intelligent Fix Application" | kind=entity | source=.github/agents/gsd-code-fixer.agent.md:L37 | neighbors=[gsd-code-fixer.agent.md]
- "agents_gsd_code_fixer_agent_partial_failure_semantics": "Partial Failure Semantics" | kind=entity | source=.github/agents/gsd-code-fixer.agent.md:L623 | neighbors=[gsd-code-fixer.agent.md]
- "agents_gsd_code_fixer_agent_robust_review_md_parsing": "Robust REVIEW.md Parsing" | kind=entity | source=.github/agents/gsd-code-fixer.agent.md:L144 | neighbors=[gsd-code-fixer.agent.md]
- "agents_gsd_code_fixer_agent_safe_per_finding_rollback": "Safe Per-Finding Rollback" | kind=entity | source=.github/agents/gsd-code-fixer.agent.md:L63 | neighbors=[gsd-code-fixer.agent.md]
- "agents_gsd_code_fixer_hooks": "hooks:" | kind=entity | source=.claude/agents/gsd-code-fixer.md:L6 | neighbors=[gsd-code-fixer.md]
- "agents_gsd_code_fixer_md_agents_gsd_code_fixer_3_tier_verification": "3-Tier Verification" | kind=entity | source=agents/gsd-code-fixer.md:L92 | neighbors=[gsd-code-fixer.md]
- "agents_gsd_code_fixer_md_agents_gsd_code_fixer_intelligent_fix_application": "Intelligent Fix Application" | kind=entity | source=agents/gsd-code-fixer.md:L35 | neighbors=[gsd-code-fixer.md]
- "agents_gsd_code_fixer_md_agents_gsd_code_fixer_partial_failure_semantics": "Partial Failure Semantics" | kind=entity | source=agents/gsd-code-fixer.md:L621 | neighbors=[gsd-code-fixer.md]
- "agents_gsd_code_fixer_md_agents_gsd_code_fixer_robust_review_md_parsing": "Robust REVIEW.md Parsing" | kind=entity | source=agents/gsd-code-fixer.md:L142 | neighbors=[gsd-code-fixer.md]
- "agents_gsd_code_fixer_md_agents_gsd_code_fixer_safe_per_finding_rollback": "Safe Per-Finding Rollback" | kind=entity | source=agents/gsd-code-fixer.md:L61 | neighbors=[gsd-code-fixer.md]
- "agents_gsd_code_reviewer_agent_issues_to_detect": "Issues to Detect" | kind=entity | source=.github/agents/gsd-code-reviewer.agent.md:L53 | neighbors=[gsd-code-reviewer.agent.md]
- "agents_gsd_code_reviewer_agent_three_review_modes": "Three Review Modes" | kind=entity | source=.github/agents/gsd-code-reviewer.agent.md:L67 | neighbors=[gsd-code-reviewer.agent.md]
- "agents_gsd_code_reviewer_hooks": "hooks:" | kind=entity | source=.claude/agents/gsd-code-reviewer.md:L6 | neighbors=[gsd-code-reviewer.md]
- "agents_gsd_code_reviewer_md_agents_gsd_code_reviewer_issues_to_detect": "Issues to Detect" | kind=entity | source=agents/gsd-code-reviewer.md:L51 | neighbors=[gsd-code-reviewer.md]
- "agents_gsd_code_reviewer_md_agents_gsd_code_reviewer_three_review_modes": "Three Review Modes" | kind=entity | source=agents/gsd-code-reviewer.md:L65 | neighbors=[gsd-code-reviewer.md]
- "agents_gsd_codebase_mapper_agent_architecture_md_template_arch_focus": "ARCHITECTURE.md Template (arch focus)" | kind=entity | source=.github/agents/gsd-codebase-mapper.agent.md:L334 | neighbors=[gsd-codebase-mapper.agent.md]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-105.json

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
