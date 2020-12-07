import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderState } from './loader';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

  constructor(private loader: LoaderService) { }

  show = false;
  private subscription: Subscription;

  ngOnInit() {
    this.subscription = this.loader.loaderState.subscribe((state: LoaderState) => setTimeout(() => {
      this.show = state.show;
    }, 0));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
