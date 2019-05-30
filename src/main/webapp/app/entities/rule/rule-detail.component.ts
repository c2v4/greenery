import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRule } from 'app/shared/model/rule.model';

@Component({
  selector: 'jhi-rule-detail',
  templateUrl: './rule-detail.component.html'
})
export class RuleDetailComponent implements OnInit {
  rule: IRule;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ rule }) => {
      this.rule = rule;
    });
  }

  previousState() {
    window.history.back();
  }
}
