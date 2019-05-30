import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenerySharedModule } from 'app/shared';
import {
  PredicateComponent,
  PredicateDetailComponent,
  PredicateUpdateComponent,
  PredicateDeletePopupComponent,
  PredicateDeleteDialogComponent,
  predicateRoute,
  predicatePopupRoute
} from './';

const ENTITY_STATES = [...predicateRoute, ...predicatePopupRoute];

@NgModule({
  imports: [GreenerySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PredicateComponent,
    PredicateDetailComponent,
    PredicateUpdateComponent,
    PredicateDeleteDialogComponent,
    PredicateDeletePopupComponent
  ],
  entryComponents: [PredicateComponent, PredicateUpdateComponent, PredicateDeleteDialogComponent, PredicateDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreeneryPredicateModule {}
