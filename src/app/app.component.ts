import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, ElementRef, ChangeDetectorRef, HostListener } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatSidenav } from '@angular/material/sidenav';
import { 
  Overlay,
  OverlayRef
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import SimpleBar from 'simplebar';

import { AppInitializationComponent } from './_components/app-initialization/app-initialization.component';

import { SharedService } from './_common/services/shared.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('toolbar') private toolbar: MatToolbar;
  @ViewChild('drawerContent') private drawerContent: ElementRef;
  @ViewChild('drawer') private drawer: MatSidenav;
  @ViewChild('details') private details: MatSidenav;

  overlayRef: OverlayRef;
  routerStyle: any;
  simplebar: any;
  isLoading: boolean;
  isShowDetails: boolean;
  sideDrawerState: { drawer: boolean, details: boolean };
  toolbarHeight: number;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private cd: ChangeDetectorRef,
    public shared: SharedService
  ) {}

  initial() {
    this.routerStyle = {};
    this.isLoading = false;
    this.isShowDetails = false;
    this.sideDrawerState = { drawer: true, details: false };
    this.toolbarHeight = 0;
  }

  pageListeners() {

    this.toolbarHeight = this._toolbarHeight;
    this.cd.detectChanges();

    this.shared.appInitialization.subscribe((res: number) => {
      res === 1 ? this.attachOverlay = true  : 
      res === 2 ? this.attachOverlay = false : 0;
    });

    this.shared.routeChange.subscribe((res: any) => {
      if (!res) return;
      this.simplebar.getScrollElement().scrollTop = 0;
    });

    this.details.openedChange.subscribe((res) => {
      
      if (!res && this.shared.id) {
        this.drawer.close();
        this.details.open();
        this.sideDrawerState = { drawer: false, details: true };
      }

    });

    this.shared.selectedEntry.subscribe((res) => {

      if (res === undefined) return;

      const drawer = this.sideDrawerState.drawer;
      const details = this.sideDrawerState.details;
      
      if ((drawer && !details) || (!drawer && !details)) {
        this.drawer.close();
        this.details.open();
        this.sideDrawerState = { drawer: false, details: true };
      } 
      
      if (!drawer && details) {
        this.details.close();
        this.drawer.open();
        this.sideDrawerState = { drawer: true, details: false };
      }

      this.cd.detectChanges();
    });
  }

  ngOnInit() {
    
    this.initial();
  }

  ngAfterViewInit() {

    this.routerStyle = this.routerStyleProcess();

    this.simplebar = new SimpleBar(this.drawerContent.nativeElement);
    
    this.scrollListener();
    this.pageListeners();
  }

  scrollListener() {

    this.simplebar.getScrollElement().addEventListener('scroll', (response: any) => {

      const target = <HTMLElement>response.target;
      const maxScroll = target.scrollHeight - target.clientHeight;
      let scrollValue = target.scrollTop;
  
      const full = this.shared.item_meta.ceil === this.shared.index.count;
  
      if (scrollValue === maxScroll && !full && !this.shared.loading) {
        let count = 0;
        this.shared.loading = true;
        this.shared.updateIsLoadingSelection = true;
        setTimeout(() => {
          if (count !== 0) return;
          this.shared.updateLoadMoreSelection = 1;
          count++;
        }, 400);
      }
    });
  }

  sidenavToggle(event: boolean) {

    this.shared.id = undefined;
    const drawer = this.sideDrawerState.drawer;

    if (event) {
      this.drawer.toggle();
      this.details.close();
      this.sideDrawerState = { drawer: drawer ? false : true, details: false };
    } else {
      this.drawer.open();
      this.details.close();
      this.sideDrawerState = { drawer: true, details: false };
    }

    this.cd.detectChanges();
  }

  set attachOverlay(option: boolean) {
    switch(option) {
      case true: {
        const portal = new ComponentPortal(AppInitializationComponent, this.viewContainerRef);
        this.overlayRef = this.overlay.create({
          disposeOnNavigation: true
        });
        
        this.overlayRef.attach(portal);
        break;
      }
      case false: {
        this.overlayRef.detach();
        this.overlayRef.dispose();
        break;
      }
    }
  }

  loadingIsOpened(emit: boolean) {
    if (!emit) return;
    const element = this.simplebar.getScrollElement();
    element.scrollTop = element.scrollHeight - element.clientHeight - 1;
  }

  toggleDetails(option: boolean) {
    this.isShowDetails = option;
    this.cd.detectChanges();
  }
  
  private routerStyleProcess() {

    const toolbarHeight = this.toolbar._elementRef.nativeElement.clientHeight;

    return { 
      'height': `calc(100vh - ${toolbarHeight}px)`, 
      'max-height': `calc(100vh - ${toolbarHeight}px)`, 
      'min-height': `calc(100vh - ${toolbarHeight}px)` 
    }
  }

  private get _toolbarHeight() {
    return this.toolbar._elementRef.nativeElement.clientHeight;
  }

  @HostListener('window:keyup', ['$event'])
  private up(event: KeyboardEvent) {

    if (event.code === 'Escape') {
      // this.shared.id = undefined;
      // console.log('ESC', this.shared.id);
      // this.sidenavToggle(false);
    }
  }

}
