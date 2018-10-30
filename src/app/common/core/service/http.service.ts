import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, first } from 'rxjs/operators'
import * as _ from 'lodash';_

import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url: string = '';

  constructor(
    private http: HttpClient,
    private shared: SharedService
  ) { }

  getPokedex(dex: number) {
    return JSON.parse(sessionStorage.getItem(`pokedex_${dex}`));
  }

  getPokedexByGeneration(gen: number): any {
    return JSON.parse(localStorage.getItem(`generation_${gen}`))
  }

  localStorageInit(option: boolean) {
    for (let i = 0; i < 15; i++) {

      ((i > -1 && i < 9) || (i > 9 && i < 15)) && option
        ? this.loadPokedex(i+1)
        : ((i > -1 && i < 9) || (i > 9 && i < 15)) && !option
          ? sessionStorage.removeItem(`pokedex_${i}`)
          : 0;

      (i < 7) && option
        ? this.loadGeneration(i+1)
        : (i < 7) && !option
          ? localStorage.removeItem(`generation_${i}`)
          : 0;

    }
  }

  loadPokedex(i: number) {
    this.http.get(`assets/api/v2/pokedex/${i}/index.json`).pipe(
      map((gen: any) => {
        return gen.pokemon_entries.map((spec: any) => {
          const name = spec.pokemon_species.name;
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
    ).subscribe((res) => {
      sessionStorage.setItem(`pokedex_${i}`, JSON.stringify(res));
    });
  }

  loadGeneration(i: number) {
    this.http.get(`assets/api/v2/generation/${i}/index.json`).pipe(
      map((gen: any) => {
        return gen.pokemon_species.map((spec) => {
          const name = spec.name;
          const buffer = spec.url.split('/');
          spec['slug'] = name;
          spec['id'] = buffer[buffer.length - 2];
          spec['image'] = spec.image.image;
          spec['name'] = name[0].toUpperCase() + name.slice(1);
          return spec;
        }).sort((a, b) => a.id - b.id);
      })
    ).subscribe((res) => {
      localStorage.setItem(`generation_${i}`, JSON.stringify(res));
    });
  }

  loadSprites() {
    this.http.get(`assets/api/v2/sprite/index.json`).pipe(
      first()
    ).subscribe((res) => {
      localStorage.removeItem(`images`);
      localStorage.setItem(`images`, JSON.stringify(res));
    });
  }

  getPokemon(config: any) {
    this.shared.setSelected({ ...config });
    if (this.url === config.url) return;
    this.url = config.url;
    if (config.isEsc) return;
    this.http.get(config.url).subscribe((response) => {
      this.shared.setSelected({ ...response, ...config });
    });
  }

}
