import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, switchMap } from 'rxjs/operators'
import * as _ from 'lodash';

import { SharedService } from './shared.service';

import { PokeCard, PokeCardConfig } from '../../shared/interface/shared';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

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
    this.loadGeneration();
    this.loadPokedex();

    const front_default = this.http.get('assets/sprites/front_default.json');
    const back_default = this.http.get('assets/sprites/back_default.json');
    const front_shiny = this.http.get('assets/sprites/front_shiny.json');
    const back_shiny = this.http.get('assets/sprites/back_shiny.json');

    front_default.pipe(
      switchMap((front_def: any[]) => {
        return back_default.pipe(
          map((back_def: any[]) => {
            return {
              front_def: front_def.map((e) => {
                e.front_def_image = e.image;
                e.front_def_url = e.url;
                delete e.image; delete e.url; return e;
              }),
              back_def: back_def.map((e) => {
                e.back_def_image = e.image;
                e.back_def_url = e.url;
                delete e.image; delete e.url; return e;
              })
            };
          }),
          switchMap((merge1) => {
            return front_shiny.pipe(
              map((front_sh: any[]) => ({
                ...merge1,
                front_sh: front_sh.map((e) => {
                  e.front_sh_image = e.image;
                  e.front_sh_url = e.url;
                  delete e.image; delete e.url; return e;
                })
              })),
              switchMap((merge2) => {
                return back_shiny.pipe(
                  map((back_sh: any[]) => ({
                    ...merge2,
                    back_sh: back_sh.map((e) => {
                      e.back_sh_image = e.image;
                      e.back_sh_url = e.url;
                      delete e.image; delete e.url; return e;
                    })
                  }))
                )
              })
            )
          })
        )
      })
    ).subscribe(() => 0);
  }

  loadPokedex() {
    this.http.get(`assets/api/pokedex.json`).pipe(
      map((inedx: any[]) => {
        return inedx.map((gen: any) => {
          return gen.pokemon_entries.map((spec: any) => {
            const name = spec.pokemon_species.name;
            spec['gen'] = gen.descriptions[0].description;
            spec['version'] = gen.name;
            spec['slug'] = name;
            spec['id'] = spec.pokemon_species.url.split('/')[6];
            spec['image'] = spec.image.image;
            spec['name'] = name[0].toUpperCase() + name.slice(1);
            spec['url'] = spec.pokemon_species.url;
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
              spec['version'] = gen.name;
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
    const url = config.url_pokemon;
    if (config.isEsc || Number(url.split('/')[4]) >= 722) return;

    // const index = config.url_pokemon.split('/').reverse()[1];
    //
    // console.log(index);
    //
    // this.http.get(`assets/api/pokemon.json`).pipe(
    //   map((p: any[]) => p.find(e => e.id.toString() === index))
    // ).subscribe((response) => {
    //   console.log('pkmn: ', response);
    // });

    this.http.get(config.url_pokemon).pipe(
      switchMap((pokemon: any) => {
        const p = config.url_species.replace(/https:\/\/pokeapi.co/gi, 'assets');
        return this.http.get(p + 'index.json').pipe(
          map((species: any) => ({ ...pokemon, species })),
          switchMap((res2: any) => {
            const p = res2.species.evolution_chain.url;
            return this.http.get('assets' + p + 'index.json').pipe(
              map((evolution: any) => {
                const e0 = evolution.chain;
                const e1 = e0 !== undefined ? e0.evolves_to[0] : undefined;
                const e2 = e1 !== undefined ? e1.evolves_to[0] : undefined;
                return { ...res2, evolution: [ e0, e1, e2 ] }
              })
            )
          })
        )
      })
    ).subscribe((res) => {
      this.shared.setSelected = { ...res, ...config };
    });
  }

  getPokemonMoves(move: any) {
    return this.http.get('assets/api/moves.json').pipe(
      map((moves: any[]) => moves.find(e => e.name === move))
    )
  }

}
