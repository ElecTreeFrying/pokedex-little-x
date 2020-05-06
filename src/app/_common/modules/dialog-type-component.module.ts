import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { LazyLoadImageModule } from 'ng-lazyload-image';
import { DialogDetailsPipeModule } from './dialog-details-pipe.module';

import { TypeComponent } from '../../_components/dialogs/type/type.component';


@NgModule({
  declarations: [
    TypeComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatRippleModule,
    MatChipsModule,
    MatTooltipModule,
    LazyLoadImageModule,
    MatIconModule,
    MatButtonModule,
    
    DialogDetailsPipeModule,
  ],
  exports: [
    TypeComponent
  ]
})
export class DialogTypeComponentModule { }
