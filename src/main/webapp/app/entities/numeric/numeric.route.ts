import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Numeric } from 'app/shared/model/numeric.model';
import { NumericService } from './numeric.service';
import { NumericComponent } from './numeric.component';
import { NumericDetailComponent } from './numeric-detail.component';
import { NumericUpdateComponent } from './numeric-update.component';
import { NumericDeletePopupComponent } from './numeric-delete-dialog.component';
import { INumeric } from 'app/shared/model/numeric.model';

@Injectable({ providedIn: 'root' })
export class NumericResolve implements Resolve<INumeric> {
  constructor(private service: NumericService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INumeric> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Numeric>) => response.ok),
        map((numeric: HttpResponse<Numeric>) => numeric.body)
      );
    }
    return of(new Numeric());
  }
}

export const numericRoute: Routes = [
  {
    path: '',
    component: NumericComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Numerics'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: NumericDetailComponent,
    resolve: {
      numeric: NumericResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Numerics'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: NumericUpdateComponent,
    resolve: {
      numeric: NumericResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Numerics'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: NumericUpdateComponent,
    resolve: {
      numeric: NumericResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Numerics'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const numericPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: NumericDeletePopupComponent,
    resolve: {
      numeric: NumericResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Numerics'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
