import { OnInit, Directive, Input, Output, Renderer2, HostListener, EventEmitter } from '@angular/core';

import { SharedService } from '../services/shared.service';
import { filter, map } from 'rxjs/operators';

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
  isRefresh: boolean;

  constructor(
    private render: Renderer2,
    private shared: SharedService
  ) { }
  
  initialize() {
    this.isFired = false;
    this.state = true;
    this.isRefresh = false;
    this.events = {
      run: false,
      end: false,
      enter: false,
      leave: false
    };
  }
  
  ngOnInit() {
    
    this.initialize();
    this.slideClose(this.position);

    this.shared.hideLoadMore.subscribe((res) => {

      if (res === null) return;

      res 
        ? this.slideClose(this.position)
        : this.slideOpen(this.position);
      
    });

    this.shared.loadMorePosition.subscribe((res) => {

      if (res === null) return;

      this.state = !res;
      this.slideOpen(this.position);

    });
    
    this.shared.loadedAll.subscribe((res) => {

      if (res === null) return;
      this.isRefresh = res; 
      
      if (res) {
        this.slideOpen(this.position);
      }
 
    });

    this.shared.loadMore.pipe( 
      filter(e => e === -7 || e === -8),
      map(e => e === -7 ? true : e === -8 ? false : null),
      filter(e => e !== null) 
    ).subscribe((res: any) => {
      
      res
        ? this.slideClose(this.position)
        : this.slideOpen(this.position);

    });
  }

  reset() {
    const element = this.transitionEvent;
    this.render.removeClass(element, 'close-left-animated');
    this.render.removeClass(element, 'close-right-animated');
    this.render.removeClass(element, 'close-left');
    this.render.removeClass(element, 'close-right');
    this.render.removeClass(element, 'left');
    this.render.removeClass(element, 'right');
    this.render.removeClass(element, 'left-refresh');
    this.render.removeClass(element, 'right-refresh');
  }
  
  slideOpen(position: string) {
    this.reset();
    const element = this.transitionEvent;
    const refresh = this.isRefresh ? '-refresh' : '';
    this.render.addClass(element, `close-${position}${refresh}`);
    setTimeout(() => {
      this.render.removeClass(element, `close-${position}${refresh}`);
      this.render.addClass(element, `${position}${refresh}`);
    }, 150);
  }
  
  slideClose(position: string) {
    this.reset();
    const element = this.transitionEvent;
    this.render.addClass(element, `close-${position}-animated`);
  }

  private get position() {
    return this.state ? 'right' : 'left';
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

    // if (this.isRefresh) return;
    // this.trigger.next(false);
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
    
    // if (this.isRefresh) return;
    // this.trigger.next(true);
  }

}
