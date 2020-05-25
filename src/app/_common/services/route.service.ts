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

  constructor(
    private location: Location,
    private router: Router,
    private shared: SharedService
  ) { 
    
    location.subscribe((res) => {
      this.navigation(res.url);
    });

    router.events.pipe(
      filter(e => e instanceof NavigationStart),
      map((e: any) => e.url)
    ).subscribe((url: string) => {
    
      shared.updatedLoadedAllSelection = false;

      const games = url.startsWith('/games');
      const pokemon_or_items = url.endsWith('#pokedex') || url.endsWith('#generation') || url.endsWith('#version-group') || url.endsWith('#type') || url.endsWith('#items') || url.endsWith('#categories');

      if (!(games && pokemon_or_items)) {
        shared.updateHideLoadMoreSelection = true;
      }
    
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
    
    if (isPokemon || type === 'machine') {

      const id = +split[0].split('&')[1].split('=')[1];
      this.shared.updatedRouteChangeSelection = { type, id };
    } 
    
    if (isSelection) {
      
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

}
