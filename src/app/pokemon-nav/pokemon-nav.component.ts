import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { takeUntil } from 'rxjs/operators'

import * as _ from 'lodash';

import { SharedService } from '../common/core/service/shared.service';
import { HttpService } from '../common/core/service/http.service';

@Component({
  selector: 'app-pokemon-nav',
  templateUrl: './pokemon-nav.component.html',
  styleUrls: ['./pokemon-nav.component.scss']
})
export class PokemonNavComponent implements OnInit, OnDestroy {

  poke: any;
  region: boolean = true;
  data: boolean = true;
  isLoad: boolean = false;
  move: any;
  indicators: any = {
    physical: false,
    status: false,
    special: false,
    isShow: false
  }
  
  private destroyed: ReplaySubject<boolean> = new ReplaySubject(1);
  
  constructor(
    private http: HttpService,
    private shared: SharedService,
    private http2: HttpClient
  ) { }

  ngOnInit() {
    this.region = localStorage.region !== 'Kalos Region';
    this.data = localStorage.region !== 'Alola Region';
  
    let i = 0;
    this.shared.selectedChange.pipe( takeUntil(this.destroyed) ).subscribe((res: any) => {
      i++
      if (i > 0) {
        this.indicators.physical = false;
        this.indicators.status = false;
        this.indicators.special = false;
      }
      
      if (i === 1) {
        this.poke = res;
      }
      
      setTimeout(() => {
        if (res['moves'] === undefined) return;
        res['moves'].map((ref: any, i: number) => {
          const index = ref.move.url.split('/').reverse()[1];
          this.http2.get(`assets/api/v2/move/${index}/index.json`).subscribe((res: any) => {
            const className = res.damage_class.name;
            const type = res.type.name;
            if (this.poke['moves'] !== undefined) {
              this.poke['moves'].splice(i, 1, { ...ref, className, type });
            }
          });
          delete ref['version_group_details'];
        });
      }, 50);
    });
  }
  
  ngOnDestroy() {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  selectMove(move: any) {
    let _move = this.poke.moves.find((data) => data.move.name === move).move.name;

    this.move = this.http.getPokemonMoves(_move);

    this.move.subscribe((res) => {
      console.log(res);
    });

  }
  
  trackByFn(index) {
    return index;
  }

}
