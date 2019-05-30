/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GreeneryTestModule } from '../../../test.module';
import { ExpressionUpdateComponent } from 'app/entities/expression/expression-update.component';
import { ExpressionService } from 'app/entities/expression/expression.service';
import { Expression } from 'app/shared/model/expression.model';

describe('Component Tests', () => {
  describe('Expression Management Update Component', () => {
    let comp: ExpressionUpdateComponent;
    let fixture: ComponentFixture<ExpressionUpdateComponent>;
    let service: ExpressionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GreeneryTestModule],
        declarations: [ExpressionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ExpressionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExpressionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExpressionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Expression(123);
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
        const entity = new Expression();
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
