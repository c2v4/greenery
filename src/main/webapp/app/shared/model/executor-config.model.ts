import { IExecutorLabel } from 'app/shared/model/executor-label.model';
import { IProperty } from 'app/shared/model/property.model';
import { IExecutorType } from 'app/shared/model/executor-type.model';

export interface IExecutorConfig {
  id?: number;
  executorLabel?: IExecutorLabel;
  properties?: IProperty[];
  executorType?: IExecutorType;
}

export class ExecutorConfig implements IExecutorConfig {
  constructor(
    public id?: number,
    public executorLabel?: IExecutorLabel,
    public properties?: IProperty[],
    public executorType?: IExecutorType
  ) {}
}
