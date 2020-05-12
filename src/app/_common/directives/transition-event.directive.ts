import { Directive, HostListener, Output, EventEmitter } from '@angular/core';


interface Variables {
  run: boolean;
  end: boolean;
  enter: boolean;
  leave: boolean;
}

@Directive({
  selector: '[transitionEvent]'
})
export class TransitionEventDirective {

  @Output() trigger = new EventEmitter();

  events: Variables;
  isFired: boolean;

  constructor() {

    this.initialize();    
  }

  initialize() {

    this.isFired = false;
    this.events = {
      run: false,
      end: false,
      enter: false,
      leave: false
    }
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
    this.trigger.next(true);
  }

}
