import { NgModule } from '@angular/core';

import { CardTextPipe } from '../pipes/card-text.pipe';


@NgModule({
  declarations: [
    CardTextPipe
  ],
  exports: [
    CardTextPipe
  ]
})
export class CardTextPipeModule { }
