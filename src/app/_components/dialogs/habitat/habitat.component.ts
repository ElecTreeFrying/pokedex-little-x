import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SharedService } from '../../../_common/services/shared.service';


@Component({
  selector: 'app-habitat',
  templateUrl: './habitat.component.html',
  styleUrls: ['./habitat.component.scss']
})
export class HabitatComponent implements OnInit, OnDestroy {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public ref: MatDialogRef<HabitatComponent>,
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
