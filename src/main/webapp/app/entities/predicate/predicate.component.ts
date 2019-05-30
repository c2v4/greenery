import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPredicate } from 'app/shared/model/predicate.model';
import { AccountService } from 'app/core';
import { PredicateService } from './predicate.service';

@Component({
  selector: 'jhi-predicate',
  templateUrl: './predicate.component.html'
})
export class PredicateComponent implements OnInit, OnDestroy {
  predicates: IPredicate[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected predicateService: PredicateService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.predicateService
      .query()
      .pipe(
        filter((res: HttpResponse<IPredicate[]>) => res.ok),
        map((res: HttpResponse<IPredicate[]>) => res.body)
      )
      .subscribe(
        (res: IPredicate[]) => {
          this.predicates = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPredicates();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPredicate) {
    return item.id;
  }

  registerChangeInPredicates() {
    this.eventSubscriber = this.eventManager.subscribe('predicateListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
