import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GreenerySharedModule } from 'app/shared';
import {
  SchedulerTypeComponent,
  SchedulerTypeDetailComponent,
  SchedulerTypeUpdateComponent,
  SchedulerTypeDeletePopupComponent,
  SchedulerTypeDeleteDialogComponent,
  schedulerTypeRoute,
  schedulerTypePopupRoute
} from './';

const ENTITY_STATES = [...schedulerTypeRoute, ...schedulerTypePopupRoute];

@NgModule({
  imports: [GreenerySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SchedulerTypeComponent,
    SchedulerTypeDetailComponent,
    SchedulerTypeUpdateComponent,
    SchedulerTypeDeleteDialogComponent,
    SchedulerTypeDeletePopupComponent
  ],
  entryComponents: [
    SchedulerTypeComponent,
    SchedulerTypeUpdateComponent,
    SchedulerTypeDeleteDialogComponent,
    SchedulerTypeDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenerySchedulerTypeModule {}
