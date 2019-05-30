import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IEntry, Entry } from 'app/shared/model/entry.model';
import { EntryService } from './entry.service';
import { ILabel } from 'app/shared/model/label.model';
import { LabelService } from 'app/entities/label';

@Component({
  selector: 'jhi-entry-update',
  templateUrl: './entry-update.component.html'
})
export class EntryUpdateComponent implements OnInit {
  entry: IEntry;
  isSaving: boolean;

  labels: ILabel[];

  editForm = this.fb.group({
    id: [],
    value: [null, [Validators.required]],
    date: [null, [Validators.required]],
    label: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected entryService: EntryService,
    protected labelService: LabelService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ entry }) => {
      this.updateForm(entry);
      this.entry = entry;
    });
    this.labelService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ILabel[]>) => mayBeOk.ok),
        map((response: HttpResponse<ILabel[]>) => response.body)
      )
      .subscribe((res: ILabel[]) => (this.labels = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(entry: IEntry) {
    this.editForm.patchValue({
      id: entry.id,
      value: entry.value,
      date: entry.date != null ? entry.date.format(DATE_TIME_FORMAT) : null,
      label: entry.label
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const entry = this.createFromForm();
    if (entry.id !== undefined) {
      this.subscribeToSaveResponse(this.entryService.update(entry));
    } else {
      this.subscribeToSaveResponse(this.entryService.create(entry));
    }
  }

  private createFromForm(): IEntry {
    const entity = {
      ...new Entry(),
      id: this.editForm.get(['id']).value,
      value: this.editForm.get(['value']).value,
      date: this.editForm.get(['date']).value != null ? moment(this.editForm.get(['date']).value, DATE_TIME_FORMAT) : undefined,
      label: this.editForm.get(['label']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEntry>>) {
    result.subscribe((res: HttpResponse<IEntry>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
}
