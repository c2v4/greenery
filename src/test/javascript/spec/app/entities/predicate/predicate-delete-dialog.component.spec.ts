/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GreeneryTestModule } from '../../../test.module';
import { PredicateDeleteDialogComponent } from 'app/entities/predicate/predicate-delete-dialog.component';
import { PredicateService } from 'app/entities/predicate/predicate.service';

describe('Component Tests', () => {
  describe('Predicate Management Delete Component', () => {
    let comp: PredicateDeleteDialogComponent;
    let fixture: ComponentFixture<PredicateDeleteDialogComponent>;
    let service: PredicateService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GreeneryTestModule],
        declarations: [PredicateDeleteDialogComponent]
      })
        .overrideTemplate(PredicateDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PredicateDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PredicateService);
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
