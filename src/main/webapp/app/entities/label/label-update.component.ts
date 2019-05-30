import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ILabel, Label } from 'app/shared/model/label.model';
import { LabelService } from './label.service';
import { ISchedulerConfig } from 'app/shared/model/scheduler-config.model';
import { SchedulerConfigService } from 'app/entities/scheduler-config';
import { INumeric } from 'app/shared/model/numeric.model';
import { NumericService } from 'app/entities/numeric';

@Component({
  selector: 'jhi-label-update',
  templateUrl: './label-update.component.html'
})
export class LabelUpdateComponent implements OnInit {
  label: ILabel;
  isSaving: boolean;

  schedulerconfigs: ISchedulerConfig[];

  numerics: INumeric[];

  editForm = this.fb.group({
    id: [],
    name: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected labelService: LabelService,
    protected schedulerConfigService: SchedulerConfigService,
    protected numericService: NumericService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ label }) => {
      this.updateForm(label);
      this.label = label;
    });
    this.schedulerConfigService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISchedulerConfig[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISchedulerConfig[]>) => response.body)
      )
      .subscribe((res: ISchedulerConfig[]) => (this.schedulerconfigs = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.numericService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<INumeric[]>) => mayBeOk.ok),
        map((response: HttpResponse<INumeric[]>) => response.body)
      )
      .subscribe((res: INumeric[]) => (this.numerics = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(label: ILabel) {
    this.editForm.patchValue({
      id: label.id,
      name: label.name
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const label = this.createFromForm();
    if (label.id !== undefined) {
      this.subscribeToSaveResponse(this.labelService.update(label));
    } else {
      this.subscribeToSaveResponse(this.labelService.create(label));
    }
  }

  private createFromForm(): ILabel {
    const entity = {
      ...new Label(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILabel>>) {
    result.subscribe((res: HttpResponse<ILabel>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackSchedulerConfigById(index: number, item: ISchedulerConfig) {
    return item.id;
  }

  trackNumericById(index: number, item: INumeric) {
    return item.id;
  }
}
