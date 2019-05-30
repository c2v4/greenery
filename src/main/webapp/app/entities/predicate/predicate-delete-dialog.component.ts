import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPredicate } from 'app/shared/model/predicate.model';
import { PredicateService } from './predicate.service';

@Component({
  selector: 'jhi-predicate-delete-dialog',
  templateUrl: './predicate-delete-dialog.component.html'
})
export class PredicateDeleteDialogComponent {
  predicate: IPredicate;

  constructor(protected predicateService: PredicateService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.predicateService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'predicateListModification',
        content: 'Deleted an predicate'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-predicate-delete-popup',
  template: ''
})
export class PredicateDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ predicate }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PredicateDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.predicate = predicate;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/predicate', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/predicate', { outlets: { popup: null } }]);
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
