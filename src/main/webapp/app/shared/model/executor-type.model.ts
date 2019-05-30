import { IExecutorConfig } from 'app/shared/model/executor-config.model';

export interface IExecutorType {
  id?: number;
  name?: string;
  executorConfigs?: IExecutorConfig[];
}

export class ExecutorType implements IExecutorType {
  constructor(public id?: number, public name?: string, public executorConfigs?: IExecutorConfig[]) {}
}
