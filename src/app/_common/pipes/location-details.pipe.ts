import { Pipe, PipeTransform } from '@angular/core';
import { capitalize } from 'lodash';


@Pipe({
  name: 'locationDetails'
})
export class LocationDetailsPipe implements PipeTransform {

  transform(value: any, option: string, item?: any): any {

    if (option === 'location-name') {
      return value.names.find(e => e.language.name === 'en').name;
    }

    if (option === 'location-region') {
      return value.region.data.names.find(e => e.language.name === 'en').name;
    }

    if (option === 'location-areas') {
      return value.areas.map((area) => {
        
        let name = area.data.names.find(e => e.language.name === 'en').name;
        area.display = `${item} - ${name}`;
        
        if (name === '') {
          name = area.name.replace('-area', '').split('-').join(' ');
          area.display = capitalize(name);
        }

        return area;
      });
    }

  }

}
