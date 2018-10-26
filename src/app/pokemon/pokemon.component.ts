import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { HttpService } from '../common/core/service/http.service';
import { SharedService } from '../common/core/service/shared.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
  host: {
    '(document:keydown)': 'onEsc($event)'
  }
})
export class PokemonComponent implements OnInit {

  _pokemon  = [];
  isLoad: boolean = true;
  region: string = 'Loading...';

  constructor(
    private service: HttpService,
    private shared: SharedService
  ) {
    this._pokemon = _.fill(Array(18), {});
    this.isLoad = true;

    this.shared.pokemonChange.subscribe((pokemon: any) => {

      this.region = 'Loading...';
      this._pokemon = _.fill(Array(18), {});
      if (this.region === pokemon.region) return;
      this.isLoad = true;

      pokemon.gen === 0
        ? (() => {
            this.service.getAllPokemon
              .subscribe((res) => {
                this.region = pokemon.region;
                this._pokemon = res;
                this.isLoad = false;
              });
          })()
        : (() => {
            this.service.getPokedexByGeneration(pokemon.gen)
            .subscribe((res) => {
                this.region = pokemon.region;
                this._pokemon = res;
                this.isLoad = false;
              });
          })();

    });
  }

  ngOnInit() {
  }

  imageLoaded() {
    this.isLoad = false;
  }

  selectPokemon(poke: any) {
    const url = `https://pokeapi.co/api/v2/pokemon/${poke.slug}/`;
    this.service.getPokemon({ url, isEsc: false });
  }

  onEsc(event?: any) {
    if (event.key === 'Escape') {
      this.service.getPokemon({ url: '', isEsc: true });
    }
  }

}
