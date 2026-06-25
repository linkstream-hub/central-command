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
  it('maps Open to Needs Review', () => {
    expect(normalizeLegacyStatus('Open')).toBe('Needs Review');
  });

  it('maps PTE-Pending to PTE Required', () => {
    expect(normalizeLegacyStatus('PTE-Pending')).toBe('PTE Required');
  });

  it('maps Approval Needed to Awaiting Approval', () => {
    expect(normalizeLegacyStatus('Approval Needed')).toBe('Awaiting Approval');
  });

  it('maps Tenant Contacted to PTE Required', () => {
    expect(normalizeLegacyStatus('Tenant Contacted')).toBe('PTE Required');
  });

  it('maps New to Needs Review', () => {
    expect(normalizeLegacyStatus('New')).toBe('Needs Review');
  });

  it('passes through canonical status unchanged', () => {
    expect(normalizeLegacyStatus('Ready to Schedule')).toBe('Ready to Schedule');
  });

  it('defaults empty string to Needs Review', () => {
    expect(normalizeLegacyStatus('')).toBe('Needs Review');
  });
});
