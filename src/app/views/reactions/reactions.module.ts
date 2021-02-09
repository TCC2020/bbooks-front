import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactionsComponent} from './reactions.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../material/material.module';



@NgModule({
  declarations: [
      ReactionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
      ReactionsComponent
  ]
})
export class ReactionsModule { }
