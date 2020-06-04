import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { SearchOptionPokemonService } from '../../_common/services/search-option-pokemon.service';
import { SharedService } from '../../_common/services/shared.service';
import { NgModel } from '@angular/forms';


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
    
    this.selections = {
      selectionList_1: {},
      selectionList_2: {},
      selectionList_3: {},
      selectionList_4: [],
      selectionList_5: []
    };

    this._selections = [];
    this._selections_deep = {};

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
      ],
      selectionList_3: [
        { option: 'baseExperience', display: 'Base experience', description: 'The base experience gained for defeating this pokémon.' },
        { option: 'baseHappiness', display: 'Base happiness', description: 'The happiness when caught by a normal pokéball; up to 255. The higher the number, the happier the pokémon.' },
        { option: 'captureRate', display: 'Capture rate', description: 'The base capture rate; up to 255. The higher the number, the easier the catch.' },
        { option: 'hatchCounter', display: 'Hatch counter', description: `Initial hatch counter: one must walk 255 × (hatch_counter + 1) steps before this Pokémon's egg hatches, unless utilizing bonuses like Flame Body's.` },
        { option: 'height', display: 'Height', description: 'The height of this pokémon.' },
        { option: 'pokemonNo', display: 'Pokémon no.', description: 'The identifier for this pokémon resource.' },
        { option: 'weight', display: 'Weight', description: 'The mass of this pokémon.' },
      ],
      selectionList_4: [],
      selectionList_5: [
        { option: 'forms', display: 'Pokémon forms', description: `Some pokémon have the ability to take on different forms. At times, these differences are purely cosmetic and have no bearing on the difference in the Pokémon's stats from another; however, several Pokémon differ in stats (other than HP), type, and Ability depending on their form.` },
        { option: 'pal_park', display: 'Pal park encounters', description: `Areas used for grouping pokémon encounters in Pal Park. They're like habitats that are specific to Pal Park.` },
      ]
    };

    this.option = {
      selectionList_1: {
        state: false, input: '',
        selections: {
          ability: false, color: false, eggGroup: false, 
          growthRate: false, habitat: false, shape: false, type: false
        }
      },
      selectionList_2: {
        state: false, input: '',
        selections: {
          isBaby: false, isMega: false, isDefault: false,
          formsSwitchable: false, hasGenderDifferences: false
        }
      },
      selectionList_3: {
        state: false, input: '', invalid: true,
        selections: {
          baseExperience: false, baseHappiness: false, captureRate: false, 
          hatchCounter: false, height: false, pokemonNo: false, weight: false, 
        }
      },
      selectionList_4: {
        state: false, input: '', invalid: true,
        selections: {
          moves: false
        }
      },
      selectionList_5: {
        state: false, input: '', invalid: true,
        selections: {
          forms: false, pal_park: false
        }
      },
      selectionList_6: {
        state: false, input: '', invalid: true,
        selections: {}
      }
    };

    this.subscriptions = [];
  }

  pageListeners() {
    
    const sl1 = (res: any) => {
      this.option.selectionList_1.state = true;
      this.shared.updateOptionLoadedSelection = true;

      this.options.selectionList_1.forEach((item: any) => {
        this.selections.selectionList_1[item.option] = res[item.option];
      });
    };

    if (!this.api.cached_sl1) {
      this.api.selectionList_1.subscribe((res) => {
        this.api.cached_sl1 = res;
        sl1(res);
      });
    } else {
      sl1(this.api.cached_sl1);
    }

    this.option.selectionList_2.state = true
    this.shared.updateOptionLoadedSelection = true;
    this.selections.selectionList_2 = this.api.selectionList_2;

    this.option.selectionList_3.state = true;
    this.shared.updateOptionLoadedSelection = true;
    this.selections.selectionList_3 = this.api.selectionList_3;

    const sl4 = () => {
      this.option.selectionList_4.state = true;
      this.shared.updateOptionLoadedSelection = true;
      this.selections.selectionList_4 = this.api.selectionList_4;
    };

    if (!this.api.cached_sl4) {
      // this.api.loadedPokemonEntries.subscribe((res) => {
      //   this.api.cached_sl4 = res;
      //   sl4();
      // });
    } else { sl4(); }

    const sl5 = (res: any) => {
      this.option.selectionList_5.state = true;
      this.shared.updateOptionLoadedSelection = true;
      this.selections.selectionList_5 = res;
    };

    if (!this.api.cached_sl5) {
      // this.api.selectionList_5.subscribe((res) => {
      //   this.api.cached_sl5 = res;
      //   sl5(res);
      // });
    } else { sl5(this.api.cached_sl5); }

    this.option.selectionList_6.state = true;
    this.shared.updateOptionLoadedSelection = true;
    // this.selections.selectionList_6 = this.api.selectionList_6;

  }

  modelChangedSelection(model: string, group: string, type: string, others?: NgModel) {

    if (group === 'selectionList_3') {
      return this.option.selectionList_3.invalid = others.invalid;
    }

    const _model = model.toLowerCase();

    const filtered = (selection: any[]) => selection.filter(e => e.name.includes(_model));

    if (model === null) {
      this.selections[group][type] = this._selections;
    } else {
      setTimeout(() => {

        this.selections[group][type] = group !== 'selectionList_4'
          ? filtered(this._selections)
          : this._selections.map((group) => {
              group.moves = this._selections_deep[group.name].filter(e => 
                e.name.includes(_model.split(' ').join('-'))
              );
              return group;
            }).filter((group) => group.moves.length > 0);

      }, 150);
    }
  }

  selectionChange(model: string, group: string, type: string) {

    const entries = this.selections[group][type][model];

    this.entries.next(entries);
  }

  focus(group: string, option: string) {

    if (this.option[group].input.length > 0) return;

    const current = this.selections[group][option];
    const groups: any = {};
    
    if (group === 'selectionList_4') {
      current.forEach((e: any) => {
        groups[e.name] = e.moves
      });
    }


    const filtered = (selection: any[]) => selection.filter(e => e.name.includes(this.option[group].input));
    
    if (this.option[group].input.length > 0) {
      this.selections[group][option] = group !== 'selectionList_4'
        ? filtered(current)
        : current.map((group) => {
            group.moves = groups[group.name].filter(e => e.name.includes(this.option[group].input));
            return group;
          });
    }

    this._selections = current;

    if (group === 'selectionList_4') {
      this._selections_deep = groups;
    }
  }

  enter(group: string, type: string) {

    const selected = this.selections[group][type].find(e => e.name === this.option[group].input);

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

  searchNumber(type: string, input: NgModel) {

    if (input.invalid) return;
    
    this.entries.next(
      this.api.filteredNumberEntries(+input.value, type)
    )
  }

  searchMove(model: string) {

    this.entries.next(
      this.api.filteredPokemonEntries(model)
    )
  }

  toggle(state: boolean, group: string, option: string) {

    this.option[group].input = '';

    if (state) {
      
      setTimeout(() => 
        this.option[group].selections[option] = state, 250
      );
      
    } else {
      this.option[group].selections[option] = state;
      this.selections[group][option] = this._selections;
      this._selections = [];
    }
  }

}
