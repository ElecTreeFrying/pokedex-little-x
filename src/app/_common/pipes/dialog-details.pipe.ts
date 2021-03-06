import { Pipe, PipeTransform } from '@angular/core';
import { intersectionBy, capitalize, sortBy, uniqBy } from 'lodash';

import { SharedService, type as TypeShared, version_group, version } from '../services/shared.service';


@Pipe({
  name: 'dialogDetails'
})
export class DialogDetailsPipe implements PipeTransform {

  constructor(
    private shared: SharedService
  ) {}

  transform(value: any, type: string, object?: any): any {

    if (type === 'stat-name') {
      return capitalize(value.data.name.split('-').join(' '));
    }

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
        if (value.type.hasOwnProperty('color')) {
          return value.type.color.light;
        } else {
          const id = value.type.url.split('/').reverse()[1];
          return TypeShared.find(e => e.key === +id).color.default;
        }
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

    else if (type === 'slice') {
      if (object === 0) return value;
      return value.slice(0, object);
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

    else if (type.includes('stat-affecting')) {
      const $ = type.replace('stat-', '').split('-');

      if (type.includes('moves')) {
        return value.data[$[0]][$[1]].map((move: any) => {
          const id = +move.move.type.url.split('/').reverse()[1];
          move.color = TypeShared.find(e => e.key === id).color.default
          return move;
        });
      }

      return value.data[$[0]][$[1]];
    }

    else if (type === 'stat-move-name') {
      return value.split('-').join(' ');
    }

    else if (type === 'stat-move-change') {
      return +value > 0 ? `+${value}` : value;
    }

    else if (type === 'stat-characteristics') {

      const characteristics = value.data.characteristics

      if (!characteristics || characteristics.length || !value.data.hasOwnProperty('characteristics')) return [];

      return characteristics.map((characteristic: any) => {
        return characteristic.data.descriptions.find(e => e.language.name === 'en').description;
      })
    }

    else if (type === 'damage-class-name') {
      const data = value?.damage_class?.data?.names?.find(e => e?.language?.name === 'en')?.name;
      return capitalize(data ? data : '-');
    }

    else if (type === 'damage-class-description') {
      const description = value?.damage_class?.data?.descriptions?.find(e => e?.language?.name === 'en').description;
      const data = description.endsWith('.') ? description : `${description}.`;
      return data ? data : '-';
    }
    
    else if (type === 'target-name') {
      const data = value?.target?.data?.names?.find(e => e?.language?.name === 'en')?.name;
      return data ? data : '-';
    }
    
    else if (type === 'target-description') {
      const data = value?.target?.data?.descriptions?.find(e => e?.language?.name === 'en')?.description;
      return data ? data : '-';
    }

    else if (type === 'machines') {

      if (!value.machines) { return []; }

      return value.machines.map((machine: any) => {
        const id = +machine.version_group.url.split('/').reverse()[1];
        const version = version_group.find(e => e.id === id).name.replace(',', ' &');
        machine._item = machine.machine.data.item.name.toUpperCase();
        machine._move = machine.machine.data.move.name.split('-').join(' ');
        if (id !== 12 && id !== 13) {
          machine._version = `Pokémon ${version} version`;
        } else  {
          machine._version = version;
        }
        return machine;
      });
    }

    else if (type === 'contest-typpe-name') {
      const data = value?.contest_type?.data?.names?.find(e => e?.language?.name === 'en')?.name;
      return data ? data : '-';
    }
    
    else if (type === 'contest-typpe-color') {
      const data = value?.contest_type?.data?.names?.find(e => e?.language?.name === 'en')?.color;
      return data ? data : '-';
    }

    else if (type === 'contest-typpe-berry-flavor') {
      const data = value?.contest_type?.data?.berry_flavor?.name?.split('-')?.join(' ');
      return capitalize(data ? data : '-');
    }

    else if (type === 'contest-effect-appeal') {
      const data = value?.contest_effect?.data?.appeal;
      if (!data) return '-';
      const appeal = +data;
      return appeal === 0 ? '-' : `${appeal} pts.`;
    }
    
    else if (type === 'contest-effect-jam') {
      const data = value?.contest_effect?.data?.jam;
      if (!data) return '-';
      const jam = +data;
      return jam === 0 ? '-' : `${jam} pts.`;
    }

    else if (type === 'contest-effect-effect') {
      const data = value?.contest_effect?.data?.effect_entries?.find(e => e?.language?.name === 'en')?.effect;
      return data ? data : '-';
    }
    
    else if (type === 'contest-effect-description') {
      const data = value?.contest_effect?.data?.flavor_text_entries?.find(e => e?.language?.name === 'en')?.flavor_text;
      return data ? data : '-';
    }

    else if (type === 'super-contest-effect-appeal') {
      const data = value?.super_contest_effect?.data?.appeal;
      if (!data) return '-';
      const appeal = +data;
      return appeal === 0 ? '-' : `${appeal} pts.`;
    }
    
    else if (type === 'super-contest-effect-description') {
      const data = value?.super_contest_effect?.data?.flavor_text_entries?.find(e => e?.language?.name === 'en')?.flavor_text;
      if (!data) return '-';
      return data ? data : '-';
    }

    else if (type === 'contest-combo-normal-after') {
      if (!value.contest_combos) return [];
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
      if (!value.contest_combos) return [];
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
      if (!value.contest_combos) return [];
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
      if (!value.contest_combos) return [];
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

    else if (type === 'attribute-name') {
      return value.data.data.names.find(e => e.language.name === 'en').name;
    }

    else if (type === 'attribute=description') {
      return value.data.data.descriptions.find(e => e.language.name === 'en').description;
    }

    else if (type === 'attribute-items') {

      const allItems = this.shared.item_attributes[0].entries;

      return intersectionBy(allItems, value.data.data.items, 'name').map((item: any) => {
        item.display = capitalize(item.name.split('-').join(' '));
        item.byte64 = `data:image/png;base64,${item.byte64.replace('data:image/png;base64,', '')}`;
        return item;
      });
    }

    else if (type === 'firmness-name') {
      return value.data.names.find(e => e.language.name === 'en').name;
    }

    else if (type === 'firmness-berries') {

      const berries = value.data.berries.map((berry) => {
        berry.name = `${berry.name}-berry`.replace('-berry-berry', '-berry');
        return berry;
      });

      return intersectionBy(this.shared.berries, berries, 'name').map((berry) => {
        berry.display = capitalize(berry.name.replace('-berry', ''));
        berry.byte64 = `data:image/png;base64,${berry.byte64.replace('data:image/png;base64,', '')}`;
        return berry;
      });
    }

    else if (type === 'flavor-name') {
      return value.data.names.find(e => e.language.name === 'en').name;
    }

    else if (type === 'flavor-contest-type') {
      return capitalize(value.data.contest_type.name);
    }

    else if (type === 'flavor-berries') {

      const berries = value.data.berries.map((berry) => {
        berry.name = `${berry.berry.name}-berry`.replace('-berry-berry', '-berry');
        return berry;
      });

      return intersectionBy(this.shared.berries, berries, 'name').map((berry) => {
        berry.display = capitalize(berry.name.replace('-berry', ''));
        berry.byte64 = `data:image/png;base64,${berry.byte64.replace('data:image/png;base64,', '')}`;
        return berry;
      });
    }

    else if (type === 'location-area-name') {

      if (value.data.names.find(e => e.language.name === 'en').name === '') {
        return value.entry.name;
      }

      return `${value.entry.name} - ${value.data.names.find(e => e.language.name === 'en').name}`;
    }

    else if (type === 'location-area-encounter-methods') {

      if (value.data.encounter_method_rates.length === 0) return [];

      if (value.data.encounter_method_rates[0].hasOwnProperty('method'))
        return value.data.encounter_method_rates;

      return value.data.encounter_method_rates.map((encounter) => {
        
        const id = +encounter.encounter_method.url.split('/').reverse()[1];
        encounter.encounter_method.data 
          = this.shared.keys.encounter_method.find(e => e.id === id);

        encounter.method = capitalize(encounter.encounter_method.name.split('-').join(' '));
        encounter.method_description = encounter.encounter_method.data.names.find(e => e.language.name === 'en').name;

        encounter.version_details = encounter.version_details.map((item) => {
          const id = +item.version.url.split('/').reverse()[1];
          item.version = version.find(e => e.id === id).name.replace('Pokémon ', '').replace(' Version', '');
          return item;
        });

        return encounter;
      });
    }
    
    else if (type === 'location-area-pokemon-encounters') {

      if (value.data.pokemon_encounters.length === 0) return [];
      
      if (value.data.pokemon_encounters[0].hasOwnProperty('state'))
        return value.data.pokemon_encounters;

      return value.data.pokemon_encounters.map((encounter) => {
        
        const id = +encounter.pokemon.url.split('/').reverse()[1];
        encounter.pokemon.data = this.shared.pokemon.find(e => e.id === id);
        encounter.display = capitalize(encounter.pokemon.name.split('-').join(' '));
        encounter.image = encounter.pokemon.data.byte64;
        encounter.state = false;

        encounter.version_details = encounter.version_details.map((detail) => {

          const id = +detail.version.url.split('/').reverse()[1];
          detail.version = version.find(e => e.id === id).name.replace('Pokémon ', '');
          detail.state = false;

          detail.encounter_details = detail.encounter_details.map((res) => {
            const id = +res.method.url.split('/').reverse()[1];
            res.method.data = this.shared.keys.encounter_method.find(e => e.id === id);
            res.state = false;
            return res;
          });

          detail.encounter_details = uniqBy(detail.encounter_details, 'max_level');
          detail.encounter_details = sortBy(detail.encounter_details, 'max_level');

          return detail;
        });

        return encounter;
      });
      }

    // Moves information

    else if (type === 'power') {
      return value.power === 0 || value.power == null
        ? `-` : `${value.power} Atk.`;
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
      if (!value.meta.ailment.data) return '-';
      return value.meta.ailment.data.names.find(e => e.language.name === 'en').name;
    }

    else if (type === 'ailment-chance') {
      return value.meta.ailment_chance;
    }

    else if (type === 'healing') {
      if (+value.meta.healing === 0) { return '-'; }
      return value.meta.healing + ' hp';
    }

    else if (type === 'drain') {
      return +value.meta.drain === 0
        ? '-'
        : +value.meta.drain < 0
          ? `${+value.meta.drain} hp`
          : `${+value.meta.drain} hp`;
    }

    else if (type === 'damage-class') {
      return capitalize(value.damage_class.data.names.find(e => e.language.name === 'en').name);
    }

    else if (type === 'contest-type') {
      if (!value.contest_type.data) { return '-'; }
      return value.contest_type.data.names.find(e => e.language.name === 'en').name;
    }

    else if (type === 'effect-chance') {
      return value.effect_chance === 0 || value.effect_chance == null
        ? '-' : `${value.effect_chance}%`;
    }

    else if (type === 'flinch-chance') {
      return value.meta.flinch_chance === 0 || value.meta.flinch_chance == null
        ? '-' : `${value.meta.flinch_chance}%`;
    }

    else if (type === 'stat-chance') {
      return value.meta.stat_chance === 0 || value.meta.stat_chance == null
        ? '-' : `${value.meta.stat_chance}%`;
    }

    else if (type === 'category') {
      if (!value.meta.category.data) return '-';
      return value.meta.category.name.split('+').map(e => capitalize(e)).join(' + ');
    }

    else if (type === 'target') {
      return value.target.data.names.find(e => e.language.name === 'en').name;
    }

    else if (type.includes('ht-')) {
      type = type.replace('ht-', '');
      return !value.meta[type] ? '-' : value.meta[type];
    }

  }

}
