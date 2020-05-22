import { Pipe, PipeTransform } from '@angular/core';
import { capitalize } from 'lodash';

import { special_names } from '../services/shared.service';


@Pipe({
  name: 'cardText'
})
export class CardTextPipe implements PipeTransform {

  transform(value: string): string {

    if (!value) return;

    if (!special_names.find(e => e.key === value)) {
      return value.split('-').map(e => capitalize(e)).join(' ');
    } else {
      return special_names.find(e => e.key === value).name;
    }
  }

}
