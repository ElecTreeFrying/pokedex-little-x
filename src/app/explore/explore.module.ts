import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExploreRoutingModule } from './explore-routing.module';
import { ExploreProviderModule } from '../_common/providers/explore-provider.module';

import { ExploreComponent } from './explore.component';


@NgModule({
  declarations: [
    ExploreComponent
  ],
  imports: [
    CommonModule,
    ExploreRoutingModule,
    ExploreProviderModule
  ]
})
export class ExploreModule { }
