import { Component, Inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SharedService } from '../../../_common/services/shared.service';


@Component({
  selector: 'app-location-area',
  templateUrl: './location-area.component.html',
  styleUrls: ['./location-area.component.scss']
})
export class LocationAreaComponent implements OnInit, OnDestroy {

  sections: any[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public cd: ChangeDetectorRef,
    public ref: MatDialogRef<LocationAreaComponent>,
    public dialog: MatDialog,
    private shared: SharedService
  ) { }

  ngOnInit(): void {

    this.sections = [ false, true ];
  }

  ngOnDestroy() {
    this.shared.dialogIsOpened = false;
  }

}
