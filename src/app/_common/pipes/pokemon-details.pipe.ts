import { Pipe, PipeTransform } from '@angular/core';
import { capitalize, sortBy, unionBy } from 'lodash';
import { version, pokedex, type } from '../services/shared.service';


@Pipe({
  name: 'pokemonDetails'
})
export class PokemonDetailsPipe implements PipeTransform {

  transform(value: any, key: string, object?: any): any {

    if (!value) return;

    if (key === 'species-name') {
      return value.species.data.names.find(e => e['language']['name'] === 'en').name;
    }

    else if (key === 'species-genus') {
      return value.species.data.genera.find(e => e['language']['name'] === 'en').genus;
    }
    
    else if (key === 'type') {
      return value.names.find(e => e['language']['name'] === 'en').name;
    }

    else if (key.includes('type-')) {
      return unionBy(
        value[0].damage_relations[key.replace('type-', '')],
        value[1].damage_relations[key.replace('type-', '')], 'name'
      )
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
        })
    }

    else if (key === 'species-variation-sprite') {
      if (value.id < 10090) {
        return value.sprites.front_default;
      } else {
        const id = +value.species.url.split('/').reverse()[1];
        const name = value.name.split('-').slice(1).join('-')
        const url = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
        return `${url}/${id}-${name}.png`;
      }
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

      if (value.filter(e => e.hasOwnProperty('color')).length > 0) {
        return value; 
      }
      
      return value
        .map((move) => { 

          const id = +move.type.url.split('/').reverse()[1]
          
          move.type = type.find(e => e.key === id); 
          move.color = move.type.color.light; 
          move.name = move.names.find(e => e['language']['name'] === 'en').name;
          move.name = move.name.toLowerCase();

          return move; 
        })
        .map((move, i) => ({ ...object[i], data: move, name: move.name, color: move.color }));
    }

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

    // click filter




  }

}
