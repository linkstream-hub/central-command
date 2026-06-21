import type { SideEffectExecutor } from '@/lib/side-effects';
import type { SideEffect } from '@/domain/job';
import { EventBus } from '@/lib/services/event-bus';

export class EventBusSideEffectExecutor implements SideEffectExecutor {
  async execute(effect: SideEffect): Promise<void> {
    switch (effect.type) {
      case 'SEND_CONFIRMATION':
        await EventBus.publish({
          type: 'WorkOrderScheduled',
          jobId: effect.jobId,
          techId: '', // populated by FSM — extend F2 in Phase 21
          scheduledDate: effect.scheduledDate,
          scheduledTime: effect.scheduledWindow,
          tenantEmail: effect.tenantEmail,
          propertyAddress: '',
        });
        break;
      case 'SEND_SCHEDULING_OUTREACH':
        await EventBus.publish({
          type: 'PteRequired',
          jobId: effect.jobId,
          propertyAddress: '',
          pmEmail: '',
          tenantEmail: effect.tenantEmail,
        });
        break;
      case 'START_TIME_RECORD':
      case 'CLOSE_TIME_RECORD':
      case 'SEND_RESCHEDULE_LINK':
      case 'NOTIFY_DISPATCHER_LINK_EXPIRED':
        // Log only — full routing in n8n once event bus URL is live
        console.info(`[EventBusSideEffectExecutor] unrouted effect: ${effect.type}`);
        break;
    }
  }
}
