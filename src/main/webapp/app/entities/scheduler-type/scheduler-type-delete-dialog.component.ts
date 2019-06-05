import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISchedulerType } from 'app/shared/model/scheduler-type.model';
import { SchedulerTypeService } from './scheduler-type.service';

@Component({
  selector: 'jhi-scheduler-type-delete-dialog',
  templateUrl: './scheduler-type-delete-dialog.component.html'
})
export class SchedulerTypeDeleteDialogComponent {
  schedulerType: ISchedulerType;

  constructor(
    protected schedulerTypeService: SchedulerTypeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.schedulerTypeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'schedulerTypeListModification',
        content: 'Deleted an schedulerType'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-scheduler-type-delete-popup',
  template: ''
})
export class SchedulerTypeDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ schedulerType }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SchedulerTypeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.schedulerType = schedulerType;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/scheduler-type', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/scheduler-type', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
