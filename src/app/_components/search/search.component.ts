import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { SharedService } from '../../_common/services/shared.service';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  search: FormControl;

  subscriptions: Subscription[];

  constructor(
    private shared: SharedService
  ) { 

    this.search = new FormControl('');
  }

  ngOnInit(): void {

    this.subscriptions = [];

    this.subscriptions.push(this.search.valueChanges.pipe(
      delay(150)
    ).subscribe((search: string) => {
      this.shared.updateSearchSelection = search.toLowerCase();
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
