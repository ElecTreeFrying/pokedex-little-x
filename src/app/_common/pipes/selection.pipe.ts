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

    else if (type === 'move-name') {
      return value.names.find(e => e.language.name === 'en').name;
    }

    else if (type.includes('move-')) {

      return value.map((move) => {
        const id = +move.type.url.split('/').reverse()[1];
        move.color = TypeShared.find(e => e.key === id).color;
        return move;
      });

    } 
    
    return value;

  }

}
