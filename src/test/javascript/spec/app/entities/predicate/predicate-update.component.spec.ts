/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GreeneryTestModule } from '../../../test.module';
import { PredicateUpdateComponent } from 'app/entities/predicate/predicate-update.component';
import { PredicateService } from 'app/entities/predicate/predicate.service';
import { Predicate } from 'app/shared/model/predicate.model';

describe('Component Tests', () => {
  describe('Predicate Management Update Component', () => {
    let comp: PredicateUpdateComponent;
    let fixture: ComponentFixture<PredicateUpdateComponent>;
    let service: PredicateService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GreeneryTestModule],
        declarations: [PredicateUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PredicateUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PredicateUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PredicateService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Predicate(123);
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
        const entity = new Predicate();
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
