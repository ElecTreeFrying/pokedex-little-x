import { NgModule } from '@angular/core';

import { HeaderAnimateDirective } from '../directives/header-animate.directive';


@NgModule({
  declarations: [
    HeaderAnimateDirective
  ],
  exports: [
    HeaderAnimateDirective
  ]
})
export class HeaderAnimateDirectiveModule { }
