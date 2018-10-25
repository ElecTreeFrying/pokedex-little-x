import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { SharedService } from './common/core/service/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

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
      })
    }, 100);

    this.list = this.shared.region.slice(1);
  }

  getPokemonByGeneration(gen: number) {
    this.shared.setPokemon(gen);
  }

}
