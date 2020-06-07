import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { FooterComponentModule } from '../modules/footer-component.module';

import { SelectionPipe } from '../pipes/selection.pipe';
import { HeaderAnimateDirectiveModule } from '../modules/header-animate-directive.module';


@NgModule({
  declarations: [
    SelectionPipe
  ],
  exports: [
    MatCardModule,
    MatRippleModule,
    MatIconModule,
    MatDividerModule,
    FooterComponentModule,
    HeaderAnimateDirectiveModule,

    SelectionPipe
  ]
})
export class SelectionProviderModule { }
