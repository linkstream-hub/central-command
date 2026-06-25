# Node Description Batch 188 of 412

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
For a code symbol (kind=code-symbol — a function, class, or constant),
describe what the function/symbol does based on its name, source location
and neighbors — e.g. "Resolves the configured ontology profile from graphify.yaml.".
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

- "council_skill_6_present_a_compact_verdict": "6. Present a compact verdict" | kind=entity | source=.github/skills/ecc/council/SKILL.md:L126 | neighbors=[Workflow] | lang=pt
- "council_skill_anti_patterns": "Anti-Patterns" | kind=entity | source=.github/skills/ecc/council/SKILL.md:L174 | neighbors=[Council] | lang=en
- "council_skill_example": "Example" | kind=entity | source=.github/skills/ecc/council/SKILL.md:L189 | neighbors=[Council] | lang=en
- "council_skill_multi_round_follow_up": "Multi-Round Follow-up" | kind=entity | source=.github/skills/ecc/council/SKILL.md:L165 | neighbors=[Council] | lang=en
- "council_skill_persistence_rule": "Persistence Rule" | kind=entity | source=.github/skills/ecc/council/SKILL.md:L154 | neighbors=[Council] | lang=en
- "council_skill_related_skills": "Related Skills" | kind=entity | source=.github/skills/ecc/council/SKILL.md:L182 | neighbors=[Council] | lang=en
- "council_skill_roles": "Roles" | kind=entity | source=.github/skills/ecc/council/SKILL.md:L43 | neighbors=[Council] | lang=en
- "council_skill_when_not_to_use": "When NOT to Use" | kind=entity | source=.github/skills/ecc/council/SKILL.md:L32 | neighbors=[Council] | lang=en
- "council_skill_when_to_use": "When to Use" | kind=entity | source=.github/skills/ecc/council/SKILL.md:L17 | neighbors=[Council] | lang=en
- "dal_claude": "CLAUDE.md" | kind=entity | source=tech-pwa/src/lib/dal/CLAUDE.md:L1 | neighbors=[Gate: DAL / Database] | lang=en
- "dal_claude_gate_dal_database": "Gate: DAL / Database" | kind=entity | source=tech-pwa/src/lib/dal/CLAUDE.md:L1 | neighbors=[CLAUDE.md] | lang=en
- "dal_sheets_client_sheetsrequest": "sheetsRequest()" | kind=code-symbol | source=tech-pwa/src/lib/dal/sheets-client.ts:L9 | neighbors=[sheets-client.ts] | lang=en
- "dal_techs_techsrepository": "techsRepository" | kind=code-symbol | source=tech-pwa/src/lib/dal/techs.ts:L11 | neighbors=[techs.ts] | lang=en
- "dal_time_records_timerecordsrepository": "timeRecordsRepository" | kind=code-symbol | source=tech-pwa/src/lib/dal/time-records.ts:L6 | neighbors=[time-records.ts] | lang=en
- "dashboard_activityfeed_activityevent": "ActivityEvent" | kind=code-symbol | source=tech-pwa/src/components/dashboard/ActivityFeed.tsx:L13 | neighbors=[ActivityFeed.tsx] | lang=en
- "dashboard_api_claude": "CLAUDE.md" | kind=entity | source=dashboard-api/CLAUDE.md:L1 | neighbors=[Gate: GAS / Apps Script] | lang=en
- "dashboard_api_claude_gate_gas_apps_script": "Gate: GAS / Apps Script" | kind=entity | source=dashboard-api/CLAUDE.md:L1 | neighbors=[CLAUDE.md] | lang=en
- "dashboard_appsidebar_nav_items": "NAV_ITEMS" | kind=code-symbol | source=tech-pwa/src/components/dashboard/AppSidebar.tsx:L31 | neighbors=[AppSidebar.tsx] | lang=en
- "dashboard_commandpalette_commandpalette": "CommandPalette()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/CommandPalette.tsx:L21 | neighbors=[CommandPalette.tsx] | lang=en
- "dashboard_commandpalette_priority_color": "PRIORITY_COLOR" | kind=code-symbol | source=tech-pwa/src/components/dashboard/CommandPalette.tsx:L10 | neighbors=[CommandPalette.tsx] | lang=en
- "dashboard_confirmationscreen_confirmationscreenprops": "ConfirmationScreenProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/ConfirmationScreen.tsx:L4 | neighbors=[ConfirmationScreen.tsx] | lang=en
- "dashboard_dashboardlayout_dashboardlayout": "DashboardLayout()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/DashboardLayout.tsx:L30 | neighbors=[DashboardLayout.tsx] | lang=en
- "dashboard_dashboardlayout_notif_colors": "NOTIF_COLORS" | kind=code-symbol | source=tech-pwa/src/components/dashboard/DashboardLayout.tsx:L230 | neighbors=[DashboardLayout.tsx] | lang=en
- "dashboard_dashboardlayout_notif_icon": "NOTIF_ICON" | kind=code-symbol | source=tech-pwa/src/components/dashboard/DashboardLayout.tsx:L224 | neighbors=[DashboardLayout.tsx] | lang=en
- "dashboard_dashboardlayout_notificationitem": "NotificationItem()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/DashboardLayout.tsx:L236 | neighbors=[DashboardLayout.tsx] | lang=en
- "dashboard_dashboardlayout_page_titles": "PAGE_TITLES" | kind=code-symbol | source=tech-pwa/src/components/dashboard/DashboardLayout.tsx:L17 | neighbors=[DashboardLayout.tsx] | lang=en
- "dashboard_datenavigation_datenavigation": "DateNavigation()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/DateNavigation.tsx:L10 | neighbors=[DateNavigation.tsx] | lang=en
- "dashboard_datenavigation_datenavigationprops": "DateNavigationProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/DateNavigation.tsx:L3 | neighbors=[DateNavigation.tsx] | lang=en
- "dashboard_dispatchtimelineboard_dispatchtimelineboard": "DispatchTimelineBoard()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/DispatchTimelineBoard.tsx:L143 | neighbors=[DispatchTimelineBoard.tsx] | lang=en
- "dashboard_dispatchtimelineboard_draggablejobcard": "DraggableJobCard()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/DispatchTimelineBoard.tsx:L37 | neighbors=[DispatchTimelineBoard.tsx] | lang=en
- "dashboard_dispatchtimelineboard_droppableunassignedzone": "DroppableUnassignedZone()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/DispatchTimelineBoard.tsx:L276 | neighbors=[DispatchTimelineBoard.tsx] | lang=en
- "dashboard_dispatchtimelineboard_hours": "HOURS" | kind=code-symbol | source=tech-pwa/src/components/dashboard/DispatchTimelineBoard.tsx:L22 | neighbors=[DispatchTimelineBoard.tsx] | lang=en
- "dashboard_dispatchtimelineboard_techtimelinerow": "TechTimelineRow()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/DispatchTimelineBoard.tsx:L79 | neighbors=[DispatchTimelineBoard.tsx] | lang=en
- "dashboard_dispatchtimelineboard_timelinecell": "TimelineCell()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/DispatchTimelineBoard.tsx:L25 | neighbors=[DispatchTimelineBoard.tsx] | lang=en
- "dashboard_jobassignmentmodal_jobassignmentmodal": "JobAssignmentModal()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobAssignmentModal.tsx:L16 | neighbors=[JobAssignmentModal.tsx] | lang=en
- "dashboard_jobdetailmodal_attachmentrow": "AttachmentRow()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobDetailModal.tsx:L83 | neighbors=[JobDetailModal.tsx] | lang=en
- "dashboard_jobdetailmodal_formatmsgtimestamp": "formatMsgTimestamp()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobDetailModal.tsx:L146 | neighbors=[JobDetailModal.tsx] | lang=en
- "dashboard_jobdetailmodal_normalizename": "normalizeName()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobDetailModal.tsx:L143 | neighbors=[JobDetailModal.tsx] | lang=en
- "dashboard_jobdetailmodal_type_badges": "TYPE_BADGES" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobDetailModal.tsx:L50 | neighbors=[JobDetailModal.tsx] | lang=en
- "dashboard_jobqueuetable_getjobage": "getJobAge()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobQueueTable.tsx:L12 | neighbors=[JobQueueTable.tsx] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-187.json

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
