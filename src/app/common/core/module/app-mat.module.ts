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
  MatSnackBarModule,
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
    MatSnackBarModule,
  ]
})
export class AppMatModule { }
