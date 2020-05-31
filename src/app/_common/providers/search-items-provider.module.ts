import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { SearchOptionsComponent } from '../../_components/search-options/search-options.component';
import { SearchOptionPokemonComponent, } from '../../_components/search-option-pokemon/search-option-pokemon.component';
import { SearchOptionMovesComponent, } from '../../_components/search-option-moves/search-option-moves.component';
import { SearchOptionItemsComponent, } from '../../_components/search-option-items/search-option-items.component';
import { SearchOptionBerriesComponent, } from '../../_components/search-option-berries/search-option-berries.component';


@NgModule({
  imports: [
    CommonModule,
    MatExpansionModule,
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    SearchOptionsComponent,
    SearchOptionPokemonComponent,
    SearchOptionMovesComponent,
    SearchOptionItemsComponent,
    SearchOptionBerriesComponent,
  ],
  declarations: [
    SearchOptionsComponent,
    SearchOptionPokemonComponent,
    SearchOptionMovesComponent,
    SearchOptionItemsComponent,
    SearchOptionBerriesComponent,
  ]
})
export class SearchItemsProviderModule { }
