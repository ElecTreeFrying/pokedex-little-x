import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Subscription } from 'rxjs';

import { SearchOptionPokemonService, selections, options, option } from '../../_common/services/search-option-pokemon.service';
import { SharedService } from '../../_common/services/shared.service';


@Component({
  selector: 'app-search-option-pokemon',
  templateUrl: './search-option-pokemon.component.html',
  styleUrls: ['../search-options/search-option.shared.scss']
})
export class SearchOptionPokemonComponent implements OnInit, OnDestroy {

  @Output() entries = new EventEmitter();
  @Output() refreshed = new EventEmitter();

  selections: any;
  _selections: any[];
  _selections_deep: any;
  options: any;
  option: any;
  isListened: boolean;

  subscriptions: Subscription[];
  
  constructor(
    public api: SearchOptionPokemonService,
    public shared: SharedService
  ) { }
  
  ngOnInit(): void {
    
    this.initialize();

    this.subscriptions.push(this.shared.appInitialization.subscribe((res) => {

      if (!(!!this.shared.keys && res === 8)) return;

      setTimeout(() => this.pageListeners(), 150);

      if (!(!!this.api.initializationBuffer || !!this.api.cached_sl1)) {
        this.api.appInitialization(1);
      }

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
    this.isListened = false;

    this.subscriptions = [];
  }

  pageListeners() {
    
    if (this.isListened) return;

    this.isListened = true;
    
    const sl1 = (res: any) => {
      this.option.selectionList_1.state = true;
      this.shared.updateOptionLoadedSelection = true;

      this.options.selectionList_1.forEach((item: any) => {
        this.selections.selectionList_1[item.option] = res[item.option];
      });
    };

    if (!this.api.cached_sl1) {
      const $ = this.api.selectionList_1.subscribe((res) => {
        this.api.cached_sl1 = res;
        sl1(res);
        this.api.appInitialization(0, 'selectionList_1');
        $.unsubscribe();
      });
    } else { sl1(this.api.cached_sl1); }

    const sl4 = () => {
      this.option.selectionList_4.state = true;
      this.shared.updateOptionLoadedSelection = true;
      this.selections.selectionList_4 = this.api.selectionList_4;
    };

    if (!this.api.cached_sl4) {
      const $ = this.api.loadedPokemonEntries.subscribe((res) => {
        this.api.cached_sl4 = res;
        sl4();
        this.api.appInitialization(0, 'selectionList_4');
        $.unsubscribe();
      });
    } else { sl4(); }

    const sl5 = (res: any) => {
      this.option.selectionList_5.state = true;
      this.shared.updateOptionLoadedSelection = true;
      this.selections.selectionList_5 = res;
    };

    if (!this.api.cached_sl5) {
      const $ = this.api.selectionList_5.subscribe((res) => {
        this.api.cached_sl5 = res;
        sl5(res);
        this.api.appInitialization(0, 'selectionList_5');
        $.unsubscribe();
      });
    } else { sl5(this.api.cached_sl5); }

    this.option.selectionList_2.state = true
    this.selections.selectionList_2 = this.api.selectionList_2;

    this.option.selectionList_3.state = true;
    this.selections.selectionList_3 = this.api.selectionList_3;

    this.option.selectionList_6.state = true;
    this.selections.selectionList_6 = this.api.selectionList_6;

    this.shared.updateOptionLoadedSelection = true;

  }

  toggle(state: boolean, group: string, option: string) {

    if (group === 'selectionList_6') {
      this.option[group].input1 = '';
      this.option[group].input2 = '';
    } else {
      this.option[group].input = '';
    }

    if (state) {
      
      setTimeout(() => 
        this.option[group].selections[option] = state, 250
      );
      
    } else {

      this.option[group].selections[option] = state;

      if (group === 'selectionList_6') return;

      this.selections[group][option] = this._selections;
      this._selections = [];
    }
  }

  modelChangedSelection(model: string, group: string, type: string, others?: NgModel) {

    if (group === 'selectionList_3' || group === 'selectionList_6') {
      return this.option[group].invalid = others.invalid;
    }

    if (group === 'selectionList_4' && model === '') {

      this.selections[group][type] = this._selections;

      let data = [];

      data = this._selections;
      data[0].moves = this._selections_deep['physical'];
      data[1].moves = this._selections_deep['special'];
      data[2].moves = this._selections_deep['status'];

      return this.selections[group][type] = data;
    }

    if (model === null || model === '') {
      return this.selections[group][type] = this._selections;
    }

    setTimeout(() => {

      let data = null;

      if (group === 'selectionList_4') {
        data = this._selections.map((group) => {
          group.moves = this._selections_deep[group.name].filter(e => 
            e.name.includes(
              model.toLowerCase().split(' ').join('-')
            )
          );
          return group;
        }).filter((group) => 
          group.moves.length > 0
        );
      } else {
        data = this._selections.filter(e => e.name.includes(model.toLowerCase()));
      }

      this.selections[group][type] = data;

    }, 150);

  }

  refreshSelectionList(group: string, option: string) {

    if (this.option[group].input.length > 0) return;

    const current = this.selections[group][option];
    const groups: any = {};

    this._selections = current;

    if (group === 'selectionList_4') {
      current.forEach((e: any) => {
        groups[e.name] = e.moves  
      });

      this._selections_deep = groups;
    }

    const filtered = (selection: any[]) => selection.filter(e => e.name.includes(this.option[group].input));

    setTimeout(() => {
      this.selections[group][option] = group !== 'selectionList_4'
        ? filtered(current)
        : current.map((group) => {
            group.moves = filtered(groups[group.name]);
            return group;
          });
    });

  }

  autoCompleteSelection(event: MatAutocompleteSelectedEvent, group: string, type: string) {

    const selected = this.selections[group][type].find(e => e.name === event.option.value);

    let entries = null;
    
    if (type === 'forms') {
      entries = selected.forms;
    } else if (type === 'pal_park') {
      entries = selected.encounters;
    } else {
      entries = selected.data.pokemon_species;
    }

    this.entries.next(entries);

  }

  selectionChange(model: string, group: string, type: string) {

    const entries = this.api[group][type][model];

    this.entries.next(entries);
  }

  searchNumber(group: string, type: string, item: string, input: NgModel) {

    if (input.invalid) return;
    
    let entries = null;

    if (group === 'selectionList_3') {
      entries = this.api.filteredNumberEntries(+input.value, type);
    } else if (group === 'selectionList_6') {
      entries = this.api.filteredLastNumberEntries(+input.value, type, item);
    }
    
    this.entries.next(entries);
  }

  searchMove(model: string) {

    this.entries.next(
      this.api.filteredPokemonEntries(model)
    )
  }

}
