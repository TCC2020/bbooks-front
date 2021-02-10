import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reactions',
  templateUrl: './reactions.component.html',
  styleUrls: ['./reactions.component.scss']
})
export class ReactionsComponent implements OnInit {

  reaction = 'Gostei';
  icon = 'thumb_up';

  listReactions = [
    {reaction: 'Aaarg', icon: 'sentiment_neutral'},
    {reaction: 'Triste', icon: 'sentiment_very_dissatisfied'},
    {reaction: 'Surpreso', icon: 'mood_bad'},
    {reaction: 'Hilário', icon: 'sentiment_very_satisfied'},
    {reaction: 'Amei', icon: 'favorite'},
    {reaction: 'Gostei', icon: 'thumb_up'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

  changeReaction(reaction: string, icon: string) {
    this.reaction = reaction;
    this.icon = icon;
  }

}
