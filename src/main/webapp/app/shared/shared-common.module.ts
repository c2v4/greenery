import { NgModule } from '@angular/core';

import { GreenerySharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [GreenerySharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [GreenerySharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class GreenerySharedCommonModule {}
