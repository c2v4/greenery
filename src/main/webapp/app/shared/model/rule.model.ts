import { IPredicate } from 'app/shared/model/predicate.model';
import { INumeric } from 'app/shared/model/numeric.model';
import { IExecutorLabel } from 'app/shared/model/executor-label.model';

export interface IRule {
  id?: number;
  predicate?: IPredicate;
  value?: INumeric;
  executor?: IExecutorLabel;
}

export class Rule implements IRule {
  constructor(public id?: number, public predicate?: IPredicate, public value?: INumeric, public executor?: IExecutorLabel) {}
}
