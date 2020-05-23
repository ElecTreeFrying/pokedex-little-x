import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

import { SharedService } from '../services/shared.service';


@Directive({
  selector: '[keyboard]'
})
export class KeyboardDirective {

  @Output() toggle = new EventEmitter();

  isPressed = false;

  constructor(
    private shared: SharedService
  ) { }

  @HostListener('window:keyup', ['$event'])
  up(event: KeyboardEvent) {
    
    if (this.isPressed || this.shared.bottomSheetIsOpened) return;
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

    if (event.code === 'Escape' && this.shared.initializationComplete) {
      this.shared.updateAppInitializationSelection = 4;
    }

    if (this.shared.dialogIsOpened) {
      this.isPressed = true;
    } else {
      this.isPressed = false;
    }

    // this.isPressed = false;
  }

}
