import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-members-group',
  templateUrl: './members-group.component.html',
  styleUrls: ['./members-group.component.scss']
})
export class MembersGroupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  isAdm(): boolean {
    return true;
  }

}
