import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatExpansionModule,
  MatDividerModule,
  MatRippleModule,
  MatProgressSpinnerModule,
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
    MatProgressSpinnerModule,
  ]
})
export class AppMatModule { }
