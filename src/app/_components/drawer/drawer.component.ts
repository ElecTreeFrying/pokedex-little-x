import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PokeapiService } from '../../_common/services/pokeapi.service';
import { SharedService, 
  type, pokedex, generation, version_group, items, categories, moves, locations
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
  items: any;
  categories: any;
  moves: any;
  locations: any;

  constructor(
    private router: Router, 
    private api: PokeapiService,
    private shared: SharedService
  ) { }

  ngOnInit(): void {
    this.types = type.filter(e => e.key <= 18);
    this.pokedex = pokedex;
    this.generation = generation;
    this.versionGroup = version_group.filter(e => e.key !== 0);
    this.items = items;
    this.categories = categories;
    this.moves = moves;
    this.locations = locations;
  }

  go(game: any, type: string) {

    if (!game) return

    const id = game.key;
    this.shared.loading = false;
    this.shared.updatedLoadedAllSelection = false;
    this.shared.index = { value: 0, count: 0 };
    
    this.router.navigate(['games'], {  
      queryParams: { name: game.name, id },
      fragment: type
    }).then(() => {
      
      this.shared.updatedRouteChangeSelection = { id, type };
    });
  }
  
  selection(parent: string, child: string) {
    
    const id = -99;
    this.shared.loading = false;
    this.shared.index = { value: 0, count: 0 };
    
    this.router.navigate([ 'selection' ], {  
      queryParams: { name: child },
      fragment: parent
    }).then(() => {
      
      const data = { id, type: child };
      this.shared.updatedRouteChangeSelection = data;
      sessionStorage.setItem('route', JSON.stringify(data));
    });
  }

}
