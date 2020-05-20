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
  type: string;
  loadAll: boolean;
  toggle: boolean;

  subscriptions: Subscription[];

  constructor(
    private cd: ChangeDetectorRef,
    private router: Router,
    private api: PokeapiService,
    private shared: SharedService
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
    this.loadAll = false;
    this.toggle = false;

    this.subscriptions = [];
  }
  
  pageListener() {

    this.subscriptions.push(this.shared.routeChange.subscribe((res) => {     

      this.shared.loading = null;
      this.shared.updateIsLoadingSelection = false;

      if (res.id === -1) {
        this.loadAll = false;

        if (!this.shared.moves) {
          this.type = `move-${res.type}`;
          const session = sessionStorage.getItem('entries');
          const filter = this.type.replace('move-', '').toLowerCase();
          this.selections = JSON.parse(session).filter(e => e.damage_class.name === filter);
          return;
        }
        
        this.type = `move-${res.type}`;
        const filter = this.type.replace('move-', '').toLowerCase();
        this.selections = this.shared.moves.filter(e => e.damage_class.name === filter);
        sessionStorage.setItem('entries', JSON.stringify(this.selections));
        return;
      }
      
      if (res.id === -99 && res.type === 'berries') {

        if (!this.shared.berries) {
          const session = sessionStorage.getItem('entries');
          this.selections = JSON.parse(session);
          this.type = res.type;
          return;
        }

        this.selections = this.shared.berries;
        this.type = res.type;
        sessionStorage.setItem('entries', JSON.stringify(this.selections));
        return;
      }

      if (res.type.endsWith(' Region')) {
        this.loadAll = false;

        if (!this.shared.regions) {
          const session = sessionStorage.getItem('entries');
          this.selections = JSON.parse(session);
          this.type = res.type;
          return;
        }

        this.selections = this.shared.regions.find(e => e.id === res.id).locations;
        this.type = res.type;
        sessionStorage.setItem('entries', JSON.stringify(this.selections));
        return;
      }

      this.selections = this.collection[res.type];
      this.type = res.type;
    }));
  }

  go(selection: any, type: string) {

    if (!selection) return;

    if (type === 'type') return this.typeData(selection, type);
    if (type === 'berries') return this.berryData(selection, type);
    if (this.type.endsWith(' Region')) return this.locationData(selection, type);
    if (this.type.includes('move-')
    ) return this.moveData(selection, type);

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

      this.shared.updatedRouteChangeSelection = { id, type };
    });
  }

  private typeData(selection: any, type: string) {

    const id = selection.key;

    this.api.typeData(+id).subscribe(() => {
      
      this.router.navigate(['games'], {  
        queryParams: { name: selection.name, id },
        fragment: type
      }).then(() => {
        
        this.shared.updatedRouteChangeSelection = { id, type };
      });
    
    });
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
  
  private moveData(selection: any, type?: string) {
    this.shared.id = undefined;
    this.shared.selectionData = selection;
    this.shared.updateSelectedEntrySelection = this.toggle ? false : true;
    this.toggle = this.toggle ? false : true;

    this.shared.sidenavContent('Move');
  }

}
