import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PokeapiService } from '../_common/services/pokeapi.service';
import { SharedService, categories, type } from '../_common/services/shared.service';


@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {

  selections: any;
  type: string;
  loadAll: boolean;

  constructor(
    private router: Router,
    private api: PokeapiService,
    private shared: SharedService
  ) { }
  
  ngOnInit(): void {

    this.initialize();
    this.pageListener();
  }
  
  initialize() {
    this.loadAll = false;
  }
  
  pageListener() {

    this.shared.routeChange.subscribe((res) => {     

      if (res.id === -1) {
        this.loadAll = false;
        this.selections = this.shared.moves;
        this.type = `move-${res.type}`;
        return;
      }

      this.selections = this.collection[res.type];
      this.type = res.type;
    });
  }

  go(selection: any, type: string) {

    if (!selection) return

    const id = selection.key;

    if (type === 'type') return this.typeData(selection, type);

    this.router.navigate(['games'], {  
      queryParams: { name: selection.name, id },
      fragment: type
    }).then(() => {
      
      this.shared.updatedRouteChangeSelection = { id, type };
    });
  }

  private get collection() {
    return {
      categories,
      type: type.filter(e => e.key < 20)
    }
  }

  typeData(selection: any, type: string) {

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

}
