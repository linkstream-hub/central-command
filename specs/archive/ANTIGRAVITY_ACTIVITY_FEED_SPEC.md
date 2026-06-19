# ANTIGRAVITY SPRINT — LIVE FEED ACTION ITEM CLEANUP
# Owner: Claude Code | Executor: Antigravity
# Date: April 23, 2026
# File: tech-pwa/src/components/dashboard/ActivityFeed.tsx

---

## PROBLEM

The Live Feed marquee at the bottom of the Coordination view (/live) is diluted with
informational noise that does not require action from Dispatch. Clock-in events
("X clocked in at 7:30am") and scheduled job confirmations ("X assigned to Y address")
are not action items. Dispatch needs to see only what requires their immediate attention.

---

## TASK — Refocus ActivityFeed to action items only

### File: `tech-pwa/src/components/dashboard/ActivityFeed.tsx`

Replace the entire `events` useMemo block (lines ~23–131) with the version below.
Keep everything else (imports, interface, JSX, marquee animation) exactly as-is.

```tsx
const events = useMemo(() => {
  const derived: ActivityEvent[] = [];
  const now = new Date();

  // Priority 0 — CA compliance violations (highest urgency)
  techs.forEach(tech => {
    if (tech.violations && tech.violations.length > 0) {
      derived.push({
        id: `violation-${tech.techId}`,
        type: 'violation',
        text: `VIOLATION — ${tech.techName}: ${tech.violations[0].replace(/_/g, ' ')}`,
        icon: AlertCircle,
        color: "text-urgent",
        priority: 0
      });
    }
    // CA meal threshold warning (>270 min on job = approaching 4.5h without break)
    if (tech.status === 'ON JOB' && (tech.elapsedMin ?? 0) > 270) {
      derived.push({
        id: `ca-warn-${tech.techId}`,
        type: 'violation',
        text: `CA RISK — ${tech.techName} approaching meal break threshold`,
        icon: AlertCircle,
        color: "text-urgent",
        priority: 0
      });
    }
  });

  // Priority 1 — Urgent jobs not yet assigned
  jobs.forEach(job => {
    if (job.priority === '1-URGENT' && !job.assignedTech &&
        job.status !== 'Archived' && job.status !== 'Complete') {
      derived.push({
        id: `urgent-${job.jobId}`,
        type: 'urgent',
        text: `URGENT UNASSIGNED — ${job.address}${job.unit ? ` Unit ${job.unit}` : ''}`,
        icon: AlertCircle,
        color: "text-urgent",
        priority: 1
      });
    }
  });

  // Priority 2 — Jobs awaiting approval (blocking scheduling)
  jobs.forEach(job => {
    if (job.status === 'Awaiting Approval') {
      derived.push({
        id: `approval-${job.jobId}`,
        type: 'stale',
        text: `NEEDS APPROVAL — ${job.address}${job.unit ? ` Unit ${job.unit}` : ''}`,
        icon: AlertCircle,
        color: "text-pte",
        priority: 2
      });
    }
  });

  // Priority 3 — Stale jobs (New >48h or Ready to Schedule >72h without assignment)
  jobs.forEach(job => {
    if (!job.timestamp) return;
    const diffHours = (now.getTime() - new Date(job.timestamp).getTime()) / (1000 * 60 * 60);

    if (job.status === 'New' && diffHours > 48) {
      derived.push({
        id: `stale-new-${job.jobId}`,
        type: 'stale',
        text: `STALE ${Math.floor(diffHours / 24)}d — New: ${job.address}`,
        icon: Clock,
        color: "text-urgent",
        priority: 3
      });
    } else if (job.status === 'Ready to Schedule' && diffHours > 72) {
      derived.push({
        id: `stale-rts-${job.jobId}`,
        type: 'stale',
        text: `STALE ${Math.floor(diffHours / 24)}d — Unscheduled: ${job.address}`,
        icon: Clock,
        color: "text-pte",
        priority: 3
      });
    } else if (job.status === 'PTE Required' && diffHours > 24) {
      derived.push({
        id: `stale-pte-${job.jobId}`,
        type: 'stale',
        text: `PTE PENDING ${Math.floor(diffHours / 24)}d — ${job.address}`,
        icon: Clock,
        color: "text-pte",
        priority: 3
      });
    }
  });

  // If nothing needs attention, show nominal status — do NOT show clock events
  if (derived.length === 0) {
    derived.push({
      id: 'nominal',
      type: 'generic',
      text: "Queue clear — no immediate action required",
      icon: CheckCircle2,
      color: "text-accent",
      priority: 99
    });
  }

  return derived.sort((a, b) => a.priority - b.priority);
}, [jobs, techs]);
```

### What was removed and why:
- **Clock-in/break events** — informational only, not actionable for Dispatch
- **"X assigned to Y" events** — completed action, not pending action
- These are visible on the /team page and /live field status panel already

### What was added:
- **Awaiting Approval** jobs now surface (these were missing entirely)
- **Ready to Schedule >72h** stale threshold (was missing — jobs could sit indefinitely)
- Cleaner copy that names the action needed, not just the job address

---

## DO NOT TOUCH

- The JSX/marquee render code below `displayEvents`
- The motion animation props
- The fade gradient divs
- The "Live Feed" label
- Any other component

---

## VERIFICATION

1. `npx tsc --noEmit` — zero errors
2. In the browser: if there are any Awaiting Approval, stale New, or stale Ready to Schedule jobs, they now appear in the feed
3. No clock-in messages appear in the feed
4. If all is clear, "Queue clear" message shows

---

## COMMIT MESSAGE

`fix: live feed shows only actionable dispatch items — remove clock noise, add awaiting approval + stale RTS`
