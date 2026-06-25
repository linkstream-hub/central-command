# Node Description Batch 35 of 49

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

- "change_pin_page_changepinpage": "ChangePinPage()" | kind=code-symbol | source=tech-pwa/src/app/change-pin/page.tsx:L13 | neighbors=[page.tsx]
- "clock_out_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/field/clock-out/route.ts:L10 | neighbors=[route.ts]
- "code_addtomasterdirectory": "addToMasterDirectory()" | kind=code-symbol | source=Code.js:L1174 | neighbors=[Code.js]
- "code_dismissnewcontact": "dismissNewContact()" | kind=code-symbol | source=Code.js:L1209 | neighbors=[Code.js]
- "code_fmtaddr": "fmtAddr()" | kind=code-symbol | source=Code.js:L1146 | neighbors=[Code.js]
- "code_getgmailthread": "getGmailThread()" | kind=code-symbol | source=Code.js:L1259 | neighbors=[Code.js]
- "code_morningauditreport": "morningAuditReport()" | kind=code-symbol | source=Code.js:L1394 | neighbors=[Code.js]
- "code_replytothread": "replyToThread()" | kind=code-symbol | source=Code.js:L1306 | neighbors=[Code.js]
- "code_senddashboardemail": "sendDashboardEmail()" | kind=code-symbol | source=Code.js:L1220 | neighbors=[Code.js]
- "code_setuptrigger": "setupTrigger()" | kind=code-symbol | source=Code.js:L1160 | neighbors=[Code.js]
- "comms_route": "Comms Route" | kind=code-symbol | source=tech-pwa/src/app/api/comms/[jobId]/route.ts | neighbors=[Database Schema]
- "compliance_page_compliancedata": "ComplianceData" | kind=code-symbol | source=tech-pwa/src/app/compliance/page.tsx:L26 | neighbors=[page.tsx]
- "compliance_page_compliancepage": "CompliancePage()" | kind=code-symbol | source=tech-pwa/src/app/compliance/page.tsx:L37 | neighbors=[page.tsx]
- "compliance_page_timerecord": "TimeRecord" | kind=code-symbol | source=tech-pwa/src/app/compliance/page.tsx:L12 | neighbors=[page.tsx]
- "compliance_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/field/compliance/route.ts:L8 | neighbors=[route.ts]
- "compliance_status_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/dashboard/compliance-status/route.ts:L10 | neighbors=[route.ts]
- "components_bottomnav_bottomnav": "BottomNav()" | kind=code-symbol | source=tech-pwa/src/components/BottomNav.tsx:L8 | neighbors=[BottomNav.tsx]
- "components_bottomnav_bottomnavprops": "BottomNavProps" | kind=code-symbol | source=tech-pwa/src/components/BottomNav.tsx:L4 | neighbors=[BottomNav.tsx]
- "components_cameraupload_cameraupload": "CameraUpload()" | kind=code-symbol | source=tech-pwa/src/components/CameraUpload.tsx:L16 | neighbors=[CameraUpload.tsx]
- "components_cameraupload_camerauploadprops": "CameraUploadProps" | kind=code-symbol | source=tech-pwa/src/components/CameraUpload.tsx:L9 | neighbors=[CameraUpload.tsx]
- "components_clockedinbar_clockedinbar": "ClockedInBar()" | kind=code-symbol | source=tech-pwa/src/components/ClockedInBar.tsx:L16 | neighbors=[ClockedInBar.tsx]
- "components_clockedinbar_clockedinbarprops": "ClockedInBarProps" | kind=code-symbol | source=tech-pwa/src/components/ClockedInBar.tsx:L12 | neighbors=[ClockedInBar.tsx]
- "components_installprompt_event": "Event" | kind=code-symbol | neighbors=[BeforeInstallPromptEvent]
- "components_installprompt_installprompt": "InstallPrompt()" | kind=code-symbol | source=tech-pwa/src/components/InstallPrompt.tsx:L11 | neighbors=[InstallPrompt.tsx]
- "components_skeleton_skeletonblock": "SkeletonBlock()" | kind=code-symbol | source=tech-pwa/src/components/Skeleton.tsx:L11 | neighbors=[Skeleton.tsx]
- "components_techloginview_techloginviewprops": "TechLoginViewProps" | kind=code-symbol | source=tech-pwa/src/components/TechLoginView.tsx:L5 | neighbors=[TechLoginView.tsx]
- "context_toastcontext_toastcontext": "ToastContext" | kind=code-symbol | source=tech-pwa/src/context/ToastContext.tsx:L7 | neighbors=[ToastContext.tsx]
- "context_toastcontext_toastitem": "ToastItem" | kind=code-symbol | source=tech-pwa/src/context/ToastContext.tsx:L5 | neighbors=[ToastContext.tsx]
- "context_toastcontext_toasttype": "ToastType" | kind=code-symbol | source=tech-pwa/src/context/ToastContext.tsx:L4 | neighbors=[ToastContext.tsx]
- "dal_sheets_client_sheetsrequest": "sheetsRequest()" | kind=code-symbol | source=tech-pwa/src/lib/dal/sheets-client.ts:L9 | neighbors=[sheets-client.ts]
- "dal_techs_techsrepository": "techsRepository" | kind=code-symbol | source=tech-pwa/src/lib/dal/techs.ts:L11 | neighbors=[techs.ts]
- "dal_time_records_timerecordsrepository": "timeRecordsRepository" | kind=code-symbol | source=tech-pwa/src/lib/dal/time-records.ts:L6 | neighbors=[time-records.ts]
- "dashboard_activityfeed_activityevent": "ActivityEvent" | kind=code-symbol | source=tech-pwa/src/components/dashboard/ActivityFeed.tsx:L13 | neighbors=[ActivityFeed.tsx]
- "dashboard_activityfeed_activityfeed": "ActivityFeed()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/ActivityFeed.tsx:L22 | neighbors=[ActivityFeed.tsx]
- "dashboard_activityfeed_activityfeedprops": "ActivityFeedProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/ActivityFeed.tsx:L8 | neighbors=[ActivityFeed.tsx]
- "dashboard_appsidebar_nav_items": "NAV_ITEMS" | kind=code-symbol | source=tech-pwa/src/components/dashboard/AppSidebar.tsx:L31 | neighbors=[AppSidebar.tsx]
- "dashboard_commandpalette_commandpalette": "CommandPalette()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/CommandPalette.tsx:L21 | neighbors=[CommandPalette.tsx]
- "dashboard_commandpalette_commandpaletteprops": "CommandPaletteProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/CommandPalette.tsx:L17 | neighbors=[CommandPalette.tsx]
- "dashboard_commandpalette_priority_color": "PRIORITY_COLOR" | kind=code-symbol | source=tech-pwa/src/components/dashboard/CommandPalette.tsx:L10 | neighbors=[CommandPalette.tsx]
- "dashboard_dashboardlayout_dashboardlayout": "DashboardLayout()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/DashboardLayout.tsx:L30 | neighbors=[DashboardLayout.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-034.json

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
