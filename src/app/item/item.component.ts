import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';


import { PokeapiItemService } from '../_common/services/pokeapi-item.service';
import { SharedService } from '../_common/services/shared.service';
import { ComponentSelectorService } from '../_common/services/component-selector.service';


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
    private dialog: MatDialog,
    public api: PokeapiItemService,
    private shared: SharedService,
    private componentSelector: ComponentSelectorService
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

  showDetails(data: any, type: string) {

    this.shared.dialogIsOpened = true;

    const component = this.componentSelector.dialogComponent({ data, type });

    const isPanel = type === 'move' || type === 'pokemon' || type ==='stat';

    const ref = this.dialog.open(component, {
      id: type,
      closeOnNavigation: true,
      autoFocus: false,
      data: { data, entry: this.item },
      minHeight: '90vh',
      maxHeight: '90vh',
      minWidth: isPanel ? '500px' : '90vw',
      maxWidth: isPanel ? '500px' : '90vw',
    });
  }

}
