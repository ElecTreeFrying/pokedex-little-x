import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Types, PokeConfig, PokeCard } from '../../shared/interface/shared';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  region: string[] = [ 'Kanto Region', 'Jhoto Region', 'Hoenn Region', 'Sinnoh Region', 'Unova Region', 'Kalos Region', 'Alola Region', 'Collection Library' ];

  pokedex: string[] = [ 'National Pokédex', 'Red, Blue and Yellow', 'Gold, Silver and Crystal', 'Ruby, Emerald and Saphire', 'Diamond and Pearl', 'Platinum', 'Heartgold and Soulsilver', 'Black and White', 'Black2 and White 2', 'Omega Ruby and Alpha Saphire', 'Conquest Library' ];

  pokedex_version: string[] = [ 'National Pokédex', 'Pokemon Red, Blue and Yellow Version Pokédex', 'Pokemon Gold, Silver and Crystal Version Pokédex', 'Pokemon Ruby, Emerald and Saphire Version Pokédex', 'Pokemon Diamond and Pearl Version Pokédex', 'Pokemon Platinum Version Pokédex', 'Pokemon Heartgold and Soulsilver Version Pokédex', 'Pokemon Black and White Version Pokédex', 'Pokemon Black2 and White 2 Version Pokédex', 'Pokemon Omega Ruby and Alpha Saphire Version Pokédex', 'Conquest Library' ];

  types: Types[] = [
    { name: 'normal', color: '#B6B6A8' },
    { name: 'fire', color: '#FF6043' },
    { name: 'water', color: '#52A8FF' },
    { name: 'electric', color: '#FFD352' },
    { name: 'grass', color: '#8BD36E' },
    { name: 'ice', color: '#7DD3FF' },
    { name: 'fighting', color: '#C56E60' },
    { name: 'poison', color: '#B66EA8' },
    { name: 'ground', color: '#E2C56E' },
    { name: 'flying', color: '#9AA8FF' },
    { name: 'psychic', color: '#FF6EA8' },
    { name: 'bug', color: '#B6C543' },
    { name: 'rock', color: '#C4B67C' },
    { name: 'ghost', color: '#7D7DC5' },
    { name: 'dragon', color: '#8B7DF0' },
    { name: 'dark', color: '#8B6E60' },
    { name: 'steel', color: '#B6B6C5' },
    { name: 'fairy', color: '#F0A8F0' }
  ]

  navChange = new Subject();
  sharedChange = new Subject();
  pokemonChange = new Subject();
  sidenavChange = new Subject();
  selectedChange = new Subject();
  bottomsheetChange = new Subject();
  withContentChange = new Subject();

  constructor() { }

  setNav(option: boolean) {
    this.navChange.next(option);
  }

  set setShared(item: any) {
    this.sharedChange.next(item);
  }

  set setPokemon(poke: PokeConfig) {
    localStorage.region = poke.other ? this.region[poke.gen] : this.pokedex_version[poke.gen]
    this.pokemonChange.next({ gen: poke.gen, region: poke.other ? this.region[poke.gen] : this.pokedex_version[poke.gen], other: poke.other });
  }
  
  set setSidenav(option: boolean) {
    this.sidenavChange.next(option);
  }

  set setSelected(spec: any) {
    this.selectedChange.next({ ...spec });
  }

  set setBottomsheet(option: PokeCard[] | number) {
    this.bottomsheetChange.next(option);
  }
  
  set setWithContent(option: boolean) {
    this.withContentChange.next(option);
  }

}
