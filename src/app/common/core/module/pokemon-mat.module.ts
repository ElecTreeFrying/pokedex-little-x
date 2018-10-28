import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatRippleModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatBottomSheetModule,
  MatInputModule,
  MatFormFieldModule,
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
    MatBottomSheetModule,
    MatInputModule,
    MatFormFieldModule,
  ]
})
export class PokemonMatModule { }
