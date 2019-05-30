import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISchedulerConfig } from 'app/shared/model/scheduler-config.model';
import { SchedulerConfigService } from './scheduler-config.service';

@Component({
  selector: 'jhi-scheduler-config-delete-dialog',
  templateUrl: './scheduler-config-delete-dialog.component.html'
})
export class SchedulerConfigDeleteDialogComponent {
  schedulerConfig: ISchedulerConfig;

  constructor(
    protected schedulerConfigService: SchedulerConfigService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.schedulerConfigService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'schedulerConfigListModification',
        content: 'Deleted an schedulerConfig'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-scheduler-config-delete-popup',
  template: ''
})
export class SchedulerConfigDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ schedulerConfig }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SchedulerConfigDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.schedulerConfig = schedulerConfig;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/scheduler-config', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/scheduler-config', { outlets: { popup: null } }]);
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
