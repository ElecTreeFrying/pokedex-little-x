import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'idToImage'
})
export class IdToImagePipe implements PipeTransform {

  constructor() {}

  transform(value: any, type: string): string {
    
    if (!value) return;

    if (type === 'byte64') {
      return `data:image/png;base64,${value.replace('data:image/png;base64,', '')}`;
    } else if (type === 'etf_assets') {
      return `https://raw.githubusercontent.com/ElecTreeFrying/assets/master/pokemon/${value}.png`;
    }
  }

}

