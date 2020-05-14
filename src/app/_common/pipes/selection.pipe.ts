import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selection'
})
export class SelectionPipe implements PipeTransform {

  transform(value: any, type: any, option?: any): any {

    if (!value) return;

    if (type === 'move-name') {
      return value.names.find(e => e.language.name === 'en').name;
    }

    if (type.includes('move-')) {
      type = type.replace('move-', '').toLowerCase();
      if (option) {
        return value.filter(e => e.damage_class.name === type).slice(0);
      } else {
        return value.filter(e => e.damage_class.name === type).slice(0, 30);
      }
    } else {
      return value;
    }

  }

}
