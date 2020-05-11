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

import { LazyLoadImageModule } from 'ng-lazyload-image';
import { DialogDetailsPipeModule } from './dialog-details-pipe.module';
import { PokemonDetailsPipeModule } from './pokemon-details-pipe.module';
import { TypeColorPipeModule } from './type-color-pipe.module';
import { IdToImagePipeModule } from './id-to-image-pipe.module';

import { TypeComponent } from '../../_components/dialogs/type/type.component';
import { ColorComponent } from '../../_components/dialogs/color/color.component';
import { HabitatComponent } from '../../_components/dialogs/habitat/habitat.component';
import { ShapeComponent } from '../../_components/dialogs/shape/shape.component';
import { GrowthRateComponent } from '../../_components/dialogs/growth-rate/growth-rate.component';
import { EggGroupsComponent } from '../../_components/dialogs/egg-groups/egg-groups.component';
import { AbilityComponent } from '../../_components/dialogs/ability/ability.component';
import { MoveComponent } from '../../_components/dialogs/move/move.component';
import { SelectedPokemonComponent } from '../../_components/dialogs/selected-pokemon/selected-pokemon.component';
import { StatComponent } from '../../_components/dialogs/stat/stat.component';


@NgModule({
  declarations: [
    TypeComponent,
    ColorComponent,
    HabitatComponent,
    ShapeComponent,
    GrowthRateComponent,
    EggGroupsComponent,
    AbilityComponent,
    MoveComponent,
    SelectedPokemonComponent,
    StatComponent
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
    
    DialogDetailsPipeModule,
    PokemonDetailsPipeModule,
    TypeColorPipeModule,
    IdToImagePipeModule
  ],
  exports: [
    TypeComponent,
    ColorComponent,
    HabitatComponent,
    ShapeComponent,
    GrowthRateComponent,
    EggGroupsComponent,
    AbilityComponent,
    MoveComponent,
    SelectedPokemonComponent,
    StatComponent
  ]
})
export class DialogComponentModule { }
