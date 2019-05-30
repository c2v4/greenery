/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GreeneryTestModule } from '../../../test.module';
import { SchedulerConfigUpdateComponent } from 'app/entities/scheduler-config/scheduler-config-update.component';
import { SchedulerConfigService } from 'app/entities/scheduler-config/scheduler-config.service';
import { SchedulerConfig } from 'app/shared/model/scheduler-config.model';

describe('Component Tests', () => {
  describe('SchedulerConfig Management Update Component', () => {
    let comp: SchedulerConfigUpdateComponent;
    let fixture: ComponentFixture<SchedulerConfigUpdateComponent>;
    let service: SchedulerConfigService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GreeneryTestModule],
        declarations: [SchedulerConfigUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SchedulerConfigUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SchedulerConfigUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SchedulerConfigService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SchedulerConfig(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new SchedulerConfig();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
