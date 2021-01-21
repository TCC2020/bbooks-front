import {Component, OnDestroy, OnInit} from '@angular/core';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {Subscription} from 'rxjs';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-main-exchange',
  templateUrl: './main-exchange.component.html',
  styleUrls: ['./main-exchange.component.scss']
})
export class MainExchangeComponent implements OnInit, OnDestroy {
  deviceXs: boolean;
  mediaSub: Subscription;

  topVal = 0;

  constructor(
      public mediaObserver: MediaObserver
  ) { }

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.asObservable().subscribe((result: MediaChange[]) => {
      this.deviceXs = result[0].mqAlias === 'xs' ? true : false;
    });
  }

  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }

  sideBarScroll() {
    const e = this.deviceXs ? 117 : 65;
    return e - this.topVal;
  }
  onScroll(e) {
    const scrollXs = this.deviceXs ? 55 : 73;
    if (this.deviceXs) {
      if (e.srcElement.scrollTop < scrollXs) {
        this.topVal = e.srcElement.scrollTop;
      } else {
        this.topVal = scrollXs;
      }
    }
  }
}
