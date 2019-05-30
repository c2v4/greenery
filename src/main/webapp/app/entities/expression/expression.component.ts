import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IExpression } from 'app/shared/model/expression.model';
import { AccountService } from 'app/core';
import { ExpressionService } from './expression.service';

@Component({
  selector: 'jhi-expression',
  templateUrl: './expression.component.html'
})
export class ExpressionComponent implements OnInit, OnDestroy {
  expressions: IExpression[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected expressionService: ExpressionService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.expressionService
      .query()
      .pipe(
        filter((res: HttpResponse<IExpression[]>) => res.ok),
        map((res: HttpResponse<IExpression[]>) => res.body)
      )
      .subscribe(
        (res: IExpression[]) => {
          this.expressions = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInExpressions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IExpression) {
    return item.id;
  }

  registerChangeInExpressions() {
    this.eventSubscriber = this.eventManager.subscribe('expressionListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
