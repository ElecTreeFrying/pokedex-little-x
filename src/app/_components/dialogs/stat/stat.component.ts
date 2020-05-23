import { Component, Inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PokeapiService } from '../../../_common/services/pokeapi.service';
import { SharedService } from '../../../_common/services/shared.service';


@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {

  isLoading: boolean;

  sections: any[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public cd: ChangeDetectorRef,
    public ref: MatDialogRef<StatComponent>,
    public dialog: MatDialog,
    private api: PokeapiService,
    private shared: SharedService
  ) { }

  ngOnInit(): void {

    this.isLoading = true;
    this.sections = [ false, false, true ]
    
    this.api.load_natures_characteristics().subscribe(() => this.setStat());
  }

  setStat() {

    this.api.flatStat(this.data.data).subscribe((res) => {
    
      this.data.data = res
      this.isLoading = false;
      this.cd.detectChanges();

    });
  }

  ngOnDestroy() {
    this.shared.dialogIsOpened = false;
  }

}
