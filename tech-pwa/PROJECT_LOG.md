# Project Log: Central Command (tech-pwa)

## Overview
This log tracks development actions, technical decisions, and current project status for the Central Command (tech-pwa) application.

## Current Status (2026-05-11)
- **Local Sandbox Environment**: Fully functional via `launch-sandbox.bat`. This bypasses live data and uses local mocks for safe testing.
- **Data Layer**: Hybrid model using Neon Postgres (Primary) and Google Sheets (Legacy/Sync). DAL mappers are in place.
- **UI/UX**: Dashboard features (Live, Calendar, Feedback) are operational. JobDetailModal handles complex job lifecycles.
- **Tracking**: Established this log to ensure professional-grade project management and zero-friction handover.

## Recent Actions
- **Discovery**: Identified `launch-sandbox.bat` as the primary entry point for safe local testing.
- **Analysis**: Reviewed `dashboard-api.ts` for mock data handling and `JobDetailModal` for phase-based dispatch logic.
- **Clarification**: Confirmed "Dev Admin notes" in the feedback system were intentionally added for functionality testing.

## Technical Decisions
- **Mock-First Testing**: Use `NEXT_PUBLIC_SANDBOX_MODE=true` for all UI development to prevent accidental production data mutation.
- **Shadow Writing**: Communication logs and job comments are being transitioned to Postgres to improve performance and reliability over Sheets.

## Next Steps
- [ ] **Audit Admin Notes**: Review if "Dev Admin notes" should be removed or hidden behind a toggle for the production build.
- [ ] **Stabilize DAL**: Finalize migration of remaining Sheets-only logic to the Neon Postgres layer.
- [ ] **Verify Dispatch Workflow**: Test the senior/trainee technician assignment logic in the sandbox.
