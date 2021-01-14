import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {UserTO} from '../../../models/userTO.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  user: UserTO;

  constructor(
      private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

}
