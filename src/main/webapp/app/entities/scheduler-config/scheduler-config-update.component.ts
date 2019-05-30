import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ISchedulerConfig, SchedulerConfig } from 'app/shared/model/scheduler-config.model';
import { SchedulerConfigService } from './scheduler-config.service';
import { ILabel } from 'app/shared/model/label.model';
import { LabelService } from 'app/entities/label';
import { ISchedulerType } from 'app/shared/model/scheduler-type.model';
import { SchedulerTypeService } from 'app/entities/scheduler-type';

@Component({
  selector: 'jhi-scheduler-config-update',
  templateUrl: './scheduler-config-update.component.html'
})
export class SchedulerConfigUpdateComponent implements OnInit {
  schedulerConfig: ISchedulerConfig;
  isSaving: boolean;

  labels: ILabel[];

  schedulertypes: ISchedulerType[];

  editForm = this.fb.group({
    id: [],
    label: [],
    schedulerType: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected schedulerConfigService: SchedulerConfigService,
    protected labelService: LabelService,
    protected schedulerTypeService: SchedulerTypeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ schedulerConfig }) => {
      this.updateForm(schedulerConfig);
      this.schedulerConfig = schedulerConfig;
    });
    this.labelService
      .query({ filter: 'schedulerconfig-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<ILabel[]>) => mayBeOk.ok),
        map((response: HttpResponse<ILabel[]>) => response.body)
      )
      .subscribe(
        (res: ILabel[]) => {
          if (!this.schedulerConfig.label || !this.schedulerConfig.label.id) {
            this.labels = res;
          } else {
            this.labelService
              .find(this.schedulerConfig.label.id)
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
    this.schedulerTypeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISchedulerType[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISchedulerType[]>) => response.body)
      )
      .subscribe((res: ISchedulerType[]) => (this.schedulertypes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(schedulerConfig: ISchedulerConfig) {
    this.editForm.patchValue({
      id: schedulerConfig.id,
      label: schedulerConfig.label,
      schedulerType: schedulerConfig.schedulerType
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const schedulerConfig = this.createFromForm();
    if (schedulerConfig.id !== undefined) {
      this.subscribeToSaveResponse(this.schedulerConfigService.update(schedulerConfig));
    } else {
      this.subscribeToSaveResponse(this.schedulerConfigService.create(schedulerConfig));
    }
  }

  private createFromForm(): ISchedulerConfig {
    const entity = {
      ...new SchedulerConfig(),
      id: this.editForm.get(['id']).value,
      label: this.editForm.get(['label']).value,
      schedulerType: this.editForm.get(['schedulerType']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISchedulerConfig>>) {
    result.subscribe((res: HttpResponse<ISchedulerConfig>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackLabelById(index: number, item: ILabel) {
    return item.id;
  }

  trackSchedulerTypeById(index: number, item: ISchedulerType) {
    return item.id;
  }
}
