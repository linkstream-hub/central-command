import type { JobStatus } from './types';

interface TransitionContext {
  prevStatus: JobStatus | string | null;
  updates: {
    status?: string | null;
    tech?: string | null;
    scheduledDate?: string | null;
    scheduledTime?: string | null;
  };
  jobState: {
    tech?: string | null;
    scheduledDate?: string | null;
    scheduledTime?: string | null;
  };
}

/**
 * Enforces the "Digital Straitjacket" for job state transitions.
 * Evaluates the proposed state change and explicitly rejects invalid workflows.
 */
export function resolveJobStatus(ctx: TransitionContext): JobStatus | undefined {
  const { prevStatus, updates, jobState } = ctx;

  const targetStatus = updates.status || prevStatus;
  const effectiveTech = updates.tech !== undefined ? updates.tech : jobState.tech;
  const effectiveDate = updates.scheduledDate !== undefined ? updates.scheduledDate : jobState.scheduledDate;
  const effectiveTime = updates.scheduledTime !== undefined ? updates.scheduledTime : jobState.scheduledTime;

  // 1. Digital Straitjacket: Prevent 'Scheduled' without assignments
  if (targetStatus === 'Scheduled') {
    if (!effectiveTech || !effectiveDate || !effectiveTime) {
      throw new Error('FSM Constraint Violation: You cannot mark a job as Scheduled without assigning a Technician, Date, and Time.');
    }
  }

  // 2. Auto-Transition: RtS -> Scheduled if constraints are met
  if (prevStatus === 'Ready to Schedule' && updates.status !== 'Scheduled') {
    if (effectiveTech && effectiveDate && effectiveTime) {
      return 'Scheduled';
    }
  }

  return updates.status as JobStatus | undefined;
}

export type EmailTrigger = 'scheduled' | 'pte-required' | 'none';

export function resolveEmailTrigger(newStatus: string, prevStatus: string | null | undefined): EmailTrigger {
  if (newStatus === 'Scheduled' && prevStatus !== 'Scheduled') return 'scheduled';
  if (newStatus === 'PTE Required' && prevStatus !== 'PTE Required') return 'pte-required';
  return 'none';
}
