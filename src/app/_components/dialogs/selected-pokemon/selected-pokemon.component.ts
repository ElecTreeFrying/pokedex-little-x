import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SharedService } from '../../../_common/services/shared.service';


@Component({
  selector: 'app-selected-pokemon',
  templateUrl: './selected-pokemon.component.html',
  styleUrls: ['./selected-pokemon.component.scss']
})
export class SelectedPokemonComponent implements OnInit, OnDestroy {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public ref: MatDialogRef<SelectedPokemonComponent>,
    public dialog: MatDialog,
    private shared: SharedService
  ) { }

  ngOnInit(): void {

    console.log(this.data);

  }

  ngOnDestroy() {
    this.shared.dialogIsOpened = false;
  }

}
