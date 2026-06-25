# Node Description Batch 204 of 412

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

- "docs_professional_baseline_this_document_is_also_the_template_for_all_other_ptow_projects": "This document is also the template for all other PTOW projects." | kind=entity | source=docs/PROFESSIONAL_BASELINE.md:L4 | neighbors=[PROFESSIONAL_BASELINE.md] | lang=en
- "docs_professional_baseline_using_this_as_a_template": "USING THIS AS A TEMPLATE" | kind=entity | source=docs/PROFESSIONAL_BASELINE.md:L278 | neighbors=[Last updated: 2026-05-18] | lang=en
- "docs_professional_baseline_what_professional_baseline_means_for_this_team": "WHAT \"PROFESSIONAL BASELINE\" MEANS FOR THIS TEAM" | kind=entity | source=docs/PROFESSIONAL_BASELINE.md:L9 | neighbors=[Last updated: 2026-05-18] | lang=en
- "docs_professional_baseline_what_the_e2e_suite_covers_confirmed": "What the E2E Suite Covers (confirmed)" | kind=entity | source=docs/PROFESSIONAL_BASELINE.md:L91 | neighbors=[DIMENSION 3 — TESTING] | lang=en
- "docs_roadmap_apt_fsm_roadmap": "APT FSM — ROADMAP" | kind=entity | source=docs/ROADMAP.md:L1 | neighbors=[ROADMAP.md] | lang=en
- "docs_roadmap_current_state": "CURRENT STATE" | kind=entity | source=docs/ROADMAP.md:L9 | neighbors=[Last Updated: S137 (2026-06-04)] | lang=en
- "docs_roadmap_not_on_the_roadmap_intentionally_deferred": "NOT ON THE ROADMAP (intentionally deferred)" | kind=entity | source=docs/ROADMAP.md:L163 | neighbors=[Last Updated: S137 (2026-06-04)] | lang=en
- "docs_roadmap_risk": "Risk" | kind=entity | source=docs/ROADMAP.md:L45 | neighbors=[PHASE 1 — OPERATIONAL LOOP] | lang=en
- "docs_roadmap_sequence_locked_phase_n_cannot_start_until_phase_n_1_passes_its_gate": "Sequence-locked. Phase N cannot start until Phase N-1 passes its gate." | kind=entity | source=docs/ROADMAP.md:L2 | neighbors=[ROADMAP.md] | lang=en
- "docs_roadmap_supersedes_central_command_expansion_roadmap_md_for_apt_fsm_build_sequencing": "Supersedes CENTRAL_COMMAND_EXPANSION_ROADMAP.md for APT FSM build sequencing." | kind=entity | source=docs/ROADMAP.md:L4 | neighbors=[ROADMAP.md] | lang=en
- "docs_roadmap_the_sequence_law": "THE SEQUENCE LAW" | kind=entity | source=docs/ROADMAP.md:L148 | neighbors=[Last Updated: S137 (2026-06-04)] | lang=en
- "docs_roadmap_this_is_the_build_order_no_skipping_no_parallel_phase_work": "This is the build order. No skipping. No parallel phase work." | kind=entity | source=docs/ROADMAP.md:L3 | neighbors=[ROADMAP.md] | lang=en
- "docs_runbook_central_command_incident_runbook": "CENTRAL COMMAND — INCIDENT RUNBOOK" | kind=entity | source=docs/RUNBOOK.md:L1 | neighbors=[RUNBOOK.md] | lang=en
- "docs_runbook_check_the_failing_job": "Check the failing job" | kind=entity | source=docs/RUNBOOK.md:L184 | neighbors=[SCENARIO 6 — GitHub Actions CI fails on…] | lang=en
- "docs_runbook_quick_reference_dashboards": "QUICK REFERENCE — DASHBOARDS" | kind=entity | source=docs/RUNBOOK.md:L7 | neighbors=[Last updated: 2026-05-19] | lang=en
- "docs_runbook_reading_a_sentinel_alert": "Reading a Sentinel alert" | kind=entity | source=docs/RUNBOOK.md:L201 | neighbors=[SCENARIO 7 — Railway Sentinel fires an …] | lang=pt
- "docs_runbook_roll_back_cc2_0_next_js_vercel": "Roll back CC2.0 (Next.js / Vercel)" | kind=entity | source=docs/RUNBOOK.md:L25 | neighbors=[ROLLBACK PROCEDURES] | lang=en
- "docs_runbook_roll_back_code_js": "Roll back Code.js" | kind=entity | source=docs/RUNBOOK.md:L40 | neighbors=[ROLLBACK PROCEDURES] | lang=en
- "docs_runbook_roll_back_dashboardapi_gs": "Roll back DashboardAPI.gs" | kind=entity | source=docs/RUNBOOK.md:L31 | neighbors=[ROLLBACK PROCEDURES] | lang=en
- "docs_runbook_roll_back_techpwa_gs": "Roll back TechPWA.gs" | kind=entity | source=docs/RUNBOOK.md:L36 | neighbors=[ROLLBACK PROCEDURES] | lang=en
- "docs_runbook_secret_rotation_schedule": "SECRET ROTATION SCHEDULE" | kind=entity | source=docs/RUNBOOK.md:L215 | neighbors=[Last updated: 2026-05-19] | lang=en
- "docs_runbook_slo_service_level_objective": "SLO (Service Level Objective)" | kind=entity | source=docs/RUNBOOK.md:L229 | neighbors=[Last updated: 2026-05-19] | lang=en
- "docs_runbook_step_1_check_neon_status": "Step 1 — Check Neon status" | kind=entity | source=docs/RUNBOOK.md:L114 | neighbors=[SCENARIO 3 — Neon database unreachable] | lang=en
- "docs_runbook_step_1_check_vercel_deployment_status": "Step 1 — Check Vercel deployment status" | kind=entity | source=docs/RUNBOOK.md:L83 | neighbors=[SCENARIO 2 — Dashboard goes blank or re…] | lang=en
- "docs_runbook_step_1_confirm_emails_are_arriving": "Step 1 — Confirm emails are arriving" | kind=entity | source=docs/RUNBOOK.md:L51 | neighbors=[SCENARIO 1 — No new work orders appeari…] | lang=en
- "docs_runbook_step_1_read_the_error_email": "Step 1 — Read the error email" | kind=entity | source=docs/RUNBOOK.md:L156 | neighbors=[SCENARIO 5 — Tech PWA returns 500 / tec…] | lang=en
- "docs_runbook_step_1_read_the_vercel_build_log": "Step 1 — Read the Vercel build log" | kind=entity | source=docs/RUNBOOK.md:L134 | neighbors=[SCENARIO 4 — Vercel deploy fails after …] | lang=en
- "docs_runbook_step_2_check_gas_execution_log": "Step 2 — Check GAS execution log" | kind=entity | source=docs/RUNBOOK.md:L54 | neighbors=[SCENARIO 1 — No new work orders appeari…] | lang=en
- "docs_runbook_step_2_check_if_it_s_an_api_key_mismatch": "Step 2 — Check if it's an API key mismatch" | kind=entity | source=docs/RUNBOOK.md:L87 | neighbors=[SCENARIO 2 — Dashboard goes blank or re…] | lang=en
- "docs_runbook_step_2_check_techpwa_gs_execution_log": "Step 2 — Check TechPWA.gs execution log" | kind=entity | source=docs/RUNBOOK.md:L159 | neighbors=[SCENARIO 5 — Tech PWA returns 500 / tec…] | lang=en
- "docs_runbook_step_2_retrigger": "Step 2 — Retrigger" | kind=entity | source=docs/RUNBOOK.md:L144 | neighbors=[SCENARIO 4 — Vercel deploy fails after …] | lang=en
- "docs_runbook_step_2_verify_database_url_is_correct": "Step 2 — Verify DATABASE_URL is correct" | kind=entity | source=docs/RUNBOOK.md:L120 | neighbors=[SCENARIO 3 — Neon database unreachable] | lang=en
- "docs_runbook_step_3_check_dashboardapi_gs_execution_log": "Step 3 — Check DashboardAPI.gs execution log" | kind=entity | source=docs/RUNBOOK.md:L96 | neighbors=[SCENARIO 2 — Dashboard goes blank or re…] | lang=en
- "docs_runbook_step_3_diagnose_by_action": "Step 3 — Diagnose by action" | kind=entity | source=docs/RUNBOOK.md:L162 | neighbors=[SCENARIO 5 — Tech PWA returns 500 / tec…] | lang=en
- "docs_runbook_step_3_if_urgent_and_unfixable": "Step 3 — If urgent and unfixable" | kind=entity | source=docs/RUNBOOK.md:L147 | neighbors=[SCENARIO 4 — Vercel deploy fails after …] | lang=en
- "docs_runbook_step_3_verify_triggers_are_alive": "Step 3 — Verify triggers are alive" | kind=entity | source=docs/RUNBOOK.md:L66 | neighbors=[SCENARIO 1 — No new work orders appeari…] | lang=en
- "docs_runbook_step_3_wait": "Step 3 — Wait" | kind=entity | source=docs/RUNBOOK.md:L125 | neighbors=[SCENARIO 3 — Neon database unreachable] | lang=en
- "docs_runbook_step_4_check_cloudflare_worker": "Step 4 — Check Cloudflare Worker" | kind=entity | source=docs/RUNBOOK.md:L99 | neighbors=[SCENARIO 2 — Dashboard goes blank or re…] | lang=en
- "docs_runbook_step_4_check_gemini_api_dashboard": "Step 4 — Check Gemini API dashboard" | kind=entity | source=docs/RUNBOOK.md:L73 | neighbors=[SCENARIO 1 — No new work orders appeari…] | lang=en
- "docs_runbook_step_4_test_the_cf_worker_directly": "Step 4 — Test the CF Worker directly" | kind=entity | source=docs/RUNBOOK.md:L171 | neighbors=[SCENARIO 5 — Tech PWA returns 500 / tec…] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-203.json

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
