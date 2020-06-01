import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, exhaustMap, mergeMap, toArray, concatMap } from 'rxjs/operators';
import { intersectionBy } from 'lodash';

import { SharedService } from './shared.service';
import { Observable, forkJoin } from 'rxjs';


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
      ability: this._returnResults(this.http.get(this.url.ability)),
      color: this._returnResults(this.http.get(this.url.color)),
      eggGroup: this._returnResults(this.http.get(this.url.eggGroup)),
      growthRate: this._returnResults(this.http.get(this.url.growthRate)),
      habitat: this._returnResults(this.http.get(this.url.habitat)),
      shape: this._returnResults(this.http.get(this.url.shape)),
      type: this._returnResults(this.http.get(this.url.type))
    });
  }

  private _returnResults(result: Observable<any>) {
    return result.pipe(
      exhaustMap((e: any) => e.results.map(e => this.http.get(e.url))),
      concatMap((e: any) => e),
      map((e: any) => e.name.replace('-', ' ')),
      toArray(),
    )
  }


}
