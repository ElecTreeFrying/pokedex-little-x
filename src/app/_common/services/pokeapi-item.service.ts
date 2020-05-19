import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, exhaustMap, switchMap, mergeMap, toArray } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';

import { SharedService } from './shared.service';


@Injectable({
  providedIn: 'root'
})
export class PokeapiItemService {

  constructor(
    private http: HttpClient,
    private shared: SharedService
  ) { }

  private _selection: any;
  set selection(data: any) { this._selection = data; }
  get selection() { return this._selection; }

  get data() {
    return {
      base64: `data:image/png;base64,${this.selection.byte64}`,
      name: this.selection.name
    }
  }

  item(id: number = this.shared.selectionData.key) {

    const url = `https://pokeapi.co/api/v2/item/${id}/`;
    const git = this.shared.toGithubRaw(url);
    
    return this.http.get(git).pipe(
      switchMap((res: any) => {
        
        const item = of(res).pipe(
          map(e => ({ ...e, _item: null }))
        );

        let baby_trigger_for, category, fling_effect, attribute, held_by_pokemon, machines;

        if (res.baby_trigger_for) {
          const _baby_trigger_for = this.shared.toGithubRaw(res.baby_trigger_for.url);
          baby_trigger_for = this.http.get(_baby_trigger_for).pipe(
            map(e => ({ ...e, _baby_trigger_for: null }))
          ); }

        if (res.category) {
          const _category = this.shared.toGithubRaw(res.category.url);
          category = this.http.get(_category).pipe(
            map(e => ({ ...e, _category: null }))
          ); }

        if (res.fling_effect) {
          const _fling_effect = this.shared.toGithubRaw(res.fling_effect.url);
          fling_effect = this.http.get(_fling_effect).pipe(
            map(e => ({ ...e, _fling_effect: null }))
          ); }

        if (res.attributes.length > 0) {
          attribute = of(
            res.attributes.map(e => this.http.get(
              this.shared.toGithubRaw(e.url)
            ).pipe( map(e => ({ ...e, _attributes: null })) ))
          ).pipe(
            exhaustMap((e: any) => e), mergeMap((e: any) => e), toArray()
          ); }

          if (res.held_by_pokemon.length > 0) {
            held_by_pokemon = of(
              res.held_by_pokemon.map(e => this.http.get(
                this.shared.toGithubRaw(e.pokemon.url)
              ).pipe( map(e => ({ ...e, _held_by_pokemon: null })) ))
            ).pipe(
              exhaustMap((e: any) => e), mergeMap((e: any) => e), toArray()
            ); }

        if (res.machines.length > 0) {
          machines = of(
            res.machines.map(e => this.http.get(
              this.shared.toGithubRaw(e.machine.url)
            ).pipe( map(e => ({ ...e, _machines: null })) ))
          ).pipe(
            exhaustMap((e: any) => e), mergeMap((e: any) => e), toArray()
          ); }

        const result = [
          item, baby_trigger_for, category, fling_effect,
          attribute, held_by_pokemon, machines
        ].filter(e => e);

        return forkJoin( ...result );
      }),
      map((res: any[]) => {

        let item = res.find(e => e.hasOwnProperty('_item'));
        const items = res.filter(e => e.length);

        const category = res.find(e => e.hasOwnProperty('_category'));
        const baby_trigger_for = res.find(e => e.hasOwnProperty('_baby_trigger_for'));
        const fling_effect = res.find(e => e.hasOwnProperty('_fling_effect'));

        const attributes = items.find(e => e.find(c => c.hasOwnProperty('_attributes')));
        const held_by_pokemon = items.find(e => e.find(c => c.hasOwnProperty('_held_by_pokemon')));
        const machines = items.find(e => e.find(c => c.hasOwnProperty('_machines')));

        item = this.check(item);

        item.category.data = category;
        item.baby_trigger_for.data = baby_trigger_for;
        item.fling_effect.data = fling_effect;

        item.attributes = item.attributes.map((attribute: any, i: number) => {
          const name = attribute.name;
          attribute.data = attributes.find(e => e.name === name);
          return attribute;
        });

        item.held_by_pokemon = item.held_by_pokemon.map((pokemon: any, i: number) => {
          const name = pokemon.pokemon.name;
          pokemon.data = held_by_pokemon.find(e => e.name === name);
          return pokemon;
        });

        item.machines = item.machines.map((machine: any, i: number) => {
          const id = +machine.machine.url.split('/').reverse()[1];
          machine.machine.data = machines.find(e => e.id === id);
          return machine;
        });

        return item;
      })
    );
  }

  check(item: any) {

    item.category = item.category ? item.category : { data: null }
    item.baby_trigger_for = item.baby_trigger_for ? item.baby_trigger_for : { data: null }
    item.fling_effect = item.fling_effect ? item.fling_effect : { data: null }

    return item;
  }
    
}
