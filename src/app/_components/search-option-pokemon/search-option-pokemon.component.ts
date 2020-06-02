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
  @Output() refreshed = new EventEmitter();

  selections: any;
  _selections: any[];
  options: any;
  option: any;

  subscriptions: Subscription[];
  
  constructor(
    public api: SearchOptionPokemonService,
    private shared: SharedService
  ) { }
  
  ngOnInit(): void {
    
    this.initialize();

    this.subscriptions.push(this.shared.appInitialization.subscribe((res) => {

      if (!(!!this.shared.keys && res === 3)) return;

      this.pageListeners();
      
    }))

  }

  ngOnDestroy() {
    this.shared.isSearchRoute = false;
    this.subscriptions.forEach((e) => e.unsubscribe());
  }
  
  initialize() {

    this.shared.isSearchRoute = true;
    
    const loading = [ 'loading...' ];

    this.selections = {
      selectionList_1: {
        ability: loading, color: loading, eggGroup: loading, 
        growthRate: loading, habitat: loading, shape: loading, type: loading
      }, 
      selectionList_2: {}
    };

    this._selections = [];

    this.options = {
      selectionList_1: [ 
        { option: 'ability', display: 'Ability', placeholder: 'ability' },
        { option: 'color', display: 'Color', placeholder: 'color' },
        { option: 'eggGroup', display: 'Egg group', placeholder: 'egg group' },
        { option: 'growthRate', display: 'Growth rate', placeholder: 'growth rate' },
        { option: 'habitat', display: 'Habitat', placeholder: 'habitat' },
        { option: 'shape', display: 'Shape', placeholder: 'shape' },
        { option: 'type', display: 'Type', placeholder: 'type' }
      ],
      selectionList_2: [
        { option: 'formsSwitchable', display: 'Forms switchable', description: 'Whether or not this pokémon has multiple forms and can switch between them.' },
        { option: 'hasGenderDifferences', display: 'Has gender differences', description: 'Whether or not this pokémon can have different genders.' },
        { option: 'isBaby', display: 'Is baby', description: 'Whether or not this is a baby pokémon.' },
        { option: 'isDefault', display: 'Is default', description: 'Set for exactly one pokémon used as the default for each species.' },
        { option: 'isMega', display: 'Is mega', description: 'Whether or not this form requires mega evolution.' },
      ]
    };

    this.option = {
      selectionList_1: {
        state: false, input: '',
        selections: {
          ability: true, color: true, eggGroup: true, 
          growthRate: true, habitat: true, shape: true, type: true
        }
      },
      selectionList_2: {
        state: false, input: '',
        selections: {
          isBaby: true, isMega: true, isDefault: true,
          formsSwitchable: true, hasGenderDifferences: true
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

      this.options.selectionList_1.forEach((item: any) => {
        this.selections.selectionList_1[item.option] = res[item.option];
      });
    }));

    this.option.selectionList_2.state = true;
    this.shared.updateOptionLoadedSelection = true;
    this.selections.selectionList_2 = this.api.selectionList_2;

    // 2

  }

  modelChanged(model: string, group: string, type: string) {

    const _model = model.toLowerCase();

    const filtered = (selection: any[]) => selection.filter(e => e.name.includes(_model));

    if (model === null) {
      this.selections[group][type] = this._selections;
    } else {
      this.selections[group][type] = filtered(this._selections);
    }
  }

  selectionChange(model: string, group: string, type: string) {

    const entries = this.selections[group][type][model];

    this.entries.next(entries);
  }

  focus(group: string, option: string) {

    if (this.option[group].input.length > 0) return;

    const current = this.selections[group][option];

    const filtered = (selection: any[]) => selection.filter(e => e.name.includes(this.option[group].input));
    
    if (this.option[group].input.length > 0) {
      this.selections[group][option] = filtered(current);
    }

    this._selections = current;
  }

  enter(option: string) {

    const selected = this.selections[option].find(e => e.name === this.option.selectionList_1.input);

    const entries = selected.data.pokemon_species;

    this.entries.next(entries);
  }

  toggle(state: boolean, group: string, option: string) {

    this.option[group].input = '';

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
