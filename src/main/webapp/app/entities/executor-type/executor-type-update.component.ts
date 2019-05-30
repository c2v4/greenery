import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IExecutorType, ExecutorType } from 'app/shared/model/executor-type.model';
import { ExecutorTypeService } from './executor-type.service';

@Component({
  selector: 'jhi-executor-type-update',
  templateUrl: './executor-type-update.component.html'
})
export class ExecutorTypeUpdateComponent implements OnInit {
  executorType: IExecutorType;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: []
  });

  constructor(protected executorTypeService: ExecutorTypeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ executorType }) => {
      this.updateForm(executorType);
      this.executorType = executorType;
    });
  }

  updateForm(executorType: IExecutorType) {
    this.editForm.patchValue({
      id: executorType.id,
      name: executorType.name
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const executorType = this.createFromForm();
    if (executorType.id !== undefined) {
      this.subscribeToSaveResponse(this.executorTypeService.update(executorType));
    } else {
      this.subscribeToSaveResponse(this.executorTypeService.create(executorType));
    }
  }

  private createFromForm(): IExecutorType {
    const entity = {
      ...new ExecutorType(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExecutorType>>) {
    result.subscribe((res: HttpResponse<IExecutorType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
