# Node Description Batch 36 of 49

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

- "dashboard_dashboardlayout_notif_colors": "NOTIF_COLORS" | kind=code-symbol | source=tech-pwa/src/components/dashboard/DashboardLayout.tsx:L230 | neighbors=[DashboardLayout.tsx]
- "dashboard_dashboardlayout_notif_icon": "NOTIF_ICON" | kind=code-symbol | source=tech-pwa/src/components/dashboard/DashboardLayout.tsx:L224 | neighbors=[DashboardLayout.tsx]
- "dashboard_dashboardlayout_notificationitem": "NotificationItem()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/DashboardLayout.tsx:L236 | neighbors=[DashboardLayout.tsx]
- "dashboard_dashboardlayout_page_titles": "PAGE_TITLES" | kind=code-symbol | source=tech-pwa/src/components/dashboard/DashboardLayout.tsx:L17 | neighbors=[DashboardLayout.tsx]
- "dashboard_datenavigation_datenavigation": "DateNavigation()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/DateNavigation.tsx:L10 | neighbors=[DateNavigation.tsx]
- "dashboard_datenavigation_datenavigationprops": "DateNavigationProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/DateNavigation.tsx:L3 | neighbors=[DateNavigation.tsx]
- "dashboard_dispatchtimelineboard_dispatchtimelineboard": "DispatchTimelineBoard()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/DispatchTimelineBoard.tsx:L166 | neighbors=[DispatchTimelineBoard.tsx]
- "dashboard_dispatchtimelineboard_dispatchtimelineboardprops": "DispatchTimelineBoardProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/DispatchTimelineBoard.tsx:L13 | neighbors=[DispatchTimelineBoard.tsx]
- "dashboard_dispatchtimelineboard_draggablejobcard": "DraggableJobCard()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/DispatchTimelineBoard.tsx:L60 | neighbors=[DispatchTimelineBoard.tsx]
- "dashboard_dispatchtimelineboard_droppableunassignedzone": "DroppableUnassignedZone()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/DispatchTimelineBoard.tsx:L317 | neighbors=[DispatchTimelineBoard.tsx]
- "dashboard_dispatchtimelineboard_hours": "HOURS" | kind=code-symbol | source=tech-pwa/src/components/dashboard/DispatchTimelineBoard.tsx:L22 | neighbors=[DispatchTimelineBoard.tsx]
- "dashboard_dispatchtimelineboard_techtimelinerow": "TechTimelineRow()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/DispatchTimelineBoard.tsx:L102 | neighbors=[DispatchTimelineBoard.tsx]
- "dashboard_dispatchtimelineboard_timelinecell": "TimelineCell()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/DispatchTimelineBoard.tsx:L48 | neighbors=[DispatchTimelineBoard.tsx]
- "dashboard_jobassignmentmodal_jobassignmentmodal": "JobAssignmentModal()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobAssignmentModal.tsx:L16 | neighbors=[JobAssignmentModal.tsx]
- "dashboard_jobassignmentmodal_jobassignmentmodalprops": "JobAssignmentModalProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobAssignmentModal.tsx:L6 | neighbors=[JobAssignmentModal.tsx]
- "dashboard_jobchip_jobchipprops": "JobChipProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobChip.tsx:L3 | neighbors=[JobChip.tsx]
- "dashboard_jobdetailmodal_attachmentrow": "AttachmentRow()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobDetailModal.tsx:L101 | neighbors=[JobDetailModal.tsx]
- "dashboard_jobdetailmodal_formatmsgtimestamp": "formatMsgTimestamp()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobDetailModal.tsx:L164 | neighbors=[JobDetailModal.tsx]
- "dashboard_jobdetailmodal_jobdetailmodalprops": "JobDetailModalProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobDetailModal.tsx:L40 | neighbors=[JobDetailModal.tsx]
- "dashboard_jobdetailmodal_normalizename": "normalizeName()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobDetailModal.tsx:L161 | neighbors=[JobDetailModal.tsx]
- "dashboard_jobdetailmodal_type_badges": "TYPE_BADGES" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobDetailModal.tsx:L68 | neighbors=[JobDetailModal.tsx]
- "dashboard_jobqueuetable_getjobage": "getJobAge()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobQueueTable.tsx:L12 | neighbors=[JobQueueTable.tsx]
- "dashboard_jobqueuetable_jobqueuetable": "JobQueueTable()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobQueueTable.tsx:L98 | neighbors=[JobQueueTable.tsx]
- "dashboard_jobqueuetable_jobqueuetableprops": "JobQueueTableProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobQueueTable.tsx:L20 | neighbors=[JobQueueTable.tsx]
- "dashboard_jobqueuetable_matchscore": "matchScore()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobQueueTable.tsx:L90 | neighbors=[JobQueueTable.tsx]
- "dashboard_jobqueuetable_sortdir": "SortDir" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobQueueTable.tsx:L33 | neighbors=[JobQueueTable.tsx]
- "dashboard_jobqueuetable_sortindicator": "SortIndicator()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobQueueTable.tsx:L42 | neighbors=[JobQueueTable.tsx]
- "dashboard_jobqueuetable_sortindicatorprops": "SortIndicatorProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobQueueTable.tsx:L36 | neighbors=[JobQueueTable.tsx]
- "dashboard_jobqueuetable_sortkey": "SortKey" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobQueueTable.tsx:L32 | neighbors=[JobQueueTable.tsx]
- "dashboard_jobqueuetable_status_labels": "STATUS_LABELS" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobQueueTable.tsx:L47 | neighbors=[JobQueueTable.tsx]
- "dashboard_jobqueuetable_status_order": "STATUS_ORDER" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobQueueTable.tsx:L80 | neighbors=[JobQueueTable.tsx]
- "dashboard_jobqueuetable_status_transitions": "STATUS_TRANSITIONS" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobQueueTable.tsx:L70 | neighbors=[JobQueueTable.tsx]
- "dashboard_jobqueuetable_type_map": "TYPE_MAP" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobQueueTable.tsx:L62 | neighbors=[JobQueueTable.tsx]
- "dashboard_kanbanboard_kanbanboard": "KanbanBoard()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/KanbanBoard.tsx:L149 | neighbors=[KanbanBoard.tsx]
- "dashboard_kanbanboard_kanbanboardprops": "KanbanBoardProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/KanbanBoard.tsx:L9 | neighbors=[KanbanBoard.tsx]
- "dashboard_kanbanboard_kanbancard": "KanbanCard()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/KanbanBoard.tsx:L45 | neighbors=[KanbanBoard.tsx]
- "dashboard_kanbanboard_kanbancolumn": "KanbanColumn()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/KanbanBoard.tsx:L97 | neighbors=[KanbanBoard.tsx]
- "dashboard_kanbanboard_persiststatuschange": "persistStatusChange()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/KanbanBoard.tsx:L37 | neighbors=[KanbanBoard.tsx]
- "dashboard_kanbanboard_priority_class": "PRIORITY_CLASS" | kind=code-symbol | source=tech-pwa/src/components/dashboard/KanbanBoard.tsx:L16 | neighbors=[KanbanBoard.tsx]
- "dashboard_kanbanboard_priority_label": "PRIORITY_LABEL" | kind=code-symbol | source=tech-pwa/src/components/dashboard/KanbanBoard.tsx:L23 | neighbors=[KanbanBoard.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-035.json

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
