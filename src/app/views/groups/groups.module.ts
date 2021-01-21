import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsRoutingModule } from './groups.routing.module';
import { ReadingGroupComponent } from './reading-group/reading-group.component';
import { MaterialModule } from 'src/app/material/material.module';



@NgModule({
  declarations: [ ReadingGroupComponent ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    MaterialModule
  ]
})
export class GroupsModule { }
