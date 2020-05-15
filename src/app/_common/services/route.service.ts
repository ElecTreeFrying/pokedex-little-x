import { Injectable } from '@angular/core';
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

  get isGamesRoute() {
    return this.shared.hideLoadMore;
  }

}
