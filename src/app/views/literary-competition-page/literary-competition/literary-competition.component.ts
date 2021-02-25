import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-literary-competition',
  templateUrl: './literary-competition.component.html',
  styleUrls: ['./literary-competition.component.scss']
})
export class LiteraryCompetitionComponent implements OnInit {

  isEditing = false;
  dateStart = new FormControl(new Date('2021-02-14'));
  dateEnd = new FormControl(new Date('2021-02-24'));
  dateEndCompetition = new FormControl(new Date('2021-03-31'));

  constructor() { }

  ngOnInit(): void {
  }


  isUserAdministrator(): boolean {
    return true;
  }

  edit(): void {
    this.isEditing = !this.isEditing;
  }
}
