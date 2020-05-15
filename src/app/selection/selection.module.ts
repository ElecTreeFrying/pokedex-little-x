import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { SelectionProviderModule } from '../_common/providers/selection-provider.module';
import { IdToImagePipeModule } from '../_common/modules/id-to-image-pipe.module';
import { SelectionRoutingModule } from './selection-routing.module';

import { SelectionComponent } from './selection.component';


@NgModule({
  declarations: [
    SelectionComponent
  ],
  imports: [
    CommonModule,
    LazyLoadImageModule,
    SelectionProviderModule,
    IdToImagePipeModule,
    SelectionRoutingModule
  ]
})
export class SelectionModule { }
