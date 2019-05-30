/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GreeneryTestModule } from '../../../test.module';
import { ExecutorLabelDetailComponent } from 'app/entities/executor-label/executor-label-detail.component';
import { ExecutorLabel } from 'app/shared/model/executor-label.model';

describe('Component Tests', () => {
  describe('ExecutorLabel Management Detail Component', () => {
    let comp: ExecutorLabelDetailComponent;
    let fixture: ComponentFixture<ExecutorLabelDetailComponent>;
    const route = ({ data: of({ executorLabel: new ExecutorLabel(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GreeneryTestModule],
        declarations: [ExecutorLabelDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ExecutorLabelDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExecutorLabelDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.executorLabel).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
