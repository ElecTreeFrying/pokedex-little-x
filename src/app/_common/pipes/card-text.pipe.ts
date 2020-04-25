import { Pipe, PipeTransform } from '@angular/core';
import { capitalize } from 'lodash';


@Pipe({
  name: 'cardText'
})
export class CardTextPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {

    if (!value) return;

    return capitalize(value);
  }

}
