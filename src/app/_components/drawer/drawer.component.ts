import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PokeapiService } from '../../_common/services/pokeapi.service';
import { SharedService, 
  pokedex, generation, version_group, items, categories
} from '../../_common/services/shared.service';


@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {

  pokedex: any;
  generation: any;
  versionGroup: any;
  items: any;
  categories: any;

  constructor(
    private router: Router, 
    private api: PokeapiService,
    private shared: SharedService
  ) { }

  ngOnInit(): void {
    this.pokedex = pokedex;
    this.generation = generation;
    this.versionGroup = version_group.filter(e => e.key !== 0);
    this.items = items;
    this.categories = categories;
  }

  go(games: any, type: string) {

    if (!games) return

    const id = games.key;
    this.shared.index = { value: 0, count: 0 };

    this.router.navigate(['games'], {  
      queryParams: { name: games.name, id },
      fragment: type
    }).then(() => {
      
      this.shared.updatedRouteChangeSelection = { id, type };
    });
  }

  selection(parent: string, child: string) {

    const id = -99;
    this.shared.index = { value: 0, count: 0 };
    
    this.router.navigate([ 'selection' ], {  
      queryParams: { name: child },
      fragment: parent
    }).then(() => {
      
      this.shared.updatedRouteChangeSelection = { id, type: child };
    });
  }

}
