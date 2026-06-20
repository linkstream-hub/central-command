import { db } from '@/lib/db';
import { jobs } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { resolveJobStatus, resolveEmailTrigger } from '@/lib/job-transitions';
import { createJobStateService, toJobId, toTechId } from '@/domain/job';
import { makeJobStateDAL } from '@/lib/dal/job-state-dal';
import type { SideEffect, Result } from '@/domain/job';
import type { JobStatus } from '@/lib/types';

export interface SideEffectExecutor {
  execute(effect: SideEffect): Promise<void>;
}

export type JobUpdateError =
  | { code: 'JOB_NOT_FOUND' }
  | { code: 'SCHEDULE_INCOMPLETE'; missing: string[] }
  | { code: 'FSM_VIOLATION'; reason: string };

export type JobUpdateSuccess =
  | { type: 'NO_OP' }
  | { type: 'UPDATED'; warning?: string };

export async function apply(
  jobId: string,
  body: any,
  ctx: { isApiKeyAuth: boolean },
  executor: SideEffectExecutor
): Promise<Result<JobUpdateSuccess, JobUpdateError>> {
  // 1. Map body -> updates
  const updates: Partial<typeof jobs.$inferInsert> = {};

  if (body.assignedTech !== undefined) updates.tech = body.assignedTech;
  if (body.serviceCategory !== undefined) updates.category = body.serviceCategory;
  if (body.estHours !== undefined) updates.estHours = body.estHours;
  if (body.rmName !== undefined) updates.rmName = body.rmName;
  if (body.rmEmail !== undefined) updates.rmEmail = body.rmEmail;
  if (body.tenantName !== undefined) updates.tenantName = body.tenantName;
  if (body.tenantPhone !== undefined) updates.tenantPhone = body.tenantPhone;
  if (body.tenantEmail !== undefined) updates.tenantEmail = body.tenantEmail;
  if (body.accessInfo !== undefined) updates.accessInfo = body.accessInfo;
  if (body.scheduledDate !== undefined) updates.scheduledDate = body.scheduledDate;
  if (body.scheduledTime !== undefined) updates.scheduledTime = body.scheduledTime;
  if (body.status !== undefined) updates.status = body.status;
  if (body.notes !== undefined) updates.notes = body.notes;
  if (body.address !== undefined) updates.address = body.address;
  if (body.unit !== undefined) updates.unit = body.unit;
  if (body.description !== undefined) updates.description = body.description;
  if (body.priority !== undefined) updates.priority = body.priority;
  if (body.emailType !== undefined) updates.emailType = body.emailType;
  if (body.gmailMsgId !== undefined) updates.gmailMsgId = body.gmailMsgId;
  if (body.pteGranted !== undefined) updates.pte = body.pteGranted;
  if (body.timing !== undefined) updates.timing = body.timing;
  if (body.tenantPref !== undefined) updates.tenantPref = body.tenantPref;
  if (body.tenantPets !== undefined) updates.tenantPets = body.tenantPets;
  if (body.wcCode !== undefined) updates.wcCode = body.wcCode;

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
    // 4b. Legacy path
    const resolvedStatus = resolveJobStatus({ prevStatus: prevStatus as JobStatus, updates, jobState });
    if (resolvedStatus) updates.status = resolvedStatus;

    if (!ctx.isApiKeyAuth && updates.status && updates.status !== prevStatus) {
      const email = body.tenantEmail || jobState.tenantEmail;
      
      if (email && email.includes('@')) {
        const trigger = resolveEmailTrigger(updates.status, prevStatus);
        
        try {
          if (trigger === 'scheduled') {
            await executor.execute({
              type: 'SEND_CONFIRMATION',
              jobId: toJobId(jobId),
              tenantEmail: email,
              scheduledDate: body.scheduledDate || jobState.scheduledDate || '',
              scheduledWindow: body.scheduledTime || jobState.scheduledTime || 'morning'
            });
          } else if (trigger === 'pte-required') {
            // Note: In Phase 21 this will be real token and jobId, currently mapped to Outreach effect
            await executor.execute({
              type: 'SEND_SCHEDULING_OUTREACH',
              jobId: toJobId(jobId),
              tenantEmail: email,
              token: 'legacy-token' as any // Dummy for type safety as email-executor doesn't use it
            });
          }
        } catch (e) {
          console.error('[job-update] legacy side effect failed:', e);
          warning = 'Status updated but tenant notification email failed to send.';
        }
      }
    }
  }

  // 5. Update DB
  if (Object.keys(updates).length > 0) {
    await db.update(jobs).set(updates).where(eq(jobs.jobId, jobId));
  }

  return { ok: true, value: { type: 'UPDATED', ...(warning ? { warning } : {}) } };
}
