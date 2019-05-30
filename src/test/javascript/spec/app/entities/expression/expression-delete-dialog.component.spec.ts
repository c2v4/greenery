/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GreeneryTestModule } from '../../../test.module';
import { ExpressionDeleteDialogComponent } from 'app/entities/expression/expression-delete-dialog.component';
import { ExpressionService } from 'app/entities/expression/expression.service';

describe('Component Tests', () => {
  describe('Expression Management Delete Component', () => {
    let comp: ExpressionDeleteDialogComponent;
    let fixture: ComponentFixture<ExpressionDeleteDialogComponent>;
    let service: ExpressionService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GreeneryTestModule],
        declarations: [ExpressionDeleteDialogComponent]
      })
        .overrideTemplate(ExpressionDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExpressionDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExpressionService);
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
