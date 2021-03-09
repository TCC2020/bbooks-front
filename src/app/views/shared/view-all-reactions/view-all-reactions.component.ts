import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ReactionsTO} from '../../../models/ReactionsTO';
import {reactionsTypes, ReactionType} from '../../../models/enums/ReactionType.enum';


@Component({
  selector: 'app-view-all-reactions',
  templateUrl: './view-all-reactions.component.html',
  styleUrls: ['./view-all-reactions.component.scss']
})
export class ViewAllReactionsComponent implements OnInit {
  //reactions = reactionsTypes;
  reaction = ReactionType;
  allUsers = [];
  constructor(
      @Inject(MAT_DIALOG_DATA) public  reactions: ReactionsTO ,
  ) { }

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


}
