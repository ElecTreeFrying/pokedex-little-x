import { Component, OnInit, OnDestroy, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { SharedService } from '../../_common/services/shared.service';


@Component({
  selector: 'app-search-options',
  templateUrl: './search-options.component.html',
  styleUrls: ['./search-options.component.scss']
})
export class SearchOptionsComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() option: number;

  @Output() entries = new EventEmitter();
  @Output() calculatedHeight = new EventEmitter();

  @ViewChild('accordion') accordion: ElementRef;

  subscriptions: Subscription[];

  constructor(
    private shared: SharedService
  ) { }

  ngOnInit(): void {

    this.subscriptions = [];
  }

  ngOnDestroy() {
    this.subscriptions.forEach((e) => e.unsubscribe());
  }

  ngAfterViewInit() {
    
    setTimeout(() => this.calculatedHeight.next(
      (<HTMLDivElement>this.accordion.nativeElement).clientHeight
    ));
    
    this.subscriptions.push(this.shared.optionLoaded.subscribe(() => {setTimeout(() => {

      this.calculatedHeight.next(
        (<HTMLDivElement>this.accordion.nativeElement).clientHeight
      );

    })}));
  }

}
