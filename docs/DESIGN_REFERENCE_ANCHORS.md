# DESIGN_REFERENCE_ANCHORS.md
# Concrete UI anchors for Antigravity — checked before building any new component.
# These are the specific pages and UI states to open and compare against.
# "Does this look at home next to these?" — if no, it's not done.

---

## LINEAR — linear.app
The gold standard. Every CC2.0 surface is measured against this.

### Pages to open
- **Issue list:** linear.app/[any-team]/issues — the dense table of issue cards
- **Issue detail:** click any issue → the split modal (left = context, right = activity thread)
- **Sidebar:** expanded and collapsed states
- **Command palette:** Cmd+K — observe result items, keyboard nav, action rows

### Specific patterns to copy exactly
1. **Issue card hover:** subtle `translateY(-1px)` + background brightens 4%. Not just opacity.
2. **Priority dot:** 4px circle, left of the title, color-coded (red=urgent, orange=high, yellow=medium, gray=no priority). CC2.0 uses priority borders — keep those, but the dot goes in the card metadata row.
3. **Modal open animation:** `opacity 0→1` + `scale 0.96→1` + `translateY 8px→0`, spring physics, ~220ms. The backdrop fades in 30ms behind the modal.
4. **Keyboard shortcuts on list items:** hover a row → `E` label appears at right edge → press `E` to open edit. CC2.0 should do the same: hover a job row → keyboard hints appear.
5. **Sidebar active item:** left 3px accent bar (we have this) + label color = accent (we have this) + **background = accent/8%** (check if ours matches — it should be barely visible).
6. **Empty state:** centered icon (outline, not filled) + one-line description + optional CTA button. Never a spinner alone, never just blank.
7. **Section headers in lists:** `text-[10px] font-black uppercase tracking-[0.2em] text-muted` — exactly what our specs use. Verify every section header matches this spec.

---

## VERCEL DASHBOARD — vercel.com/dashboard
Dense operational data that stays readable. Reference for the `/live` coordination page and any status-dense view.

### Pages to open
- **Main dashboard:** vercel.com/dashboard — the project list
- **Deployment detail:** click any deployment → status, logs, domains panel

### Specific patterns to copy
1. **Deployment status card:** monospace commit hash in gray, branch name in white, timestamp right-aligned, colored status dot (green/red/yellow) left of the project name. 
   → In CC2.0: job cards should show `#LEAD-ID` in monospace, address in white, timestamp right, priority color-dot left.
2. **Activity feed items:** icon (14px) + bold action verb + muted object + muted timestamp. Single line. Never wraps.
3. **KPI stat cards:** large number in white `text-3xl font-black`, small label below in `text-[10px] uppercase tracking-widest text-muted`. No chart unless data warrants it. Matches our SummaryCards — verify the font sizes match exactly.
4. **Error state:** red left border on the card, `text-red-400` title, muted description. Clean, not alarming.

---

## FEY — fey.com
Dark glass cards at their best. Reference for job cards, tech profile cards, any "entity card."

### Pages to open
- **Homepage:** fey.com — scroll down to the portfolio overview cards
- **Account detail view:** click any portfolio item

### Specific patterns to copy
1. **Card elevation system — THREE levels, not one:**
   - Level 1 (surface): `background: rgba(255,255,255,0.02)` + `border: 1px solid rgba(255,255,255,0.06)` + NO blur
   - Level 2 (raised): `background: rgba(255,255,255,0.04)` + `border: 1px solid rgba(255,255,255,0.10)` + `backdrop-blur-sm`
   - Level 3 (floating/modal): `background: rgba(15,17,22,0.92)` + `border: 1px solid rgba(255,255,255,0.12)` + `backdrop-blur-xl`
   
   Currently CC2.0 uses `glass-panel` for most surfaces. Audit this — job cards should be Level 2, modals Level 3, the main content area Level 1.

2. **Card accent line:** 1px top border with a higher-opacity color than the side/bottom borders. Creates a "light catching the edge" effect. Add to all Level 2/3 cards:
   ```css
   border-top: 1px solid rgba(255,255,255,0.15);
   ```

3. **Number typography:** large financial/stat numbers use `font-variant-numeric: tabular-nums` so digits don't jump width. Add `tabular-nums` class to any changing numeric display (timers, job counts, hours).

4. **Hover state:** cards scale `1.0 → 1.005` + shadow deepens. Barely perceptible but tactile.

---

## RAYCAST — raycast.com
Reference for command palette (already built), notifications, and any ephemeral UI (toasts, tooltips).

### Pages to open
- **Homepage:** raycast.com — observe the command palette demo
- **Extensions page:** raycast.com/store — the extension cards
- **Blog post on notifications:** raycast.com/blog/raycast-notifications (if accessible)

### Specific patterns to copy
1. **Command palette result row hover:** the background doesn't just change color — it has a `0.15s` ease sweep from left to right (`background-position` animation on a gradient). Subtle but premium. 
   → Our current command palette: check if it uses a simple `hover:bg-white/5` or has the sweep. Should be the sweep.

2. **Toast notification anatomy:** icon (colored) + bold title + muted subtitle + optional action button, all on one row. Max-width `320px`. Enters from `translateY(100%)` at bottom-right. Auto-dismisses at 3s (info), 5s (error), never (action-required).
   → Our `ToastContext.tsx`: verify this matches. Especially the enter animation — should come from below, not fade in place.

3. **Keyboard shortcut badge:** `⌘K`, `⌘E`, `Esc` etc. displayed as `<kbd>` elements: `bg-white/10 rounded-md px-1.5 py-0.5 text-[10px] font-mono text-muted border border-white/10`. Never plain text.
   → Add these to the command palette prompt and to any hover-revealed shortcuts on list rows.

4. **Extension result item:** icon (16px, colored) + bold label + muted subtitle + right-aligned shortcut badge. Single row, 40px height. Matches what `JobQueueTable` rows should feel like.

---

## HEIGHT.APP — height.app
Reference for the internal thread model (comms attached to tasks). The exact pattern ANTIGRAVITY_COMMS_SPEC.md is implementing.

### Pages to open
- **App:** height.app (requires account — observe marketing screenshots if no account)
- **Task detail with thread:** any task → Activity/Comments panel on the right

### Specific patterns to copy
1. **Thread attachment model:** the thread panel is NOT a modal. It is a persistent right panel that opens inline alongside the task. The task content scrolls independently of the thread. 
   → In CC2.0 Phase 1, the thread is at the bottom of the modal scroll. Phase 2: consider splitting the modal into left-scroll (task) + right-fixed (thread) once volume of comments grows.

2. **Comment bubble anatomy:** avatar (initials, 28px circle) + name bold + role muted + timestamp muted — all on one line. Body text below in a lightly bordered bubble. No tail/arrow on the bubble (flat, not chat-bubble style).
   → This is exactly what `CommentBubble` in COMMS_SPEC implements. Verify the sizing matches.

3. **Compose area:** `min-height: 40px` textarea that grows to `max-height: 120px` as you type. No explicit send button visible until textarea has focus — then the button slides up from below with `opacity 0→1 + translateY 8px→0`. 
   → Current spec has a static button. The Height animation is the upgrade path for Phase 2.

4. **Thread section divider:** a horizontal line with centered text `· X comments ·` in `text-[10px] text-muted`. Used to separate older from newer comments when there are >10. Not needed in Phase 1.

5. **Warmth:** Height uses `--border: rgba(255,255,255,0.10)` vs Linear's `rgba(255,255,255,0.08)`. Slightly warmer. For the thread section specifically, use Height's warmer border tone to differentiate it visually from the colder dispatch sections above.

---

## LIVEBLOCKS — liveblocks.io
**NOT YET NEEDED — Phase 4.** Do not implement until Internal Comms Phase 2 + real-time dispatch co-editing is on the sprint.

### When to use
- Dispatchers need to see each other's cursor on the schedule grid (who's dragging what)
- Multiple dispatchers viewing the same job modal — show "Robert is viewing" presence indicator
- Live comment typing indicators ("Robert is typing…")

### What to study when the time comes
- liveblocks.io/examples — the "Figma-like" and "Linear-like" demos
- Their `useOthers()` hook for presence
- Avatar stack component (`AvatarStack`) — stacked circles, overflow count

---

## COMPONENT AUDIT CHECKLIST
Before AG ships any new component, check these against the above references:

- [ ] Card elevation level correct (1/2/3 — not everything is Level 2)
- [ ] Top border accent present on Level 2/3 cards
- [ ] Hover state includes scale + shadow, not just background color change
- [ ] Empty states: icon + description + optional CTA (never just blank or spinner-only)
- [ ] Section headers: `text-[10px] font-black uppercase tracking-[0.2em] text-muted`
- [ ] Numbers in changing displays: `tabular-nums`
- [ ] Keyboard shortcut badges: `<kbd>` styling, not plain text
- [ ] Toast enters from below, not fade-in-place
- [ ] Modal open: `scale 0.96→1 + translateY 8px→0`, spring physics ~220ms
- [ ] Thread compose textarea: grows with content (not fixed height)
