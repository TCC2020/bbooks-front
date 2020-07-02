import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {MediaChange, MediaObserver} from "@angular/flex-layout";


@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss']
})
export class BookPageComponent implements OnInit, OnDestroy {
  constructor(
      public mediaObserver: MediaObserver
  ) { }
  mediaSub: Subscription;
  deviceXs: boolean;

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      this.deviceXs = result.mqAlias === 'xs' ? true : false;
    });
  }

  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }


}
