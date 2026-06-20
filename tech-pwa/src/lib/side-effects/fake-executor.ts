import type { SideEffect } from '@/domain/job';
import type { SideEffectExecutor } from '@/app/api/jobs/[jobId]/job-update';

export class FakeSideEffectExecutor implements SideEffectExecutor {
  public executed: SideEffect[] = [];
  public shouldThrow: boolean = false;

  async execute(effect: SideEffect): Promise<void> {
    if (this.shouldThrow) throw new Error('Fake executor throw');
    this.executed.push(effect);
  }
}
