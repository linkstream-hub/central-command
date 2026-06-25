/**
 * Dashboard API Client
 * Handles communication with DashboardAPI.gs and provides mock data for local dev.
 */

import { Job } from './types';



import type { DashboardStats } from '@/lib/types';

export interface TechStatus {
  techId: string;
  techName: string;
  // Field status values (getLiveFieldStatus)
  status: 'active' | 'on-break' | 'complete' | 'unassigned' | 'scheduled';
  minutesWorked?: number;
  jobAddress?: string;
  clockInTime?: string;
  // Roster fields (getWeekSchedule.techs) — also used by schedule/team pages
  badge?: string;
  rank?: string;
  skills?: Record<string, number>;
  active?: boolean;
  // Legacy aliases kept for FieldStatus/ActivityFeed/team page compatibility
  elapsedMin?: number;
  currentAddress?: string;
  jobsRemaining?: number;
  violations?: string[];
  clockIn?: string;
  phone?: string;
  role?: string;
}

export interface ComplianceAlert {
  alertId: string;
  employeeName: string;
  employeeId: string;
  violationType: 'REST_BREAK_DUE' | 'MEAL_BREAK_DUE' | 'MEAL_PREMIUM' | 'SECOND_MEAL_DUE' | 'SECOND_MEAL_PREMIUM';
  shiftDate: string;
  totalHours: number;
  premiumAmount: number;
  status: 'Active' | 'Resolved' | 'Dismissed';
  createdAt: string;
}


export interface FeedbackItem {
  rowIndex: number;
  timestamp: string;
  category: 'Suggestion' | 'Bug Report' | 'Workflow Note' | 'Question';
  subject: string;
  details: string;
  relatedJobId?: string;
  status: 'Needs Review' | 'Reviewed' | 'In Progress' | 'Done';
  response?: string;
  managerName?: string;
  adminNotes?: string;
  submittedBy: string;
}

export interface CalendarDispatchEntry {
  tech: string;
  jobCount: number;
  estHours: number;
  hasUrgent: boolean;
}

export interface CalendarTeamEntry {
  name: string;
  leaveType: string;
}

export interface CalendarResponse {
  success: boolean;
  month: string;
  view: string;
  dispatchDays: Record<string, CalendarDispatchEntry[]>;
  teamDays: Record<string, CalendarTeamEntry[]>;
}

export interface Notification {
  id: string;
  type: 'STALE_JOB' | 'COMPLIANCE' | 'TIME_OFF_PENDING' | 'TIMECARD_PENDING';
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

export interface DispatchDataResponse {
  success: boolean;
  jobs: Job[];
  stats: DashboardStats;
}

export interface FieldStatusResponse {
  success: boolean;
  techs: TechStatus[];
}

export interface ComplianceAlertsResponse {
  success: boolean;
  alerts: ComplianceAlert[];
}

export interface JobComment {
  id: string;
  leadId: string;
  author: string;
  role: string;
  body: string;
  timestamp: string;
}

export interface TechSuggestion {
  name: string;
  score: number;
  reasons: string[];
  estimatedHrs: number;
  availableToday: boolean;
}

export interface TechSuggestionResponse {
  success: boolean;
  suggestions: TechSuggestion[];
}

export interface JobCommentsResponse {
  success: boolean;
  comments: JobComment[];
}

export interface WeekScheduleResponse {
  success: boolean;
  byTech?: Record<string, Record<string, Job[]>>;
  techs?: TechStatus[];
  unassigned?: Job[];
}

export interface UpdateJobResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface TechAvailabilityResponse {
  success: boolean;
  outDates: Record<string, string[]>;
}

export interface GenericResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// ─────────────────────────────────────────────
// FIELD MAPPERS — bridge backend shape → frontend types
// ─────────────────────────────────────────────

// Maps legacy backend statuses to the new JobStatus union
function normalizeLegacyStatus(raw: string): string {
  const MAP: Record<string, string> = {
    'Open':             'Needs Review',
    'PTE-Pending':      'PTE Required',
    'Tenant Contacted': 'PTE Required',
    'Approval Needed':  'Awaiting Approval',
    'New':              'Needs Review',
  };
  return MAP[raw] || raw || 'Needs Review';
}

interface RawJob {
  rowIndex?: number;
  id?: string;
  jobId?: string;
  priority?: Job['priority'];
  serviceCategory?: string;
  address?: string;
  unit?: string;
  description?: string;
  scheduledDate?: string;
  scheduledTime?: string;
  estHours?: string | number;
  estimatedHours?: string | number;
  status?: string;
  rmName?: string;
  rmEmail?: string;
  accessInfo?: string;
  tenantName?: string;
  tenantPhone?: string;
  tenantEmail?: string;
  assignedTech?: string;
  notes?: string;
  gmailMsgId?: string;
  emailType?: string;
  preferredTiming?: string;
  estimateNeeded?: string;
  pteGranted?: Job['pteGranted'];
  tenantPrefContact?: string;
  tenantHasPets?: string;
  timestamp?: string;
  clockedInAt?: string | null;
  activeRecordId?: string | null;
}

// Name normalizer to ensure "First Last" format
function normalizeName(name: string): string {
  if (!name) return '';
  // Convert "Last, First" -> "First Last"
  if (name.includes(',')) {
    const parts = name.split(',');
    if (parts.length === 2) {
      return `${parts[1].trim()} ${parts[0].trim()}`;
    }
  }
  return name.trim();
}

function mapJob(raw: RawJob): Job {
  return {
    rowIndex:         raw.rowIndex,
    jobId:            raw.id          || raw.jobId          || '',
    priority:         raw.priority    || '4-STANDARD',
    serviceCategory:  raw.serviceCategory || '',
    address:          raw.address     || '',
    unit:             raw.unit        || '',
    description:      raw.description || '',
    scheduledDate:    raw.scheduledDate || '',
    scheduledTime:    raw.scheduledTime || '',
    estimatedHours:   parseFloat(String(raw.estHours ?? raw.estimatedHours ?? '0')) || 0,
    status:           normalizeLegacyStatus(raw.status || 'Needs Review') as Job['status'],
    rmName:           raw.rmName      || '',
    rmEmail:          raw.rmEmail     || '',
    accessInfo:       raw.accessInfo  || '',
    tenantName:       raw.tenantName  || '',
    tenantPhone:      raw.tenantPhone || '',
    tenantEmail:      raw.tenantEmail || '',
    assignedTech:     normalizeName(raw.assignedTech || ''),
    notes:            raw.notes       || '',
    gmailMsgId:       raw.gmailMsgId  || '',
    emailType:        raw.emailType   || '',
    preferredTiming:  raw.preferredTiming || '',
    estimateNeeded:   raw.estimateNeeded  || '',
    pteGranted:       raw.pteGranted  || undefined,
    tenantPrefContact: raw.tenantPrefContact || '',
    tenantHasPets:    raw.tenantHasPets || '',
    timestamp:        raw.timestamp   || '',
    clockedInAt:      raw.clockedInAt   || null,
    activeRecordId:   raw.activeRecordId || null,
  };
}

interface RawTech {
  techId?: string;
  techName?: string;
  status?: TechStatus['status'];
  minutesWorked?: number;
  jobAddress?: string;
  clockInTime?: string;
  phone?: string;
  role?: string;
}

function mapTech(raw: RawTech): TechStatus {
  return {
    techId:        raw.techId        || '',
    techName:      normalizeName(raw.techName || ''),
    status:        raw.status        || 'unassigned',
    minutesWorked: raw.minutesWorked ?? undefined,
    jobAddress:    raw.jobAddress    || undefined,
    clockInTime:   raw.clockInTime   || undefined,
    phone:         raw.phone         || undefined,
    role:          raw.role          || undefined,
  };
}

function computeStats(jobs: Job[]): DashboardStats {
  // APT is in CA (Pacific Time). Use explicit Los Angeles timezone.
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = { timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit' };
  const formatter = new Intl.DateTimeFormat('en-CA', options); // en-CA gives YYYY-MM-DD
  const today = formatter.format(now);
  

  const active  = jobs.filter(j => j.status !== 'Archived' && j.status !== 'Complete');
  return {
    urgentCount:        active.filter(j => j.status === 'Needs Review').length, // Repurposed for "New Leads"
    needsActionCount:   active.filter(j => j.status === 'PTE Required' || j.status === 'Awaiting Approval').length, // Repurposed for "Blocked"
    ptePendingCount:    active.filter(j => j.status === 'Ready to Schedule').length, // Repurposed for "Ready to Dispatch"
    todayScheduledCount: active.filter(j => j.scheduledDate === today).length,
    doneThisWeekCount:  jobs.filter(j => j.status === 'Complete' && j.scheduledDate === today).length, // Repurposed for "Done Today"
  };
}

// ─────────────────────────────────────────────
// MOCK DATA STUBS
// ─────────────────────────────────────────────

const _TODAY = new Date().toISOString().split('T')[0];

const MOCK_STATS: DashboardStats = {
  urgentCount: 2,
  needsActionCount: 5,
  ptePendingCount: 2,
  todayScheduledCount: 3,
  doneThisWeekCount: 4,
};

const MOCK_TECH_STATUS: TechStatus[] = [
  { techId: '101', techName: 'Salvador Cabrera', status: 'active',     minutesWorked: 145, jobAddress: '240 Lakeshore Ave', clockInTime: new Date(Date.now() - 145 * 60000).toISOString() },
  { techId: '102', techName: 'Eduardo Pena',     status: 'on-break',  minutesWorked: 220, jobAddress: '1100 Broadway',    clockInTime: new Date(Date.now() - 220 * 60000).toISOString() },
  { techId: '103', techName: 'Boyette Johnson',  status: 'active',    minutesWorked: 90,  jobAddress: '660 Grand Ave',   clockInTime: new Date(Date.now() - 90  * 60000).toISOString() },
  { techId: '104', techName: 'Federico Santos',  status: 'unassigned' },
];

const MOCK_TECH_ROSTER = [
  { name: 'Salvador Cabrera', techName: 'Salvador Cabrera', badge: '101', techId: '101', rank: 'C',  phone: '510-555-1001', role: 'tech', active: true,
    skills: { Carpentry: 1, Plumbing: 1, Electrical: 2, 'Finish Carpentry': 2, Structural: 3, Landscaping: 3, Janitorial: 3 } },
  { name: 'Eduardo Pena',     techName: 'Eduardo Pena',     badge: '102', techId: '102', rank: 'L1', phone: '415-555-1002', role: 'tech', active: true,
    skills: { Carpentry: 2, Plumbing: 2, Electrical: 3, 'Finish Carpentry': 3, Structural: 3, Landscaping: 2, Janitorial: 1 } },
  { name: 'Boyette Johnson',  techName: 'Boyette Johnson',  badge: '103', techId: '103', rank: 'L',  phone: '415-555-1003', role: 'tech', active: true,
    skills: { Carpentry: 3, Plumbing: 3, Electrical: 1, 'Finish Carpentry': 3, Structural: 2, Landscaping: 3, Janitorial: 3 } },
  { name: 'Federico Santos',  techName: 'Federico Santos',  badge: '104', techId: '104', rank: 'T',  phone: '510-555-1004', role: 'tech', active: true,
    skills: { Carpentry: 3, Plumbing: 3, Electrical: 3, 'Finish Carpentry': 3, Structural: 3, Landscaping: 3, Janitorial: 2 } },
];

const MOCK_JOBS: Job[] = [
  { jobId: 'APT-3001', rowIndex: 2, priority: '1-URGENT', serviceCategory: 'Plumbing',
    address: '65 Thornton Ave', unit: '304', description: 'Main line backup. Sewage coming up through kitchen sink. Tenant reporting flooding.',
    scheduledDate: '', scheduledTime: '', estimatedHours: 0, status: 'Needs Review',
    rmName: 'Jan Blythe', rmEmail: 'jan.blythe@lapham.com', accessInfo: 'Lockbox code: 1954',
    tenantName: 'Maria Santos', tenantPhone: '510-555-0192', tenantEmail: 'maria.santos@email.com',
    assignedTech: '', notes: '', gmailMsgId: 'msg-3001',
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString(), clockedInAt: null, activeRecordId: null },
  { jobId: 'APT-3002', rowIndex: 3, priority: '1-URGENT', serviceCategory: 'Electrical',
    address: '1420 Alice St', unit: '', description: 'No power to master bedroom and hallway since yesterday. Breaker trips immediately on reset.',
    scheduledDate: '', scheduledTime: '', estimatedHours: 0, status: 'Needs Review',
    rmName: 'David Park', rmEmail: 'david.park@lapham.com', accessInfo: 'Key at property office',
    tenantName: 'Darnell Washington', tenantPhone: '415-555-0847', tenantEmail: 'darnell.w@email.com',
    assignedTech: '', notes: '', gmailMsgId: 'msg-3002',
    timestamp: new Date(Date.now() - 5 * 3600000).toISOString(), clockedInAt: null, activeRecordId: null },
  { jobId: 'APT-3003', rowIndex: 4, priority: '4-STANDARD', serviceCategory: 'Plumbing',
    address: '890 Market St', unit: '12', description: 'Kitchen faucet slow drip. Tenant has been reporting for 3 weeks. PTE confirmed.',
    scheduledDate: '', scheduledTime: '', estimatedHours: 0, status: 'Ready to Schedule',
    rmName: 'Jan Blythe', rmEmail: 'jan.blythe@lapham.com', accessInfo: 'Tenant will be home. Call 30 min ahead: 415-555-0302',
    tenantName: 'Sofia Hernandez', tenantPhone: '415-555-0302', tenantEmail: 'sofia.h@email.com',
    assignedTech: '', notes: '', gmailMsgId: 'msg-3003',
    timestamp: new Date(Date.now() - 72 * 3600000).toISOString(), clockedInAt: null, activeRecordId: null },
  { jobId: 'APT-3008', rowIndex: 9, priority: '4-STANDARD', serviceCategory: 'Plumbing',
    address: '240 Lakeshore Ave', unit: '7', description: 'Bathroom vanity drain clogged — backed up.',
    scheduledDate: _TODAY, scheduledTime: '09:00', estimatedHours: 2, status: 'Scheduled',
    rmName: 'Jan Blythe', rmEmail: 'jan.blythe@lapham.com', accessInfo: 'Lockbox: 4491',
    tenantName: 'Paul Kim', tenantPhone: '510-555-0394', tenantEmail: 'paul.k@email.com',
    assignedTech: 'Salvador Cabrera #101', notes: '', gmailMsgId: 'msg-3008',
    timestamp: new Date(Date.now() - 48 * 3600000).toISOString(), clockedInAt: null, activeRecordId: null },
];

function buildMockWeekSchedule() {
  const byTech: Record<string, Record<string, Job[]>> = {};
  MOCK_TECH_ROSTER.forEach(t => { byTech[t.techName] = {}; });
  MOCK_JOBS.filter(j => j.scheduledDate && j.assignedTech).forEach(j => {
    const name = j.assignedTech.split(' #')[0];
    if (byTech[name]) {
      if (!byTech[name][j.scheduledDate]) byTech[name][j.scheduledDate] = [];
      byTech[name][j.scheduledDate].push(j);
    }
  });
  return byTech;
}

const MOCK_COMPLIANCE = {
  atRiskCount: 2,
  mealPremiumsOwed: 150,
  totalHoursThisWeek: 420,
  technicians: [
    { techName: 'Salvador Cabrera', status: 'compliant', hoursWorked: 40, mealPremiums: 0 },
    { techName: 'Eduardo Pena',     status: 'at-risk',   hoursWorked: 38, mealPremiums: 50 },
  ]
};

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'N001', type: 'STALE_JOB', severity: 'warning', title: 'Stale Job: APT-3005', body: '120 Mission St has been in PTE Required for 4 days.', timestamp: new Date(Date.now() - 3600000).toISOString(), href: '/live?tab=pte' },
];

const MOCK_COMMENTS = [
  { id: 'C001', author: 'Manager', text: 'Jan confirmed tenant is available all day Thursday.', createdAt: new Date(Date.now() - 86400000).toISOString() },
];

const MOCK_CALENDAR_DISPATCH: Record<string, unknown[]> = {
  [_TODAY]:    [{ tech: 'Salvador Cabrera', jobCount: 1, estHours: 2, hasUrgent: false }],
};

const MOCK_FEEDBACK: FeedbackItem[] = [
  { rowIndex: 2, timestamp: new Date(Date.now() - 86400000).toISOString(),
    category: 'Suggestion', subject: 'Add tech phone numbers to job cards',
    details: 'I need to call the tech directly sometimes.',
    status: 'In Progress', adminNotes: 'Adding to next update.', submittedBy: 'Central Command' },
];

// ─────────────────────────────────────────────
// API CLIENT
// ─────────────────────────────────────────────

async function returnMockData(action: string) {
  const data: Record<string, unknown> = { success: true };

  switch (action) {
    case 'getStats':          data.stats = MOCK_STATS; break;
    case 'getDispatchData':   data.jobs = MOCK_JOBS; break;
    case 'getLiveFieldStatus':data.techs = MOCK_TECH_STATUS; break;
    case 'getTechList':       data.techs = MOCK_TECH_ROSTER; break;
    case 'getTradeDurations': 
      data.durations = { 'Plumbing': 2, 'Electrical': 1.5, 'Carpentry': 3, 'Finish Carpentry': 4 };
      break;
    case 'getTodaySchedule':  data.schedule = MOCK_JOBS.filter(j => j.scheduledDate === _TODAY); break;
    case 'getWeekSchedule':
      data.byTech = buildMockWeekSchedule();
      data.techs = MOCK_TECH_ROSTER;
      data.unassigned = MOCK_JOBS.filter(j => !j.assignedTech && j.scheduledDate);
      break;
    case 'getCalendarData':
      data.month = new Date().toISOString().slice(0, 7);
      data.view = 'dispatch';
      data.dispatchDays = MOCK_CALENDAR_DISPATCH;
      data.teamDays = {};
      break;
    case 'getNotifications':
      data.notifications = MOCK_NOTIFICATIONS;
      data.unreadCount = MOCK_NOTIFICATIONS.length;
      break;
    case 'getJobComments':    data.comments = MOCK_COMMENTS; break;
    case 'getComplianceStatus': data.data = MOCK_COMPLIANCE; break;
    case 'suggestTechs':      
      data.suggestions = [{ name: 'Salvador Cabrera', score: 98, reasons: ['Specialist'], estimatedHrs: 2, availableToday: true }];
      break;
    case 'getDraftReply':     data.subject = 'Re: Job'; data.replyBody = 'Sample reply'; break;
    case 'createManualJob':   return { success: true, job: MOCK_JOBS[0] };
    case 'getFeedback':       data.items = MOCK_FEEDBACK; break;
    default:                  data.message = `Mock success for ${action}`; break;
  }

  // Normalise mock data
  if (action === 'getDispatchData' && Array.isArray(data.jobs)) {
    const allJobs = (data.jobs as RawJob[]).map(mapJob);
    data.stats = computeStats(allJobs);
    data.jobs = allJobs;
  }
  return data;
}

// Actions that cause external side-effects: emails sent, sheet rows written.
// Blocked in NODE_ENV=development unless NEXT_PUBLIC_DEV_ALLOW_WRITES=true.
const DEV_BLOCKED_WRITES = new Set([
  'replyToThread',
  // archiveJob removed — now writes to dev Neon branch, not GAS Sheets
  // createManualJob removed — now writes to dev Neon branch, not GAS Sheets
  'expandScope',
  'generateTenantScheduleLink',
  'submitFeedback',
  'markPTEGranted',
]);

export async function dashboardRequest<T = Record<string, unknown>>(action: string, payload: Record<string, unknown> = {}): Promise<T> {
  // DEV WRITE GUARD — blocks all mutating GAS actions in local dev.
  // Reads still hit live data so the UI reflects reality.
  // Override with NEXT_PUBLIC_DEV_ALLOW_WRITES=true in .env.local ONLY when intentionally testing a write.
  if (
    process.env.NODE_ENV === 'development' &&
    process.env.NEXT_PUBLIC_DEV_ALLOW_WRITES !== 'true' &&
    DEV_BLOCKED_WRITES.has(action)
  ) {
    console.warn(`[DEV GUARD] ⛔ "${action}" blocked — would mutate production. Set NEXT_PUBLIC_DEV_ALLOW_WRITES=true to override.`);
    return { success: true, _devBlocked: true } as unknown as T;
  }

  // 🟢 Sandbox Mode: route through dedicated /api/sandbox (local JSON store)
  const isSandbox = process.env.NEXT_PUBLIC_SANDBOX_MODE === 'true';
  if (isSandbox) {
    try {
      const response = await fetch('/api/sandbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...payload }),
      });
      if (response.ok) {
        const data = await response.json();
        // Apply same normalisation as production
        if (action === 'getDispatchData' && Array.isArray(data.jobs)) {
          const allJobs = data.jobs.map(mapJob);
          data.stats = computeStats(allJobs);
          data.jobs = allJobs.filter((j: Job) => j.status !== 'Archived');
        }
        if ((action === 'getLiveFieldStatus' || action === 'getWeekSchedule') && Array.isArray(data.techs)) {
          data.techs = (data.techs as RawTech[]).map(mapTech);
        }
        return data as T;
      }
    } catch (e) {
      console.warn(`[SANDBOX] Bridge failed for ${action}:`, e);
    }
    // If bridge fails, fall back to in-memory mocks
    return returnMockData(action) as Promise<T>;
  }

  const isDev = process.env.NODE_ENV === 'development';
  let data: Record<string, unknown> | null = null;

  const MIGRATED_ACTIONS: Record<string, string> = {
    getTechList:         '/api/techs', // Pointing exclusively to Neon DB
    getDispatchData:     '/api/jobs', // Pointing exclusively to Neon DB
    getTodaySchedule:    '/api/schedule/today',
    getLiveFieldStatus:  '/api/dashboard/live-status',
    getComplianceStatus: '/api/dashboard/compliance-status',
    getNotifications:    '/api/notifications',
  };

  // 🟢 Special Case: getWeekSchedule (POST body -> GET query param)
  if (action === 'getWeekSchedule') {
    const weekStart = payload.weekStart as string | undefined;
    const url = weekStart ? `/api/schedule/week?weekStart=${encodeURIComponent(weekStart)}` : '/api/schedule/week';
    try {
      const response = await fetch(url);
      data = await response.json();
    } catch (e) { console.error('[NEON] /api/schedule/week failed:', e); }
  }

  // 🟢 Special Case: getJobById (GET with path param)
  if (action === 'getJobById' && payload.jobId) {
    try {
      const response = await fetch(`/api/jobs/${encodeURIComponent(payload.jobId as string)}`);
      data = await response.json();
    } catch (e) { console.error(`[NEON] GET /api/jobs/${payload.jobId} failed:`, e); }
  }

  // 🟢 Special Case: getJobHistory (POST body -> GET query param)
  if (action === 'getJobHistory' && payload.address) {
    try {
      const url = `/api/jobs/history?address=${encodeURIComponent(String(payload.address))}`;
      const response = await fetch(url);
      data = await response.json();
    } catch (e) { console.error('[NEON] GET /api/jobs/history failed:', e); }
  }

  if (MIGRATED_ACTIONS[action]) {
    try {
      const response = await fetch(MIGRATED_ACTIONS[action]);
      data = await response.json();
    } catch (e) {
      console.error(`[NEON] Internal API failed for ${action}:`, e);
    }
  }

  // 🟢 Special Case: updateJob (PATCH to Neon)
  if (action === 'updateJob' && payload.job) {
    const job = payload.job as Job;
    const jobId = job.jobId;
    if (jobId) {
      try {
        const response = await fetch(`/api/jobs/${jobId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(job),
        });
        data = await response.json();
      } catch (e) {
        console.error(`[NEON] PATCH /api/jobs/${jobId} failed:`, e);
      }
    }
  }

  // 🟢 Special Case: archiveJob (PATCH status to Neon — GAS rowIndex unavailable since Neon migration)
  if (action === 'archiveJob' && payload.jobId) {
    try {
      const response = await fetch(`/api/jobs/${encodeURIComponent(payload.jobId as string)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Archived' }),
      });
      data = await response.json();
    } catch (e) {
      console.error(`[NEON] PATCH /api/jobs/${payload.jobId} archive failed:`, e);
    }
  }

  // 🟢 Special Case: createManualJob (POST /api/jobs — Neon-only; GAS createManualJobDA path retired, NEON-03)
  // On failure we return explicitly instead of falling through — the GAS path would write a Sheets row.
  if (action === 'createManualJob') {
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      data = await response.json();
    } catch (e) {
      console.error('[NEON] POST /api/jobs failed:', e);
      return { success: false, message: 'Job creation failed' } as unknown as T;
    }
  }

  // 🟢 Special Case: replyToThread (POST /api/comms/[jobId])
  if (action === 'replyToThread' && payload.jobId) {
    const { jobId, replyBody, stakeholder, channel } = payload as { 
      jobId: string; 
      replyBody: string; 
      stakeholder: string; 
      channel: string;
    };
    try {
      const response = await fetch(`/api/comms/${encodeURIComponent(jobId)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ replyBody, stakeholder, channel }),
      });
      
      const result = await response.json();
      // If Neon returns 422 (not_supported), we fall through to GAS
      if (response.status === 422 && result.error === 'not_supported') {
        console.log(`[NEON] Comms path not supported for ${channel}/${stakeholder}. Falling back to GAS.`);
      } else {
        data = result;
      }
    } catch (e) {
      console.error(`[NEON] POST /api/comms/${jobId} failed:`, e);
    }
  }

  // 1. Try Production API (routed server-side to keep key out of client bundle)
  if (!data) {
    try {
      const response = await fetch('/api/gas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...payload }),
      });
      data = await response.json();
    } catch (error) {
      console.error(`DashboardAPI Error (${action}):`, error);
    }
  }

  // 3. Fallback to Mocks (ONLY in Sandbox or Local Dev)
  if (!data) {
    if (isSandbox || isDev) {
      console.warn(`[DEBUG] DashboardAPI fetch failed for ${action}. Falling back to mocks.`);
      return returnMockData(action) as Promise<T>;
    }
    return { success: false, message: `API Connection Failed (${action})` } as unknown as T;
  }

  // 4. Normalise Response
  if (data.success) {
    if (action === 'getDispatchData' && Array.isArray(data.jobs)) {
      const allJobs = data.jobs.map(mapJob);
      data.stats = computeStats(allJobs);
      data.jobs = allJobs.filter((j: Job) => j.status !== 'Archived');
    }
    if ((action === 'getLiveFieldStatus' || action === 'getWeekSchedule') && Array.isArray(data.techs)) {
      data.techs = (data.techs as RawTech[]).map(mapTech);
    }
  }

  return data as T;
}

export async function getTechAvailability(weekStart: string): Promise<{ outDates: Record<string, string[]> }> {
  const res = await dashboardRequest<TechAvailabilityResponse>('getTechAvailability', { weekStart });
  return { outDates: res.outDates ?? {} };
}

import { TimecardApprovalQueueResponse } from './types';

export async function getTimecardApprovalQueue(weekStart?: string): Promise<TimecardApprovalQueueResponse> {
  return dashboardRequest<TimecardApprovalQueueResponse>('getTimecardApprovalQueue', { weekStart: weekStart ?? '' });
}

export async function approveTimecard(recordId: string, supervisorName: string, supervisorId: string) {
  return dashboardRequest<GenericResponse>('approveTimecard', { recordId, supervisorName, supervisorId });
}

export async function disputeTimecard(recordId: string, supervisorName: string, supervisorId: string, reason: string) {
  return dashboardRequest<GenericResponse>('disputeTimecard', { recordId, supervisorName, supervisorId, reason });
}

