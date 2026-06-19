// Narrow public API for domain/job — ADR-014 (Pocock deep-module pattern).
// All callers: import from '@/domain/job'
// Never: import from '@/domain/job/job-state' directly

export type {
  JobId,
  TechId,
  SchedulingToken,
  JobState,
  WoType,
  ArrivalWindow,
  JobEvent,
  JobEventType,
  AdvanceEvent,
  RequestTenantSchedulingEvent,
  TenantSubmittedEvent,
  TenantLinkExpiredEvent,
  ScheduleEvent,
  RescheduleEvent,
  ClockInEvent,
  CompleteEvent,
  Result,
  JobStateError,
  JobStateRecord,
  TransitionResult,
  SideEffect,
  JobStateService,
  JobStateDAL,
  TransitionDefinition,
  JobStateMachine,
} from './job-state';

export {
  toJobId,
  toTechId,
  JOB_STATES,
  JOB_STATE_MACHINE,
  createJobStateService,
} from './job-state';
