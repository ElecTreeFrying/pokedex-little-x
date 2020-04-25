import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppProviderModule } from './_common/providers/app-provider.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DrawerComponent } from './_components/drawer/drawer.component';

import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    DrawerComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    AppProviderModule,
    AppRoutingModule
  ],
  bootstrap: [ 
    AppComponent 
  ]
})
export class AppModule { }
