import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'blank'
})
export class BlankPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    console.log(args);
    console.log(value);

    return value;
  }

}
