/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreeneryTestModule } from '../../../test.module';
import { ExecutorLabelComponent } from 'app/entities/executor-label/executor-label.component';
import { ExecutorLabelService } from 'app/entities/executor-label/executor-label.service';
import { ExecutorLabel } from 'app/shared/model/executor-label.model';

describe('Component Tests', () => {
  describe('ExecutorLabel Management Component', () => {
    let comp: ExecutorLabelComponent;
    let fixture: ComponentFixture<ExecutorLabelComponent>;
    let service: ExecutorLabelService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GreeneryTestModule],
        declarations: [ExecutorLabelComponent],
        providers: []
      })
        .overrideTemplate(ExecutorLabelComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExecutorLabelComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExecutorLabelService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ExecutorLabel(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.executorLabels[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
