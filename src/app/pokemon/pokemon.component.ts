import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';

import { HttpService } from '../common/core/service/http.service';
import { SharedService } from '../common/core/service/shared.service';

import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
  host: {
    '(document:keydown)': 'onEsc($event)'
  }
})
export class PokemonComponent implements OnInit {

  _pokemon = [];
  isLoad: boolean = true;
  region: string = 'Kanto Region';
  sheet: { option: boolean, isOpen: boolean, object?: any } = { option: false, isOpen: false };

  asd: MatBottomSheetRef;

  constructor(
    private bottomsheet: MatBottomSheet,
    private service: HttpService,
    private shared: SharedService
  ) {
    this.shared.pokemonChange.subscribe((pokemon: any) => {

      if (this.sheet.object !== undefined) {
        this.sheet.object.dismiss();
      }

      if (this.region === pokemon.region) return;
      this.isLoad = true;
      this.region = 'Loading...';
      this._pokemon.map((p) => p.name = '');

      pokemon.gen === 0
        ? (() => { this.isLoad = false;
            this.region = pokemon.region;
            this._pokemon = this.service.getAllPokemon; })()
        : (() => { this.isLoad = false;
            this.region = pokemon.region;
            this._pokemon = this.service.getPokedexByGeneration(pokemon.gen); })();
    });

    this.shared.bottomsheetChange.subscribe(() => {

      this.sheet.option === false
        ? (() => {
            this.sheet.object = this.bottomsheet.open(BottomSheetComponent, {
              hasBackdrop: false,
              data: this.region
            });

            this.sheet.object.afterOpened().subscribe(() => {
              this.sheet.option = true;
              this.sheet.isOpen = true;
            })
          })()
        : (() => {
            this.sheet.object.dismiss()
            this.sheet.option = false;
            this.sheet.isOpen = false;
          })()
    });
  }

  ngOnInit() {
    this._pokemon = this.service.getPokedexByGeneration(1);
    this.isLoad = false;
  }

  selectPokemon(poke: any) {
    if (this.isLoad) return;
    const url = `https://pokeapi.co/api/v2/pokemon/${poke.slug}/`;
    this.service.getPokemon({ url, name: poke.name, isEsc: false });
  }

  onEsc(event?: any) {
    if (this.isLoad) return;
    if (event.key === 'Escape') {
      this.service.getPokemon({ url: '', name: 'Loading...', isEsc: true });
    }
  }

}
