/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GreeneryTestModule } from '../../../test.module';
import { ExecutorTypeDetailComponent } from 'app/entities/executor-type/executor-type-detail.component';
import { ExecutorType } from 'app/shared/model/executor-type.model';

describe('Component Tests', () => {
  describe('ExecutorType Management Detail Component', () => {
    let comp: ExecutorTypeDetailComponent;
    let fixture: ComponentFixture<ExecutorTypeDetailComponent>;
    const route = ({ data: of({ executorType: new ExecutorType(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GreeneryTestModule],
        declarations: [ExecutorTypeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ExecutorTypeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExecutorTypeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.executorType).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
