import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPredicate, Predicate } from 'app/shared/model/predicate.model';
import { PredicateService } from './predicate.service';
import { IExpression } from 'app/shared/model/expression.model';
import { ExpressionService } from 'app/entities/expression';
import { IRule } from 'app/shared/model/rule.model';
import { RuleService } from 'app/entities/rule';

@Component({
  selector: 'jhi-predicate-update',
  templateUrl: './predicate-update.component.html'
})
export class PredicateUpdateComponent implements OnInit {
  predicate: IPredicate;
  isSaving: boolean;

  expressions: IExpression[];

  rules: IRule[];

  predicates: IPredicate[];

  editForm = this.fb.group({
    id: [],
    predicateLogic: [null, [Validators.required]],
    expression: [],
    predicate: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected predicateService: PredicateService,
    protected expressionService: ExpressionService,
    protected ruleService: RuleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ predicate }) => {
      this.updateForm(predicate);
      this.predicate = predicate;
    });
    this.expressionService
      .query({ filter: 'predicate-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IExpression[]>) => mayBeOk.ok),
        map((response: HttpResponse<IExpression[]>) => response.body)
      )
      .subscribe(
        (res: IExpression[]) => {
          if (!this.predicate.expression || !this.predicate.expression.id) {
            this.expressions = res;
          } else {
            this.expressionService
              .find(this.predicate.expression.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IExpression>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IExpression>) => subResponse.body)
              )
              .subscribe(
                (subRes: IExpression) => (this.expressions = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.ruleService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IRule[]>) => mayBeOk.ok),
        map((response: HttpResponse<IRule[]>) => response.body)
      )
      .subscribe((res: IRule[]) => (this.rules = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.predicateService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPredicate[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPredicate[]>) => response.body)
      )
      .subscribe((res: IPredicate[]) => (this.predicates = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(predicate: IPredicate) {
    this.editForm.patchValue({
      id: predicate.id,
      predicateLogic: predicate.predicateLogic,
      expression: predicate.expression,
      predicate: predicate.predicate
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const predicate = this.createFromForm();
    if (predicate.id !== undefined) {
      this.subscribeToSaveResponse(this.predicateService.update(predicate));
    } else {
      this.subscribeToSaveResponse(this.predicateService.create(predicate));
    }
  }

  private createFromForm(): IPredicate {
    const entity = {
      ...new Predicate(),
      id: this.editForm.get(['id']).value,
      predicateLogic: this.editForm.get(['predicateLogic']).value,
      expression: this.editForm.get(['expression']).value,
      predicate: this.editForm.get(['predicate']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPredicate>>) {
    result.subscribe((res: HttpResponse<IPredicate>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackExpressionById(index: number, item: IExpression) {
    return item.id;
  }

  trackRuleById(index: number, item: IRule) {
    return item.id;
  }

  trackPredicateById(index: number, item: IPredicate) {
    return item.id;
  }
}
