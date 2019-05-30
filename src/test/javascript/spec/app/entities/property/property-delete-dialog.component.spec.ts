/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GreeneryTestModule } from '../../../test.module';
import { PropertyDeleteDialogComponent } from 'app/entities/property/property-delete-dialog.component';
import { PropertyService } from 'app/entities/property/property.service';

describe('Component Tests', () => {
  describe('Property Management Delete Component', () => {
    let comp: PropertyDeleteDialogComponent;
    let fixture: ComponentFixture<PropertyDeleteDialogComponent>;
    let service: PropertyService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GreeneryTestModule],
        declarations: [PropertyDeleteDialogComponent]
      })
        .overrideTemplate(PropertyDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PropertyDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PropertyService);
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
