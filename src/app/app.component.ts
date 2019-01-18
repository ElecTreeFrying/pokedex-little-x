import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material';
import { Platform } from '@angular/cdk/platform';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { takeUntil } from 'rxjs/operators'
import * as SimpleBar from 'simplebar/dist/simplebar';

import { HttpService } from './common/core/service/http.service';
import { SharedService } from './common/core/service/shared.service';

import { PokeCardConfig } from './common/shared/interface/shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('sidenav') main: MatSidenav;
  @ViewChild('pokemon') nav: MatSidenav;
  @ViewChild('content') con: ElementRef;
  
  generation: string[] = [];
  pokedex: string[] = [];
  pokemonName: string = '';
  isLoaded: boolean = false;
  isOpened: boolean = false;
  isMoveUp: boolean = false;
  
  el: any = undefined;
  scrollElement: any = undefined;
  scrollTop: number = 0;

  private destroyed: ReplaySubject<boolean> = new ReplaySubject(1);
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public platform: Platform,
    private http: HttpService,
    private shared: SharedService,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer
  ) {
    this.http.localStorageInit();
    const url = sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/pokeball.svg');
    iconRegistry.addSvgIcon('logo', url);
  }

  ngOnInit() {
    
    this.router.navigate(['pokemon'], {
      relativeTo: this.route,
      skipLocationChange: true
    })

    this.generation = this.shared.region.slice(0, 7);
    this.pokedex = this.shared.pokedex;
    this.pokemonName = 'Loading...';

    this.shared.selectedChange.pipe( takeUntil(this.destroyed) ).subscribe((res: PokeCardConfig | any) => {

      const main = this.main.opened;
      const nav = this.nav.opened;
      const isEsc = res.isEsc;

      main ? this.pokemonName = res.name : 0;
      !main && !nav && !isEsc ? this.nav.open() : 0;
      main && !nav && res['abilities'] === undefined && !isEsc
        ? this.toggle(true)
        : !main && nav && res['abilities'] === undefined
          ? this.toggle()
          : 0;
    });

    this.nav.closedStart.pipe( takeUntil(this.destroyed) ).subscribe(() => {
      setTimeout(() => { this.shared.setNav(false); }, 300);
    });

    this.shared.navChange.pipe( takeUntil(this.destroyed) ).subscribe((res: any) => {
      this.isOpened = res;
    });
    
  }
  
  ngAfterViewInit () {
    
    this.nav._animationEnd.subscribe((res) => {
      
      const initState = res.toState === 'void' && res.fromState === 'void';
      const toClose = res.toState === 'open' && res.fromState === 'void';
      const toOpen = res.toState === 'void' && res.fromState === 'open';
      
      this.shared.setIsAvailable = { phaseTime: false, valid: toClose || toOpen };
      
    });
    
    this.nav._animationStarted.subscribe((res) => {
    
      const phaseTime = res.phaseName;
      this.shared.setIsAvailable = { phaseTime, valid: false };
    
    });
    
    this.el = new SimpleBar(this.con.nativeElement);
    this.scrollElement = this.el.getScrollElement();
    this.el.getScrollElement().addEventListener('scroll', (event: Event) => {
      const scrollTop = event.target['scrollTop'];
      const scrollHeight = event.target['scrollHeight'];
      const clientHeight = event.target['clientHeight'];
      const isLast = scrollHeight - scrollTop === clientHeight;
      if (isLast) { }

      this.isMoveUp = scrollTop > 300;
    });
  }
  
  ngOnDestroy() {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  onActivate() {
    this.isLoaded = true;
  }

  searchPokemon() {
    this.shared.setBottomsheet = 0;
  }
  
  sidenavChange(option: boolean) {
    this.shared.setSidenav = option;
  }

  getPokemonByGeneration(gen: number, other: boolean = true) {
    this.shared.setPokemon = { gen, other };
  }

  getPokemonByPokedex(gen: number, other: boolean = false) {
    this.shared.setPokemon = { gen, other };
  }
  
  scrollToTop(scrollDuration = 1000) {
    const scrollHeight = this.scrollElement.scrollTop;
    const scrollStep = Math.PI / ( scrollDuration / 15 );
    const cosParameter = scrollHeight / 2;

    let scrollCount = 0
    let scrollMargin = 0;

    let scrollInterval = setInterval( () => {
      if ( scrollHeight - scrollMargin !> 50 ) {
        scrollCount = scrollCount + 1;
        scrollMargin = cosParameter - cosParameter * Math.cos( scrollCount * scrollStep );
        const scroll = scrollHeight - scrollMargin;
        this.scrollElement.scrollTop = ( scroll < 50 ? 0 : scroll );
      } else {
        clearInterval(scrollInterval);
      }
    }, 5 );
  }

  toggle(option: boolean = false) {
    this.nav.toggle();
    this.main.toggle();
    option ? this.shared.setNav(true) : 0;
  }

}
