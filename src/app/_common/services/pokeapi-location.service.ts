import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, of } from 'rxjs';
import { map, exhaustMap, mergeMap, toArray } from 'rxjs/operators';

import { SharedService } from './shared.service';


@Injectable({
  providedIn: 'root'
})
export class PokeapiLocationService {

  constructor(
    private http: HttpClient,
    private shared: SharedService
  ) { }

  get location() {

    const data = this.shared.selectionData;

    const location = of(data);

    const region = this.http.get(this.shared.toGithubRaw(data.region.url));

    const areas = of(
      data.areas.map((area) =>
        this.http.get(this.shared.toGithubRaw(area.url))
      )
    ).pipe(
      exhaustMap((e: any) => e), mergeMap((e: any) => e), toArray()
    );

    return forkJoin({ location, region, areas }).pipe(
      map((res) => {

        const data = res.location;

        data.region.data = res.region;

        data.areas = data.areas.map((area, i) => {
          area.data = res.areas[i];
          return area;
        })

        return data;
      })
    )
  }

}
