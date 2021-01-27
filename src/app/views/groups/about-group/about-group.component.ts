import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-group',
  templateUrl: './about-group.component.html',
  styleUrls: ['./about-group.component.scss']
})
export class AboutGroupComponent implements OnInit {

  isEditing = false;
  description: any;

  constructor() { }

  ngOnInit(): void {
  }

  isAdm(): boolean {
    return true;
  }

  changeToEdit(): void {
    this.isEditing = !this.isEditing;
  }

}
