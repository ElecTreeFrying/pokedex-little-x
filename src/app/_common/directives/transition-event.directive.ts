import { OnInit, Directive, Input, Output, Renderer2, HostListener, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { SharedService } from '../services/shared.service';

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
    private cd: ChangeDetectorRef,
    private render: Renderer2,
    private shared: SharedService
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
  }
  
  ngOnInit() {
    
    this.initialize();
    
    this.shared.loadMorePosition.subscribe((res) => {
      this.state = res;
      this.to();
    });
    
    this.shared.loadedAll.subscribe((res) => {
      
      if (res === null) return
      
      const element = this.transitionEvent;
      const option = this.state ? 'left' : 'right';
      const suffix = this.isLoadAll ? '-refresh' : '';

      this.render.removeClass(element, `${option}${suffix}`)

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
    if (!this.events.leave) return
    
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

}
