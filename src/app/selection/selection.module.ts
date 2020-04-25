import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectionProviderModule } from '../_common/providers/selection-provider.module';
import { SelectionRoutingModule } from './selection-routing.module';

import { SelectionComponent } from './selection.component';


@NgModule({
  declarations: [
    SelectionComponent
  ],
  imports: [
    CommonModule,
    SelectionProviderModule,
    SelectionRoutingModule
  ]
})
export class SelectionModule { }
