import { NgModule } from '@angular/core';

import { ItemDetailsPipe } from '../pipes/item-details.pipe';


@NgModule({
  declarations: [
    ItemDetailsPipe
  ],
  exports: [
    ItemDetailsPipe
  ]
})
export class ItemDetailsPipeModule { }
