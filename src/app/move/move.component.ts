import { Component, OnInit, OnDestroy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';

import { PokeapiService } from '../_common/services/pokeapi.service';
import { SharedService } from '../_common/services/shared.service';


@Component({
  selector: 'app-move',
  templateUrl: './move.component.html',
  styleUrls: ['./move.component.scss']
})
export class MoveComponent implements OnInit, OnDestroy {

  @Output() loaded = new EventEmitter;

  isLoading: boolean;
  data: any;

  sections: any[];

  constructor(
    private cd: ChangeDetectorRef,
    private api: PokeapiService,
    private shared: SharedService
  ) { }

  ngOnInit(): void {

    this.isLoading = true;
    this.sections = [ false, false, false, false, false, false, false, false ];
    
    this.loaded.next(true);

    this.api.flatMove(this.shared.selectionData).subscribe((res) => {

      this.loaded.next(false);

      this.data = res;
      this.cd.detectChanges();

      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.shared.dialogIsOpened = false;
  }

}
