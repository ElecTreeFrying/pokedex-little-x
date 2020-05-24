import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { SharedService } from './shared.service';


@Injectable({
  providedIn: 'root'
})
export class PokeapiMachineService {

  constructor(
    private http: HttpClient,
    private shared: SharedService
  ) { }

  get machine() {

    const data = this.shared.selectionData;

    return forkJoin({
      item: this.http.get(data.item.url),
      move: this.http.get(data.move.url),
      data: of(data)
    }).pipe(
      map((machine: any) => {
        
        const isTM = machine.data.item.name.includes('tm');
        const type = machine.move.type.name;

        const sub = `${isTM ? 'tm' : 'hm'}-${type}`;
        const data = this.shared.keys.machines_data.find(e => e.name === sub);
        
        data.key = machine.item.id;
          
        machine.itemSelection = data;
        
        return machine;
      })
    )
  }

}
