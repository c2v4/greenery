import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Predicate } from 'app/shared/model/predicate.model';
import { PredicateService } from './predicate.service';
import { PredicateComponent } from './predicate.component';
import { PredicateDetailComponent } from './predicate-detail.component';
import { PredicateUpdateComponent } from './predicate-update.component';
import { PredicateDeletePopupComponent } from './predicate-delete-dialog.component';
import { IPredicate } from 'app/shared/model/predicate.model';

@Injectable({ providedIn: 'root' })
export class PredicateResolve implements Resolve<IPredicate> {
  constructor(private service: PredicateService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPredicate> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Predicate>) => response.ok),
        map((predicate: HttpResponse<Predicate>) => predicate.body)
      );
    }
    return of(new Predicate());
  }
}

export const predicateRoute: Routes = [
  {
    path: '',
    component: PredicateComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Predicates'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PredicateDetailComponent,
    resolve: {
      predicate: PredicateResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Predicates'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PredicateUpdateComponent,
    resolve: {
      predicate: PredicateResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Predicates'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PredicateUpdateComponent,
    resolve: {
      predicate: PredicateResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Predicates'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const predicatePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PredicateDeletePopupComponent,
    resolve: {
      predicate: PredicateResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Predicates'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
