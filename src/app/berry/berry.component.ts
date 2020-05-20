import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { PokeapiBerryService } from '../_common/services/pokeapi-berry.service';
import { SharedService } from '../_common/services/shared.service';
import { ComponentSelectorService } from '../_common/services/component-selector.service';


@Component({
  selector: 'app-berry',
  templateUrl: './berry.component.html',
  styleUrls: ['./berry.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BerryComponent implements OnInit, OnDestroy {

  @Output() loaded = new EventEmitter;

  berry: any;
  sections: boolean[];
  isLoading: boolean;

  subscriptions: Subscription[];

  constructor(
    private dialog: MatDialog,
    public api: PokeapiBerryService,
    private shared: SharedService,
    private componentSelector: ComponentSelectorService
  ) { }

  ngOnInit(): void {

    this.initialize();

    this.sections = [ true, true, true, true, true, false, true, false ];

    this.loaded.next(true);
    this.api.selection = this.shared.selectionData;

    this.subscriptions.push(this.api.berry.subscribe((berry: any) => {

      this.loaded.next(false);
      this.berry = berry;
      
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
      data: { data, entry: this.berry },
      minHeight: '90vh',
      maxHeight: '90vh',
      minWidth: isPanel ? '500px' : '90vw',
      maxWidth: isPanel ? '500px' : '90vw',
    });
  }

}
