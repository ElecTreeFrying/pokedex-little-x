import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchItemsComponent } from './search-items.component';


const routes: Routes = [
  { path: '', component: SearchItemsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchItemsRoutingModule { }
