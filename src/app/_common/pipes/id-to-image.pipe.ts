import { Pipe, PipeTransform } from '@angular/core';

import { SharedService } from '../services/shared.service';


@Pipe({
  name: 'idToImage'
})
export class IdToImagePipe implements PipeTransform {

  constructor(
    private shared: SharedService
  ) {}

  transform(value: any, type: string): string {
    
    if (!value) return;

    if (type === 'byte64') {
      return `data:image/png;base64,${value.replace('data:image/png;base64,', '')}`;
    } 

    if (type === 'conquest-gallery') {
      return `https://res.cloudinary.com/electreefrying/image/upload/v1590416403/pokedex-little/conquest_library/${value.filename}`;
    } 
    
    else if (type === 'etf_assets_filename') {
      if (this.shared.isConquestGallery) {
        return `https://res.cloudinary.com/electreefrying/image/upload/v1590416403/pokedex-little/conquest_library/${this.shared.filename}`;
      } else {
        return `https://res.cloudinary.com/electreefrying/image/upload/v1590217728/pokedex-little/pokemon_extended/${this.shared.filename}`;
      }
    }
  }

}

