import { Component, Renderer2, OnInit, OnDestroy, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatButton } from '@angular/material/button';

import { SharedService } from '../_common/services/shared.service';
import { SearchItemService } from '../_common/services/search-item.service';


@Component({
  selector: 'app-search-items',
  templateUrl: './search-items.component.html',
  styleUrls: ['./search-items.component.scss']
})
export class SearchItemsComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('pokemon_selection') pokemon_selection: MatButton;
  @ViewChild('moves_selection') moves_selection: MatButton;
  @ViewChild('items_selection') items_selection: MatButton;
  @ViewChild('berries_selection') berries_selection: MatButton;

  selected: number;
  wrapStyle: any;

  constructor(
    private render: Renderer2,
    private cd: ChangeDetectorRef,
    private api: SearchItemService,
    private shared: SharedService
  ) { }

  ngOnInit(): void {

    this.initialize();
    this.selectedView();
  }
  
  ngAfterViewInit() {
    
    this.wrapStyle = this.wrapStyleProcess;
  }
  
  ngOnDestroy() {
    setTimeout(() => {
      this.shared.updateIsSearchSelection = false;
    });
  }

  initialize() {
    this.wrapStyle = {};

    setTimeout(() => {
      this.shared.updateIsSearchSelection = true;
    });
  }

  selectedView() {

    const session = JSON.parse(sessionStorage.getItem('route'));
    
    if (session.type !== 'search') return this.selectDisplay(0);

    this.selected = session.id;
    this.cd.detectChanges();
    
    this.selectDisplay(this.selected);
  }
  
  writeSelectedView(option: number) {
    
    this.selected = option;
    this.cd.detectChanges();
    
    sessionStorage.setItem('route', JSON.stringify({ id: option, type: 'search' }));
  }

  selectDisplay(option: number) {

    this.writeSelectedView(option);

    const buttons = [ 
      this.pokemon_selection._elementRef.nativeElement, 
      this.moves_selection._elementRef.nativeElement,
      this.items_selection._elementRef.nativeElement, 
      this.berries_selection._elementRef.nativeElement
    ];

    this.render.addClass(buttons[option], 'selected');

    buttons.splice(option, 1);
    
    buttons.forEach((e) => this.render.removeClass(e, 'selected'));
  }
    
  private get wrapStyleProcess() {
    const toolbarHeight = this.shared.toolbarHeight;
    return { 
      'height': `auto`, 
      'min-height': `calc(100vh - ${toolbarHeight}px)` 
    }
  }

}
