import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { PokeapiService } from '../_common/services/pokeapi.service';
import { SharedService } from '../_common/services/shared.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, AfterViewInit, OnDestroy {

  entries: any;
  all: any;
  defaultLength: number;
  route: any;

  subscriptions: Subscription[];

  constructor(
    private cd: ChangeDetectorRef,
    private api: PokeapiService,
    private shared: SharedService
  ) { }

  ngOnInit(): void {
    
    this.defaultLength = 25;
    this.route = {};
    this.subscriptions = [];

    this.subscriptions.push(this.shared.routeChange.subscribe((res) => {

      sessionStorage.setItem('route', JSON.stringify(res));
      const route = res.type;

      const isGames = route === 'pokedex' || route === 'generation' || route === 'version-group';
      const isItems = route === 'items';
      const isCategory = route === 'category';
  
      this.route['isGames'] = isGames;
      this.route['isItems'] = isItems;
      this.route['isCategory'] = isCategory;

      if (isGames) {
        this.setupEntries(res);
      } else if (isItems) {
        this.setupItems(res);
      } else if (isCategory) {
        this.setupCategory(res);
      }
      

    }));

    // this.api.pokemon();
  }

  ngAfterViewInit() {

    // console.log(this.shared.categories);

  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    })
  }

  setupEntries(res: any) {

    let entries = [];
    
    if (res.type === 'pokedex' || res.type === 'version-group') {
      entries = this.shared.pokedex;
    } else if (res.type === 'generation') {
      entries = this.shared.generation;
    }

    if (!entries) {
      const session = sessionStorage.getItem('entries')

      this.entries = <any[]>JSON.parse(session);
      this.all = this.entries;
      this.entries = this.entries.slice(0, this.defaultLength);
      return;
    }

    if (res.id === -1) {

      this.entries = [].concat(
        (<any[]>entries.find(e => e['id'] === 12).entries),
        (<any[]>entries.find(e => e['id'] === 13).entries),
        (<any[]>entries.find(e => e['id'] === 14).entries)
      )
      
      this.all = this.entries;
      this.entries = this.entries.slice(0, this.defaultLength);
      return;
    }

    this.entries = entries.find(e => e['id'] === res.id).entries;
    this.all = this.entries;
    this.entries = this.entries.slice(0, this.defaultLength);
    
    sessionStorage.setItem('entries', JSON.stringify(this.all));
  }

  setupItems(res: any) {

    const items = this.shared.item_attributes;

    if (!items) {
      const session = sessionStorage.getItem('entries')

      this.entries = <any[]>JSON.parse(session);
      this.all = this.entries;
      this.entries = this.entries.slice(0, this.defaultLength);
      return;
    }

    this.entries = items.find(e => e['id'] === res.id).entries;
    this.all = this.entries;
    this.entries = this.entries.slice(0, this.defaultLength);

    sessionStorage.setItem('entries', JSON.stringify(this.all));
  }

  setupCategory(res: any) {

    const entries = this.shared.item_categories;

    if (!entries) {
      const session = sessionStorage.getItem('entries')

      this.entries = <any[]>JSON.parse(session);
      this.all = this.entries;
      this.entries = this.entries.slice(0, this.defaultLength);
      return;
    }

    this.entries = entries.find(e => e['id'] === res.id).entries;
    this.all = this.entries;
    this.entries = this.entries.slice(0, this.defaultLength);

    sessionStorage.setItem('entries', JSON.stringify(this.all));
  }

  trackByID(index: number, item: any) {
    return item ? item.id : null;
  }

}
