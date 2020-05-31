import { Component, Renderer2, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';

import { SharedService } from '../_common/services/shared.service';
import { SearchItemService } from '../_common/services/search-item.service';


@Component({
  selector: 'app-search-items',
  templateUrl: './search-items.component.html',
  styleUrls: ['./search-items.component.scss']
})
export class SearchItemsComponent implements OnInit, OnDestroy {

  @ViewChild('pokemon_selection') pokemon_selection: MatButton;
  @ViewChild('moves_selection') moves_selection: MatButton;
  @ViewChild('items_selection') items_selection: MatButton;
  @ViewChild('berries_selection') berries_selection: MatButton;

  selected: number;

  constructor(
    private render: Renderer2,
    private api: SearchItemService,
    private shared: SharedService
  ) { }

  ngOnInit(): void {
    
    this.initialize();
  }
  
  ngOnDestroy() {
    setTimeout(() => {
      this.shared.updateIsSearchSelection = false;
    });
  }

  initialize() {
    this.selected = 0;

    setTimeout(() => {
      this.render.addClass(this.pokemon_selection._elementRef.nativeElement, 'selected');
      this.shared.updateIsSearchSelection = true;
    });
  }

  selectDisplay(option: number) {

    this.selected = option;

    const buttons = [ 
      this.pokemon_selection._elementRef.nativeElement, 
      this.moves_selection._elementRef.nativeElement,
      this.items_selection._elementRef.nativeElement, 
      this.berries_selection._elementRef.nativeElement
    ];

    this.render.addClass(buttons[option], 'selected');

    buttons.splice(option, 1);
    
    buttons.forEach((e) => {
      this.render.removeClass(e, 'selected');
    });
  }

}
