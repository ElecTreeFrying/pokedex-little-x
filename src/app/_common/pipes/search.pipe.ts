import { Pipe, PipeTransform } from '@angular/core';
import { capitalize } from 'lodash';


@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, option: string): any {

    if (option === 'selection-display') {
      const views = [ 'pokémon', 'moves', 'items', 'berries' ];

      if (!value) return 'pokémon';

      return views[+value];
    }

    if (!value) return;

  }

}
