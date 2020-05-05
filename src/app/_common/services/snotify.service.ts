import { Injectable } from '@angular/core';
import { SnotifyService as Snotify, SnotifyPosition, SnotifyType, SnotifyToastConfig } from 'ng-snotify';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class SnotifyService {

  constructor(
    public snotify: Snotify,
    private shared: SharedService
  ) { }

  config(option: SnotifyToastConfig): SnotifyToastConfig {
    return option;
  }

  loadingDetailsNotify() {
    
    const action = Observable.create((observer: any) => {

      const $ = this.shared.loadingDetails.subscribe((res) => {
      
        if (res === false) {
          
          observer.next({
            body: `Please wait...`,
            config: this.config({
              closeOnClick: true
            })
          });
        } else if (res === true) {

          this.snotify.clear();
          observer.complete();
          $.unsubscribe();
        }
      });
      
    });


    this.clear();
    this.snotify.async('', action, {
      position: SnotifyPosition.leftBottom
    });
  }

  _notify(body: {
    text: string, 
    _type: SnotifyType, 
    title?: string
  }, config: SnotifyToastConfig = {
    closeOnClick: true,
    pauseOnHover: true,
    showProgressBar: true,
    timeout: 5000,
    position: SnotifyPosition.leftBottom,
    type: body._type,
  }) {

    this.snotify.create({
      title: body.title,
      body: body.text,
      config
    })
  }

  clear() {
    this.snotify.clear();
  }

}
