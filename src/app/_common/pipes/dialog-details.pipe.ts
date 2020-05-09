import { Pipe, PipeTransform } from '@angular/core';
import { intersectionBy, capitalize, sortBy } from 'lodash';

import { SharedService, type as TypeShared, version_group, version } from '../services/shared.service';


@Pipe({
  name: 'dialogDetails'
})
export class DialogDetailsPipe implements PipeTransform {

  constructor(
    private shared: SharedService
  ) {}

  transform(value: any, type: string): any {

    if (type === 'move-damage-class-name') {
      return capitalize(value.data.move_damage_class.name);
    }
    
    else if (type === 'move-damage-class-description') {
      const name = value.data.move_damage_class.name;
      const descriptions = this.shared.keys.move_damage_class.find(e => e.name === name).descriptions;
      return descriptions.find(e => e.language.name === 'en').description;
    }

    else if (type === 'entries-header-chip') {
      if (value.hasOwnProperty('power')) {
        // move.component.html
        return value.names.find(e => e.language.name === 'en').name.toLowerCase();
      }
      if (value.data.hasOwnProperty('descriptions')) {
        return capitalize(value.data.descriptions.find(e => e['language']['name'] === 'en').description);
      } else {
        return capitalize(value.data.names.find(e => e['language']['name'] === 'en').name);
      }
    }

    else if (type === 'entries-header-color') {
      if (value.hasOwnProperty('power')) {
        // move.component.html
        return value.type.color.light;
      } else {
        return TypeShared.find(e => e.key === value.data.id).color.default;
      }
    }

    else if (type.includes('text-effect-entry-')) {
      type = type.replace('text-effect-entry-', '');
      if (value.hasOwnProperty('power')) {
        // move.component.html
        return value.effect_entries.find(e => e['language']['name'] === 'en')[type].replace(/\n/g, ' ').replace(String.fromCharCode(12), ' ');
      } else {
        return value.data.effect_entries.find(e => e['language']['name'] === 'en')[type].replace(/\n/g, ' ').replace(String.fromCharCode(12), ' ');
      }
    }

    else if (type === 'entries') {
      if (value.data.hasOwnProperty('pokemon')) {
        value = value.data.pokemon.map((e: any) => {
          const data: any = {};
          data.id = +e.pokemon.url.split('/').reverse()[1];
          return data;
        });
      } else if (value.data.hasOwnProperty('pokemon_species')) {
        value = value.data.pokemon_species.map((e: any) => {
          const data: any = {};
          data.id = +e.url.split('/').reverse()[1];
          return data;
        });
      }
      return intersectionBy(this.shared.pokemon, value, 'id');
    }

    else if (type.includes('entries-egg-group-')) {
      const id = +type.replace('entries-egg-group-', '');
      value = value.data[id].data.pokemon_species.map((e: any) => {
        const data: any = {};
        data.id = +e.url.split('/').reverse()[1];
        return data;
      });
      return intersectionBy(this.shared.pokemon, value, 'id');
    }

    else if (type.includes('entries-header-chip-egg-group-')) {
      const id = +type.replace('entries-header-chip-egg-group-', '');
      return capitalize(value.data[id].data.names.find(e => e['language']['name'] === 'en').name);
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

    else if (type === 'ability-effect-changes') {
      return value.data.effect_changes.map((res: any) => {
        const data: any = {};
        const id = +res.version_group.url.split('/').reverse()[1];
        const key = version_group.find(e => e.id === id).key;
        data.label = version.find(e => e.id === key).name;
        data.effect = res.effect_entries.find(e => e['language']['name'] === 'en').effect;
        return data;
      })
    }
    
    else if (type === 'ability-text-entries') {
      return value.data.flavor_text_entries.filter(e => e['language']['name'] === 'en').map((res: any) => {
        const data: any = {};
        const id = +res.version_group.url.split('/').reverse()[1];
        data.label = version.find(e => e.id === id).name;
        data.effect = res.flavor_text;
        return data;
      });
    }

    else if (type === 'move-text-entries') {
      return value.flavor_text_entries.filter(e => e['language']['name'] === 'en').map((res: any) => {
        const data: any = {};
        const id = +res.version_group.url.split('/').reverse()[1];
        data.label = version.find(e => e.id === id).name;
        data.effect = res.flavor_text;
        return data;
      });
    }

    else if (type === 'damage-class-name') {
      return capitalize(
        value.damage_class.data.names.find(e => e['language']['name'] === 'en').name
      );
    }

    else if (type === 'damage-class-description') {
      const description = value.damage_class.data.descriptions.find(e => e['language']['name'] === 'en').description;
      return description.endsWith('.') ? description : `${description}.`;
    }

    else if (type === 'target-name') {
      return value.target.data.names.find(e => e['language']['name'] === 'en').name;
    }

    else if (type === 'target-description') {
      return value.target.data.descriptions.find(e => e['language']['name'] === 'en').description;
    }

    else if (type === 'machines') {

      console.log(value.machines);

      return value.machines.map((machine: any) => {
        const id = +machine.version_group.url.split('/').reverse()[1];
        const version = version_group.find(e => e.id === id).name.replace(',', ' &');
        machine._item = machine.machine.data.item.name.toUpperCase();
        machine._move = machine.machine.data.move.name.split('-').join(' ');
        machine._version = `Pokémon ${version} version`
        return machine;
      });
    }

    else if (type === 'contest-typpe-name') {
      return value.contest_type.data.names.find(e => e['language']['name'] === 'en').name;
    }

    else if (type === 'contest-typpe-color') {
      return value.contest_type.data.names.find(e => e['language']['name'] === 'en').color;
    }

    else if (type === 'contest-typpe-berry-flavor') {
      return capitalize(value.contest_type.data.berry_flavor.name.split('-').join(' '));
    }

    else if (type === 'contest-effect-appeal') {
      const appeal = +value.contest_effect.data.appeal;
      return appeal === 0 ? 'N/A' : `${appeal} pts.`;
    }
    
    else if (type === 'contest-effect-jam') {
      const jam = value.contest_effect.data.jam
      return jam === 0 ? 'N/A' : `${jam} pts.`;
    }

    else if (type === 'contest-effect-effect') {
      return value.contest_effect.data.effect_entries.find(e => e['language']['name'] === 'en').effect;
    }
    
    else if (type === 'contest-effect-description') {
      return value.contest_effect.data.flavor_text_entries.find(e => e['language']['name'] === 'en').flavor_text;
    }

    else if (type === 'super-contest-effect-appeal') {
      const appeal = +value.super_contest_effect.data.appeal;
      return appeal === 0 ? 'N/A' : `${appeal} pts.`;
    }

    else if (type === 'super-contest-effect-description') {
      return value.super_contest_effect.data.flavor_text_entries.find(e => e['language']['name'] === 'en').flavor_text;
    }

    else if (type === 'contest-combo-normal-after') {
      const object = value.contest_combos.normal.use_after;
      if (!object) return [];
      const moves = object.map((move: any) => {
        move.id = +move.url.split('/').reverse()[1];
        return move;
      });
      return intersectionBy(this.shared.moves, moves, 'id').map((move: any) => {
        move.name = move.names.find(e => e.language.name === 'en').name;
        return move;
      });
    }

    else if (type === 'contest-combo-normal-before') {
      const object = value.contest_combos.normal.use_before;
      if (!object) return [];
      const moves = object.map((move: any) => {
        move.id = +move.url.split('/').reverse()[1];
        return move;
      });
      return intersectionBy(this.shared.moves, moves, 'id').map((move: any) => {
        move.name = move.names.find(e => e.language.name === 'en').name;
        return move;
      });
    }

    else if (type === 'contest-combo-super-after') {
      const object = value.contest_combos.super.use_after;
      if (!object) return [];
      const moves = object.map((move: any) => {
        move.id = +move.url.split('/').reverse()[1];
        return move;
      });
      return intersectionBy(this.shared.moves, moves, 'id').map((move: any) => {
        move.name = move.names.find(e => e.language.name === 'en').name;
        return move;
      });
    }

    else if (type === 'contest-combo-super-before') {
      const object = value.contest_combos.super.use_before;
      if (!object) return [];
      const moves = object.map((move: any) => {
        move.id = +move.url.split('/').reverse()[1];
        return move;
      });
      return intersectionBy(this.shared.moves, moves, 'id').map((move: any) => {
        move.name = move.names.find(e => e.language.name === 'en').name;
        return move;
      });
    }

    // Moves information

    else if (type === 'power') {
      return value.power === 0 || value.power == null
        ? `N/A` : `${value.power} Atk.`;
    }

    else if (type === 'pp') {
      return value.pp === 0 || value.pp == null
        ? `0` : `${value.pp}/${value.pp}`;
    }

    else if (type === 'priority') {
      if (value.priority === 0 || value.priority == null) { return 0; }
      return value.priority > 0 ? `+${value.priority}`.replace('++', '+') : `-${value.priority}`.replace('--', '-');
    }

    else if (type === 'ailment') {
      return value.meta.ailment.data.names.find(e => e.language.name === 'en').name;
    }

    else if (type === 'ailment-chance') {
      return value.meta.ailment_chance;
    }

    else if (type === 'healing') {
      if (+value.meta.healing === 0) { return 'N/A'; }
      return value.meta.healing + ' hp';
    }

    else if (type === 'drain') {
      return +value.meta.drain === 0
        ? 'N/A'
        : +value.meta.drain < 0
          ? `${+value.meta.drain} hp`
          : `${+value.meta.drain} hp`;
    }

    else if (type === 'damage-class') {
      return capitalize(value.damage_class.data.names.find(e => e.language.name === 'en').name);
    }

    else if (type === 'contest-type') {
      if (!value.contest_type.data) { return 'N/A'; }
      return value.contest_type.data.names.find(e => e.language.name === 'en').name;
    }

    else if (type === 'effect-chance') {
      return value.effect_chance === 0 || value.effect_chance == null
        ? 'N/A' : `${value.effect_chance}%`;
    }

    else if (type === 'flinch-chance') {
      return value.meta.flinch_chance === 0 || value.meta.flinch_chance == null
        ? 'N/A' : `${value.meta.flinch_chance}%`;
    }

    else if (type === 'stat-chance') {
      return value.meta.stat_chance === 0 || value.meta.stat_chance == null
        ? 'N/A' : `${value.meta.stat_chance}%`;
    }

    else if (type === 'category') {
      return value.meta.category.name.split('+').map(e => capitalize(e)).join(' + ');
    }

    else if (type === 'target') {
      return value.target.data.names.find(e => e.language.name === 'en').name;
    }

    else if (type.includes('ht-')) {
      type = type.replace('ht-', '');
      return !value.meta[type] ? 'N/A' : value.meta[type];
    }

  }

}
