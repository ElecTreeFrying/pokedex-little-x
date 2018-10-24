import { Component, OnInit } from '@angular/core';

import { HttpService } from '../common/core/service/http.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  pokemon: any;

  constructor(
    private service: HttpService
  ) { }

  ngOnInit() {
    this.pokemon = this.service.getPokedexByGeneration(1);

  }

}
