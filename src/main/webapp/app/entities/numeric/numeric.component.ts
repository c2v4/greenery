import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { INumeric } from 'app/shared/model/numeric.model';
import { AccountService } from 'app/core';
import { NumericService } from './numeric.service';

@Component({
  selector: 'jhi-numeric',
  templateUrl: './numeric.component.html'
})
export class NumericComponent implements OnInit, OnDestroy {
  numerics: INumeric[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected numericService: NumericService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.numericService
      .query()
      .pipe(
        filter((res: HttpResponse<INumeric[]>) => res.ok),
        map((res: HttpResponse<INumeric[]>) => res.body)
      )
      .subscribe(
        (res: INumeric[]) => {
          this.numerics = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInNumerics();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: INumeric) {
    return item.id;
  }

  registerChangeInNumerics() {
    this.eventSubscriber = this.eventManager.subscribe('numericListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
