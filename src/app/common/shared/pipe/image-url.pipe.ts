import { Pipe, PipeTransform } from '@angular/core';

import { DefaultImage } from '../../core/service/default-image';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {

  constructor(private di: DefaultImage) {}

  transform(value: any, args?: string): any {
    // return args !== 'blank'
    //   ? value ? `assets/sprites/${args}/${value}.png` : 'assets/defaultimage.png'
    //   : value ? `assets/pokemon/${value}.png` : 'assets/defaultimage.png'
    return args === 'blank'
      // ? value ? `assets/pokemon/${value}.png` : 'assets/defaultimage.png'
      ? value ? `assets/pokemon/${value}.png` : this.di.byte64
      : args === 'url'
        ? (() => {
            if (value === null) return undefined;
            const id = value.split('/')[4];
            return value ? `assets/pokemon/${id}.png` : this.di.byte64
          })()
        : value ? `assets/sprites/${args}/${value}.png` : this.di.byte64;

    // value ? `assets/sprite/front_default_female/${value}.png` : 'assets/defaultimage.png';
    // value ? `assets/sprite/back_default_female/${value}.png` : 'assets/defaultimage.png';
    // value ? `assets/sprite/front_shiny_female/${value}.png` : 'assets/defaultimage.png';
    // value ? `assets/sprite/back_shiny_female/${value}.png` : 'assets/defaultimage.png';
  }

}
