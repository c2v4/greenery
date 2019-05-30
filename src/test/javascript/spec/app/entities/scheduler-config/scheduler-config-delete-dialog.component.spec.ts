/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GreeneryTestModule } from '../../../test.module';
import { SchedulerConfigDeleteDialogComponent } from 'app/entities/scheduler-config/scheduler-config-delete-dialog.component';
import { SchedulerConfigService } from 'app/entities/scheduler-config/scheduler-config.service';

describe('Component Tests', () => {
  describe('SchedulerConfig Management Delete Component', () => {
    let comp: SchedulerConfigDeleteDialogComponent;
    let fixture: ComponentFixture<SchedulerConfigDeleteDialogComponent>;
    let service: SchedulerConfigService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GreeneryTestModule],
        declarations: [SchedulerConfigDeleteDialogComponent]
      })
        .overrideTemplate(SchedulerConfigDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SchedulerConfigDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SchedulerConfigService);
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
