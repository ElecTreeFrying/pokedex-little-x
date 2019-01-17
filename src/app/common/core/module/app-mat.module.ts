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
  MatTooltipModule,
  MatChipsModule,
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
    MatTooltipModule,
    MatChipsModule,
  ]
})
export class AppMatModule { }
