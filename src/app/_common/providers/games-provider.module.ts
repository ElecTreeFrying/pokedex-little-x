import { NgModule } from '@angular/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { IdToImagePipe } from '../pipes/id-to-image.pipe';
import { CardTextPipe } from '../pipes/card-text.pipe';


@NgModule({
  declarations: [
    IdToImagePipe,
    CardTextPipe,
  ],
  exports: [
    LazyLoadImageModule,
    MatCardModule,
    MatRippleModule,
    MatIconModule,
    
    IdToImagePipe,
    CardTextPipe,
  ]
})
export class GamesProviderModule { }
