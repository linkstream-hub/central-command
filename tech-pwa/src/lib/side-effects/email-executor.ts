import { sendTenantScheduledEmail, sendPteCoordinationEmail } from '@/lib/email';
import type { SideEffectExecutor } from '@/lib/side-effects';
import type { SideEffect } from '@/domain/job';

export class EmailSideEffectExecutor implements SideEffectExecutor {
  async execute(effect: SideEffect): Promise<void> {
    if (effect.type === 'SEND_CONFIRMATION') {
      await sendTenantScheduledEmail(
        effect.tenantEmail,
        'Resident',
        'your property',
        effect.scheduledDate,
        effect.scheduledWindow
      );
    } else if (effect.type === 'SEND_SCHEDULING_OUTREACH') {
      await sendPteCoordinationEmail(
        effect.tenantEmail,
        'Resident',
        'your property'
      );
    }
    // Other side effects (START_TIME_RECORD, CLOSE_TIME_RECORD, SEND_RESCHEDULE_LINK, NOTIFY_DISPATCHER_LINK_EXPIRED) 
    // are not handled by email-executor currently (will be handled by event-bus-executor in Phase 18).
  }
}
