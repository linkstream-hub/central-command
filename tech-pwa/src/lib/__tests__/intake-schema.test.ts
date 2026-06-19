import { describe, it, expect } from 'vitest';
import { intakeSchema } from '../intake-schema';

describe('Intake Schema', () => {
  it('validates a complete Work Order payload', () => {
    const payload = {
      type: 'work_order',
      address: '123 Main St',
      category: 'Plumbing',
      priority: 'ASAP — Safety or Habitability Issue',
      description: 'Pipe burst under sink',
      pte: 'Yes — enter without tenant present',
      rmName: 'John Doe',
      rmEmail: 'john@example.com',
    };

    const result = intakeSchema.safeParse(payload);
    expect(result.success).toBe(true);
    if (result.success && result.data.type === 'work_order') {
      expect(result.data.type).toBe('work_order');
      expect(result.data.address).toBe('123 Main St');
    }
  });

  it('validates a Lead payload', () => {
    const payload = {
      type: 'lead',
      clientName: 'Jane Smith',
      managerEmail: 'jane@example.com',
      notes: 'Interested in property management services for 50 units.',
    };

    const result = intakeSchema.safeParse(payload);
    expect(result.success).toBe(true);
    if (result.success && result.data.type === 'lead') {
      expect(result.data.type).toBe('lead');
      expect(result.data.clientName).toBe('Jane Smith');
    }
  });

  it('fails validation when Work Order is missing required fields', () => {
    const payload = {
      type: 'work_order',
      address: '123 Main St',
      // Missing category, priority, description, etc.
    };

    const result = intakeSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });
});
