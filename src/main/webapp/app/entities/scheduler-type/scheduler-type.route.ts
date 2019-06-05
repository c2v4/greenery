import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SchedulerType } from 'app/shared/model/scheduler-type.model';
import { SchedulerTypeService } from './scheduler-type.service';
import { SchedulerTypeComponent } from './scheduler-type.component';
import { SchedulerTypeDetailComponent } from './scheduler-type-detail.component';
import { SchedulerTypeUpdateComponent } from './scheduler-type-update.component';
import { SchedulerTypeDeletePopupComponent } from './scheduler-type-delete-dialog.component';
import { ISchedulerType } from 'app/shared/model/scheduler-type.model';

@Injectable({ providedIn: 'root' })
export class SchedulerTypeResolve implements Resolve<ISchedulerType> {
  constructor(private service: SchedulerTypeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISchedulerType> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<SchedulerType>) => response.ok),
        map((schedulerType: HttpResponse<SchedulerType>) => schedulerType.body)
      );
    }
    return of(new SchedulerType());
  }
}

export const schedulerTypeRoute: Routes = [
  {
    path: '',
    component: SchedulerTypeComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SchedulerTypes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SchedulerTypeDetailComponent,
    resolve: {
      schedulerType: SchedulerTypeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SchedulerTypes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SchedulerTypeUpdateComponent,
    resolve: {
      schedulerType: SchedulerTypeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SchedulerTypes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SchedulerTypeUpdateComponent,
    resolve: {
      schedulerType: SchedulerTypeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SchedulerTypes'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const schedulerTypePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SchedulerTypeDeletePopupComponent,
    resolve: {
      schedulerType: SchedulerTypeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SchedulerTypes'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
