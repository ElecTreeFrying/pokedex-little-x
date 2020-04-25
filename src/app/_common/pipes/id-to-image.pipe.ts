import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Pipe({
  name: 'idToImage'
})
export class IdToImagePipe implements PipeTransform {

  constructor(
    private http: HttpClient
  ) {}

  transform(value: string): any {
    
    if (!value) return;

    return `data:image/png;base64,${value}`;
  }

}

