import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPredicate } from 'app/shared/model/predicate.model';

@Component({
  selector: 'jhi-predicate-detail',
  templateUrl: './predicate-detail.component.html'
})
export class PredicateDetailComponent implements OnInit {
  predicate: IPredicate;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ predicate }) => {
      this.predicate = predicate;
    });
  }

  previousState() {
    window.history.back();
  }
}
