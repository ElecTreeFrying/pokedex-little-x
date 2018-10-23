import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonComponent } from './pokemon.component';

@NgModule({
  imports: [
    CommonModule,
    PokemonRoutingModule
  ],
  declarations: [PokemonComponent]
})
export class PokemonModule { }
