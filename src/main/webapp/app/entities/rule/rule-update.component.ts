import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IRule, Rule } from 'app/shared/model/rule.model';
import { RuleService } from './rule.service';
import { IPredicate } from 'app/shared/model/predicate.model';
import { PredicateService } from 'app/entities/predicate';
import { INumeric } from 'app/shared/model/numeric.model';
import { NumericService } from 'app/entities/numeric';
import { IExecutorLabel } from 'app/shared/model/executor-label.model';
import { ExecutorLabelService } from 'app/entities/executor-label';

@Component({
  selector: 'jhi-rule-update',
  templateUrl: './rule-update.component.html'
})
export class RuleUpdateComponent implements OnInit {
  rule: IRule;
  isSaving: boolean;

  predicates: IPredicate[];

  values: INumeric[];

  executors: IExecutorLabel[];

  editForm = this.fb.group({
    id: [],
    predicate: [],
    value: [],
    executor: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected ruleService: RuleService,
    protected predicateService: PredicateService,
    protected numericService: NumericService,
    protected executorLabelService: ExecutorLabelService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ rule }) => {
      this.updateForm(rule);
      this.rule = rule;
    });
    this.predicateService
      .query({ filter: 'rule-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IPredicate[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPredicate[]>) => response.body)
      )
      .subscribe(
        (res: IPredicate[]) => {
          if (!this.rule.predicate || !this.rule.predicate.id) {
            this.predicates = res;
          } else {
            this.predicateService
              .find(this.rule.predicate.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IPredicate>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IPredicate>) => subResponse.body)
              )
              .subscribe(
                (subRes: IPredicate) => (this.predicates = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.numericService
      .query({ filter: 'rule-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<INumeric[]>) => mayBeOk.ok),
        map((response: HttpResponse<INumeric[]>) => response.body)
      )
      .subscribe(
        (res: INumeric[]) => {
          if (!this.rule.value || !this.rule.value.id) {
            this.values = res;
          } else {
            this.numericService
              .find(this.rule.value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<INumeric>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<INumeric>) => subResponse.body)
              )
              .subscribe(
                (subRes: INumeric) => (this.values = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.executorLabelService
      .query({ filter: 'rule-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IExecutorLabel[]>) => mayBeOk.ok),
        map((response: HttpResponse<IExecutorLabel[]>) => response.body)
      )
      .subscribe(
        (res: IExecutorLabel[]) => {
          if (!this.rule.executor || !this.rule.executor.id) {
            this.executors = res;
          } else {
            this.executorLabelService
              .find(this.rule.executor.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IExecutorLabel>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IExecutorLabel>) => subResponse.body)
              )
              .subscribe(
                (subRes: IExecutorLabel) => (this.executors = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(rule: IRule) {
    this.editForm.patchValue({
      id: rule.id,
      predicate: rule.predicate,
      value: rule.value,
      executor: rule.executor
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const rule = this.createFromForm();
    if (rule.id !== undefined) {
      this.subscribeToSaveResponse(this.ruleService.update(rule));
    } else {
      this.subscribeToSaveResponse(this.ruleService.create(rule));
    }
  }

  private createFromForm(): IRule {
    const entity = {
      ...new Rule(),
      id: this.editForm.get(['id']).value,
      predicate: this.editForm.get(['predicate']).value,
      value: this.editForm.get(['value']).value,
      executor: this.editForm.get(['executor']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRule>>) {
    result.subscribe((res: HttpResponse<IRule>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackPredicateById(index: number, item: IPredicate) {
    return item.id;
  }

  trackNumericById(index: number, item: INumeric) {
    return item.id;
  }

  trackExecutorLabelById(index: number, item: IExecutorLabel) {
    return item.id;
  }
}
