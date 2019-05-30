import { ISchedulerConfig } from 'app/shared/model/scheduler-config.model';
import { IExecutorConfig } from 'app/shared/model/executor-config.model';

export interface IProperty {
  id?: number;
  key?: string;
  value?: string;
  schedulerConfig?: ISchedulerConfig;
  executorConfig?: IExecutorConfig;
}

export class Property implements IProperty {
  constructor(
    public id?: number,
    public key?: string,
    public value?: string,
    public schedulerConfig?: ISchedulerConfig,
    public executorConfig?: IExecutorConfig
  ) {}
}
