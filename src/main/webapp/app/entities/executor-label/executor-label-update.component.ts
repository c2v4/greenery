import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IExecutorLabel, ExecutorLabel } from 'app/shared/model/executor-label.model';
import { ExecutorLabelService } from './executor-label.service';
import { IExecutorConfig } from 'app/shared/model/executor-config.model';
import { ExecutorConfigService } from 'app/entities/executor-config';

@Component({
  selector: 'jhi-executor-label-update',
  templateUrl: './executor-label-update.component.html'
})
export class ExecutorLabelUpdateComponent implements OnInit {
  executorLabel: IExecutorLabel;
  isSaving: boolean;

  executorconfigs: IExecutorConfig[];

  editForm = this.fb.group({
    id: [],
    name: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected executorLabelService: ExecutorLabelService,
    protected executorConfigService: ExecutorConfigService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ executorLabel }) => {
      this.updateForm(executorLabel);
      this.executorLabel = executorLabel;
    });
    this.executorConfigService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IExecutorConfig[]>) => mayBeOk.ok),
        map((response: HttpResponse<IExecutorConfig[]>) => response.body)
      )
      .subscribe((res: IExecutorConfig[]) => (this.executorconfigs = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(executorLabel: IExecutorLabel) {
    this.editForm.patchValue({
      id: executorLabel.id,
      name: executorLabel.name
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const executorLabel = this.createFromForm();
    if (executorLabel.id !== undefined) {
      this.subscribeToSaveResponse(this.executorLabelService.update(executorLabel));
    } else {
      this.subscribeToSaveResponse(this.executorLabelService.create(executorLabel));
    }
  }

  private createFromForm(): IExecutorLabel {
    const entity = {
      ...new ExecutorLabel(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExecutorLabel>>) {
    result.subscribe((res: HttpResponse<IExecutorLabel>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackExecutorConfigById(index: number, item: IExecutorConfig) {
    return item.id;
  }
}
