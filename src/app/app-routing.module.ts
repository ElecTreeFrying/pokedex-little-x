import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'search', loadChildren: () => import('./search-items/search-items.module').then(m => m.SearchItemsModule) },
  { path: 'selection', loadChildren: () => import('./selection/selection.module').then(m => m.SelectionModule) },
  { path: 'games', loadChildren: () => import('./games/games.module').then(m => m.GamesModule) },
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
