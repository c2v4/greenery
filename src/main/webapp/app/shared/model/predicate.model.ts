import { IExpression } from 'app/shared/model/expression.model';
import { IPredicate } from 'app/shared/model/predicate.model';
import { IRule } from 'app/shared/model/rule.model';

export const enum PredicateLogic {
  AND = 'AND',
  OR = 'OR',
  JUST = 'JUST'
}

export interface IPredicate {
  id?: number;
  predicateLogic?: PredicateLogic;
  expression?: IExpression;
  predicates?: IPredicate[];
  rule?: IRule;
  predicate?: IPredicate;
}

export class Predicate implements IPredicate {
  constructor(
    public id?: number,
    public predicateLogic?: PredicateLogic,
    public expression?: IExpression,
    public predicates?: IPredicate[],
    public rule?: IRule,
    public predicate?: IPredicate
  ) {}
}
