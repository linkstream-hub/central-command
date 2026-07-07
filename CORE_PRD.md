## Problem Statement

APT Maintenance Inc. relies on complex, manual coordination between office dispatchers and field technicians (plumbers, electricians, handymen). Work orders arrive via email (from property managers like Lapham), dispatchers must manually triage and assign them, and techs in the field need a reliable way to clock in, log work, and clock out. 

The previous iteration of the software suffered from "Agentic Hallucination" and lack of disciplined gates, resulting in 138 work orders permanently stuck in "dead" states, non-compliant timekeeping practices (PAGA risks), and exposed ghost-environment variables. Dispatchers waste time coordinating access with tenants, and techs struggle with fragile mobile interfaces while wearing gloves in direct sunlight.

## Solution

APT Central Command: An operational, event-driven spine that serves as the single source of truth for the company. 
- It routes inbound work orders (parsed via AI) through a dispatcher queue.
- It provides dispatchers with a high-density, decisive dashboard to assign and schedule jobs instantly.
- It gives field techs a robust, high-contrast Mobile PWA for clocking in/out and completing jobs.
- The system enforces strict California Wage/Hour compliance and maintains state consistency via a Postgres database and EventBus outbox pattern, entirely replacing the legacy Google Apps Script (GAS) architecture.

## User Stories

1. As a **Dispatcher**, I want to see 10 active jobs on a single screen without scrolling, so that I can monitor operations with high information density.
2. As a **Dispatcher**, I want work order priority and urgency communicated instantly via color (`#f5b900` amber) and shape, so that I can triage without reading paragraph text.
3. As a **Dispatcher**, I want inbound emails from property managers to be automatically parsed and converted into draft work orders, so that I don't have to do manual data entry.
4. As a **Dispatcher**, I want the system to automatically SMS tenants to coordinate scheduling if a unit is occupied, so that I don't waste hours playing phone tag.
5. As a **Dispatcher**, I want the system to flag discrepancies when a property manager emails a work order with a new gate code that contradicts our database, so that I can update our source of truth.
6. As a **Field Tech**, I want large (≥ 44px), high-contrast touch targets on my mobile app, so that I can clock in and out while wearing work gloves in direct sunlight.
7. As a **Field Tech**, I want the UI to present exactly one unambiguous action at a time, so that I don't get confused about my current state (e.g., En Route vs On Site).
8. As a **Business Owner**, I want strict CA Wage/Hour and PAGA compliance enforced automatically (meal breaks, rest breaks, daily caps), so that I am protected from labor lawsuits.
9. As a **System Admin**, I want all domain events written to an outbox in the same database transaction, so that a server crash doesn't result in silent data corruption.
10. As a **System Admin**, I want a `/ops` dashboard showing pending events, failed events, and Sentry health, so that I can monitor system stability without writing SQL.

## Implementation Decisions

- **Framework:** Next.js (pinned to 15.x) with shadcn/ui for the frontend, deployed on Vercel.
- **Database:** Neon Postgres (Serverless).
- **Authentication:** Migrating from next-auth/GAS to Clerk (or patched stable auth) to ensure zero client-readable secrets and robust token rotation.
- **State Management (Offline):** Migrating from `localStorage` to IndexedDB (via Dexie.js) for the Field Tech PWA to ensure offline durability and prevent XSS vulnerabilities.
- **Event Architecture:** Strict Transactional Outbox pattern (`domain_events` table). No event is considered "published" until a Vercel cron poller successfully pushes it to n8n and receives an acknowledgement.
- **Design System:** High density, decisive "Command Center" aesthetic. No generic SaaS styling (no soft grays or excessive whitespace). Amber (`#f5b900`) is exclusively reserved for urgent action items.
- **Mobile PWA:** `@ducanh2912/next-pwa` (or `@serwist/next`) with strict WCAG 2.1 AA contrast requirements.

## Testing Decisions

- **Pre-Merge Enforcement:** No code merges without a failing test first (Pocock TDD). `tsc` and `vitest` must be perfectly clean.
- **Integration Seams:** All API seams between Agents (e.g., AG backend vs Codex frontend) are strictly governed by Zod schemas in `lib/contracts/`.
- **E2E Validation:** Playwright will simulate the entire core loop (intake → WO created → dispatch → assign → clock in → job complete → clock out).
- **Chaos Drills:** The system must survive and gracefully degrade under the following simulated failures: n8n down, Gemini key missing, expired tech session, duplicate status updates.
- **Compliance Parity:** The new Next.js engine must be tested against the legacy GAS output for the last 90 days of shifts. Any dollar divergence must be flagged to the owner.

## Out of Scope

- Complete automated scheduling (dispatchers still manually assign the final tech).
- Full custom-built billing integration (evaluation of Crater/Stripe is deferred).
- Using AI to write compliance policies (CA Labor Law must be strictly enforced via deterministic code, not LLM judgement).
- Any Google Apps Script (GAS) development. All GAS is deprecated and slated for removal.

## Further Notes

- The project is currently under a **Feature Freeze** (6-Phase Recovery Program). No new features (like auto-SMS to tenants) will be built until the core dispatch loop (Phase 3) is proven to be 100% stable with zero dead-state work orders.
