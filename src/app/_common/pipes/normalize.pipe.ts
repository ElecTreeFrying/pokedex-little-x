import { Pipe, PipeTransform } from '@angular/core';
import { capitalize } from 'lodash';

@Pipe({
  name: 'normalize'
})
export class NormalizePipe implements PipeTransform {

  transform(value: string, type: string = ''): string {

    if (!value) return;

    if (type === 'pokedex') {
      return this.pokedex(value);
    } else if (type === 'generation') {
      return this.generation(value);
    } else if (type === 'version-group') {
      return this.versionGroup(value);
    } else if (type === '') {
      return value;
    }
  }
  
  pokedex(value: string) {
    const split = value.split('-').map(e => capitalize(e)).join(' ');
    value = `${split} Pokédex`;
    return value;
  }
  
  generation(value: string) {
    const left = value.split('-')[0];
    const right = value.split('-')[1];
    return `${capitalize(left)} ${right.toUpperCase()}`
  }
  
  versionGroup(value: string) {

    if (value.length === 2) { return value.toUpperCase(); }

    if (value.includes('2') || value.includes('omega') || value.includes('ultra')) {
      const left = value.split('-').splice(0, 2).map(e => capitalize(e)).join(' ');
      const right = value.split('-').splice(2).map(e => capitalize(e)).join(' ');
      return `${left}, ${right}`;
    }

    const split = value.split('-').map(e => capitalize(e)).join(', ');
    value = `${split}`;
    return value;
  }

}
