import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEntry } from 'app/shared/model/entry.model';

@Component({
  selector: 'jhi-entry-detail',
  templateUrl: './entry-detail.component.html'
})
export class EntryDetailComponent implements OnInit {
  entry: IEntry;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ entry }) => {
      this.entry = entry;
    });
  }

  previousState() {
    window.history.back();
  }
}
