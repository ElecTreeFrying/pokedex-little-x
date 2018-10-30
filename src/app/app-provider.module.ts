import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import 'simplebar';

@NgModule({
  exports: [
    HttpClientModule,
    BrowserAnimationsModule,
  ]
})
export class AppProviderModule { }
