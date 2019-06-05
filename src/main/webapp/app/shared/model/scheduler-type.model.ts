import { ISchedulerConfig } from 'app/shared/model/scheduler-config.model';

export interface ISchedulerType {
  id?: number;
  name?: string;
  schedulerConfigs?: ISchedulerConfig[];
}

export class SchedulerType implements ISchedulerType {
  constructor(public id?: number, public name?: string, public schedulerConfigs?: ISchedulerConfig[]) {}
}
