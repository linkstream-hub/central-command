# Node Description Batch 37 of 49

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
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "dashboard_manualjobcreatemodal_manualjobcreatemodal": "ManualJobCreateModal()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/ManualJobCreateModal.tsx:L28 | neighbors=[ManualJobCreateModal.tsx]
- "dashboard_manualjobcreatemodal_manualjobcreatemodalprops": "ManualJobCreateModalProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/ManualJobCreateModal.tsx:L20 | neighbors=[ManualJobCreateModal.tsx]
- "dashboard_manualjobcreatemodal_priorities": "PRIORITIES" | kind=code-symbol | source=tech-pwa/src/components/dashboard/ManualJobCreateModal.tsx:L13 | neighbors=[ManualJobCreateModal.tsx]
- "dashboard_manualjobcreatemodal_service_categories": "SERVICE_CATEGORIES" | kind=code-symbol | source=tech-pwa/src/components/dashboard/ManualJobCreateModal.tsx:L8 | neighbors=[ManualJobCreateModal.tsx]
- "dashboard_manualschedulemodal_duration_options": "DURATION_OPTIONS" | kind=code-symbol | source=tech-pwa/src/components/dashboard/ManualScheduleModal.tsx:L17 | neighbors=[ManualScheduleModal.tsx]
- "dashboard_manualschedulemodal_manualschedulemodal": "ManualScheduleModal()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/ManualScheduleModal.tsx:L20 | neighbors=[ManualScheduleModal.tsx]
- "dashboard_manualschedulemodal_manualschedulemodalprops": "ManualScheduleModalProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/ManualScheduleModal.tsx:L8 | neighbors=[ManualScheduleModal.tsx]
- "dashboard_manualschedulemodal_time_options": "TIME_OPTIONS" | kind=code-symbol | source=tech-pwa/src/components/dashboard/ManualScheduleModal.tsx:L18 | neighbors=[ManualScheduleModal.tsx]
- "dashboard_routeguard_routeguard": "RouteGuard()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/RouteGuard.tsx:L10 | neighbors=[RouteGuard.tsx]
- "dashboard_routeguard_tech_routes": "TECH_ROUTES" | kind=code-symbol | source=tech-pwa/src/components/dashboard/RouteGuard.tsx:L8 | neighbors=[RouteGuard.tsx]
- "dashboard_schedulegrid_schedulegridprops": "ScheduleGridProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/ScheduleGrid.tsx:L11 | neighbors=[ScheduleGrid.tsx]
- "dashboard_schedulegrid_weektech": "WeekTech" | kind=code-symbol | source=tech-pwa/src/components/dashboard/ScheduleGrid.tsx:L4 | neighbors=[ScheduleGrid.tsx]
- "dashboard_schedulepagecomponents_datedetailmodalprops": "DateDetailModalProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulePageComponents.tsx:L22 | neighbors=[SchedulePageComponents.tsx]
- "dashboard_schedulepagecomponents_draggablejobcard": "DraggableJobCard()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulePageComponents.tsx:L31 | neighbors=[SchedulePageComponents.tsx]
- "dashboard_schedulepagecomponents_draggablejobcardprops": "DraggableJobCardProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulePageComponents.tsx:L17 | neighbors=[SchedulePageComponents.tsx]
- "dashboard_schedulepagecomponents_droppableschedulecell": "DroppableScheduleCell()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulePageComponents.tsx:L261 | neighbors=[SchedulePageComponents.tsx]
- "dashboard_schedulepagecomponents_droppableschedulecellprops": "DroppableScheduleCellProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulePageComponents.tsx:L252 | neighbors=[SchedulePageComponents.tsx]
- "dashboard_schedulepagecomponents_droppabletimeslot": "DroppableTimeSlot()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulePageComponents.tsx:L221 | neighbors=[SchedulePageComponents.tsx]
- "dashboard_schedulepagecomponents_droppabletimeslotprops": "DroppableTimeSlotProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulePageComponents.tsx:L211 | neighbors=[SchedulePageComponents.tsx]
- "dashboard_schedulepagecomponents_durationselectormodal": "DurationSelectorModal()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulePageComponents.tsx:L343 | neighbors=[SchedulePageComponents.tsx]
- "dashboard_schedulepagecomponents_durationselectormodalprops": "DurationSelectorModalProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulePageComponents.tsx:L330 | neighbors=[SchedulePageComponents.tsx]
- "dashboard_schedulepagecomponents_gridjobcard": "GridJobCard()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulePageComponents.tsx:L148 | neighbors=[SchedulePageComponents.tsx]
- "dashboard_schedulepagecomponents_gridjobcardprops": "GridJobCardProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulePageComponents.tsx:L143 | neighbors=[SchedulePageComponents.tsx]
- "dashboard_schedulepagecomponents_rank_labels": "RANK_LABELS" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulePageComponents.tsx:L533 | neighbors=[SchedulePageComponents.tsx]
- "dashboard_schedulepagecomponents_techlaneheader": "TechLaneHeader()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulePageComponents.tsx:L302 | neighbors=[SchedulePageComponents.tsx]
- "dashboard_schedulepagecomponents_techlaneheaderprops": "TechLaneHeaderProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulePageComponents.tsx:L294 | neighbors=[SchedulePageComponents.tsx]
- "dashboard_schedulepagecomponents_techprofilemodal": "TechProfileModal()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulePageComponents.tsx:L537 | neighbors=[SchedulePageComponents.tsx]
- "dashboard_schedulepagecomponents_techprofilemodalprops": "TechProfileModalProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulePageComponents.tsx:L524 | neighbors=[SchedulePageComponents.tsx]
- "dashboard_schedulepagecomponents_time_labels": "TIME_LABELS" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulePageComponents.tsx:L137 | neighbors=[SchedulePageComponents.tsx]
- "dashboard_schedulepagecomponents_time_slots": "TIME_SLOTS" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulePageComponents.tsx:L136 | neighbors=[SchedulePageComponents.tsx]
- "dashboard_schedulingdispatch_day_short": "DAY_SHORT" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulingDispatch.tsx:L48 | neighbors=[SchedulingDispatch.tsx]
- "dashboard_schedulingdispatch_getnext7businessdays": "getNext7BusinessDays()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulingDispatch.tsx:L68 | neighbors=[SchedulingDispatch.tsx]
- "dashboard_schedulingdispatch_getrankinfo": "getRankInfo()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulingDispatch.tsx:L95 | neighbors=[SchedulingDispatch.tsx]
- "dashboard_schedulingdispatch_getskillmatch": "getSkillMatch()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulingDispatch.tsx:L85 | neighbors=[SchedulingDispatch.tsx]
- "dashboard_schedulingdispatch_mon_short": "MON_SHORT" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulingDispatch.tsx:L49 | neighbors=[SchedulingDispatch.tsx]
- "dashboard_schedulingdispatch_schedulingdispatch": "SchedulingDispatch()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulingDispatch.tsx:L115 | neighbors=[SchedulingDispatch.tsx]
- "dashboard_schedulingdispatch_schedulingdispatchprops": "SchedulingDispatchProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulingDispatch.tsx:L22 | neighbors=[SchedulingDispatch.tsx]
- "dashboard_schedulingdispatch_service_to_skill": "SERVICE_TO_SKILL" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulingDispatch.tsx:L37 | neighbors=[SchedulingDispatch.tsx]
- "dashboard_schedulingdispatch_skill_badge": "SKILL_BADGE" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulingDispatch.tsx:L42 | neighbors=[SchedulingDispatch.tsx]
- "dashboard_schedulingdispatch_time_slots": "TIME_SLOTS" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulingDispatch.tsx:L51 | neighbors=[SchedulingDispatch.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-036.json

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
