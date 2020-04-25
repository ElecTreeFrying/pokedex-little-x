import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeProviderModule } from '../_common/providers/home-provider.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeProviderModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
