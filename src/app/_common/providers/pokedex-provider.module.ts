import { NgModule } from '@angular/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MatCardModule } from '@angular/material/card';

import { IdToImagePipe } from '../pipes/id-to-image.pipe';

@NgModule({
  declarations: [
    IdToImagePipe
  ],
  exports: [
    LazyLoadImageModule,
    MatCardModule,
    
    IdToImagePipe
  ]
})
export class PokedexProviderModule { }
