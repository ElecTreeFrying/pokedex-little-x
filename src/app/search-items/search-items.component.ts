import { Component, Renderer2, OnInit, OnDestroy, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';


import { SharedService } from '../_common/services/shared.service';
import { SearchItemService } from '../_common/services/search-item.service';
import { ComponentSelectorService } from '../_common/services/component-selector.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';


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
  entries: any[];
  wrapStyle: any;
  searchItemContentStyle: any;

  subscriptions: Subscription[];

  constructor(
    private render: Renderer2,
    private cd: ChangeDetectorRef,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet, 
    private api: SearchItemService,
    private shared: SharedService,
    private componentSelector: ComponentSelectorService
  ) { }

  ngOnInit(): void {

    this.initialize();
    // this.selectedView();
  }
  
  ngAfterViewInit() {
    
    this.wrapStyle = this.wrapStyleProcess;

    let normalState = [];

    this.subscriptions.push(this.shared.search.subscribe((search: string) => {
      
      if (search === '') {
        
        if (normalState.length === 0) {
          normalState = this.entries; }

        this.entries = normalState;
        this.cd.detectChanges();
      } 
      
      if (search !== '' && search !== '-1') {

        this.entries = normalState.filter(e => e.name.includes(search));
        this.cd.detectChanges();
      }

      if (search === '-1') {
        this.entries = normalState;
        normalState = [];
      }

    }));

    setTimeout(() => {
      this.searchItemContentStyle = this.searchItemContentStyleProcess;
    });
  }
  
  ngOnDestroy() {
    setTimeout(() => {
      this.shared.updateIsSearchSelection = false;
    });
  }

  initialize() {
    this.entries = [];
    this.wrapStyle = {};
    this.searchItemContentStyle = {};

    this.subscriptions = [];

    setTimeout(() => {
      this.shared.updateIsLoadingSelection = false;
      this.shared.updateIsSearchSelection = true;
    });
  }

  refresh() {

    this.entries = [];
    this.shared.updateOptionLoadedSelection = true;
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

    setTimeout(() => {
      this.entries = [];
      this.bottomSheet.dismiss();
      this.shared.updateAppInitializationSelection = 3;
    }, 50);

    if (option < 2) {
      this.shared.updateOptionLoadedSelection = true;
    } else {
      setTimeout(() => {
        this.searchItemContentStyle = this.searchItemContentStyleProcess;
      }, 50);
    }

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

  postEntries(entries: any[]) {
    this.entries = entries;
    this.shared.updateHideSearchSelection = false;
    this.shared.updateOptionLoadedSelection = true;
  }

  selectEntry(data: any) {

    this.shared.dialogIsOpened = true;

    const component = this.componentSelector.dialogComponent({ data, type: 'pokemon' });

    const ref = this.dialog.open(component, {
      id: 'pokemon',
      closeOnNavigation: true,
      autoFocus: false,
      data: { data, entry: null },
      minHeight: '90vh',
      maxHeight: '90vh',
      minWidth: '500px',
      maxWidth: '500px',
    });
  }
    
  private get wrapStyleProcess() {
    const toolbarHeight = this.shared.toolbarHeight;
    return { 
      'min-height': `calc(100vh - ${toolbarHeight}px)`,
    }
  }

  private get searchItemContentStyleProcess() {
    const toolbarHeight = this.shared.toolbarHeight;
    return {
      'min-height': `calc(100vh - 60px - 46px - ${toolbarHeight}px)`,
    }
  }

}
