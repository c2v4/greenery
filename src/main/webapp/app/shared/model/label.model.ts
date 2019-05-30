import { ISchedulerConfig } from 'app/shared/model/scheduler-config.model';
import { INumeric } from 'app/shared/model/numeric.model';
import { IEntry } from 'app/shared/model/entry.model';

export interface ILabel {
  id?: number;
  name?: string;
  schedulerConfig?: ISchedulerConfig;
  numeric?: INumeric;
  entries?: IEntry[];
}

export class Label implements ILabel {
  constructor(
    public id?: number,
    public name?: string,
    public schedulerConfig?: ISchedulerConfig,
    public numeric?: INumeric,
    public entries?: IEntry[]
  ) {}
}
