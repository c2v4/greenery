/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GreeneryTestModule } from '../../../test.module';
import { ExecutorLabelDeleteDialogComponent } from 'app/entities/executor-label/executor-label-delete-dialog.component';
import { ExecutorLabelService } from 'app/entities/executor-label/executor-label.service';

describe('Component Tests', () => {
  describe('ExecutorLabel Management Delete Component', () => {
    let comp: ExecutorLabelDeleteDialogComponent;
    let fixture: ComponentFixture<ExecutorLabelDeleteDialogComponent>;
    let service: ExecutorLabelService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GreeneryTestModule],
        declarations: [ExecutorLabelDeleteDialogComponent]
      })
        .overrideTemplate(ExecutorLabelDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExecutorLabelDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExecutorLabelService);
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
