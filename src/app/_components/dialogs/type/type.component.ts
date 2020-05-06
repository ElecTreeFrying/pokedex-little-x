import { Component, Inject, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { PokeapiService } from '../../../_common/services/pokeapi.service';
import { SharedService } from '../../../_common/services/shared.service';


@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TypeComponent implements OnInit, OnDestroy {

  moves: any;
  sections: any[];
  subSections: any[];

  subscriptions: Subscription[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public ref: MatDialogRef<TypeComponent>,
    public dialog: MatDialog,
    private api: PokeapiService,
    private shared: SharedService
  ) { }

  private initial() {
    this.moves = {};
    this.sections = [ true, true ];
    this.subSections = [ false, false, false ];
    this.subscriptions = [];
  }

  ngOnInit(): void {

    this.initial();

    this.subscriptions.push(this.api.detailMoves(this.data.data.moves).subscribe((res) => {

      this.moves.physical = res.filter(e => e['damage_class']['name'] === 'physical');
      this.moves.special = res.filter(e => e['damage_class']['name'] === 'special');
      this.moves.status = res.filter(e => e['damage_class']['name'] === 'status');

    }));
  }

  ngOnDestroy() {
    this.shared.dialogIsOpened = false;

    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  section(i: number, option: boolean = true) {
    if (option) {
      this.sections[i] = this.sections[i] ? false : true;
    } else {
      this.subSections[i] = this.subSections[i] ? false : true;
    }
  }

}
