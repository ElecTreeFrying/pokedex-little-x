import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PokeapiService } from '../../_common/services/pokeapi.service';
import { SharedService, 
  type, pokedex, generation, version_group, items, categories, moves, region
} from '../../_common/services/shared.service';


@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {

  types: any;
  pokedex: any;
  generation: any;
  versionGroup: any;
  machineVersionGroup: any;
  items: any;
  categories: any;
  moves: any;
  region: any;

  constructor(
    private router: Router, 
    private api: PokeapiService,
    private shared: SharedService
  ) { }

  ngOnInit(): void {
    this.types = type.filter(e => e.key <= 18);
    this.pokedex = pokedex;
    this.generation = generation;
    this.machineVersionGroup = version_group;
    this.versionGroup = version_group.filter(e => e.key !== 0);
    this.items = items;
    this.categories = categories;
    this.moves = moves;
    this.region = region;
  }

  go(game: any, type: string) {

    if (!game) return

    const id = game.key;
    this.shared.loading = false;
    this.shared.updatedLoadedAllSelection = false;
    this.shared.index = { value: 30, count: 0 };
    this.shared.selectionData = undefined;
    
    this.router.navigate(['games'], {  
      queryParams: { name: game.name.toLowerCase(), id },
      fragment: type.toLowerCase()
    }).then(() => {
      
      this.shared.updatedRouteChangeSelection = { id, type };
    });
  }
  
  selection(parent: string, child: any) {
    
    this.shared.loading = false;
    this.shared.index = { value: 30, count: 0 };
    this.shared.selectionData = undefined;
    setTimeout(() => (this.shared.updateLoadingCardsSelection = true));

    if (parent === 'region') {
      this.regionSelection(parent, child);
    } else if (parent === 'machine') {
      this.machineSelection(parent, child)
    } else {
      this.defaultSelection(parent, child);
    }
  }

  defaultSelection(parent: string, child: any) {
    const id = parent !== 'move' ? -99 : -1;
    
    this.router.navigate([ 'selection' ], {  
      queryParams: { name: child.toLowerCase() },
      fragment: parent.toLowerCase()
    }).then(() => {
      
      const data = { id, type: child };
      this.shared.updatedRouteChangeSelection = data;
      sessionStorage.setItem('route', JSON.stringify(data));
    });
  }

  machineSelection(parent: string, child: any) {

    this.router.navigate([ 'selection' ], {  
      queryParams: { name: child.name.toLowerCase(), id: child.id },
      fragment: parent.toLowerCase()
    }).then(() => {
      
      const data = { id: child.id, type: parent };
      this.shared.updatedRouteChangeSelection = data;
      sessionStorage.setItem('route', JSON.stringify(data));
    });
  }

  regionSelection(parent: string, child: any) {
    const id = child.key;
    
    this.router.navigate([ 'selection' ], {  
      queryParams: { name: child.name.toLowerCase(), id },
      fragment: parent.toLowerCase()
    }).then(() => {
      
      const data = { id, type: child.name };
      this.shared.updatedRouteChangeSelection = data;
      sessionStorage.setItem('route', JSON.stringify(data));
    });
  }

}
