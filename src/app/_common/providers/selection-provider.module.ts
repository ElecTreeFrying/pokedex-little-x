import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { SelectionPipe } from '../pipes/selection.pipe';


@NgModule({
  declarations: [
    SelectionPipe
  ],
  exports: [
    MatCardModule,
    MatRippleModule,
    MatIconModule,

    SelectionPipe
  ]
})
export class SelectionProviderModule { }
