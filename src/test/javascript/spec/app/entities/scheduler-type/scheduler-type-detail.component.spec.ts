/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GreeneryTestModule } from '../../../test.module';
import { SchedulerTypeDetailComponent } from 'app/entities/scheduler-type/scheduler-type-detail.component';
import { SchedulerType } from 'app/shared/model/scheduler-type.model';

describe('Component Tests', () => {
  describe('SchedulerType Management Detail Component', () => {
    let comp: SchedulerTypeDetailComponent;
    let fixture: ComponentFixture<SchedulerTypeDetailComponent>;
    const route = ({ data: of({ schedulerType: new SchedulerType(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GreeneryTestModule],
        declarations: [SchedulerTypeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SchedulerTypeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SchedulerTypeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.schedulerType).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
