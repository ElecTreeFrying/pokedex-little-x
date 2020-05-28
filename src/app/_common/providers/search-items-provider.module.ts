import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { SearchOptionsComponent } from '../../_components/search-options/search-options.component';


@NgModule({
  imports: [
    CommonModule,
    MatExpansionModule,
  ],
  exports: [
    SearchOptionsComponent,
    MatCardModule,
    MatButtonModule,
  ],
  declarations: [
    SearchOptionsComponent
  ]
})
export class SearchItemsProviderModule { }
