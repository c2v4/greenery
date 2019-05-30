/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreeneryTestModule } from '../../../test.module';
import { SchedulerConfigComponent } from 'app/entities/scheduler-config/scheduler-config.component';
import { SchedulerConfigService } from 'app/entities/scheduler-config/scheduler-config.service';
import { SchedulerConfig } from 'app/shared/model/scheduler-config.model';

describe('Component Tests', () => {
  describe('SchedulerConfig Management Component', () => {
    let comp: SchedulerConfigComponent;
    let fixture: ComponentFixture<SchedulerConfigComponent>;
    let service: SchedulerConfigService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GreeneryTestModule],
        declarations: [SchedulerConfigComponent],
        providers: []
      })
        .overrideTemplate(SchedulerConfigComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SchedulerConfigComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SchedulerConfigService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SchedulerConfig(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.schedulerConfigs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
