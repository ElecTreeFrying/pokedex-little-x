import { OnInit, Directive, Input, Output, Renderer2, HostListener, EventEmitter } from '@angular/core';

import { SharedService } from '../services/shared.service';
import { RouteService } from '../services/route.service';

interface Variables {
  run: boolean;
  end: boolean;
  enter: boolean;
  leave: boolean;
}


@Directive({
  selector: '[transitionEvent]'
})
export class TransitionEventDirective implements OnInit {

  @Input() transitionEvent: HTMLDivElement;
  @Output() trigger = new EventEmitter();

  events: Variables;
  isFired: boolean;
  state: boolean;
  isLoadAll: boolean;

  constructor(
    private render: Renderer2,
    private shared: SharedService,
    private route: RouteService
  ) { }
  
  initialize() {
    this.isFired = false;
    this.state = false;
    this.isLoadAll = false
    this.events = {
      run: false,
      end: false,
      enter: false,
      leave: false
    };

    this.render.addClass(this.transitionEvent, `close-right`);

    this.shared.hideLoadMore.subscribe((res) => {

      if (res !== true) return;
      
      setTimeout(() => {
        this.buttonState(false);
      }, 300);
    });

    this.route.showLoadMore.subscribe((res) => {

      this.buttonState(res);
    });
  }
  
  ngOnInit() {
    
    this.initialize();
    
    this.shared.loadMorePosition.subscribe((res) => {

      if (this.shared.selectionData) return;

      if (res === null) return;

      this.state = res;
      this.to();
    });
    
    this.shared.loadedAll.subscribe((res) => {
      
      if (res === null) return;
      
      const element = this.transitionEvent;
      const option = this.state ? 'left' : 'right';
      const suffix = this.isLoadAll ? '-refresh' : '';

      this.render.removeClass(element, `${option}${suffix}`);

      this.isLoadAll = res;
      this.to();
    });
  }

  to() {
    const posDefault = this.state ? 'left' : 'right';
    const posInverted = this.state ? 'right' : 'left';
    const suffix = this.isLoadAll ? '-refresh' : '';

    const element = this.transitionEvent;

    this.render.removeClass(element, `${posInverted}${suffix}`)
    this.render.addClass(element, `close-${posDefault}${suffix}`);
    
    setTimeout(() => {
      this.render.removeClass(element, `close-${posDefault}${suffix}`);
      this.render.addClass(element, `${posDefault}${suffix}`);
    }, 150);
  }
    
  @HostListener('transitionrun', ['$event'])
  run(event: TransitionEvent) {
    
    if (event.propertyName !== 'transform') return;
    if (!this.events.enter) return
    
    this.events.run = true;
    this.events.end = false;
  }
  
  @HostListener('transitionend', ['$event'])
  end(event: TransitionEvent) {
    
    if (event.propertyName !== 'transform') return;
    if (!this.events.leave) return;
    
    this.events.end = true;
    this.events.run = false;
    
    if (!this.isFired) return;
    
    this.isFired = false;
    this.trigger.next(false);
  }

  @HostListener('mouseenter')
  enter() {
    this.events.enter = true;
    this.events.leave = false;
  }
  
  @HostListener('mouseleave')
  leave() {
    this.events.enter = false;
    this.events.leave = true;
  }
  
  @HostListener('mouseup')
  up() {
    this.isFired = true;
    this.trigger.next(true);
  }

  private buttonState(res: boolean) {
    if (res) {

      this.render.removeClass(this.transitionEvent, `close-right-animated`);
      this.to();
    } else {

      const element = this.transitionEvent;
      const option = this.state ? 'left' : 'right';
      const suffix = this.isLoadAll ? '-refresh' : '';

      this.render.removeClass(element, `${option}${suffix}`);
      this.render.addClass(this.transitionEvent, `close-right-animated`);
    }
  }

}
