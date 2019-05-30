import { IExecutorLabel } from 'app/shared/model/executor-label.model';
import { IProperty } from 'app/shared/model/property.model';

export interface IExecutorConfig {
  id?: number;
  type?: string;
  executorLabel?: IExecutorLabel;
  properties?: IProperty[];
}

export class ExecutorConfig implements IExecutorConfig {
  constructor(public id?: number, public type?: string, public executorLabel?: IExecutorLabel, public properties?: IProperty[]) {}
}
