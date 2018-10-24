import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators'

const IMAGE_PATH = '../../assets/pokemon';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  headers: HttpHeaders;

  constructor(
    private http: HttpClient,
  ) {
    this.headers = new HttpHeaders({
      // 'User-Agent': navigator.userAgent.toString()
    })

  }

  getAllPokemon() {
      return this.http.get(`https://pokeapi.co/api/v2/pokedex/1/`).pipe(
        map((response: any) => {
          const gen = response;
            return gen.pokemon_entries.map((spec) => {
              const buffer = spec.pokemon_species.url.split('/');
              spec['id'] = buffer[buffer.length - 2];
              spec['image'] = `${IMAGE_PATH}${spec.id}.png`
              return spec;
            }).sort((a, b) => a.id - b.id)
          }),
          map((response: any[]) => {
            return response.map((spec: any) => {
              delete spec.url;
              delete spec.name;
              return { ...spec, pokemon: this.getPokemonById(spec.id) }
            })
          })
        );
  }

  getPokedexByGeneration(gen: number) {
    return this.http.get(`https://pokeapi.co/api/v2/generation/${gen}/`).pipe(
      map((response: any) => {
        const gen = response;
        return gen.pokemon_species.map((spec) => {
          const buffer = spec.url.split('/');
          spec['id'] = buffer[buffer.length - 2];
          spec['image'] = `../../assets/pokemon/${spec.id}.png`
          return spec;
        }).sort((a, b) => a.id - b.id)
      }),
      map((response: any[]) => {
        return response.map((spec: any) => {
          delete spec.url;
          delete spec.name;
          return {
            ...spec,
            pokemon: this.getPokemonById(spec.id).pipe(
              map((response: any) => {
                response['name'] = response.name[0].toUpperCase() + response.name.slice(1)
                return response;
              })
            )
          }
        })
      })
    );
  }

  private getPokemonById(id: number) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  }


}
