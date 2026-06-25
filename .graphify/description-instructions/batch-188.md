# Node Description Batch 189 of 412

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

- "dashboard_jobqueuetable_jobqueuetable": "JobQueueTable()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobQueueTable.tsx:L98 | neighbors=[JobQueueTable.tsx]
- "dashboard_jobqueuetable_matchscore": "matchScore()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobQueueTable.tsx:L90 | neighbors=[JobQueueTable.tsx]
- "dashboard_jobqueuetable_sortdir": "SortDir" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobQueueTable.tsx:L33 | neighbors=[JobQueueTable.tsx]
- "dashboard_jobqueuetable_sortindicator": "SortIndicator()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobQueueTable.tsx:L42 | neighbors=[JobQueueTable.tsx]
- "dashboard_jobqueuetable_sortindicatorprops": "SortIndicatorProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobQueueTable.tsx:L36 | neighbors=[JobQueueTable.tsx]
- "dashboard_jobqueuetable_sortkey": "SortKey" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobQueueTable.tsx:L32 | neighbors=[JobQueueTable.tsx]
- "dashboard_jobqueuetable_status_labels": "STATUS_LABELS" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobQueueTable.tsx:L47 | neighbors=[JobQueueTable.tsx]
- "dashboard_jobqueuetable_status_order": "STATUS_ORDER" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobQueueTable.tsx:L80 | neighbors=[JobQueueTable.tsx]
- "dashboard_jobqueuetable_status_transitions": "STATUS_TRANSITIONS" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobQueueTable.tsx:L70 | neighbors=[JobQueueTable.tsx]
- "dashboard_jobqueuetable_type_map": "TYPE_MAP" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobQueueTable.tsx:L62 | neighbors=[JobQueueTable.tsx]
- "dashboard_kanbanboard_kanban_columns": "KANBAN_COLUMNS" | kind=code-symbol | source=tech-pwa/src/components/dashboard/KanbanBoard.tsx:L31 | neighbors=[KanbanBoard.tsx]
- "dashboard_kanbanboard_kanbanboard": "KanbanBoard()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/KanbanBoard.tsx:L151 | neighbors=[KanbanBoard.tsx]
- "dashboard_kanbanboard_kanbancard": "KanbanCard()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/KanbanBoard.tsx:L47 | neighbors=[KanbanBoard.tsx]
- "dashboard_kanbanboard_kanbancolumn": "KanbanColumn()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/KanbanBoard.tsx:L99 | neighbors=[KanbanBoard.tsx]
- "dashboard_kanbanboard_priority_class": "PRIORITY_CLASS" | kind=code-symbol | source=tech-pwa/src/components/dashboard/KanbanBoard.tsx:L16 | neighbors=[KanbanBoard.tsx]
- "dashboard_kanbanboard_priority_label": "PRIORITY_LABEL" | kind=code-symbol | source=tech-pwa/src/components/dashboard/KanbanBoard.tsx:L23 | neighbors=[KanbanBoard.tsx]
- "dashboard_locksendbutton_locksendbuttonprops": "LockSendButtonProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/LockSendButton.tsx:L6 | neighbors=[LockSendButton.tsx]
- "dashboard_manualjobcreatemodal_manualjobcreatemodal": "ManualJobCreateModal()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/ManualJobCreateModal.tsx:L28 | neighbors=[ManualJobCreateModal.tsx]
- "dashboard_manualjobcreatemodal_manualjobcreatemodalprops": "ManualJobCreateModalProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/ManualJobCreateModal.tsx:L20 | neighbors=[ManualJobCreateModal.tsx]
- "dashboard_manualjobcreatemodal_priorities": "PRIORITIES" | kind=code-symbol | source=tech-pwa/src/components/dashboard/ManualJobCreateModal.tsx:L13 | neighbors=[ManualJobCreateModal.tsx]
- "dashboard_manualjobcreatemodal_service_categories": "SERVICE_CATEGORIES" | kind=code-symbol | source=tech-pwa/src/components/dashboard/ManualJobCreateModal.tsx:L8 | neighbors=[ManualJobCreateModal.tsx]
- "dashboard_manualschedulemodal_duration_options": "DURATION_OPTIONS" | kind=code-symbol | source=tech-pwa/src/components/dashboard/ManualScheduleModal.tsx:L17 | neighbors=[ManualScheduleModal.tsx]
- "dashboard_manualschedulemodal_manualschedulemodal": "ManualScheduleModal()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/ManualScheduleModal.tsx:L20 | neighbors=[ManualScheduleModal.tsx]
- "dashboard_manualschedulemodal_time_options": "TIME_OPTIONS" | kind=code-symbol | source=tech-pwa/src/components/dashboard/ManualScheduleModal.tsx:L18 | neighbors=[ManualScheduleModal.tsx]
- "dashboard_routeguard_tech_routes": "TECH_ROUTES" | kind=code-symbol | source=tech-pwa/src/components/dashboard/RouteGuard.tsx:L8 | neighbors=[RouteGuard.tsx]
- "dashboard_schedulegrid_weektech": "WeekTech" | kind=code-symbol | source=tech-pwa/src/components/dashboard/ScheduleGrid.tsx:L4 | neighbors=[ScheduleGrid.tsx]
- "dashboard_schedulepagecomponents_draggablejobcard": "DraggableJobCard()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulePageComponents.tsx:L31 | neighbors=[SchedulePageComponents.tsx]
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

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-188.json

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
