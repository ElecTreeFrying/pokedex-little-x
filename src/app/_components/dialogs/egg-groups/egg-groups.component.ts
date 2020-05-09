import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SharedService } from '../../../_common/services/shared.service';


@Component({
  selector: 'app-egg-groups',
  templateUrl: './egg-groups.component.html',
  styleUrls: ['./egg-groups.component.scss']
})
export class EggGroupsComponent implements OnInit, OnDestroy {

  double: boolean

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public ref: MatDialogRef<EggGroupsComponent>,
    public dialog: MatDialog,
    private shared: SharedService
  ) { }

  ngOnInit(): void {

    this.double = this.data.data.length === 2;
  }

  ngOnDestroy() {
    this.shared.dialogIsOpened = false;
  }

}
