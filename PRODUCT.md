# Product

## Register

product

## Users

**Dispatchers** — office staff (1–3 people) on desktop/laptop. Manage inbound work order emails, assign field techs, schedule jobs, monitor active dispatches. Their primary task on any screen is: get the next job to the right tech, fast. They're in this tool all day; every wasted click costs real time.

**Field Technicians** — 8–12 tradespeople in the field, on mobile (iPhone/Android). Clock in/out, view assigned jobs, log job completion. Gloves, sunlight, 30-second interactions. They need: one clear action, no ambiguity.

## Product Purpose

APT Central Command is the operational spine of APT Maintenance Inc. — a Bay Area property maintenance company. It routes inbound work orders (email-parsed by AI) through a dispatch queue, lets dispatchers assign and schedule jobs, and gives field techs a mobile PWA for clocking in/out and completing jobs. Success means: a dispatcher can receive a work order, assign a tech, and schedule the job — start to finish — without leaving the dashboard.

## Brand Personality

**Decisive · Tactical · Trusted**

Command center energy. The interface speaks in facts, not suggestions. Information is dense but organized — every row earns its space. Actions are confident and irreversible-feeling (like a dispatch radio). The tool trusts the dispatcher knows what they're doing; it doesn't hand-hold.

## Anti-references

- **Generic SaaS (Linear / Notion / Vercel)** — too polished-startup. Soft grays, rounded corners, indigo accents, lots of white space. This product handles real field ops; it should feel like a tool, not a product demo.
- Avoid: cards with icon + heading + text as the default layout unit, eyebrow labels on every section, subtle everything.

## Design Principles

1. **Information density over comfort** — dispatchers need 10 jobs visible at once, not 3 beautiful cards. Trust the user to handle density.
2. **Status speaks first** — job priority and urgency must be readable in under a second, without hovering or reading text. Color + shape + position do this work.
3. **Mobile is a first-class surface, not a shrunk desktop** — the tech PWA has fundamentally different constraints (gloves, sunlight, one-handed). The two surfaces share a design language but not a layout.
4. **Actions are unambiguous** — every interactive element communicates exactly what pressing it does. No mystery meat navigation.
5. **The amber accent is load-bearing** — `#f5b900` is the signature urgency/action color. It means "this needs attention or action." Don't dilute it with decorative use.

## Accessibility & Inclusion

- WCAG 2.1 AA as the baseline.
- Tech PWA must be operable in direct sunlight (high contrast, no reliance on subtle tint differences for status).
- Touch targets ≥ 44px on the tech PWA.
- Reduced motion: Framer Motion animations need `prefers-reduced-motion` alternatives — typically instant transitions.
- No color-only status encoding: each status chip needs both color AND a text label.

---

## Phase 2 Architecture & Workflow Ideas (USER REQUESTED)
*Note: Do not auto-correct or remove these items. They are logged for discussion following Phase 0 recovery.*

1. **CRM Synchronization & Drift Detection:** When incoming WO emails from Lapham/RMs contain new Resident Manager names, emails, or access codes (e.g. gate codes/lockboxes) that conflict with the Neon DB property records, the system should flag the discrepancy. Consider an auto-response loop to request confirmation to update APT's DB records, enforcing Neon as the strict source of truth.
2. **Auto-Acknowledgements:** Implement automatic response emails to clients confirming their work order was received and logged internally.
3. **PTE Coordination Auto-Responses:** If a Lapham Form is attached, PTE is not granted, and the unit is occupied, trigger an automated SMS/email to the tenant (using the info on the form) to coordinate scheduling. This eliminates a major dispatcher bottleneck.
4. **Buy vs Build Discussion:** Given the complexity of the above "massive new features" (multi-channel syncs, state machines, automated client outreach), conduct a formal architecture discussion comparing fully custom-coding these functions vs integrating with an open-source CMMS foundation, explicitly factoring in the LLM/Agentic maintenance burden for a non-dev manager.
