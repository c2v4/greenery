/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreeneryTestModule } from '../../../test.module';
import { ExecutorTypeComponent } from 'app/entities/executor-type/executor-type.component';
import { ExecutorTypeService } from 'app/entities/executor-type/executor-type.service';
import { ExecutorType } from 'app/shared/model/executor-type.model';

describe('Component Tests', () => {
  describe('ExecutorType Management Component', () => {
    let comp: ExecutorTypeComponent;
    let fixture: ComponentFixture<ExecutorTypeComponent>;
    let service: ExecutorTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GreeneryTestModule],
        declarations: [ExecutorTypeComponent],
        providers: []
      })
        .overrideTemplate(ExecutorTypeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExecutorTypeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExecutorTypeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ExecutorType(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.executorTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
