import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { IdToImagePipeModule } from '../modules/id-to-image-pipe.module';
import { CardTextPipeModule } from '../modules/card-text-pipe.module';

import { SearchOptionsComponent } from '../../_components/search-options/search-options.component';
import { SearchOptionPokemonComponent, } from '../../_components/search-option-pokemon/search-option-pokemon.component';
import { SearchOptionMovesComponent, } from '../../_components/search-option-moves/search-option-moves.component';
import { SearchOptionItemsComponent, } from '../../_components/search-option-items/search-option-items.component';
import { SearchOptionBerriesComponent, } from '../../_components/search-option-berries/search-option-berries.component';
import { pokemonDialogComponents } from '../services/component-selector.service';
import { SearchPipe } from '../pipes/search.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatRippleModule,
    MatDialogModule,
    IdToImagePipeModule,
    CardTextPipeModule,
    SearchOptionsComponent,
    SearchOptionPokemonComponent,
    SearchOptionMovesComponent,
    SearchOptionItemsComponent,
    SearchOptionBerriesComponent,
    SearchPipe,
  ],
  entryComponents: [
    ...pokemonDialogComponents
  ],
  declarations: [
    SearchOptionsComponent,
    SearchOptionPokemonComponent,
    SearchOptionMovesComponent,
    SearchOptionItemsComponent,
    SearchOptionBerriesComponent,
    SearchPipe,
  ]
})
export class SearchItemsProviderModule { }
