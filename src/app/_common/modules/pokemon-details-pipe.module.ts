import { NgModule } from '@angular/core';

import { PokemonDetailsPipe } from '../pipes/pokemon-details.pipe';


@NgModule({
  declarations: [
    PokemonDetailsPipe
  ],
  exports: [
    PokemonDetailsPipe
  ]
})
export class PokemonDetailsPipeModule { }
