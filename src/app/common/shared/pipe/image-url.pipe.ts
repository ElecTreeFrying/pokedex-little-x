import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {

  transform(value: any, args?: string): any {
    return args !== 'blank'
      ? value ? `assets/sprites/${args}/${value}.png` : 'assets/defaultimage.png'
      : value ? `assets/pokemon/${value}.png` : 'assets/defaultimage.png';

    // value ? `assets/sprite/front_default_female/${value}.png` : 'assets/defaultimage.png';
    // value ? `assets/sprite/back_default_female/${value}.png` : 'assets/defaultimage.png';
    // value ? `assets/sprite/front_shiny_female/${value}.png` : 'assets/defaultimage.png';
    // value ? `assets/sprite/back_shiny_female/${value}.png` : 'assets/defaultimage.png';
  }

}
