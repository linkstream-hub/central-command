import { describe, it, expect } from 'vitest';
import { mapJob, normalizeLegacyStatus } from '../mappers';

describe('mapJob', () => {
  it('converts Date timestamp to ISO string', () => {
    const d = new Date('2026-06-24T12:00:00.000Z');
    const job = mapJob({ jobId: 'J1', timestamp: d });
    expect(job.timestamp).toBe(d.toISOString());
  });

  it('passes string timestamp through unchanged', () => {
    const job = mapJob({ jobId: 'J1', timestamp: '2026-06-24' });
    expect(job.timestamp).toBe('2026-06-24');
  });

  it('defaults empty timestamp to empty string', () => {
    const job = mapJob({ jobId: 'J1' });
    expect(job.timestamp).toBe('');
  });

  it('maps Neon row shape — all known fields', () => {
    const row = {
      jobId: 'J-123',
      category: 'Plumbing',
      priority: '1-URGENT',
      address: '507 Magnolia Ave',
      unit: '3',
      description: 'Broken pipe',
      scheduledDate: '2026-06-24',
      scheduledTime: '09:00',
      estHours: 2,
      status: 'Needs Review',
      rmName: 'Joy',
      rmEmail: 'joy@test.com',
      accessInfo: '1234',
      tenantName: 'Sam',
      tenantPhone: '5105551234',
      tenantEmail: 'sam@test.com',
      tech: 'Marco',
      notes: 'note',
      gmailMsgId: 'abc',
      emailType: 'adhoc_workorder',
      timing: 'morning',
      estimate: 'needed',
      pte: 'Yes',
      tenantPref: 'email',
      tenantPets: 'dog',
      timestamp: new Date('2026-06-24T00:00:00Z'),
      clockedInAt: '2026-06-24T09:00:00Z',
      activeRecordId: 'rec-1',
    };
    const job = mapJob(row);
    expect(job.jobId).toBe('J-123');
    expect(job.serviceCategory).toBe('Plumbing');
    expect(job.assignedTech).toBe('Marco');
    expect(job.pteGranted).toBe('Yes');
    expect(job.timestamp).toBe(new Date('2026-06-24T00:00:00Z').toISOString());
    expect(job.clockedInAt).toBe('2026-06-24T09:00:00Z');
  });

  it('defaults estimatedHours to 0 when missing', () => {
    const job = mapJob({ jobId: 'J1' });
    expect(job.estimatedHours).toBe(0);
  });
});

describe('normalizeLegacyStatus', () => {
  // Legacy GAS aliases → 'Needs Info'
  it('maps Open to Needs Info', () => {
    expect(normalizeLegacyStatus('Open')).toBe('Needs Info');
  });

  it('maps New to Needs Info', () => {
    expect(normalizeLegacyStatus('New')).toBe('Needs Info');
  });

  it('maps PTE-Pending to Needs Info', () => {
    expect(normalizeLegacyStatus('PTE-Pending')).toBe('Needs Info');
  });

  it('maps Tenant Contacted to Needs Info', () => {
    expect(normalizeLegacyStatus('Tenant Contacted')).toBe('Needs Info');
  });

  it('maps Approval Needed to Needs Info', () => {
    expect(normalizeLegacyStatus('Approval Needed')).toBe('Needs Info');
  });

  // Retired intermediate states → 'Needs Info'
  it('maps Needs Review to Needs Info', () => {
    expect(normalizeLegacyStatus('Needs Review')).toBe('Needs Info');
  });

  it('maps PTE Required to Needs Info', () => {
    expect(normalizeLegacyStatus('PTE Required')).toBe('Needs Info');
  });

  it('maps Awaiting Approval to Needs Info', () => {
    expect(normalizeLegacyStatus('Awaiting Approval')).toBe('Needs Info');
  });

  // Current canonical states pass through unchanged
  it('passes through Needs Info unchanged', () => {
    expect(normalizeLegacyStatus('Needs Info')).toBe('Needs Info');
  });

  it('passes through Scheduled unchanged', () => {
    expect(normalizeLegacyStatus('Scheduled')).toBe('Scheduled');
  });

  it('passes through Ready to Schedule unchanged', () => {
    expect(normalizeLegacyStatus('Ready to Schedule')).toBe('Ready to Schedule');
  });

  it('passes through In Progress unchanged', () => {
    expect(normalizeLegacyStatus('In Progress')).toBe('In Progress');
  });

  it('passes through Archived unchanged', () => {
    expect(normalizeLegacyStatus('Archived')).toBe('Archived');
  });

  // Empty / null-ish fallback
  it('defaults empty string to Needs Info', () => {
    expect(normalizeLegacyStatus('')).toBe('Needs Info');
  });
});
