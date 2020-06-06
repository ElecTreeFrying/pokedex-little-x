import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PokeapiService } from '../_common/services/pokeapi.service';
import { SharedService, categories, type } from '../_common/services/shared.service';


@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit, OnDestroy {

  selections: any;
  all: any;
  type: string;
  toggle: boolean;
  isLoadedAll: boolean;

  subscriptions: Subscription[];

  constructor(
    private cd: ChangeDetectorRef,
    private router: Router,
    private api: PokeapiService,
    public shared: SharedService
  ) { }
  
  ngOnInit(): void {

    this.initialize();
    this.pageListener();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    })
  }
  
  initialize() {
    this.selections = [];
    this.toggle = false;
    this.isLoadedAll = false;
    
    this.subscriptions = [];
  }
  
  pageListener() {
    
    this.subscriptions.push(this.shared.routeChange.subscribe((res) => {     
      
      this.selections = [];
      this.isLoadedAll = false;
      this.shared.loading = null;
      this.shared.updateIsLoadingSelection = false;

      if (res.id === -1) {

        if (!this.shared.moves) {
          this.type = `move-${res.type}`;
          const session = sessionStorage.getItem('entries');
          const filter = this.type.replace('move-', '').toLowerCase();
          this.view = JSON.parse(session).filter(e => e.damage_class.name === filter);
          return;
        }
        
        this.type = `move-${res.type}`;
        const filter = this.type.replace('move-', '').toLowerCase();
        const data = this.shared.moves.filter(e => e.damage_class.name === filter);
        this.view = data;
        sessionStorage.setItem('entries', JSON.stringify(data));
        return;
      }
      
      if (res.id === -99 && res.type === 'berries') {

        if (!this.shared.berries) {
          const session = sessionStorage.getItem('entries');
          this.type = res.type;
          this.view = JSON.parse(session);
          return;
        }

        const data = this.shared.berries
        this.type = res.type;
        this.view = data;
        sessionStorage.setItem('entries', JSON.stringify(data));
        return;
      } 

      if (res.type === 'machine') {
       
        if (!this.shared.regions) {
          const session = sessionStorage.getItem('entries');
          this.type = res.type;
          this.view = JSON.parse(session);
          return;
        }

        const data = this.shared.keys.machines.filter((machine) => {
          const id = +machine.version_group.url.split('/').reverse()[1];
          return id === res.id;
        });
        this.type = res.type;
        this.view = data;
        sessionStorage.setItem('entries', JSON.stringify(data));
        return;
      }

      if (res.type.endsWith(' Region')) {

        if (!this.shared.regions) {
          const session = sessionStorage.getItem('entries');
          this.type = res.type;
          this.view = JSON.parse(session);
          return;
        }

        const data = this.shared.regions.find(e => e.id === res.id).locations;
        this.type = res.type;
        this.view = data;
        sessionStorage.setItem('entries', JSON.stringify(data));
        return;
      }

      this.type = res.type;
      this.view = this.collection[res.type];
    }));

    let normalState = [];

    this.subscriptions.push(this.shared.search.subscribe((search: string) => {
      
      if (search === '') {
        
        if (normalState.length === 0) {
          normalState = this.selections; }

        this.selections = normalState;
        this.cd.detectChanges();
      } 
      
      if (search !== '' && search !== '-1') {

        if (this.type === 'berries') {
          this.selections = normalState.filter(
            (e) => e.filename.replace('.png', '').split('-').join(' ').includes(search)
          );
        }

        else if (this.type.includes('move-')) {
          this.selections = normalState.filter(
            (e) => e.name.split('-').includes(search)
          );
        }

        else if (this.type === 'machine') {
          this.selections = normalState.filter((e) => {
            const item = `${e.item.name} ${e.move.name.split('-')}`;
            return item.includes(search);
          });
        }

        else if (this.type.includes(' Region') || this.type === 'categories' || this.type === 'type') {
          this.selections = normalState.filter(
            (e) => e.name.toLowerCase().includes(search)
          );
        }

      }

      if (search === '-1') {
        normalState = [];
      }

    }));
  }

  loadAllSelections() {
    this.isLoadedAll = true;
    this.selections = this.all;
  }

  go(selection: any, type: string) {

    if (!selection) return;

    if (type === 'type') return this.typeData(selection, type);
    if (type === 'berries') return this.berryData(selection, type);
    if (type === 'machine') return this.machineData(selection, type);
    if (this.type.endsWith(' Region')) return this.locationData(selection, type);
    if (this.type.includes('move-')) return this.moveData(selection, type);

    this.gamesData(selection, type);
  }

  private get collection() {
    return {
      categories,
      type: type.filter(e => e.key < 20)
    }
  }

  private gamesData(selection: any, type: string) {

    const id = selection.key;

    this.router.navigate(['games'], {  
      queryParams: { name: selection.name, id },
      fragment: type
    }).then(() => {
      
      type = type === 'categories' ? 'category' : type;

      const header = selection.name;

      this.shared.updateHeaderTextSelection = header;
      this.shared.updateScrollValueSelection = 100;

      this.shared.updatedRouteChangeSelection = { id, type, header };
    });
  }

  private typeData(selection: any, type: string) {

    const id = selection.key;

    this.router.navigate(['games'], {  
      queryParams: { name: selection.name, id },
      fragment: type
    }).then(() => {

      const header = `${selection.name} type Pokémon`;

      this.shared.updateHeaderTextSelection = header;
      this.shared.updateScrollValueSelection = 100;

      this.shared.updatedRouteChangeSelection = { id, type, header };
    });
  }

  set view(selection: any[]) {

    if (!selection) return;

    this.all = selection;

    setTimeout(() => 
      (this.selections = this.all.slice(0, this.type !== 'berries' ? 10 : 20)), 250);

    setTimeout(() => 
      (this.selections = this.all.slice(0, this.type !== 'berries' ? 20 : 45)), 500);
    
    setTimeout(() => {
      this.selections = this.all.slice(0, this.type !== 'berries' ? 30 : 64);
      this.shared.updateLoadingCardsSelection = false;
    }, 750);
  }

  private berryData(selection: any, type: string) {
    this.shared.id = undefined;
    this.shared.selectionData = selection;
    this.shared.updateSelectedEntrySelection = this.toggle ? false : true;
    this.toggle = this.toggle ? false : true;
    
    this.shared.sidenavContent('Berry');
  }

  private locationData(selection: any, type: string) {
    this.shared.id = undefined;
    this.shared.selectionData = selection;
    this.shared.updateSelectedEntrySelection = this.toggle ? false : true;
    this.toggle = this.toggle ? false : true;
    
    this.shared.sidenavContent('Location');
  }

  private machineData(selection: any, type: string) {
    this.shared.id = undefined;
    this.shared.selectionData = selection;
    this.shared.updateSelectedEntrySelection = this.toggle ? false : true;
    this.toggle = this.toggle ? false : true;
    
    this.shared.sidenavContent('Machine');
  }
  
  private moveData(selection: any, type?: string) {
    this.shared.id = undefined;
    this.shared.selectionData = selection;
    this.shared.updateSelectedEntrySelection = this.toggle ? false : true;
    this.toggle = this.toggle ? false : true;

    this.shared.sidenavContent('Move');
  }

}
