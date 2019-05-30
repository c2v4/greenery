import { ILabel } from 'app/shared/model/label.model';
import { IProperty } from 'app/shared/model/property.model';
import { ISchedulerType } from 'app/shared/model/scheduler-type.model';

export interface ISchedulerConfig {
  id?: number;
  label?: ILabel;
  properties?: IProperty[];
  schedulerType?: ISchedulerType;
}

export class SchedulerConfig implements ISchedulerConfig {
  constructor(public id?: number, public label?: ILabel, public properties?: IProperty[], public schedulerType?: ISchedulerType) {}
}
