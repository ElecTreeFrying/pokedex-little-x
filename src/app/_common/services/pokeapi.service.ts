import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, exhaustMap, toArray, switchMap } from 'rxjs/operators'
import { of, merge, forkJoin } from 'rxjs';
import { intersectionBy, sortBy } from 'lodash';

import { SharedService } from './shared.service';

import { environment } from '../../../environments/environment';


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

    shared.isLoadAll = true;
    shared.dialogIsOpened = false;
    shared.bottomSheetIsOpened = false;
    shared.updateAppInitializationSelection = 1;
    shared.updateLoadMoreSelection = 0;
    shared.defaultLength = 50;
    shared.index = { value: 30, count: 0 };
    
    this.loadCDN();
  }

  private loadCDN() {

    forkJoin({ ...environment.data.map(e => this.http.get(e)) })
      .pipe(
        map(res => ({ ...res['0'], ...res['2'], moves: res['1'] }))
      )
      .subscribe((res) => {

        this.shared.pokemon = res.pokemon;
        this.shared.pokedex = res.pokedex;
        this.shared.generation = res.generation;
        this.shared.moves = res.moves;
        this.shared.berries = res.berries;
        this.shared.regions = res.regions;
        this.shared.item_attributes = res.item_attributes;
        this.shared.item_categories = res.item_categories;
        
        this.shared.keys = {
          types: res.keys.types,
          move_damage_class: res.keys.move_damage_class,
          no_habitat: intersectionBy(res.pokemon, res.keys.no_habitat, 'id'),
          encounter_method: res.keys.encounter_method,
          pokemon_moves: [],
          machines: res.keys.machines,
          machines_data: res.keys.machines_data,
          pokemon_search: {
            true_false: res.keys.pokemon_search.true_false,
            number: res.keys.pokemon_search.number,
            forms: res.keys.pokemon_search.forms,
            pal_park: res.keys.pokemon_search.pal_park,
            last: res.keys.pokemon_search.last
          }
        };

        this.shared.updateAppInitializationSelection = 2;
      
      });
  }

  moves(moves: any) {

    moves = moves.map((move: any) => {
      move.name = move.move.name;
      return move;
    });

    const result = intersectionBy(this.shared.moves, moves, 'name');

    const isNotSaved = !this.shared.keys.pokemon_moves.find(e => e.id === this.shared.id);

    if (isNotSaved) {
      this.shared.keys.pokemon_moves.push({ id: this.shared.id, result });
      return result;
    } else {
      return this.shared.keys.pokemon_moves.find(e => e.id === this.shared.id).result;
    }
  }

  detailMoves(moves: any[]) {
    return intersectionBy(this.shared.moves, moves, 'name');
  }

  flatMove(res: any) {

    const data: any = this.populateUndefinedMoves(res);

    data.contest_effect = this.addData(data.contest_effect);
    data.contest_type = this.addData(data.contest_type);
    data.damage_class = this.addData(data.damage_class);
    data.generation = this.addData(data.generation);
    data.super_contest_effect = this.addData(data.super_contest_effect);
    data.target = this.addData(data.target);
    data.meta.ailment = this.addData(data.meta.ailment);
    data.meta.category = this.addData(data.meta.category);

    let contest_effect, contest_type, damage_class, generation, super_contest_effect, target, ailment, category, machines;

    if (res.contest_effect.hasOwnProperty('url')) {
      contest_effect = this.http.get(res.contest_effect.url).pipe(map(e => ({ ...e, _contest_effect_: true }))); }
    if (res.contest_type.hasOwnProperty('url')) {
      contest_type = this.http.get(res.contest_type.url).pipe(map(e => ({ ...e, _contest_type_: true }))); }
    if (res.damage_class.hasOwnProperty('url')) {
      damage_class = this.http.get(res.damage_class.url).pipe(map(e => ({ ...e,  _damage_class_: true}))); }
    if (res.generation.hasOwnProperty('url')) {
      generation = this.http.get(res.generation.url).pipe(map(e => ({ ...e, _generation_: true }))); }
    if (res.super_contest_effect.hasOwnProperty('url')) {
      super_contest_effect = this.http.get(res.super_contest_effect.url).pipe(map(e => ({ ...e, _super_contest_effect_: true }))); }
    if (res.target.hasOwnProperty('url')) {
      target = this.http.get(res.target.url).pipe(map(e => ({ ...e, _target_: true }))); }
    if (res.meta.ailment.hasOwnProperty('url')) {
      ailment = this.http.get(res.meta.ailment.url).pipe(map(e => ({ ...e, _ailment_: true }))); }
    if (res.meta.category.hasOwnProperty('url')) {
      category = this.http.get(res.meta.category.url).pipe(map(e => ({ ...e, _category_: true }))); }

    if (res.machines) {
      machines = of(
        res.machines.map((e: any) => {
          return this.http.get(this.shared.toGithubRaw(e['machine']['url'])).pipe(
            map((c) => {
              e.machine.data = c;
              return { ...e };
            })
          )
        })
      ).pipe(
        exhaustMap((e: any) => e),
        mergeMap((e: any) => e),
        toArray()
      );      
    }

    const toMerge = [ contest_effect, contest_type, damage_class, generation, 
      super_contest_effect, target, machines, ailment, category ].filter(e => e);

    return merge( ...toMerge ).pipe(
      toArray(),
      map((res: any[]) => {
    
        data.contest_effect.data = res.find(e => e._contest_effect_);
        data.contest_type.data = res.find(e => e._contest_type_);
        data.damage_class.data = res.find(e => e._damage_class_);
        data.generation.data = res.find(e => e._generation_);
        data.super_contest_effect.data = res.find(e => e._super_contest_effect_);
        data.target.data = res.find(e => e._target_);
        
        data.meta.ailment.data = res.find(e => e._ailment_);
        data.meta.category.data = res.find(e => e._category_);
        
        data.machines = res.find(e => e.length > 0);
  
        return data;
      })
    );
  }
  
  load_natures_characteristics() {

    const characteristic = this.http.get('https://pokeapi.co/api/v2/characteristic/?offset=0&limit=30').pipe(
      exhaustMap(e => e['results'].map(c => this.http.get(c.url))),
      mergeMap((e: any) => e),
      toArray()
    );
    
    const nature = this.http.get('https://pokeapi.co/api/v2/nature?offset=0&limit=25').pipe(
      exhaustMap(e => e['results'].map(c => this.http.get(c.url))),
      mergeMap((e: any) => e),
      toArray()
    );
    
    return merge(nature, characteristic)
      .pipe(
        toArray(),
        map((res) => {
          const characteristic = res.find(e => e.length === 30);
          const nature = res.find(e => e.length === 25);
          this.shared.keys.characteristics = characteristic;
          this.shared.keys.natures = nature;
        })
      );
  }

  flatStat(stat: any) {

    return this.http.get(this.shared.toGithubRaw(stat.stat.url)).pipe(
      map((res: any) => {

        if (!res.move_damage_class) {
          res.move_damage_class = {};
        }

        res.move_damage_class.data = this.shared.keys.move_damage_class.find(e => 
          e.name === res.move_damage_class.name
        );
        
        let affecting_moves_increase = res.affecting_moves.increase.map(e => e.move);
        affecting_moves_increase = intersectionBy(this.shared.moves, affecting_moves_increase, 'name')
          .map((move: any, i: number) => {
            const data: any = res.affecting_moves.increase[i];
            data.move = move;
            return data;
          });

        let affecting_moves_decrease = res.affecting_moves.decrease.map(e => e.move);
        affecting_moves_decrease = intersectionBy(this.shared.moves, affecting_moves_decrease, 'name')
          .map((move: any, i: number) => {
            const data: any = res.affecting_moves.decrease[i];
            data.move = move;
            return data;
          });

        let affecting_natures_increase = res.affecting_natures.increase;
        affecting_natures_increase = intersectionBy(this.shared.keys.natures, affecting_natures_increase, 'name')
          .map((nature: any, i: number) => {
            const data: any = res.affecting_natures.increase[i];
            data.data = nature;
            return data;
          });

        let affecting_natures_decrease = res.affecting_natures.decrease;
        affecting_natures_decrease = intersectionBy(this.shared.keys.natures, affecting_natures_decrease, 'name')
          .map((nature: any, i: number) => {
            const data: any = res.affecting_natures.decrease[i];
            data.data = nature;
            return data;
          });

        let characteristics = res.characteristics.map((characteristic: any) => {
          characteristic.id = +characteristic.url.split('/').reverse()[1];
          return characteristic;
        });
        characteristics = intersectionBy(this.shared.keys.characteristics, characteristics, 'id')
          .map((characteristic: any, i: number) => {
            const data: any = res.characteristics.find(e => e.id === characteristic.id);
            data.data = characteristic;
            return data;
          });

        return res;
      })
    );
  }

  get pokemon() {

    const id = this.shared.id;
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

    return this.http.get(this.shared.toGithubRaw(url)).pipe(
      exhaustMap((pokemon) => {
        
        const species = this.species(this.shared.toGithubRaw(pokemon['species']['url']), pokemon);

        const entry = of(pokemon);

        const ability = of(
          pokemon['abilities'].map((e) => this.http.get(this.shared.toGithubRaw(e['ability']['url'])))
        ).pipe(
          exhaustMap((e: any) => e),
          mergeMap((e: any) => e),
          toArray(),
        );

        const types = of(
          pokemon['types'].map((e: any) => forkJoin({
            data: this.http.get(this.shared.toGithubRaw(e['type']['url'])), type: of(e), _types_: of(true)
          }))
        ).pipe(
          exhaustMap((e: any) => e),
          mergeMap((e: any) => e),
          toArray(),
        );

        return merge(
          species, entry, ability, types
        );
      }),
      toArray(),
      map((result: any[]) => {

        const _result = result.filter(e => e.length);

        const data = result.find(e => e.hasOwnProperty('abilities'));
        const types = _result.find((e) => e.filter(e => e.hasOwnProperty('_types_')).length > 0);
        
        data['species']['data'] = result.find(e => e.hasOwnProperty('base_happiness'));
        data['abilities'] = _result.find((e) => e.filter(e => e.hasOwnProperty('effect_changes')).length > 0);

        data['types'] = sortBy(
          types.map((type) => ({ data: type['data'], ...type['type'] })), [ 'slot' ]
        );

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

    // console.log(this.shared.index.value, this.shared.index.value + defaultLength);

    this.clearCount();

    return entries.slice(this.shared.index.value, this.shared.index.value + defaultLength);
  }

  typeData(id: number) {

    const url = `https://pokeapi.co/api/v2/type/${id}/`;

    return this.http.get(this.shared.toGithubRaw(url)).pipe(
      map((e: any) => e.pokemon.map(c => c.pokemon)),
      map((res) => {
        this.shared.keys.type_pokemon = intersectionBy(
          this.shared.pokemon, res, 'name'
        );
      })
    );
  }

  private clearCount() {
    if (this.shared.item_meta.ceil === this.shared.index.count) {
      this.count = 0;
    }
  }

  private species(url: string, _pokemon: any) {
    return this.http.get(url).pipe(
      exhaustMap((specie) => {
        
        const specie_ = of(specie);

        const color = this.http.get(this.shared.toGithubRaw(specie['color']['url'])).pipe(
          map((e) => ({ ...e, _color_: true }))
        );
        
        const growth_rate = this.http.get(this.shared.toGithubRaw(specie['growth_rate']['url'])).pipe(
          map((e) => ({ ...e, _growth_rate_: true }))
        );
        
        let habitat = undefined;
        if (specie['habitat']) {
          habitat = this.http.get(this.shared.toGithubRaw(specie['habitat']['url'])).pipe(
            map((e) => ({ ...e, _habitat_: true }))
          );
        } else {
          habitat = of({ 
            id: -1, name: 'unknown', _habitat_: true, 
            names: [ { language: { name: 'en' }, name: 'unknown' } ],
            pokemon_species: this.shared.keys.no_habitat
          })
        }
        
        const shape = this.http.get(this.shared.toGithubRaw(specie['shape']['url'])).pipe(
          map((e) => ({ ...e, _shape_: true }))
        );

        const egg_groups = of(
          specie['egg_groups'].map((e) => this.http.get(this.shared.toGithubRaw(e['url'])))
        ).pipe(
          exhaustMap((e: any) => e),
          mergeMap((e: any) => e),
          toArray(),
        );
        
        const varieties = of(
          specie['varieties'].map((e) => {
            const id  = +e['pokemon']['url'].split('/').reverse()[1];
            if (id === this.shared.id) {
              return of(_pokemon);
            } else {
              return this.http.get(this.shared.toGithubRaw(e['pokemon']['url']));
            }
          })
        ).pipe(
          exhaustMap((e: any) => e),
          mergeMap((e: any) => e),
          toArray(),
        );

        const evolution_chain = this.evolution_chain(this.shared.toGithubRaw(specie['evolution_chain']['url']));

        return merge(
          specie_, color, growth_rate, habitat, shape, egg_groups, varieties, evolution_chain
        );
      }),
      toArray(),
      map((result: any[]) => {

        const _result = result.filter(e => e.length);

        const data = result.find(e => e.hasOwnProperty('base_happiness'));

        if (!data['habitat']) {
          data['habitat'] = {};
        }

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
            id: +id,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
          }
        } else {
          const id = +chain['chain']['species']['url'].split('/').reverse()[1];
          first = {
            name: chain['chain']['species']['name'],
            level: 1, evolution: null, pokemon: null,
            id: +id,
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
            id: +id,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
          }
        } else {
          const id = +first['pokemon']['species']['url'].split('/').reverse()[1];
          second = {
            name: first['pokemon']['species']['name'],
            level: chain['chain']['evolves_to'][0]['evolution_details'][0]['min_level'],
            evolution: null, pokemon: null,
            id: +id,
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
            id: +id,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
          }
        } else {
          const id = +second['pokemon']['species']['url'].split('/').reverse()[1];
          third = {
            name: second['pokemon']['species']['name'],
            level: first['pokemon']['evolves_to'][0]['evolution_details'][0]['min_level'],
            evolution: null, pokemon: null,
            id: +id,
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

  private addData(object: any) {
    if (!object) {
      return {};
    } else {
      return object;
    }
  }

  private populateUndefinedMoves(move: any) {
    move.meta.ailment = !move.meta.ailment.hasOwnProperty('ailment') ? {} : move.meta.ailment;
    move.meta.category = !move.meta.ailment.hasOwnProperty('category') ? {} : move.meta.category;
    return move;
  }

}
