import { describe, it, expect } from 'vitest';
import { processIntakePayload } from '../intake-processor';

describe('intake processor', () => {
  it('maps a work order to jobs table format', () => {
    const payload = {
      type: 'work_order' as const,
      address: '123 Main St',
      category: 'Plumbing',
      priority: 'ASAP',
      description: 'Pipe burst',
      pte: 'Yes',
      rmName: 'John',
      rmEmail: 'john@example.com',
      timing: 'Morning',
      rmPhone: '555-1234',
    };

    const result = processIntakePayload(payload);
    expect(result.destination).toBe('jobs');
    
    // Check that rmPhone and timing are appended to notes/description
    if (result.destination === 'jobs') {
      expect(result.data.emailType).toBe('web_intake');
      expect(result.data.status).toBe('Needs Triage');
      expect(result.data.address).toBe('123 Main St');
      expect(result.data.notes).toContain('Timing preference: Morning');
      expect(result.data.notes).toContain('Manager Phone: 555-1234');
    }
  });

  it('maps a lead to new_contact_queue format', () => {
    const payload = {
      type: 'lead' as const,
      clientName: 'Jane',
      managerEmail: 'jane@example.com',
      notes: 'New account inquiry',
    };

    const result = processIntakePayload(payload);
    expect(result.destination).toBe('new_contact_queue');
    if (result.destination === 'new_contact_queue') {
      expect(result.data.clientName).toBe('Jane');
      expect(result.data.status).toBe('Pending Review');
    }
  });
});
