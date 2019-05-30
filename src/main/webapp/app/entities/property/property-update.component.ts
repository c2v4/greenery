import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IProperty, Property } from 'app/shared/model/property.model';
import { PropertyService } from './property.service';
import { ISchedulerConfig } from 'app/shared/model/scheduler-config.model';
import { SchedulerConfigService } from 'app/entities/scheduler-config';
import { IExecutorConfig } from 'app/shared/model/executor-config.model';
import { ExecutorConfigService } from 'app/entities/executor-config';

@Component({
  selector: 'jhi-property-update',
  templateUrl: './property-update.component.html'
})
export class PropertyUpdateComponent implements OnInit {
  property: IProperty;
  isSaving: boolean;

  schedulerconfigs: ISchedulerConfig[];

  executorconfigs: IExecutorConfig[];

  editForm = this.fb.group({
    id: [],
    key: [null, [Validators.required]],
    value: [],
    schedulerConfig: [],
    executorConfig: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected propertyService: PropertyService,
    protected schedulerConfigService: SchedulerConfigService,
    protected executorConfigService: ExecutorConfigService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ property }) => {
      this.updateForm(property);
      this.property = property;
    });
    this.schedulerConfigService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISchedulerConfig[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISchedulerConfig[]>) => response.body)
      )
      .subscribe((res: ISchedulerConfig[]) => (this.schedulerconfigs = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.executorConfigService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IExecutorConfig[]>) => mayBeOk.ok),
        map((response: HttpResponse<IExecutorConfig[]>) => response.body)
      )
      .subscribe((res: IExecutorConfig[]) => (this.executorconfigs = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(property: IProperty) {
    this.editForm.patchValue({
      id: property.id,
      key: property.key,
      value: property.value,
      schedulerConfig: property.schedulerConfig,
      executorConfig: property.executorConfig
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const property = this.createFromForm();
    if (property.id !== undefined) {
      this.subscribeToSaveResponse(this.propertyService.update(property));
    } else {
      this.subscribeToSaveResponse(this.propertyService.create(property));
    }
  }

  private createFromForm(): IProperty {
    const entity = {
      ...new Property(),
      id: this.editForm.get(['id']).value,
      key: this.editForm.get(['key']).value,
      value: this.editForm.get(['value']).value,
      schedulerConfig: this.editForm.get(['schedulerConfig']).value,
      executorConfig: this.editForm.get(['executorConfig']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProperty>>) {
    result.subscribe((res: HttpResponse<IProperty>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackExecutorConfigById(index: number, item: IExecutorConfig) {
    return item.id;
  }
}
