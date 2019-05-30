import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRule } from 'app/shared/model/rule.model';
import { AccountService } from 'app/core';
import { RuleService } from './rule.service';

@Component({
  selector: 'jhi-rule',
  templateUrl: './rule.component.html'
})
export class RuleComponent implements OnInit, OnDestroy {
  rules: IRule[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected ruleService: RuleService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.ruleService
      .query()
      .pipe(
        filter((res: HttpResponse<IRule[]>) => res.ok),
        map((res: HttpResponse<IRule[]>) => res.body)
      )
      .subscribe(
        (res: IRule[]) => {
          this.rules = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInRules();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IRule) {
    return item.id;
  }

  registerChangeInRules() {
    this.eventSubscriber = this.eventManager.subscribe('ruleListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
