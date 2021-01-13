import { UserBookTO } from './../../models/userBookTO';
import { ReadingTargetTO } from './../../models/readingTargetTO.model';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ReadingTargetService } from 'src/app/services/reading-target.service';
import { Book } from 'src/app/models/book.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-previous-goals',
  templateUrl: './previous-goals.component.html',
  styleUrls: ['./previous-goals.component.scss']
})
export class PreviousGoalsComponent implements OnInit {

  panelOpenState = false;
  searchPreviousGoals: any;
  previousGoals: ReadingTargetTO[];

  constructor(
    private readingTargetService: ReadingTargetService,
    public authService: AuthService
  ) {
   }

  ngOnInit(): void {
    this.getPreviousGoals();
  }

  getPreviousGoals() {
    this.readingTargetService.getAllByProfileId(this.authService.getUser().profile.id).subscribe(
      (res) => {
        console.log(res);
        this.previousGoals = res;
      },
      error => {
          console.log('PreviousGoals Error', error);
      }
    );
  }
}
