import { NgModule } from '@angular/core';

import { TypeColorPipe } from '../pipes/type-color.pipe';


@NgModule({
  declarations: [
    TypeColorPipe
  ],
  exports: [
    TypeColorPipe
  ]
})
export class TypeColorPipeModule { }
