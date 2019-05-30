import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenerySharedModule } from 'app/shared';
import {
  ExpressionComponent,
  ExpressionDetailComponent,
  ExpressionUpdateComponent,
  ExpressionDeletePopupComponent,
  ExpressionDeleteDialogComponent,
  expressionRoute,
  expressionPopupRoute
} from './';

const ENTITY_STATES = [...expressionRoute, ...expressionPopupRoute];

@NgModule({
  imports: [GreenerySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ExpressionComponent,
    ExpressionDetailComponent,
    ExpressionUpdateComponent,
    ExpressionDeleteDialogComponent,
    ExpressionDeletePopupComponent
  ],
  entryComponents: [ExpressionComponent, ExpressionUpdateComponent, ExpressionDeleteDialogComponent, ExpressionDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreeneryExpressionModule {}
