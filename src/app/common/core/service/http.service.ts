import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators'

import { SharedService } from './shared.service';

// const IMAGE_PATH = '../../assets/pokemon';
const IMAGE_PATH = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url: string = '';

  constructor(
    private http: HttpClient,
    private shared: SharedService
  ) { }

  get getAllPokemon() {
    return JSON.parse(localStorage.getItem(`national`));
  }

  getPokedexByGeneration(gen: number): any {
    return JSON.parse(localStorage.getItem(`generation_${gen}`))
  }

  loadNationalAndAllGenerations() {
    this.loadNational();
    for (let i = 0; i < 7; i++) {
      this.loadGeneration(i+1);
    }
  }

  loadNational() {
    this.http.get(`../../../../assets/api/v2/pokedex/1/index.json`).pipe(
      map((gen: any) => {
        return gen.pokemon_entries.map((spec: any) => {
          const name = spec.pokemon_species.name;
          spec['slug'] = name;
          spec['id'] = spec.entry_number;
          spec['image'] = `${IMAGE_PATH}/${spec.entry_number}.png`;
          spec['name'] = name[0].toUpperCase() + name.slice(1);
          delete spec.pokemon_species;
          delete spec.pokemon_entries;
          delete spec.entry_number;
          return spec;
        });
      })
    ).subscribe((res) => {
      localStorage.setItem(`national`, JSON.stringify(res));
    });
  }

  loadGeneration(i: number) {
    this.http.get(`../../../../assets/api/v2/generation/${i}/index.json`).pipe(
      map((gen: any) => {
        return gen.pokemon_species.map((spec) => {
          const name = spec.name;
          const buffer = spec.url.split('/');
          spec['slug'] = name;
          spec['id'] = buffer[buffer.length - 2];
          spec['image'] = `${IMAGE_PATH}/${spec.id}.png`;
          spec['name'] = name[0].toUpperCase() + name.slice(1);
          return spec;
        }).sort((a, b) => a.id - b.id);
      })
    ).subscribe((res) => {
      localStorage.setItem(`generation_${i}`, JSON.stringify(res));
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
