/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreeneryTestModule } from '../../../test.module';
import { ExecutorConfigComponent } from 'app/entities/executor-config/executor-config.component';
import { ExecutorConfigService } from 'app/entities/executor-config/executor-config.service';
import { ExecutorConfig } from 'app/shared/model/executor-config.model';

describe('Component Tests', () => {
  describe('ExecutorConfig Management Component', () => {
    let comp: ExecutorConfigComponent;
    let fixture: ComponentFixture<ExecutorConfigComponent>;
    let service: ExecutorConfigService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GreeneryTestModule],
        declarations: [ExecutorConfigComponent],
        providers: []
      })
        .overrideTemplate(ExecutorConfigComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExecutorConfigComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExecutorConfigService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ExecutorConfig(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.executorConfigs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
