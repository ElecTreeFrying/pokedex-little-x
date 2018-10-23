import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
    }, 2000);
  }

}
