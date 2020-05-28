import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-search-options',
  templateUrl: './search-options.component.html',
  styleUrls: ['./search-options.component.scss']
})
export class SearchOptionsComponent implements OnInit {

  @Input() option: number;

  constructor() { }

  ngOnInit(): void {
  }

}
