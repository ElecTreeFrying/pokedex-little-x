import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import 'hammerjs';
import 'simplebar';

@NgModule({
  exports: [
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
