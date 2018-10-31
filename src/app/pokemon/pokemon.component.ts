import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';

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
  cherry: string = 'https://cdn130.picsart.com/257281221032212.png?r1024x1024';
  region: string = 'Kanto Region';
  currentGen: number = 0;
  pokemonOther: boolean = true;
  sheet: { option: any, isOpen: boolean, object?: any } = { option: false, isOpen: false };

  constructor(
    private bottomsheet: MatBottomSheet,
    private service: HttpService,
    private shared: SharedService
  ) {
    this.shared.pokemonChange.subscribe((pokemon: any) => {

      if (this.region === pokemon.region) return;
      this.isLoad = true;
      this.region = 'Loading...';
      this._pokemon.map((p) => p.name = '');

      this.isLoad = false
      this.region = pokemon.region;
      this.currentGen = pokemon.gen;
      this.pokemonOther = pokemon.other
      this._pokemon = this.pokemonOther
        ? this.service.getPokedexByGeneration(this.currentGen)
        : this.service.getPokedex(this.currentGen)

    });

    this.shared.bottomsheetChange.subscribe((res: any) => {

      if (res !== 0) {
        this.sheet.option = res;
      }

      res === 0 && this.sheet.isOpen
        ? this.sheet.object.dismiss()
        : res === 0 && !this.sheet.isOpen
          ? (() => {
              this.sheet.object = this.bottomsheet.open(BottomSheetComponent, {
                hasBackdrop: false,
                data: { region: this.region, pokemon: this._pokemon }
              })

              this.sheet.object.keydownEvents().subscribe((res) => {
                console.log(res);
              });

              this.sheet.object.instance.filterObservable.subscribe((res) => {
                this.keyDown();
                this._pokemon = res;
                this.sheet.option = res;
              });

              this.sheet.object.afterOpened().subscribe(() => {
                this.sheet.isOpen = true;
              });

              this.sheet.object.afterDismissed().subscribe(() => {
                this.closeSheet();
              })
            })() : 0;

    });
  }

  ngOnInit() {
    this.isLoad = false;
    this.sheet.isOpen = false;
    setTimeout(() => {
      this._pokemon = this.service.getPokedexByGeneration(0);
    }, 400);
  }

  trackByFn(index) {
    return index;
  }

  selectPokemon(poke: any) {
    if (this.isLoad) return;
    const url = `assets/api/v2/pokemon/${poke.id}/index.json`;
    this.service.getPokemon({ url, name: poke.name, isEsc: false });
  }

  onEsc(event?: KeyboardEvent) {
    if (this.isLoad) return;
    if (event.key === 'Escape') {
      this.service.getPokemon({ url: '', name: 'Loading...', isEsc: true });
      this.sheet.isOpen ? this.closeSheet() : 0;
    }
  }

  private keyDown() {
    const event = new KeyboardEvent('keydown', { key: 'Alt' });
    document.dispatchEvent(event);
  }

  private closeSheet() {
    this.sheet.isOpen = false;
    this.sheet.object.dismiss();
    const pokemon = this.pokemonOther
      ? this.service.getPokedexByGeneration(this.currentGen)
      : this.service.getPokedex(this.currentGen)
    this.keyDown();
    this._pokemon = pokemon;
  }

}
