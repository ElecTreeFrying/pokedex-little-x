import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { FooterComponentModule } from '../modules/footer-component.module';


@NgModule({
  exports: [
    MatCardModule,
    MatRippleModule,
    FooterComponentModule,
  ]
})
export class HomeProviderModule { }
