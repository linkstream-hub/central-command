# Node Description Batch 86 of 412

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

- "10_gas_migration_scope_10_02_summary_addressed_gaps": "Addressed Gaps" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-02-SUMMARY.md:L6 | neighbors=[Phase 10: GAS Migration Scope - Documen…] | lang=en
- "10_gas_migration_scope_10_02_summary_execution_overview": "Execution Overview" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-02-SUMMARY.md:L3 | neighbors=[Phase 10: GAS Migration Scope - Documen…] | lang=en
- "10_gas_migration_scope_10_02_summary_result": "Result" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-02-SUMMARY.md:L17 | neighbors=[Phase 10: GAS Migration Scope - Documen…] | lang=en
- "10_gas_migration_scope_10_research": "10-RESEARCH.md" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L1 | neighbors=[Phase 10: GAS Migration Scope — Research] | lang=en
- "10_gas_migration_scope_10_research_applicable_asvs_categories": "Applicable ASVS Categories" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L551 | neighbors=[Security Domain] | lang=en
- "10_gas_migration_scope_10_research_architectural_responsibility_map": "Architectural Responsibility Map" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L48 | neighbors=[Phase 10: GAS Migration Scope — Research] | lang=en
- "10_gas_migration_scope_10_research_assumptions_log": "Assumptions Log" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L569 | neighbors=[Phase 10: GAS Migration Scope — Research] | lang=en
- "10_gas_migration_scope_10_research_don_t_hand_roll": "Don't Hand-Roll" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L452 | neighbors=[Phase 10: GAS Migration Scope — Research] | lang=en
- "10_gas_migration_scope_10_research_environment_availability": "Environment Availability" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L525 | neighbors=[Phase 10: GAS Migration Scope — Research] | lang=en
- "10_gas_migration_scope_10_research_file_1_code_js_root_project_lead_parsing_email_triggers": "File 1: Code.js (root project — Lead Parsing + email triggers)" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L81 | neighbors=[Full Function Inventory] | lang=en
- "10_gas_migration_scope_10_research_file_2_suggesttechs_js_root_project_support_module": "File 2: SuggestTechs.js (root project — support module)" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L152 | neighbors=[Full Function Inventory] | lang=en
- "10_gas_migration_scope_10_research_file_3_techpwa_gs_field_tech_api_deployed_as_web_app": "File 3: TechPWA.gs (field tech API — deployed as web app)" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L164 | neighbors=[Full Function Inventory] | lang=en
- "10_gas_migration_scope_10_research_file_4_dashboard_api_dashboardapi_gs": "File 4: dashboard-api/DashboardAPI.gs" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L224 | neighbors=[Full Function Inventory] | lang=en
- "10_gas_migration_scope_10_research_metadata": "Metadata" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L627 | neighbors=[Phase 10: GAS Migration Scope — Research] | lang=en
- "10_gas_migration_scope_10_research_open_questions": "Open Questions" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L580 | neighbors=[Phase 10: GAS Migration Scope — Research] | lang=en
- "10_gas_migration_scope_10_research_open_security_gap_documented_not_fixed_in_this_phase": "Open Security Gap (documented, not fixed in this phase)" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L561 | neighbors=[Security Domain] | lang=en
- "10_gas_migration_scope_10_research_phase_a_dead_code_cleanup_zero_risk": "Phase A: Dead Code Cleanup (Zero Risk)" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L300 | neighbors=[Migration Phases (Risk Order — Lowest t…] | lang=pt
- "10_gas_migration_scope_10_research_phase_b_pure_js_utility_migration_low_risk": "Phase B: Pure JS Utility Migration (LOW Risk)" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L313 | neighbors=[Migration Phases (Risk Order — Lowest t…] | lang=en
- "10_gas_migration_scope_10_research_phase_c_neon_only_writes_low_medium_risk": "Phase C: Neon-Only Writes (LOW-MEDIUM Risk)" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L325 | neighbors=[Migration Phases (Risk Order — Lowest t…] | lang=en
- "10_gas_migration_scope_10_research_phase_d_dashboard_api_read_actions_low_risk": "Phase D: Dashboard API Read Actions (LOW Risk)" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L338 | neighbors=[Migration Phases (Risk Order — Lowest t…] | lang=en
- "10_gas_migration_scope_10_research_phase_e_sentinel_write_back_migration_low_risk": "Phase E: Sentinel Write-Back Migration (LOW Risk)" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L350 | neighbors=[Migration Phases (Risk Order — Lowest t…] | lang=en
- "10_gas_migration_scope_10_research_phase_f_feedback_comments_staff_permissions_low_medium_risk": "Phase F: Feedback + Comments + Staff Permissions (LOW-MEDIUM Risk)" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L360 | neighbors=[Migration Phases (Risk Order — Lowest t…] | lang=en
- "10_gas_migration_scope_10_research_phase_g_suggestion_engine_trade_durations_medium_risk": "Phase G: Suggestion Engine + Trade Durations (MEDIUM Risk)" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L369 | neighbors=[Migration Phases (Risk Order — Lowest t…] | lang=en
- "10_gas_migration_scope_10_research_phase_h_timecard_approval_medium_risk": "Phase H: Timecard Approval (MEDIUM Risk)" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L378 | neighbors=[Migration Phases (Risk Order — Lowest t…] | lang=en
- "10_gas_migration_scope_10_research_phase_i_createmanualjob_medium_risk": "Phase I: createManualJob (MEDIUM Risk)" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L388 | neighbors=[Migration Phases (Risk Order — Lowest t…] | lang=en
- "10_gas_migration_scope_10_research_phase_j_gmail_actions_high_risk": "Phase J: Gmail Actions (HIGH Risk)" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L397 | neighbors=[Migration Phases (Risk Order — Lowest t…] | lang=en
- "10_gas_migration_scope_10_research_phase_k_techpwa_auth_clock_events_high_risk": "Phase K: TechPWA Auth + Clock Events (HIGH Risk)" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L408 | neighbors=[Migration Phases (Risk Order — Lowest t…] | lang=en
- "10_gas_migration_scope_10_research_phase_l_email_polling_migration_very_high_risk_cc3_0": "Phase L: Email Polling Migration (VERY HIGH Risk — CC3.0)" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L426 | neighbors=[Migration Phases (Risk Order — Lowest t…] | lang=en
- "10_gas_migration_scope_10_research_phase_m_time_off_manager_blocked_on_tom_redesign": "Phase M: Time Off Manager (BLOCKED on TOM Redesign)" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L441 | neighbors=[Migration Phases (Risk Order — Lowest t…] | lang=en
- "10_gas_migration_scope_10_research_pitfall_1_removing_sheets_writes_before_neon_parity_is_confirmed": "Pitfall 1: Removing Sheets Writes Before Neon Parity Is Confirmed" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L465 | neighbors=[Common Pitfalls] | lang=en
- "10_gas_migration_scope_10_research_pitfall_2_gmail_api_oauth_not_available_in_node_context": "Pitfall 2: Gmail API OAuth Not Available in Node Context" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L473 | neighbors=[Common Pitfalls] | lang=en
- "10_gas_migration_scope_10_research_pitfall_3_techpwa_gs_url_hardcoded_in_pwa": "Pitfall 3: TechPWA.gs URL Hardcoded in PWA" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L482 | neighbors=[Common Pitfalls] | lang=en
- "10_gas_migration_scope_10_research_pitfall_4_write_path_neon_only_flag_creates_false_confidence": "Pitfall 4: WRITE_PATH_NEON_ONLY Flag Creates False Confidence" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L490 | neighbors=[Common Pitfalls] | lang=en
- "10_gas_migration_scope_10_research_pitfall_5_normalizing_status_values_in_two_places": "Pitfall 5: Normalizing Status Values in Two Places" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L498 | neighbors=[Common Pitfalls] | lang=en
- "10_gas_migration_scope_10_research_primary_high_confidence": "Primary (HIGH confidence)" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L606 | neighbors=[Sources] | lang=en
- "10_gas_migration_scope_10_research_project_constraints_from_claude_md": "Project Constraints (from CLAUDE.md)" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L34 | neighbors=[Phase 10: GAS Migration Scope — Research] | lang=en
- "10_gas_migration_scope_10_research_secondary_medium_confidence": "Secondary (MEDIUM confidence)" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L617 | neighbors=[Sources] | lang=en
- "10_gas_migration_scope_10_research_state_of_the_art": "State of the Art" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L507 | neighbors=[Phase 10: GAS Migration Scope — Research] | lang=en
- "10_gas_migration_scope_10_research_summary": "Summary" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L9 | neighbors=[Phase 10: GAS Migration Scope — Research] | lang=en
- "10_gas_migration_scope_10_research_tertiary_low_confidence": "Tertiary (LOW confidence)" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L621 | neighbors=[Sources] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-085.json

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
