# Node Description Batch 174 of 412

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

- "caveman_stats_readme_what_it_does": "What it does" | kind=entity | source=.github/skills/caveman-stats/README.md:L5 | neighbors=[caveman-stats] | lang=en
- "cc3_architecture_reset_milestone_cc3_0_architecture_reset_milestone": "CC3.0 — ARCHITECTURE RESET MILESTONE" | kind=entity | source=.planning/milestones/cc3-architecture-reset/MILESTONE.md:L1 | neighbors=[MILESTONE.md] | lang=en
- "cc3_architecture_reset_milestone_declared_session_83_feature_freeze_active_until_phase_1_complete": "Declared: Session 83. Feature freeze active until Phase 1 complete." | kind=entity | source=.planning/milestones/cc3-architecture-reset/MILESTONE.md:L2 | neighbors=[MILESTONE.md] | lang=en
- "cc3_architecture_reset_milestone_feature_freeze_rule": "FEATURE FREEZE RULE" | kind=entity | source=.planning/milestones/cc3-architecture-reset/MILESTONE.md:L111 | neighbors=[Last updated: 2026-05-19] | lang=en
- "cc3_architecture_reset_milestone_goal_eliminate_every_never_run_warning_from_claude_md_no_gas_api_servers_no_sheets_data_layer_no_plaintext_tokens_code_js_stays_for_gmail_parsing_only": "Goal: eliminate every \"never run\" warning from CLAUDE.md. No GAS API servers. N…" | kind=entity | source=.planning/milestones/cc3-architecture-reset/MILESTONE.md:L3 | neighbors=[MILESTONE.md] | lang=en
- "cc3_architecture_reset_milestone_north_star": "NORTH STAR" | kind=entity | source=.planning/milestones/cc3-architecture-reset/MILESTONE.md:L9 | neighbors=[Last updated: 2026-05-19] | lang=en
- "cc3_architecture_reset_milestone_phase_1_security_compliance_complete": "Phase 1 — Security & Compliance ✅ COMPLETE" | kind=entity | source=.planning/milestones/cc3-architecture-reset/MILESTONE.md:L24 | neighbors=[PHASES] | lang=en
- "cc3_architecture_reset_milestone_phase_2_infrastructure_foundation": "Phase 2 — Infrastructure Foundation" | kind=entity | source=.planning/milestones/cc3-architecture-reset/MILESTONE.md:L40 | neighbors=[PHASES] | lang=en
- "cc3_architecture_reset_milestone_phase_3_dashboardapi_gs_next_js_api_routes": "Phase 3 — DashboardAPI.gs → Next.js API Routes" | kind=entity | source=.planning/milestones/cc3-architecture-reset/MILESTONE.md:L51 | neighbors=[PHASES] | lang=en
- "cc3_architecture_reset_milestone_phase_4_techpwa_gs_next_js_api_routes": "Phase 4 — TechPWA.gs → Next.js API Routes" | kind=entity | source=.planning/milestones/cc3-architecture-reset/MILESTONE.md:L69 | neighbors=[PHASES] | lang=en
- "cc3_architecture_reset_milestone_phase_5_google_sheets_full_deprecation": "Phase 5 — Google Sheets Full Deprecation" | kind=entity | source=.planning/milestones/cc3-architecture-reset/MILESTONE.md:L87 | neighbors=[PHASES] | lang=en
- "cc3_architecture_reset_milestone_phase_6_code_js_hardening": "Phase 6 — Code.js Hardening" | kind=entity | source=.planning/milestones/cc3-architecture-reset/MILESTONE.md:L98 | neighbors=[PHASES] | lang=en
- "cc3_architecture_reset_milestone_success_criteria": "SUCCESS CRITERIA" | kind=entity | source=.planning/milestones/cc3-architecture-reset/MILESTONE.md:L130 | neighbors=[Last updated: 2026-05-19] | lang=en
- "cc3_architecture_reset_milestone_timeline_6_8_weeks_ai_pair_model": "Timeline: 6–8 weeks AI-pair model." | kind=entity | source=.planning/milestones/cc3-architecture-reset/MILESTONE.md:L4 | neighbors=[MILESTONE.md] | lang=en
- "claude_ag_reset_30_seconds": "AG RESET (30 seconds)" | kind=entity | source=CLAUDE.md:L168 | neighbors=[Ops reference. Non-narrative. Load refs…] | lang=en
- "claude_ag_spec_requirements": "AG SPEC REQUIREMENTS" | kind=entity | source=CLAUDE.md:L99 | neighbors=[Ops reference. Non-narrative. Load refs…] | lang=en
- "claude_agents_gsd_advisor_researcher_md_agents_gsd_advisor_researcher_full_maturity": "full_maturity" | kind=entity | source=.claude/agents/gsd-advisor-researcher.md:L37 | neighbors=[gsd-advisor-researcher.md] | lang=en
- "claude_agents_gsd_advisor_researcher_md_agents_gsd_advisor_researcher_minimal_decisive": "minimal_decisive" | kind=entity | source=.claude/agents/gsd-advisor-researcher.md:L48 | neighbors=[gsd-advisor-researcher.md] | lang=en
- "claude_agents_gsd_advisor_researcher_md_agents_gsd_advisor_researcher_standard": "standard" | kind=entity | source=.claude/agents/gsd-advisor-researcher.md:L43 | neighbors=[gsd-advisor-researcher.md] | lang=en
- "claude_agents_gsd_advisor_researcher_md_agents_gsd_advisor_researcher_tool_priority": "Tool Priority" | kind=entity | source=.claude/agents/gsd-advisor-researcher.md:L86 | neighbors=[gsd-advisor-researcher.md] | lang=en
- "claude_agents_gsd_assumptions_analyzer_md_agents_gsd_assumptions_analyzer_full_maturity": "full_maturity" | kind=entity | source=.claude/agents/gsd-assumptions-analyzer.md:L35 | neighbors=[gsd-assumptions-analyzer.md] | lang=en
- "claude_agents_gsd_assumptions_analyzer_md_agents_gsd_assumptions_analyzer_minimal_decisive": "minimal_decisive" | kind=entity | source=.claude/agents/gsd-assumptions-analyzer.md:L45 | neighbors=[gsd-assumptions-analyzer.md] | lang=en
- "claude_agents_gsd_assumptions_analyzer_md_agents_gsd_assumptions_analyzer_standard": "standard" | kind=entity | source=.claude/agents/gsd-assumptions-analyzer.md:L40 | neighbors=[gsd-assumptions-analyzer.md] | lang=en
- "claude_agents_gsd_code_fixer_md_agents_gsd_code_fixer_3_tier_verification": "3-Tier Verification" | kind=entity | source=.claude/agents/gsd-code-fixer.md:L96 | neighbors=[- before_write] | lang=en
- "claude_agents_gsd_code_fixer_md_agents_gsd_code_fixer_intelligent_fix_application": "Intelligent Fix Application" | kind=entity | source=.claude/agents/gsd-code-fixer.md:L39 | neighbors=[- before_write] | lang=en
- "claude_agents_gsd_code_fixer_md_agents_gsd_code_fixer_partial_failure_semantics": "Partial Failure Semantics" | kind=entity | source=.claude/agents/gsd-code-fixer.md:L625 | neighbors=[- before_write] | lang=en
- "claude_agents_gsd_code_fixer_md_agents_gsd_code_fixer_robust_review_md_parsing": "Robust REVIEW.md Parsing" | kind=entity | source=.claude/agents/gsd-code-fixer.md:L146 | neighbors=[- before_write] | lang=en
- "claude_agents_gsd_code_fixer_md_agents_gsd_code_fixer_safe_per_finding_rollback": "Safe Per-Finding Rollback" | kind=entity | source=.claude/agents/gsd-code-fixer.md:L65 | neighbors=[- before_write] | lang=en
- "claude_agents_gsd_code_reviewer_md_agents_gsd_code_reviewer_issues_to_detect": "Issues to Detect" | kind=entity | source=.claude/agents/gsd-code-reviewer.md:L55 | neighbors=[- before_write] | lang=en
- "claude_agents_gsd_code_reviewer_md_agents_gsd_code_reviewer_three_review_modes": "Three Review Modes" | kind=entity | source=.claude/agents/gsd-code-reviewer.md:L69 | neighbors=[- before_write] | lang=en
- "claude_agents_gsd_codebase_mapper_md_agents_gsd_codebase_mapper_architecture_md_template_arch_focus": "ARCHITECTURE.md Template (arch focus)" | kind=entity | source=.claude/agents/gsd-codebase-mapper.md:L340 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_codebase_mapper_md_agents_gsd_codebase_mapper_concerns_md_template_concerns_focus": "CONCERNS.md Template (concerns focus)" | kind=entity | source=.claude/agents/gsd-codebase-mapper.md:L727 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_codebase_mapper_md_agents_gsd_codebase_mapper_conventions_md_template_quality_focus": "CONVENTIONS.md Template (quality focus)" | kind=entity | source=.claude/agents/gsd-codebase-mapper.md:L537 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_codebase_mapper_md_agents_gsd_codebase_mapper_integrations_md_template_tech_focus": "INTEGRATIONS.md Template (tech focus)" | kind=entity | source=.claude/agents/gsd-codebase-mapper.md:L270 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_codebase_mapper_md_agents_gsd_codebase_mapper_stack_md_template_tech_focus": "STACK.md Template (tech focus)" | kind=entity | source=.claude/agents/gsd-codebase-mapper.md:L205 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_codebase_mapper_md_agents_gsd_codebase_mapper_structure_md_template_arch_focus": "STRUCTURE.md Template (arch focus)" | kind=entity | source=.claude/agents/gsd-codebase-mapper.md:L468 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_codebase_mapper_md_agents_gsd_codebase_mapper_testing_md_template_quality_focus": "TESTING.md Template (quality focus)" | kind=entity | source=.claude/agents/gsd-codebase-mapper.md:L617 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_debug_session_manager_md_agents_gsd_debug_session_manager_3a_root_cause_found": "3a. ROOT CAUSE FOUND" | kind=entity | source=.claude/agents/gsd-debug-session-manager.md:L104 | neighbors=[Step 3: Handle Agent Return] | lang=pt
- "claude_agents_gsd_debug_session_manager_md_agents_gsd_debug_session_manager_3b_tdd_checkpoint": "3b. TDD CHECKPOINT" | kind=entity | source=.claude/agents/gsd-debug-session-manager.md:L176 | neighbors=[Step 3: Handle Agent Return] | lang=en
- "claude_agents_gsd_debug_session_manager_md_agents_gsd_debug_session_manager_3c_debug_complete": "3c. DEBUG COMPLETE" | kind=entity | source=.claude/agents/gsd-debug-session-manager.md:L197 | neighbors=[Step 3: Handle Agent Return] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-173.json

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
