import { db } from '@/lib/db';
import { jobs } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { createJobStateService, toJobId, toTechId } from '@/domain/job';
import { makeJobStateDAL } from '@/lib/dal/job-state-dal';
import type { Result } from '@/domain/job';

import type { SideEffectExecutor } from '@/lib/side-effects';

export type JobUpdateError =
  | { code: 'JOB_NOT_FOUND' }
  | { code: 'SCHEDULE_INCOMPLETE'; missing: string[] }
  | { code: 'FSM_VIOLATION'; reason: string };

export type JobUpdateSuccess =
  | { type: 'NO_OP' }
  | { type: 'UPDATED'; warning?: string };

type JobUpdateBody = {
  assignedTech?: string; serviceCategory?: string; estHours?: number;
  rmName?: string; rmEmail?: string; tenantName?: string; tenantPhone?: string;
  tenantEmail?: string; accessInfo?: string; scheduledDate?: string;
  scheduledTime?: string; status?: string; notes?: string; address?: string;
  unit?: string; description?: string; priority?: string; emailType?: string;
  gmailMsgId?: string; pteGranted?: string; timing?: string; tenantPref?: string;
  tenantPets?: string; wcCode?: string;
};

export async function apply(
  jobId: string,
  body: Record<string, unknown>,
  ctx: { isApiKeyAuth: boolean },
  executor: SideEffectExecutor
): Promise<Result<JobUpdateSuccess, JobUpdateError>> {
  const b = body as JobUpdateBody;
  // 1. Map body -> updates
  const updates: Partial<typeof jobs.$inferInsert> = {};

  if (b.assignedTech !== undefined) updates.tech = b.assignedTech;
  if (b.serviceCategory !== undefined) updates.category = b.serviceCategory;
  if (b.estHours !== undefined) updates.estHours = b.estHours;
  if (b.rmName !== undefined) updates.rmName = b.rmName;
  if (b.rmEmail !== undefined) updates.rmEmail = b.rmEmail;
  if (b.tenantName !== undefined) updates.tenantName = b.tenantName;
  if (b.tenantPhone !== undefined) updates.tenantPhone = b.tenantPhone;
  if (b.tenantEmail !== undefined) updates.tenantEmail = b.tenantEmail;
  if (b.accessInfo !== undefined) updates.accessInfo = b.accessInfo;
  if (b.scheduledDate !== undefined) updates.scheduledDate = b.scheduledDate;
  if (b.scheduledTime !== undefined) updates.scheduledTime = b.scheduledTime;
  if (b.status !== undefined) updates.status = b.status;
  if (b.notes !== undefined) updates.notes = b.notes;
  if (b.address !== undefined) updates.address = b.address;
  if (b.unit !== undefined) updates.unit = b.unit;
  if (b.description !== undefined) updates.description = b.description;
  if (b.priority !== undefined) updates.priority = b.priority;
  if (b.emailType !== undefined) updates.emailType = b.emailType;
  if (b.gmailMsgId !== undefined) updates.gmailMsgId = b.gmailMsgId;
  if (b.pteGranted !== undefined) updates.pte = b.pteGranted;
  if (b.timing !== undefined) updates.timing = b.timing;
  if (b.tenantPref !== undefined) updates.tenantPref = b.tenantPref;
  if (b.tenantPets !== undefined) updates.tenantPets = b.tenantPets;
  if (b.wcCode !== undefined) updates.wcCode = b.wcCode;

  // 2. If no recognized fields -> return NO_OP
  if (Object.keys(updates).length === 0) {
    return { ok: true, value: { type: 'NO_OP' } };
  }

  // 3. SELECT current job state from DB
  const currentJobs = await db.select({
    status: jobs.status,
    tech: jobs.tech,
    scheduledDate: jobs.scheduledDate,
    scheduledTime: jobs.scheduledTime,
    tenantEmail: jobs.tenantEmail,
    tenantName: jobs.tenantName,
    address: jobs.address
  })
    .from(jobs)
    .where(eq(jobs.jobId, jobId))
    .limit(1);

  const jobState = currentJobs[0];
  if (!jobState) {
    return { ok: false, error: { code: 'JOB_NOT_FOUND' } };
  }

  const prevStatus = jobState.status;
  let warning: string | undefined;

  // 4. willSchedule detection
  const willSchedule =
    prevStatus === 'Ready to Schedule' &&
    (updates.tech !== undefined || updates.scheduledDate !== undefined || updates.scheduledTime !== undefined);

  if (willSchedule) {
    // 4a. FSM path
    const effectiveTech = updates.tech ?? jobState.tech;
    const effectiveDate = updates.scheduledDate ?? jobState.scheduledDate;
    const effectiveTime = updates.scheduledTime ?? jobState.scheduledTime;

    if (!effectiveTech || !effectiveDate || !effectiveTime) {
      const missing = [];
      if (!effectiveTech) missing.push('tech');
      if (!effectiveDate) missing.push('scheduledDate');
      if (!effectiveTime) missing.push('scheduledTime');
      return { ok: false, error: { code: 'SCHEDULE_INCOMPLETE', missing } };
    }

    const window = effectiveTime === 'morning' || effectiveTime === 'afternoon' || effectiveTime === 'late_afternoon'
      ? effectiveTime
      : 'morning';

    const svc = createJobStateService(makeJobStateDAL());
    const fsmResult = await svc.transition({
      type: 'SCHEDULE',
      payload: {
        jobId: toJobId(jobId),
        techId: toTechId(effectiveTech),
        scheduledDate: effectiveDate,
        scheduledWindow: window,
      },
    });

    if (!fsmResult.ok) {
      return { ok: false, error: { code: 'FSM_VIOLATION', reason: fsmResult.error.code } };
    }

    delete updates.status;
    delete updates.tech;
    delete updates.scheduledDate;
    delete updates.scheduledTime;

    if (!ctx.isApiKeyAuth) {
      for (const effect of fsmResult.value.sideEffects) {
        try {
          await executor.execute(effect);
        } catch (e) {
          console.error('[job-update] side effect failed:', e);
          warning = 'Status updated but tenant notification email failed to send.';
        }
      }
    }
  } else {
    // Straitjacket: 'Scheduled' is only valid via the FSM SCHEDULE path (willSchedule=true).
    // Direct status='Scheduled' requires all three scheduling fields to be present.
    if (updates.status === 'Scheduled') {
      const missing: string[] = [];
      if (!updates.tech && !jobState.tech) missing.push('tech');
      if (!updates.scheduledDate && !jobState.scheduledDate) missing.push('scheduledDate');
      if (!updates.scheduledTime && !jobState.scheduledTime) missing.push('scheduledTime');
      if (missing.length > 0) {
        return { ok: false, error: { code: 'SCHEDULE_INCOMPLETE', missing } };
      }
    }
  }

  // 5. Update DB
  if (Object.keys(updates).length > 0) {
    await db.update(jobs).set(updates).where(eq(jobs.jobId, jobId));
  }

  return { ok: true, value: { type: 'UPDATED', ...(warning ? { warning } : {}) } };
}
