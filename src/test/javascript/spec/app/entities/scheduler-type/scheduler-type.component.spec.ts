/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreeneryTestModule } from '../../../test.module';
import { SchedulerTypeComponent } from 'app/entities/scheduler-type/scheduler-type.component';
import { SchedulerTypeService } from 'app/entities/scheduler-type/scheduler-type.service';
import { SchedulerType } from 'app/shared/model/scheduler-type.model';

describe('Component Tests', () => {
  describe('SchedulerType Management Component', () => {
    let comp: SchedulerTypeComponent;
    let fixture: ComponentFixture<SchedulerTypeComponent>;
    let service: SchedulerTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GreeneryTestModule],
        declarations: [SchedulerTypeComponent],
        providers: []
      })
        .overrideTemplate(SchedulerTypeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SchedulerTypeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SchedulerTypeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SchedulerType(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.schedulerTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
