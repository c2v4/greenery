import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { INumeric, Numeric } from 'app/shared/model/numeric.model';
import { NumericService } from './numeric.service';
import { ILabel } from 'app/shared/model/label.model';
import { LabelService } from 'app/entities/label';

@Component({
  selector: 'jhi-numeric-update',
  templateUrl: './numeric-update.component.html'
})
export class NumericUpdateComponent implements OnInit {
  numeric: INumeric;
  isSaving: boolean;

  lefts: INumeric[];

  rights: INumeric[];

  labels: ILabel[];

  editForm = this.fb.group({
    id: [],
    value: [],
    operation: [],
    left: [],
    right: [],
    label: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected numericService: NumericService,
    protected labelService: LabelService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ numeric }) => {
      this.updateForm(numeric);
      this.numeric = numeric;
    });
    this.numericService
      .query({ filter: 'numeric-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<INumeric[]>) => mayBeOk.ok),
        map((response: HttpResponse<INumeric[]>) => response.body)
      )
      .subscribe(
        (res: INumeric[]) => {
          if (!this.numeric.left || !this.numeric.left.id) {
            this.lefts = res;
          } else {
            this.numericService
              .find(this.numeric.left.id)
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
      .query({ filter: 'numeric-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<INumeric[]>) => mayBeOk.ok),
        map((response: HttpResponse<INumeric[]>) => response.body)
      )
      .subscribe(
        (res: INumeric[]) => {
          if (!this.numeric.right || !this.numeric.right.id) {
            this.rights = res;
          } else {
            this.numericService
              .find(this.numeric.right.id)
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
    this.labelService
      .query({ filter: 'numeric-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<ILabel[]>) => mayBeOk.ok),
        map((response: HttpResponse<ILabel[]>) => response.body)
      )
      .subscribe(
        (res: ILabel[]) => {
          if (!this.numeric.label || !this.numeric.label.id) {
            this.labels = res;
          } else {
            this.labelService
              .find(this.numeric.label.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<ILabel>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<ILabel>) => subResponse.body)
              )
              .subscribe(
                (subRes: ILabel) => (this.labels = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(numeric: INumeric) {
    this.editForm.patchValue({
      id: numeric.id,
      value: numeric.value,
      operation: numeric.operation,
      left: numeric.left,
      right: numeric.right,
      label: numeric.label
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const numeric = this.createFromForm();
    if (numeric.id !== undefined) {
      this.subscribeToSaveResponse(this.numericService.update(numeric));
    } else {
      this.subscribeToSaveResponse(this.numericService.create(numeric));
    }
  }

  private createFromForm(): INumeric {
    const entity = {
      ...new Numeric(),
      id: this.editForm.get(['id']).value,
      value: this.editForm.get(['value']).value,
      operation: this.editForm.get(['operation']).value,
      left: this.editForm.get(['left']).value,
      right: this.editForm.get(['right']).value,
      label: this.editForm.get(['label']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INumeric>>) {
    result.subscribe((res: HttpResponse<INumeric>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackLabelById(index: number, item: ILabel) {
    return item.id;
  }
}
