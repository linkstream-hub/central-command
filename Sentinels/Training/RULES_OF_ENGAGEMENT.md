# RULES OF ENGAGEMENT — APT CENTRAL COMMAND

## 1. FILES NEVER TO TOUCH (Antigravity hard ban)
- `.clasp.json` files (root or dashboard-api/) — clasp project config, breaks deployments
- `.env.local` — local environment secrets
- `appsscript.json` — Apps Script manifest, timezone and OAuth scopes are set correctly
- Any `.gs`, `.js`, or `.html` at the repo ROOT — clasp requires them there (`skipSubdirectories: true`). Moving them to subdirectories breaks ALL deployments. This caused a production incident.

## 2. COLUMN MAPS ARE FROZEN
The Dispatch Queue column order (28 cols) and Tech Roster column order (cols K-S) are NEVER changed. Adding a column means appending — never inserting. Any spec that involves sheet columns must reference the exact indexes from IDENTITY_PRIMARY.md.

## 3. STATUS VALUES ARE FROZEN
The 8 canonical frontend status values are: `New | Ready to Schedule | PTE Required | Awaiting Approval | Scheduled | In Progress | Complete | Archived`. No spec may introduce new status strings. No spec may change how `rowToJob()` maps sheet values without explicit Claude Code approval.

## 4. DESIGN STANDARDS ARE NON-NEGOTIABLE
Every frontend component must:
- Use dark mode glassmorphism — no light-mode bleed (`bg-white`, `text-black` without opacity modifier)
- Use Framer Motion on all panels, modals, drawers, list item entrances
- Use skeleton loaders for all async data states — never a blank div
- Use toast notifications for all async results — never `alert()` or `window.confirm()`
- Use Tailwind tokens or CSS variables for all colors — no hardcoded hex in component files
- Pass `tsc --noEmit` with 0 errors before sprint is complete

## 5. RBAC IS ALWAYS REQUIRED
Every new page/route must specify which of the 5 roles (dispatch/management/compliance/hr/admin) can access it. Must be added to ROUTE_PERMISSIONS in RouteGuard.tsx and the nav filter in AppSidebar.tsx.

## 6. BACKEND SPEC REQUIREMENTS
Every spec touching DashboardAPI.gs must:
- Use `openById('1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4')` — NEVER `getActiveSpreadsheet()`
- Add new action to the `switch(action)` in `doPost()`
- Use existing `DA_DQ` and `DA_TR` column constant objects — never raw row indices
- Return `{ success: true, data: ... }` or `{ success: false, error: '...' }` JSON

## 7. DEPLOYMENT SEQUENCE IS FIXED
DashboardAPI.gs: `cd dashboard-api && clasp push --force && clasp deploy --deploymentId AKfycbyum_KLprgPh51GxFiwhsoNHScc4TqIBrzZS0GPfHsnhrc9hAtp03AciyiydhfyJyxCCQ --description "v## — description"`
TechPWA.gs: from root — `clasp push --force && clasp deploy --deploymentId AKfycbySG8tbAaXyIRFXnq7x-Fp5Gvs7uG8RmAyBB_wSFcGmScbhI3SHSq2HoznowBcsi3mM9Q --description "v## — description"`
Code.js: MANUAL ONLY — never automated, never included in CI/CD

## 8. NO MOCK DATA IN PRODUCTION SPECS
Specs must wire to real DashboardAPI.gs endpoints using `dashboardRequest()` from `tech-pwa/src/lib/dashboard-api.ts`. No mock arrays, no hardcoded job lists, no simulated responses.

## 9. CA COMPLIANCE LOGIC IS NEVER SIMPLIFIED
Any spec touching break/meal compliance logic must follow CA Labor Code §512 exactly:
- Rest break due: 270 minutes worked
- First meal break: 5 hours (300 minutes)
- Second meal break: 10 hours (600 minutes)
- Missed meal → premium pay (1 hour at regular rate)
Flowise on Railway is the rule engine. TechPWA.gs fires the webhook. Never embed simplified logic in the frontend.

## 10. ANTIGRAVITY MUST NOT FREELANCE
If the spec is silent on something, Antigravity must ask — not decide. The following are never Antigravity's call:
- Data shape, field names, or status values
- Column indexes or sheet tab names
- API action names
- RBAC role access rules
- Whether to add a new sheet tab
