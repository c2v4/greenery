import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IExecutorConfig } from 'app/shared/model/executor-config.model';
import { AccountService } from 'app/core';
import { ExecutorConfigService } from './executor-config.service';

@Component({
  selector: 'jhi-executor-config',
  templateUrl: './executor-config.component.html'
})
export class ExecutorConfigComponent implements OnInit, OnDestroy {
  executorConfigs: IExecutorConfig[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected executorConfigService: ExecutorConfigService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.executorConfigService
      .query()
      .pipe(
        filter((res: HttpResponse<IExecutorConfig[]>) => res.ok),
        map((res: HttpResponse<IExecutorConfig[]>) => res.body)
      )
      .subscribe(
        (res: IExecutorConfig[]) => {
          this.executorConfigs = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInExecutorConfigs();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IExecutorConfig) {
    return item.id;
  }

  registerChangeInExecutorConfigs() {
    this.eventSubscriber = this.eventManager.subscribe('executorConfigListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
