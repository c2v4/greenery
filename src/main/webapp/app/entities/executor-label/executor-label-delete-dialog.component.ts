import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExecutorLabel } from 'app/shared/model/executor-label.model';
import { ExecutorLabelService } from './executor-label.service';

@Component({
  selector: 'jhi-executor-label-delete-dialog',
  templateUrl: './executor-label-delete-dialog.component.html'
})
export class ExecutorLabelDeleteDialogComponent {
  executorLabel: IExecutorLabel;

  constructor(
    protected executorLabelService: ExecutorLabelService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.executorLabelService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'executorLabelListModification',
        content: 'Deleted an executorLabel'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-executor-label-delete-popup',
  template: ''
})
export class ExecutorLabelDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ executorLabel }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ExecutorLabelDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.executorLabel = executorLabel;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/executor-label', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/executor-label', { outlets: { popup: null } }]);
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
