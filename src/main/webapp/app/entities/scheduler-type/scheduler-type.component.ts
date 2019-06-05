import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISchedulerType } from 'app/shared/model/scheduler-type.model';
import { AccountService } from 'app/core';
import { SchedulerTypeService } from './scheduler-type.service';

@Component({
  selector: 'jhi-scheduler-type',
  templateUrl: './scheduler-type.component.html'
})
export class SchedulerTypeComponent implements OnInit, OnDestroy {
  schedulerTypes: ISchedulerType[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected schedulerTypeService: SchedulerTypeService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.schedulerTypeService
      .query()
      .pipe(
        filter((res: HttpResponse<ISchedulerType[]>) => res.ok),
        map((res: HttpResponse<ISchedulerType[]>) => res.body)
      )
      .subscribe(
        (res: ISchedulerType[]) => {
          this.schedulerTypes = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSchedulerTypes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISchedulerType) {
    return item.id;
  }

  registerChangeInSchedulerTypes() {
    this.eventSubscriber = this.eventManager.subscribe('schedulerTypeListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
