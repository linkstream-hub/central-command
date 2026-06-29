# ANTIGRAVITY_NOTIFICATIONS_SPEC.md
# Notifications Center Phase 1 — Bell icon panel + getNotifications action
# Sprint owner: Antigravity | Spec author: Claude Code | Date: 2026-04-26

---

## OVERVIEW

Activate the bell icon in the `DashboardLayout` header. Clicking it opens a slide-out panel showing actionable items aggregated across three live sources: stale jobs, compliance alerts, and pending time-off requests. Each notification type is role-gated. Management/admin sees all three.

The morning briefing email becomes redundant once this panel is live and reliable. This is Phase 1 — we will NOT remove the email yet.

---

## WHAT TO BUILD

### New files
- None

### Files to edit
- `dashboard-api/DashboardAPI.gs` — add `getNotifications` action + `getNotificationsDA` function
- `tech-pwa/src/lib/dashboard-api.ts` — add `Notification`, `NotificationsResponse` types
- `tech-pwa/src/components/dashboard/DashboardLayout.tsx` — wire bell icon, badge, slide-out panel

### Do NOT touch
- Any existing page files, sidebar, or route guard
- Any existing DashboardAPI.gs functions — only ADD

---

## BACKEND — DashboardAPI.gs

### Step 1: Wire action in `doPost`

After the `getComplianceAlerts` line:
```javascript
if (action === 'getNotifications')   return daResponse(getNotificationsDA(body));
```

### Step 2: Add `getNotificationsDA`

Add after `getComplianceAlertsDA`:

```javascript
// Unified notification aggregator for the bell panel.
// Params: { role: 'dispatch' | 'hr' | 'compliance' | 'management' | 'admin' }
// Returns: { success: true, notifications: Notification[], unreadCount: number }
// Notification shape: { id, type, severity, title, body, timestamp, href }
// Types: 'STALE_JOB' | 'COMPLIANCE' | 'TIME_OFF_PENDING'
// Severity: 'urgent' | 'warning' | 'info'
function getNotificationsDA(params) {
  try {
    var role         = String((params && params.role) || 'dispatch').trim();
    var notifications = [];

    var canSeeJobs       = ['dispatch', 'management', 'admin'].indexOf(role) > -1;
    var canSeeCompliance = ['compliance', 'management', 'admin'].indexOf(role) > -1;
    var canSeeTimeOff    = ['hr', 'management', 'admin'].indexOf(role) > -1;

    // ── STALE JOBS ───────────────────────────────────────────────────────
    if (canSeeJobs) {
      var dqSheet = getDQSheet();
      if (dqSheet && dqSheet.getLastRow() >= 2) {
        var dqData = dqSheet.getDataRange().getValues();
        var now    = new Date();

        dqData.slice(1).forEach(function(row, i) {
          var status = String(row[DA_DQ.STATUS] || '').trim();
          if (status !== 'New' && status !== 'Open') return;

          var ts = row[DA_DQ.TIMESTAMP];
          if (!ts) return;
          var ageMs  = now - new Date(ts);
          var ageHrs = ageMs / (1000 * 60 * 60);
          if (ageHrs < 48) return; // Only surface truly stale (>48h)

          var address  = String(row[DA_DQ.ADDRESS]  || '').trim();
          var category = String(row[DA_DQ.CATEGORY] || '').trim();
          var priority = String(row[DA_DQ.PRIORITY] || '').trim();
          var dayStr   = Math.floor(ageHrs / 24) + 'd';
          var severity = priority === '1-URGENT' ? 'urgent' : 'warning';

          notifications.push({
            id        : 'stale-' + String(row[DA_DQ.LEAD_ID] || i),
            type      : 'STALE_JOB',
            severity  : severity,
            title     : dayStr + ' stale — ' + (category || 'Work Order'),
            body      : address || 'Unknown address',
            timestamp : ts instanceof Date
              ? Utilities.formatDate(ts, 'America/Los_Angeles', "yyyy-MM-dd'T'HH:mm:ss")
              : String(ts),
            href      : '/live'
          });
        });
      }
    }

    // ── COMPLIANCE ALERTS ────────────────────────────────────────────────
    if (canSeeCompliance) {
      try {
        var ss = SpreadsheetApp.openById('1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4');
        var caSheet = ss.getSheetByName('ComplianceAlerts');
        if (caSheet && caSheet.getLastRow() >= 2) {
          var caData = caSheet.getDataRange().getValues();
          // ComplianceAlerts columns (0-indexed):
          // 0=Alert ID, 1=Employee Name, 2=Employee ID, 3=Violation Type,
          // 4=Shift Date, 5=Total Hours, 6=Premium Amount, 7=Status, 8=Created At, 9=Resolved At
          caData.slice(1).forEach(function(row) {
            var status  = String(row[7] || '').trim();
            if (status === 'Resolved') return;

            var empName    = String(row[1] || '').trim();
            var violation  = String(row[3] || '').trim();
            var shiftDate  = String(row[4] || '').trim().slice(0, 10);
            var premium    = parseFloat(row[6]) || 0;
            var createdAt  = String(row[8] || '').trim();
            var alertId    = String(row[0] || '').trim();
            var severity   = premium > 0 ? 'urgent' : 'warning';

            notifications.push({
              id        : 'compliance-' + alertId,
              type      : 'COMPLIANCE',
              severity  : severity,
              title     : violation + (premium > 0 ? ' — $' + premium.toFixed(2) + ' premium' : ''),
              body      : empName + ' · ' + shiftDate,
              timestamp : createdAt,
              href      : '/compliance'
            });
          });
        }
      } catch (caErr) {
        Logger.log('getNotificationsDA ComplianceAlerts read error: ' + caErr.message);
      }
    }

    // ── PENDING TIME-OFF REQUESTS ────────────────────────────────────────
    if (canSeeTimeOff) {
      try {
        var tomSS    = SpreadsheetApp.openById(TOM_SHEET_ID_DA);
        var torSheet = tomSS.getSheetByName('TimeOffRequests');
        if (torSheet && torSheet.getLastRow() >= 2) {
          var torData = torSheet.getDataRange().getValues().slice(1);
          torData.forEach(function(row) {
            // Same column order as getTechAvailabilityWeekDA:
            // 0=RequestID, 1=EmployeeID, 2=EmployeeName, 3=LeaveType,
            // 4=StartDate, 5=EndDate, 6=Status
            var status    = String(row[6] || '').trim();
            if (status !== 'Pending') return;

            var empName   = String(row[2] || '').trim();
            var leaveType = String(row[3] || '').trim();
            var startDate = String(row[4] || '').trim().slice(0, 10);
            var requestId = String(row[0] || '').trim();

            notifications.push({
              id        : 'timeoff-' + requestId,
              type      : 'TIME_OFF_PENDING',
              severity  : 'info',
              title     : leaveType + ' request — awaiting approval',
              body      : empName + ' · starting ' + startDate,
              timestamp : startDate,
              href      : '/hr'
            });
          });
        }
      } catch (torErr) {
        Logger.log('getNotificationsDA TimeOff read error: ' + torErr.message);
      }
    }

    // Sort: urgent first, then warning, then info; within severity by timestamp desc
    var severityOrder = { urgent: 0, warning: 1, info: 2 };
    notifications.sort(function(a, b) {
      var sd = (severityOrder[a.severity] || 2) - (severityOrder[b.severity] || 2);
      if (sd !== 0) return sd;
      return String(b.timestamp || '').localeCompare(String(a.timestamp || ''));
    });

    // Cap at 50 — beyond that, the panel is unusable anyway
    if (notifications.length > 50) notifications = notifications.slice(0, 50);

    return {
      success      : true,
      notifications: notifications,
      unreadCount  : notifications.length
    };

  } catch (e) {
    Logger.log('getNotificationsDA error: ' + e.message);
    return { success: false, error: e.message, notifications: [], unreadCount: 0 };
  }
}
```

---

## FRONTEND — dashboard-api.ts types

Append to the types section:

```typescript
export interface Notification {
  id: string;
  type: 'STALE_JOB' | 'COMPLIANCE' | 'TIME_OFF_PENDING';
  severity: 'urgent' | 'warning' | 'info';
  title: string;
  body: string;
  timestamp: string;
  href: string;
}

export interface NotificationsResponse {
  success: boolean;
  notifications: Notification[];
  unreadCount: number;
}
```

---

## FRONTEND — DashboardLayout.tsx

### New state (add inside `DashboardLayout`):

```typescript
const [notifOpen, setNotifOpen]         = useState(false);
const [notifications, setNotifications] = useState<Notification[]>([]);
const [notifCount, setNotifCount]       = useState(0);
const [notifLoading, setNotifLoading]   = useState(false);
```

### Import additions:

```typescript
import { Search, Bell, Sun, Moon, X, AlertTriangle, Clock, CalendarCheck } from "lucide-react";
import { Notification, NotificationsResponse } from "@/lib/dashboard-api";
// AnimatePresence is already used in other components; import if not already at top
import { motion, AnimatePresence } from "framer-motion";
```

### Fetch function (add inside `DashboardLayout`):

```typescript
const fetchNotifications = async () => {
  setNotifLoading(true);
  try {
    const role = getSession()?.role ?? 'dispatch';
    const res = await dashboardRequest('getNotifications', { role }) as NotificationsResponse;
    if (res.success) {
      setNotifications(res.notifications);
      setNotifCount(res.unreadCount);
    }
  } catch { /* silent */ }
  setNotifLoading(false);
};

useEffect(() => {
  fetchNotifications();
  // Refresh notifications every 3 minutes
  const interval = setInterval(fetchNotifications, 180000);
  return () => clearInterval(interval);
}, []);
```

### Replace the existing bell button (lines 60-65 in the current file):

Find this:
```tsx
<button 
  className="relative p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors rounded-lg hover:bg-white/5"
  title="Notifications (coming soon)"
>
  <Bell size={20} />
</button>
```

Replace with:
```tsx
<button
  onClick={() => { setNotifOpen(o => !o); if (!notifOpen) fetchNotifications(); }}
  className="relative p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors rounded-lg hover:bg-white/5"
  title="Notifications"
>
  <Bell size={20} />
  {notifCount > 0 && (
    <span className="absolute top-1 right-1 w-4 h-4 text-[9px] font-black flex items-center justify-center rounded-full bg-[var(--accent)] text-white leading-none">
      {notifCount > 9 ? '9+' : notifCount}
    </span>
  )}
</button>
```

### Notification panel (add directly inside `DashboardLayout` return, as a sibling to `<main>`, wrapping the whole layout in a `relative` div):

The outer `div` wrapper currently is:
```tsx
<div className="flex min-h-screen bg-[var(--bg-primary)] font-sans text-[var(--text-primary)] overflow-hidden">
```

Keep that, then after `</main>` add:

```tsx
{/* ── NOTIFICATION PANEL ── */}
<AnimatePresence>
  {notifOpen && (
    <>
      {/* Backdrop */}
      <motion.div
        key="notif-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setNotifOpen(false)}
        className="fixed inset-0 z-40"
      />

      {/* Panel */}
      <motion.div
        key="notif-panel"
        initial={{ opacity: 0, x: 32 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 32 }}
        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
        className="fixed right-4 top-20 z-50 w-[380px] max-h-[calc(100vh-6rem)] flex flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/95 backdrop-blur-xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-subtle)]">
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[var(--text-primary)]">
            Notifications
            {notifCount > 0 && (
              <span className="ml-2 px-1.5 py-0.5 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] text-[9px]">
                {notifCount}
              </span>
            )}
          </span>
          <button
            onClick={() => setNotifOpen(false)}
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          {notifLoading ? (
            <div className="space-y-3 p-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-14 rounded-xl bg-white/5 animate-pulse" />
              ))}
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-3">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <span className="text-green-400 text-lg">✓</span>
              </div>
              <p className="text-xs text-[var(--text-muted)] font-bold">All clear — no open items</p>
            </div>
          ) : (
            <div className="p-3 space-y-2">
              {notifications.map(n => (
                <NotificationItem key={n.id} notif={n} onClose={() => setNotifOpen(false)} />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>
```

### `NotificationItem` sub-component (add below `DashboardLayout` in the same file):

```tsx
const NOTIF_ICON: Record<string, React.ReactNode> = {
  STALE_JOB         : <Clock size={14} />,
  COMPLIANCE        : <AlertTriangle size={14} />,
  TIME_OFF_PENDING  : <CalendarCheck size={14} />,
};

const NOTIF_COLORS: Record<string, string> = {
  urgent  : 'text-red-400 bg-red-500/10 border-red-500/20',
  warning : 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  info    : 'text-blue-400 bg-blue-500/10 border-blue-500/20',
};

function NotificationItem({ notif, onClose }: { notif: Notification; onClose: () => void }) {
  const colorClass = NOTIF_COLORS[notif.severity] ?? NOTIF_COLORS.info;
  const icon       = NOTIF_ICON[notif.type] ?? <Bell size={14} />;

  return (
    <Link href={notif.href} onClick={onClose}>
      <div className={`flex items-start gap-3 px-3 py-3 rounded-xl border cursor-pointer hover:brightness-110 transition-all ${colorClass}`}>
        <span className="mt-0.5 flex-shrink-0">{icon}</span>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-black leading-tight text-[var(--text-primary)] truncate">{notif.title}</p>
          <p className="text-[10px] text-[var(--text-muted)] mt-0.5 truncate">{notif.body}</p>
        </div>
      </div>
    </Link>
  );
}
```

Add `import Link from "next/link";` to the `DashboardLayout.tsx` import block.

---

## VERIFICATION STEPS

1. Bell icon in header has no badge when `notifications` array is empty.
2. Bell icon shows `N` badge (or "9+") when unreadCount > 0.
3. Clicking bell opens the panel; clicking bell again OR clicking the backdrop closes it.
4. **dispatch role:** panel shows stale jobs only. No compliance alerts, no time-off items.
5. **hr role:** panel shows pending time-off only. No stale jobs.
6. **compliance role:** panel shows compliance alerts only.
7. **management/admin role:** panel shows all three types.
8. Each notification item is a clickable Link that navigates to `notif.href` and closes the panel.
9. Loading skeleton visible while fetching.
10. Empty state renders "All clear" when no notifications.
11. Panel auto-refreshes every 3 minutes in the background (badge count updates without user action).
12. `tsc --noEmit` — zero errors.
13. Panel does not overflow viewport on short screens — `max-h-[calc(100vh-6rem)]` + `overflow-y-auto` is enforced.
