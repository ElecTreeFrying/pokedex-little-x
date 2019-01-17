import { Pipe, PipeTransform } from '@angular/core';

import { SharedService } from '../../core/service/shared.service';

@Pipe({
  name: 'pokeType'
})
export class PokeTypePipe implements PipeTransform {

  constructor(private shared: SharedService) {}

  transform(value: string): any {
    return this.shared.types.find((e) => {
      return e.name === value;
    }).color;
  }

}
