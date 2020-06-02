import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, exhaustMap, toArray, concatMap } from 'rxjs/operators';
import { intersectionBy } from 'lodash';

import { SharedService } from './shared.service';


@Injectable({
  providedIn: 'root'
})
export class SearchOptionPokemonService {

  url = {
    ability: 'https://pokeapi.co/api/v2/ability/?offset=0&limit=293',
    color: 'https://pokeapi.co/api/v2/pokemon-color/',
    eggGroup: 'https://pokeapi.co/api/v2/egg-group/',
    growthRate: 'https://pokeapi.co/api/v2/growth-rate/',
    habitat: 'https://pokeapi.co/api/v2/pokemon-habitat/',
    shape: 'https://pokeapi.co/api/v2/pokemon-shape/',
    type: 'https://pokeapi.co/api/v2/type/'
  }

  constructor(
    private http: HttpClient,
    private shared: SharedService
  ) { }

  get selectionList_1() {
    return forkJoin({
      ability: this._returnResults_1(this.http.get(this.url.ability)),
      color: this._returnResults_1(this.http.get(this.url.color)),
      eggGroup: this._returnResults_1(this.http.get(this.url.eggGroup)),
      growthRate: this._returnResults_1(this.http.get(this.url.growthRate)),
      habitat: this._returnResults_1(this.http.get(this.url.habitat)),
      shape: this._returnResults_1(this.http.get(this.url.shape)),
      type: this._returnResults_1(this.http.get(this.url.type))
    });
  }

  get selectionList_2() {
    const data = this.shared.keys.pokemon_search.true_false;

    return {
      isBaby: {
        0: intersectionBy(this.shared.pokemon, data.filter(e => !e.is_baby), 'id'),
        1: intersectionBy(this.shared.pokemon, data.filter(e => e.is_baby), 'id')
      },
      isDefault: {
        0: intersectionBy(this.shared.pokemon, data.filter(e => !e.is_default), 'id'),
        1: intersectionBy(this.shared.pokemon, data.filter(e => e.is_default), 'id')
      },
      isMega: {
        0: intersectionBy(this.shared.pokemon, data.filter(e => !e.is_mega), 'id'),
        1: intersectionBy(this.shared.pokemon, data.filter(e => e.is_mega), 'id')
      },
      formsSwitchable: {
        0: intersectionBy(this.shared.pokemon, data.filter(e => !e.forms_switchable), 'id'),
        1: intersectionBy(this.shared.pokemon, data.filter(e => e.forms_switchable), 'id')
      },
      hasGenderDifferences: {
        0: intersectionBy(this.shared.pokemon, data.filter(e => !e.has_gender_differences), 'id'),
        1: intersectionBy(this.shared.pokemon, data.filter(e => e.has_gender_differences), 'id')
      }
    };
  }

  private _returnResults_1(result: Observable<any>) {
    return result.pipe(
      exhaustMap((e: any) => e.results.map(e => this.http.get(e.url))),
      concatMap((e: any) => e),
      map((e: any) => {
        
        if (e.hasOwnProperty('pokemon')) {
          e.pokemon_species = e.pokemon.map(e => e.pokemon);
          delete e.pokemon;
        }

        e.pokemon_species = e.pokemon_species.map((e) => {
          e.id = +e.url.split('/').reverse()[1];
          delete e.url;
          return e;
        });

        e.pokemon_species = intersectionBy(this.shared.pokemon, e.pokemon_species, 'id');

        return {
          id: e.id,
          name: e.name.split('-').join(' '),
          data: e
        };
      }),
      toArray(),
    )
  }


}
