import { describe, it, expect } from 'vitest';
import type { JobStatus } from '../types';
import { resolveJobStatus, resolveEmailTrigger } from '../job-transitions';

// ─── resolveJobStatus ───────────────────────────────────────────────────────

describe('resolveJobStatus — RtS auto-transition', () => {

  it('promotes RtS → Scheduled when tech + date + time all present in updates', () => {
    const result = resolveJobStatus({
      prevStatus: 'Ready to Schedule' as JobStatus,
      updates: { tech: 'John D.', scheduledDate: '2026-06-01', scheduledTime: '9:00 AM' },
      jobState: { tech: null, scheduledDate: null, scheduledTime: null },
    });
    expect(result).toBe('Scheduled');
  });

  it('promotes RtS → Scheduled when date/time come from jobState (not updates)', () => {
    const result = resolveJobStatus({
      prevStatus: 'Ready to Schedule' as JobStatus,
      updates: { tech: 'John D.' },
      jobState: { tech: null, scheduledDate: '2026-06-01', scheduledTime: '9:00 AM' },
    });
    expect(result).toBe('Scheduled');
  });

  it('does NOT auto-transition when tech is missing', () => {
    const result = resolveJobStatus({
      prevStatus: 'Ready to Schedule' as JobStatus,
      updates: { scheduledDate: '2026-06-01', scheduledTime: '9:00 AM' },
      jobState: { tech: null, scheduledDate: null, scheduledTime: null },
    });
    expect(result).not.toBe('Scheduled');
  });

  it('does NOT auto-transition when date is missing', () => {
    const result = resolveJobStatus({
      prevStatus: 'Ready to Schedule' as JobStatus,
      updates: { tech: 'John D.', scheduledTime: '9:00 AM' },
      jobState: { tech: null, scheduledDate: null, scheduledTime: null },
    });
    expect(result).not.toBe('Scheduled');
  });

  it('does NOT auto-transition when time is missing', () => {
    const result = resolveJobStatus({
      prevStatus: 'Ready to Schedule' as JobStatus,
      updates: { tech: 'John D.', scheduledDate: '2026-06-01' },
      jobState: { tech: null, scheduledDate: null, scheduledTime: null },
    });
    expect(result).not.toBe('Scheduled');
  });

  it('does NOT auto-transition when status is explicitly set to Scheduled (caller already set it)', () => {
    const result = resolveJobStatus({
      prevStatus: 'Ready to Schedule' as JobStatus,
      updates: { status: 'Scheduled', tech: 'John D.', scheduledDate: '2026-06-01', scheduledTime: '9:00 AM' },
      jobState: { tech: null, scheduledDate: null, scheduledTime: null },
    });
    // Explicit status passes through — auto-transition condition is skipped
    expect(result).toBe('Scheduled');
  });

  it('does NOT auto-transition from a non-RtS status (e.g. Needs Review)', () => {
    const result = resolveJobStatus({
      prevStatus: 'Needs Review' as JobStatus,
      updates: { tech: 'John D.', scheduledDate: '2026-06-01', scheduledTime: '9:00 AM' },
      jobState: { tech: null, scheduledDate: null, scheduledTime: null },
    });
    expect(result).not.toBe('Scheduled');
  });

  it('returns the explicit status when no auto-transition applies', () => {
    const result = resolveJobStatus({
      prevStatus: 'Needs Review' as JobStatus,
      updates: { status: 'PTE Required' },
      jobState: { tech: null, scheduledDate: null, scheduledTime: null },
    });
    expect(result).toBe('PTE Required');
  });

  it('returns undefined when no status in updates and no auto-transition', () => {
    const result = resolveJobStatus({
      prevStatus: 'Needs Review' as JobStatus,
      updates: { tech: 'John D.' },
      jobState: { tech: null, scheduledDate: null, scheduledTime: null },
    });
    expect(result).toBeUndefined();
  });

});

// ─── resolveEmailTrigger ────────────────────────────────────────────────────

describe('resolveEmailTrigger — tenant email decisions', () => {

  it('returns "scheduled" when transitioning to Scheduled from a different status', () => {
    expect(resolveEmailTrigger('Scheduled', 'Ready to Schedule')).toBe('scheduled');
    expect(resolveEmailTrigger('Scheduled', 'Needs Review')).toBe('scheduled');
    expect(resolveEmailTrigger('Scheduled', null)).toBe('scheduled');
  });

  it('returns "none" when already Scheduled (no duplicate email)', () => {
    expect(resolveEmailTrigger('Scheduled', 'Scheduled')).toBe('none');
  });

  it('returns "pte-required" when transitioning to PTE Required from a different status', () => {
    expect(resolveEmailTrigger('PTE Required', 'Needs Review')).toBe('pte-required');
    expect(resolveEmailTrigger('PTE Required', 'Ready to Schedule')).toBe('pte-required');
  });

  it('returns "none" when already PTE Required (no duplicate email)', () => {
    expect(resolveEmailTrigger('PTE Required', 'PTE Required')).toBe('none');
  });

  it('returns "none" for all other status transitions', () => {
    expect(resolveEmailTrigger('Needs Review', 'Scheduled')).toBe('none');
    expect(resolveEmailTrigger('In Progress', 'Scheduled')).toBe('none');
    expect(resolveEmailTrigger('Complete', 'In Progress')).toBe('none');
    expect(resolveEmailTrigger('Archived', 'Complete')).toBe('none');
  });

});
