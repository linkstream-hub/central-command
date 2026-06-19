import { IntakeFormData } from './intake-schema';
import { jobs, newContactQueue } from './schema';

type JobInsert = typeof jobs.$inferInsert;
type LeadInsert = typeof newContactQueue.$inferInsert;

export function processIntakePayload(payload: IntakeFormData) {
  if (payload.type === 'work_order') {
    const notes = [
      payload.timing ? `Timing preference: ${payload.timing}` : '',
      payload.rmPhone ? `Manager Phone: ${payload.rmPhone}` : '',
      payload.tenantPets ? `Pets in unit: ${payload.tenantPets}` : '',
    ].filter(Boolean).join('\n');

    const jobData: JobInsert = {
      jobId: `WO-WEB-${Date.now()}`,
      timestamp: new Date(),
      emailType: 'web_intake',
      status: 'Needs Triage',
      priority: payload.priority,
      category: payload.category,
      address: payload.address,
      unit: payload.unit || null,
      description: payload.description,
      pte: payload.pte,
      accessInfo: payload.accessInfo || null,
      rmName: payload.rmName,
      rmEmail: payload.rmEmail,
      tenantName: payload.tenantName || null,
      tenantPhone: payload.tenantPhone || null,
      tenantEmail: payload.tenantEmail || null,
      notes: notes || null,
    };

    return { destination: 'jobs' as const, data: jobData };
  } else {
    const leadData: LeadInsert = {
      sourceLeadId: `LEAD-WEB-${Date.now()}`,
      clientName: payload.clientName,
      managerEmail: payload.managerEmail,
      address: payload.address || null,
      notes: payload.notes,
      status: 'Pending Review',
    };

    return { destination: 'new_contact_queue' as const, data: leadData };
  }
}
