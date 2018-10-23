import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import 'hammerjs';

import { SharedService } from './common/core/service/shared.service';

import { AppRoutingModule } from './app-routing.module';
import { AppMatModule } from './common/core/module/app-mat/app-mat.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppMatModule,
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    SharedService
  ]
})
export class AppModule { }
