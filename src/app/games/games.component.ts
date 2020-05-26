import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { PokeapiService } from '../_common/services/pokeapi.service';
import { SharedService } from '../_common/services/shared.service';
import { Subscription } from 'rxjs';
import { uniqBy, sortBy } from 'lodash';


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, AfterViewInit, OnDestroy {

  entries: any[];
  all: any[];
  route: any;
  state: any;
  toggle: boolean;

  subscriptions: Subscription[];

  constructor(
    private cd: ChangeDetectorRef,
    private api: PokeapiService,
    public shared: SharedService
  ) { }

  ngOnInit(): void {
    
    this.entries = [];
    this.route = {};
    this.toggle = false;
    this.subscriptions = [];

    this.subscriptions.push(this.shared.routeChange.subscribe((res) => {
      this.setupProcess = res;
      this.state = res;
    }));
  }

  ngAfterViewInit() {

    this.shared.loading = false;

    this.subscriptions.push(this.shared.loadMore.subscribe((res) => {

      if (res === 0) return;

      if (res === -1) {
        this.shared.updateLoadMoreSelection = 0;
        this.shared.loading = null;

        setTimeout(() => {
          this.entries = this.all;
        }, 150);
        
        return;
      }

      else if (res === -2) {
        this.setupProcess = this.state;
        this.shared.loading = false;
        return;
      }

      const full = this.entries.length === this.all.length;

      if (res !== 1 || full) return;

      this.shared.updateLoadMoreSelection = 0;
      
      this.entries = uniqBy(this.entries.concat(
        this.api.nextEntries(this.all)
      ), 'name');

      this.shared.loading = false;
      this.shared.updateIsLoadingSelection = false;

      if (this.entries.length === this.all.length) {
        this.shared.updatedLoadedAllSelection = true;
      } else {
        this.shared.updatedLoadedAllSelection = false;
      }
    }));

    let normalState = [];

    this.subscriptions.push(this.shared.search.subscribe((search: string) => {
      
      if (search === '') {
        
        if (normalState.length === 0) {
          normalState = this.entries; }

        this.entries = normalState;
        this.cd.detectChanges();
      } 
      
      if (search !== '' && search !== '-1') {

        this.entries = normalState.filter(e => e.name.includes(search));
        this.cd.detectChanges();
      }

      if (search === '-1') {
        normalState = [];
      }

    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    })
  }

  select(entry: any) {

    if (this.route['isItems'] || this.route['isCategory']) {
      this.shared.updateSelectedEntrySelection = this.toggle ? false : true;
      this.toggle = this.toggle ? false : true;
      this.shared.selectionData = entry;
  
      this.shared.sidenavContent('Item');
    } else {
      this.shared.updateSelectedEntrySelection = this.toggle ? false : true;
      this.toggle = this.toggle ? false : true;
      this.shared.id = entry.id;
      this.shared.filename = entry.filename;
  
      this.shared.sidenavContent('Pokemon');
    }

  }

  set setupProcess(res: any) {

    sessionStorage.setItem('route', JSON.stringify(res));
    const route = res.type;

    const isGames = route === 'pokedex' || route === 'generation' || route === 'version-group' || route === 'type';
    const isItems = route === 'items';
    const isCategory = route === 'category';

    this.route['entry_sort_id'] = res.id === 0 || res.id === 1 || res.id === 11 || res.type === 'type';
    this.route['conquest_gallery'] = res.id === 11;
    this.route['isGames'] = isGames;
    this.route['isItems'] = isItems;
    this.route['isCategory'] = isCategory;

    this.shared.isConquestGallery = this.route['conquest_gallery'];

    if (isGames) {
      this.setupEntries = res;
    } else if (isItems) {
      this.setupItems = res;
    } else if (isCategory) {
      this.setupCategory = res;
    }
  }

  set setupEntries(res: any) {

    let entries = [];
    
    if (res.type === 'pokedex' || res.type === 'version-group') {
      entries = this.shared.pokedex;
    } else if (res.type === 'generation') {
      entries = this.shared.generation;
    } else if (res.type === 'type') {
      entries = this.shared.pokemon;
    }

    if (!entries) {
      const session = sessionStorage.getItem('entries')

      this.entries = <any[]>JSON.parse(session);
      this.displayEntries();
      return;
    }

    if (res.id === -1) {

      this.entries = [].concat(
        (<any[]>entries.find(e => e['id'] === 12).entries),
        (<any[]>entries.find(e => e['id'] === 13).entries),
        (<any[]>entries.find(e => e['id'] === 14).entries)
      )
      
      this.displayEntries();
      return;
    }

    this.setView(entries, res);
  }

  set setupItems(res: any) {

    const entries = this.shared.item_attributes;

    if (!entries) {
      const session = sessionStorage.getItem('entries')

      this.entries = <any[]>JSON.parse(session);
      this.displayEntries();
      return;
    }

    this.setView(entries, res);
  }

  set setupCategory(res: any) {

    const entries = this.shared.item_categories;

    if (!entries) {
      const session = sessionStorage.getItem('entries')

      this.entries = <any[]>JSON.parse(session);
      this.displayEntries();
      return;
    }

    this.setView(entries, res);  
  }

  private setView(entries: any, res: any) {
    
    if (res.type === 'generation') {
      this.entries = sortBy(entries.find(e => e['id'] === res.id).entries, [ 'id' ]);
    } else if (res.type === 'type') {
      if (!res.hasOwnProperty('id')) return;
      this.subscriptions.push(this.api.typeData(res.id).subscribe(() => {
        
        this.entries = this.shared.keys.type_pokemon;

        this.displayEntries();
        sessionStorage.setItem('entries', JSON.stringify(this.all));
      }));
      return;
    } else {
      if (res.type === 'pokedex' && res.id === 0) {
        this.entries = this.shared.pokemon;
      } else {
        this.entries = entries.find(e => e['id'] === res.id).entries;
      }
    }

    this.displayEntries();
    sessionStorage.setItem('entries', JSON.stringify(this.all));
  }

  private displayEntries() {

    if (!this.entries) return;

    this.all = this.entries;

    this.loadInitialCards();

    const _length = this.all.length - 50;

    this.shared.item_meta = {
      // ceil: Math.ceil(this.all.length/this.shared.defaultLength),
      ceil: Math.ceil(_length/20) + 1,
      floor: Math.floor(this.all.length/this.shared.defaultLength)*this.shared.defaultLength
    };

    if (this.all.length < this.shared.defaultLength) {
      this.shared.updateHideLoadMoreSelection = true;
    }
  }

  private loadInitialCards() {
    
    this.entries = [];

    setTimeout(() => (this.shared.updateLoadingCardsSelection = true));
    
    setTimeout(() => (this.entries = this.all.slice(0, 15)), 250);
    
    setTimeout(() => (this.entries = this.all.slice(0, 30)), 500);
    
    setTimeout(() => {
      
      this.entries = this.all.slice(0, this.shared.defaultLength);
      this.shared.updateLoadingCardsSelection = false;

      if (!this.shared.isLoadAll) return;

      this.shared.updateHideLoadMoreSelection = this.all.length < this.shared.defaultLength;

    }, 750);
  }

  trackByID(index: number, item: any) {
    return item ? item.id : null;
  }

}
