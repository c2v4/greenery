import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Property } from 'app/shared/model/property.model';
import { PropertyService } from './property.service';
import { PropertyComponent } from './property.component';
import { PropertyDetailComponent } from './property-detail.component';
import { PropertyUpdateComponent } from './property-update.component';
import { PropertyDeletePopupComponent } from './property-delete-dialog.component';
import { IProperty } from 'app/shared/model/property.model';

@Injectable({ providedIn: 'root' })
export class PropertyResolve implements Resolve<IProperty> {
  constructor(private service: PropertyService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProperty> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Property>) => response.ok),
        map((property: HttpResponse<Property>) => property.body)
      );
    }
    return of(new Property());
  }
}

export const propertyRoute: Routes = [
  {
    path: '',
    component: PropertyComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Properties'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PropertyDetailComponent,
    resolve: {
      property: PropertyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Properties'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PropertyUpdateComponent,
    resolve: {
      property: PropertyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Properties'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PropertyUpdateComponent,
    resolve: {
      property: PropertyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Properties'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const propertyPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PropertyDeletePopupComponent,
    resolve: {
      property: PropertyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Properties'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
