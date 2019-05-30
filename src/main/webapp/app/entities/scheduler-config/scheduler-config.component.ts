import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISchedulerConfig } from 'app/shared/model/scheduler-config.model';
import { AccountService } from 'app/core';
import { SchedulerConfigService } from './scheduler-config.service';

@Component({
  selector: 'jhi-scheduler-config',
  templateUrl: './scheduler-config.component.html'
})
export class SchedulerConfigComponent implements OnInit, OnDestroy {
  schedulerConfigs: ISchedulerConfig[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected schedulerConfigService: SchedulerConfigService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.schedulerConfigService
      .query()
      .pipe(
        filter((res: HttpResponse<ISchedulerConfig[]>) => res.ok),
        map((res: HttpResponse<ISchedulerConfig[]>) => res.body)
      )
      .subscribe(
        (res: ISchedulerConfig[]) => {
          this.schedulerConfigs = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSchedulerConfigs();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISchedulerConfig) {
    return item.id;
  }

  registerChangeInSchedulerConfigs() {
    this.eventSubscriber = this.eventManager.subscribe('schedulerConfigListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
