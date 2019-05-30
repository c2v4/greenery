import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenerySharedModule } from 'app/shared';
import {
  NumericComponent,
  NumericDetailComponent,
  NumericUpdateComponent,
  NumericDeletePopupComponent,
  NumericDeleteDialogComponent,
  numericRoute,
  numericPopupRoute
} from './';

const ENTITY_STATES = [...numericRoute, ...numericPopupRoute];

@NgModule({
  imports: [GreenerySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    NumericComponent,
    NumericDetailComponent,
    NumericUpdateComponent,
    NumericDeleteDialogComponent,
    NumericDeletePopupComponent
  ],
  entryComponents: [NumericComponent, NumericUpdateComponent, NumericDeleteDialogComponent, NumericDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreeneryNumericModule {}
