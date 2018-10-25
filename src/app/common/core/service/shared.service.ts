import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  region = [ 'National Pokédex', 'Kanto Region', 'Jhoto Region', 'Hoenn Region', 'Sinnoh Region', 'Unova Region', 'Kalos Region', 'Alola Region' ]

  pokemonChange = new Subject();

  constructor() { }

  setPokemon(gen: number) {
    this.pokemonChange.next({ gen, region: this.region[gen] });
  }

}
