/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GreeneryTestModule } from '../../../test.module';
import { ExecutorLabelUpdateComponent } from 'app/entities/executor-label/executor-label-update.component';
import { ExecutorLabelService } from 'app/entities/executor-label/executor-label.service';
import { ExecutorLabel } from 'app/shared/model/executor-label.model';

describe('Component Tests', () => {
  describe('ExecutorLabel Management Update Component', () => {
    let comp: ExecutorLabelUpdateComponent;
    let fixture: ComponentFixture<ExecutorLabelUpdateComponent>;
    let service: ExecutorLabelService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GreeneryTestModule],
        declarations: [ExecutorLabelUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ExecutorLabelUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExecutorLabelUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExecutorLabelService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ExecutorLabel(123);
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
        const entity = new ExecutorLabel();
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
