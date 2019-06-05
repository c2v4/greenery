import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExecutorType } from 'app/shared/model/executor-type.model';

@Component({
  selector: 'jhi-executor-type-detail',
  templateUrl: './executor-type-detail.component.html'
})
export class ExecutorTypeDetailComponent implements OnInit {
  executorType: IExecutorType;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ executorType }) => {
      this.executorType = executorType;
    });
  }

  previousState() {
    window.history.back();
  }
}
