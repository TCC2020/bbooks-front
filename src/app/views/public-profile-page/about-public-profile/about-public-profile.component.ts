import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-public-profile',
  templateUrl: './about-public-profile.component.html',
  styleUrls: ['./about-public-profile.component.scss']
})
export class AboutPublicProfileComponent implements OnInit {

  isEditing = false;

  constructor() { }

  ngOnInit(): void {
  }


  isAdm(): boolean {
    return true;
  }

  changeToEdit(): void {
    this.isEditing = !this.isEditing;
  }

  update() {
    this.changeToEdit();
  }

}
