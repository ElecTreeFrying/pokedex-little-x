import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';

import { SharedService } from '../../_common/services/shared.service';


@Component({
  selector: 'app-app-initialization',
  templateUrl: './app-initialization.component.html',
  styleUrls: ['./app-initialization.component.scss']
})
export class AppInitializationComponent implements OnInit {

  @ViewChild('content') content: ElementRef;

  flag: number = 0;

  constructor(
    private render: Renderer2,
    private shared: SharedService
  ) { }

  ngOnInit(): void {

    this.shared.appInitialization.subscribe((res: number) => {

      if (res !== 3) return;
      this.remove();
    });
  }
  
  remove() {
    if (!this.content) return;
    this.render.addClass(this.content.nativeElement, 'loaded');
  }
  
  end() {
    this.flag++
    if (this.flag === 2) {
      this.shared.updateAppInitializationSelection = 4;
    }
  }

}
