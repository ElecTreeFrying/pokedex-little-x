import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SharedService, categories } from '../_common/services/shared.service';


@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {

  selections: any;

  constructor(
    private router: Router, 
    private shared: SharedService
  ) { 
    this.selections = categories;
  }

  ngOnInit(): void {
  }

  go(selection: any, type: string) {

    if (!selection) return

    const id = selection.key;

    this.router.navigate(['games'], {  
      queryParams: { name: selection.name, id },
      fragment: type
    }).then(() => {
      
      this.shared.updatedRouteChangeSelection = { id, type };
    });
  }

}
