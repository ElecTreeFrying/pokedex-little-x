import { Pipe, PipeTransform } from '@angular/core';
import { capitalize, sortBy, unionBy } from 'lodash';
import { version, pokedex, type, stat } from '../services/shared.service';

import { SharedService, special_names } from '../services/shared.service';


@Pipe({
  name: 'pokemonDetails'
})
export class PokemonDetailsPipe implements PipeTransform {

  constructor(
    private shared: SharedService
  ) {}

  transform(value: any, key: string, object?: any): any {

    if (!value) return;

    if (key === 'species-name') {
      if (!special_names.find(e => e.key === value.name)) {
        return value.name.split('-').map(e => capitalize(e)).join(' ');
      } else {
        return special_names.find(e => e.key === value.name).name;
      }
    }

    if (key === 'species-name-dialog') {
      if (value.name.length < 6) {
        return value.name.split('-').map(e => capitalize(e)).join('-');
      } else {
        return value.name.split('-').map(e => capitalize(e)).join(' ');
      }
    }

    else if (key === 'species-genus') {
      return value.species.data.genera.find(e => e['language']['name'] === 'en').genus;
    }
    
    else if (key === 'type') {
      return value.data.names.find(e => e['language']['name'] === 'en').name;
    }

    else if (key.includes('type-')) {
      if (value.length === 2) {

        const types = unionBy(
          value[0].data.damage_relations[key.replace('type-', '')],
          value[1].data.damage_relations[key.replace('type-', '')], 'name'
        ).map((type: any) => {
          type.id = +type.url.split('/').reverse()[1];
          type.data = this.shared.keys.types.find(e => e.id === type.id);
          return type;
        });

        return sortBy(types, [ 'id' ]);
      } else if (value.length === 1) {

        const types = value[0].data.damage_relations[key
          .replace('type-', '')]
          .map((type: any) => {
            type.id = +type.url.split('/').reverse()[1];
            type.data = this.shared.keys.types.find(e => e.id === type.id);
            return type;
          });

        return sortBy(types, [ 'id' ]);
      } else if (value.length === 0) {
        return [];
      }
    }

    else if (key === 'typ-damage-relation') {
      return capitalize(value.name.split('-').join(' '));
    }

    else if (key === 'species-no') {
      return value.species.url.split('/').reverse()[1];
    }

    else if (key === 'species-description') {
      return value.species.data.flavor_text_entries
        .filter(e => e['language']['name'] === 'en')
        .filter(e => {
          const isUltraMoon = e['version']['name'] === 'ultra-moon';
          const isUltraSun = e['version']['name'] === 'ultra-sun';
          const isMoon = e['version']['name'] === 'moon';
          const isSun = e['version']['name'] === 'sun';
          const isAlphaSapphire = e['version']['name'] === 'alpha-sapphire';
          return isUltraMoon || isUltraSun || isMoon || isSun || isAlphaSapphire;
        })
        .map(e => e['flavor_text'])[0].split('\n').join(' ');
    }

    else if (key === 'stats') {

      if (value.stats.filter(e => e.hasOwnProperty('value')).length > 0) {
        return value.stats[0].name === 'Hp' ? value.stats : value.stats.reverse();
      }

      return value.stats.map((_stat: any) => {
        const id = +_stat.stat.url.split('/').reverse()[1];
        const min = +_stat.base_stat;
        const max = stat.find(e => e.id === id).max;
        const value = +((min/max)*100).toFixed(0);
        _stat.name = capitalize(_stat.stat.name.split('-').join(' '));
        _stat.value = value;
        _stat.base_stat = `Base stat: ${min} pts.`;
        return _stat;
      }).reverse();
    }

    else if (key === 'ability-name') {
      return value.names.find(e => e['language']['name'] === 'en').name;
    }

    else if (key === 'ability-description') {
      return value.effect_entries.find(e => e['language']['name'] === 'en').effect;
    }

    else if (key === 'evolution-1-next') {
      if (!value.species.data.evolution_chain.data.first) return;
      return value.species.data.evolution_chain.data.first;
    }
    else if (key === 'evolution-1-image') {
      if (!value.species.data.evolution_chain.data.first) return;
      return value.species.data.evolution_chain.data.first.sprite;
    }
    else if (key === 'evolution-1-name') {
      if (!value.species.data.evolution_chain.data.first) return;
      const name = value.species.data.evolution_chain.data.first.name;
      return capitalize(name);
    }
    else if (key === 'evolution-1-arrow') {
      if (!value.species.data.evolution_chain.data.first) return;
      return value.species.data.evolution_chain.data.first.evolution;
    }
    
    else if (key === 'evolution-2-next') {
      if (!value.species.data.evolution_chain.data.second) return;
      return value.species.data.evolution_chain.data.second;
    }
    else if (key === 'evolution-2-image') {
      if (!value.species.data.evolution_chain.data.second) return;
      return value.species.data.evolution_chain.data.second.sprite;
    }
    else if (key === 'evolution-2-name') {
      if (!value.species.data.evolution_chain.data.second) return;
      const name = value.species.data.evolution_chain.data.second.name;
      return capitalize(name);
    }
    else if (key === 'evolution-2-arrow') {
      if (!value.species.data.evolution_chain.data.second) return;
      return value.species.data.evolution_chain.data.second.evolution;
    }
    
    else if (key === 'evolution-3-next') {
      if (!value.species.data.evolution_chain.data.third) return;
      return value.species.data.evolution_chain.data.third;
    }
    else if (key === 'evolution-3-image') {
      if (!value.species.data.evolution_chain.data.third) return;
      return value.species.data.evolution_chain.data.third.sprite;
    }
    else if (key === 'evolution-3-name') {
      if (!value.species.data.evolution_chain.data.third) return;
      const name = value.species.data.evolution_chain.data.third.name;
      return capitalize(name);
    }
    else if (key === 'evolution-3-arrow') {
      if (!value.species.data.evolution_chain.data.third) return;
      return value.species.data.evolution_chain.data.third.evolution;
    }

    else if (key === 'species-variations') {
      return value.species.data.varieties
        .map(e => e.pokemon.data)
        .map((pokemon) => {
          pokemon.display = pokemon.name.split('-').map(e => capitalize(e)).join(' ');
          return pokemon;
        });
    }

    else if (key === 'species-variation-sprite') {

      const id = +value.species.url.split('/').reverse()[1];
      const base_name = value.species.name;
      const filename = `${id}${value.name.replace(base_name, '')}.png`

      return `https://res.cloudinary.com/electreefrying/image/upload/v1590217728/pokedex-little/pokemon_extended/${filename}`;
    }

    else if (key === 'sprites') {

      const entries = Object.entries(value.sprites)

      const map = (_entries: any) => {
        return _entries.map((entry: any) => {
          if (entry[1]) {
            const key = capitalize(entry[0].split('_').join(' '));
            const value = entry[1];
            return { key , value };
          }
        }).filter(e => e); 
      };

      const front = map(entries.slice(4, 8));
      const back = map(entries.slice(0, 4));

      return [ ...front, ...back ];
    }

    else if (key === 'species-version-entries') {
      let entries = value.species.data.flavor_text_entries.filter(e => e['language']['name'] === 'en');
      entries = entries.map((entry: any) => { entry.id = +entry.version.url.split('/').reverse()[1]; return entry; })
      return sortBy(entries, [ 'id' ]);
    }

    else if (key === 'species-version-name') {
      const id = +value.version.url.split('/').reverse()[1];
      return version.find(e => e['id'] === id).name;
    }

    else if (key === 'species-version-entry') {
      return value.flavor_text.replace(/\n/g, ' ').replace(String.fromCharCode(12), ' ');
    }

    else if (key === 'species-pokedex-numbers') {
      return value.species.data.pokedex_numbers.map((entry: any) => {
        const id = +entry.pokedex.url.split('/').reverse()[1];
        entry.name = pokedex.find(e => e.key === id).name.replace(' Pokedex', '');
        entry.entry_number = `#${entry.entry_number}`;
        return entry;
      }).reverse();
    }

    else if (key === 'moves') {
      return value
        .map((move: any) => { 

          if (!move.type.hasOwnProperty('url')) return move;

          const id = +move.type.url.split('/').reverse()[1]
          
          move.type = type.find(e => e.key === id); 
          move.color = move.type.color.light; 
          move.name = move.names.find(e => e['language']['name'] === 'en').name;
          move.name = move.name.toLowerCase();

          return move; 
        })
        .map((move: any, i: number) => ({ ...object[i], data: move, name: move.name, color: move.color }));
    }

    // Information filters

    // #1

    else if (key === 'height') {
      return (+value.height / 3.048).toFixed(2).toString() + ' ft';
    }

    else if (key === 'weight') {
      return (+value.weight / 4.536).toFixed(1).toString() + ' lbs';
    }

    else if (key === 'species-color') {
      return value.species.data.color.data.names.find(e => e['language']['name'] === 'en').name;
    }

    // #2

    else if (key === 'species-habitat') {
      const habitat = value.species.data.habitat.data.names.find(e => e['language']['name'] === 'en').name;
      return capitalize(habitat);
    }

    else if (key === 'species-shape') {
      return value.species.data.shape.data.names.find(e => e['language']['name'] === 'en').name;
    }

    else if (key === 'species-is-baby') {
      return value.species.data.is_baby;
    }

    // #3

    else if (key === 'species-base-happiness') {
      const fixed = (+value.species.data.base_happiness / 255).toFixed(2);
      return `${ fixed.includes('.00') ? `${fixed.replace('.00', '')}` : fixed }%`;;
    }

    else if (key === 'species-capture-rate') {
      const fixed = (+value.species.data.capture_rate / 255).toFixed(2);
      return `${ fixed.includes('.00') ? `${fixed.replace('.00', '')}` : fixed }%`;
    }

    // #4

    else if (key === 'species-growth-rate') {
      const growth_rate = value.species.data.growth_rate.data.descriptions.find(e => e['language']['name'] === 'en').description;
      return capitalize(growth_rate);
    }

    else if (key === 'species-genderless') {
      return +value.species.data.gender_rate === -1;
    }

    else if (key === 'species-gender-male') {
      if (value.species.data.gender_rate === -1) { return 'Genderless'; }
      let ratio = +(8 - +value.species.data.gender_rate);
      ratio = +((ratio / 8) * 100).toFixed(2);
      return (ratio < 0 ? ratio*-1 : ratio) + '%';
    }
    
    else if (key === 'species-gender-female') {
      if (value.species.data.gender_rate === -1) { return ''; }
      let ratio = +value.species.data.gender_rate;
      ratio = +((ratio / 8) * 100).toFixed(2);
      return (ratio < 0 ? ratio*-1 : ratio) + '%';
    }

    // #5

    else if (key === 'species-egg-groups') {
      return (<any[]>value.species.data.egg_groups.map((group) => 
        group.data.names.find(e => e['language']['name'] === 'en').name
      )).join(', ');
    }
    
    else if (key === 'species-hatch-counter') {
      const hatch_counter = value.species.data.hatch_counter;
      return `${(hatch_counter + 1) * 255} steps`;
    }
  }

}
