import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SharedService } from '../../../_common/services/shared.service';


@Component({
  selector: 'app-ability',
  templateUrl: './ability.component.html',
  styleUrls: ['./ability.component.scss']
})
export class AbilityComponent implements OnInit, OnDestroy {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public ref: MatDialogRef<AbilityComponent>,
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
