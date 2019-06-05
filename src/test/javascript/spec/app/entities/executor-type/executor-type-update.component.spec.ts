/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GreeneryTestModule } from '../../../test.module';
import { ExecutorTypeUpdateComponent } from 'app/entities/executor-type/executor-type-update.component';
import { ExecutorTypeService } from 'app/entities/executor-type/executor-type.service';
import { ExecutorType } from 'app/shared/model/executor-type.model';

describe('Component Tests', () => {
  describe('ExecutorType Management Update Component', () => {
    let comp: ExecutorTypeUpdateComponent;
    let fixture: ComponentFixture<ExecutorTypeUpdateComponent>;
    let service: ExecutorTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GreeneryTestModule],
        declarations: [ExecutorTypeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ExecutorTypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExecutorTypeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExecutorTypeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ExecutorType(123);
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
        const entity = new ExecutorType();
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
