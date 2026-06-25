# Node Description Batch 202 of 412

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

- "docs_gas_migration_scope_open_security_gap": "Open Security Gap" | kind=entity | source=docs/GAS_MIGRATION_SCOPE.md:L400 | neighbors=[GAS Migration Scope] | lang=en
- "docs_gas_migration_scope_phase_a_dead_code_cleanup_zero_risk": "Phase A: Dead Code Cleanup (Zero Risk)" | kind=entity | source=docs/GAS_MIGRATION_SCOPE.md:L244 | neighbors=[Migration Phases] | lang=pt
- "docs_gas_migration_scope_phase_b_pure_js_utility_migration_low_risk": "Phase B: Pure JS Utility Migration (LOW Risk)" | kind=entity | source=docs/GAS_MIGRATION_SCOPE.md:L257 | neighbors=[Migration Phases] | lang=en
- "docs_gas_migration_scope_phase_c_neon_only_writes_low_medium_risk": "Phase C: Neon-Only Writes (LOW-MEDIUM Risk)" | kind=entity | source=docs/GAS_MIGRATION_SCOPE.md:L269 | neighbors=[Migration Phases] | lang=en
- "docs_gas_migration_scope_phase_d_dashboard_api_read_actions_low_risk": "Phase D: Dashboard API Read Actions (LOW Risk)" | kind=entity | source=docs/GAS_MIGRATION_SCOPE.md:L282 | neighbors=[Migration Phases] | lang=en
- "docs_gas_migration_scope_phase_e_sentinel_write_back_migration_low_risk": "Phase E: Sentinel Write-Back Migration (LOW Risk)" | kind=entity | source=docs/GAS_MIGRATION_SCOPE.md:L294 | neighbors=[Migration Phases] | lang=en
- "docs_gas_migration_scope_phase_f_feedback_comments_staff_permissions_low_medium_risk": "Phase F: Feedback + Comments + Staff Permissions (LOW-MEDIUM Risk)" | kind=entity | source=docs/GAS_MIGRATION_SCOPE.md:L304 | neighbors=[Migration Phases] | lang=en
- "docs_gas_migration_scope_phase_g_suggestion_engine_trade_durations_medium_risk": "Phase G: Suggestion Engine + Trade Durations (MEDIUM Risk)" | kind=entity | source=docs/GAS_MIGRATION_SCOPE.md:L313 | neighbors=[Migration Phases] | lang=en
- "docs_gas_migration_scope_phase_h_timecard_approval_medium_risk": "Phase H: Timecard Approval (MEDIUM Risk)" | kind=entity | source=docs/GAS_MIGRATION_SCOPE.md:L322 | neighbors=[Migration Phases] | lang=en
- "docs_gas_migration_scope_phase_i_createmanualjob_medium_risk": "Phase I: createManualJob (MEDIUM Risk)" | kind=entity | source=docs/GAS_MIGRATION_SCOPE.md:L332 | neighbors=[Migration Phases] | lang=en
- "docs_gas_migration_scope_phase_j_gmail_actions_high_risk": "Phase J: Gmail Actions (HIGH Risk)" | kind=entity | source=docs/GAS_MIGRATION_SCOPE.md:L341 | neighbors=[Migration Phases] | lang=en
- "docs_gas_migration_scope_phase_k_techpwa_auth_clock_events_high_risk": "Phase K: TechPWA Auth + Clock Events (HIGH Risk)" | kind=entity | source=docs/GAS_MIGRATION_SCOPE.md:L352 | neighbors=[Migration Phases] | lang=en
- "docs_gas_migration_scope_phase_l_email_polling_migration_very_high_risk_cc3_0": "Phase L: Email Polling Migration (VERY HIGH Risk — CC3.0)" | kind=entity | source=docs/GAS_MIGRATION_SCOPE.md:L370 | neighbors=[Migration Phases] | lang=en
- "docs_gas_migration_scope_phase_m_time_off_manager_blocked_on_tom_redesign": "Phase M: Time Off Manager (BLOCKED on TOM Redesign)" | kind=entity | source=docs/GAS_MIGRATION_SCOPE.md:L385 | neighbors=[Migration Phases] | lang=en
- "docs_gas_migration_scope_pitfall_1_removing_sheets_writes_before_neon_parity_is_confirmed": "Pitfall 1: Removing Sheets Writes Before Neon Parity Is Confirmed" | kind=entity | source=docs/GAS_MIGRATION_SCOPE.md:L404 | neighbors=[Migration Prerequisites and Pitfalls] | lang=en
- "docs_gas_migration_scope_pitfall_2_gmail_api_oauth_not_available_in_node_context": "Pitfall 2: Gmail API OAuth Not Available in Node Context" | kind=entity | source=docs/GAS_MIGRATION_SCOPE.md:L412 | neighbors=[Migration Prerequisites and Pitfalls] | lang=en
- "docs_gas_migration_scope_pitfall_3_techpwa_gs_url_hardcoded_in_pwa": "Pitfall 3: TechPWA.gs URL Hardcoded in PWA" | kind=entity | source=docs/GAS_MIGRATION_SCOPE.md:L421 | neighbors=[Migration Prerequisites and Pitfalls] | lang=en
- "docs_gas_migration_scope_pitfall_4_write_path_neon_only_flag_creates_false_confidence": "Pitfall 4: WRITE_PATH_NEON_ONLY Flag Creates False Confidence" | kind=entity | source=docs/GAS_MIGRATION_SCOPE.md:L429 | neighbors=[Migration Prerequisites and Pitfalls] | lang=en
- "docs_gas_migration_scope_pitfall_5_normalizing_status_values_in_two_places": "Pitfall 5: Normalizing Status Values in Two Places" | kind=entity | source=docs/GAS_MIGRATION_SCOPE.md:L437 | neighbors=[Migration Prerequisites and Pitfalls] | lang=en
- "docs_gas_migration_scope_project_constraints": "Project Constraints" | kind=entity | source=docs/GAS_MIGRATION_SCOPE.md:L7 | neighbors=[GAS Migration Scope] | lang=en
- "docs_gas_migration_scope_suggesttechs_js_functions": "SuggestTechs.js Functions" | kind=entity | source=docs/GAS_MIGRATION_SCOPE.md:L112 | neighbors=[GAS Migration Scope] | lang=en
- "docs_gas_migration_scope_techpwa_gs_functions": "TechPWA.gs Functions" | kind=entity | source=docs/GAS_MIGRATION_SCOPE.md:L126 | neighbors=[GAS Migration Scope] | lang=en
- "docs_known_vulns_ci_gate_is_set_to_audit_level_critical_blocks_critical_only": "CI gate is set to --audit-level=critical (blocks CRITICAL only)." | kind=entity | source=docs/KNOWN_VULNS.md:L4 | neighbors=[KNOWN_VULNS.md] | lang=en
- "docs_known_vulns_high_serialize_javascript_7_0_4": "HIGH — serialize-javascript <=7.0.4" | kind=entity | source=docs/KNOWN_VULNS.md:L9 | neighbors=[Revisit each entry when the named packa…] | lang=en
- "docs_known_vulns_known_vulnerabilities": "KNOWN VULNERABILITIES" | kind=entity | source=docs/KNOWN_VULNS.md:L1 | neighbors=[KNOWN_VULNS.md] | lang=en
- "docs_known_vulns_maintained_by_ag_last_updated_2026_05_21": "Maintained by: AG | Last updated: 2026-05-21" | kind=entity | source=docs/KNOWN_VULNS.md:L2 | neighbors=[KNOWN_VULNS.md] | lang=en
- "docs_known_vulns_moderate_esbuild_0_24_2": "MODERATE — esbuild <=0.24.2" | kind=entity | source=docs/KNOWN_VULNS.md:L20 | neighbors=[Revisit each entry when the named packa…] | lang=en
- "docs_known_vulns_moderate_postcss_8_5_10": "MODERATE — postcss <8.5.10" | kind=entity | source=docs/KNOWN_VULNS.md:L30 | neighbors=[Revisit each entry when the named packa…] | lang=en
- "docs_known_vulns_these_high_vulns_cannot_be_fixed_without_breaking_dependency_changes": "These HIGH vulns cannot be fixed without breaking dependency changes." | kind=entity | source=docs/KNOWN_VULNS.md:L3 | neighbors=[KNOWN_VULNS.md] | lang=en
- "docs_operator_guide_1_session_start_protocol": "1. SESSION START PROTOCOL" | kind=entity | source=docs/OPERATOR_GUIDE.md:L16 | neighbors=[Last Updated: S137 (2026-06-04)] | lang=en
- "docs_operator_guide_4_approval_gates": "4. APPROVAL GATES" | kind=entity | source=docs/OPERATOR_GUIDE.md:L102 | neighbors=[Last Updated: S137 (2026-06-04)] | lang=en
- "docs_operator_guide_5_warning_signs_claude_is_drifting": "5. WARNING SIGNS CLAUDE IS DRIFTING" | kind=entity | source=docs/OPERATOR_GUIDE.md:L117 | neighbors=[Last Updated: S137 (2026-06-04)] | lang=en
- "docs_operator_guide_7_emergency_stop": "7. EMERGENCY STOP" | kind=entity | source=docs/OPERATOR_GUIDE.md:L154 | neighbors=[Last Updated: S137 (2026-06-04)] | lang=en
- "docs_operator_guide_8_the_roadmap_rule": "8. THE ROADMAP RULE" | kind=entity | source=docs/OPERATOR_GUIDE.md:L173 | neighbors=[Last Updated: S137 (2026-06-04)] | lang=en
- "docs_operator_guide_9_glossary": "9. GLOSSARY" | kind=entity | source=docs/OPERATOR_GUIDE.md:L186 | neighbors=[Last Updated: S137 (2026-06-04)] | lang=en
- "docs_operator_guide_apt_fsm_operator_guide": "APT FSM — OPERATOR GUIDE" | kind=entity | source=docs/OPERATOR_GUIDE.md:L1 | neighbors=[OPERATOR_GUIDE.md] | lang=en
- "docs_operator_guide_bad_requests_method_focused_claude_decides_these": "BAD requests (method-focused — Claude decides these):" | kind=entity | source=docs/OPERATOR_GUIDE.md:L43 | neighbors=[2. HOW TO REQUEST WORK] | lang=en
- "docs_operator_guide_decision_making": "Decision-making" | kind=entity | source=docs/OPERATOR_GUIDE.md:L145 | neighbors=[6. YOUR COMPLETE TECHNICAL ROLE] | lang=en
- "docs_operator_guide_for_brandon_plain_english_no_coding_knowledge_required": "For Brandon. Plain English. No coding knowledge required." | kind=entity | source=docs/OPERATOR_GUIDE.md:L2 | neighbors=[OPERATOR_GUIDE.md] | lang=en
- "docs_operator_guide_good_requests_outcome_focused": "GOOD requests (outcome-focused):" | kind=entity | source=docs/OPERATOR_GUIDE.md:L37 | neighbors=[2. HOW TO REQUEST WORK] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-201.json

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
