import { IExecutorConfig } from 'app/shared/model/executor-config.model';

export interface IExecutorLabel {
  id?: number;
  name?: string;
  executorConfig?: IExecutorConfig;
}

export class ExecutorLabel implements IExecutorLabel {
  constructor(public id?: number, public name?: string, public executorConfig?: IExecutorConfig) {}
}
