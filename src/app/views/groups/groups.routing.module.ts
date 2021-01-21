import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReadingGroupComponent } from './reading-group/reading-group.component';

const groupsRouter = [
    {
        path: '', component: ReadingGroupComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(groupsRouter)],
    exports: [RouterModule]
})
export class GroupsRoutingModule { }
