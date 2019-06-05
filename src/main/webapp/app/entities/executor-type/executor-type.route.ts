import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ExecutorType } from 'app/shared/model/executor-type.model';
import { ExecutorTypeService } from './executor-type.service';
import { ExecutorTypeComponent } from './executor-type.component';
import { ExecutorTypeDetailComponent } from './executor-type-detail.component';
import { ExecutorTypeUpdateComponent } from './executor-type-update.component';
import { ExecutorTypeDeletePopupComponent } from './executor-type-delete-dialog.component';
import { IExecutorType } from 'app/shared/model/executor-type.model';

@Injectable({ providedIn: 'root' })
export class ExecutorTypeResolve implements Resolve<IExecutorType> {
  constructor(private service: ExecutorTypeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IExecutorType> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ExecutorType>) => response.ok),
        map((executorType: HttpResponse<ExecutorType>) => executorType.body)
      );
    }
    return of(new ExecutorType());
  }
}

export const executorTypeRoute: Routes = [
  {
    path: '',
    component: ExecutorTypeComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ExecutorTypes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ExecutorTypeDetailComponent,
    resolve: {
      executorType: ExecutorTypeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ExecutorTypes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ExecutorTypeUpdateComponent,
    resolve: {
      executorType: ExecutorTypeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ExecutorTypes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ExecutorTypeUpdateComponent,
    resolve: {
      executorType: ExecutorTypeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ExecutorTypes'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const executorTypePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ExecutorTypeDeletePopupComponent,
    resolve: {
      executorType: ExecutorTypeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ExecutorTypes'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
