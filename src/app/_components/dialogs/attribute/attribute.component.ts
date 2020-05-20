import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SharedService } from '../../../_common/services/shared.service';


@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.scss']
})
export class AttributeComponent implements OnInit, OnDestroy {

  num: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public ref: MatDialogRef<AttributeComponent>,
    private shared: SharedService
  ) { }

  ngOnInit(): void {

    this.num = 20;
  }

  ngOnDestroy() {
    this.shared.dialogIsOpened = false;
  }

}
