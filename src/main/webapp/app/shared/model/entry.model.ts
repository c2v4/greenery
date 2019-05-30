import { Moment } from 'moment';
import { ILabel } from 'app/shared/model/label.model';

export interface IEntry {
  id?: number;
  value?: number;
  date?: Moment;
  label?: ILabel;
}

export class Entry implements IEntry {
  constructor(public id?: number, public value?: number, public date?: Moment, public label?: ILabel) {}
}
