import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IExpression, Expression } from 'app/shared/model/expression.model';
import { ExpressionService } from './expression.service';
import { INumeric } from 'app/shared/model/numeric.model';
import { NumericService } from 'app/entities/numeric';
import { IPredicate } from 'app/shared/model/predicate.model';
import { PredicateService } from 'app/entities/predicate';

@Component({
  selector: 'jhi-expression-update',
  templateUrl: './expression-update.component.html'
})
export class ExpressionUpdateComponent implements OnInit {
  expression: IExpression;
  isSaving: boolean;

  lefts: INumeric[];

  rights: INumeric[];

  predicates: IPredicate[];

  editForm = this.fb.group({
    id: [],
    exressionLogic: [],
    left: [],
    right: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected expressionService: ExpressionService,
    protected numericService: NumericService,
    protected predicateService: PredicateService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ expression }) => {
      this.updateForm(expression);
      this.expression = expression;
    });
    this.numericService
      .query({ filter: 'expression-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<INumeric[]>) => mayBeOk.ok),
        map((response: HttpResponse<INumeric[]>) => response.body)
      )
      .subscribe(
        (res: INumeric[]) => {
          if (!this.expression.left || !this.expression.left.id) {
            this.lefts = res;
          } else {
            this.numericService
              .find(this.expression.left.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<INumeric>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<INumeric>) => subResponse.body)
              )
              .subscribe(
                (subRes: INumeric) => (this.lefts = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.numericService
      .query({ filter: 'expression-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<INumeric[]>) => mayBeOk.ok),
        map((response: HttpResponse<INumeric[]>) => response.body)
      )
      .subscribe(
        (res: INumeric[]) => {
          if (!this.expression.right || !this.expression.right.id) {
            this.rights = res;
          } else {
            this.numericService
              .find(this.expression.right.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<INumeric>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<INumeric>) => subResponse.body)
              )
              .subscribe(
                (subRes: INumeric) => (this.rights = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.predicateService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPredicate[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPredicate[]>) => response.body)
      )
      .subscribe((res: IPredicate[]) => (this.predicates = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(expression: IExpression) {
    this.editForm.patchValue({
      id: expression.id,
      exressionLogic: expression.exressionLogic,
      left: expression.left,
      right: expression.right
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const expression = this.createFromForm();
    if (expression.id !== undefined) {
      this.subscribeToSaveResponse(this.expressionService.update(expression));
    } else {
      this.subscribeToSaveResponse(this.expressionService.create(expression));
    }
  }

  private createFromForm(): IExpression {
    const entity = {
      ...new Expression(),
      id: this.editForm.get(['id']).value,
      exressionLogic: this.editForm.get(['exressionLogic']).value,
      left: this.editForm.get(['left']).value,
      right: this.editForm.get(['right']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExpression>>) {
    result.subscribe((res: HttpResponse<IExpression>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackNumericById(index: number, item: INumeric) {
    return item.id;
  }

  trackPredicateById(index: number, item: IPredicate) {
    return item.id;
  }
}
