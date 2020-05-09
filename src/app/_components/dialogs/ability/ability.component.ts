import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SharedService } from '../../../_common/services/shared.service';


@Component({
  selector: 'app-ability',
  templateUrl: './ability.component.html',
  styleUrls: ['./ability.component.scss']
})
export class AbilityComponent implements OnInit, OnDestroy {

  sections: any[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public ref: MatDialogRef<AbilityComponent>,
    public dialog: MatDialog,
    private shared: SharedService
  ) { }

  
  ngOnInit(): void {
    
    this.sections = [ false, false ];
  }

  ngOnDestroy() {
    this.shared.dialogIsOpened = false;
  }

  section(i: number, option: boolean = true) {
    this.sections[i] = this.sections[i] ? false : true;
  }

}
