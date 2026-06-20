import { db } from '@/lib/db';
import { jobs } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import type {
  JobStateDAL,
  JobStateRecord,
  JobId,
  TechId,
  SchedulingToken,
  ArrivalWindow,
  WoType,
} from '@/domain/job';

function mapPte(raw: string | null | undefined): 'Yes' | 'No' | 'Not Required' {
  if (raw === 'Yes') return 'Yes';
  if (raw === 'No') return 'No';
  return 'Not Required';
}

function mapWoType(emailType: string | null | undefined, category: string | null | undefined): WoType {
  const tag = (emailType ?? category ?? '').toLowerCase();
  if (tag.includes('turnover')) return 'turnover';
  if (tag.includes('inspection')) return 'inspection';
  return 'maintenance';
}

function mapArrivalWindow(raw: string | null | undefined): ArrivalWindow | null {
  if (raw === 'morning' || raw === 'afternoon' || raw === 'late_afternoon') return raw;
  return null;
}

function mapToJobStateRecord(row: typeof jobs.$inferSelect): JobStateRecord {
  return {
    jobId: row.jobId as JobId,
    state: (row.status ?? 'Needs Info') as JobStateRecord['state'],
    woType: mapWoType(row.emailType, row.category),
    pteGranted: mapPte(row.pte),
    assignedTechId: row.tech ? (row.tech as TechId) : null,
    scheduledDate: row.scheduledDate ?? null,
    scheduledWindow: mapArrivalWindow(row.scheduledTime),
    missingFields: [],               // not stored in current schema
    schedulingToken: row.trackingToken ? (row.trackingToken as SchedulingToken) : null,
    schedulingTokenExpiresAt: null,  // column does not exist yet
    tenantProposedDate: null,        // column does not exist yet
    tenantProposedWindow: null,      // column does not exist yet
    clockedInAt: null,               // lives in timeRecords, not jobs
    completedAt: null,               // lives in timeRecords, not jobs
    tenantEmail: row.tenantEmail ?? '',
  };
}

export function makeJobStateDAL(): JobStateDAL {
  return {
    async getJobById(jobId: string) {
      const rows = await db
        .select()
        .from(jobs)
        .where(eq(jobs.jobId, jobId))
        .limit(1);
      if (!rows[0]) return { success: false, error: 'JOB_NOT_FOUND' as const };
      return { success: true, job: mapToJobStateRecord(rows[0]) };
    },

    async updateJob(jobId: string, updates: Partial<JobStateRecord>) {
      const patch: Partial<typeof jobs.$inferInsert> = {};
      if (updates.state !== undefined)           patch.status = updates.state;
      if (updates.pteGranted !== undefined)      patch.pte = updates.pteGranted;
      if (updates.assignedTechId !== undefined)  patch.tech = updates.assignedTechId ?? null;
      if (updates.scheduledDate !== undefined)   patch.scheduledDate = updates.scheduledDate ?? null;
      if (updates.scheduledWindow !== undefined) patch.scheduledTime = updates.scheduledWindow ?? null;
      if (updates.tenantEmail !== undefined)     patch.tenantEmail = updates.tenantEmail;
      if (updates.schedulingToken !== undefined) patch.trackingToken = updates.schedulingToken ?? null;

      if (Object.keys(patch).length === 0) return { success: true };
      await db.update(jobs).set(patch).where(eq(jobs.jobId, jobId));
      return { success: true };
    },
  };
}
