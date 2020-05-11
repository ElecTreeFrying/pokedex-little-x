import { Component, Inject, ViewChild, OnInit, OnDestroy, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatDialog , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { PokeapiService } from '../../../_common/services/pokeapi.service';
import { SharedService } from '../../../_common/services/shared.service';
import { SnotifyService } from '../../../_common/services/snotify.service';


@Component({
  selector: 'app-selected-pokemon',
  templateUrl: './selected-pokemon.component.html',
  styleUrls: ['./selected-pokemon.component.scss']
})
export class SelectedPokemonComponent implements OnInit, OnDestroy {

  @ViewChild('genus') genus: ElementRef;

  pokemon: any;
  moves: any;
  isLoading: boolean;
  sections: any[];
  subSections: any[];
  oldID: number;

  subscriptions: Subscription[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private cd: ChangeDetectorRef,
    private dialog: MatDialog,
    private api: PokeapiService,
    public shared: SharedService,
    private snotify: SnotifyService
  ) { }

  private initial() {
    this.moves = {};
    this.isLoading = true;
    this.sections = this.shared.sections;
    this.subSections = this.shared.subSections;
    this.oldID = this.shared.id;
    this.subscriptions = [];
  }

  ngOnInit(): void {
    
    this.initial();

    this.shared.id = +this.data.data;

    this.subscriptions.push(this.api.pokemon.subscribe((pokemon: any) => {
      
      this.pokemon = pokemon;

      const res = this.api.moves(pokemon.moves);
      
      this.moves.physical = res.filter(e => e['damage_class']['name'] === 'physical');
      this.moves.special = res.filter(e => e['damage_class']['name'] === 'special');
      this.moves.status = res.filter(e => e['damage_class']['name'] === 'status');
      
      this.displayToView();

    }));
  }

  ngOnDestroy() {
    this.shared.id = this.oldID;
    this.shared.dialogIsOpened = false;
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  section(i: number, option: boolean = true) {
    if (option) {
      this.sections[i] = this.sections[i] ? false : true;
    } else {
      this.subSections[i] = this.subSections[i] ? false : true;
    }
  }
  
  private displayToView() {
    this.isLoading = false;
    this.cd.detectChanges();
  }

}
