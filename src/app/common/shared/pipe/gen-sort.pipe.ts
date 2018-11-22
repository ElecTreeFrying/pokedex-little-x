import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genSort'
})
export class GenSortPipe implements PipeTransform {

  gen = [
    { loc: 'Kanto Region', gen: [ 'red', 'yellow' ] },
    { loc: 'Jhoto Region', gen: [ 'crystal', 'gold', 'silver' ] },
    { loc: 'Hoenn Region', gen: [ 'sapphire', 'emerald', 'ruby', 'leafgreen' ] },
    { loc: 'Sinnoh Region', gen: [ 'platinum', 'heartgold', 'soulsilver' ] },
    { loc: 'Unova Region', gen: [ 'white', 'black', 'black-2' ] },
    { loc: 'Kalos Region', gen: [ 'y', 'x' ] },
    { loc: 'Alola Region', gen: [ 'y', 'x' ] },
    { loc: 'National Pokédex', gen: [ 'y', 'x' ] },
    { loc: 'Pokemon Red, Blue and Yellow Version Pokédex', gen: [ 'red', 'yellow' ] },
    { loc: 'Pokemon Gold, Silver and Crystal Version Pokédex', gen: [ 'crystal', 'gold', 'silver' ] },
    { loc: 'Pokemon Ruby, Emerald and Saphire Version Pokédex', gen: [ 'sapphire', 'emerald', 'ruby', 'leafgreen' ] },
    { loc: 'Pokemon Diamond and Pearl Version Pokédex', gen: [ 'platinum', 'heartgold', 'soulsilver' ] },
    { loc: 'Pokemon Platinum Version Pokédex', gen: [ 'platinum', 'heartgold', 'soulsilver' ] },
    { loc: 'Pokemon Heartgold and Soulsilver Version Pokédex', gen: [ 'platinum', 'heartgold', 'soulsilver' ] },
    { loc: 'Pokemon Black and White Version Pokédex', gen: [ 'white', 'black', 'black-2' ] },
    { loc: 'Pokemon Black2 and White 2 Version Pokédex', gen: [ 'white', 'black', 'black-2' ] },
    { loc: 'Pokemon Omega Ruby and Alpha Saphire Version Pokédex', gen: [ 'y', 'x' ] },
    { loc: 'Conquest Library', gen: [ 'y', 'x' ] },
  ];

  transform(value: any[]) {
    if (value === null) return;
    const currentRegion = localStorage.getItem('region');
    const newValue = value.map((e) => {
      e.language = e.language.name;
      e.version = e.version.name;
      return e
    })
      .filter((e) => e.language === 'en')
      .filter((e) => {
        const regs = this.gen.filter((gen) => gen.loc === currentRegion)[0].gen;
        return regs.includes(e.version);
      })

    if (newValue.length < 1) return;
    return newValue.map((e) => {
      e.flavor_text = newValue.reduce((acc, cur) => `${acc.flavor_text} ${cur.flavor_text}`);
      return e;
    }).slice(0, 1);
  }

}
