import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, exhaustMap, toArray, concatMap } from 'rxjs/operators';
import { intersectionBy, snakeCase } from 'lodash';

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

  private _cached_sl1: any;
  set cached_sl1(res: any) { this._cached_sl1 = res; }
  get cached_sl1() { return this._cached_sl1; }

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

  get selectionList_3() {
    const data = this.shared.keys.pokemon_search.number

    return {
      baseExperience: {
        meta: { min: data.meta.min.base_experience, max: data.meta.max.base_experience },
        data: data.data
      },
      baseHappiness: {
        meta: { min: data.meta.min.base_happiness, max: data.meta.max.base_happiness },
        data: data.data
      },
      captureRate: {
        meta: { min: data.meta.min.capture_rate, max: data.meta.max.capture_rate },
        data: data.data
      },
      hatchCounter: {
        meta: { min: data.meta.min.hatch_counter, max: data.meta.max.hatch_counter },
        data: data.data
      },
      height: {
        meta: { min: data.meta.min.height, max: data.meta.max.height },
        data: data.data
      },
      pokemonNo: {
        meta: { min: data.meta.min.order, max: data.meta.max.order },
        data: data.data
      },
      weight: {
        meta: { min: data.meta.min.weight, max: data.meta.max.weight },
        data: data.data
      },
    };
  }

  filteredNumberEntries(num: number, type: string) {

    type = type === 'pokemonNo' ? 'order' : snakeCase(type);

    const all: any[] = this.shared.keys.pokemon_search.number.data;

    return intersectionBy(this.shared.pokemon, all.filter(e => e[type] === num), 'id');
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
