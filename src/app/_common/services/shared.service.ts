import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private routeChangeSource: BehaviorSubject<any>;
  private appInitializationSource = new BehaviorSubject(0);

  routeChange: Observable<any>;
  appInitialization = this.appInitializationSource.asObservable();

  private _pokedex: any[];
  get pokedex() { return this._pokedex; }
  set pokedex(pokedex: any) { this._pokedex = pokedex; }

  private _generation: any[];
  get generation() { return this._generation; }
  set generation(generation: any) { this._generation = generation; }

  private _item_attributes: any[];
  get item_attributes() { return this._item_attributes; }
  set item_attributes(item_attributes: any) { this._item_attributes = item_attributes; }

  private _item_categories: any[];
  get item_categories() { return this._item_categories; }
  set item_categories(item_categories: any) { this._item_categories = item_categories; }

  constructor() {
    const routeSession = sessionStorage.getItem('route');
    this.routeChangeSource = new BehaviorSubject(JSON.parse(routeSession));
    this.routeChange = this.routeChangeSource.asObservable();
  }

  set updatedRouteChangeSelection(data: any){
    this.routeChangeSource.next(data)
  }

  set updateAppInitializationSelection(data: number) {
    this.appInitializationSource.next(data)
  }

}

export const pokedex = [
  { key: 1, name: 'National Pokedex' }, 
  { key: 2, name: 'Kanto Pokedex' }, 
  { key: 3, name: 'Original Johto Pokedex' }, 
  { key: 4, name: 'Hoenn Pokedex' }, 
  { key: 5, name: 'Original Sinnoh Pokedex' }, 
  { key: 6, name: 'Extended Sinnoh Pokedex' }, 
  { key: 7, name: 'Updated Johto Pokedex' }, 
  { key: 8, name: 'Original Unova Pokedex' }, 
  { key: 9, name: 'Updated Unova Pokedex' }, 
  { key: 11, name: 'Conquest Gallery' }, 
  { key: 12, name: 'Kalos Central Pokedex' }, 
  { key: 13, name: 'Kalos Coastal Pokedex' }, 
  { key: 14, name: 'Kalos Mountain Pokedex' }, 
  { key: 15, name: 'Updated Hoenn Pokedex' }
];

export const generation = [
  { key: 1, name: 'Generation I' },
  { key: 2, name: 'Generation II' },
  { key: 3, name: 'Generation III' },
  { key: 4, name: 'Generation IV' },
  { key: 5, name: 'Generation V' },
  { key: 6, name: 'Generation VI' },
  { key: 7, name: 'Generation VII' }
];

export const version_group = [
  { key: 2, id: 1, name: 'Red, Blue' },
  { key: 2, id: 2, name: 'Yellow' },
  { key: 3, id: 3, name: 'Gold, Silver' },
  { key: 3, id: 4, name: 'Crystal' },
  { key: 4, id: 5, name: 'Ruby, Sapphire' },
  { key: 4, id: 6, name: 'Emerald' },
  { key: 2, id: 7, name: 'Firered, Leafgreen' },
  { key: 5, id: 8, name: 'Diamond, Pearl' },
  { key: 6, id: 9, name: 'Platinum' },
  { key: 7, id: 10, name: 'Heartgold, Soulsilver' },
  { key: 8, id: 11, name: 'Black, White' },
  { key: 9, id: 14, name: 'Black 2, White 2' },
  { key: -1, id: 15, name: 'X, Y' },
  { key: 15, id: 16, name: 'Omega Ruby, Alpha Sapphire' }
];

export const items = [
  { key: 0, name: 'All items' },
  { key: 1, name: 'Countable' },
  { key: 2, name: 'Consumable' },
  { key: 3, name: 'Usable over world' },
  { key: 4, name: 'Usable in battle' },
  { key: 5, name: 'Holdable' },
  { key: 6, name: 'Holdable passive' },
  { key: 7, name: 'Holdable active' },
  { key: 8, name: 'Underground' }
];

export const categories = [
  { key: 1, name: 'Stat boosts' },
  { key: 2, name: 'Effort drop' },
  { key: 3, name: 'Medicine' },
  { key: 4, name: 'Other' },
  { key: 5, name: 'In-a-pinch' },
  { key: 6, name: 'Picky healing' },
  { key: 7, name: 'Type protection' },
  { key: 8, name: 'Baking only' },
  { key: 9, name: 'Collectibles' },
  { key: 10, name: 'Evolution' },
  { key: 11, name: 'Spelunking' },
  { key: 12, name: 'Held items' },
  { key: 13, name: 'Choice' },
  { key: 14, name: 'Effort training' },
  { key: 15, name: 'Bad held items' },
  { key: 16, name: 'Training' },
  { key: 17, name: 'Plates' },
  { key: 18, name: 'Species specific' },
  { key: 19, name: 'Type enhancement' },
  { key: 20, name: 'Event items' },
  { key: 21, name: 'Gameplay' },
  { key: 22, name: 'Plot advancement' },
  { key: 23, name: 'Unused' },
  { key: 24, name: 'Loot' },
  { key: 25, name: 'All mail' },
  { key: 26, name: 'Vitamins' },
  { key: 27, name: 'Healing' },
  { key: 28, name: 'PP recovery' },
  { key: 29, name: 'Revival' },
  { key: 30, name: 'Status cures' },
  { key: 32, name: 'Mulch' },
  { key: 33, name: 'Special balls' },
  { key: 34, name: 'Standard balls' },
  { key: 35, name: 'Dex completion' },
  { key: 36, name: 'Scarves' },
  { key: 37, name: 'All machines' },
  { key: 38, name: 'Flutes' },
  { key: 39, name: 'Apricorn balls' },
  { key: 40, name: 'Apricorn box' },
  { key: 41, name: 'Data cards' },
  { key: 42, name: 'Jewels' },
  { key: 43, name: 'Miracle shooter' },
  { key: 44, name: 'Mega stones' },
  { key: 45, name: 'Memories' },
  { key: 46, name: 'Z - crystals' }
]
