import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';


interface Key { 
  types: any[];
  move_damage_class: any[];
  no_habitat: any[];
  natures?: any[];
  characteristics?: any[];
  pokemon_moves?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private loadedAllSource = new BehaviorSubject(null);
  private routeChangeSource: BehaviorSubject<any>;
  private appInitializationSource = new BehaviorSubject(0);
  private loadMoreSource = new BehaviorSubject(0);
  private isLoadingSource = new BehaviorSubject(false);
  private selectedEntrySource = new BehaviorSubject(undefined);
  private loadingDetailsSource = new BehaviorSubject(false);
  private searchSource = new BehaviorSubject('-1');
  private loadMorePositionSource = new BehaviorSubject(false);

  loadedAll = this.loadedAllSource.asObservable();
  routeChange: Observable<any>;
  appInitialization = this.appInitializationSource.asObservable();
  loadMore = this.loadMoreSource.asObservable();
  isLoading = this.isLoadingSource.asObservable();
  selectedEntry = this.selectedEntrySource.asObservable();
  loadingDetails = this.loadingDetailsSource.asObservable();
  search = this.searchSource.asObservable();
  loadMorePosition = this.loadMorePositionSource.asObservable();

  private _id: number;
  get id() { return this._id; }
  set id(id: number) { this._id = id; }

  private _index: { value: number, count: number };
  get index() { return this._index; }
  set index(index: { value: number, count: number }) { this._index = index; }

  private _pokemon: any[];
  get pokemon() { return this._pokemon; }
  set pokemon(pokemon: any) { this._pokemon = pokemon; }

  private _pokedex: any[];
  get pokedex() { return this._pokedex; }
  set pokedex(pokedex: any) { this._pokedex = pokedex; }

  private _generation: any[];
  get generation() { return this._generation; }
  set generation(generation: any) { this._generation = generation; }

  private _moves: any[];
  get moves() { return this._moves; }
  set moves(moves: any) { this._moves = moves; }

  private _keys: Key;
  get keys() { return this._keys; }
  set keys(keys: Key) { this._keys = keys; }

  private _item_attributes: any[];
  get item_attributes() { return this._item_attributes; }
  set item_attributes(item_attributes: any) { this._item_attributes = item_attributes; }

  private _item_categories: any[];
  get item_categories() { return this._item_categories; }
  set item_categories(item_categories: any) { this._item_categories = item_categories; }

  private _defaultLength: number;
  get defaultLength() { return this._defaultLength; }
  set defaultLength(defaultLength: number) { this._defaultLength = defaultLength; }

  private _item_meta: { ceil: number, floor: number };
  get item_meta() { return this._item_meta ? this._item_meta : { ceil: 0, floor: 0 }; }
  set item_meta(item_meta: { ceil: number, floor: number }) { this._item_meta = item_meta; }

  private _loading: boolean;
  get loading() { return this._loading; }
  set loading(loading: boolean) { this._loading = loading; }

  private _dialogIsOpened: boolean;
  get dialogIsOpened() { return this._dialogIsOpened; }
  set dialogIsOpened(dialogIsOpened: boolean) { this._dialogIsOpened = dialogIsOpened; }

  private _bottomSheetIsOpened: boolean;
  get bottomSheetIsOpened() { return this._bottomSheetIsOpened; }
  set bottomSheetIsOpened(bottomSheetIsOpened: boolean) { this._bottomSheetIsOpened = bottomSheetIsOpened; }
  
  private _isLoadAll: boolean;
  get isLoadAll() { return this._isLoadAll; }
  set isLoadAll(isLoadAll: boolean) { this._isLoadAll = isLoadAll; }

  constructor() {
    const routeSession = sessionStorage.getItem('route');
    this.routeChangeSource = new BehaviorSubject(JSON.parse(routeSession));
    this.routeChange = this.routeChangeSource.asObservable();

    this._repeat = [];
  }

  get sections() {
    return [ true, true, true, false, false, true, false, false, true, false, true ];
  }

  get subSections() {
    return [ false, false, false ];
  }


  private _repeat: any[];
  checkRepeat(res: any, object: string) {
    this._repeat.unshift({
      res, object
    });
    const array = this._repeat.filter(e => e.object === object).slice(0, 2);
    if (array.length === 2) {
      return array[1].res === array[0].res;
    } else {
      return false;
    }
  }

  toGithubRaw(url: string) {

    const api = 'https://pokeapi.co/';
    const git = 'https://raw.githubusercontent.com/PokeAPI/api-data/master/data/';

    if (url.startsWith('/api')) {
      return git + url.slice(1) + 'index.json';
    }
    
    return url.replace(api, git) + 'index.json';
  }

  set updatedLoadedAllSelection(data: boolean){
    this.loadedAllSource.next(data);
  }

  set updatedRouteChangeSelection(data: any){
    this.routeChangeSource.next(data);
  }

  appInitializationCounter: number = 0;
  set updateAppInitializationSelection(data: number) {
    if (data === 2) {
      this.appInitializationCounter++;
      this.appInitializationCounter === 2 ? this.appInitializationSource.next(data) : 0;
    } else {
      this.appInitializationSource.next(data);
    }
  }

  set updateLoadMoreSelection(data: number) {
    this.loadMoreSource.next(data);
  }

  set updateIsLoadingSelection(data: boolean) {
    this.isLoadingSource.next(data);
  }

  set updateSelectedEntrySelection(data: boolean) {
    this.selectedEntrySource.next(data);
  }

  set updateLoadingDetailsSelection(data: boolean) {
    this.loadingDetailsSource.next(data);
  }

  set updateSearchSelection(data: string) {
    this.searchSource.next(data);
  }

  set updateLoadMorePositionSelection(data: boolean) {
    this.loadMorePositionSource.next(data);
  }

}

export const home = [
  { 
    name: 'Pokémon ', 
    description: 'Explore pokémon entries per Pokedex, Generation & Version groups, pokémon details and many more.'
  }, { 
    name: 'Items', 
    description: 'Item listings per Item Attribute and Category.' 
  }, { 
    name: 'Berries', 
    description: 'Berries' 
  }, { 
    name: 'Moves', 
    description: 'Moves' 
  }, { 
    name: 'Machine', 
    description: 'Machine' 
  }, { 
    name: 'Location', 
    description: 'Location' 
  }
];

export const type = [
  { key: 1, name: "Normal", color: { default: "#A8A878", dark: "#6D6D4E", light: "#C6C6A7" } },
  { key: 2, name: "Fighting", color: { default: "#C03028", dark: "#7D1F1A", light: "#D67873" } },
  { key: 3, name: "Flying", color: { default: "#A890F0", dark: "#6D5E9C", light: "#C6B7F5" } },
  { key: 4, name: "Poison", color: { default: "#A040A0", dark: "#682A68", light: "#C183C1" } },
  { key: 5, name: "Ground", color: { default: "#E0C068", dark: "#927D44", light: "#EBD69D" } },
  { key: 6, name: "Rock", color: { default: "#B8A038", dark: "#786824", light: "#D1C17D" } },
  { key: 7, name: "Bug", color: { default: "#A8B820", dark: "#6D7815", light: "#C6D16E" } },
  { key: 8, name: "Ghost", color: { default: "#705898", dark: "#493963", light: "#A292BC" } },
  { key: 9, name: "Steel", color: { default: "#B8B8D0", dark: "#787887", light: "#D1D1E0" } },
  { key: 10, name: "Fire", color: { default: "#F08030", dark: "#9C531F", light: "#F5AC78" } },
  { key: 11, name: "Water", color: { default: "#6890F0", dark: "#445E9C", light: "#9DB7F5" } },
  { key: 12, name: "Grass", color: { default: "#78C850", dark: "#4E8234", light: "#A7DB8D" } },
  { key: 13, name: "Electric", color: { default: "#F8D030", dark: "#A1871F", light: "#FAE078" } },
  { key: 14, name: "Psychic", color: { default: "#F85888", dark: "#A13959", light: "#FA92B2" } },
  { key: 15, name: "Ice", color: { default: "#98D8D8", dark: "#638D8D", light: "#BCE6E6" } },
  { key: 16, name: "Dragon", color: { default: "#7038F8", dark: "#4924A1", light: "#A27DFA" } },
  { key: 17, name: "Dark", color: { default: "#705848", dark: "#49392F", light: "#A29288" } },
  { key: 18, name: "Fairy", color: { default: "#EE99AC", dark: "#9B6470", light: "#F4BDC9" } },
  { key: 10001, name: "Unknown", color: { default: undefined, dark: undefined, light: undefined } },
  { key: 10002, name: "Shadow", color: { default: undefined, dark: undefined, light: undefined } }
];

export const pokedex = [
  { key: 1, name: 'National Pokedex' }, 
  { key: 2, name: 'Kanto Pokedex' }, 
  { key: 3, name: 'Original Johto Pokedex' }, 
  { key: 4, name: 'Hoenn Pokedex' }, 
  { key: 5, name: 'Original Sinnoh Pokedex' }, 
  { key: 6, name: 'Extended Sinnoh Pokedex' }, 
  { key: 7, name: 'Updated Johto Pokedex' }, 
  { key: 8, name: 'Original Unova Pokedex' }, 
  { key: 9, name: 'Updated Unova Pokedex' }, 
  { key: 11, name: 'Conquest Gallery' }, 
  { key: 12, name: 'Kalos Central Pokedex' }, 
  { key: 13, name: 'Kalos Coastal Pokedex' }, 
  { key: 14, name: 'Kalos Mountain Pokedex' }, 
  { key: 15, name: 'Updated Hoenn Pokedex' }
];

export const generation = [
  { key: 1, name: 'Generation I' },
  { key: 2, name: 'Generation II' },
  { key: 3, name: 'Generation III' },
  { key: 4, name: 'Generation IV' },
  { key: 5, name: 'Generation V' },
  { key: 6, name: 'Generation VI' },
  { key: 7, name: 'Generation VII' }
];

export const version = [
  { name: "Pokémon Red Version", id: 1 },
  { name: "Pokémon Blue Version", id: 2 },
  { name: "Pokémon Yellow Version", id: 3 },
  { name: "Pokémon Gold Version", id: 4 },
  { name: "Pokémon Silver Version", id: 5 },
  { name: "Pokémon Crystal Version", id: 6 },
  { name: "Pokémon Ruby Version", id: 7 },
  { name: "Pokémon Sapphire Version", id: 8 },
  { name: "Pokémon Emerald Version", id: 9 },
  { name: "Pokémon Firered Version", id: 10 },
  { name: "Pokémon Leafgreen Version", id: 11 },
  { name: "Pokémon Diamond Version", id: 12 },
  { name: "Pokémon Pearl Version", id: 13 },
  { name: "Pokémon Platinum Version", id: 14 },
  { name: "Pokémon Heartgold Version", id: 15 },
  { name: "Pokémon Soulsilver Version", id: 16 },
  { name: "Pokémon Black Version", id: 17 },
  { name: "Pokémon White Version", id: 18 },
  { name: "Pokémon Colosseum Version", id: 19 },
  { name: "Pokémon XD Version", id: 20 },
  { name: "Pokémon Black 2 Version", id: 21 },
  { name: "Pokémon White 2 Version", id: 22 },
  { name: "Pokémon X Version", id: 23 },
  { name: "Pokémon Y Version", id: 24 },
  { name: "Pokémon Omega Ruby Version", id: 25 },
  { name: "Pokémon Alpha Sapphire Version", id: 26 },
  { name: "Pokémon Sun Version", id: 27 },
  { name: "Pokémon Moon Version", id: 28 },
  { name: "Pokémon Ultra Sun Version", id: 29 },
  { name: "Pokémon Ultra Moon Version", id: 30 }
];

export const version_group = [
  { key: 2, id: 1, name: 'Red, Blue' },
  { key: 2, id: 2, name: 'Yellow' },
  { key: 3, id: 3, name: 'Gold, Silver' },
  { key: 3, id: 4, name: 'Crystal' },
  { key: 4, id: 5, name: 'Ruby, Sapphire' },
  { key: 4, id: 6, name: 'Emerald' },
  { key: 2, id: 7, name: 'Firered, Leafgreen' },
  { key: 5, id: 8, name: 'Diamond, Pearl' },
  { key: 6, id: 9, name: 'Platinum' },
  { key: 7, id: 10, name: 'Heartgold, Soulsilver' },
  { key: 8, id: 11, name: 'Black, White' },
  
  { key: 0, id: 12, name: 'Colosseum' },
  { key: 0, id: 13, name: 'XD' },
  { key: 0, id: 17, name: 'Sum, Moon' },
  { key: 0, id: 18, name: 'Ultra Sun, Ultra Moon' },

  { key: 9, id: 14, name: 'Black 2, White 2' },
  { key: -1, id: 15, name: 'X, Y' },
  { key: 15, id: 16, name: 'Omega Ruby, Alpha Sapphire' }
];

export const items = [
  { key: 0, name: 'All items' },
  { key: 1, name: 'Countable' },
  { key: 2, name: 'Consumable' },
  { key: 3, name: 'Usable over world' },
  { key: 4, name: 'Usable in battle' },
  { key: 5, name: 'Holdable' },
  { key: 6, name: 'Holdable passive' },
  { key: 7, name: 'Holdable active' },
  { key: 8, name: 'Underground' }
];

export const categories = [
  { key: 1, name: 'Stat boosts' },
  { key: 2, name: 'Effort drop' },
  { key: 3, name: 'Medicine' },
  { key: 4, name: 'Other' },
  { key: 5, name: 'In-a-pinch' },
  { key: 6, name: 'Picky healing' },
  { key: 7, name: 'Type protection' },
  { key: 8, name: 'Baking only' },
  { key: 9, name: 'Collectibles' },
  { key: 10, name: 'Evolution' },
  { key: 11, name: 'Spelunking' },
  { key: 12, name: 'Held items' },
  { key: 13, name: 'Choice' },
  { key: 14, name: 'Effort training' },
  { key: 15, name: 'Bad held items' },
  { key: 16, name: 'Training' },
  { key: 17, name: 'Plates' },
  { key: 18, name: 'Species specific' },
  { key: 19, name: 'Type enhancement' },
  { key: 20, name: 'Event items' },
  { key: 21, name: 'Gameplay' },
  { key: 22, name: 'Plot advancement' },
  { key: 23, name: 'Unused' },
  { key: 24, name: 'Loot' },
  { key: 25, name: 'All mail' },
  { key: 26, name: 'Vitamins' },
  { key: 27, name: 'Healing' },
  { key: 28, name: 'PP recovery' },
  { key: 29, name: 'Revival' },
  { key: 30, name: 'Status cures' },
  { key: 32, name: 'Mulch' },
  { key: 33, name: 'Special balls' },
  { key: 34, name: 'Standard balls' },
  { key: 35, name: 'Dex completion' },
  { key: 36, name: 'Scarves' },
  { key: 37, name: 'All machines' },
  { key: 38, name: 'Flutes' },
  { key: 39, name: 'Apricorn balls' },
  { key: 40, name: 'Apricorn box' },
  { key: 41, name: 'Data cards' },
  { key: 42, name: 'Jewels' },
  { key: 43, name: 'Miracle shooter' },
  { key: 44, name: 'Mega stones' },
  { key: 45, name: 'Memories' },
  { key: 46, name: 'Z - crystals' }
];

export const stat = [
  { id: 1, name: 'hp', max: 255 },
  { id: 2, name: 'attack', max: 190 },
  { id: 3, name: 'defense', max: 230 },
  { id: 4, name: 'special-attack', max: 194 },
  { id: 5, name: 'special-defense', max: 230 },
  { id: 6, name: 'speed', max: 180 }
];
