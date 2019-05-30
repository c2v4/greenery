import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INumeric } from 'app/shared/model/numeric.model';

@Component({
  selector: 'jhi-numeric-detail',
  templateUrl: './numeric-detail.component.html'
})
export class NumericDetailComponent implements OnInit {
  numeric: INumeric;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ numeric }) => {
      this.numeric = numeric;
    });
  }

  previousState() {
    window.history.back();
  }
}
