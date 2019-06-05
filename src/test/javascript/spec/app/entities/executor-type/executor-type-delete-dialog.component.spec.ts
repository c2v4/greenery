/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GreeneryTestModule } from '../../../test.module';
import { ExecutorTypeDeleteDialogComponent } from 'app/entities/executor-type/executor-type-delete-dialog.component';
import { ExecutorTypeService } from 'app/entities/executor-type/executor-type.service';

describe('Component Tests', () => {
  describe('ExecutorType Management Delete Component', () => {
    let comp: ExecutorTypeDeleteDialogComponent;
    let fixture: ComponentFixture<ExecutorTypeDeleteDialogComponent>;
    let service: ExecutorTypeService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GreeneryTestModule],
        declarations: [ExecutorTypeDeleteDialogComponent]
      })
        .overrideTemplate(ExecutorTypeDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExecutorTypeDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExecutorTypeService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
