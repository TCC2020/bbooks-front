import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactionsComponent} from './reactions.component';



@NgModule({
  declarations: [
      ReactionsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
      ReactionsComponent
  ]
})
export class ReactionsModule { }
