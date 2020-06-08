import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, toArray, mergeMap, exhaustMap } from 'rxjs/operators';
import { intersectionBy, sortBy, snakeCase } from 'lodash';

import { SharedService, pokedex } from './shared.service';


@Injectable({
  providedIn: 'root'
})
export class SearchOptionPokemonService {

  private url = {
    ability: 'https://pokeapi.co/api/v2/ability/?offset=0&limit=293',
    color: 'https://pokeapi.co/api/v2/pokemon-color/',
    eggGroup: 'https://pokeapi.co/api/v2/egg-group/',
    growthRate: 'https://pokeapi.co/api/v2/growth-rate/',
    habitat: 'https://pokeapi.co/api/v2/pokemon-habitat/',
    shape: 'https://pokeapi.co/api/v2/pokemon-shape/',
    type: 'https://pokeapi.co/api/v2/type/'
  }

  constructor(
    private http: HttpClient,
    private shared: SharedService
  ) { }

  private _cached_sl1: any;
  set cached_sl1(res: any) { this._cached_sl1 = res; }
  get cached_sl1() { return this._cached_sl1; }

  private _cached_sl4: any;
  set cached_sl4(res: any) { this._cached_sl4 = res; }
  get cached_sl4() { return this._cached_sl4; }

  private _cached_sl5: any;
  set cached_sl5(res: any) { this._cached_sl5 = res; }
  get cached_sl5() { return this._cached_sl5; }

  get selectionList_1() {
    return forkJoin({
      ability: this._returnResults_1(this.http.get(this.url.ability)),
      color: this._returnResults_1(this.http.get(this.url.color)),
      eggGroup: this._returnResults_1(this.http.get(this.url.eggGroup)),
      growthRate: this._returnResults_1(this.http.get(this.url.growthRate)),
      habitat: this._returnResults_1(this.http.get(this.url.habitat)),
      shape: this._returnResults_1(this.http.get(this.url.shape)),
      type: this._returnResults_1(this.http.get(this.url.type))
    }).pipe(
      map((data) => {
        this.cached_sl1 = data;
        return data;
      })
    );
  }

  get selectionList_2() {
    const data = this.shared.keys.pokemon_search.true_false;

    return {
      isBaby: {
        0: intersectionBy(this.shared.pokemon, data.filter(e => !e.is_baby), 'id'),
        1: intersectionBy(this.shared.pokemon, data.filter(e => e.is_baby), 'id')
      },
      isDefault: {
        0: intersectionBy(this.shared.pokemon, data.filter(e => !e.is_default), 'id'),
        1: intersectionBy(this.shared.pokemon, data.filter(e => e.is_default), 'id')
      },
      isMega: {
        0: intersectionBy(this.shared.pokemon, data.filter(e => !e.is_mega), 'id'),
        1: intersectionBy(this.shared.pokemon, data.filter(e => e.is_mega), 'id')
      },
      formsSwitchable: {
        0: intersectionBy(this.shared.pokemon, data.filter(e => !e.forms_switchable), 'id'),
        1: intersectionBy(this.shared.pokemon, data.filter(e => e.forms_switchable), 'id')
      },
      hasGenderDifferences: {
        0: intersectionBy(this.shared.pokemon, data.filter(e => !e.has_gender_differences), 'id'),
        1: intersectionBy(this.shared.pokemon, data.filter(e => e.has_gender_differences), 'id')
      }
    };
  }

  get selectionList_3() {
    const data = this.shared.keys.pokemon_search.number

    return {
      baseExperience: {
        meta: { min: data.meta.min.base_experience, max: data.meta.max.base_experience },
        data: data.data
      },
      baseHappiness: {
        meta: { min: data.meta.min.base_happiness, max: data.meta.max.base_happiness },
        data: data.data
      },
      captureRate: {
        meta: { min: data.meta.min.capture_rate, max: data.meta.max.capture_rate },
        data: data.data
      },
      hatchCounter: {
        meta: { min: data.meta.min.hatch_counter, max: data.meta.max.hatch_counter },
        data: data.data
      },
      height: {
        meta: { min: data.meta.min.height, max: data.meta.max.height },
        data: data.data
      },
      pokemonNo: {
        meta: { min: data.meta.min.order, max: data.meta.max.order },
        data: data.data
      },
      weight: {
        meta: { min: data.meta.min.weight, max: data.meta.max.weight },
        data: data.data
      },
    };
  }

  get selectionList_4() {

    let moves = this.shared.moves.map((e) => {

      if (!e.damage_class.hasOwnProperty('name')) {
        return e;
      }

      e.damage_class = e.damage_class.name;
      e.type = e.type.name;
      return e;
    });

    moves = sortBy(moves, [ 'damage_class', 'type' ]);

    moves = [
      {
        name: 'physical',
        moves: moves.filter(e => e.damage_class === 'physical')
      },
      {
        name: 'special',
        moves: moves.filter(e => e.damage_class === 'special')
      },
      {
        name: 'status',
        moves: moves.filter(e => e.damage_class === 'status')
      }
    ];

    return { moves };
  }

  get selectionList_5() {
    return forkJoin({
      forms: this.forms,
      pal_park: this.palParkAreas
    })
  }

  get selectionList_6() {

    const stats = [ 'HP', 'Speed', 'Attack', 'Defense', 'Special attack', 'Special defense' ];
    const _pokedex = pokedex.filter(e => e.key !== 0 && e.key !== 11).map(e => e.name.replace(' Pokédex', ''));

    return {
      data: this.shared.keys.pokemon_search.last,
      stats, pokedex: _pokedex,
      meta: {
        pokedex: {
          national: { min: 1, max: 721 },
          kanto: { min: 1, max: 151 },
          'original-johto': { min: 1, max: 251 },
          hoenn: { min: 1, max: 202 },
          'original-sinnoh': { min: 1, max: 151 },
          'extended-sinnoh': { min: 1, max: 210 },
          'updated-johto': { min: 1, max: 256 },
          'original-unova': { min: 0, max: 155 },
          'updated-unova': { min: 0, max: 300 },
          'kalos-central': { min: 1, max: 150 },
          'kalos-coastal': { min: 1, max: 153 },
          'kalos-mountain': { min: 1, max: 151 },
          'updated-hoenn': { min: 1, max: 211 },
        },
        stats: {
          hp: { min: 1, max: 255 },
          speed: { min: 5, max: 180 },
          attack: { min: 5, max: 190 },
          defense: { min: 5, max: 230 },
          'special-attack': { min: 10, max: 194 },
          'special-defense': { min: 20, max: 230 }
        }
      }
    };
  }

  filteredNumberEntries(num: number, type: string) {

    type = type === 'pokemonNo' ? 'order' : snakeCase(type);

    const all: any[] = this.shared.keys.pokemon_search.number.data;

    return intersectionBy(this.shared.pokemon, all.filter(e => e[type] === num), 'id');
  }

  filteredLastNumberEntries(num: number, type: string, item: string) {

    const data = this.shared.keys.pokemon_search.last.filter((res: any) => {
      if (type === 'stats') {
        return res.s.find(e => e.s === item).bn === num;
      } else if (type === 'pokedex') {
        const search = res.pn.find(e => e.p === item);
        return search ? search.en === num : undefined;
      }
    });

    return intersectionBy(this.shared.pokemon, data, 'id');
  }

  get loadedPokemonEntries() {

    // const url = this.shared.toGithubRaw('https://pokeapi.co/api/v2/pokemon/');
    const url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=964/';

    return this.http.get(url).pipe(
      // exhaustMap((e: any) => e.results.map(e => this.http.get(this.shared.toGithubRaw(e.url)))),
      exhaustMap((e: any) => e.results.map(e => this.http.get(e.url))),
      mergeMap((e: any) => e),
      toArray(),
      map((data) => {
        this.cached_sl4 = data;
        return data;
      })
    );
  } 

  filteredPokemonEntries(move: string) {
    return intersectionBy(
      this.shared.pokemon,
      this.cached_sl4.filter((e: any) => !!e.moves.find(c => c.move.name === move)),
      'id'
    )
  } 

  private _returnResults_1(result: Observable<any>) {
    return result.pipe(
      exhaustMap((e: any) => e.results.map(e => this.http.get(e.url))),
      mergeMap((e: any) => e),
      map((e: any) => {
        
        if (e.hasOwnProperty('pokemon')) {
          e.pokemon_species = e.pokemon.map(e => e.pokemon);
          delete e.pokemon;
        }

        e.pokemon_species = e.pokemon_species.map((e) => {
          e.id = +e.url.split('/').reverse()[1];
          delete e.url;
          return e;
        });

        e.pokemon_species = intersectionBy(this.shared.pokemon, e.pokemon_species, 'id');

        return {
          id: e.id,
          name: e.name.split('-').join(' '),
          data: e
        };
      }),
      toArray(),
    )
  }

  private get forms() {
    const data = this.shared.keys.pokemon_search.forms;

    const forms = sortBy(intersectionBy(
      this.shared.pokemon, data, 'id'
    ).map((entry: any) => 
      ({ ...entry, ...data.find(e => e.id === entry.id) })
    ), [ 'name' ]);

    const toDataURL = (url, callback) => {
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
          callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    }

    const toBase64 = (url: string) => (new Observable((subscriber) => {
      toDataURL(url, (e) => {
        subscriber.next(e);
        subscriber.complete();
      });
    }));

    return of(forms).pipe(
      mergeMap((e: any) => e),
      mergeMap((e: any) => {
        const forms = of(e.forms).pipe(
          mergeMap((e: any) => e),
          mergeMap((e: any) => {

            const dummy_image = 'assets/images/berry.png';

            const front_default = e.sprites.front_default 
              ? toBase64(e.sprites.front_default) 
              : toBase64(dummy_image);
            // const back_default = e.sprites.back_default 
            //   ? toBase64(e.sprites.back_default) 
            //   : toBase64(dummy_image);
            // const front_shiny = e.sprites.front_shiny 
            //   ? toBase64(e.sprites.front_shiny) 
            //   : toBase64(dummy_image);
            // const back_shiny = e.sprites.back_shiny 
            //   ? toBase64(e.sprites.back_shiny) 
            //   : toBase64(dummy_image);

            return forkJoin({
              // front_default, back_default, front_shiny, back_shiny, data: of(e)
              front_default, data: of(e)
            }).pipe(
              map((e) => {
                e.data.sprites.front_default = e.front_default;
                // e.data.sprites.back_default = e.back_default;
                // e.data.sprites.front_shiny = e.front_shiny;
                // e.data.sprites.back_shiny = e.back_shiny;
                return { ...e.data }
              })    
            )
          }),
          map((e) => {
            const data: any = {};
            data.byte64 = e.sprites.front_default;
            data.filename = null;
            data.entry_number = e.pokemon;
            data.id = e.pokemon;
            data.name = e.name;
            data.data = e;
            return data;
          }),
          toArray()
        );

        return forkJoin({ forms, data: of(e) }).pipe(
          map((e) => {
            e.data.forms = e.forms
            return { ...e.data };
          })
        );
      }),
      toArray()
    );
  }

  get palParkAreas() {

    const pal_park = this.shared.keys.pokemon_search.pal_park.map((entry: any) => {
      
      entry.encounters = intersectionBy(this.shared.pokemon, entry.encounters, 'id').map((encounter: any) => {
        return { ...encounter, ...entry.encounters.find(e => e.id === encounter.id) };
      })

      return entry;
    });

    return of(pal_park);
  }

}

export const selections = {
  selectionList_1: {},
  selectionList_2: {},
  selectionList_3: {},
  selectionList_4: [],
  selectionList_5: {},
  selectionList_6: {},
};

export const options = {
  selectionList_1: [ 
    { option: 'ability', display: 'Ability', placeholder: 'ability', description: 'Abilities provide passive effects for pokémon in battle or in the overworld. Pokémon have mutiple possible abilities but can have only one ability at a time.' },
    { option: 'color', display: 'Color', placeholder: 'color', description: `Colors used for sorting pokémon in a pokédex. The color listed in the Pokédex is usually the color most apparent or covering each Pokémon's body. No orange category exists; Pokémon that are primarily orange are listed as red or brown.` },
    { option: 'eggGroup', display: 'Egg group', placeholder: 'egg group', description: 'A list of egg groups this pokémon species is a member of.' },
    { option: 'growthRate', display: 'Growth rate', placeholder: 'growth rate', description: 'Growth rates are the speed with which pokémon gain levels through experience.' },
    { option: 'habitat', display: 'Habitat', placeholder: 'habitat', description: 'Habitats are generally different terrain pokémon can be found in but can also be areas designated for rare or legendary pokémon.' },
    { option: 'shape', display: 'Shape', placeholder: 'shape', description: 'Shapes used for sorting pokémon in a pokédex.' },
    { option: 'type', display: 'Type', placeholder: 'type', description: '	A list of details showing types this pokémon has' }
  ],
  selectionList_2: [
    { option: 'formsSwitchable', display: 'Forms switchable', description: 'Whether or not this pokémon has multiple forms and can switch between them.' },
    { option: 'hasGenderDifferences', display: 'Has gender differences', description: 'Whether or not this pokémon can have different genders.' },
    { option: 'isBaby', display: 'Is baby', description: 'Whether or not this is a baby pokémon.' },
    { option: 'isDefault', display: 'Is default', description: 'Set for exactly one pokémon used as the default for each species.' },
    { option: 'isMega', display: 'Is mega', description: 'Whether or not this form requires mega evolution.' },
  ],
  selectionList_3: [
    { option: 'baseExperience', display: 'Base experience', description: 'The base experience gained for defeating this pokémon.' },
    { option: 'baseHappiness', display: 'Base happiness', description: 'The happiness when caught by a normal pokéball; up to 255. The higher the number, the happier the pokémon.' },
    { option: 'captureRate', display: 'Capture rate', description: 'The base capture rate; up to 255. The higher the number, the easier the catch.' },
    { option: 'hatchCounter', display: 'Hatch counter', description: `Initial hatch counter: one must walk 255 × (hatch_counter + 1) steps before this Pokémon's egg hatches, unless utilizing bonuses like Flame Body's.` },
    { option: 'height', display: 'Height', description: 'The height of this pokémon.' },
    { option: 'pokemonNo', display: 'Pokémon no.', description: 'The identifier for this pokémon resource.' },
    { option: 'weight', display: 'Weight', description: 'The mass of this pokémon.' },
  ],
  selectionList_4: [],
  selectionList_5: [
    { option: 'forms', display: 'Pokémon forms', description: `Some pokémon have the ability to take on different forms. At times, these differences are purely cosmetic and have no bearing on the difference in the Pokémon's stats from another; however, several Pokémon differ in stats (other than HP), type, and Ability depending on their form.` },
    { option: 'pal_park', display: 'Pal park encounters', description: `Areas used for grouping pokémon encounters in Pal Park. They're like habitats that are specific to Pal Park.` },
  ],
  selectionList_6: [
    { option: 'pokedex', display: 'Pokédex numbers', label1: 'Select pokédex', label2: 'Enter pokédex number', description: 'A list of pokedexes and the indexes reserved within them for this pokémon species.' },
    { option: 'stats', display: 'Stats', label1: 'Select stat', label2: 'Enter base stat', description: 'Stats determine certain aspects of battles. Each pokémon has a value for each stat which grows as they gain levels and can be altered momenarily by effects in battles.' }
  ]
};

export const option = {
  selectionList_1: {
    state: false, input: '',
    selections: {
      ability: false, color: false, eggGroup: false, 
      growthRate: false, habitat: false, shape: false, type: false
    }
  },
  selectionList_2: {
    state: false, input: '',
    selections: {
      isBaby: false, isMega: false, isDefault: false,
      formsSwitchable: false, hasGenderDifferences: false
    }
  },
  selectionList_3: {
    state: false, input: '', invalid: true,
    selections: {
      baseExperience: false, baseHappiness: false, captureRate: false, 
      hatchCounter: false, height: false, pokemonNo: false, weight: false, 
    }
  },
  selectionList_4: {
    state: false, input: '', invalid: true,
    selections: {
      moves: false
    }
  },
  selectionList_5: {
    state: false, input: '', invalid: true,
    selections: {
      forms: false, pal_park: false
    }
  },
  selectionList_6: {
    state: false, input1: '', input2: '', invalid: true,
    selections: {
      stats: false, pokedex: false
    }
  }
};