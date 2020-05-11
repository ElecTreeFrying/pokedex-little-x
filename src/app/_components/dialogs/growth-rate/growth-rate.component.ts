import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SharedService } from '../../../_common/services/shared.service';


@Component({
  selector: 'app-growth-rate',
  templateUrl: './growth-rate.component.html',
  styleUrls: ['./growth-rate.component.scss']
})
export class GrowthRateComponent implements OnInit, OnDestroy {

  num: number = 20;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public ref: MatDialogRef<GrowthRateComponent>,
    private shared: SharedService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.shared.dialogIsOpened = false;
  }

}
