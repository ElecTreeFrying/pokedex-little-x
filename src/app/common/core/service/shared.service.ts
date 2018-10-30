import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

const IMAGE_PATH = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  region = [ 'National Pokédex', 'Kanto Region', 'Jhoto Region', 'Hoenn Region', 'Sinnoh Region', 'Unova Region', 'Kalos Region', 'Alola Region', 'Collection Library' ];

  pokedex = [ 'National Pokédex', 'Red, Blue and Yellow', 'Gold, Silver and Crystal', 'Ruby, Emerald and Saphire', 'Diamond and Pearl', 'Platinum', 'Heartgold and Soulsilver', 'Black and White', 'Black2 and White 2', 'Omega Ruby and Alpha Saphire', 'Conquest Library' ];

  pokedex_version = [ 'National Pokédex', 'Pokemon Red, Blue and Yellow Version Pokédex', 'Pokemon Gold, Silver and Crystal Version Pokédex', 'Pokemon Ruby, Emerald and Saphire Version Pokédex', 'Pokemon Diamond and Pearl Version Pokédex', 'Pokemon Platinum Version Pokédex', 'Pokemon Heartgold and Soulsilver Version Pokédex', 'Pokemon Black and White Version Pokédex', 'Pokemon Black2 and White 2 Version Pokédex', 'Pokemon Omega Ruby and Alpha Saphire Version Pokédex', 'Conquest Library' ];

  types: { name: string, color: string }[] = [
    { name: 'normal', color: '#B6B6A8' },
    { name: 'fire', color: '#FF6043' },
    { name: 'water', color: '#52A8FF' },
    { name: 'electric', color: '#FFD352' },
    { name: 'grass', color: '#8BD36E' },
    { name: 'ice', color: '#7DD3FF' },
    { name: 'fighting', color: '#C56E60' },
    { name: 'poison', color: '#B66EA8' },
    { name: 'ground', color: '#E2C56E' },
    { name: 'flying', color: '#9AA8FF' },
    { name: 'psychic', color: '#FF6EA8' },
    { name: 'bug', color: '#B6C543' },
    { name: 'rock', color: '#C4B67C' },
    { name: 'ghost', color: '#7D7DC5' },
    { name: 'dragon', color: '#8B7DF0' },
    { name: 'dark', color: '#8B6E60' },
    { name: 'steel', color: '#B6B6C5' },
    { name: 'fairy', color: '#F0A8F0' }
  ]

  pokemonChange = new Subject();
  selectedChange = new Subject();
  bottomsheetChange = new Subject();

  constructor() { }

  setPokemon(poke: { gen: number, other: boolean }) {
    const gen = poke.gen === 1 && poke.other
      ? 1 : poke.gen === 1 && !poke.other
      ? 0 : ( ( poke.gen >= 2 && poke.gen <= 4 ) || ( poke.gen >= 5 && poke.gen <= 9 ) || poke.gen === 11 ) && !poke.other
      ? poke.gen - 1 : poke.gen === 15
      ? 9 : poke.gen;

    this.pokemonChange.next({ gen: poke.gen, region: poke.other ? this.region[gen] : this.pokedex_version[gen], other: poke.other });
  }

  setSelected(spec: any) {
    this.selectedChange.next({ ...spec });
  }

  setBottomsheet() {
    this.bottomsheetChange.next({});
  }

  static toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  static toBase64AllPNG() {
    let images = [];
    for (let i = 1; i < 803; i++) {
      images.push(new Promise((resolve) => {
        const url = `${IMAGE_PATH}/${i}.png`;;
        this.toDataURL(url, function(dataUrl) {
          resolve({ image: dataUrl, url });
        })
      }));
    }

    Promise.all(images).then((res) => {
      console.log(res);
    })
  }

}
