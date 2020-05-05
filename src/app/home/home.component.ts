import { Component, OnInit } from '@angular/core';

import { SharedService, home } from '../_common/services/shared.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  selection: any[]

  constructor(
    private shared: SharedService
  ) { }

  ngOnInit(): void {
    this.selection = home;
  }

}
