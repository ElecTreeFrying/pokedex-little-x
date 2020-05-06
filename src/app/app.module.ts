import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppProviderModule } from './_common/providers/app-provider.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { TypeComponent } from './_components/dialogs/type/type.component';


@NgModule({
  declarations: [
    AppComponent,
    TypeComponent
  ],
  entryComponents: [
    TypeComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    HttpClientModule,
    AppProviderModule,
    AppRoutingModule
  ],
  bootstrap: [ 
    AppComponent 
  ]
})
export class AppModule { }
