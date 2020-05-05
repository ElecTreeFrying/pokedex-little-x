import { Pipe, PipeTransform } from '@angular/core';
import { capitalize } from 'lodash';

import { type } from '../services/shared.service';


@Pipe({
  name: 'typeColor'
})
export class TypeColorPipe implements PipeTransform {

  transform(value: string, option: string = 'default'): string {
    value = capitalize(value.split('-').join(' '));
    return type.find(e => e.name === value).color[option];
  }

}
