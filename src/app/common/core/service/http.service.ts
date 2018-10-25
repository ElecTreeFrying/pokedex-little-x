import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators'

const IMAGE_PATH = '../../assets/pokemon';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllPokemon() {
    return this.http.get(`https://pokeapi.co/api/v2/pokedex/1/`).pipe(
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
        // }).slice(0, 24);
      })
    )
  }

  getPokedexByGeneration(gen: number) {
    return this.http.get(`https://pokeapi.co/api/v2/generation/${gen}/`).pipe(
      map((gen: any) => {
        return gen.pokemon_species.map((spec) => {
          const name = spec.name;
          const buffer = spec.url.split('/');
          spec['slug'] = name;
          spec['id'] = buffer[buffer.length - 2];
          spec['image'] = `${IMAGE_PATH}/${spec.id}.png`
          spec['name'] = name[0].toUpperCase() + name.slice(1);
          return spec;
        }).sort((a, b) => a.id - b.id);
        // }).sort((a, b) => a.id - b.id).slice(0, 24);
      })
    )
  }

}
