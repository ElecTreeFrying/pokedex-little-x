import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchItemsRoutingModule } from './search-items-routing.module';
import { SearchItemsProviderModule } from '../_common/providers/search-items-provider.module';

import { SearchItemsComponent } from './search-items.component';


@NgModule({
  declarations: [
    SearchItemsComponent
  ],
  imports: [
    CommonModule,
    SearchItemsRoutingModule,
    SearchItemsProviderModule
  ]
})
export class SearchItemsModule { }
