import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonMatModule } from '../common/core/module/pokemon-mat.module';

import { PokemonComponent } from './pokemon.component';

import { HttpService } from '../common/core/service/http.service';

@NgModule({
  imports: [
    CommonModule,
    PokemonRoutingModule,
    PokemonMatModule
  ],
  declarations: [
    PokemonComponent
  ],
  providers: [
    HttpService
  ]
})
export class PokemonModule { }
