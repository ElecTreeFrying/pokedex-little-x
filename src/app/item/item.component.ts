import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';

import { PokeapiItemService } from '../_common/services/pokeapi-item.service';
import { SharedService } from '../_common/services/shared.service';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemComponent implements OnInit, OnDestroy {

  @Output() loaded = new EventEmitter;

  item: any;
  sections: boolean[];
  isLoading: boolean;
  
  subscriptions: Subscription[];

  constructor(
    public api: PokeapiItemService,
    private shared: SharedService
  ) { }

  ngOnInit(): void {

    this.initialize();

    this.sections = [ true, true, true, false, false, true, false ];

    this.loaded.next(true);
    this.api.selection = this.shared.selectionData;

    this.subscriptions.push(this.api.item.subscribe((item: any) => {

      this.loaded.next(false);
      this.item = item;
      
      this.isLoading = false;
      this.shared.selectionData = undefined;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  initialize() {
    this.isLoading = true;

    this.subscriptions = [];
  }

}
