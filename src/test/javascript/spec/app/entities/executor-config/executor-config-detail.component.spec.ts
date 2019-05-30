/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GreeneryTestModule } from '../../../test.module';
import { ExecutorConfigDetailComponent } from 'app/entities/executor-config/executor-config-detail.component';
import { ExecutorConfig } from 'app/shared/model/executor-config.model';

describe('Component Tests', () => {
  describe('ExecutorConfig Management Detail Component', () => {
    let comp: ExecutorConfigDetailComponent;
    let fixture: ComponentFixture<ExecutorConfigDetailComponent>;
    const route = ({ data: of({ executorConfig: new ExecutorConfig(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GreeneryTestModule],
        declarations: [ExecutorConfigDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ExecutorConfigDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExecutorConfigDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.executorConfig).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
