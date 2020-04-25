import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { PokeapiService } from '../_common/services/pokeapi.service';
import { SharedService } from '../_common/services/shared.service';


@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  pokemon: any;

  constructor(
    private cd: ChangeDetectorRef,
    private api: PokeapiService,
    private shared: SharedService
  ) { }

  ngOnInit(): void {
    
    this.shared.routeChange.subscribe(() => {
      this.pokemon = this.api.pokedex;
      this.cd.detectChanges();
    });
  }

}
