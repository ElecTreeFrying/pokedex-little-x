import { NgModule } from '@angular/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponentModule } from '../modules/footer-component.module';

import { IdToImagePipeModule } from '../modules/id-to-image-pipe.module';

import { CardTextPipe } from '../pipes/card-text.pipe';


@NgModule({
  declarations: [
    CardTextPipe,
  ],
  exports: [
    LazyLoadImageModule,
    MatCardModule,
    MatRippleModule,
    MatIconModule,
    IdToImagePipeModule,
    FooterComponentModule,
    
    CardTextPipe,
  ]
})
export class GamesProviderModule { }
