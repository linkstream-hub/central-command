export interface SideEffectExecutor {
  execute(effect: import('@/domain/job').SideEffect): Promise<void>;
}
