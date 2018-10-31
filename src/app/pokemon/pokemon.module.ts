import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonMatModule } from '../common/core/module/pokemon-mat.module';

import { PokemonComponent } from './pokemon.component';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
    PokemonRoutingModule,
    PokemonMatModule
  ],
  entryComponents: [
    BottomSheetComponent
  ],
  declarations: [
    PokemonComponent,
    BottomSheetComponent,
  ],
})
export class PokemonModule { }
