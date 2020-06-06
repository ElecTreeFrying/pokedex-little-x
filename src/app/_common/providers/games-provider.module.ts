import { NgModule } from '@angular/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponentModule } from '../modules/footer-component.module';

import { IdToImagePipeModule } from '../modules/id-to-image-pipe.module';
import { CardTextPipeModule } from '../modules/card-text-pipe.module';

import { HeaderAnimateDirective } from '../directives/header-animate.directive';


@NgModule({
  declarations: [
    HeaderAnimateDirective
  ],
  exports: [
    LazyLoadImageModule,
    MatCardModule,
    MatRippleModule,
    MatIconModule,
    IdToImagePipeModule,
    CardTextPipeModule,
    FooterComponentModule,
    HeaderAnimateDirective
  ]
})
export class GamesProviderModule { }
