
import { Job } from '../types';

/**
 * Maps legacy backend statuses to the new JobStatus union.
 */
export function normalizeLegacyStatus(raw: string): string {
  const MAP: Record<string, string> = {
    'Open':             'Needs Review',
    'PTE-Pending':      'PTE Required',
    'Tenant Contacted': 'PTE Required',
    'Approval Needed':  'Awaiting Approval',
    'New':              'Needs Review',
  };
  return MAP[raw] || raw || 'Needs Review';
}

/**
 * Maps raw job data (from Neon or Sheets) to the Job type.
 */
export function mapJob(raw: Record<string, unknown>): Job {
  return {
    rowIndex:         raw.rowIndex as number,
    jobId:            (raw.jobId as string)       || (raw.id as string)          || '',
    priority:         (raw.priority as Job['priority'])    || '4-STANDARD',
    serviceCategory:  (raw.serviceCategory as string) || (raw.category as string) || '',
    address:          (raw.address as string)     || '',
    unit:             (raw.unit as string)        || '',
    description:      (raw.description as string) || '',
    scheduledDate:    (raw.scheduledDate as string) || (raw.scheduled_date as string) || '',
    scheduledTime:    (raw.scheduledTime as string) || (raw.scheduled_time as string) || '',
    estimatedHours:   parseFloat((raw.estHours ?? raw.est_hours ?? raw.estimatedHours ?? '0') as string) || 0,
    status:           normalizeLegacyStatus((raw.status as string) || 'Needs Review') as Job['status'],
    rmName:           (raw.rmName as string)      || (raw.rm_name as string) || '',
    rmEmail:          (raw.rmEmail as string)     || (raw.rm_email as string) || '',
    accessInfo:       (raw.accessInfo as string)  || (raw.access_info as string) || '',
    tenantName:       (raw.tenantName as string)  || (raw.tenant_name as string) || '',
    tenantPhone:      (raw.tenantPhone as string) || (raw.tenant_phone as string) || '',
    tenantEmail:      (raw.tenantEmail as string) || (raw.tenant_email as string) || '',
    assignedTech:     (raw.assignedTech as string) || (raw.tech as string) || '',
    notes:            (raw.notes as string)       || '',
    gmailMsgId:       (raw.gmailMsgId as string)  || (raw.gmail_msg_id as string) || '',
    emailType:        (raw.emailType as string)   || (raw.email_type as string) || '',
    preferredTiming:  (raw.preferredTiming as string) || (raw.timing as string) || '',
    estimateNeeded:   (raw.estimateNeeded as string)  || (raw.estimate as string) || '',
    pteGranted:       (raw.pteGranted as Job['pteGranted'])  || (raw.pte as Job['pteGranted']) || undefined,
    tenantPrefContact: (raw.tenantPrefContact as string) || (raw.tenant_pref as string) || '',
    tenantHasPets:    (raw.tenantHasPets as string) || (raw.tenant_pets as string) || '',
    timestamp:        (raw.timestamp instanceof Date) ? raw.timestamp.toISOString() : ((raw.timestamp as string) || ''),
    clockedInAt:      (raw.clockedInAt as string)   || null,
    activeRecordId:   (raw.activeRecordId as string) || null,
  };
}

/**
 * Computes dashboard stats from a list of jobs.
 */
export function computeDashboardStats(jobs: Job[], today: string) {
  const active = jobs.filter(j => j.status !== 'Archived' && j.status !== 'Complete');
  return {
    urgentCount:         active.filter(j => j.status === 'Needs Review').length,
    needsActionCount:    active.filter(j => j.status === 'PTE Required' || j.status === 'Awaiting Approval').length,
    ptePendingCount:     active.filter(j => j.status === 'Ready to Schedule').length,
    todayScheduledCount: active.filter(j => j.scheduledDate === today).length,
    doneThisWeekCount:   jobs.filter(j => j.status === 'Complete' && j.scheduledDate === today).length,
  };
}
