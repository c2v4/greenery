/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GreeneryTestModule } from '../../../test.module';
import { NumericUpdateComponent } from 'app/entities/numeric/numeric-update.component';
import { NumericService } from 'app/entities/numeric/numeric.service';
import { Numeric } from 'app/shared/model/numeric.model';

describe('Component Tests', () => {
  describe('Numeric Management Update Component', () => {
    let comp: NumericUpdateComponent;
    let fixture: ComponentFixture<NumericUpdateComponent>;
    let service: NumericService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GreeneryTestModule],
        declarations: [NumericUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(NumericUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NumericUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NumericService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Numeric(123);
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
        const entity = new Numeric();
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
