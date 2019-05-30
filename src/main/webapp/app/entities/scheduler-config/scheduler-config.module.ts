import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenerySharedModule } from 'app/shared';
import {
  SchedulerConfigComponent,
  SchedulerConfigDetailComponent,
  SchedulerConfigUpdateComponent,
  SchedulerConfigDeletePopupComponent,
  SchedulerConfigDeleteDialogComponent,
  schedulerConfigRoute,
  schedulerConfigPopupRoute
} from './';

const ENTITY_STATES = [...schedulerConfigRoute, ...schedulerConfigPopupRoute];

@NgModule({
  imports: [GreenerySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SchedulerConfigComponent,
    SchedulerConfigDetailComponent,
    SchedulerConfigUpdateComponent,
    SchedulerConfigDeleteDialogComponent,
    SchedulerConfigDeletePopupComponent
  ],
  entryComponents: [
    SchedulerConfigComponent,
    SchedulerConfigUpdateComponent,
    SchedulerConfigDeleteDialogComponent,
    SchedulerConfigDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenerySchedulerConfigModule {}
