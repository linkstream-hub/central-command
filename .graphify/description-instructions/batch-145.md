# Node Description Batch 146 of 412

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

- "archive_antigravity_crew_scheduling_spec_typescript_check": "TypeScript Check" | kind=entity | source=specs/archive/ANTIGRAVITY_CREW_SCHEDULING_SPEC.md:L187 | neighbors=[Sprint 33 | Spec author: Claude Code | …] | lang=en
- "archive_antigravity_crew_scheduling_spec_verification": "Verification" | kind=entity | source=specs/archive/ANTIGRAVITY_CREW_SCHEDULING_SPEC.md:L193 | neighbors=[Sprint 33 | Spec author: Claude Code | …] | lang=en
- "archive_antigravity_crew_scheduling_spec_what_must_not_change": "What Must NOT Change" | kind=entity | source=specs/archive/ANTIGRAVITY_CREW_SCHEDULING_SPEC.md:L177 | neighbors=[Sprint 33 | Spec author: Claude Code | …] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_active_techs_panel": "Active Techs Panel" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L495 | neighbors=[PAGE 6: ⚖️ COMPLIANCE — WAGE & HOUR LIV…] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_activity_feed": "Activity Feed" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L264 | neighbors=[PAGE 1: ⚡ LIVE — THE CHESS BOARD] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_animated_background": "Animated Background" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L144 | neighbors=[DESIGN SYSTEM] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_antigravity_build_brief_central_command_v2": "Antigravity Build Brief — Central Command v2" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L2 | neighbors=[ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_api_actions_dashboardapi_gs_handles_these": "API Actions (DashboardAPI.gs handles these)" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L61 | neighbors=[ARCHITECTURE] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_api_pattern": "API Pattern" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L49 | neighbors=[ARCHITECTURE] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_apt_central_command_full_platform_redesign": "APT CENTRAL COMMAND — FULL PLATFORM REDESIGN" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L1 | neighbors=[ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_auth": "Auth" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L40 | neighbors=[ARCHITECTURE] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_ca_threshold_logic_from_techpwa_gs": "CA Threshold Logic (from TechPWA.gs)" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L515 | neighbors=[PAGE 6: ⚖️ COMPLIANCE — WAGE & HOUR LIV…] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_capacity_bar_per_tech_row": "Capacity Bar Per Tech Row" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L333 | neighbors=[PAGE 2: 📅 SCHEDULE — THE SCHEDULING SH…] | lang=it
- "archive_antigravity_dashboard_redesign_prompt_cloudflare_worker_interim_clean_url": "CLOUDFLARE WORKER — INTERIM CLEAN URL" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L711 | neighbors=[Last updated: April 18, 2026] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_color_palette": "Color Palette" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L83 | neighbors=[DESIGN SYSTEM] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_compliance_alerts_in_notification_center": "Compliance Alerts in Notification Center" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L531 | neighbors=[PAGE 6: ⚖️ COMPLIANCE — WAGE & HOUR LIV…] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_compliance_feed_below_active_panel": "Compliance Feed (below active panel)" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L521 | neighbors=[PAGE 6: ⚖️ COMPLIANCE — WAGE & HOUR LIV…] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_compose_new_message": "Compose (new message)" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L471 | neighbors=[PAGE 4: 💬 MESSAGES — UNIFIED COMMS] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_daily_compliance_summary": "Daily Compliance Summary" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L525 | neighbors=[PAGE 6: ⚖️ COMPLIANCE — WAGE & HOUR LIV…] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_drag_and_drop_scheduling": "Drag-and-Drop Scheduling" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L322 | neighbors=[PAGE 2: 📅 SCHEDULE — THE SCHEDULING SH…] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_effects": "Effects" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L127 | neighbors=[DESIGN SYSTEM] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_field_status_panel_right": "Field Status Panel (right)" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L252 | neighbors=[PAGE 1: ⚡ LIVE — THE CHESS BOARD] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_framer_motion_animations_full_spec": "FRAMER MOTION ANIMATIONS — FULL SPEC" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L688 | neighbors=[Last updated: April 18, 2026] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_global_elements_always_present": "Global Elements (always present)" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L176 | neighbors=[APP STRUCTURE] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_hero_summary_bar": "Hero Summary Bar" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L214 | neighbors=[PAGE 1: ⚡ LIVE — THE CHESS BOARD] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_integration_status_design": "INTEGRATION STATUS DESIGN" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L670 | neighbors=[Last updated: April 18, 2026] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_job_queue_filter_tabs": "Job Queue Filter Tabs" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L227 | neighbors=[PAGE 1: ⚡ LIVE — THE CHESS BOARD] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_job_table_rows": "Job Table Rows" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L234 | neighbors=[PAGE 1: ⚡ LIVE — THE CHESS BOARD] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_layout_two_column": "Layout (two-column)" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L429 | neighbors=[PAGE 4: 💬 MESSAGES — UNIFIED COMMS] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_next_action_panel_stage_aware": "Next Action Panel — Stage-Aware" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L602 | neighbors=[THE JOB MODAL — TWO-PANEL WORKFLOW DESI…] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_page_5_jobs_full_queue": "PAGE 5: 📋 JOBS — FULL QUEUE" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L477 | neighbors=[Last updated: April 18, 2026] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_page_7_intel_analytics_phase_4_stub": "PAGE 7: 📊 INTEL — ANALYTICS (PHASE 4 STUB)" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L538 | neighbors=[Last updated: April 18, 2026] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_persistent_sidebar_left_56px_collapsed_220px_expanded": "Persistent Sidebar (left, 56px collapsed / 220px expanded)" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L153 | neighbors=[APP STRUCTURE] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_property_history_drawer": "Property History Drawer" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L662 | neighbors=[THE JOB MODAL — TWO-PANEL WORKFLOW DESI…] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_reference_dispatch_queue_column_map": "REFERENCE — DISPATCH QUEUE COLUMN MAP" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L765 | neighbors=[Last updated: April 18, 2026] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_stack": "Stack" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L24 | neighbors=[ARCHITECTURE] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_status_stepper": "Status Stepper" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L594 | neighbors=[THE JOB MODAL — TWO-PANEL WORKFLOW DESI…] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_tech_card_full_spec": "Tech Card (full spec)" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L378 | neighbors=[PAGE 3: 👥 TEAM — TECH COMMAND CENTER] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_tech_profile_modal": "Tech Profile Modal" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L406 | neighbors=[PAGE 3: 👥 TEAM — TECH COMMAND CENTER] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_three_communication_channels": "Three Communication Channels" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L454 | neighbors=[PAGE 4: 💬 MESSAGES — UNIFIED COMMS] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-145.json

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
