import { Pipe, PipeTransform } from '@angular/core';
import { intersectionBy, capitalize, sortBy } from 'lodash';

import { SharedService, type as TypeShared } from '../services/shared.service';


@Pipe({
  name: 'dialogDetails'
})
export class DialogDetailsPipe implements PipeTransform {

  constructor(
    private shared: SharedService
  ) {}

  transform(value: any, type: string): any {

    if (type === 'damage-class-name') {
      return capitalize(value.data.move_damage_class.name);
    }
    
    else if (type === 'damage-class-description') {
      const name = value.data.move_damage_class.name;
      const descriptions = this.shared.keys.move_damage_class.find(e => e.name === name).descriptions;
      return descriptions.find(e => e.language.name === 'en').description;
    }

    else if (type === 'entries-header-chip') {
      return capitalize(value.data.name);
    }

    else if (type === 'entries-header-color') {
      return TypeShared.find(e => e.key === value.data.id).color.default;
    }

    else if (type === 'entries') {
      const pokemon = value.data.pokemon.map((e: any) => {
        const data: any = {};
        data.id = +e.pokemon.url.split('/').reverse()[1];
        return data;
      });
      return intersectionBy(this.shared.pokemon, pokemon, 'id');
    }

    else if (type === 'entry-name') {
      return value.length > 7 
        ? value.split('-').map(e => capitalize(e)).join(' ')
        : value.split('-').map(e => capitalize(e)).join('-')
    }

    else if (type === 'entry-image') {
      return `data:image/png;base64,${value}`;
    }

    else if (type.includes('type-')) {
      const types = value.data.damage_relations[type.replace('type-', '')]
        .map((type: any) => {
          type.id = +type.url.split('/').reverse()[1];
          type.data = this.shared.keys.types.find(e => e.id === type.id);
          return type;
        });
      return sortBy(types, [ 'id' ]);
    }

    else if (type === 'typ-damage-relation') {
      return capitalize(value.name.split('-').join(' '));
    }

    else if (type === 'typ-damage-relation-color') {
      value = capitalize(value.name.split('-').join(' '));
      value = capitalize(value.split('-').join(' '));
      return TypeShared.find(e => e.name === value).color.light;
    }

    else if (type === 'moves-color') {
      return value.map((_value: any) => {
        const id = +_value.type.url.split('/').reverse()[1];
        _value.color = TypeShared.find(e => e.key === id).color.light
        _value.name = _value.name.replace('--', ' ').replace('-', ' ');
        return _value;
      })
    }

  }

}
