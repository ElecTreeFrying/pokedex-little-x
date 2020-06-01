import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, option: string): any {

    if (!value) return

    if (option === 'selection-display') {
      const vies = [ 'pokémon', 'moves', 'items', 'berries' ];
      return vies[+value];
    }

  }

}
