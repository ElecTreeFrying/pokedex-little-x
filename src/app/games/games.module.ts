import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesProviderModule } from '../_common/providers/games-provider.module';
import { GamesRoutingModule } from './games-routing.module';

import { GamesComponent } from './games.component';


@NgModule({
  declarations: [
    GamesComponent
  ],
  imports: [
    CommonModule,
    GamesProviderModule,
    GamesRoutingModule
  ]
})
export class GamesModule { }
