/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GreeneryTestModule } from '../../../test.module';
import { RuleDeleteDialogComponent } from 'app/entities/rule/rule-delete-dialog.component';
import { RuleService } from 'app/entities/rule/rule.service';

describe('Component Tests', () => {
  describe('Rule Management Delete Component', () => {
    let comp: RuleDeleteDialogComponent;
    let fixture: ComponentFixture<RuleDeleteDialogComponent>;
    let service: RuleService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GreeneryTestModule],
        declarations: [RuleDeleteDialogComponent]
      })
        .overrideTemplate(RuleDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RuleDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RuleService);
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
