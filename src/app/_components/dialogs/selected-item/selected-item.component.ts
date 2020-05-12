import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SharedService } from '../../../_common/services/shared.service';


@Component({
  selector: 'app-selected-item',
  templateUrl: './selected-item.component.html',
  styleUrls: ['./selected-item.component.scss']
})
export class SelectedItemComponent implements OnInit, OnDestroy {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public ref: MatDialogRef<SelectedItemComponent>,
    public dialog: MatDialog,
    private shared: SharedService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.shared.dialogIsOpened = false;
  }

}
