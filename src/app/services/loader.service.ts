import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { LoaderState } from 'src/app/loader/loader';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  private loaderSubject = new Subject<LoaderState>();
  loaderState: Observable<LoaderState> = this.loaderSubject.asObservable();

  showLoader() {
    document.body.style.cursor = 'wait';
    this.loaderSubject.next({ show: true } as LoaderState);
  }

  hideLoader() {
    document.body.style.cursor = 'inherit';
    this.loaderSubject.next({ show: false } as LoaderState);
  }
}
