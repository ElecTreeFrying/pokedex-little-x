import { Component, OnInit, OnDestroy } from '@angular/core';

import { SharedService } from '../_common/services/shared.service';


@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit, OnDestroy {

  constructor(
    private shared: SharedService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.shared.updateIsLoadingSelection = false;
      this.shared.updateIsSearchSelection = true;
    });
  }

  ngOnDestroy() {
    setTimeout(() => {
      this.shared.updateIsSearchSelection = false;
    });
  }

}
