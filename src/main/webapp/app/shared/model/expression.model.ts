import { INumeric } from 'app/shared/model/numeric.model';
import { IPredicate } from 'app/shared/model/predicate.model';

export const enum ExpressionLogic {
  LESS = 'LESS',
  LESS_OR_EQUAL = 'LESS_OR_EQUAL',
  EQUAL = 'EQUAL',
  GREATER_OR_EQUAL = 'GREATER_OR_EQUAL',
  GREATER = 'GREATER'
}

export interface IExpression {
  id?: number;
  exressionLogic?: ExpressionLogic;
  left?: INumeric;
  right?: INumeric;
  predicate?: IPredicate;
}

export class Expression implements IExpression {
  constructor(
    public id?: number,
    public exressionLogic?: ExpressionLogic,
    public left?: INumeric,
    public right?: INumeric,
    public predicate?: IPredicate
  ) {}
}
