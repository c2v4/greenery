import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRule } from 'app/shared/model/rule.model';
import { RuleService } from './rule.service';

@Component({
  selector: 'jhi-rule-delete-dialog',
  templateUrl: './rule-delete-dialog.component.html'
})
export class RuleDeleteDialogComponent {
  rule: IRule;

  constructor(protected ruleService: RuleService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.ruleService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'ruleListModification',
        content: 'Deleted an rule'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-rule-delete-popup',
  template: ''
})
export class RuleDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ rule }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(RuleDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.rule = rule;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/rule', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/rule', { outlets: { popup: null } }]);
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
