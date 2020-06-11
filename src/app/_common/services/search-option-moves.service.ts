import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { exhaustMap, mergeMap, map, toArray } from 'rxjs/operators';
import { Observable, forkJoin, of } from 'rxjs';
import { intersectionBy, snakeCase } from 'lodash';

import { SharedService } from './shared.service';


@Injectable({
  providedIn: 'root'
})
export class SearchOptionMovesService {

  private url = {
    ailment: 'https://pokeapi.co/api/v2/move-ailment/?offset=0&limit=21',
    category: 'https://pokeapi.co/api/v2/move-category/',
    contestType: 'https://pokeapi.co/api/v2/contest-type/',
    damageClass: 'https://pokeapi.co/api/v2/move-damage-class/',
    generation: 'https://pokeapi.co/api/v2/generation',
    target: 'https://pokeapi.co/api/v2/move-target/',
    type: 'https://pokeapi.co/api/v2/type/'
  }

  initializationBuffer: any[];

  constructor(
    private http: HttpClient,
    private shared: SharedService
  ) { }

  private _cached_sl1: any;
  set cached_sl1(res: any) { this._cached_sl1 = res; }
  get cached_sl1() { return this._cached_sl1; }

  private _cached_sl2: any;
  set cached_sl2(res: any) { this._cached_sl2 = res; }
  get cached_sl2() { return this._cached_sl2; }

  private _cached_sl3: any;
  set cached_sl3(res: any) { this._cached_sl3 = res; }
  get cached_sl3() { return this._cached_sl3; }

  appInitialization(res: number, type: string = 'loading_indicator') {

    if (res === 1) {
      this.initializationBuffer = [];
      this.shared.updateAppInitializationSelection = 1;
    } else {
      this.initializationBuffer.push(0);
  
      if (this.initializationBuffer.length === 3) {
        this.initializationBuffer = undefined;
        this.shared.updateAppInitializationSelection = 2;
      }
    }

  }

  get selectionList_1() {
    return forkJoin({
      ailment: this._returnResults_1(this.http.get(this.url.ailment)),
      category: this._returnResults_1(this.http.get(this.url.category)),
      contestType: this._returnResults_1(this.http.get(this.url.contestType)),
      generation: this._returnResults_1(this.http.get(this.url.generation)),
      damageClass: this._returnResults_1(this.http.get(this.url.damageClass)),
      target: this._returnResults_1(this.http.get(this.url.target)),
      type: this._returnResults_1(this.http.get(this.url.type))
    })
  }

  get selectionList_2() {
    return of({
      accuracy: {
        meta: { min: 0, max: 100 },
        data: this.shared.moves
      },
      effectChance: {
        meta: { min: 0, max: 100 },
        data: this.shared.moves
      },
      moveNo: {
        meta: { min: 1, max: 10018 },
        data: this.shared.moves
      },
      ailmentChance: {
        meta: { min: 10, max: 100 },
        data: this.shared.moves
      },
      critRate: {
        meta: { min: 1, max: 6 },
        data: this.shared.moves
      },
      drain: {
        meta: { min: -50, max: 75 },
        data: this.shared.moves
      },
      flinchChance: {
        meta: { min: 10, max: 100 },
        data: this.shared.moves
      },
      healing: {
        meta: { min: -25, max: 50 },
        data: this.shared.moves
      },
      maxHits: {
        meta: { min: 2, max: 6 },
        data: this.shared.moves
      },
      maxTurns: {
        meta: { min: 2, max: 15 },
        data: this.shared.moves
      },
      minHits: {
        meta: { min: 2, max: 6 },
        data: this.shared.moves
      },
      minTurns: {
        meta: { min: 2, max: 15 },
        data: this.shared.moves
      },
      statChance: {
        meta: { min: 10, max: 100 },
        data: this.shared.moves
      },
      power: {
        meta: { min: 0, max: 250 },
        data: this.shared.moves
      },
      pp: {
        meta: { min: 0, max: 40 },
        data: this.shared.moves
      },
      priority: {
        meta: { min: -7, max: 5 },
        data: this.shared.moves
      }
    })
  }

  private _returnResults_1(result: Observable<any>) {
    return result.pipe(
      exhaustMap((e: any) => e.results.map(e => this.http.get(e.url))),
      mergeMap((e: any) => e),
      map((e: any) => {

        if (e.hasOwnProperty('moves')) {
          
          e.moves = e.moves.map((e) => {
            e.id = +e.url.split('/').reverse()[1];
            delete e.url;
            return e;
          });
  
          e.moves = intersectionBy(this.shared.moves, e.moves, 'id');
          
        } else {

          // e.moves = this.shared.moves.filter(e => e.contest_type).filter(c => c.contest_type.name === e.name);

        }

        return {
          id: e.id,
          name: e.name.split('-').join(' '),
          data: e
        };
      }),
      toArray(),
    )
  }

  filteredNumberEntries(num: number, type: string) {

    type = type === 'moveNo' ? 'id' : snakeCase(type);

    return this.shared.moves.filter((e) => {
      
      if (e.hasOwnProperty(type)) {
        return e[type] === num;
      } else {
        if (!e.meta) return false;
        if (!e.meta[type]) return false;
        return e.meta[type] === num;
      }

    });
  }

}

export const selections = {
  selectionList_1: {},
  selectionList_2: {},
  selectionList_3: {}
};

export const options = {
  selectionList_1: [ 
    {
      option: 'ailment',
      display: 'Ailment',
      placeholder: 'ailment',
      description: 'The status ailment this move inflicts on its target.'
    }, {
      option: 'category',
      display: 'Category',
      placeholder: 'category',
      description: 'The category of move this move falls under, e.g. damage or ailment.'
    }, { 
      option: 'contestType', 
      display: 'Contest type', 
      placeholder: 'contest type', 
      description: 'The type of appeal this move gives a pokémon when used in a contest.' 
    }, { 
      option: 'damageClass', 
      display: 'Damage class', 
      placeholder: 'damage class', 
      description: 'The type of damage the move inflicts on the target, e.g. physical.'
    }, {
      option: 'generation',
      display: 'Generation',
      placeholder: 'generation',
      description: 'The generation in which this move was introduced.'
    }, {
      option: 'target',
      display: 'Target',
      placeholder: 'target',
      description: 'The type of target that will receive the effects of the attack.'
    }, {
      option: 'type',
      display: 'Type',
      placeholder: 'type',
      description: '	The elemental type of this move.'
    },
  ],
  selectionList_2: [
    { 
      option: 'accuracy', 
      display: 'Accuracy', 
      description: 'The percent value of how likely this move is to be successful.'
    }, { 
      option: 'effectChance', 
      display: 'Effect chance', 
      description: 'The list of previous effects this move has had across version groups of the games.'
    }, { 
      option: 'moveNo', 
      display: 'Move no.', 
      description: 'The identifier for this move resource.'
    }, { 
      option: 'ailmentChance', 
      display: 'Ailment chance', 
      description: 'The likelyhood this attack will cause an ailment.'
    }, { 
      option: 'critRate', 
      display: 'Critical rate', 
      description: 'Critical hit rate bonus.'
    }, { 
      option: 'drain', 
      display: 'Drain', 
      description: 'HP drain (if positive) or Recoil damage (if negative), in percent of damage done.'
    }, { 
      option: 'flinchChance', 
      display: 'Flinch chance', 
      description: 'The likelyhood this attack will cause the target pokémon to flinch.'
    }, { 
      option: 'healing', 
      display: 'Healing', 
      description: `The amount of hp gained by the attacking pokémon, in percent of it's maximum HP.`
    }, { 
      option: 'maxHits', 
      display: 'Max hits', 
      description: 'The maximum number of times this move hits. Null if it always only hits once..'
    }, { 
      option: 'maxTurns', 
      display: 'Max turns', 
      description: 'The maximum number of turns this move continues to take effect. Null if it always only lasts one turn.'
    }, { 
      option: 'minHits', 
      display: 'Min hits', 
      description: 'The minimum number of times this move hits. Null if it always only hits once.'
    }, { 
      option: 'minTurns', 
      display: 'Min turns', 
      description: 'The minimum number of turns this move continues to take effect. Null if it always only lasts one turn.'
    }, { 
      option: 'statChance', 
      display: 'Stat chance', 
      description: 'The likelyhood this attack will cause a stat change in the target pokémon.'
    }, { 
      option: 'power', 
      display: 'Power', 
      description: 'The base power of this move with a value of 0 if it does not have a base power.'
    }, { 
      option: 'pp', 
      display: 'PP', 
      description: 'Power points. The number of times this move can be used.'
    }, { 
      option: 'priority', 
      display: 'Priority', 
      description: '	A value between -8 and 8. Sets the order in which moves are executed during battle.'
    },
  ],
  selectionList_3: [
    {
      option: 'superContestEffect',
      display: 'Super contest effect',
      description: 'The effect the move has when used in a super contest.'
    }
  ]
};

export const option = {
  selectionList_1: {
    state: false, input: '',
    selections: {
      contestType: false, generation: false, ailment: false, category: false, target: false, type: false
    } 
  },
  selectionList_2: {
    state: false, input: '', invalid: true,
    selections: {
      accuracy: false, damageClass: false, effectChance: false, moveNo: false, ailmentChance: false, critRate: false, drain: false, flinchChance: false, healing: false, maxHits: false, maxTurns: false, minHits: false, minTurns: false, statChance: false, power: false, pp: false, priority: false
    }
  },
  selectionList_3: {
    state: false, input: '', invalid: true,
    selections: {
      superContestEffect: false
    }
  }
};
