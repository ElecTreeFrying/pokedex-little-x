import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators'
import * as _ from 'lodash';

import { SharedService } from './shared.service';

import { PokeCard, PokeCardConfig } from '../../shared/interface/shared';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url: string = '';

  constructor(
    private http: HttpClient,
    private shared: SharedService
  ) { }

  getPokedex(dex: number): PokeCard[] {
    dex = dex === 9 ? 13 : dex === 10 ? 9 : dex;
    return JSON.parse(sessionStorage.getItem(`pokedex`))[dex];
  }

  getPokedexByGeneration(gen: number): PokeCard[] {
    return JSON.parse(localStorage.getItem(`generation`))[gen]
  }

  localStorageInit() {
    localStorage.clear();
    sessionStorage.clear();
    this.loadGeneration();
    this.loadPokedex();
  }

  loadPokedex() {
    this.http.get(`assets/api/pokedex.json`).pipe(
      map((inedx: any[]) => {
        return inedx.map((gen: any) => {
          return gen.pokemon_entries.map((spec: any) => {
            const name = spec.pokemon_species.name;
            spec['gen'] = gen.descriptions[0].description;
            spec['slug'] = name;
            spec['id'] = spec.entry_number;
            spec['image'] = spec.image.image;
            spec['name'] = name[0].toUpperCase() + name.slice(1);
            delete spec.pokemon_species;
            delete spec.pokemon_entries;
            delete spec.entry_number;
            return spec;
          });
        })
      })
    ).subscribe((res) => {
      sessionStorage.setItem(`pokedex`, JSON.stringify(res));
    });
  }

  loadGeneration() {
    this.http.get(`assets/api/generation.json`).pipe(
      map((index: any[]) => {
        return index.map((gen: any) => {
          return gen.pokemon_species.map((spec: any) => {
              const name = spec.name;
              const buffer = spec.url.split('/');
              spec['gen'] = gen.name;
              spec['slug'] = name;
              spec['id'] = buffer[buffer.length - 2];
              spec['image'] = spec.image.image;
              spec['name'] = name[0].toUpperCase() + name.slice(1);
              return spec;
            }).sort((a, b) => a.id - b.id);
        })
      })
    ).subscribe((res: any[]) => {
      this.shared.setShared = res[0];
      localStorage.setItem(`generation`, JSON.stringify(res));
    });
  }

  getPokemon(config: PokeCardConfig) {
    this.shared.setSelected = { ...config };
    this.url = config.url;
    if (config.isEsc) return;
    this.http.get(config.url).subscribe((res) => {
      this.shared.setSelected = { ...res, ...config };
    });
  }

}
