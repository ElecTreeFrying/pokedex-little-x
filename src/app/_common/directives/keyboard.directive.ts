import { Directive, HostListener, Output, EventEmitter } from '@angular/core';


@Directive({
  selector: '[keyboard]'
})
export class KeyboardDirective {

  @Output() toggle = new EventEmitter();

  combination = [];
  isPressed = false;

  constructor() { }

  @HostListener('window:keyup', ['$event'])
  up(event: KeyboardEvent) {
    
    if (this.isPressed) return;
    this.isPressed = true;

    if (event.code === 'KeyA') {
      this.toggle.next(true);
    }

    if (event.code === 'Escape') {
      this.toggle.next(false);
    }
  }
  
  @HostListener('window:keydown', ['$event'])
  down(event: KeyboardEvent) {
    this.isPressed = false;
  }

}
