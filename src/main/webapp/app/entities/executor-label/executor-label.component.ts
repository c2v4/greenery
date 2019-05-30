import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IExecutorLabel } from 'app/shared/model/executor-label.model';
import { AccountService } from 'app/core';
import { ExecutorLabelService } from './executor-label.service';

@Component({
  selector: 'jhi-executor-label',
  templateUrl: './executor-label.component.html'
})
export class ExecutorLabelComponent implements OnInit, OnDestroy {
  executorLabels: IExecutorLabel[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected executorLabelService: ExecutorLabelService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.executorLabelService
      .query()
      .pipe(
        filter((res: HttpResponse<IExecutorLabel[]>) => res.ok),
        map((res: HttpResponse<IExecutorLabel[]>) => res.body)
      )
      .subscribe(
        (res: IExecutorLabel[]) => {
          this.executorLabels = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInExecutorLabels();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IExecutorLabel) {
    return item.id;
  }

  registerChangeInExecutorLabels() {
    this.eventSubscriber = this.eventManager.subscribe('executorLabelListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
