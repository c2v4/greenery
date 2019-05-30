import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenerySharedModule } from 'app/shared';
import {
  ExecutorConfigComponent,
  ExecutorConfigDetailComponent,
  ExecutorConfigUpdateComponent,
  ExecutorConfigDeletePopupComponent,
  ExecutorConfigDeleteDialogComponent,
  executorConfigRoute,
  executorConfigPopupRoute
} from './';

const ENTITY_STATES = [...executorConfigRoute, ...executorConfigPopupRoute];

@NgModule({
  imports: [GreenerySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ExecutorConfigComponent,
    ExecutorConfigDetailComponent,
    ExecutorConfigUpdateComponent,
    ExecutorConfigDeleteDialogComponent,
    ExecutorConfigDeletePopupComponent
  ],
  entryComponents: [
    ExecutorConfigComponent,
    ExecutorConfigUpdateComponent,
    ExecutorConfigDeleteDialogComponent,
    ExecutorConfigDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreeneryExecutorConfigModule {}
