import { Component, OnInit, OnDestroy, ChangeDetectorRef, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';

import { PokeapiService } from '../../_common/services/pokeapi.service';
import { SharedService } from '../../_common/services/shared.service';


@Component({
  selector: 'app-move',
  templateUrl: './move.component.html',
  styleUrls: ['./move.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MoveComponent implements OnInit, OnDestroy {

  @Output() loaded = new EventEmitter;

  isLoading: boolean;
  data: any;

  sections: any[];
  subscriptions: Subscription[]

  constructor(
    private cd: ChangeDetectorRef,
    private api: PokeapiService,
    private shared: SharedService
  ) { }

  ngOnInit(): void {

    this.isLoading = true;
    this.sections = [ false, false, false, false, false, false, false, false ];
    this.subscriptions = [];
    
    this.loaded.next(true);

    if (!this.shared.selectionData) return;

    this.subscriptions.push(this.api.flatMove(this.shared.selectionData).subscribe((res) => {

      this.loaded.next(false);

      this.data = res;
      this.cd.detectChanges();

      this.isLoading = false;

      this.shared.selectionData = undefined;

    }));
  }

  ngOnDestroy() {
    this.shared.dialogIsOpened = false;
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
