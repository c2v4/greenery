import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExpression } from 'app/shared/model/expression.model';
import { ExpressionService } from './expression.service';

@Component({
  selector: 'jhi-expression-delete-dialog',
  templateUrl: './expression-delete-dialog.component.html'
})
export class ExpressionDeleteDialogComponent {
  expression: IExpression;

  constructor(
    protected expressionService: ExpressionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.expressionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'expressionListModification',
        content: 'Deleted an expression'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-expression-delete-popup',
  template: ''
})
export class ExpressionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ expression }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ExpressionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.expression = expression;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/expression', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/expression', { outlets: { popup: null } }]);
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
