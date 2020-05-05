import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';


@NgModule({
  declarations: [
  ],
  exports: [
    MatCardModule,
    MatRippleModule,
  ]
})
export class HomeProviderModule { }
