import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ExecutorConfig } from 'app/shared/model/executor-config.model';
import { ExecutorConfigService } from './executor-config.service';
import { ExecutorConfigComponent } from './executor-config.component';
import { ExecutorConfigDetailComponent } from './executor-config-detail.component';
import { ExecutorConfigUpdateComponent } from './executor-config-update.component';
import { ExecutorConfigDeletePopupComponent } from './executor-config-delete-dialog.component';
import { IExecutorConfig } from 'app/shared/model/executor-config.model';

@Injectable({ providedIn: 'root' })
export class ExecutorConfigResolve implements Resolve<IExecutorConfig> {
  constructor(private service: ExecutorConfigService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IExecutorConfig> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ExecutorConfig>) => response.ok),
        map((executorConfig: HttpResponse<ExecutorConfig>) => executorConfig.body)
      );
    }
    return of(new ExecutorConfig());
  }
}

export const executorConfigRoute: Routes = [
  {
    path: '',
    component: ExecutorConfigComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ExecutorConfigs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ExecutorConfigDetailComponent,
    resolve: {
      executorConfig: ExecutorConfigResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ExecutorConfigs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ExecutorConfigUpdateComponent,
    resolve: {
      executorConfig: ExecutorConfigResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ExecutorConfigs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ExecutorConfigUpdateComponent,
    resolve: {
      executorConfig: ExecutorConfigResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ExecutorConfigs'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const executorConfigPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ExecutorConfigDeletePopupComponent,
    resolve: {
      executorConfig: ExecutorConfigResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ExecutorConfigs'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
