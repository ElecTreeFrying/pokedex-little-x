import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { MatDrawerContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { 
  Overlay,
  OverlayRef
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { AppInitializationComponent } from './_components/app-initialization/app-initialization.component';

import { SharedService } from './_common/services/shared.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('toolbar') private toolbar: MatToolbar;
  @ViewChild('drawerContent') private drawerContent: MatDrawerContent;

  overlayRef: OverlayRef;
  routerStyle: any;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private shared: SharedService
  ) {}

  private initial() {
    this.routerStyle = {};
  }
  
  ngOnInit() {
    
    this.initial();
  }

  ngAfterViewInit() {

    this.routerStyle = this.routerStyleProcess();

    this.shared.appInitialization.subscribe((res) => {
    
      if (res === 1) {

        this.attachOverlay();
      } else if (res === 2) {
        
        this.overlayRef.detach();
        this.overlayRef.dispose();
      }
    
    });
  }

  attachOverlay() {
    const portal = new ComponentPortal(AppInitializationComponent, this.viewContainerRef);
    this.overlayRef = this.overlay.create({
      disposeOnNavigation: true
    });
    
    this.overlayRef.attach(portal);
  }
  
  private routerStyleProcess() {

    const toolbarHeight = this.toolbar._elementRef.nativeElement.clientHeight;

    return { 
      'height': `calc(100vh - ${toolbarHeight}px)`, 
      'max-height': `calc(100vh - ${toolbarHeight}px)`, 
      'min-height': `calc(100vh - ${toolbarHeight}px)` 
    }
  }

}
