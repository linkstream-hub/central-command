// NEON-02 cutover: Sheets fallback removed (Phase 12). All reads and writes from Neon only.

import { db } from '../db';
import { jobs as jobsTable, employees as employeesTable } from '../schema';
import { mapJob, computeDashboardStats } from './mappers';
import { eq, and, sql } from 'drizzle-orm';
import { Job } from '../types';
import { resolveWCCode } from '../wc-codes';

export interface ManualJobPayload {
  address: string;
  description: string;
  unit?: string;
  serviceCategory?: string;
  priority?: string;
  tenantName?: string;
  tenantPhone?: string;
  tenantEmail?: string;
  accessInfo?: string;
  rmName?: string;
  rmEmail?: string;
  estHours?: number | string;
  notes?: string;
  assignedTech?: string;
  scheduledDate?: string;
  scheduledTime?: string;
  entityId?: string;
}

/**
 * Jobs Repository
 * Neon-only reads and writes. Sheets fallback severed per Phase 12 NEON-02.
 */
export const jobsRepository = {


  /**
   * Fetches a single job by ID (Lead ID).
   * Reads exclusively from Neon Postgres — no Sheets enrichment fallback.
   */
  async getJobById(jobId: string) {
    const isSandbox = process.env.NEXT_PUBLIC_SANDBOX_MODE === 'true';
    if (isSandbox) return { success: false as const, error: 'JOB_NOT_FOUND' as const };

    const [neonJob] = await db.select().from(jobsTable).where(eq(jobsTable.jobId, jobId));
    if (neonJob) {
      return { success: true as const, source: 'neon' as const, job: mapJob(neonJob) };
    }
    return { success: false as const, error: 'JOB_NOT_FOUND' as const };
  },

  async updateJob(jobId: string, updates: Partial<Job>) {
    const current = await this.getJobById(jobId);
    if (current.success && current.job) {
      const schedulingStatuses = ['Ready to Schedule', 'Scheduled'];
      const isPteGranted = updates.pteGranted === 'Yes' || current.job.pteGranted === 'Yes' || current.job.pteGranted === 'Not Required';
      const isMovingToSchedule = updates.status && schedulingStatuses.includes(updates.status);
      const isAssigningInPteRequired = updates.assignedTech && current.job.status === 'PTE Required';
      if ((isMovingToSchedule || isAssigningInPteRequired) && !isPteGranted) {
        return { success: false, error: 'PTE_REQUIRED_GATE', message: 'Hard-Gate: PTE must be granted before scheduling.' };
      }
    }

    const isSandbox = process.env.NEXT_PUBLIC_SANDBOX_MODE === 'true';
    if (isSandbox) return { success: true };

    const dbUpdates: Partial<typeof jobsTable.$inferInsert> = {};
    if (updates.priority) dbUpdates.priority = updates.priority;
    if (updates.emailType) dbUpdates.emailType = updates.emailType;
    if (updates.serviceCategory) dbUpdates.category = updates.serviceCategory;
    if (updates.address) dbUpdates.address = updates.address;
    if (updates.unit) dbUpdates.unit = updates.unit;
    if (updates.description) dbUpdates.description = updates.description;
    if (updates.preferredTiming) dbUpdates.timing = updates.preferredTiming;
    if (updates.accessInfo) dbUpdates.accessInfo = updates.accessInfo;
    if (updates.rmName) dbUpdates.rmName = updates.rmName;
    if (updates.rmEmail) dbUpdates.rmEmail = updates.rmEmail;
    if (updates.tenantName) dbUpdates.tenantName = updates.tenantName;
    if (updates.tenantPhone) dbUpdates.tenantPhone = updates.tenantPhone;
    if (updates.tenantEmail) dbUpdates.tenantEmail = updates.tenantEmail;
    if (updates.pteGranted) dbUpdates.pte = updates.pteGranted;
    if (updates.estimateNeeded) dbUpdates.estimate = updates.estimateNeeded;
    if (updates.assignedTech) dbUpdates.tech = updates.assignedTech;
    if (updates.scheduledDate) dbUpdates.scheduledDate = updates.scheduledDate;
    if (updates.scheduledTime) dbUpdates.scheduledTime = updates.scheduledTime;
    if (updates.estimatedHours !== undefined) dbUpdates.estHours = updates.estimatedHours;
    if (updates.status) dbUpdates.status = updates.status;
    if (updates.notes) dbUpdates.notes = updates.notes;
    if (updates.gmailMsgId) dbUpdates.gmailMsgId = updates.gmailMsgId;
    if (updates.tenantPrefContact) dbUpdates.tenantPref = updates.tenantPrefContact;
    if (updates.tenantHasPets) dbUpdates.tenantPets = updates.tenantHasPets;
    if (updates.timestamp) dbUpdates.timestamp = new Date(updates.timestamp);

    await db.update(jobsTable).set(dbUpdates).where(eq(jobsTable.jobId, jobId));
    return { success: true };
  },

  /**
   * Creates a manual job (dispatcher-entered, no inbound email).
   * Ported from DashboardAPI.gs createManualJobDA — Neon-only insert, no Sheets row.
   * jobId format matches GAS: MANUAL-<epoch-ms>.
   */
  async createManualJob(payload: ManualJobPayload) {
    const address = (payload.address || '').trim();
    const description = (payload.description || '').trim();
    if (!address || !description) {
      return { success: false as const, error: 'address and description are required' };
    }

    const orgId = payload.entityId || 'APT-CA';
    const assignedTech = (payload.assignedTech || '').trim();
    const category = (payload.serviceCategory || '').trim();
    const status = assignedTech && payload.scheduledDate ? 'Scheduled' : 'Ready to Schedule';

    // WC code — resolve from category + tech hourly rate (GAS name match was case-insensitive)
    let wcCode: string | null = null;
    if (assignedTech && category) {
      const [tech] = await db
        .select({ hourlyRate: employeesTable.hourlyRate })
        .from(employeesTable)
        .where(and(
          eq(employeesTable.orgId, orgId),
          sql`lower(${employeesTable.name}) = ${assignedTech.toLowerCase()}`,
        ));
      wcCode = resolveWCCode(category, tech?.hourlyRate);
    }

    const [inserted] = await db.insert(jobsTable).values({
      orgId,
      jobId:         `MANUAL-${Date.now()}`,
      timestamp:     new Date(),
      priority:      payload.priority || '4-STANDARD',
      emailType:     'manual_entry',
      category:      category || null,
      address,
      unit:          payload.unit || null,
      description,
      accessInfo:    payload.accessInfo || null,
      rmName:        payload.rmName || null,
      rmEmail:       payload.rmEmail || null,
      tenantName:    payload.tenantName || null,
      tenantPhone:   payload.tenantPhone || null,
      tenantEmail:   payload.tenantEmail || null,
      pte:           'N/A',
      estimate:      'No',
      tech:          assignedTech || null,
      scheduledDate: payload.scheduledDate || null,
      scheduledTime: payload.scheduledTime || null,
      estHours:      Number(payload.estHours) || null,
      status,
      notes:         payload.notes || 'Manually entered via schedule page',
      wcCode,
    }).returning();

    return {
      success: true as const,
      leadId: inserted.jobId,
      status: inserted.status,
      job: mapJob(inserted),
    };
  }
};
