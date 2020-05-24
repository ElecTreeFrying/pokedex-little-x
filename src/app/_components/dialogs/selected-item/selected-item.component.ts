import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { PokeapiItemService } from '../../../_common/services/pokeapi-item.service';
import { SharedService } from '../../../_common/services/shared.service';


@Component({
  selector: 'app-selected-item',
  templateUrl: './selected-item.component.html',
  styleUrls: ['./selected-item.component.scss']
})
export class SelectedItemComponent implements OnInit, OnDestroy {

  item: any;
  sections: boolean[];
  isLoading: boolean;
  
  subscriptions: Subscription[];

  constructor(
    private dialog: MatDialog,
    public api: PokeapiItemService,
    private shared: SharedService
  ) { }

  ngOnInit(): void {

    this.initialize();

    this.sections = [ true, true, true, true, false, true, false ];

    this.api.selection = this.shared.selectionData;

    this.subscriptions.push(this.api.item().subscribe((item: any) => {

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
