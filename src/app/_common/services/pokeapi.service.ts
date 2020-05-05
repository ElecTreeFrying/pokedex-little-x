import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, exhaustMap, toArray } from 'rxjs/operators'
import { of, merge } from 'rxjs';
import { intersectionBy } from 'lodash';

import { SharedService } from './shared.service';


@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  count: number;

  constructor(
    private http: HttpClient,
    private shared: SharedService
  ) { 

    this.count = 0;

    shared.updateAppInitializationSelection = 1;
    shared.updateLoadMoreSelection = 0;
    shared.defaultLength = 50;
    shared.index = { value: 0, count: 0 };
    
    if (sessionStorage.getItem('entries')) {
      setTimeout(() => {
        shared.updateAppInitializationSelection = 2;      
      }, 1000);
    }

    this.http.get('assets/api.json').subscribe((res: any) => {
      
      shared.updateAppInitializationSelection = 2;

      shared.pokemon = res.pokemon;
      shared.pokedex = res.pokedex;
      shared.generation = res.generation;
      shared.item_attributes = res.item_attributes;
      shared.item_categories = res.item_categories;

    });
  }

  get moves() {
    
    const id = this.shared.id;

    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
      exhaustMap((pokemon: any) => {
        
        const moves = pokemon.moves.map((move: any) => {
          move.name = move.move.name;
          return move;
        });

        return this.http.get('https://pokeapi.co/api/v2/move?offset=0&limit=746').pipe(
          map((e) => intersectionBy(e['results'], moves, 'name')),
          exhaustMap(e => of(e.map(e => this.http.get(e['url'])))),
          exhaustMap((e: any) => e),
          mergeMap((e: any) => e),
          toArray(),
        );
      })
    )
  }

  get pokemon() {

    const id = this.shared.id;

    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
      exhaustMap((pokemon) => {
        
        const species = this.species(pokemon['species']['url']);

        const entry = this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

        const ability = of(
          pokemon['abilities'].map((e) => this.http.get(e['ability']['url']))
        ).pipe(
          exhaustMap((e: any) => e),
          mergeMap((e: any) => e),
          toArray(),
        );

        const game_indices = of(
          pokemon['game_indices'].map((e) => this.http.get(e['version']['url']))
        ).pipe(
          exhaustMap((e: any) => e),
          mergeMap((e: any) => e),
          toArray(),
        );

        const types = of(
          pokemon['types'].map((e) => this.http.get(e['type']['url']))
        ).pipe(
          exhaustMap((e: any) => e),
          mergeMap((e: any) => e),
          toArray(),
        );

        return merge(
          species, entry, ability, game_indices, types
        );
      }),
      toArray(),
      map((result: any[]) => {

        const _result = result.filter(e => e.length);

        const data = result.find(e => e.hasOwnProperty('abilities'));
        
        data['species']['data'] = result.find(e => e.hasOwnProperty('base_happiness'));
        data['abilities'] = _result.find((e) => e.filter(e => e.hasOwnProperty('effect_changes')).length > 0);
        data['game_indices'] = _result.find((e) => e.filter(e => e.hasOwnProperty('version_group')).length > 0);
        data['types'] = _result.find((e) => e.filter(e => e.hasOwnProperty('damage_relations')).length > 0);

        delete data['forms'];

        return data;
      })
    )
  }

  nextEntries(entries: any[]) {

    const defaultLength = 20; // this.shared.defaultLength

    this.shared.index = {
      value: this.shared.index.value + defaultLength,
      count: ++this.count
    };

    this.clearCount();

    return entries.slice(this.shared.index.value, this.shared.index.value + defaultLength);
  }

  private clearCount() {
    if (this.shared.item_meta.ceil === this.shared.index.count) {
      this.count = 0;
    }
  }

  private species(url: string) {
    return this.http.get(url).pipe(
      exhaustMap((specie) => {
        
        const specie_ = this.http.get(url);

        const color = this.http.get(specie['color']['url']).pipe(
          map((e) => ({ ...e, _color_: true }))
        );
        
        const growth_rate = this.http.get(specie['growth_rate']['url']).pipe(
          map((e) => ({ ...e, _growth_rate_: true }))
        );
        
        const habitat = this.http.get(specie['habitat']['url']).pipe(
          map((e) => ({ ...e, _habitat_: true }))
        );
        
        const shape = this.http.get(specie['shape']['url']).pipe(
          map((e) => ({ ...e, _shape_: true }))
        );

        const egg_groups = of(
          specie['egg_groups'].map((e) => this.http.get(e['url']))
        ).pipe(
          exhaustMap((e: any) => e),
          mergeMap((e: any) => e),
          toArray(),
        );
        
        const varieties = of(
          specie['varieties'].map((e) => this.http.get(e['pokemon']['url']))
        ).pipe(
          exhaustMap((e: any) => e),
          mergeMap((e: any) => e),
          toArray(),
        );

        const evolution_chain = this.evolution_chain(specie['evolution_chain']['url']);

        return merge(
          specie_, color, growth_rate, habitat, shape, egg_groups, varieties, evolution_chain
        );
      }),
      toArray(),
      map((result: any[]) => {

        const _result = result.filter(e => e.length);

        const data = result.find(e => e.hasOwnProperty('base_happiness'));

        data['color']['data'] = result.find(e => e.hasOwnProperty('_color_'));
        data['growth_rate']['data'] = result.find(e => e.hasOwnProperty('_growth_rate_'));
        data['habitat']['data'] = result.find(e => e.hasOwnProperty('_habitat_'));
        data['shape']['data'] = result.find(e => e.hasOwnProperty('_shape_'));
        data['evolution_chain']['data'] = result.find(e => e.hasOwnProperty('first'));

        const egg_groups = _result.find((e) => e.filter(e => e.hasOwnProperty('pokemon_species')).length > 0);
        const varieties = _result.find((e) => e.filter(e => e.hasOwnProperty('abilities')).length > 0);

        data['egg_groups'] = data['egg_groups'].map((e, i) => {
          e['data'] = egg_groups[i]; return e; });

        data['varieties'] = data['varieties'].map((e, i) => {
          e['pokemon']['data'] = varieties[i]; return e; });

        return data;
      })
    );
  }

  private evolution_chain(url: string) {
    return this.http.get(url).pipe(
      map((chain) => {

        let first = null;
        if (chain['chain']['evolves_to'].length > 0) {
          const id = +chain['chain']['species']['url'].split('/').reverse()[1];
          first = {
            name: chain['chain']['species']['name'],
            level: 1,
            evolution: chain['chain']['evolves_to'][0]['species']['name'],
            pokemon: chain['chain']['evolves_to'][0],
            entry_number: +id,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
          }
        } else {
          const id = +chain['chain']['species']['url'].split('/').reverse()[1];
          first = {
            name: chain['chain']['species']['name'],
            level: 1, evolution: null, pokemon: null,
            entry_number: +id,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
          }

          return { first, second: null, third: null };
        }

        let second = null;
        if (first['pokemon']['evolves_to'].length > 0) {
          const id = +first['pokemon']['species']['url'].split('/').reverse()[1];
          second = {
            name: first['pokemon']['species']['name'],
            level: chain['chain']['evolves_to'][0]['evolution_details'][0]['min_level'],
            evolution: first['pokemon']['evolves_to'][0]['species']['name'],
            pokemon: first['pokemon']['evolves_to'][0],
            entry_number: +id,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
          }
        } else {
          const id = +first['pokemon']['species']['url'].split('/').reverse()[1];
          second = {
            name: first['pokemon']['species']['name'],
            level: chain['chain']['evolves_to'][0]['evolution_details'][0]['min_level'],
            evolution: null, pokemon: null,
            entry_number: +id,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
          }

          return { first, second, third: null };
        }
        
        let third = null;
        if (second['pokemon']['evolves_to'].length > 0) {
          const id = +second['pokemon']['species']['url'].split('/').reverse()[1];
          third = {
            name: second['pokemon']['species']['name'],
            level: first['pokemon']['evolves_to'][0]['evolution_details'][0]['min_level'],
            evolution: second['pokemon']['evolves_to'][0]['species']['name'],
            pokemon: second['pokemon']['evolves_to'][0],
            entry_number: +id,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
          }
        } else {
          const id = +second['pokemon']['species']['url'].split('/').reverse()[1];
          third = {
            name: second['pokemon']['species']['name'],
            level: first['pokemon']['evolves_to'][0]['evolution_details'][0]['min_level'],
            evolution: null, pokemon: null,
            entry_number: +id,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
          }
        }

        delete first['pokemon'];
        delete second['pokemon'];
        delete third['pokemon'];
        
        return { first, second, third };
      })
    )
  }















  // ----------------------------------------------------------------- //
  // ----------------------------------------------------------------- // 
  // ----------------------------------------------------------------- //

  // --------------------- D O  N O T  T O U C H --------------------- //

  // ----------------------------------------------------------------- //
  // ----------------------------------------------------------------- //
  // ----------------------------------------------------------------- //

  // dev

  pokemon_() {

    merge(
      this.mergeItem(1),
    ).pipe( toArray() ).subscribe((res) => {
    
      console.log(res);
      
    });
    
  }
  
  private _mergeItem1(id: number) {
    const flat = this.http.get('assets/flat.json');
    return merge(
      this.http.get(`https://pokeapi.co/api/v2/pokedex/${id}`).pipe(
        map(e => e['pokemon_entries'].map((pokemon) => {
          const id = +pokemon['pokemon_species']['url'].split('/').reverse()[1];
          const name = pokemon['pokemon_species']['name'];
          const entry_number = pokemon['entry_number'];
          return { id, name, entry_number };
        }))
      ),
      flat
    ).pipe(
      toArray(),
      map((res) => {
        const flat = <any[]>res[1];
        const item = <any[]>res[0];
        return {
          id,
          entries: item.map((e: any) => {
            const fromFlat = flat.find(c => c['id'] === e['id']);
            return { ...fromFlat, ...e }
          })
        };
      })
    );
  }

  private _mergeItem2(id: number) {
    const flat = this.http.get('assets/flat.json');

    return merge(
      this.http.get(`https://pokeapi.co/api/v2/generation/${id}`).pipe(
        map(e => e['pokemon_species'].map((pokemon) => {
          const id = +pokemon['url'].split('/').reverse()[1];
          const name = pokemon['name'];
          return { id, name };
        })),
      ),
      flat
    ).pipe(
      toArray(),
      map((res) => {
        const flat = <any[]>res[1];
        const item = <any[]>res[0];
        return {
          id,
          entries: item.map((e: any) => {
            const fromFlat = flat.find(c => c['id'] === e['id']);
            return { ...fromFlat, ...e }
          })
        };
      })
    );
  }

  private _mergeItemAll3() {
    return this.http.get('assets/items.json').pipe(
      map((e: any) => ({
        id: 0,
        entries: e.map((c) => {
          c['name'] = c['name'].replace('.png', '');
          return c;
        })
      }))
    );
  }

  private _mergeItem3(id: number) {
    const items = this.http.get('assets/items.json').pipe(
      map((e: any) => e.map((c) => {
        c['name'] = c['name'].replace('.png', '');
        return c;
      }))
    );

    return merge(
      this.http.get(`https://pokeapi.co/api/v2/item-attribute/${id}`).pipe(map((e) => e['items'])),
      items
    ).pipe(
      toArray(),
      map((res) => {
        const item = <any[]>res[0];
        const flat = <any[]>res[1];
        return {
          id,
          entries: intersectionBy(flat, item, 'name')
        };
      })
    );
  }

  private mergeItem(id: number) {
    const items = this.http.get('assets/items.json').pipe(
      map((e: any) => e.map((c) => {
        c['name'] = c['name'].replace('.png', '');
        return c;
      }))
    );

    return merge(
      this.http.get(`https://pokeapi.co/api/v2/item-category/${id}`).pipe(map((e) => e['items'])),
      items
    ).pipe(
      toArray(),
      map((res) => {
        const item = <any[]>res[0];
        const flat = <any[]>res[1];

        return {
          id,
          entries: intersectionBy(flat, item, 'name')
        };
      })
    );
  }

}
