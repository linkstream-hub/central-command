# ANTIGRAVITY SPEC — Battle Test Mode + Full System Test Protocol
**Scope:** Every user-facing workflow in CC2.0 and Tech PWA
**Goal:** Prove the system works end-to-end with zero reliance on guesswork.
**Standard:** If it hasn't been tested step-by-step, it is not confirmed working.

---

## PART 1 — ENVIRONMENT SETUP

These are the prerequisites. No testing begins until all verification steps in
this section pass.

### 1A — Strip production API URLs from `.env.local`

**Current `tech-pwa/.env.local`:**
```
NEXT_PUBLIC_API_URL=https://script.google.com/...
NEXT_PUBLIC_DASHBOARD_API_URL=https://script.google.com/...
```

**Replace with:**
```
# Dev/demo mode — both APIs are mocked locally.
# To restore production connections, uncomment these lines.
# NEXT_PUBLIC_API_URL=https://script.google.com/...
# NEXT_PUBLIC_DASHBOARD_API_URL=https://script.google.com/...

DEV_BYPASS_AUTH=true
```

**Result:**
- `dashboard-api.ts` → `!API_URL` branch → in-memory mock data
- `syncQueue.ts` → falls back to `/api/mock/exec`
- No request ever reaches script.google.com

**Verify:** Open DevTools → Network tab → confirm zero requests to
`script.google.com` during any test action.

---

### 1B — Replace mock data in `tech-pwa/src/lib/dashboard-api.ts`

The existing mock data has structural gaps:
- Only 2 jobs (no coverage of New, PTE Required, Awaiting Approval, Complete)
- `getTechList` has wrong badge format (rank letters instead of numeric IDs)
  and wrong skill keys (`P: 5` instead of `Plumbing: 1`)
- `getWeekSchedule` returns wrong shape (returns `MOCK_SCHEDULE` array instead
  of `{ byTech, techs }` object the schedule page requires)
- `getCalendarData`, `getNotifications`, `getJobComments` return generic stubs

**Find the block starting with:**
```typescript
const MOCK_STATS: DashboardStats = {
```

**And ending at (just before the `// API CLIENT` comment):**
```typescript
      default:                     return { success: true, message: `Mock success for ${action}` };
    }
  }
```

**Replace the entire block — from `const MOCK_STATS` through the closing `}` of
the mock switch statement — with the following:**

```typescript
const MOCK_STATS: DashboardStats = {
  urgentCount: 2,
  needsActionCount: 5,
  ptePendingCount: 2,
  todayScheduledCount: 3,
  doneThisWeekCount: 4,
};

const TODAY = new Date().toISOString().split('T')[0];
const TOMORROW = new Date(Date.now() + 86400000).toISOString().split('T')[0];
const YESTERDAY = new Date(Date.now() - 86400000).toISOString().split('T')[0];

const MOCK_JOBS: Job[] = [
  // NEW — urgent, no tech, no date
  {
    jobId: 'APT-3001', rowIndex: 2, priority: '1-URGENT', serviceCategory: 'Plumbing',
    address: '65 Thornton Ave', unit: '304',
    description: 'Main line backup. Sewage coming up through kitchen sink. Tenant reporting flooding.',
    scheduledDate: '', scheduledTime: '', estimatedHours: 0, status: 'New',
    rmName: 'Jan Blythe', rmEmail: 'jan.blythe@lapham.com',
    accessInfo: 'Lockbox code: 1954 — box mounted left of door',
    tenantName: 'Maria Santos', tenantPhone: '510-555-0192', tenantEmail: 'maria.santos@email.com',
    assignedTech: '', notes: '', gmailMsgId: 'msg-3001',
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
    clockedInAt: null, activeRecordId: null,
  },
  // NEW — urgent, electrical
  {
    jobId: 'APT-3002', rowIndex: 3, priority: '1-URGENT', serviceCategory: 'Electrical',
    address: '1420 Alice St', unit: '',
    description: 'No power to master bedroom and hallway since yesterday. Breaker trips immediately on reset.',
    scheduledDate: '', scheduledTime: '', estimatedHours: 0, status: 'New',
    rmName: 'David Park', rmEmail: 'david.park@lapham.com',
    accessInfo: 'Key at property office — ask for Karen',
    tenantName: 'Darnell Washington', tenantPhone: '415-555-0847', tenantEmail: 'darnell.w@email.com',
    assignedTech: '', notes: '', gmailMsgId: 'msg-3002',
    timestamp: new Date(Date.now() - 5 * 3600000).toISOString(),
    clockedInAt: null, activeRecordId: null,
  },
  // READY TO SCHEDULE — standard plumbing, needs tech + date
  {
    jobId: 'APT-3003', rowIndex: 4, priority: '4-STANDARD', serviceCategory: 'Plumbing',
    address: '890 Market St', unit: '12',
    description: 'Kitchen faucet slow drip. Tenant has been reporting for 3 weeks. PTE confirmed.',
    scheduledDate: '', scheduledTime: '', estimatedHours: 0, status: 'Ready to Schedule',
    rmName: 'Jan Blythe', rmEmail: 'jan.blythe@lapham.com',
    accessInfo: 'Tenant will be home. Call 30 min ahead: 415-555-0302',
    tenantName: 'Sofia Hernandez', tenantPhone: '415-555-0302', tenantEmail: 'sofia.h@email.com',
    assignedTech: '', notes: '', gmailMsgId: 'msg-3003',
    timestamp: new Date(Date.now() - 72 * 3600000).toISOString(),
    clockedInAt: null, activeRecordId: null,
  },
  // READY TO SCHEDULE — turnover, janitorial
  {
    jobId: 'APT-3004', rowIndex: 5, priority: '2-TURNOVER', serviceCategory: 'Janitorial',
    address: '350 Hanover St', unit: '2B',
    description: 'Full unit turnover clean. Previous tenant moved out. New tenant in 5 days. Steam carpets.',
    scheduledDate: '', scheduledTime: '', estimatedHours: 0, status: 'Ready to Schedule',
    rmName: 'Sarah Mills', rmEmail: 'sarah.mills@lapham.com',
    accessInfo: 'Combo lockbox at front: 8821',
    tenantName: '', tenantPhone: '', tenantEmail: '',
    assignedTech: '', notes: '', gmailMsgId: 'msg-3004',
    timestamp: new Date(Date.now() - 24 * 3600000).toISOString(),
    clockedInAt: null, activeRecordId: null,
  },
  // PTE REQUIRED — carpentry
  {
    jobId: 'APT-3005', rowIndex: 6, priority: '4-STANDARD', serviceCategory: 'Carpentry',
    address: '120 Mission St', unit: '5A',
    description: 'Bedroom door frame damaged — door will not close fully. Needs assessment and repair.',
    scheduledDate: '', scheduledTime: '', estimatedHours: 0, status: 'PTE Required',
    rmName: 'Tom Nguyen', rmEmail: 'tom.nguyen@lapham.com',
    accessInfo: '',
    tenantName: 'Elena Reyes', tenantPhone: '510-555-0610', tenantEmail: 'elena.reyes@email.com',
    assignedTech: '', notes: 'Attempted to contact tenant 3x — no response', gmailMsgId: 'msg-3005',
    timestamp: new Date(Date.now() - 96 * 3600000).toISOString(),
    clockedInAt: null, activeRecordId: null,
  },
  // PTE REQUIRED — plumbing, has tenant email
  {
    jobId: 'APT-3006', rowIndex: 7, priority: '3-PTE-PENDING', serviceCategory: 'Plumbing',
    address: '55 Oak Grove Ave', unit: '3',
    description: 'Water heater pilot light out. No hot water for 2 days.',
    scheduledDate: '', scheduledTime: '', estimatedHours: 0, status: 'PTE Required',
    rmName: 'Jan Blythe', rmEmail: 'jan.blythe@lapham.com',
    accessInfo: '',
    tenantName: 'Chris Tanaka', tenantPhone: '415-555-0773', tenantEmail: 'c.tanaka@email.com',
    assignedTech: '', notes: '', gmailMsgId: 'msg-3006',
    timestamp: new Date(Date.now() - 48 * 3600000).toISOString(),
    clockedInAt: null, activeRecordId: null,
  },
  // AWAITING APPROVAL
  {
    jobId: 'APT-3007', rowIndex: 8, priority: '4-STANDARD', serviceCategory: 'Structural',
    address: '780 Foothill Blvd', unit: '',
    description: 'Crack in exterior stucco near window sill — approx 18 inches. Moisture visible inside.',
    scheduledDate: '', scheduledTime: '', estimatedHours: 0, status: 'Awaiting Approval',
    rmName: 'Mark Chen', rmEmail: 'mark.chen@lapham.com',
    accessInfo: 'Exterior work — no tenant access required',
    tenantName: '', tenantPhone: '', tenantEmail: '',
    assignedTech: '', notes: 'Estimate submitted to RM on 4/28. Awaiting approval.', gmailMsgId: 'msg-3007',
    timestamp: new Date(Date.now() - 120 * 3600000).toISOString(),
    clockedInAt: null, activeRecordId: null,
  },
  // SCHEDULED — today, with tech
  {
    jobId: 'APT-3008', rowIndex: 9, priority: '4-STANDARD', serviceCategory: 'Plumbing',
    address: '240 Lakeshore Ave', unit: '7',
    description: 'Bathroom vanity drain clogged — slow drain for weeks, now fully backed up.',
    scheduledDate: TODAY, scheduledTime: '09:00', estimatedHours: 2, status: 'Scheduled',
    rmName: 'Jan Blythe', rmEmail: 'jan.blythe@lapham.com',
    accessInfo: 'Lockbox: 4491',
    tenantName: 'Paul Kim', tenantPhone: '510-555-0394', tenantEmail: 'paul.k@email.com',
    assignedTech: 'Salvador Cabrera #101', notes: '', gmailMsgId: 'msg-3008',
    timestamp: new Date(Date.now() - 48 * 3600000).toISOString(),
    clockedInAt: null, activeRecordId: null,
  },
  // SCHEDULED — tomorrow, with different tech
  {
    jobId: 'APT-3009', rowIndex: 10, priority: '2-TURNOVER', serviceCategory: 'Janitorial',
    address: '1100 Broadway', unit: '301',
    description: 'Move-out clean. 2BR/1BA. Light staging for showing. New tenant in 3 days.',
    scheduledDate: TOMORROW, scheduledTime: '08:00', estimatedHours: 4, status: 'Scheduled',
    rmName: 'David Park', rmEmail: 'david.park@lapham.com',
    accessInfo: 'Key at front desk, Suite 100',
    tenantName: '', tenantPhone: '', tenantEmail: '',
    assignedTech: 'Eduardo Pena #102', notes: '', gmailMsgId: '',
    timestamp: new Date(Date.now() - 24 * 3600000).toISOString(),
    clockedInAt: null, activeRecordId: null,
  },
  // IN PROGRESS — today (shows in Scheduled tab)
  {
    jobId: 'APT-3010', rowIndex: 11, priority: '1-URGENT', serviceCategory: 'Electrical',
    address: '660 Grand Ave', unit: '14B',
    description: 'GFCI outlets in bathroom and kitchen tripping. Tenant reported small burn smell.',
    scheduledDate: TODAY, scheduledTime: '07:00', estimatedHours: 2, status: 'In Progress',
    rmName: 'Sarah Mills', rmEmail: 'sarah.mills@lapham.com',
    accessInfo: 'Tenant home all day',
    tenantName: 'Marcus Brown', tenantPhone: '415-555-0551', tenantEmail: 'marcus.b@email.com',
    assignedTech: 'Boyette Johnson #103', notes: '', gmailMsgId: 'msg-3010',
    timestamp: new Date(Date.now() - 72 * 3600000).toISOString(),
    clockedInAt: new Date(Date.now() - 90 * 60000).toISOString(), activeRecordId: 'TR-3010',
  },
  // COMPLETE — yesterday
  {
    jobId: 'APT-3011', rowIndex: 12, priority: '4-STANDARD', serviceCategory: 'Carpentry',
    address: '310 Park Blvd', unit: '',
    description: 'Replace broken gate latch at rear of property. Tenant reported safety concern.',
    scheduledDate: YESTERDAY, scheduledTime: '10:00', estimatedHours: 1, status: 'Complete',
    rmName: 'Tom Nguyen', rmEmail: 'tom.nguyen@lapham.com',
    accessInfo: 'Exterior, no access needed',
    tenantName: '', tenantPhone: '', tenantEmail: '',
    assignedTech: 'Salvador Cabrera #101', notes: 'Latch replaced, gate tested, photos uploaded.', gmailMsgId: '',
    timestamp: new Date(Date.now() - 96 * 3600000).toISOString(),
    clockedInAt: null, activeRecordId: null,
  },
  // COMPLETE — this week
  {
    jobId: 'APT-3012', rowIndex: 13, priority: '4-STANDARD', serviceCategory: 'Plumbing',
    address: '450 Grand Ave', unit: '5',
    description: 'Running toilet — flapper valve replacement.',
    scheduledDate: YESTERDAY, scheduledTime: '14:00', estimatedHours: 1, status: 'Complete',
    rmName: 'Jan Blythe', rmEmail: 'jan.blythe@lapham.com',
    accessInfo: 'Lockbox: 2277',
    tenantName: 'Amy Chen', tenantPhone: '510-555-0189', tenantEmail: 'amy.c@email.com',
    assignedTech: 'Eduardo Pena #102', notes: 'Flapper replaced. No further issues.', gmailMsgId: '',
    timestamp: new Date(Date.now() - 72 * 3600000).toISOString(),
    clockedInAt: null, activeRecordId: null,
  },
];

const MOCK_TECH_STATUS: TechStatus[] = [
  { techId: '101', techName: 'Salvador Cabrera', status: 'active',   minutesWorked: 145, jobAddress: '240 Lakeshore Ave', clockInTime: new Date(Date.now() - 145 * 60000).toISOString() },
  { techId: '102', techName: 'Eduardo Pena',     status: 'on-break', minutesWorked: 220, jobAddress: '1100 Broadway',    clockInTime: new Date(Date.now() - 220 * 60000).toISOString() },
  { techId: '103', techName: 'Boyette Johnson',  status: 'active',   minutesWorked: 90,  jobAddress: '660 Grand Ave',   clockInTime: new Date(Date.now() - 90 * 60000).toISOString()  },
  { techId: '104', techName: 'Federico Santos',  status: 'unassigned' },
];

const MOCK_TECH_ROSTER = [
  {
    name: 'Salvador Cabrera', badge: '101', rank: 'C', phone: '510-555-1001', role: 'tech', active: true,
    skills: { Carpentry: 1, Plumbing: 1, Electrical: 2, 'Finish Carpentry': 2, Structural: 3, Landscaping: 3, Janitorial: 3 },
  },
  {
    name: 'Eduardo Pena', badge: '102', rank: 'L1', phone: '415-555-1002', role: 'tech', active: true,
    skills: { Carpentry: 2, Plumbing: 2, Electrical: 3, 'Finish Carpentry': 3, Structural: 3, Landscaping: 2, Janitorial: 1 },
  },
  {
    name: 'Boyette Johnson', badge: '103', rank: 'L', phone: '415-555-1003', role: 'tech', active: true,
    skills: { Carpentry: 3, Plumbing: 3, Electrical: 1, 'Finish Carpentry': 3, Structural: 2, Landscaping: 3, Janitorial: 3 },
  },
  {
    name: 'Federico Santos', badge: '104', rank: 'T', phone: '510-555-1004', role: 'tech', active: true,
    skills: { Carpentry: 3, Plumbing: 3, Electrical: 3, 'Finish Carpentry': 3, Structural: 3, Landscaping: 3, Janitorial: 2 },
  },
];

// byTech shape required by schedule page: { "Name": { "YYYY-MM-DD": [job, ...] } }
const buildMockWeekSchedule = () => {
  const byTech: Record<string, Record<string, Job[]>> = {};
  MOCK_TECH_ROSTER.forEach(t => { byTech[t.name] = {}; });
  MOCK_JOBS.filter(j => j.scheduledDate && j.assignedTech).forEach(j => {
    const name = j.assignedTech.split(' #')[0];
    if (byTech[name]) {
      if (!byTech[name][j.scheduledDate]) byTech[name][j.scheduledDate] = [];
      byTech[name][j.scheduledDate].push(j);
    }
  });
  return byTech;
};

const MOCK_COMPLIANCE = {
  atRiskCount: 2,
  mealPremiumsOwed: 150,
  totalHoursThisWeek: 420,
  technicians: [
    { techName: 'Salvador Cabrera', status: 'compliant',  hoursWorked: 40, mealPremiums: 0 },
    { techName: 'Eduardo Pena',     status: 'at-risk',    hoursWorked: 38, mealPremiums: 50 },
    { techName: 'Boyette Johnson',  status: 'violation',  hoursWorked: 42, mealPremiums: 100 },
    { techName: 'Federico Santos',  status: 'compliant',  hoursWorked: 32, mealPremiums: 0 },
  ]
};

const MOCK_NOTIFICATIONS = [
  { id: 'N001', type: 'stale_job',      jobId: 'APT-3005', message: 'APT-3005 at 120 Mission St has been in PTE Required for 4 days.', createdAt: new Date(Date.now() - 3600000).toISOString(), read: false },
  { id: 'N002', type: 'compliance',     jobId: null,        message: 'Eduardo Pena is approaching overtime — 38h worked this week.', createdAt: new Date(Date.now() - 7200000).toISOString(), read: false },
  { id: 'N003', type: 'stale_job',      jobId: 'APT-3007', message: 'APT-3007 at 780 Foothill Blvd has been Awaiting Approval for 5 days.', createdAt: new Date(Date.now() - 86400000).toISOString(), read: true },
];

const MOCK_COMMENTS = [
  { id: 'C001', author: 'Robert', text: 'Jan confirmed tenant is available all day Thursday.', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 'C002', author: 'Robert', text: 'Lockbox code verified — works with the 1954 code.', createdAt: new Date(Date.now() - 3600000).toISOString() },
];

const MOCK_CALENDAR_DISPATCH = {
  [TODAY]: [
    { tech: 'Salvador Cabrera', jobCount: 1, estHours: 2, hasUrgent: false },
    { tech: 'Boyette Johnson',  jobCount: 1, estHours: 2, hasUrgent: true  },
  ],
  [TOMORROW]: [
    { tech: 'Eduardo Pena', jobCount: 1, estHours: 4, hasUrgent: false },
  ],
};

const MOCK_FEEDBACK: FeedbackItem[] = [
  {
    rowIndex: 2, timestamp: new Date(Date.now() - 86400000).toISOString(),
    category: 'Suggestion', subject: 'Add tech phone numbers to job cards',
    details: 'I need to call the tech directly sometimes. Would be faster to have a tap-to-call icon on the card next to the tech name.',
    status: 'In Progress', adminNotes: 'Adding to sprint scope.', submittedBy: 'Dispatch',
  },
  {
    rowIndex: 3, timestamp: new Date(Date.now() - 172800000).toISOString(),
    category: 'Bug Report', subject: 'Schedule grid not showing Monday jobs',
    details: 'When I look at the schedule for this week, Monday column is empty even though I scheduled 2 jobs.',
    status: 'Done', adminNotes: 'Fixed — was a timezone offset issue in getScheduleWeekDates.', submittedBy: 'Dispatch',
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function dashboardRequest(action: string, payload: Record<string, any> = {}) {
  if (!API_URL) {
    console.warn(`DashboardAPI: no API URL — returning mock for: ${action}`);
    await new Promise(r => setTimeout(r, 300));
    switch (action) {
      case 'getStats':            return { success: true, stats: MOCK_STATS };
      case 'getDispatchData':     return { success: true, jobs: MOCK_JOBS };
      case 'getLiveFieldStatus':  return { success: true, techs: MOCK_TECH_STATUS };
      case 'getTechList':         return { success: true, techs: MOCK_TECH_ROSTER };
      case 'getTradeDurations':   return { success: true, durations: { Plumbing: 2, Electrical: 1.5, Carpentry: 3, 'Finish Carpentry': 4, Janitorial: 4, Landscaping: 3, Structural: 5, General: 2, Inspection: 1.5, Painting: 3 } };
      case 'getTodaySchedule':    return { success: true, date: TODAY, byTech: buildMockWeekSchedule(), unassigned: [] };
      case 'getWeekSchedule':     return { success: true, week: { start: TODAY, end: TOMORROW }, byTech: buildMockWeekSchedule(), techs: MOCK_TECH_ROSTER, unassigned: MOCK_JOBS.filter(j => !j.assignedTech && j.status === 'Ready to Schedule') };
      case 'getComplianceStatus': return { success: true, data: MOCK_COMPLIANCE };
      case 'getComplianceAlerts': return { success: true, alerts: [] };
      case 'getCalendarData':     return { success: true, month: payload.month, view: payload.view || 'both', dispatchDays: MOCK_CALENDAR_DISPATCH, teamDays: {} };
      case 'getNotifications':    return { success: true, notifications: MOCK_NOTIFICATIONS };
      case 'getJobComments':      return { success: true, comments: MOCK_COMMENTS };
      case 'suggestTechs':        return { success: true, suggestions: [
        { name: 'Salvador Cabrera', score: 95, reasons: ['Plumbing specialist', 'Available today'], estimatedHrs: 2, availableToday: true },
        { name: 'Eduardo Pena',     score: 78, reasons: ['General experience'],                     estimatedHrs: 2.5, availableToday: true },
        { name: 'Boyette Johnson',  score: 45, reasons: ['Limited plumbing experience'],            estimatedHrs: 3, availableToday: false },
      ]};
      case 'getGmailThread':      return { success: true, thread: { messages: [
        { from: 'Jan Blythe <jan.blythe@lapham.com>', text: 'Hi, we have a plumbing issue at 65 Thornton Ave, unit 304. The tenant reports sewage backing up through the kitchen sink. This is urgent — can you send someone today?', timestamp: new Date(Date.now() - 2 * 3600000).toISOString() },
        { from: 'workorder@aptmaintenanceinc.com', text: 'Hi Jan, received. Checking availability now and will confirm shortly.', timestamp: new Date(Date.now() - 1.5 * 3600000).toISOString() },
      ]}};
      case 'getDraftReply':       return { success: true, subject: `Re: Maintenance Request — ${payload.jobData?.address || 'Property'}`, replyBody: `Hi ${payload.jobData?.rmName || 'there'},\n\nWe have a technician available and will have someone at the property today. We'll confirm the exact arrival time shortly.\n\nAPT Maintenance Inc.` };
      case 'getTimeOffRequests':  return { success: true, requests: [] };
      case 'getTimecardApprovalQueue': return { success: true, records: [], pendingCount: 0 };
      case 'getTechAvailability': return { success: true, outDates: {} };
      case 'getAvailableSlots':   return { success: true, slots: [] };
      case 'getLiveFieldStatus':  return { success: true, techs: MOCK_TECH_STATUS };
      case 'updateJob':
      case 'replyToThread':
      case 'generateDoc':
      case 'submitFeedback':
      case 'addJobComment':
      case 'updateFeedbackStatus': return { success: true };
      case 'getFeedback':          return { success: true, items: MOCK_FEEDBACK };
      default:                     return { success: true, message: `Mock success for ${action}` };
    }
  }
```

**Important:** The text above replaces the entire mock data + switch block. The `try { const response = await fetch(API_URL...` production path that follows must remain completely untouched.

---

### 1C — Create `tech-pwa/src/app/api/mock/exec/route.ts`

Create this new file:

```typescript
import { NextRequest, NextResponse } from 'next/server';

if (process.env.NODE_ENV === 'production') {
  throw new Error('Mock exec route must never run in production');
}

const TODAY = new Date().toISOString().split('T')[0];

const MOCK_TECH_SESSION = {
  name: 'Demo Tech (Mock)',
  badge: '9999',
  employeeId: '9999',
  role: 'tech' as const,
  token: 'dev-mock-token-9999',
  expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
};

const MOCK_PWA_JOBS = [
  {
    jobId: 'APT-3008',
    priority: '4-STANDARD',
    serviceCategory: 'Plumbing',
    address: '240 Lakeshore Ave',
    unit: '7',
    description: 'Bathroom vanity drain clogged — slow drain for weeks, now fully backed up.',
    scheduledDate: TODAY,
    scheduledTime: '09:00',
    estimatedHours: 2,
    status: 'Scheduled',
    rmName: 'Jan Blythe',
    accessInfo: 'Lockbox: 4491',
    tenantName: 'Paul Kim',
    tenantPhone: '510-555-0394',
    clockedInAt: null,
    activeRecordId: null,
  },
  {
    jobId: 'APT-3010',
    priority: '1-URGENT',
    serviceCategory: 'Electrical',
    address: '660 Grand Ave',
    unit: '14B',
    description: 'GFCI outlets in bathroom and kitchen tripping. Tenant reported small burn smell.',
    scheduledDate: TODAY,
    scheduledTime: '13:00',
    estimatedHours: 2,
    status: 'Scheduled',
    rmName: 'Sarah Mills',
    accessInfo: 'Tenant home all day',
    tenantName: 'Marcus Brown',
    tenantPhone: '415-555-0551',
    clockedInAt: null,
    activeRecordId: null,
  },
];

let mockClockState: 'idle' | 'active' | 'on-break' = 'idle';
let mockActiveRecordId: string | null = null;
let mockClockInTime: string | null = null;

function handleGet(action: string, params: URLSearchParams) {
  switch (action) {
    case 'getTechJobs':
      return { success: true, techName: MOCK_TECH_SESSION.name, date: params.get('date') || TODAY, jobs: MOCK_PWA_JOBS };
    case 'getTechStatus':
      return { success: true, status: mockClockState, activeRecord: mockClockState !== 'idle' ? { recordId: mockActiveRecordId, clockInTime: mockClockInTime } : null };
    case 'getTimeOffHistory':
      return { success: true, requests: [] };
    case 'getTimeOffBalance':
      return { success: true, sick: { accrued: 24, used: 8, available: 16 }, vacation: { accrued: 40, used: 0, available: 40 } };
    default:
      return { success: true, message: `Mock GET: ${action}` };
  }
}

function handlePost(action: string, body: Record<string, unknown>) {
  switch (action) {
    case 'login':
      return { success: true, ...MOCK_TECH_SESSION };
    case 'clockIn':
      mockClockState = 'active';
      mockActiveRecordId = 'MOCK-REC-' + Date.now();
      mockClockInTime = new Date().toISOString();
      return { success: true, recordId: mockActiveRecordId, clockInTime: mockClockInTime };
    case 'clockOut':
      mockClockState = 'idle';
      mockActiveRecordId = null;
      mockClockInTime = null;
      return { success: true, attestationRequired: true };
    case 'startBreak':
      mockClockState = 'on-break';
      return { success: true };
    case 'endBreak':
      mockClockState = 'active';
      return { success: true };
    case 'markComplete':
      return { success: true };
    case 'uploadReceipt':
      return { success: true, fileUrl: 'https://placehold.co/400x300?text=Mock+Receipt', message: 'Receipt uploaded (mock)' };
    case 'flagIssue':
      return { success: true, message: 'Issue flagged (mock)' };
    case 'requestTimeOff':
      return { success: true, requestId: 'MOCK-TOR-' + Date.now() };
    case 'cancelTimeOff':
      return { success: true };
    case 'signAttestation':
      return { success: true };
    default:
      return { success: true, message: `Mock POST: ${action}` };
  }
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const action = params.get('action') || '';
  return NextResponse.json(handleGet(action, params));
}

export async function POST(req: NextRequest) {
  try {
    const text = await req.text();
    const body = JSON.parse(text) as Record<string, unknown>;
    const action = String(body.action || '');
    return NextResponse.json(handlePost(action, body));
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid body' }, { status: 400 });
  }
}
```

---

### 1D — Add dev Credentials provider to `tech-pwa/src/auth.ts`

**Add import** (alongside existing imports):
```typescript
import Credentials from 'next-auth/providers/credentials';
```

**Replace the `providers` array:**
```typescript
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    ...(process.env.NODE_ENV !== 'production' && process.env.DEV_BYPASS_AUTH === 'true'
      ? [Credentials({
          id: 'dev-bypass',
          name: 'Dev Bypass',
          credentials: {},
          async authorize() {
            return { id: 'dev-admin', email: 'dev@aptmaintenanceinc.com', name: 'Dev Admin' };
          },
        })]
      : []),
  ],
```

**Replace the `jwt` callback:**
```typescript
    async jwt({ token, account, profile }) {
      if (account?.provider === 'dev-bypass') {
        token.permissions = {
          admin: true, dispatch: true, people: true, finance: true, intel: true,
          name: 'Dev Admin', email: 'dev@aptmaintenanceinc.com',
        } as StaffPermissions;
        token.staffName = 'Dev Admin';
        return token;
      }
      if (account && profile?.email) {
        const perms = await fetchStaffPermissions(profile.email);
        token.permissions = perms;
        token.staffName = perms?.name ?? (profile as { name?: string }).name ?? profile.email;
      }
      return token;
    },
```

---

### 1E — Add Dev Login button to `tech-pwa/src/app/login/page.tsx`

Find the Google sign-in button JSX block (inside the `(mode === 'dispatch' || mode === 'both')` conditional). Immediately after its closing `)}`, add:

```tsx
{process.env.NODE_ENV === 'development' && (mode === 'dispatch' || mode === 'both') && (
  <button
    onClick={() => signIn('dev-bypass', { callbackUrl: '/' })}
    className="w-full mt-3 py-3 rounded-xl border border-dashed border-white/20 text-xs font-black text-[var(--text-muted)] uppercase tracking-widest hover:border-white/40 hover:text-white transition-all"
  >
    Dev Login — Mock Data Only
  </button>
)}
```

---

### 1F — Environment verification checklist (complete before any testing)

Run `cd tech-pwa && npm run dev`. Then confirm:

- [ ] `http://localhost:3000/login` shows the "Dev Login — Mock Data Only" button
- [ ] Clicking Dev Login lands on `/` (dispatch dashboard) without Google OAuth
- [ ] Dashboard shows stat cards (2 urgent, 5 needs-action, etc.)
- [ ] Job queue shows jobs with varying status chips
- [ ] DevTools Network tab shows zero requests to `script.google.com`
- [ ] No `console.error` in the browser console at load

If any item fails, stop and fix before proceeding to test passes.

---

## PART 2 — BATTLE TEST PROTOCOL

**Instructions for AG:** Execute every test case below. For each row:
- Perform the exact action described
- Confirm the expected result
- If actual ≠ expected, record the failure with exact console output and screenshot description
- **Do not fix bugs during testing** — record and continue
- Mark each test PASS, FAIL, or PARTIAL

Use Claude_in_Chrome tools. Start a new browser session at `http://localhost:3000`.
Log in via Dev Login before starting.

---

### TEST BLOCK 1 — Dashboard & Job Queue

#### 1.1 Stat Cards
| # | Action | Expected | Severity |
|---|---|---|---|
| 1.1.1 | Load `/` | 4 stat cards render: Urgent (2), Needs Action (5), Scheduled Today (3), Done This Week (4) | CRITICAL |
| 1.1.2 | Click "Urgent" stat card | Job queue filters to show only 1-URGENT jobs (APT-3001, APT-3002, APT-3010) | HIGH |
| 1.1.3 | Click "Needs Action" stat card | Job queue filters to New + Ready to Schedule jobs | HIGH |
| 1.1.4 | Click "Scheduled Today" stat card | Job queue shows APT-3008 and APT-3010 | HIGH |
| 1.1.5 | Click "Done This Week" stat card | Job queue shows APT-3011 and APT-3012 | MEDIUM |
| 1.1.6 | Click an active stat filter to deactivate it | Filter clears, all jobs visible | HIGH |

#### 1.2 Status Tabs
| # | Action | Expected | Severity |
|---|---|---|---|
| 1.2.1 | Click "NEW" tab | Shows APT-3001 and APT-3002 only | CRITICAL |
| 1.2.2 | Click "READY TO SCHEDULE" tab | Shows APT-3003 and APT-3004 only | CRITICAL |
| 1.2.3 | Click "PTE REQUIRED" tab | Shows APT-3005 and APT-3006 only | CRITICAL |
| 1.2.4 | Click "AWAITING APPROVAL" tab | Shows APT-3007 only | HIGH |
| 1.2.5 | Click "SCHEDULED" tab | Shows APT-3008, APT-3009 (Scheduled) + APT-3010 (In Progress) | CRITICAL |
| 1.2.6 | Click "COMPLETE" tab | Shows APT-3011 and APT-3012 | HIGH |
| 1.2.7 | Click "ALL" tab | Shows all 12 jobs | HIGH |

#### 1.3 Job Card Content
| # | Action | Expected | Severity |
|---|---|---|---|
| 1.3.1 | Look at APT-3001 card (NEW tab) | Shows: address "65 Thornton Ave", unit "304", priority chip "URGENT" in red, service category "Plumbing", NO tech chip, no scheduled date | CRITICAL |
| 1.3.2 | Look at APT-3008 card (SCHEDULED tab) | Shows: address "240 Lakeshore Ave", tech chip "Salvador Cabrera", scheduled date today, status chip "Scheduled" | CRITICAL |
| 1.3.3 | Look at APT-3010 card (SCHEDULED tab) | Shows: In Progress status with pulsing animation, tech "Boyette Johnson", clocked-in indicator | HIGH |
| 1.3.4 | Look at APT-3011 card (COMPLETE tab) | Shows: dark green background, "Complete" chip | HIGH |
| 1.3.5 | Inspect age dot on APT-3005 (96h old) | Age dot should be red/urgent color | MEDIUM |
| 1.3.6 | Inspect age dot on APT-3003 (72h old) | Age dot should be orange/warning color | MEDIUM |

#### 1.4 Search
| # | Action | Expected | Severity |
|---|---|---|---|
| 1.4.1 | Type "Thornton" in search | APT-3001 appears regardless of active tab | HIGH |
| 1.4.2 | Type "jan blythe" in search | All jobs for Jan Blythe visible | HIGH |
| 1.4.3 | Type "plumbing" in search | All plumbing jobs visible | HIGH |
| 1.4.4 | Clear search | Returns to tab-filtered view | HIGH |
| 1.4.5 | Type a string that matches nothing | Empty state renders (not blank, not error) | MEDIUM |

---

### TEST BLOCK 2 — Job Detail Modal

Open APT-3003 (Ready to Schedule, Plumbing, Jan Blythe) for all tests in this block.

#### 2.1 Modal Opens Correctly
| # | Action | Expected | Severity |
|---|---|---|---|
| 2.1.1 | Click APT-3003 card | Modal opens with animation | CRITICAL |
| 2.1.2 | Check modal header | Shows "890 Market St" address, unit "12", priority chip, service category chip | CRITICAL |
| 2.1.3 | Check all visible fields | Address, unit, description, RM name/email, tenant name/phone, access info, notes all populated correctly | CRITICAL |
| 2.1.4 | Check status | Shows "Ready to Schedule" | HIGH |

#### 2.2 Gmail Thread Tab
| # | Action | Expected | Severity |
|---|---|---|---|
| 2.2.1 | Click "Email Thread" or Gmail tab | Thread renders with Jan Blythe's message and the Dispatch reply | CRITICAL |
| 2.2.2 | Look at message timestamps | Relative times render (e.g. "2 hours ago") — not raw ISO strings | HIGH |
| 2.2.3 | Click "Get Draft Reply" | Loads a pre-written reply body addressing the property/RM | HIGH |
| 2.2.4 | Edit the draft reply text | Text is editable | MEDIUM |
| 2.2.5 | Click "Send Reply" | Success toast appears, no error | CRITICAL |

#### 2.3 Suggest Techs Tab
| # | Action | Expected | Severity |
|---|---|---|---|
| 2.3.1 | Click "Suggest Techs" tab | Renders ranked list: Salvador (95), Eduardo (78), Boyette (45) | CRITICAL |
| 2.3.2 | Check score badges | Scores and reason chips visible on each row | HIGH |
| 2.3.3 | Check availability indicators | "Available today" shown for Salvador and Eduardo | HIGH |

#### 2.4 Job Comments Tab
| # | Action | Expected | Severity |
|---|---|---|---|
| 2.4.1 | Click "Comments" or Notes tab | Shows 2 existing mock comments | HIGH |
| 2.4.2 | Type a new comment and submit | Comment appends to list, no error | HIGH |

#### 2.5 Field Edits (for a different job — open APT-3007, Awaiting Approval)
| # | Action | Expected | Severity |
|---|---|---|---|
| 2.5.1 | Edit the Notes field | Field becomes editable | HIGH |
| 2.5.2 | Change status to "Ready to Schedule" | Status chip updates | HIGH |
| 2.5.3 | Click Save | Success toast, modal reflects updated status | CRITICAL |
| 2.5.4 | Close and reopen APT-3007 | Updated status persists (or returns after refresh in mock) | MEDIUM |

#### 2.6 PTE Email (open APT-3005 or APT-3006, PTE Required)
| # | Action | Expected | Severity |
|---|---|---|---|
| 2.6.1 | Look for PTE/Email Tenant button | Button visible | CRITICAL |
| 2.6.2 | Click PTE email button | Toast confirms email sent (mock), no error | CRITICAL |

#### 2.7 Archive
| # | Action | Expected | Severity |
|---|---|---|---|
| 2.7.1 | Open any job, find Archive option | Archive button/action exists | HIGH |
| 2.7.2 | Trigger archive | Confirmation prompt (toast or modal), not immediate | HIGH |
| 2.7.3 | Confirm archive | Job no longer appears in active tabs, success toast | HIGH |

---

### TEST BLOCK 3 — THE CRITICAL PATH: Scheduling a Work Order

**This is the workflow that failed in production. Test it exhaustively.**

Open APT-3003 (Ready to Schedule — Plumbing, 890 Market St, no tech assigned).

#### 3.1 SchedulingDispatch Component (from Job Detail Modal)
| # | Action | Expected | Severity |
|---|---|---|---|
| 3.1.1 | Open APT-3003, find scheduling section | Tech picker + date picker + time + hours visible | CRITICAL |
| 3.1.2 | Check tech list | Shows all 4 active techs | CRITICAL |
| 3.1.3 | Check tech skill ranking | Salvador at top (Plumbing specialist), Federico at bottom (Trainee) | HIGH |
| 3.1.4 | Click Salvador Cabrera | Tech selected — chip appears in confirmation area | CRITICAL |
| 3.1.5 | Verify trainee guard | Federico Santos shows trainee warning — selecting him alone should warn or block | HIGH |
| 3.1.6 | Confirm Step 2 unlocks | Date picker becomes available after tech selected | CRITICAL |
| 3.1.7 | Select a date (tomorrow) | Date selected, highlighted | CRITICAL |
| 3.1.8 | Confirm Step 3 unlocks | Time picker + est. hours become available after date selected | CRITICAL |
| 3.1.9 | Select "9:00 AM" time slot | Time selected | CRITICAL |
| 3.1.10 | Adjust estimated hours to 2 | Slider/input changes to 2 | HIGH |
| 3.1.11 | Confirm summary | Summary shows: Salvador, tomorrow's date, 9:00 AM, 2h | CRITICAL |
| 3.1.12 | Click Confirm/Save | Success toast; job status changes to "Scheduled" | CRITICAL |
| 3.1.13 | Close modal | APT-3003 card now shows: tech chip "Salvador Cabrera", scheduled date | CRITICAL |
| 3.1.14 | Click SCHEDULED tab | APT-3003 now appears in the Scheduled tab | CRITICAL |

#### 3.2 DnD Schedule Grid (`/schedule`)
| # | Action | Expected | Severity |
|---|---|---|---|
| 3.2.1 | Navigate to `/schedule` | Grid renders with 4 tech lanes and 5 date columns | CRITICAL |
| 3.2.2 | APT-3008 appears | Shows in Salvador's lane on today's column | CRITICAL |
| 3.2.3 | APT-3009 appears | Shows in Eduardo's lane on tomorrow's column | CRITICAL |
| 3.2.4 | Unscheduled pool | APT-3003, APT-3004 appear in "Ready to Schedule" job pool | HIGH |
| 3.2.5 | Drag APT-3004 to Eduardo's lane on tomorrow | Duration modal appears | CRITICAL |
| 3.2.6 | Duration modal | Shows hours selector and time slot picker, confirms tech + date | CRITICAL |
| 3.2.7 | Confirm in duration modal | APT-3004 card appears in Eduardo's cell for tomorrow | CRITICAL |
| 3.2.8 | APT-3004 removed from unscheduled pool | Job no longer in the unscheduled pool | CRITICAL |
| 3.2.9 | Navigate to next week | Grid shifts to next week's Mon–Fri | HIGH |
| 3.2.10 | Navigate back to current week | Returns to current week correctly | HIGH |
| 3.2.11 | Drop a job on a header or invalid zone | Nothing happens — no error thrown | HIGH |
| 3.2.12 | Click a tech lane header | Tech profile modal or popover opens | MEDIUM |

#### 3.3 Schedule View Consistency
| # | Action | Expected | Severity |
|---|---|---|---|
| 3.3.1 | After scheduling via job modal (3.1), go to `/schedule` | The newly scheduled job appears in the correct tech/date cell | CRITICAL |
| 3.3.2 | After scheduling via DnD (3.2), go to job queue | The job shows "Scheduled" with the tech chip | CRITICAL |

---

### TEST BLOCK 4 — Live Field Status (`/live`)

| # | Action | Expected | Severity |
|---|---|---|---|
| 4.1 | Navigate to `/live` | 4 tech cards render | CRITICAL |
| 4.2 | Salvador card | Status "active", minutes worked ~145, job address "240 Lakeshore Ave" | HIGH |
| 4.3 | Eduardo card | Status "on-break" with break indicator animation | HIGH |
| 4.4 | Federico card | Status "unassigned" — no job, no time | HIGH |
| 4.5 | Clock display | Elapsed time shown for active/on-break techs (not static) | MEDIUM |

---

### TEST BLOCK 5 — Calendar (`/calendar`)

| # | Action | Expected | Severity |
|---|---|---|---|
| 5.1 | Navigate to `/calendar` | Month grid renders for current month | CRITICAL |
| 5.2 | Today's date | Shows job dots for Salvador (1 job) and Boyette (1 job) | CRITICAL |
| 5.3 | Tomorrow's date | Shows job dot for Eduardo (1 job) | HIGH |
| 5.4 | Click a date with jobs | Date detail panel or popover shows job summary | HIGH |
| 5.5 | Navigate to next month | Grid updates, no crash | HIGH |
| 5.6 | Navigate back to current month | Returns correctly | HIGH |

---

### TEST BLOCK 6 — Team Page (`/team`)

| # | Action | Expected | Severity |
|---|---|---|---|
| 6.1 | Navigate to `/team` | Tech cards for all 4 active techs render | CRITICAL |
| 6.2 | Check Salvador's card | Shows rank "C" (Captain), skill bars, scheduled jobs count | HIGH |
| 6.3 | Check Federico's card | Shows "T" (Trainee) rank, training caution indicator | HIGH |
| 6.4 | Filter/search by name | Correct tech surfaces | MEDIUM |
| 6.5 | Click a tech card | Tech profile or detail expands | MEDIUM |

---

### TEST BLOCK 7 — Weekly Schedule View (`/weekly-schedule`)

| # | Action | Expected | Severity |
|---|---|---|---|
| 7.1 | Navigate to `/weekly-schedule` | Week grid renders | CRITICAL |
| 7.2 | Scheduled jobs appear | APT-3008 (today, Salvador) and APT-3009 (tomorrow, Eduardo) visible | CRITICAL |
| 7.3 | Navigate to next week | Grid updates | HIGH |
| 7.4 | Search/filter | Filters jobs correctly | MEDIUM |

---

### TEST BLOCK 8 — HR Module (`/hr`)

| # | Action | Expected | Severity |
|---|---|---|---|
| 8.1 | Navigate to `/hr` | Page renders, tabs visible (Time Off, Timecards) | CRITICAL |
| 8.2 | Time Off tab | Renders empty state ("No pending requests") — not a crash | HIGH |
| 8.3 | Timecards tab | Renders empty state — not a crash | HIGH |
| 8.4 | Verify admin controls visible | Status/approve controls visible (Dev Admin has admin perms) | HIGH |

---

### TEST BLOCK 9 — Notifications Bell

| # | Action | Expected | Severity |
|---|---|---|---|
| 9.1 | Check bell icon | Unread badge shows "2" (two unread notifications) | HIGH |
| 9.2 | Click bell | Notification panel opens, lists 3 notifications (2 unread, 1 read) | HIGH |
| 9.3 | Notification content | Stale job and compliance notifications show with correct messages | HIGH |
| 9.4 | Click a job-linked notification | Navigates to that job or opens job detail | MEDIUM |

---

### TEST BLOCK 10 — Feedback (`/feedback`)

| # | Action | Expected | Severity |
|---|---|---|---|
| 10.1 | Navigate to `/feedback` | Form + submission history with 2 items render | CRITICAL |
| 10.2 | Admin controls visible | Status dropdowns and admin notes field visible (admin user) | CRITICAL |
| 10.3 | Submit a new feedback item | Success state shown, item appears in history on reload | HIGH |
| 10.4 | Update status to "Done" | Status chip updates optimistically | HIGH |

---

### TEST BLOCK 11 — Tech PWA Clock Flows

**Setup:** In browser console, run:
```javascript
localStorage.setItem('aptSession', JSON.stringify({
  token: 'dev-mock-token-9999',
  name: 'Demo Tech (Mock)',
  badge: '9999',
  employeeId: '9999',
  role: 'tech',
  expiresAt: new Date(Date.now() + 30 * 86400000).toISOString()
}));
```
Then navigate to `http://localhost:3000/jobs`.

| # | Action | Expected | Severity |
|---|---|---|---|
| 11.1 | `/jobs` loads | Two demo jobs render (APT-3008 Plumbing, APT-3010 Electrical) | CRITICAL |
| 11.2 | Jobs display correct fields | Address, category, scheduled time, priority chip, access info all visible | CRITICAL |
| 11.3 | URGENT job sorted first | APT-3010 (URGENT) appears above APT-3008 (STANDARD) | HIGH |
| 11.4 | Click APT-3008 | Job detail page loads at `/job/APT-3008` or equivalent | CRITICAL |
| 11.5 | Clock In button visible | "Clock In" button present | CRITICAL |
| 11.6 | Tap Clock In | Success feedback, state changes to "clocked in", elapsed timer starts | CRITICAL |
| 11.7 | Start Break | State changes to "on break" | HIGH |
| 11.8 | End Break | State returns to "clocked in" | HIGH |
| 11.9 | Mark Complete | Confirmation prompt; job disappears from active list | CRITICAL |
| 11.10 | Post-clockout attestation | After clock out, attestation form appears | HIGH |
| 11.11 | Sign attestation | Success; attestation recorded | HIGH |
| 11.12 | `/time-off` page | Balance card renders (Sick: 16h available, Vacation: 40h available) | HIGH |
| 11.13 | Submit time off request | Form submits, success state shown | HIGH |

---

### TEST BLOCK 12 — Mobile Viewport

Resize browser to **375px width** (iPhone SE) and **414px width** (iPhone 14).
Repeat for each page:

| # | Page | What to check | Severity |
|---|---|---|---|
| 12.1 | `/` dashboard | Job cards stack correctly, no horizontal overflow, text not truncated mid-word | HIGH |
| 12.2 | Job Detail Modal | Modal fills viewport, all fields visible, buttons reachable without scrolling | CRITICAL |
| 12.3 | Scheduling section in modal | Tech picker, date cards, time slots all visible and tappable (≥44px touch targets) | CRITICAL |
| 12.4 | `/schedule` | Grid is scrollable horizontally, tech names not clipped | HIGH |
| 12.5 | `/jobs` (Tech PWA) | Full-width cards, priority chips legible, clock-in button easy to tap | CRITICAL |
| 12.6 | `/login` | Both Google and Dev Login buttons visible, not clipped | HIGH |

---

### TEST BLOCK 13 — Error States & Offline Behavior

| # | Action | Expected | Severity |
|---|---|---|---|
| 13.1 | DevTools → Network → Offline → reload any page | Offline banner or graceful "unable to connect" message — no white screen | HIGH |
| 13.2 | Restore network | Page auto-recovers or refresh works | HIGH |
| 13.3 | Submit feedback form with empty fields | Submit button remains disabled or inline validation fires | HIGH |
| 13.4 | Open schedule grid, drop job on column header | No exception thrown, no console error | HIGH |
| 13.5 | Navigate directly to `/schedule` without prior login (private window) | Redirects to `/login` | CRITICAL |
| 13.6 | Navigate to `/hr` without login | Redirects to `/login` | CRITICAL |
| 13.7 | Open same job detail modal, click Save with no changes | No error, no duplicate API call, graceful no-op | MEDIUM |

---

### TEST BLOCK 14 — AG Attempts to Break It

AG should actively try these adversarial scenarios:

| # | Attack | Expected | Severity |
|---|---|---|---|
| 14.1 | Rapid-click between all status tabs (10x in 2 seconds) | No crashes, last clicked tab wins | HIGH |
| 14.2 | Open job detail modal, then immediately navigate to `/schedule` | No memory leaks, no lingering modal overlay | HIGH |
| 14.3 | Drag a job card, drop it, drag it again immediately | No stuck drag state | HIGH |
| 14.4 | Submit the reply form while the send is in-flight (double click) | Second submit blocked, no duplicate | HIGH |
| 14.5 | On Tech PWA: tap Clock In twice rapidly | Second tap blocked or returns success idempotently | CRITICAL |
| 14.6 | On Tech PWA: try accessing `/jobs` without setting localStorage session | Redirect to `/login` | CRITICAL |
| 14.7 | In job detail modal, open "Suggest Techs", then immediately switch to "Gmail Thread" | No spinner stuck, no stale data displayed | HIGH |
| 14.8 | Resize viewport from 375px to 1440px mid-session | Layout reflows without visual artifacts | MEDIUM |
| 14.9 | Open the schedule page on week with no jobs | Empty lanes render cleanly, no blank/crash | HIGH |
| 14.10 | Trigger 5 consecutive `updateJob` saves on the same job | Each returns success, no state corruption | HIGH |

---

## PART 3 — TEST REPORT FORMAT

After all blocks are complete, AG writes `specs/TEST_REPORT_YYYY-MM-DD.md`:

```markdown
# CC2.0 Battle Test Report — [DATE]
Environment: localhost:3000 / mock mode / Dev Admin session

## Summary
- Total tests: [N]
- PASS: [N]
- FAIL: [N]  ← list each below
- PARTIAL: [N]

## Failures

### [Test ID] — [Short description]
**Block:** [block name]
**Action:** [exact action taken]
**Expected:** [what should have happened]
**Actual:** [what happened]
**Console errors:** [exact message if any]
**Severity:** CRITICAL / HIGH / MEDIUM

[Repeat for each failure]

## Visual Defects
[List any layout/display issues with page + viewport + description]

## Recommended Fixes
[Brief description of each failure root cause — no implementation, report only]
```

Move this spec to `specs/archive/` when the report is filed.

---

## WHAT MUST NOT BE DONE

- Do not push to `main` during testing — this is a local-only test pass
- Do not modify `.env.local` after setup except to verify mock mode is active
- Do not self-direct fixes — all failures go in the report only
- Do not move or rename `.gs` files at repo root
- Vercel env vars are untouched — the `.env.local` changes are local only
