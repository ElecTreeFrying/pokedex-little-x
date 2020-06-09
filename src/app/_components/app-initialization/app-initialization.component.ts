import { Component, OnInit, OnDestroy, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { SharedService } from '../../_common/services/shared.service';
import { SearchOptionPokemonService } from '../../_common/services/search-option-pokemon.service';


@Component({
  selector: 'app-app-initialization',
  templateUrl: './app-initialization.component.html',
  styleUrls: ['./app-initialization.component.scss']
})
export class AppInitializationComponent implements OnInit, OnDestroy {

  @ViewChild('content') content: ElementRef;

  subscription: Subscription;

  constructor(
    private render: Renderer2,
    private shared: SharedService,
    private api: SearchOptionPokemonService,
  ) { }

  ngOnInit(): void {

    this.subscription = this.shared.appInitialization.subscribe((res: number) => {

      if (res !== 3) return;
      this.remove();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  remove() {
    if (!this.content) return;
    this.render.addClass(this.content.nativeElement, 'loaded');
  }
  
  end(event: TransitionEvent) {
    if (event.elapsedTime !== 0.7) return;
    this.shared.updateAppInitializationSelection = 4;
    this.render.removeClass(this.content.nativeElement, 'loaded');
  }

}
