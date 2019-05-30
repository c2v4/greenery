/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GreeneryTestModule } from '../../../test.module';
import { ExecutorConfigUpdateComponent } from 'app/entities/executor-config/executor-config-update.component';
import { ExecutorConfigService } from 'app/entities/executor-config/executor-config.service';
import { ExecutorConfig } from 'app/shared/model/executor-config.model';

describe('Component Tests', () => {
  describe('ExecutorConfig Management Update Component', () => {
    let comp: ExecutorConfigUpdateComponent;
    let fixture: ComponentFixture<ExecutorConfigUpdateComponent>;
    let service: ExecutorConfigService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GreeneryTestModule],
        declarations: [ExecutorConfigUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ExecutorConfigUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExecutorConfigUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExecutorConfigService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ExecutorConfig(123);
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
        const entity = new ExecutorConfig();
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
