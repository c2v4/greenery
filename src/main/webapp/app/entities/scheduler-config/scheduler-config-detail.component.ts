import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISchedulerConfig } from 'app/shared/model/scheduler-config.model';

@Component({
  selector: 'jhi-scheduler-config-detail',
  templateUrl: './scheduler-config-detail.component.html'
})
export class SchedulerConfigDetailComponent implements OnInit {
  schedulerConfig: ISchedulerConfig;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ schedulerConfig }) => {
      this.schedulerConfig = schedulerConfig;
    });
  }

  previousState() {
    window.history.back();
  }
}
