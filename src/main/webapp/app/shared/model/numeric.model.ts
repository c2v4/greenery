import { INumeric } from 'app/shared/model/numeric.model';
import { ILabel } from 'app/shared/model/label.model';

export const enum Operation {
  ADD = 'ADD',
  SUBTRACT = 'SUBTRACT',
  MULTIPLY = 'MULTIPLY',
  DIVIDE = 'DIVIDE',
  MAX = 'MAX',
  MIN = 'MIN'
}

export interface INumeric {
  id?: number;
  value?: number;
  operation?: Operation;
  left?: INumeric;
  right?: INumeric;
  label?: ILabel;
}

export class Numeric implements INumeric {
  constructor(
    public id?: number,
    public value?: number,
    public operation?: Operation,
    public left?: INumeric,
    public right?: INumeric,
    public label?: ILabel
  ) {}
}
