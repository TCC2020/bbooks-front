import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsRoutingModule } from './groups.routing.module';
import { ReadingGroupComponent } from './reading-group/reading-group.component';
import { MaterialModule } from 'src/app/material/material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../book-page/book.module';
import { HttpClient } from '@angular/common/http';
import { FeedGroupComponent } from './feed-group/feed-group.component';
import { AboutGroupComponent } from './about-group/about-group.component';
import { MembersGroupComponent } from './members-group/members-group.component';



@NgModule({
  declarations: [ 
    ReadingGroupComponent,
    FeedGroupComponent,
    AboutGroupComponent,
    MembersGroupComponent
   ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    MaterialModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    }),
  ]
})
export class GroupsModule { }
