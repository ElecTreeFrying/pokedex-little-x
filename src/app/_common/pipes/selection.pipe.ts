import { Pipe, PipeTransform } from '@angular/core';
import { capitalize } from 'lodash';

import { type as TypeShared } from '../services/shared.service';


@Pipe({
  name: 'selection'
})
export class SelectionPipe implements PipeTransform {

  transform(value: any, type: any, option?: any): any {

    if (!value) return;

    if (type === 'berries') {
      return value.map((berry) => {
        berry.name = capitalize(berry.name.split('-')[0]);
        return berry;
      })
    }

    if (type === 'move-name') {
      return value.names.find(e => e.language.name === 'en').name;
    }

    if (type.includes('move-')) {
      if (option) {
        return value.slice(0).map((move) => {
          const id = +move.type.url.split('/').reverse()[1];
          move.color = TypeShared.find(e => e.key === id).color
          return move;
        });
      } else {
        return value.slice(0, 30).map((move) => {
          const id = +move.type.url.split('/').reverse()[1];
          move.color = TypeShared.find(e => e.key === id).color
          return move;
        });
      }
    } else if (type.endsWith(' Region')) {
      return option ? value.slice(0) : value.slice(0, 30);
    } else {
      return value;
    }

  }

}
