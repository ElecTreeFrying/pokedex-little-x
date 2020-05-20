import { Injectable } from '@angular/core';

import { SelectedPokemonComponent } from '../../_components/dialogs/selected-pokemon/selected-pokemon.component';
import { TypeComponent } from '../../_components/dialogs/type/type.component';
import { AbilityComponent } from '../../_components/dialogs/ability/ability.component';
import { ColorComponent } from '../../_components/dialogs/color/color.component';
import { EggGroupsComponent } from '../../_components/dialogs/egg-groups/egg-groups.component';
import { GrowthRateComponent } from '../../_components/dialogs/growth-rate/growth-rate.component';
import { HabitatComponent } from '../../_components/dialogs/habitat/habitat.component';
import { SelectedMoveComponent } from '../../_components/dialogs/selected-move/selected-move.component';
import { ShapeComponent } from '../../_components/dialogs/shape/shape.component';
import { StatComponent } from '../../_components/dialogs/stat/stat.component';
import { FirmnessComponent } from '../../_components/dialogs/firmness/firmness.component';
import { FlavorComponent } from '../../_components/dialogs/flavor/flavor.component';
import { AttributeComponent } from '../../_components/dialogs/attribute/attribute.component';

export const pokemonDialogComponents = [
  SelectedPokemonComponent, TypeComponent, AbilityComponent, ColorComponent, EggGroupsComponent, GrowthRateComponent, HabitatComponent, SelectedMoveComponent, ShapeComponent, StatComponent,
  AttributeComponent, FirmnessComponent, FlavorComponent
];


@Injectable({
  providedIn: 'root'
})
export class ComponentSelectorService {

  fucking_bug = [
    { type: 'type', component: TypeComponent },
    { type: 'color', component: ColorComponent },
    { type: 'habitat', component: HabitatComponent },
    { type: 'shape', component: ShapeComponent },
    { type: 'growth-rate', component: GrowthRateComponent },
    { type: 'egg-groups', component: EggGroupsComponent },
    { type: 'stat', component: StatComponent },
    { type: 'ability', component: AbilityComponent },
    { type: 'pokemon', component: SelectedPokemonComponent },
    { type: 'move', component: SelectedMoveComponent },
    { type: 'firmness', component: FirmnessComponent },
    { type: 'flavor', component: FlavorComponent },
    { type: 'attribute', component: AttributeComponent }
  ]

  constructor() { }

  // before the fucking weird bug of index undefined
  // bug happens deployed on firebase
  // runs smoothly on development mode
  _dialogComponent(res: any): any {
    const index = pokemonDialogComponents
      .map((component: any, id: number) => {
        component = `${component}`.split(' ')[1].toLowerCase();
        return { component: `${component}`, id };
      })
      .find(e => e.component.includes(res.type.split('-').join(''))).id;
    return pokemonDialogComponents[index];
  }

  dialogComponent(res: any): any {
    return this.fucking_bug.find(e => e.type === res.type).component;
  }

}
