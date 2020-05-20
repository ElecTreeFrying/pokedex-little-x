import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SharedService } from '../../../_common/services/shared.service';


@Component({
  selector: 'app-flavor',
  templateUrl: './flavor.component.html',
  styleUrls: ['./flavor.component.scss']
})
export class FlavorComponent implements OnInit, OnDestroy {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public ref: MatDialogRef<FlavorComponent>,
    private shared: SharedService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.shared.dialogIsOpened = false;
  }

}
