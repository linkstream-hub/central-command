/**
 * Sandbox Store — JSON-file-backed persistence for testing.
 * Replaces Neon + Sheets when NEXT_PUBLIC_SANDBOX_MODE=true.
 * Same data shape as production, changes persist to disk.
 */

import fs from 'fs';
import path from 'path';

const STORE_PATH = path.join(process.cwd(), 'sandbox-data.json');

interface SandboxData {
  jobs: Record<string, unknown>[];
  techs: Record<string, unknown>[];
  comments: Record<string, Record<string, unknown>[]>;
  feedback: Record<string, unknown>[];
  timeRecords: Record<string, unknown>[];
}

function getDefaultData(): SandboxData {
  const TODAY = new Date().toISOString().split('T')[0];
  return {
    jobs: [
      { jobId: 'APT-3001', rowIndex: 2, priority: '1-URGENT', serviceCategory: 'Plumbing',
        address: '65 Thornton Ave', unit: '304', description: 'Main line backup. Sewage coming up through kitchen sink. Tenant reporting flooding.',
        scheduledDate: '', scheduledTime: '', estHours: 0, status: 'Needs Review',
        rmName: 'Jan Blythe', rmEmail: 'jan.blythe@lapham.com', accessInfo: 'Lockbox code: 1954',
        tenantName: 'Maria Santos', tenantPhone: '510-555-0192', tenantEmail: 'maria.santos@email.com',
        assignedTech: '', notes: '', gmailMsgId: 'msg-3001', emailType: 'Work Order',
        timestamp: new Date(Date.now() - 2 * 3600000).toISOString(), clockedInAt: null, activeRecordId: null },
      { jobId: 'APT-3002', rowIndex: 3, priority: '1-URGENT', serviceCategory: 'Electrical',
        address: '1420 Alice St', unit: '', description: 'No power to master bedroom and hallway since yesterday. Breaker trips immediately on reset.',
        scheduledDate: '', scheduledTime: '', estHours: 0, status: 'Needs Review',
        rmName: 'David Park', rmEmail: 'david.park@lapham.com', accessInfo: 'Key at property office',
        tenantName: 'Darnell Washington', tenantPhone: '415-555-0847', tenantEmail: 'darnell.w@email.com',
        assignedTech: '', notes: '', gmailMsgId: 'msg-3002', emailType: 'Work Order',
        timestamp: new Date(Date.now() - 5 * 3600000).toISOString(), clockedInAt: null, activeRecordId: null },
      { jobId: 'APT-3003', rowIndex: 4, priority: '4-STANDARD', serviceCategory: 'Plumbing',
        address: '890 Market St', unit: '12', description: 'Kitchen faucet slow drip. Tenant has been reporting for 3 weeks. PTE confirmed.',
        scheduledDate: '', scheduledTime: '', estHours: 1.5, status: 'Ready to Schedule',
        rmName: 'Jan Blythe', rmEmail: 'jan.blythe@lapham.com', accessInfo: 'Tenant will be home. Call 30 min ahead.',
        tenantName: 'Sofia Hernandez', tenantPhone: '415-555-0302', tenantEmail: 'sofia.h@email.com',
        assignedTech: '', notes: '', gmailMsgId: 'msg-3003', emailType: 'Work Order',
        pteGranted: 'Yes',
        timestamp: new Date(Date.now() - 72 * 3600000).toISOString(), clockedInAt: null, activeRecordId: null },
      { jobId: 'APT-3004', rowIndex: 5, priority: '3-PTE-PENDING', serviceCategory: 'Carpentry',
        address: '120 Mission St', unit: '8B', description: 'Interior door won\'t latch. Hinge side is sagging.',
        scheduledDate: '', scheduledTime: '', estHours: 2, status: 'PTE Required',
        rmName: 'David Park', rmEmail: 'david.park@lapham.com', accessInfo: 'No lockbox. Must coordinate entry.',
        tenantName: 'James Chen', tenantPhone: '510-555-0481', tenantEmail: 'james.c@email.com',
        assignedTech: '', notes: 'Tenant works days, prefers after 5pm.', gmailMsgId: 'msg-3004', emailType: 'Work Order',
        pteGranted: 'No',
        timestamp: new Date(Date.now() - 96 * 3600000).toISOString(), clockedInAt: null, activeRecordId: null },
      { jobId: 'APT-3005', rowIndex: 6, priority: '4-STANDARD', serviceCategory: 'Landscaping',
        address: '500 Grand Ave', unit: '', description: 'Overgrown hedges along front walkway. HOA complaint received.',
        scheduledDate: '', scheduledTime: '', estHours: 3, status: 'Ready to Schedule',
        rmName: 'Jan Blythe', rmEmail: 'jan.blythe@lapham.com', accessInfo: 'Exterior only. No entry needed.',
        tenantName: '', tenantPhone: '', tenantEmail: '',
        assignedTech: '', notes: '', gmailMsgId: 'msg-3005', emailType: 'Work Order',
        pteGranted: 'Not Required',
        timestamp: new Date(Date.now() - 48 * 3600000).toISOString(), clockedInAt: null, activeRecordId: null },
      { jobId: 'APT-3006', rowIndex: 7, priority: '2-TURNOVER', serviceCategory: 'General',
        address: '77 Bellevue Ave', unit: '2A', description: 'Full unit turnover. Paint, patch, deep clean, fixture swap.',
        scheduledDate: TODAY, scheduledTime: '08:00', estHours: 8, status: 'Scheduled',
        rmName: 'David Park', rmEmail: 'david.park@lapham.com', accessInfo: 'Vacant unit. Lockbox: 7722',
        tenantName: '', tenantPhone: '', tenantEmail: '',
        assignedTech: 'Eduardo Pena #102', notes: 'Move-in date is next Monday.', gmailMsgId: 'msg-3006', emailType: 'Turnover',
        pteGranted: 'Not Required',
        timestamp: new Date(Date.now() - 120 * 3600000).toISOString(), clockedInAt: null, activeRecordId: null },
      { jobId: 'APT-3007', rowIndex: 8, priority: '4-STANDARD', serviceCategory: 'Plumbing',
        address: '240 Lakeshore Ave', unit: '7', description: 'Bathroom vanity drain clogged.',
        scheduledDate: TODAY, scheduledTime: '09:00', estHours: 2, status: 'In Progress',
        rmName: 'Jan Blythe', rmEmail: 'jan.blythe@lapham.com', accessInfo: 'Lockbox: 4491',
        tenantName: 'Paul Kim', tenantPhone: '510-555-0394', tenantEmail: 'paul.k@email.com',
        assignedTech: 'Salvador Cabrera #101', notes: '', gmailMsgId: 'msg-3007', emailType: 'Work Order',
        timestamp: new Date(Date.now() - 48 * 3600000).toISOString(),
        clockedInAt: new Date(Date.now() - 145 * 60000).toISOString(), activeRecordId: 'TR-7001' },
      { jobId: 'APT-3008', rowIndex: 9, priority: '4-STANDARD', serviceCategory: 'Electrical',
        address: '1100 Broadway', unit: '14', description: 'Replace smoke detector batteries in all rooms.',
        scheduledDate: TODAY, scheduledTime: '13:00', estHours: 1, status: 'Scheduled',
        rmName: 'David Park', rmEmail: 'david.park@lapham.com', accessInfo: 'Tenant home after 12pm.',
        tenantName: 'Lisa Tran', tenantPhone: '415-555-0829', tenantEmail: 'lisa.t@email.com',
        assignedTech: 'Boyette Johnson #103', notes: '', gmailMsgId: 'msg-3008', emailType: 'Work Order',
        timestamp: new Date(Date.now() - 24 * 3600000).toISOString(), clockedInAt: null, activeRecordId: null },
    ],
    techs: [
      { name: 'Salvador Cabrera', techName: 'Salvador Cabrera', badge: '101', techId: '101', rank: 'C', phone: '510-555-1001', role: 'tech', active: true, isActive: true,
        skills: { Carpentry: 1, Plumbing: 1, Electrical: 2, 'Finish Carpentry': 2, Structural: 3, Landscaping: 3, Janitorial: 3 },
        status: 'active', minutesWorked: 145, jobAddress: '240 Lakeshore Ave', clockInTime: new Date(Date.now() - 145 * 60000).toISOString() },
      { name: 'Eduardo Pena', techName: 'Eduardo Pena', badge: '102', techId: '102', rank: 'L1', phone: '415-555-1002', role: 'tech', active: true, isActive: true,
        skills: { Carpentry: 2, Plumbing: 2, Electrical: 3, 'Finish Carpentry': 3, Structural: 3, Landscaping: 2, Janitorial: 1 },
        status: 'active', minutesWorked: 220, jobAddress: '77 Bellevue Ave', clockInTime: new Date(Date.now() - 220 * 60000).toISOString() },
      { name: 'Boyette Johnson', techName: 'Boyette Johnson', badge: '103', techId: '103', rank: 'L', phone: '415-555-1003', role: 'tech', active: true, isActive: true,
        skills: { Carpentry: 3, Plumbing: 3, Electrical: 1, 'Finish Carpentry': 3, Structural: 2, Landscaping: 3, Janitorial: 3 },
        status: 'unassigned' },
      { name: 'Federico Santos', techName: 'Federico Santos', badge: '104', techId: '104', rank: 'T', phone: '510-555-1004', role: 'tech', active: true, isActive: true,
        skills: { Carpentry: 3, Plumbing: 3, Electrical: 3, 'Finish Carpentry': 3, Structural: 3, Landscaping: 3, Janitorial: 2 },
        status: 'unassigned' },
    ],
    comments: {},
    feedback: [
      { rowIndex: 2, timestamp: new Date(Date.now() - 86400000).toISOString(),
        category: 'Suggestion', subject: 'Add tech phone numbers to job cards',
        details: 'Would be helpful to call the tech directly from the job card.',
        status: 'In Progress', adminNotes: 'Adding to next sprint.', submittedBy: 'Dispatch' },
      { rowIndex: 3, timestamp: new Date(Date.now() - 172800000).toISOString(),
        category: 'Bug Report', subject: 'Calendar view not showing weekend jobs',
        details: 'When I schedule a Saturday job, it doesn\'t appear on the calendar.',
        status: 'Needs Review', adminNotes: '', submittedBy: 'Dispatch' },
    ],
    timeRecords: [],
  };
}

function readStore(): SandboxData {
  try {
    if (fs.existsSync(STORE_PATH)) {
      return JSON.parse(fs.readFileSync(STORE_PATH, 'utf-8'));
    }
  } catch {
    console.warn('[SANDBOX] Corrupt store file, resetting.');
  }
  const data = getDefaultData();
  writeStore(data);
  return data;
}

function writeStore(data: SandboxData): void {
  fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// ─── Public API (mirrors production action names) ──────────────

export function sandboxAction(action: string, payload: Record<string, unknown> = {}): Record<string, unknown> {
  const store = readStore();

  switch (action) {
    case 'getDispatchData': {
      return { success: true, source: 'sandbox', jobs: store.jobs };
    }

    case 'getLiveFieldStatus': {
      return { success: true, techs: store.techs };
    }

    case 'getTechList': {
      return { success: true, techs: store.techs };
    }

    case 'getTradeDurations': {
      return {
        success: true,
        durations: { Plumbing: 2, Electrical: 1.5, Carpentry: 3, 'Finish Carpentry': 4, Janitorial: 4, Landscaping: 3, Structural: 5, HVAC: 2, General: 2, Inspection: 1.5, Painting: 3 },
      };
    }

    case 'getWeekSchedule': {
      const byTech: Record<string, Record<string, unknown[]>> = {};
      store.techs.forEach(t => { byTech[t.techName as string] = {}; });
      store.jobs.filter(j => j.scheduledDate && j.assignedTech).forEach(j => {
        const name = (j.assignedTech as string).split(' #')[0];
        if (byTech[name]) {
          const date = j.scheduledDate as string;
          if (!byTech[name][date]) byTech[name][date] = [];
          byTech[name][date].push(j);
        }
      });
      return { success: true, byTech, techs: store.techs, unassigned: store.jobs.filter(j => !j.assignedTech && j.scheduledDate) };
    }

    case 'getTodaySchedule': {
      const today = new Date().toISOString().split('T')[0];
      return { success: true, schedule: store.jobs.filter(j => j.scheduledDate === today) };
    }

    case 'getCalendarData': {
      const today = new Date().toISOString().split('T')[0];
      const dispatchDays: Record<string, unknown[]> = {};
      store.jobs.filter(j => j.scheduledDate && j.assignedTech).forEach(j => {
        const d = j.scheduledDate as string;
        if (!dispatchDays[d]) dispatchDays[d] = [];
        dispatchDays[d].push({ tech: (j.assignedTech as string).split(' #')[0], jobCount: 1, estHours: j.estHours || 2, hasUrgent: j.priority === '1-URGENT' });
      });
      return { success: true, month: today.slice(0, 7), view: 'dispatch', dispatchDays, teamDays: {} };
    }

    case 'getTechAvailability': {
      return { success: true, outDates: {} };
    }

    case 'suggestTechs': {
      const activeTechs = store.techs.filter(t => t.active);
      return {
        success: true,
        suggestions: activeTechs.map((t, i) => ({
          name: t.techName, score: 95 - i * 5, reasons: ['Available', `Rank: ${t.rank}`],
          estimatedHrs: 2, availableToday: t.status !== 'active',
        })),
      };
    }

    case 'updateJob': {
      // Frontend sends { job: { rowIndex, assignedTech, ... } } — job is nested
      const jobPayload = (payload.job as Record<string, unknown>) || payload;
      const jobId = (jobPayload.jobId as string) || (payload.jobId as string);
      const rowIndex = (jobPayload.rowIndex as number) ?? (payload.rowIndex as number);

      const idx = jobId
        ? store.jobs.findIndex(j => j.jobId === jobId)
        : store.jobs.findIndex(j => (j.rowIndex as number) === rowIndex);
      if (idx === -1) return { success: false, error: 'JOB_NOT_FOUND' };
      const updates = { ...jobPayload };
      store.jobs[idx] = { ...store.jobs[idx], ...updates };
      writeStore(store);
      return { success: true, job: store.jobs[idx] };
    }

    case 'createManualJob': {
      const newId = `APT-${4000 + store.jobs.length}`;
      const newJob = {
        jobId: newId, rowIndex: store.jobs.length + 2,
        priority: payload.priority || '4-STANDARD', serviceCategory: payload.serviceCategory || 'General',
        address: payload.address || '', unit: payload.unit || '',
        description: payload.description || '', scheduledDate: payload.scheduledDate || '',
        scheduledTime: payload.scheduledTime || '', estHours: payload.estHours || 0,
        status: 'Needs Review', rmName: payload.rmName || '', rmEmail: payload.rmEmail || '',
        accessInfo: payload.accessInfo || '', tenantName: payload.tenantName || '',
        tenantPhone: payload.tenantPhone || '', tenantEmail: payload.tenantEmail || '',
        assignedTech: '', notes: payload.notes || '', gmailMsgId: '',
        emailType: 'Manual', timestamp: new Date().toISOString(),
        clockedInAt: null, activeRecordId: null,
      };
      store.jobs.push(newJob);
      writeStore(store);
      return { success: true, job: newJob };
    }

    case 'getJobComments': {
      const jid = payload.leadId as string || payload.jobId as string || '';
      return { success: true, comments: store.comments[jid] || [] };
    }

    case 'addJobComment': {
      const jid = payload.leadId as string || payload.jobId as string || '';
      if (!store.comments[jid]) store.comments[jid] = [];
      const comment = {
        id: `SC-${Date.now()}`, leadId: jid,
        author: payload.author || 'Dispatch', role: payload.role || 'dispatch',
        body: payload.body || '', timestamp: new Date().toISOString(),
      };
      store.comments[jid].push(comment);
      writeStore(store);
      return { success: true, comment };
    }

    case 'getGmailThread': {
      return { success: true, thread: { messages: [
        { from: 'jan.blythe@lapham.com', fromEmail: 'jan.blythe@lapham.com', toEmail: 'workorder@aptmaintenanceinc.com',
          text: 'Please schedule this repair at your earliest convenience.', timestamp: new Date(Date.now() - 86400000).toISOString(),
          isOutbound: false, attachments: [] },
      ] } };
    }

    case 'getDraftReply': {
      const sk = (payload.stakeholder as string || 'REQUESTER').toUpperCase();
      const draftBody = sk === 'TENANT'
        ? '[Sandbox – Tenant] Hi [Tenant Name], this is APT Maintenance. We have a scheduled work order at your property. Do we have your permission to enter if you are not home? Please reply to confirm. Thank you, APT Maintenance'
        : sk === 'TECH'
        ? '[Sandbox – Tech] Field briefing: [Address] — [Issue]. Access: [Notes]. Scheduled: [Date/Time]. Dispatch.'
        : '[Sandbox – RM] Hi [RM Name], we have received your work order for [Address]. We will follow up with scheduling details shortly. Thank you, APT Maintenance';
      return { success: true, subject: 'Re: Work Order', replyBody: draftBody };
    }

    case 'replyToThread': {
      return { success: true, message: 'Reply sent (sandbox - no actual email sent).' };
    }

    case 'getNotifications': {
      return { success: true, notifications: [
        { id: 'N001', type: 'STALE_JOB', severity: 'warning', title: 'Stale Job: APT-3004', body: '120 Mission St has been in PTE Required for 4 days.', timestamp: new Date(Date.now() - 3600000).toISOString(), href: '/live?tab=pte' },
      ], unreadCount: 1 };
    }

    case 'getComplianceStatus': {
      return { success: true, data: { atRiskCount: 1, mealPremiumsOwed: 50, totalHoursThisWeek: 160,
        technicians: store.techs.map(t => ({ techName: t.techName, status: 'compliant', hoursWorked: 40, mealPremiums: 0 })),
      } };
    }

    case 'getFeedback': {
      return { success: true, items: store.feedback };
    }

    case 'submitFeedback': {
      const fb = { rowIndex: store.feedback.length + 2, timestamp: new Date().toISOString(),
        category: payload.category || 'Suggestion', subject: payload.subject || '',
        details: payload.details || '', status: 'Needs Review', adminNotes: '', submittedBy: payload.submittedBy || 'Dispatch',
      };
      store.feedback.push(fb);
      writeStore(store);
      return { success: true };
    }

    case 'updateFeedbackStatus': {
      const ri = payload.rowIndex as number;
      const fi = store.feedback.findIndex(f => (f.rowIndex as number) === ri);
      if (fi !== -1) {
        store.feedback[fi] = { ...store.feedback[fi], status: payload.status, adminNotes: payload.adminNotes };
        writeStore(store);
      }
      return { success: true };
    }

    case 'expandScope': {
      const eidx = store.jobs.findIndex(j => j.jobId === payload.leadId);
      if (eidx !== -1) {
        const cur = (store.jobs[eidx].estHours as number) || 0;
        store.jobs[eidx].estHours = cur + ((payload.hoursToAdd as number) || 0);
        if (payload.additionalWork) {
          store.jobs[eidx].notes = `${store.jobs[eidx].notes || ''}\nScope Expansion: ${payload.additionalWork}`.trim();
        }
        writeStore(store);
      }
      return { success: true };
    }

    case 'getTimecardApprovalQueue': {
      return { success: true, records: store.timeRecords, weekStart: '', weekEnd: '', pendingCount: 0 };
    }

    default:
      return { success: true, message: `[Sandbox] No-op for: ${action}` };
  }
}
