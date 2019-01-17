import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'util'
})
export class SharedPipe implements PipeTransform {

  transform(value: any[]): any {
    if (value === null) return [];
    return value;
  }

}
