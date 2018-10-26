import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material';

import { SharedService } from './common/core/service/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('sidenav') main: MatSidenav;
  @ViewChild('pokemon') nav: MatSidenav;
  list = []

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shared: SharedService,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer
  ) {
    const url = sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/pokeball.svg');
    iconRegistry.addSvgIcon('logo', url);
  }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['pokemon'], {
        relativeTo: this.route,
        skipLocationChange: true
      }).then(() => {
        this.getPokemonByGeneration(1);
      })
    }, 700);

    this.list = this.shared.region.slice(1);

    this.shared.selectedChange.subscribe((res: any) => {
      res.isEsc ? this.main.opened ? 0 : this.toggle(false) : this.toggle(res.id > 1);
    });
  }

  getPokemonByGeneration(gen: number) {
    this.shared.setPokemon(gen);
  }

  toggle(option: boolean) {
    if (option) return;
    this.nav.toggle();
    this.main.toggle();
  }

}
