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
  MatAutocompleteModule,
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
    MatAutocompleteModule,
  ]
})
export class PokemonMatModule { }
