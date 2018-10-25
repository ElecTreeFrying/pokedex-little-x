import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatRippleModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
  ]
})
export class PokemonMatModule { }
