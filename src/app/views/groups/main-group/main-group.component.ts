import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-group',
  templateUrl: './main-group.component.html',
  styleUrls: ['./main-group.component.scss']
})
export class MainGroupComponent implements OnInit {
  links = ['your-groups', 'create'];
  activeLink = this.links[0];

  constructor() { }

  ngOnInit(): void {
  }

}
