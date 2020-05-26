import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from '../../_components/footer/footer.component';


@NgModule({
  declarations: [
    FooterComponent
  ],
  exports: [
    FooterComponent,
    CommonModule
  ]
})
export class FooterComponentModule { }
