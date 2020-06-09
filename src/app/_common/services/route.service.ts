import { Injectable } from '@angular/core';
import { Location } from "@angular/common";
import { Router, NavigationStart } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { capitalize } from 'lodash';

import { SharedService, pokedex, version_group, generation, type as SharedType } from './shared.service';


@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private _url: string;

  constructor(
    private location: Location,
    private router: Router,
    private shared: SharedService
  ) { 
    
    this.location.subscribe((res) => {
      this.navigationTask();
      this.navigation(res.url);
      this.routeConfig(res.url);
    });

    this.router.events.pipe(
      filter(e => e instanceof NavigationStart),
      map((e: any) => e.url)
    ).subscribe((url: string) => {

      this._url = url;

      this.navigationTask();
      this.routeConfig(url);
    
      const games = url.startsWith('/games');
      const pokemon_or_items = url.endsWith('#pokedex') || url.endsWith('#generation') || url.endsWith('#version-group') || url.endsWith('#type') || url.endsWith('#items') || url.endsWith('#categories');

      if (!(games && pokemon_or_items)) {
        shared.updateHideLoadMoreSelection = true;
      } else {
        shared.updateHideLoadMoreSelection = false;
      }
    });
  }

  private navigationTask() {
    this.shared.isLoadAll = true;
    this.shared.loading = false;
    this.shared.updateLoadingCardsSelection = false;
    setTimeout(() => {
      this.shared.updateIsLoadingSelection = false;
    }, 150);
  }

  private defaultConfig(type: string) {

    this.shared.updateHideSearchSelection = true;

    if (type === 'search' || type === 'explore') return;

    this.shared.updateHideLoadMoreSelection = true;

    sessionStorage.removeItem('entries');
    sessionStorage.setItem('route', JSON.stringify({ id: 0, type }));
  }

  private routeConfig(url: string) {

    if (url === '/') {
      this.defaultConfig('default');
    } else if (url.startsWith('/search')) {
      this.defaultConfig('search');
    } else if (url.startsWith('/explore')) {
      this.defaultConfig('explore');
    } else {
      this.shared.updateHideSearchSelection = false;
    }
  }

  private navigation(res: any) {

    this.shared.updateLoadingCardsSelection = true;

    res = res.slice(1).split('?');

    const route = res[0];

    if (!res[1]) return;

    const split = res[1].split('#');
    let type = split[1];
    
    const name = decodeURI(split[0].split('&')[0].split('=')[1]);
    
    const isSelection = 
      (name === 'type' && type === 'pokemon') || 
      (name === 'categories' && type === 'items');
    
    if (isSelection) {
      
      this.shared.updatedRouteChangeSelection = { type: name };
      return this.updateHeaderText(split, type, name);
    }
    
    type = type === 'categories' ? 'category' : type;
    this.updateHeaderText(split, type, name);

  }

  private updateHeaderText(split: string, type: string, name: string) {

    const data = JSON.parse(sessionStorage.getItem('route'));

    if (type === 'pokedex') {
      
      const id = +split[0].split('&')[1].split('=')[1];
      const header = pokedex.find(e => e.key === id).name;
      this.shared.updateHeaderTextSelection = header;

      this.shared.updatedRouteChangeSelection = { type, id, header };
      
    } else if (type === 'generation') {
      
      const id = +split[0].split('&')[1].split('=')[1];
      const header = generation.find(e => e.key === id).name;
      this.shared.updateHeaderTextSelection = header;

      this.shared.updatedRouteChangeSelection = { type, id, header };
      
    } else if (type === 'version-group') {
      
      const id = +split[0].split('&')[1].split('=')[1];
      const header = version_group.find(e => e.name.toLowerCase() === name).display;
      this.shared.updateHeaderTextSelection = header;

      this.shared.updatedRouteChangeSelection = { type, id, header };
      
    } else if (type === 'type') {
      
      const id = +split[0].split('&')[1].split('=')[1];
      const header = `${SharedType.find(e => e.key === id).name} type Pokémon`;
      this.shared.updateHeaderTextSelection = header;

      this.shared.updatedRouteChangeSelection = { type, id, header };
      
    } else if (type === 'generation') {
      
      const id = +split[0].split('&')[1].split('=')[1];
      const header = generation.find(e => e.key === id).name;
      this.shared.updateHeaderTextSelection = header;

      this.shared.updatedRouteChangeSelection = { type, id, header };
      
    } else if (type === 'move') {

      const _name = capitalize(name);
      this.shared.updateHeaderTextSelection = _name;
      this.shared.updatedRouteChangeSelection = { type: name, id: -1 };

      sessionStorage.setItem('route', JSON.stringify({ id: -1, type: _name }));

    } else if (type === 'region') {

      const id = +split[0].split('&')[1].split('=')[1];
      const type = name.split(' ').map(e => capitalize(e)).join(' ');
      
      this.shared.updateHeaderTextSelection = type;
      this.shared.updatedRouteChangeSelection = { type, id };
      
      sessionStorage.setItem('route', JSON.stringify({ id, type }));
    
    } else if (type === 'machine') {
      
      const id = +split[0].split('&')[1].split('=')[1];
      const header = version_group.find(e => e.id === id).display;

      this.shared.updateHeaderTextSelection = header;
      this.shared.updatedRouteChangeSelection = { type, id };

      sessionStorage.setItem('route', JSON.stringify({ id, type: 'machine' }));

    }
    
    if ((type === 'items' && name !== 'categories') || type === 'category') {
    
      const id = +split[0].split('&')[1].split('=')[1];
      const header = capitalize(name);
      this.shared.updateHeaderTextSelection = header;
      this.shared.updatedRouteChangeSelection = { type, id, header };

    }
  }

}
