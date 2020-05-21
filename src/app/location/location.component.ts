import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { PokeapiLocationService } from '../_common/services/pokeapi-location.service';
import { SharedService } from '../_common/services/shared.service';
import { ComponentSelectorService } from '../_common/services/component-selector.service';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LocationComponent implements OnInit, OnDestroy {

  @Output() loaded = new EventEmitter;

  location: any;
  sections: any[];
  isLoading: boolean;

  subscriptions: Subscription[];

  constructor(
    private dialog: MatDialog,
    private api: PokeapiLocationService,
    private shared: SharedService,
    private componentSelector: ComponentSelectorService
  ) { }

  ngOnInit(): void {

    this.initialize();

    this.sections = [ true ];

    this.loaded.next(true);

    this.api.location.subscribe((location) => {
    
      this.loaded.next(false);
      this.location = location;
  
      this.isLoading = false;
      this.shared.selectionData = undefined;
    });
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

    const isPanel = type === 'move' || type === 'pokemon' || type ==='stat' || 'location-area';

    const ref = this.dialog.open(component, {
      id: type,
      closeOnNavigation: true,
      autoFocus: false,
      data: { data, entry: this.location },
      minHeight: '90vh',
      maxHeight: '90vh',
      minWidth: isPanel ? '500px' : '90vw',
      maxWidth: isPanel ? '500px' : '90vw',
    });
  }

}
