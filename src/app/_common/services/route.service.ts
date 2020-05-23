import { Injectable } from '@angular/core';
import { Location } from "@angular/common";
import { Router, NavigationStart } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { capitalize } from 'lodash';

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

    res = res.slice(1).split('?');

    const route = res[0];

    if (!res[1]) return;

    const split = res[1].split('#');
    const type = split[1];
    
    const name = decodeURI(split[0].split('&')[0].split('=')[1]);

    const isPokemon = type === 'pokedex' || type === 'generation' || type === 'version-group' || type === 'type';
    const isSelection = name === 'type' || name === 'categories';
    
    if (isPokemon) {

      const id = +split[0].split('&')[1].split('=')[1];
      this.shared.updatedRouteChangeSelection = { type, id };
    } else if (isSelection) {
      
      this.shared.updatedRouteChangeSelection = { type: name };
    }  
    
    if (type === 'move') {
      
      this.shared.updatedRouteChangeSelection = { type: name, id: -1 };
    } else if (type === 'region') {
      
      const id = +split[0].split('&')[1].split('=')[1];
      const type = name.split(' ').map(e => capitalize(e)).join(' ');

      this.shared.updatedRouteChangeSelection = { type, id };
    }

    if (name === 'berries') {
      
      this.shared.updatedRouteChangeSelection = { type: name, id: -99 };
    }
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
