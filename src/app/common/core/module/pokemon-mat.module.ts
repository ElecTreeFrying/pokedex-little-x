import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatRippleModule,
  MatDividerModule,
  MatSidenavModule,
  MatBottomSheetModule,
  MatInputModule,
  MatFormFieldModule,
  MatAutocompleteModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatCardModule,
    MatRippleModule,
    MatDividerModule,
    MatSidenavModule,
    MatBottomSheetModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
  ]
})
export class PokemonMatModule { }
