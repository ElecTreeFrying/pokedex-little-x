import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators'

import { SharedService } from '../common/core/service/shared.service';

@Component({
  selector: 'app-pokemon-nav',
  templateUrl: './pokemon-nav.component.html',
  styleUrls: ['./pokemon-nav.component.scss']
})
export class PokemonNavComponent implements OnInit, OnDestroy {

  poke: any;
  isLoad: boolean = false;

  constructor(
    private shared: SharedService
  ) { }

  ngOnInit() {
    this.shared.selectedChange.pipe( first() ).subscribe((res: any) => {
      this.poke = res;
      console.log(res);
    });
  }

  ngOnDestroy() {
    // console.log('destroy');
  }

}
