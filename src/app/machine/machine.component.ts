import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { PokeapiMachineService } from '../_common/services/pokeapi-machine.service';
import { SharedService } from '../_common/services/shared.service';
import { ComponentSelectorService } from '../_common/services/component-selector.service';


@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MachineComponent implements OnInit, OnDestroy {

  @Output() loaded = new EventEmitter;
  
  machine: any;
  isLoading: boolean;

  subscriptions: Subscription[];

  constructor(
    private dialog: MatDialog,
    private api: PokeapiMachineService,
    private shared: SharedService,
    private componentSelector: ComponentSelectorService
  ) { }

  ngOnInit(): void {

    this.initialize();

    this.loaded.next(true);

    this.machine = this.shared.selectionData;

    this.api.machine.subscribe((machine) => {
    
      this.loaded.next(false);
      this.machine = machine;

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

    if (type === 'item') {
      this.shared.selectionData = data;
    }

    this.shared.dialogIsOpened = true;

    const component = this.componentSelector.dialogComponent({ data, type });

    const ref = this.dialog.open(component, {
      id: type,
      closeOnNavigation: true,
      autoFocus: false,
      data: { data, entry: this.machine },
      minHeight: '90vh',
      maxHeight: '90vh',
      minWidth: '500px',
      maxWidth: '500px'
    });
  }

}
