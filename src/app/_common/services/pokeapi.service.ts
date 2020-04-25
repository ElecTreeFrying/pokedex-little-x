import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, switchMap, toArray } from 'rxjs/operators'
import { combineLatest, merge } from 'rxjs';
import { intersectionBy, sortBy } from 'lodash';

import { SharedService, categories } from './shared.service';


@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  constructor(
    private http: HttpClient,
    private shared: SharedService
  ) { 

    shared.updateAppInitializationSelection = 1;
    
    this.http.get('assets/api.json').subscribe((res: any) => {
      
      shared.updateAppInitializationSelection = 2;

      shared.pokedex = res.pokedex;
      shared.generation = res.generation;
      shared.item_attributes = res.item_attributes;
      shared.item_categories = res.item_categories;

    });
  }















  // ----------------------------------------------------------------- //
  // ----------------------------------------------------------------- // 
  // ----------------------------------------------------------------- //

  // --------------------- D O  N O T  T O U C H --------------------- //

  // ----------------------------------------------------------------- //
  // ----------------------------------------------------------------- //
  // ----------------------------------------------------------------- //

  // dev

  pokemon() {

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
