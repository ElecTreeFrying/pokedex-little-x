import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Subscription } from 'rxjs';

import { SearchOptionMovesService, selections, options, option } from '../../_common/services/search-option-moves.service';
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
    public shared: SharedService
  ) { }

  ngOnInit(): void {
    
    this.initialize();

    this.subscriptions.push(this.shared.appInitialization.subscribe((res) => {

      if (!(!!this.shared.keys && res === 8)) return;

      setTimeout(() => this.pageListeners(), 150);

      // const valid = !!this.api.cached_sl1 && !!this.api.cached_sl2 && !!this.api.cached_sl3;

      // if (!valid && !(!!this.api.initializationBuffer)) {
      //   this.api.appInitialization(1);
      // }

    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((e) => e.unsubscribe());
  }

  initialize() {

    this.selections = selections;

    this._selections = [];
    this._selections_deep = {};

    this.options = options;

    this.option = option;

    this.subscriptions = [];
  }

  pageListeners() {

    const sl1 = (res: any) => {
      this.option.selectionList_1.state = true;
      this.shared.updateOptionLoadedSelection = true;
      this.selections.selectionList_1 = res;
    };

    if (!this.api.cached_sl1) {
      this.api.selectionList_1.subscribe((res) => {
        this.api.cached_sl1 = res;
        sl1(res);
      });
    } else { sl1(this.api.cached_sl1); }


    const sl2 = (res: any) => {
      this.option.selectionList_2.state = true;
      this.shared.updateOptionLoadedSelection = true;
      this.selections.selectionList_2 = res;
    };

    if (!this.api.cached_sl2) {
      this.api.selectionList_2.subscribe((res) => {
        this.api.cached_sl2 = res;
        sl2(res);
      });
    } else { sl2(this.api.cached_sl2); }


    this.option.selectionList_3.state = true;
    this.shared.updateOptionLoadedSelection = true;

  } 

  toggle(state: boolean, group: string, option: string) {

    
    if (group === '') {
    } else {
      this.option[group].input = '';
    }
    
    if (state) {
      
      setTimeout(() => 
        this.option[group].selections[option] = state, 250
      );
      
    } else {
      
      this.option[group].selections[option] = state;

      if (group === 'selectionList_2') return;

      this.selections[group][option] = this._selections;
      this._selections = [];
    }
  }

  closeSelection(group: string, type: string) {

    if (!this.option[group].selections[type]) return;
    
    console.log(this._selections);

    this.selections[group][type] = this._selections;

  }

  modelChangedSelection(model: string, group: string, type: string, others?: NgModel) {

    if (group === 'selectionList_2') {
      return this.option[group].invalid = others.invalid;
    }

    if (model === null || model === '') {
      return this.selections[group][type] = this._selections;
    }

    setTimeout(() => {

      let data = null;

      if (group === '') {

      } else {
        data = this._selections.filter(e => e.name.includes(model.toLowerCase()));
      }

      this.selections[group][type] = data;

    }, 150);

  }

  refreshSelectionList(group: string, option: string) {

    let current = this.selections[group][option];

    if (this.option[group].input.length === 0) {
      this._selections = current;
    } else {
      current = this._selections;
    }

    this.selections[group][option] = current.filter(e => e.name.includes(this.option[group].input))
    
  }

  autoCompleteSelection(event: MatAutocompleteSelectedEvent, group: string, type: string) {

    const selected = this.selections[group][type].find(e => e.name === event.option.value);

    let entries = null;
    
    if (type === '') { } 
    else {
      entries = selected.data.moves;
    }

    this.entries.next(entries);

  }

  searchNumber(group: string, type: string, item: string, input: NgModel) {

    if (input.invalid) return;
    
    let entries = null;

    if (group === 'selectionList_2') {
      entries = this.api.filteredNumberEntries(+input.value, type);
    }
    
    this.entries.next(entries);
  }

  searchMove(model: string) {

    this.entries.next(
      // this.api.filteredPokemonEntries(model)
    )
  }

}
