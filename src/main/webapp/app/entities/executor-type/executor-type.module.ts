import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenerySharedModule } from 'app/shared';
import {
  ExecutorTypeComponent,
  ExecutorTypeDetailComponent,
  ExecutorTypeUpdateComponent,
  ExecutorTypeDeletePopupComponent,
  ExecutorTypeDeleteDialogComponent,
  executorTypeRoute,
  executorTypePopupRoute
} from './';

const ENTITY_STATES = [...executorTypeRoute, ...executorTypePopupRoute];

@NgModule({
  imports: [GreenerySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ExecutorTypeComponent,
    ExecutorTypeDetailComponent,
    ExecutorTypeUpdateComponent,
    ExecutorTypeDeleteDialogComponent,
    ExecutorTypeDeletePopupComponent
  ],
  entryComponents: [
    ExecutorTypeComponent,
    ExecutorTypeUpdateComponent,
    ExecutorTypeDeleteDialogComponent,
    ExecutorTypeDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreeneryExecutorTypeModule {}
