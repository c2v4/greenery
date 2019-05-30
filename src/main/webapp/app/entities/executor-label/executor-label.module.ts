import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenerySharedModule } from 'app/shared';
import {
  ExecutorLabelComponent,
  ExecutorLabelDetailComponent,
  ExecutorLabelUpdateComponent,
  ExecutorLabelDeletePopupComponent,
  ExecutorLabelDeleteDialogComponent,
  executorLabelRoute,
  executorLabelPopupRoute
} from './';

const ENTITY_STATES = [...executorLabelRoute, ...executorLabelPopupRoute];

@NgModule({
  imports: [GreenerySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ExecutorLabelComponent,
    ExecutorLabelDetailComponent,
    ExecutorLabelUpdateComponent,
    ExecutorLabelDeleteDialogComponent,
    ExecutorLabelDeletePopupComponent
  ],
  entryComponents: [
    ExecutorLabelComponent,
    ExecutorLabelUpdateComponent,
    ExecutorLabelDeleteDialogComponent,
    ExecutorLabelDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreeneryExecutorLabelModule {}
