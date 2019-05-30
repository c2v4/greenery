import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ISchedulerType, SchedulerType } from 'app/shared/model/scheduler-type.model';
import { SchedulerTypeService } from './scheduler-type.service';

@Component({
  selector: 'jhi-scheduler-type-update',
  templateUrl: './scheduler-type-update.component.html'
})
export class SchedulerTypeUpdateComponent implements OnInit {
  schedulerType: ISchedulerType;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: []
  });

  constructor(protected schedulerTypeService: SchedulerTypeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ schedulerType }) => {
      this.updateForm(schedulerType);
      this.schedulerType = schedulerType;
    });
  }

  updateForm(schedulerType: ISchedulerType) {
    this.editForm.patchValue({
      id: schedulerType.id,
      name: schedulerType.name
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const schedulerType = this.createFromForm();
    if (schedulerType.id !== undefined) {
      this.subscribeToSaveResponse(this.schedulerTypeService.update(schedulerType));
    } else {
      this.subscribeToSaveResponse(this.schedulerTypeService.create(schedulerType));
    }
  }

  private createFromForm(): ISchedulerType {
    const entity = {
      ...new SchedulerType(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISchedulerType>>) {
    result.subscribe((res: HttpResponse<ISchedulerType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
