/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GreeneryTestModule } from '../../../test.module';
import { SchedulerTypeDeleteDialogComponent } from 'app/entities/scheduler-type/scheduler-type-delete-dialog.component';
import { SchedulerTypeService } from 'app/entities/scheduler-type/scheduler-type.service';

describe('Component Tests', () => {
  describe('SchedulerType Management Delete Component', () => {
    let comp: SchedulerTypeDeleteDialogComponent;
    let fixture: ComponentFixture<SchedulerTypeDeleteDialogComponent>;
    let service: SchedulerTypeService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GreeneryTestModule],
        declarations: [SchedulerTypeDeleteDialogComponent]
      })
        .overrideTemplate(SchedulerTypeDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SchedulerTypeDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SchedulerTypeService);
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
