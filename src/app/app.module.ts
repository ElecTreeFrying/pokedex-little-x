import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppRoutingModule } from './app-routing.module';
import { AppProviderModule } from './app-provider.module';
import { AppMatModule } from './common/core/module/app-mat.module';

import { AppComponent } from './app.component';
import { PokemonNavComponent } from './pokemon-nav/pokemon-nav.component';
import { ImageUrlPipe } from './common/shared/pipe/image-url.pipe';
import { GenSortPipe } from './common/shared/pipe/gen-sort.pipe';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    PokemonNavComponent,
    ImageUrlPipe,
    GenSortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppProviderModule,
    AppMatModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
