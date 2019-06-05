import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IExecutorConfig, ExecutorConfig } from 'app/shared/model/executor-config.model';
import { ExecutorConfigService } from './executor-config.service';
import { IExecutorLabel } from 'app/shared/model/executor-label.model';
import { ExecutorLabelService } from 'app/entities/executor-label';
import { IExecutorType } from 'app/shared/model/executor-type.model';
import { ExecutorTypeService } from 'app/entities/executor-type';

@Component({
  selector: 'jhi-executor-config-update',
  templateUrl: './executor-config-update.component.html'
})
export class ExecutorConfigUpdateComponent implements OnInit {
  executorConfig: IExecutorConfig;
  isSaving: boolean;

  executorlabels: IExecutorLabel[];

  executortypes: IExecutorType[];

  editForm = this.fb.group({
    id: [],
    executorLabel: [],
    executorType: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected executorConfigService: ExecutorConfigService,
    protected executorLabelService: ExecutorLabelService,
    protected executorTypeService: ExecutorTypeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ executorConfig }) => {
      this.updateForm(executorConfig);
      this.executorConfig = executorConfig;
    });
    this.executorLabelService
      .query({ filter: 'executorconfig-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IExecutorLabel[]>) => mayBeOk.ok),
        map((response: HttpResponse<IExecutorLabel[]>) => response.body)
      )
      .subscribe(
        (res: IExecutorLabel[]) => {
          if (!this.executorConfig.executorLabel || !this.executorConfig.executorLabel.id) {
            this.executorlabels = res;
          } else {
            this.executorLabelService
              .find(this.executorConfig.executorLabel.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IExecutorLabel>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IExecutorLabel>) => subResponse.body)
              )
              .subscribe(
                (subRes: IExecutorLabel) => (this.executorlabels = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.executorTypeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IExecutorType[]>) => mayBeOk.ok),
        map((response: HttpResponse<IExecutorType[]>) => response.body)
      )
      .subscribe((res: IExecutorType[]) => (this.executortypes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(executorConfig: IExecutorConfig) {
    this.editForm.patchValue({
      id: executorConfig.id,
      executorLabel: executorConfig.executorLabel,
      executorType: executorConfig.executorType
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const executorConfig = this.createFromForm();
    if (executorConfig.id !== undefined) {
      this.subscribeToSaveResponse(this.executorConfigService.update(executorConfig));
    } else {
      this.subscribeToSaveResponse(this.executorConfigService.create(executorConfig));
    }
  }

  private createFromForm(): IExecutorConfig {
    const entity = {
      ...new ExecutorConfig(),
      id: this.editForm.get(['id']).value,
      executorLabel: this.editForm.get(['executorLabel']).value,
      executorType: this.editForm.get(['executorType']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExecutorConfig>>) {
    result.subscribe((res: HttpResponse<IExecutorConfig>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackExecutorLabelById(index: number, item: IExecutorLabel) {
    return item.id;
  }

  trackExecutorTypeById(index: number, item: IExecutorType) {
    return item.id;
  }
}
