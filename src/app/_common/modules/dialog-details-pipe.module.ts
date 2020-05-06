import { NgModule } from '@angular/core';

import { DialogDetailsPipe } from '../pipes/dialog-details.pipe';


@NgModule({
  declarations: [
    DialogDetailsPipe
  ],
  exports: [
    DialogDetailsPipe
  ]
})
export class DialogDetailsPipeModule { }
