# Node Description Batch 159 of 412

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

- "archive_antigravity_session46_consolidated_spec_file_tech_pwa_src_components_dashboard_jobdetailmodal_tsx": "File: `tech-pwa/src/components/dashboard/JobDetailModal.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION46_CONSOLIDATED_SPEC.md:L67 | neighbors=[PART 1 — WO CARD BUG FIXES] | lang=en
- "archive_antigravity_session46_consolidated_spec_files_to_change": "FILES TO CHANGE" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION46_CONSOLIDATED_SPEC.md:L39 | neighbors=[ANTIGRAVITY SESSION 46 — CONSOLIDATED S…] | lang=en
- "archive_antigravity_session46_consolidated_spec_files_to_not_touch": "FILES TO NOT TOUCH" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION46_CONSOLIDATED_SPEC.md:L56 | neighbors=[ANTIGRAVITY SESSION 46 — CONSOLIDATED S…] | lang=en
- "archive_antigravity_session46_consolidated_spec_part_1_wo_card_bugs": "Part 1 — WO Card Bugs" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION46_CONSOLIDATED_SPEC.md:L1000 | neighbors=[VERIFICATION CHECKLIST] | lang=en
- "archive_antigravity_session46_consolidated_spec_part_2_dispatch_dashboard_ui": "Part 2 — Dispatch Dashboard UI" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION46_CONSOLIDATED_SPEC.md:L1009 | neighbors=[VERIFICATION CHECKLIST] | lang=en
- "archive_antigravity_session46_consolidated_spec_part_3_tech_pwa_workflow": "Part 3 — Tech PWA Workflow" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION46_CONSOLIDATED_SPEC.md:L1016 | neighbors=[VERIFICATION CHECKLIST] | lang=en
- "archive_antigravity_session46_consolidated_spec_what_to_keep_unchanged": "WHAT TO KEEP UNCHANGED" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION46_CONSOLIDATED_SPEC.md:L1029 | neighbors=[ANTIGRAVITY SESSION 46 — CONSOLIDATED S…] | lang=en
- "archive_antigravity_session50_spec_antigravity_session_50_spec_hardened_by_claude_code": "ANTIGRAVITY SESSION 50 SPEC — HARDENED BY CLAUDE CODE" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION50_SPEC.md:L1 | neighbors=[ANTIGRAVITY_SESSION50_SPEC.md] | lang=en
- "archive_antigravity_session50_spec_behavior": "Behavior" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION50_SPEC.md:L118 | neighbors=[FIX 1 — URL TAB DEEP-LINKING] | lang=en
- "archive_antigravity_session50_spec_error_handling": "ERROR HANDLING" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION50_SPEC.md:L480 | neighbors=[Status: APPROVED FOR AG IMPLEMENTATION] | lang=en
- "archive_antigravity_session50_spec_files_not_to_touch": "Files NOT to Touch" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION50_SPEC.md:L51 | neighbors=[FILE INVENTORY — CORRECTED PATHS] | lang=en
- "archive_antigravity_session50_spec_files_to_touch": "Files to Touch" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION50_SPEC.md:L38 | neighbors=[FILE INVENTORY — CORRECTED PATHS] | lang=en
- "archive_antigravity_session50_spec_fix_2_trainee_warning": "Fix 2: Trainee Warning" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION50_SPEC.md:L505 | neighbors=[VERIFICATION CHECKLIST] | lang=en
- "archive_antigravity_session50_spec_implementation_order": "IMPLEMENTATION ORDER" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION50_SPEC.md:L564 | neighbors=[Status: APPROVED FOR AG IMPLEMENTATION] | lang=en
- "archive_antigravity_session50_spec_result": "Result" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION50_SPEC.md:L250 | neighbors=[UI REDESIGN — JobQueueTable.tsx (Priori…] | lang=en
- "archive_antigravity_session50_spec_status_no_changes_required": "Status: NO CHANGES REQUIRED" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION50_SPEC.md:L439 | neighbors=[UI REDESIGN — AppSidebar.tsx] | lang=en
- "archive_antigravity_session50_spec_typescript": "TypeScript" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION50_SPEC.md:L542 | neighbors=[VERIFICATION CHECKLIST] | lang=en
- "archive_antigravity_session50_spec_typescript_requirements": "TYPESCRIPT REQUIREMENTS" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION50_SPEC.md:L467 | neighbors=[Status: APPROVED FOR AG IMPLEMENTATION] | lang=en
- "archive_antigravity_session50_spec_ui_clockedinbar": "UI: ClockedInBar" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION50_SPEC.md:L535 | neighbors=[VERIFICATION CHECKLIST] | lang=en
- "archive_antigravity_session50_spec_ui_jobqueuetable_priority_left_border": "UI: JobQueueTable Priority Left Border" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION50_SPEC.md:L516 | neighbors=[VERIFICATION CHECKLIST] | lang=en
- "archive_antigravity_session50_spec_ui_tech_job_detail_job_jobid_page_tsx": "UI: Tech Job Detail (job/[jobId]/page.tsx)" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION50_SPEC.md:L530 | neighbors=[VERIFICATION CHECKLIST] | lang=en
- "archive_antigravity_session50_spec_ui_tech_job_list_jobs_page_tsx": "UI: Tech Job List (jobs/page.tsx)" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION50_SPEC.md:L523 | neighbors=[VERIFICATION CHECKLIST] | lang=en
- "archive_antigravity_session50_spec_verified_literals_pulled_from_live_codebase": "VERIFIED LITERALS (pulled from live codebase)" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION50_SPEC.md:L10 | neighbors=[CRITICAL PREFLIGHT — READ BEFORE TOUCHI…] | lang=en
- "archive_antigravity_session50_spec_what_not_to_do": "WHAT NOT TO DO" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION50_SPEC.md:L547 | neighbors=[Status: APPROVED FOR AG IMPLEMENTATION] | lang=en
- "archive_antigravity_session52_spec": "ANTIGRAVITY_SESSION52_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION52_SPEC.md:L1 | neighbors=[ANTIGRAVITY SPEC — SESSION 52: NEON COM…] | lang=en
- "archive_antigravity_session52_spec_behavior_after_this_sprint": "BEHAVIOR AFTER THIS SPRINT" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION52_SPEC.md:L290 | neighbors=[ANTIGRAVITY SPEC — SESSION 52: NEON COM…] | lang=en
- "archive_antigravity_session52_spec_completion_checklist": "COMPLETION CHECKLIST" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION52_SPEC.md:L266 | neighbors=[ANTIGRAVITY SPEC — SESSION 52: NEON COM…] | lang=en
- "archive_antigravity_session52_spec_file_1_tech_pwa_src_lib_schema_ts_fix_nullable_fields": "FILE 1: `tech-pwa/src/lib/schema.ts` — fix nullable fields" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION52_SPEC.md:L51 | neighbors=[CHANGES — EXACT FILES] | lang=en
- "archive_antigravity_session52_spec_file_2_tech_pwa_src_app_api_comms_jobid_route_ts_new_file": "FILE 2: `tech-pwa/src/app/api/comms/[jobId]/route.ts` — NEW FILE" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION52_SPEC.md:L85 | neighbors=[CHANGES — EXACT FILES] | lang=en
- "archive_antigravity_session52_spec_file_3_tech_pwa_src_components_dashboard_jobdetailmodal_tsx_update_fetchthread": "FILE 3: `tech-pwa/src/components/dashboard/JobDetailModal.tsx` — update fetchTh…" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION52_SPEC.md:L207 | neighbors=[CHANGES — EXACT FILES] | lang=en
- "archive_antigravity_session52_spec_objective": "OBJECTIVE" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION52_SPEC.md:L8 | neighbors=[ANTIGRAVITY SPEC — SESSION 52: NEON COM…] | lang=en
- "archive_antigravity_session52_spec_prerequisites_already_done_do_not_repeat": "PREREQUISITES (already done — do not repeat)" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION52_SPEC.md:L15 | neighbors=[ANTIGRAVITY SPEC — SESSION 52: NEON COM…] | lang=pt
- "archive_antigravity_session52_spec_schema_migration_run_after_file_1": "SCHEMA MIGRATION — run after FILE 1" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION52_SPEC.md:L73 | neighbors=[CHANGES — EXACT FILES] | lang=en
- "archive_antigravity_session52_spec_verified_literals_pulled_from_live_files": "VERIFIED LITERALS — pulled from live files" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION52_SPEC.md:L25 | neighbors=[ANTIGRAVITY SPEC — SESSION 52: NEON COM…] | lang=en
- "archive_antigravity_session52_spec_what_not_to_touch": "WHAT NOT TO TOUCH" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION52_SPEC.md:L280 | neighbors=[ANTIGRAVITY SPEC — SESSION 52: NEON COM…] | lang=en
- "archive_antigravity_spec_architect_correction_spec_complete_replacement_code": "Complete Replacement Code" | kind=entity | source=specs/archive/ANTIGRAVITY_SPEC_ARCHITECT_CORRECTION_SPEC.md:L27 | neighbors=[Sprint 31.1 | Spec author: Claude Code …] | lang=en
- "archive_antigravity_spec_architect_correction_spec_context": "Context" | kind=entity | source=specs/archive/ANTIGRAVITY_SPEC_ARCHITECT_CORRECTION_SPEC.md:L7 | neighbors=[Sprint 31.1 | Spec author: Claude Code …] | lang=en
- "archive_antigravity_spec_architect_correction_spec_file_to_replace": "File to Replace" | kind=entity | source=specs/archive/ANTIGRAVITY_SPEC_ARCHITECT_CORRECTION_SPEC.md:L20 | neighbors=[Sprint 31.1 | Spec author: Claude Code …] | lang=en
- "archive_antigravity_spec_architect_correction_spec_sentinel_spec_architect_rewrite_to_webhook_http_server": "sentinel-spec-architect: Rewrite to webhook HTTP server" | kind=entity | source=specs/archive/ANTIGRAVITY_SPEC_ARCHITECT_CORRECTION_SPEC.md:L2 | neighbors=[ANTIGRAVITY_SPEC_ARCHITECT_CORRECTION_S…] | lang=en
- "archive_antigravity_spec_architect_correction_spec_verification": "Verification" | kind=entity | source=specs/archive/ANTIGRAVITY_SPEC_ARCHITECT_CORRECTION_SPEC.md:L256 | neighbors=[Sprint 31.1 | Spec author: Claude Code …] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-158.json

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
