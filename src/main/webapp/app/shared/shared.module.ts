import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GreenerySharedLibsModule, GreenerySharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [GreenerySharedLibsModule, GreenerySharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [GreenerySharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreenerySharedModule {
  static forRoot() {
    return {
      ngModule: GreenerySharedModule
    };
  }
}
