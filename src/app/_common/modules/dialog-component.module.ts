import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { LazyLoadImageModule } from 'ng-lazyload-image';
import { DialogDetailsPipeModule } from './dialog-details-pipe.module';
import { PokemonDetailsPipeModule } from './pokemon-details-pipe.module';
import { ItemDetailsPipeModule } from './item-details-pipe.module';
import { TypeColorPipeModule } from './type-color-pipe.module';
import { IdToImagePipeModule } from './id-to-image-pipe.module';

import { pokemonDialogComponents } from '../services/component-selector.service';


@NgModule({
  declarations: [
    ...pokemonDialogComponents
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatRippleModule,
    MatChipsModule,
    MatTooltipModule,
    LazyLoadImageModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    
    DialogDetailsPipeModule,
    PokemonDetailsPipeModule,
    ItemDetailsPipeModule,
    TypeColorPipeModule,
    IdToImagePipeModule
  ],
  exports: [
    ...pokemonDialogComponents
  ]
})
export class DialogComponentModule { }
