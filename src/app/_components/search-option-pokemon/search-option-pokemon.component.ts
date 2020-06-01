import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { SearchOptionPokemonService } from '../../_common/services/search-option-pokemon.service';
import { SharedService } from '../../_common/services/shared.service';


@Component({
  selector: 'app-search-option-pokemon',
  templateUrl: './search-option-pokemon.component.html',
  styleUrls: ['../search-options/search-option.shared.scss']
})
export class SearchOptionPokemonComponent implements OnInit, OnDestroy {

  @Output() entries = new EventEmitter();

  input: string;
  selections: any;
  _selections: any[];
  options: any[];
  option: any;

  subscriptions: Subscription[];
  
  constructor(
    public api: SearchOptionPokemonService,
    private shared: SharedService
  ) { }
  
  ngOnInit(): void {
    
    this.initialize();

    this.subscriptions.push(this.shared.appInitialization.subscribe((res) => {

      if (res === 1 || res !== 3) return;

      this.pageListeners();
      
    }))

  }

  ngOnDestroy() {
    this.shared.isSearchRoute = false;
    this.subscriptions.forEach((e) => e.unsubscribe());
  }
  
  initialize() {

    const loading = [ 'loading...' ];

    this.shared.isSearchRoute = true;

    this.input = '';

    this.selections = {
      ability: loading, color: loading, eggGroup: loading, 
      growthRate: loading, habitat: loading, shape: loading, type: loading
    };

    this._selections = [];

    this.options = [ 
      { option: 'ability', display: 'Ability', placeholder: 'ability' },
      { option: 'color', display: 'Color', placeholder: 'color' },
      { option: 'eggGroup', display: 'Egg group', placeholder: 'egg group' },
      { option: 'growthRate', display: 'Growth rate', placeholder: 'growth rate' },
      { option: 'habitat', display: 'Habitat', placeholder: 'habitat' },
      { option: 'shape', display: 'Shape', placeholder: 'shape' },
      { option: 'type', display: 'Type', placeholder: 'type' }
    ];

    this.option = {
      selectionList_1: {
        state: false,
        selections: {
          ability: true, color: true, eggGroup: true, 
          growthRate: true, habitat: true, shape: true, type: true
        }
      }
    };

    this.subscriptions = [];
  }

  pageListeners() {
    
    this.subscriptions.push(this.api.selectionList_1.subscribe((res) => {
      
      this.option.selectionList_1.state = true;
      this.shared.updateOptionLoadedSelection = true;

      if (!this.shared.isSearchRoute) return;

      this.options.forEach((item) => {
        this.selections[item.option] = res[item.option];
      });
    }));
  }

  modelChanged(model: string, type: string) {

    const _model = model.toLowerCase();

    const filtered = (selection: any[]) => selection.filter(e => e.name.includes(_model));

    if (model === null) {
      this.selections[type] = this._selections;
    } else {
      this.selections[type] = filtered(this._selections);
    }
  }

  focus(option: string) {

    if (this.input.length > 0) return;

    const current = this.selections[option];

    const filtered = (selection: any[]) => selection.filter(e => e.name.includes(this.input));
    
    if (this.input.length > 0) {
      this.selections[option] = filtered(current);
    }

    this._selections = current;
  }

  enter(option: string) {

    const selected = this.selections[option].find(e => e.name === this.input);

    const entries = selected.data.pokemon_species;

    this.entries.next(entries);
  }

  toggle(state: boolean, group: string, option: string) {

    this.input = '';

    if (state) {

      this.option[group].selections[option] = false;
      
      setTimeout(() => 
        this.option[group].selections[option] = state, 250
      );
      
    } else {
      this.option[group].selections[option] = state;
    }
  }

}
