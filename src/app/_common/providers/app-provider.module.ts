import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { AppInitializationComponentModule } from '../modules/app-initialization-component.module';
import { IdToImagePipeModule } from '../modules/id-to-image-pipe.module';

import { DrawerComponent } from '../../_components/drawer/drawer.component';
import { PokemonComponent } from '../../pokemon/pokemon.component';
import { LoadingComponent } from '../../_components/loading/loading.component';

import { NormalizePipe } from '../pipes/normalize.pipe';
import { PokemonDetailsPipe } from '../pipes/pokemon-details.pipe';
import { TypeColorPipe } from '../pipes/type-color.pipe';

import { KeyboardDirective } from '../directives/keyboard.directive';

import { pokemonDialogComponents } from '../services/component-selector.service';


@NgModule({
  declarations: [
    DrawerComponent,
    PokemonComponent,
    LoadingComponent,
    NormalizePipe,
    PokemonDetailsPipe,
    TypeColorPipe,
    KeyboardDirective,
    ...pokemonDialogComponents
  ],
  entryComponents: [
    ...pokemonDialogComponents
  ],
  imports: [
    CommonModule,
    MatRippleModule,
    MatRippleModule,
    MatDividerModule,
    MatExpansionModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatChipsModule,
    MatDialogModule,
    IdToImagePipeModule,
    LazyLoadImageModule
  ],
  exports: [
    SnotifyModule,
    ScrollingModule,
    OverlayModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    AppInitializationComponentModule,

    DrawerComponent,
    PokemonComponent,
    LoadingComponent,
    PokemonDetailsPipe,
    NormalizePipe,
    KeyboardDirective
  ],
  providers: [
    SnotifyService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults }
  ]
})
export class AppProviderModule { }
