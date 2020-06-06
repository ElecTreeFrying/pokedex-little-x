import { Directive, Input, Renderer2 } from '@angular/core';

import { SharedService } from '../services/shared.service';


@Directive({
  selector: '[headerAnimate]'
})
export class HeaderAnimateDirective {

  @Input() el: HTMLDivElement;

  isExpanded: boolean;

  constructor(
    private render: Renderer2,
    private shared: SharedService
  ) { 

    this.shared.scrollValue.subscribe((res: number) => {

      if (!res) { return; }

      else if (res === 0 || res <=250) {
        setTimeout(() => this.expand());
      }
      
      else if (res >= 350) {
        setTimeout(() => this.collapse());
      } 
    
    });

  }

  collapse() {
    this.isExpanded = false;
    this.render.removeClass(this.el, 'expanded');
    this.render.addClass(this.el, 'collapsed');
  }

  expand() {
    this.isExpanded = true;
    this.render.removeClass(this.el, 'collapsed');
    this.render.addClass(this.el, 'expanded');
  }



}
