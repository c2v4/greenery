import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExecutorLabel } from 'app/shared/model/executor-label.model';

@Component({
  selector: 'jhi-executor-label-detail',
  templateUrl: './executor-label-detail.component.html'
})
export class ExecutorLabelDetailComponent implements OnInit {
  executorLabel: IExecutorLabel;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ executorLabel }) => {
      this.executorLabel = executorLabel;
    });
  }

  previousState() {
    window.history.back();
  }
}
