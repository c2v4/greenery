import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ExecutorLabel } from 'app/shared/model/executor-label.model';
import { ExecutorLabelService } from './executor-label.service';
import { ExecutorLabelComponent } from './executor-label.component';
import { ExecutorLabelDetailComponent } from './executor-label-detail.component';
import { ExecutorLabelUpdateComponent } from './executor-label-update.component';
import { ExecutorLabelDeletePopupComponent } from './executor-label-delete-dialog.component';
import { IExecutorLabel } from 'app/shared/model/executor-label.model';

@Injectable({ providedIn: 'root' })
export class ExecutorLabelResolve implements Resolve<IExecutorLabel> {
  constructor(private service: ExecutorLabelService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IExecutorLabel> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ExecutorLabel>) => response.ok),
        map((executorLabel: HttpResponse<ExecutorLabel>) => executorLabel.body)
      );
    }
    return of(new ExecutorLabel());
  }
}

export const executorLabelRoute: Routes = [
  {
    path: '',
    component: ExecutorLabelComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ExecutorLabels'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ExecutorLabelDetailComponent,
    resolve: {
      executorLabel: ExecutorLabelResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ExecutorLabels'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ExecutorLabelUpdateComponent,
    resolve: {
      executorLabel: ExecutorLabelResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ExecutorLabels'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ExecutorLabelUpdateComponent,
    resolve: {
      executorLabel: ExecutorLabelResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ExecutorLabels'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const executorLabelPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ExecutorLabelDeletePopupComponent,
    resolve: {
      executorLabel: ExecutorLabelResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ExecutorLabels'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
