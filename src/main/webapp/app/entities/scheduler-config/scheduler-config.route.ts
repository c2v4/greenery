import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SchedulerConfig } from 'app/shared/model/scheduler-config.model';
import { SchedulerConfigService } from './scheduler-config.service';
import { SchedulerConfigComponent } from './scheduler-config.component';
import { SchedulerConfigDetailComponent } from './scheduler-config-detail.component';
import { SchedulerConfigUpdateComponent } from './scheduler-config-update.component';
import { SchedulerConfigDeletePopupComponent } from './scheduler-config-delete-dialog.component';
import { ISchedulerConfig } from 'app/shared/model/scheduler-config.model';

@Injectable({ providedIn: 'root' })
export class SchedulerConfigResolve implements Resolve<ISchedulerConfig> {
  constructor(private service: SchedulerConfigService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISchedulerConfig> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<SchedulerConfig>) => response.ok),
        map((schedulerConfig: HttpResponse<SchedulerConfig>) => schedulerConfig.body)
      );
    }
    return of(new SchedulerConfig());
  }
}

export const schedulerConfigRoute: Routes = [
  {
    path: '',
    component: SchedulerConfigComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SchedulerConfigs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SchedulerConfigDetailComponent,
    resolve: {
      schedulerConfig: SchedulerConfigResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SchedulerConfigs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SchedulerConfigUpdateComponent,
    resolve: {
      schedulerConfig: SchedulerConfigResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SchedulerConfigs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SchedulerConfigUpdateComponent,
    resolve: {
      schedulerConfig: SchedulerConfigResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SchedulerConfigs'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const schedulerConfigPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SchedulerConfigDeletePopupComponent,
    resolve: {
      schedulerConfig: SchedulerConfigResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SchedulerConfigs'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
