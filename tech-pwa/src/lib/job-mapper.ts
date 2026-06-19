import type { Job } from './types';
import type { jobs } from './schema';
import type { InferSelectModel } from 'drizzle-orm';

type NeonJob = InferSelectModel<typeof jobs>;

export function mapNeonJobToJob(row: NeonJob, opts?: { clockedInAt?: string | null; activeRecordId?: string | null }): Job {
  return {
    rowIndex:          undefined,
    jobId:             row.jobId,
    priority:          (row.priority || '4-STANDARD') as Job['priority'],
    serviceCategory:   row.category || '',
    address:           row.address || '',
    unit:              row.unit || '',
    description:       row.description || '',
    scheduledDate:     row.scheduledDate || '',
    scheduledTime:     row.scheduledTime || '',
    estimatedHours:    Number(row.estHours || 0),
    status:            (row.status || 'Needs Review') as Job['status'],
    rmName:            row.rmName || '',
    rmEmail:           row.rmEmail || '',
    accessInfo:        row.accessInfo || '',
    tenantName:        row.tenantName || '',
    tenantPhone:       row.tenantPhone || '',
    tenantEmail:       row.tenantEmail || '',
    assignedTech:      row.tech || '',
    notes:             row.notes || '',
    gmailMsgId:        row.gmailMsgId || '',
    emailType:         row.emailType || '',
    preferredTiming:   row.timing || '',
    estimateNeeded:    row.estimate || '',
    pteGranted:        (row.pte || undefined) as Job['pteGranted'],
    tenantPrefContact: row.tenantPref || '',
    tenantHasPets:     row.tenantPets || '',
    timestamp:         row.timestamp ? row.timestamp.toISOString() : '',
    clockedInAt:       opts?.clockedInAt ?? null,
    activeRecordId:    opts?.activeRecordId ?? null,
  };
}
