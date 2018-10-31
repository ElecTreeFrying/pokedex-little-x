import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { startWith, map } from 'rxjs/operators'
import { Observable } from 'rxjs/Observable';

import { SharedService } from '../../common/core/service/shared.service';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BottomSheetComponent implements OnInit {

  filterForm: FormGroup;
  filterObservable: Observable<any>;

  constructor(
    @Inject(FormBuilder) public fb: FormBuilder,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private shared: SharedService
  ) {
    this.filterForm = fb.group({
      'filter': [ '' ],
    })
  }

  ngOnInit() {

    const value = this.filterForm.get('filter').value;
    this.filterObservable = this.filterForm.get('filter').valueChanges
      .pipe(
        startWith(value),
        map(a => this.displayFn(a)),
        map(b => this.filterPokemon(b))
      )

    this.filterObservable.subscribe((res) => {
      this.shared.setBottomsheet(res)
    });

  }

  displayFn(value: any): string {
    return value && typeof value === 'object' ? value.name : value;
  }

  filterPokemon(value: string) {
    return value ? this._filter(this.data.pokemon, value) : this.data.pokemon;
  }

  private _filter(pokemon: any[], value: string) {
    const filterValue = value.toLowerCase();
    return pokemon.filter(poke => poke.name.toLowerCase().includes(filterValue));
  }

}
