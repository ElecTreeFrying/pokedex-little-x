import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { HttpService } from '../common/core/service/http.service';
import { SharedService } from '../common/core/service/shared.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  _pokemon  = [];
  isLoad: boolean = false;
  region: string = 'Kanto Region';

  constructor(
    private service: HttpService,
    private shared: SharedService
  ) {
    this._pokemon = _.fill(Array(100), {});
    this.isLoad = false;

    this.shared.pokemonChange.subscribe((pokemon: any) => {

      this.isLoad = true;
      this.region = pokemon.region;
      pokemon.gen === 0
        ? (() => {
            this.service.getAllPokemon()
              .subscribe((res) => {
                this._pokemon = res;
                this.isLoad = false;
              });
          })()
        : (() => {
            this.service.getPokedexByGeneration(pokemon.gen)
              .subscribe((res) => {
                this._pokemon = res;
                this.isLoad = false;
              });
          })();

    });
  }

  ngOnInit() {
    this.service.getPokedexByGeneration(1).subscribe((response: any[]) => {
      this._pokemon = response;
    });
  }

  imageLoaded() {
    this.isLoad = true;
  }

  selectPokemon(poke: any) {
    poke['url2'] = `https://pokeapi.co/api/v2/pokemon/${poke.slug}/`
    console.log(poke);
  }

}
