import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExecutorConfig } from 'app/shared/model/executor-config.model';
import { ExecutorConfigService } from './executor-config.service';

@Component({
  selector: 'jhi-executor-config-delete-dialog',
  templateUrl: './executor-config-delete-dialog.component.html'
})
export class ExecutorConfigDeleteDialogComponent {
  executorConfig: IExecutorConfig;

  constructor(
    protected executorConfigService: ExecutorConfigService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.executorConfigService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'executorConfigListModification',
        content: 'Deleted an executorConfig'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-executor-config-delete-popup',
  template: ''
})
export class ExecutorConfigDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ executorConfig }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ExecutorConfigDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.executorConfig = executorConfig;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/executor-config', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/executor-config', { outlets: { popup: null } }]);
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
