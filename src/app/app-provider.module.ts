import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import 'hammerjs';
import 'simplebar';

@NgModule({
  exports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SnotifyModule,
    LazyLoadImageModule,
  ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService
  ]
})
export class AppProviderModule { }
