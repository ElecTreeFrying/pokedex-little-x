import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material';
import { Platform } from '@angular/cdk/platform';

import { HttpService } from './common/core/service/http.service';
import { SharedService } from './common/core/service/shared.service';

import { PokeCardConfig } from './common/shared/interface/shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('sidenav') main: MatSidenav;
  @ViewChild('pokemon') nav: MatSidenav;
  generation: string[] = [];
  pokedex: string[] = [];
  pokemonName: string = '';
  isLoaded: boolean = false;
  isOpened: boolean = false;

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

    this.shared.selectedChange.subscribe((res: PokeCardConfig | any) => {
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

    this.nav.closedStart.subscribe(() => {
      setTimeout(() => { this.shared.setNav(false); }, 300);
    });

    this.shared.navChange.subscribe((res: any) => {
      this.isOpened = res;
    });
  }

  onActivate() {
    this.isLoaded = true;
  }

  searchPokemon() {
    this.shared.setBottomsheet = 0;
  }

  getPokemonByGeneration(gen: number, other: boolean = true) {
    this.shared.setPokemon = { gen, other };
  }

  getPokemonByPokedex(gen: number, other: boolean = false) {
    this.shared.setPokemon = { gen, other };
  }

  toggle(option: boolean = false) {
    this.nav.toggle();
    this.main.toggle();
    option ? this.shared.setNav(true) : 0;
  }

}
