import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators'

import { SharedService } from '../common/core/service/shared.service';

@Component({
  selector: 'app-pokemon-nav',
  templateUrl: './pokemon-nav.component.html',
  styleUrls: ['./pokemon-nav.component.scss']
})
export class PokemonNavComponent implements OnInit {

  poke: any;
  region: boolean = true;
  data: boolean = true;
  isLoad: boolean = false;

  constructor(
    private shared: SharedService
  ) { }

  ngOnInit() {
    this.region = localStorage.region !== 'Kalos Region';
    this.data = localStorage.region !== 'Alola Region';

    this.shared.selectedChange.pipe( first() ).subscribe((res: any) => {
      console.log(res);
      this.poke = res;
    });
  }

}
