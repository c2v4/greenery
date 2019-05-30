import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Expression } from 'app/shared/model/expression.model';
import { ExpressionService } from './expression.service';
import { ExpressionComponent } from './expression.component';
import { ExpressionDetailComponent } from './expression-detail.component';
import { ExpressionUpdateComponent } from './expression-update.component';
import { ExpressionDeletePopupComponent } from './expression-delete-dialog.component';
import { IExpression } from 'app/shared/model/expression.model';

@Injectable({ providedIn: 'root' })
export class ExpressionResolve implements Resolve<IExpression> {
  constructor(private service: ExpressionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IExpression> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Expression>) => response.ok),
        map((expression: HttpResponse<Expression>) => expression.body)
      );
    }
    return of(new Expression());
  }
}

export const expressionRoute: Routes = [
  {
    path: '',
    component: ExpressionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Expressions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ExpressionDetailComponent,
    resolve: {
      expression: ExpressionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Expressions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ExpressionUpdateComponent,
    resolve: {
      expression: ExpressionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Expressions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ExpressionUpdateComponent,
    resolve: {
      expression: ExpressionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Expressions'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const expressionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ExpressionDeletePopupComponent,
    resolve: {
      expression: ExpressionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Expressions'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
