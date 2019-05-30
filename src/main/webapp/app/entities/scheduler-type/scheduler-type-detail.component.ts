import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISchedulerType } from 'app/shared/model/scheduler-type.model';

@Component({
  selector: 'jhi-scheduler-type-detail',
  templateUrl: './scheduler-type-detail.component.html'
})
export class SchedulerTypeDetailComponent implements OnInit {
  schedulerType: ISchedulerType;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ schedulerType }) => {
      this.schedulerType = schedulerType;
    });
  }

  previousState() {
    window.history.back();
  }
}
