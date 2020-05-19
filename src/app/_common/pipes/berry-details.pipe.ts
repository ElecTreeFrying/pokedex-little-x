import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'berryDetails'
})
export class BerryDetailsPipe implements PipeTransform {

  transform(value: any, option: string): any {

    if (!value) return;

    if (option === 'berry-firmness') {
      return value.firmness.data.names.find(e => e.language.name === 'en').name;
    }

    else if (option === 'berry-size') {
      if (value.size === 0 || value.size === undefined || value.size === null) return '-';
      return `${value.size} mm`;
    }

    else if (option === 'berry-growth-time') {
      if (value.growth_time === 0 || value.growth_time === undefined || value.growth_time === null) return '-';
      return `${value.growth_time} ${value.growth_time > 1 ? 'hrs' : 'hr'}`;
    }

    else if (option === 'berry-max-harvest') {
      if (value.max_harvest === 0 || value.max_harvest === undefined || value.max_harvest === null) return '-';
      return `${value.max_harvest} ${value.max_harvest > 1 ? 'pcs' : 'pc'}`;
    }

    else if (option === 'berry-soil-dryness') {
      if (value.soil_dryness === 0 || value.soil_dryness === undefined || value.soil_dryness === null) return '-';
      return `${value.soil_dryness}%`;
    }

    else if (option === 'berry-smoothness') {
      if (value.smoothness === 0 || value.smoothness === undefined || value.smoothness === null) return '-';
      return `${value.smoothness}%`;
    }

    else if (option === 'berry-flavors') {
      return value.flavors.map((flavor) => {

        const data: any = {};

        data.name = flavor.data.names.find(e => e.language.name === 'en').name;
        data.base_potency = `Base  stat: ${flavor.potency} pts.`;
        data.potency = (+flavor.potency/40)*100;
        
        return { ...data, data: flavor.data };
      });
    }

  }

}
