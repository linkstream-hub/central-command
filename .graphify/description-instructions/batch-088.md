# Node Description Batch 89 of 412

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

- "12_data_integrity_audit_12_research_deferred_ideas_out_of_scope": "Deferred Ideas (OUT OF SCOPE)" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L39 | neighbors=[User Constraints (from CONTEXT.md)]
- "12_data_integrity_audit_12_research_diff_report_engine_skeleton": "Diff + Report Engine Skeleton" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L515 | neighbors=[Code Examples]
- "12_data_integrity_audit_12_research_don_t_hand_roll": "Don't Hand-Roll" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L368 | neighbors=[Phase 12: Data Integrity Audit - Resear…]
- "12_data_integrity_audit_12_research_environment_availability": "Environment Availability" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L590 | neighbors=[Phase 12: Data Integrity Audit - Resear…]
- "12_data_integrity_audit_12_research_full_gspread_auth_tab_fetch": "Full gspread Auth + Tab Fetch" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L466 | neighbors=[Code Examples]
- "12_data_integrity_audit_12_research_job_comments_jobcomments_tab": "job_comments — JobComments tab" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L348 | neighbors=[Sheets Column Mapping (Confirmed from S…]
- "12_data_integrity_audit_12_research_job_comments_no_unique_key_high_risk_documented_gap": "job_comments — No Unique Key (HIGH risk, documented gap)" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L405 | neighbors=[Shadow-Write Gap Impact on Audit Logic]
- "12_data_integrity_audit_12_research_jobs_auth_header_discrepancy_medium_risk": "jobs — Auth Header Discrepancy (MEDIUM risk)" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L415 | neighbors=[Shadow-Write Gap Impact on Audit Logic]
- "12_data_integrity_audit_12_research_jobs_dispatch_queue_tab": "jobs — Dispatch Queue tab" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L318 | neighbors=[Sheets Column Mapping (Confirmed from S…]
- "12_data_integrity_audit_12_research_known_threat_patterns_for_this_stack": "Known Threat Patterns for this stack" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L660 | neighbors=[Security Domain]
- "12_data_integrity_audit_12_research_locked_decisions": "Locked Decisions" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L12 | neighbors=[User Constraints (from CONTEXT.md)]
- "12_data_integrity_audit_12_research_metadata": "Metadata" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L689 | neighbors=[Phase 12: Data Integrity Audit - Resear…]
- "12_data_integrity_audit_12_research_neon_query_with_window_filter": "Neon Query with Window Filter" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L489 | neighbors=[Code Examples]
- "12_data_integrity_audit_12_research_open_questions_resolved": "Open Questions (RESOLVED)" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L577 | neighbors=[Phase 12: Data Integrity Audit - Resear…]
- "12_data_integrity_audit_12_research_package_legitimacy_audit": "Package Legitimacy Audit" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L118 | neighbors=[Phase 12: Data Integrity Audit - Resear…]
- "12_data_integrity_audit_12_research_pattern_1_gspread_service_account_auth": "Pattern 1: gspread Service Account Auth" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L180 | neighbors=[Architecture Patterns]
- "12_data_integrity_audit_12_research_pattern_2_psycopg2_connection_to_neon_unpooled": "Pattern 2: psycopg2 Connection to Neon (Unpooled)" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L209 | neighbors=[Architecture Patterns]
- "12_data_integrity_audit_12_research_pattern_3_gspread_tab_access_and_row_fetch": "Pattern 3: gspread Tab Access and Row Fetch" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L235 | neighbors=[Architecture Patterns]
- "12_data_integrity_audit_12_research_pattern_4_21_day_window_date_filtering_in_python": "Pattern 4: 21-Day Window Date Filtering in Python" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L250 | neighbors=[Architecture Patterns]
- "12_data_integrity_audit_12_research_pattern_5_argparse_log_banner_following_ptow_adw_py_convention": "Pattern 5: argparse + log/banner Following ptow_adw.py Convention" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L278 | neighbors=[Architecture Patterns]
- "12_data_integrity_audit_12_research_phase_requirements": "Phase Requirements" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L47 | neighbors=[Phase 12: Data Integrity Audit - Resear…]
- "12_data_integrity_audit_12_research_phase_requirements_test_map": "Phase Requirements → Test Map" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L623 | neighbors=[Validation Architecture]
- "12_data_integrity_audit_12_research_pitfall_1_sheets_api_rate_limits_429_too_many_requests": "Pitfall 1: Sheets API Rate Limits (429 Too Many Requests)" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L425 | neighbors=[Common Pitfalls]
- "12_data_integrity_audit_12_research_pitfall_2_gspread_6_x_auth_api_changed_from_v5": "Pitfall 2: gspread 6.x Auth API Changed from v5" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L432 | neighbors=[Common Pitfalls]
- "12_data_integrity_audit_12_research_pitfall_3_sheets_date_column_returns_empty_strings_for_blank_rows": "Pitfall 3: Sheets Date Column Returns Empty Strings for Blank Rows" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L438 | neighbors=[Common Pitfalls]
- "12_data_integrity_audit_12_research_pitfall_4_psycopg2_date_s_with_text_column": "Pitfall 4: psycopg2 `date >= %s` with text column" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L444 | neighbors=[Common Pitfalls]
- "12_data_integrity_audit_12_research_pitfall_5_artifacts_directory_may_not_exist": "Pitfall 5: artifacts/ Directory May Not Exist" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L450 | neighbors=[Common Pitfalls]
- "12_data_integrity_audit_12_research_pitfall_6_neon_connection_string_missing_sslmode": "Pitfall 6: Neon Connection String Missing sslmode" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L456 | neighbors=[Common Pitfalls]
- "12_data_integrity_audit_12_research_primary_high_confidence": "Primary (HIGH confidence)" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L671 | neighbors=[Sources]
- "12_data_integrity_audit_12_research_recommended_project_structure": "Recommended Project Structure" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L167 | neighbors=[Architecture Patterns]
- "12_data_integrity_audit_12_research_sampling_rate": "Sampling Rate" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L633 | neighbors=[Validation Architecture]
- "12_data_integrity_audit_12_research_secondary_medium_confidence": "Secondary (MEDIUM confidence)" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L680 | neighbors=[Sources]
- "12_data_integrity_audit_12_research_state_of_the_art": "State of the Art" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L552 | neighbors=[Phase 12: Data Integrity Audit - Resear…]
- "12_data_integrity_audit_12_research_summary": "Summary" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L58 | neighbors=[Phase 12: Data Integrity Audit - Resear…]
- "12_data_integrity_audit_12_research_supporting_stdlib_no_install_needed": "Supporting (stdlib — no install needed)" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L91 | neighbors=[Standard Stack]
- "12_data_integrity_audit_12_research_system_architecture_diagram": "System Architecture Diagram" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L134 | neighbors=[Architecture Patterns]
- "12_data_integrity_audit_12_research_tertiary_low_confidence_needs_verification": "Tertiary (LOW confidence — needs verification)" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L683 | neighbors=[Sources]
- "12_data_integrity_audit_12_research_test_framework": "Test Framework" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L614 | neighbors=[Validation Architecture]
- "12_data_integrity_audit_12_research_time_records_dual_write_path_high_risk_documented_gap": "time_records — Dual Write Path (HIGH risk, documented gap)" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L385 | neighbors=[Shadow-Write Gap Impact on Audit Logic]
- "12_data_integrity_audit_12_research_time_records_time_records_tab": "time_records — Time Records tab" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L333 | neighbors=[Sheets Column Mapping (Confirmed from S…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-088.json

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
