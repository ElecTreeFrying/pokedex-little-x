import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppInitializationComponent } from '../../_components/app-initialization/app-initialization.component';


@NgModule({
  declarations: [
    AppInitializationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AppInitializationComponent
  ]
})
export class AppInitializationComponentModule { }
