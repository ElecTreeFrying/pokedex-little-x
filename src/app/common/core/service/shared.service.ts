import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  region = [ 'National Pokédex', 'Kanto Region', 'Jhoto Region', 'Hoenn Region', 'Sinnoh Region', 'Unova Region', 'Kalos Region', 'Alola Region' ]

  types: { name: string, color: string }[] = [
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

  pokemonChange = new Subject();
  selectedChange = new Subject();

  constructor() { }

  setPokemon(gen: number) {
    this.pokemonChange.next({ gen, region: this.region[gen] });
  }

  setSelected(spec: any) {
    this.selectedChange.next({ ...spec });
  }

}
