import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent implements OnInit {

  filterForm: FormGroup;

  constructor(
    @Inject(FormBuilder) public fb: FormBuilder,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {
    this.filterForm = fb.group({
      'filter': [ '' ],
    })
  }

  ngOnInit() {
    this.filterForm.get('filter').valueChanges.subscribe((res) => {
      console.log(res);
    });
  }

}
