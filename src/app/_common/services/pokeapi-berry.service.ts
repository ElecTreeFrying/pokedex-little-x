import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, exhaustMap, mergeMap, toArray } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';

import { SharedService } from './shared.service';
import { PokeapiItemService } from './pokeapi-item.service';


@Injectable({
  providedIn: 'root'
})
export class PokeapiBerryService {

  constructor(
    private http: HttpClient,
    private shared: SharedService,
    private pokeapiItemService: PokeapiItemService
  ) { }

  private _selection: any;
  set selection(data: any) { this._selection = data; }
  get selection() { return this._selection; }

  get data() {
    return {
      base64: `data:image/png;base64,${this.selection.byte64}`,
      name: `${this.selection.name} Berry`
    }
  }

  get berry() {

    const id = this.shared.selectionData.id;
    const url = `https://pokeapi.co/api/v2/berry/${id}/`;
    const git = this.shared.toGithubRaw(url);
    
    return this.http.get(git).pipe(
      switchMap((res: any) => {
        
        const berry = of(res).pipe(
          map(e => ({ ...e, _berry: null }))
        );

        const firmness = this.http.get(this.shared.toGithubRaw(res.firmness.url)).pipe(
          map(e => ({ ...e, _firmness: null }))
        );

        const item = this.pokeapiItemService.item(
          +res.item.url.split('/').reverse()[1]
        ).pipe(
          map(e => ({ ...e, _item: null }))
        );

        const flavors = of(
          res.flavors.map(e => this.http.get(this.shared.toGithubRaw(e.flavor.url)).pipe(
            map(e => ({ ...e, _flavors: null }))
          ))
        ).pipe(
          exhaustMap((e: any) => e), mergeMap((e: any) => e), toArray()
        );

        return forkJoin({ berry, firmness, item, flavors });
      }),
      map((res: any) => {

        const berry = res.berry;

        berry.firmness.data = res.firmness;
        berry.item.data = res.item;

        berry.flavors = berry.flavors.map((flavor, i) => {
          flavor.data = res.flavors[i];
          return flavor;
        })

        return berry;
      })
    );
  }

}
