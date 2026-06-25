# Node Description Batch 378 of 412

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

- "specs_sprint_tier_2_5_security_branch_feat_tier_2_5_security_hardening": "Branch: feat/tier-2-5-security-hardening" | kind=entity | source=specs/SPRINT_TIER_2_5_SECURITY.md:L2 | neighbors=[SPRINT_TIER_2_5_SECURITY.md]
- "specs_sprint_tier_2_5_security_claude_code_review_flags_for_manual_review_auth_path": "Claude Code review flags (for manual review — auth path)" | kind=entity | source=specs/SPRINT_TIER_2_5_SECURITY.md:L843 | neighbors=[Claude Code authoring date: 2026-05-27]
- "specs_sprint_tier_2_5_security_goal": "Goal" | kind=entity | source=specs/SPRINT_TIER_2_5_SECURITY.md:L8 | neighbors=[Claude Code authoring date: 2026-05-27]
- "specs_sprint_tier_2_5_security_orchestrator_usage": "Orchestrator usage" | kind=entity | source=specs/SPRINT_TIER_2_5_SECURITY.md:L829 | neighbors=[Claude Code authoring date: 2026-05-27]
- "specs_sprint_tier_2_5_security_prerequisites_brandon_dashboard_actions_before_ag_starts_any_code": "Prerequisites — Brandon dashboard actions (before AG starts any code)" | kind=entity | source=specs/SPRINT_TIER_2_5_SECURITY.md:L20 | neighbors=[Claude Code authoring date: 2026-05-27]
- "specs_sprint_tier_2_5_security_security_posture_impact": "Security Posture Impact" | kind=entity | source=specs/SPRINT_TIER_2_5_SECURITY.md:L12 | neighbors=[Claude Code authoring date: 2026-05-27]
- "specs_sprint_tier_2_5_security_spec_scope_exact_files_ag_may_touch": "Spec Scope — exact files AG may touch" | kind=entity | source=specs/SPRINT_TIER_2_5_SECURITY.md:L32 | neighbors=[Claude Code authoring date: 2026-05-27]
- "specs_sprint_tier_2_5_security_sprint_tier_2_5_security_quality_hardening": "SPRINT: Tier 2.5 — Security & Quality Hardening" | kind=entity | source=specs/SPRINT_TIER_2_5_SECURITY.md:L1 | neighbors=[SPRINT_TIER_2_5_SECURITY.md]
- "specs_sprint_tier_2_5_security_status_ready_for_execution": "Status: READY FOR EXECUTION" | kind=entity | source=specs/SPRINT_TIER_2_5_SECURITY.md:L3 | neighbors=[SPRINT_TIER_2_5_SECURITY.md]
- "specs_sprint_tier_2_5_security_task_1_branch_verify_package_install": "Task 1 — Branch verify + package install" | kind=entity | source=specs/SPRINT_TIER_2_5_SECURITY.md:L60 | neighbors=[Task List]
- "specs_sprint_tier_2_5_security_task_10_update_field_clock_out_route_ts": "Task 10 — Update `field/clock-out/route.ts`" | kind=entity | source=specs/SPRINT_TIER_2_5_SECURITY.md:L518 | neighbors=[Task List]
- "specs_sprint_tier_2_5_security_task_11_update_field_job_complete_route_ts": "Task 11 — Update `field/job/complete/route.ts`" | kind=entity | source=specs/SPRINT_TIER_2_5_SECURITY.md:L543 | neighbors=[Task List]
- "specs_sprint_tier_2_5_security_task_12_update_field_shift_start_route_ts": "Task 12 — Update `field/shift/start/route.ts`" | kind=entity | source=specs/SPRINT_TIER_2_5_SECURITY.md:L568 | neighbors=[Task List]
- "specs_sprint_tier_2_5_security_task_13_update_field_shift_end_route_ts": "Task 13 — Update `field/shift/end/route.ts`" | kind=entity | source=specs/SPRINT_TIER_2_5_SECURITY.md:L599 | neighbors=[Task List]
- "specs_sprint_tier_2_5_security_task_14_update_field_shift_status_route_ts": "Task 14 — Update `field/shift/status/route.ts`" | kind=entity | source=specs/SPRINT_TIER_2_5_SECURITY.md:L624 | neighbors=[Task List]
- "specs_sprint_tier_2_5_security_task_15_update_field_jobs_route_ts": "Task 15 — Update `field/jobs/route.ts`" | kind=entity | source=specs/SPRINT_TIER_2_5_SECURITY.md:L655 | neighbors=[Task List]
- "specs_sprint_tier_2_5_security_task_16_create_tech_pwa_src_app_api_health_route_ts": "Task 16 — Create `tech-pwa/src/app/api/health/route.ts`" | kind=entity | source=specs/SPRINT_TIER_2_5_SECURITY.md:L671 | neighbors=[Task List]
- "specs_sprint_tier_2_5_security_task_17_investigate_tests_e2e_auth_spec_ts_34_7_p_7": "Task 17 — Investigate `tests/e2e/auth.spec.ts:34:7` (P-7)" | kind=entity | source=specs/SPRINT_TIER_2_5_SECURITY.md:L702 | neighbors=[Task List]
- "specs_sprint_tier_2_5_security_task_18_audit_36_skipped_playwright_tests_p_8": "Task 18 — Audit 36 skipped Playwright tests (P-8)" | kind=entity | source=specs/SPRINT_TIER_2_5_SECURITY.md:L717 | neighbors=[Task List]
- "specs_sprint_tier_2_5_security_task_19_npx_tsc_noemit_diff_push_stop": "Task 19 — `npx tsc --noEmit` → diff → push → stop" | kind=entity | source=specs/SPRINT_TIER_2_5_SECURITY.md:L740 | neighbors=[Task List]
- "specs_sprint_tier_2_5_security_task_2_create_tech_pwa_src_lib_ratelimit_ts": "Task 2 — Create `tech-pwa/src/lib/rateLimit.ts`" | kind=entity | source=specs/SPRINT_TIER_2_5_SECURITY.md:L87 | neighbors=[Task List]
- "specs_sprint_tier_2_5_security_task_20_test_sprint_separate_session_after_claude_code_pass_on_diff": "Task 20 — Test sprint (separate session, after Claude Code PASS on diff)" | kind=entity | source=specs/SPRINT_TIER_2_5_SECURITY.md:L758 | neighbors=[Task List]
- "specs_sprint_tier_2_5_security_task_21_merge": "Task 21 — Merge" | kind=entity | source=specs/SPRINT_TIER_2_5_SECURITY.md:L823 | neighbors=[Task List]
- "specs_sprint_tier_2_5_security_task_3_create_tech_pwa_src_lib_fieldschemas_ts": "Task 3 — Create `tech-pwa/src/lib/fieldSchemas.ts`" | kind=entity | source=specs/SPRINT_TIER_2_5_SECURITY.md:L152 | neighbors=[Task List]
- "specs_sprint_tier_2_5_security_task_4_rewrite_tech_pwa_src_app_api_field_auth_login_route_ts": "Task 4 — Rewrite `tech-pwa/src/app/api/field/auth/login/route.ts`" | kind=entity | source=specs/SPRINT_TIER_2_5_SECURITY.md:L221 | neighbors=[Task List]
- "specs_sprint_tier_2_5_security_task_5_update_tech_pwa_src_lib_fieldauth_ts": "Task 5 — Update `tech-pwa/src/lib/fieldAuth.ts`" | kind=entity | source=specs/SPRINT_TIER_2_5_SECURITY.md:L354 | neighbors=[Task List]
- "specs_sprint_tier_2_5_security_task_6_update_field_attestation_sign_route_ts": "Task 6 — Update `field/attestation/sign/route.ts`" | kind=entity | source=specs/SPRINT_TIER_2_5_SECURITY.md:L407 | neighbors=[Task List]
- "specs_sprint_tier_2_5_security_task_7_update_field_break_start_route_ts": "Task 7 — Update `field/break/start/route.ts`" | kind=entity | source=specs/SPRINT_TIER_2_5_SECURITY.md:L441 | neighbors=[Task List]
- "specs_sprint_tier_2_5_security_task_8_update_field_break_end_route_ts": "Task 8 — Update `field/break/end/route.ts`" | kind=entity | source=specs/SPRINT_TIER_2_5_SECURITY.md:L466 | neighbors=[Task List]
- "specs_sprint_tier_2_5_security_task_9_update_field_clock_in_route_ts": "Task 9 — Update `field/clock-in/route.ts`" | kind=entity | source=specs/SPRINT_TIER_2_5_SECURITY.md:L491 | neighbors=[Task List]
- "specs_tech_pwa_api_spec_apt_tech_pwa_api_specification": "APT Tech PWA — API Specification" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L1 | neighbors=[TECH_PWA_API_SPEC.md]
- "specs_tech_pwa_api_spec_base_url": "Base URL" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L16 | neighbors=[For use with Google Antigravity to buil…]
- "specs_tech_pwa_api_spec_ca_break_compliance_warnings": "CA Break Compliance Warnings" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L456 | neighbors=[For use with Google Antigravity to buil…]
- "specs_tech_pwa_api_spec_deployment": "Deployment" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L597 | neighbors=[For use with Google Antigravity to buil…]
- "specs_tech_pwa_api_spec_employees_sheet_new_columns_required": "Employees Sheet — New Columns Required" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L582 | neighbors=[For use with Google Antigravity to buil…]
- "specs_tech_pwa_api_spec_error_response_shape_all_endpoints": "Error Response Shape (all endpoints)" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L55 | neighbors=[For use with Google Antigravity to buil…]
- "specs_tech_pwa_api_spec_flow": "Flow" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L40 | neighbors=[Authentication]
- "specs_tech_pwa_api_spec_get_gettechjobs": "GET — getTechJobs" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L174 | neighbors=[Endpoints]
- "specs_tech_pwa_api_spec_get_gettechstatus": "GET — getTechStatus" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L215 | neighbors=[Endpoints]
- "specs_tech_pwa_api_spec_job": "Job" | kind=entity | source=specs/TECH_PWA_API_SPEC.md:L83 | neighbors=[Data Models]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-377.json

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
