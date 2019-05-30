import { ILabel } from 'app/shared/model/label.model';
import { IProperty } from 'app/shared/model/property.model';

export interface ISchedulerConfig {
  id?: number;
  type?: string;
  label?: ILabel;
  properties?: IProperty[];
}

export class SchedulerConfig implements ISchedulerConfig {
  constructor(public id?: number, public type?: string, public label?: ILabel, public properties?: IProperty[]) {}
}
