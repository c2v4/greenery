import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IExecutorType } from 'app/shared/model/executor-type.model';
import { AccountService } from 'app/core';
import { ExecutorTypeService } from './executor-type.service';

@Component({
  selector: 'jhi-executor-type',
  templateUrl: './executor-type.component.html'
})
export class ExecutorTypeComponent implements OnInit, OnDestroy {
  executorTypes: IExecutorType[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected executorTypeService: ExecutorTypeService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.executorTypeService
      .query()
      .pipe(
        filter((res: HttpResponse<IExecutorType[]>) => res.ok),
        map((res: HttpResponse<IExecutorType[]>) => res.body)
      )
      .subscribe(
        (res: IExecutorType[]) => {
          this.executorTypes = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInExecutorTypes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IExecutorType) {
    return item.id;
  }

  registerChangeInExecutorTypes() {
    this.eventSubscriber = this.eventManager.subscribe('executorTypeListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
