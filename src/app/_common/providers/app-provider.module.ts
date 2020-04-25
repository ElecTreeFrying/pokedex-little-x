import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';

import { AppInitializationComponentModule } from '../modules/app-initialization-component.module';

import { NormalizePipe } from '../pipes/normalize.pipe';

import { KeyboardDirective } from '../directives/keyboard.directive';


@NgModule({
  declarations: [
    NormalizePipe,
    KeyboardDirective
  ],
  exports: [
    HttpClientModule,
    ScrollingModule,
    OverlayModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    AppInitializationComponentModule,

    NormalizePipe,
    KeyboardDirective
  ]
})
export class AppProviderModule { }
