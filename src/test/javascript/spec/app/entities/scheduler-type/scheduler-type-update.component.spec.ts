/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GreeneryTestModule } from '../../../test.module';
import { SchedulerTypeUpdateComponent } from 'app/entities/scheduler-type/scheduler-type-update.component';
import { SchedulerTypeService } from 'app/entities/scheduler-type/scheduler-type.service';
import { SchedulerType } from 'app/shared/model/scheduler-type.model';

describe('Component Tests', () => {
  describe('SchedulerType Management Update Component', () => {
    let comp: SchedulerTypeUpdateComponent;
    let fixture: ComponentFixture<SchedulerTypeUpdateComponent>;
    let service: SchedulerTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GreeneryTestModule],
        declarations: [SchedulerTypeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SchedulerTypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SchedulerTypeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SchedulerTypeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SchedulerType(123);
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
        const entity = new SchedulerType();
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
