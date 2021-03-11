import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ReactionsTO} from '../../../models/ReactionsTO';
import {ReactionType} from '../../../models/enums/ReactionType.enum';
import {Router} from '@angular/router';
import {ReadingTrackingTO} from '../../../models/ReadingTrackingTO.model';


@Component({
    selector: 'app-view-all-reactions',
    templateUrl: './view-all-reactions.component.html',
    styleUrls: ['./view-all-reactions.component.scss']
})
export class ViewAllReactionsComponent implements OnInit {
    reaction = ReactionType;
    allUsers = [];

    constructor(
        @Inject(MAT_DIALOG_DATA) public  reactions: ReactionsTO,
        private router: Router,
        public dialogRef: MatDialogRef<ViewAllReactionsComponent>
    ) {
    }

    ngOnInit(): void {
        this.allUsers = this.allUsers
            .concat(this.reactions.likes.profiles)
            .concat(this.reactions.dislike.profiles)
            .concat(this.reactions.hilarius.profiles)
            .concat(this.reactions.surprised.profiles)
            .concat(this.reactions.loved.profiles)
            .concat(this.reactions.sad.profiles)
            .concat(this.reactions.hated.profiles);
    }

    closeDialog() {
        this.dialogRef.close();
    }
}
