import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProperty } from 'app/shared/model/property.model';
import { PropertyService } from './property.service';

@Component({
  selector: 'jhi-property-delete-dialog',
  templateUrl: './property-delete-dialog.component.html'
})
export class PropertyDeleteDialogComponent {
  property: IProperty;

  constructor(protected propertyService: PropertyService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.propertyService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'propertyListModification',
        content: 'Deleted an property'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-property-delete-popup',
  template: ''
})
export class PropertyDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ property }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PropertyDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.property = property;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/property', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/property', { outlets: { popup: null } }]);
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
