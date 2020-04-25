import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokedexProviderModule } from '../_common/providers/pokedex-provider.module';
import { PokedexRoutingModule } from './pokedex-routing.module';

import { PokedexComponent } from './pokedex.component';


@NgModule({
  declarations: [
    PokedexComponent
  ],
  imports: [
    CommonModule,
    PokedexProviderModule,
    PokedexRoutingModule
  ]
})
export class PokedexModule { }
