/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GreeneryTestModule } from '../../../test.module';
import { SchedulerConfigDetailComponent } from 'app/entities/scheduler-config/scheduler-config-detail.component';
import { SchedulerConfig } from 'app/shared/model/scheduler-config.model';

describe('Component Tests', () => {
  describe('SchedulerConfig Management Detail Component', () => {
    let comp: SchedulerConfigDetailComponent;
    let fixture: ComponentFixture<SchedulerConfigDetailComponent>;
    const route = ({ data: of({ schedulerConfig: new SchedulerConfig(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GreeneryTestModule],
        declarations: [SchedulerConfigDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SchedulerConfigDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SchedulerConfigDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.schedulerConfig).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
