import { Injectable } from '@angular/core';
import { Location } from "@angular/common";
import { Router, NavigationStart } from '@angular/router';
import { map, filter } from 'rxjs/operators';

import { SharedService } from './shared.service';


@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private _routeForLoadMore = [
    'games'
  ]

  constructor(
    private location: Location,
    private router: Router,
    private shared: SharedService
  ) { 
    router.events.pipe(
      filter(event => event instanceof NavigationStart),
      map((event: any) => {
        return {
          flag: this._routeForLoadMore.includes(
            event.url.split("?")[0].slice(1)
          ),
          url: event.url.split("?")[0].slice(1)
        };
      })
    ).subscribe((res) => {
    
      if (!this._routeForLoadMore.includes(res.url)) {
        shared.updateHideLoadMoreSelection = true;
      } else {
        shared.updateHideLoadMoreSelection = false;
      }
    });

    this.location.subscribe((res) => {
      this.navigation(res.url);
    });
  }

  private navigation(res: any) {

    // code here
  }

  get showLoadMore() {
    return this.router.events.pipe(
      filter(event => event instanceof NavigationStart),
      map((event: any) => {
        return this._routeForLoadMore.includes(
          event.url.split("?")[0].slice(1)
        );
      })
    );
  }

}
