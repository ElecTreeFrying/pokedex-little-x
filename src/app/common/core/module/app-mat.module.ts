import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatExpansionModule,
  MatDividerModule,
  MatRippleModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatExpansionModule,
    MatDividerModule,
    MatRippleModule,
  ]
})
export class AppMatModule { }
