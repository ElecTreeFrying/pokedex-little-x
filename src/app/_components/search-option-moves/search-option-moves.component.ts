import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { SearchOptionMovesService } from '../../_common/services/search-option-moves.service';
import { SharedService } from '../../_common/services/shared.service';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-search-option-moves',
  templateUrl: './search-option-moves.component.html',
  styleUrls: ['../search-options/search-option.shared.scss']
})
export class SearchOptionMovesComponent implements OnInit, OnDestroy {

  @Output() entries = new EventEmitter();
  @Output() refreshed = new EventEmitter();
  
  selections: any;
  _selections: any[];
  _selections_deep: any;
  options: any;
  option: any;

  subscriptions: Subscription[];

  constructor(
    private api: SearchOptionMovesService,
    private shared: SharedService
  ) { }

  ngOnInit(): void {
    
    this.initialize();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((e) => e.unsubscribe());
  }

  initialize() {

    this.selections = {
      selectionList_1: {},
      selectionList_2: {},
      selectionList_3: {}
    };

    this._selections = [];
    this._selections_deep = {};

    this.options = {
      selectionList_1: [ 
        { option: 'contest_type', display: 'Contest type', placeholder: 'contest type' },
        { option: 'generation', display: 'Generation', placeholder: 'generation' },
        { option: 'ailment', display: 'Ailment', placeholder: 'ailment' },
        { option: 'category', display: 'Category', placeholder: 'category' },
        { option: 'target', display: 'Target', placeholder: 'target' },
        { option: 'type', display: 'Type', placeholder: 'type' },
      ],
      selectionList_2: [
        { option: 'isMega', display: 'Is mega', description: 'Whether or not this form requires mega evolution.' },
      ],
      selectionList_3: [
        { option: 'weight', display: 'Weight', description: 'The mass of this pokémon.' },
      ]
    };

    this.option = {
      selectionList_1: {
        state: false, input: '',
        selections: {
          object: false
        }
      },
      selectionList_2: {
        state: false, input: '',
        selections: {
        }
      },
      selectionList_3: {
        state: false, input: '', invalid: true,
        selections: {
        }
      }
    };

    this.subscriptions = [];
  }

  pageListeners() {

    // const sl1 = (res: any) => {
    //   this.option.selectionList_1.state = true;
    //   this.shared.updateOptionLoadedSelection = true;
    //   this.selections.selectionList_1 = res;
    // };

    // if (!this.api.cached_sl1) {
    //   this.api.selectionList_1.subscribe((res) => {
    //     this.api.cached_sl1 = res;
    //     sl1(res);
    //   });
    // } else { sl1(this.api.cached_sl1); }

    // this.option.selectionList_2.state = true
    // this.shared.updateOptionLoadedSelection = true;
    // this.selections.selectionList_2 = this.api.selectionList_2;

    // this.option.selectionList_3.state = true;
    // this.shared.updateOptionLoadedSelection = true;
    // this.selections.selectionList_3 = this.api.selectionList_3;

  }

}
