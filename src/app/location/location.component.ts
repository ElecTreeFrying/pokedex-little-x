import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { PokeapiService } from '../_common/services/pokeapi.service';
import { SharedService } from '../_common/services/shared.service';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  @Output() loaded = new EventEmitter;

  subscriptions: Subscription[];

  constructor(
    private api: PokeapiService,
    private shared: SharedService
  ) { }

  ngOnInit(): void {

    this.initialize();

    this.loaded.next(true);
    this.shared.selectionData = undefined;

    setTimeout(() => {
      this.loaded.next(false);
    });
  }

  initialize() {
    this.subscriptions = [];
  }

}
