import { Injectable } from '@angular/core';

import { SelectedPokemonComponent } from '../../_components/dialogs/selected-pokemon/selected-pokemon.component';
import { TypeComponent } from '../../_components/dialogs/type/type.component';
import { AbilityComponent } from '../../_components/dialogs/ability/ability.component';
import { ColorComponent } from '../../_components/dialogs/color/color.component';
import { EggGroupsComponent } from '../../_components/dialogs/egg-groups/egg-groups.component';
import { GrowthRateComponent } from '../../_components/dialogs/growth-rate/growth-rate.component';
import { HabitatComponent } from '../../_components/dialogs/habitat/habitat.component';
import { MoveComponent } from '../../_components/dialogs/move/move.component';
import { ShapeComponent } from '../../_components/dialogs/shape/shape.component';

export const pokemonDialogComponents = [
  SelectedPokemonComponent, TypeComponent, AbilityComponent, ColorComponent, EggGroupsComponent, GrowthRateComponent, HabitatComponent, MoveComponent, ShapeComponent
];

export const _pokemonDialogComponents = [
  SelectedPokemonComponent, AbilityComponent, ColorComponent, EggGroupsComponent, GrowthRateComponent, HabitatComponent, MoveComponent, ShapeComponent
];


@Injectable({
  providedIn: 'root'
})
export class ComponentSelectorService {

  constructor() { }

  dialogComponent(res: any): any {
    const id = pokemonDialogComponents
      .map((component: any, id: number) => {
        component = `${component}`.split(' ')[1].toLowerCase();
        return { component: `${component}`, id }
      })
      .find(e => e.component.includes(res.type.split('-').join(''))).id;
    return pokemonDialogComponents[id];
  }
  
}
