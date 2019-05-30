import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExecutorConfig } from 'app/shared/model/executor-config.model';

@Component({
  selector: 'jhi-executor-config-detail',
  templateUrl: './executor-config-detail.component.html'
})
export class ExecutorConfigDetailComponent implements OnInit {
  executorConfig: IExecutorConfig;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ executorConfig }) => {
      this.executorConfig = executorConfig;
    });
  }

  previousState() {
    window.history.back();
  }
}
