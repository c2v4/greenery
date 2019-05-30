import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExecutorType } from 'app/shared/model/executor-type.model';
import { ExecutorTypeService } from './executor-type.service';

@Component({
  selector: 'jhi-executor-type-delete-dialog',
  templateUrl: './executor-type-delete-dialog.component.html'
})
export class ExecutorTypeDeleteDialogComponent {
  executorType: IExecutorType;

  constructor(
    protected executorTypeService: ExecutorTypeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.executorTypeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'executorTypeListModification',
        content: 'Deleted an executorType'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-executor-type-delete-popup',
  template: ''
})
export class ExecutorTypeDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ executorType }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ExecutorTypeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.executorType = executorType;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/executor-type', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/executor-type', { outlets: { popup: null } }]);
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
