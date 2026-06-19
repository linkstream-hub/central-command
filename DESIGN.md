---
name: APT Central Command
description: Ops dispatch platform for APT Maintenance Inc. — field job routing, tech scheduling, and mobile PWA for field technicians.
colors:
  navy-void: "#0a0f18"
  navy-panel: "#121926"
  navy-card: "#13151a"
  navy-raised: "#1c1f27"
  slate-border: "#1e293b"
  slate-secondary: "#94a3b8"
  slate-muted: "#64748b"
  white: "#ffffff"
  alert-signal: "#f5b900"
  alert-signal-hover: "#e0a700"
  status-urgent: "#ef4444"
  status-turnover: "#f97316"
  status-pending: "#eab308"
  status-standard: "#3b82f6"
  status-complete: "#22c55e"
  status-break: "#a855f7"
typography:
  display:
    fontFamily: "Geist Sans, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Geist Sans, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Geist Sans, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1.4
  body:
    fontFamily: "Geist Sans, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Geist Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.02em"
rounded:
  none: "0px"
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.alert-signal}"
    textColor: "#000000"
    rounded: "{rounded.xl}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.alert-signal-hover}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.lg}"
    padding: "8px 16px"
  chip-urgent:
    backgroundColor: "#ef444433"
    textColor: "{colors.status-urgent}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
  chip-standard:
    backgroundColor: "#3b82f633"
    textColor: "{colors.status-standard}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
  chip-complete:
    backgroundColor: "#22c55e33"
    textColor: "{colors.status-complete}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
---

# Design System: APT Central Command

## 1. Overview

**Creative North Star: "The Dispatch Room"**

APT Central Command is built for the physical texture of a dispatch operation — not the abstracted polish of a SaaS product. Think wall-mounted job board, amber warning lights, radio chatter, shift handoffs. The interface is dense by design: a dispatcher needs 10 jobs visible at once, not three beautiful cards. Every surface earns its presence by carrying information.

The palette is deep navy with a single load-bearing accent: Alert Signal amber (#f5b900). Amber is not a brand color — it is a *signal*. It appears on screens the way a warning light appears on a control panel: rarely, precisely, and unmistakably. The rest of the palette is disciplined neutrals — four tonal layers of navy that create depth without decoration.

This system explicitly rejects the aesthetic of polished SaaS tools (Linear, Notion, Vercel). No soft grays, no indigo accents, no comfortable white space used to make sparse data feel "clean." Comfort is not the goal. Clarity under pressure is.

**Key Characteristics:**
- Dark-mode only. Navy background, not black. The depth feels like a dimly lit operations center, not a gaming terminal.
- Information density is a feature. Rows over cards. Tables over tiles. Scannability over breathing room.
- Alert Signal is the sole accent. Its rarity is the point.
- Two surfaces: Dispatcher dashboard (desktop, dense) and Tech PWA (mobile, one-handed, sunlight-readable).
- Status speaks first: six semantic colors carry job state — readable in under a second without reading text.

## 2. Colors: The Signal Palette

One signal color against disciplined navy depths. Every color earns its place by carrying information.

### Primary
- **Alert Signal** (#f5b900): The sole action/urgency accent. Used on primary buttons, active states, and any element that demands immediate attention. Appears on ≤10% of any screen — its rarity is its authority.
- **Alert Signal Hover** (#e0a700): Slightly deeper amber for hover/active states on alert-signal elements.

### Neutral
- **Navy Void** (#0a0f18): The base canvas. Never used for text. Used only as page background.
- **Navy Panel** (#121926): Primary surface for sidebars, modals, and major panel containers.
- **Navy Card** (#13151a): Card and list-item backgrounds — a subtle step above Navy Void.
- **Navy Raised** (#1c1f27): Hover states, elevated elements, and active rows.
- **Slate Border** (#1e293b): Dividers, borders, and separators. Barely perceptible; structure without weight.
- **Slate Secondary** (#94a3b8): Secondary text — labels, field names, metadata.
- **Slate Muted** (#64748b): Tertiary text — timestamps, helper text, disabled labels.
- **White** (#ffffff): Primary text only. Used exclusively for high-importance content on navy surfaces.

### Secondary: Status Semantic System
Six colors encode job state. These are not decorative — they ARE the information.

- **Status Urgent** (#ef4444): Immediate attention required. Red.
- **Status Turnover** (#f97316): Turnover jobs. Orange.
- **Status Pending** (#eab308): PTE pending/awaiting. Yellow.
- **Status Standard** (#3b82f6): Routine scheduling. Blue.
- **Status Complete** (#22c55e): Job done. Green.
- **Status Break** (#a855f7): Technician on break. Purple.

Status colors appear as chip backgrounds at 20% opacity with the full-saturation color as text. This creates readable contrast while maintaining the dark surface aesthetic.

**The Alert Signal Rule.** `#f5b900` is reserved for primary actions and high-priority signals. Never use it decoratively — no amber gradients, no amber icon fills on non-urgent items, no amber borders on already-settled jobs. When everything is amber, nothing is urgent.

**The Semantic Six Rule.** The six status colors are the system's secondary palette. They are never used interchangeably or decoratively. A purple chip always means "on break." A red chip always means "urgent." No exceptions.

## 3. Typography

**Display Font:** Geist Sans (system-ui, sans-serif fallback)
**Body Font:** Geist Sans (same family, varying weight)
**Label / Mono Font:** Geist Mono (monospace)

**Character:** A single-family system in two registers: proportional sans for all reading, monospace for operational data (job IDs, timestamps, badge numbers). Geist is geometric and neutral — it recedes to let information lead. No display serifs. The tool doesn't have a voice; it has facts.

### Hierarchy
- **Display** (600 weight, clamp(1.5rem, 3vw, 2.5rem), 1.1 line-height, -0.02em tracking): Page-level headings and modal titles. Appears rarely.
- **Headline** (600 weight, 1.125rem/18px, 1.3 line-height, -0.01em tracking): Section headers, card titles, tab labels.
- **Title** (500 weight, 0.9375rem/15px, 1.4 line-height): Row headers, field labels in dense tables.
- **Body** (400 weight, 0.875rem/14px, 1.5 line-height): All prose, descriptions, address text. Max line length 65ch on wide surfaces.
- **Label** (Geist Mono, 500 weight, 0.75rem/12px, 0.02em tracking): Job IDs, badge numbers, timestamps, status codes. Tabular figures enforced (`font-variant-numeric: tabular-nums`).

**The Mono-for-Data Rule.** Any value that must align in a column, be compared across rows, or identifies a record (job ID, tech badge, time value) renders in Geist Mono. No exceptions. Monospace is the signal that "this is a datum, not prose."

## 4. Elevation

This system uses **tonal layering**, not shadows. Depth is expressed through four navy tones that step in luminosity — not through blur, not through box-shadow at rest. Shadows appear only as a response to state (hover, drag, focused modal).

Four tonal layers, bottom to top:
1. **Navy Void** (#0a0f18) — page background. The floor.
2. **Navy Card** (#13151a) — cards, table rows, list items. One step above.
3. **Navy Panel** (#121926) — sidebars, modals, drawers. Mid-level container.
4. **Navy Raised** (#1c1f27) — hover state, active rows, elevated elements.

### Shadow Vocabulary
- **Hover lift** (`0 4px 20px -2px rgba(0,0,0,0.4)`): Applied via `translateY(-1px)` on interactive cards. Confirms interactability on hover; invisible at rest.
- **Modal backdrop**: No shadow needed — the dark overlay is the signal. Modal surface at Navy Panel on Navy Void void provides natural separation.

**The Flat-By-Default Rule.** No element uses a box-shadow at rest. Shadows are state feedback (hover, drag, focused modal), not structural decoration. A shadow at rest is a lie about elevation — it says "this floats" when the element hasn't moved.

## 5. Components

### Buttons
Refined operator feel: slightly rounded (12px radius), firm, no ornament.

- **Shape:** Gently rounded corners (12px / `rounded-xl`). Not pill-shaped; not square. Confident.
- **Primary:** Alert Signal background (#f5b900), black text (`#000000`), 600 weight, `py-3 px-6`. The only place black text is used — for contrast on amber.
- **Hover / Active:** Amber darkens to #e0a700; `scale(0.98)` on active (feedback without bounce).
- **Ghost:** Transparent background, white text, 1px Slate Border border, 8px radius. Used for secondary actions in dark contexts.
- **Disabled:** `opacity-50`, `cursor-not-allowed`. Color unchanged — disabled is transparent, not gray.

### Status Chips
The semantic workhorse of the dispatch interface.

- **Style:** Rounded-full pill. Background: status color at 20% opacity. Text: status color at full saturation. No border. Compact (`py-0.5 px-2.5`).
- **Text:** Geist Mono, 12px, 500 weight. Status label is always visible as text alongside color — never color-only.
- **Rule:** Each of the six status colors has exactly one chip variant. No mixing.

### Cards / Containers
- **Corner Style:** 8px radius (`rounded-lg`) for most containers; 12px (`rounded-xl`) for modals and full panels.
- **Background:** Navy Card (#13151a) by default; Navy Panel (#121926) for modals and drawers.
- **Shadow Strategy:** None at rest. Hover lift (`translateY(-1px)`, `box-shadow: 0 4px 20px -2px rgba(0,0,0,0.4)`) on interactive cards.
- **Border:** 1px Slate Border (#1e293b) on all card surfaces. Barely visible — structural, not decorative.
- **Internal Padding:** 16px standard; 12px for compact table rows.

### Inputs / Fields
- **Style:** Navy Card background (#13151a), 1px Slate Border, 6–8px radius. No visible stroke by default.
- **Focus:** Border shifts to Alert Signal (#f5b900) at 60% opacity. No glow/blur — a clean border shift is sufficient signal.
- **Error:** Border shifts to Status Urgent (#ef4444). Error text in Status Urgent below the field.
- **Disabled:** `opacity-50`. Background unchanged.
- **Placeholder:** Slate Muted (#64748b) — ensure 4.5:1 against Navy Card background. (Note: #64748b on #13151a may be marginal at small sizes — verify and bump toward #94a3b8 if needed.)

### Navigation
- **Desktop sidebar (Dispatcher):** Navy Panel background. Active item: Navy Raised background + Alert Signal left indicator (2px). Inactive: Slate Secondary text, no background. No heavy hover fill — a subtle Navy Raised on hover is enough.
- **Mobile bottom nav (Tech PWA):** Fixed bottom, Navy Panel background, safe-area-inset-bottom padding. Active tab: Alert Signal icon tint. Inactive: Slate Muted. Touch targets ≥ 44px.

### Signature: Job Priority Row
The primary information unit in the dispatcher view. A full-width row in a dense table.

- Background: Navy Card (#13151a). Active/selected: Navy Raised.
- Status chip left of address. Address in Body (Geist Sans 14px). Job ID in Label (Geist Mono 12px, slate-muted).
- Priority border: **top border only (2px)** in the status color — NOT a side-stripe left border. Side-stripe borders are prohibited.
- Hover: Navy Raised background, no shadow.

## 6. Do's and Don'ts

### Do:
- **Do** reserve Alert Signal (#f5b900) for primary buttons and genuine urgency signals. Its rarity is its authority.
- **Do** use Geist Mono for all data values that must be compared across rows (job IDs, badge numbers, timestamps).
- **Do** encode job status as both color AND text label on every chip — never color-only.
- **Do** keep shadows invisible at rest; use `translateY(-1px)` + shadow only on hover state.
- **Do** maintain four tonal navy layers. Don't invent new arbitrary dark grays — the system has Navy Void / Navy Card / Navy Panel / Navy Raised. Use them in order.
- **Do** use top-border priority indicators (2px) on job rows instead of left-stripe borders.
- **Do** ensure all touch targets on the Tech PWA are ≥ 44px.
- **Do** apply `font-variant-numeric: tabular-nums` to any numeric column in the dispatch table.
- **Do** include `@media (prefers-reduced-motion: reduce)` alternatives on every Framer Motion animation.

### Don't:
- **Don't** use `border-left` or `border-right` greater than 1px as a colored accent stripe on job rows, list items, or chips. This is the single most common visual debt in the current codebase (see `JobChip.tsx`, `jobs/page.tsx`). Replace with: full borders, background tints, or leading status chips.
- **Don't** make this look like a polished SaaS tool (Linear, Notion, Vercel). No soft grays, no indigo accents, no generous white space used to mask sparse data. This is an operations tool, not a product demo.
- **Don't** use Alert Signal (#f5b900) decoratively — no amber gradients, amber icon fills, or amber text on non-urgent states.
- **Don't** add a shadow at rest to any element. The Flat-By-Default Rule: shadows are state feedback, not structure.
- **Don't** invent new gray tones outside the four navy layers. Every off-system gray breaks the tonal discipline.
- **Don't** use color alone to communicate status. Every status chip must include a text label.
- **Don't** animate layout properties (width, height, margin). Framer Motion animations stay on transform/opacity.
- **Don't** use glassmorphism decoratively. The `.glass-panel` utility exists; use it with a real layered surface behind it, not on a flat background where blur is invisible.
- **Don't** use gradient text (`background-clip: text`). Status and priority use solid semantic colors.
