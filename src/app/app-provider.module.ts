import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import 'simplebar';

import { HttpService } from './common/core/service/http.service';
import { SharedService } from './common/core/service/shared.service';

@NgModule({
  exports: [
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    HttpService,
    SharedService
  ]
})
export class AppProviderModule { }
