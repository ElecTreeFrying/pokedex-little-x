import { Pipe, PipeTransform } from '@angular/core';
import { capitalize } from 'lodash';


@Pipe({
  name: 'cardText'
})
export class CardTextPipe implements PipeTransform {

  names = [
    { name: 'Nidoran♀', key: 'nidoran-f' },
    { name: 'Nidoran♂', key: 'nidoran-m' },
    { name: 'Mr. Mime', key: 'mr-mime' },
    { name: 'Mime Jr.', key: 'mime-jr' },
    { name: 'Ho-Oh', key: 'ho-oh' },
    { name: 'Jangmo-o', key: 'jangmo-o' },
    { name: 'Hakamo-o', key: 'hakamo-o' },
    { name: 'Kommo-o', key: 'kommo-o' },
    { name: 'Oricorio Pom-Pom', key: 'oricorio-pom-pom' },
    { name: 'Kommo-o Totem', key: 'kommo-o-totem' },
  ];

  transform(value: string, ...args: unknown[]): string {

    if (!value) return;

    if (!this.names.find(e => e.key === value)) {
      return value.split('-').map(e => capitalize(e)).join(' ');
    } else {
      return this.names.find(e => e.key === value).name;
    }
  }

}
