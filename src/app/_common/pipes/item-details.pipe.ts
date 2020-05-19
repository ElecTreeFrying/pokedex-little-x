import { Pipe, PipeTransform } from '@angular/core';
import { capitalize } from 'lodash';

import { SharedService, version_group } from '../services/shared.service';


@Pipe({
  name: 'itemDetails'
})
export class ItemDetailsPipe implements PipeTransform {

  constructor(
    private shared: SharedService
  ) {}

  transform(value: any, option: string): any {

    if (!value) return;

    if (option === 'item-name') {
      return value.names.find(e => e.language.name === 'en').name;
    }

    else if (option === 'item-category') {
      return value.category.data.names.find(e => e.language.name === 'en').name;
    }

    else if (option === 'item-description') {

      const description = value.flavor_text_entries
        .filter(e => e['language']['name'] === 'en')
        .filter(e => {
          const isSunMoon 
            = e['version_group']['name'] === 'sun-moon';
          const isUltraSunUltraMoon 
            = e['version_group']['name'] === 'ultra-sun-ultra-moon';
          const isOmegaRubyAlphaSapphire 
            = e['version_group']['name'] === 'omega-ruby-alpha-sapphire';
          return isSunMoon || isUltraSunUltraMoon || isOmegaRubyAlphaSapphire;
        })
        .map(e => e['text'])[0];

      if (description) {
        return description.split('\n').join(' ');
      } else {
        return value.flavor_text_entries
          .filter(e => e['language']['name'] === 'en')
          .map(e => e['text'])[0].split('\n').join(' ');
      }

    }

    else if (option === 'item-effect') {
      return value.effect_entries.find(e => e.language.name === 'en').effect.split('\n').join(' ');
    }

    else if (option === 'item-held-pokemon') {
      return value.held_by_pokemon.map(e => e.pokemon).map((pokemon, i) => {
        pokemon.id = +pokemon.url.split('/').reverse()[1];
        pokemon.display = pokemon.name.split('-').map(e => capitalize(e)).join(' ');
        return { ...pokemon, data: value.held_by_pokemon[i] };
      });
    }

    else if (option === 'item-held-pokemon-sprite') {
      if (value.id <= 807) {
        const url = 'https://raw.githubusercontent.com/ElecTreeFrying/assets/master/pokemon';
        return `${url}/${value.id}.png`;
      } else if (value.id <= 10090 && value.id > 807) {
        return value.sprites.front_default;
      } else if (value.id >= 10091) {
        const id = +value.data.data.species.url.split('/').reverse()[1];
        const name = value.name.split('-').slice(1).join('-')
        const url = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
        return `${url}/${id}-${name}.png`;
      }
    }

    else if (option === 'item-game-index') {
      return value.game_indices.map((res: any) => {
        const data: any = {};
        const gen = capitalize(res.generation.name.toUpperCase().split('-')[0]);
        const index = res.generation.name.toUpperCase().split('-')[1].toUpperCase();
        data.gen = `${gen} ${index}`;
        data.index = `#${res.game_index}`;
        return { ...data, data: res };
      }).reverse();
    }

    else if (option === 'item-cost') {
      const falsy = value.cost === 0 || value.cost === undefined || value.cost === null;
      return !falsy ? `$${value.cost}` : '-';
    }

    else if (option === 'item-fling-power') {
      const falsy = value.fling_power === 0 || value.fling_power === undefined || value.fling_power === null;
      return !falsy ? `${value.fling_power} pts.` : '-';
    }

    else if (option === 'item-abilities') {
      return value.attributes.map((attribute: any) => {
        
        const data: any = {};

        data.name = attribute.data.names.find(e => e.language.name === 'en').name;
        data.description = attribute.data.descriptions.find(e => e.language.name === 'en').description;

        return { ...data, data: attribute };
      })
    }

    else if (option === 'item-machines') {

      const moves = this.shared.moves;

      return value.machines.map((machine: any) => {
        
        const data: any = {};
        
        const id = +machine.version_group.url.split('/').reverse()[1];
        const name = version_group.find(e => e.id === id).name.replace(', ', ' & ');

        const $ = +machine.machine.data.move.url.split('/').reverse()[1];
        const move_name = moves.find(e => e.id === $).names.find(e => e.language.name === 'en').name;

        data.version_group = `Pokémon ${name} version`;
        data.move_name = move_name;
        data.item = machine.machine.data.item.name.toUpperCase();

        if (id === 12 || id === 13) return undefined;
        
        return { ...data, data: machine };

      }).filter(e => e);
    }
    
  }

}
