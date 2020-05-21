import { Component, OnInit } from '@angular/core';
import { AuthGuard } from 'src/app/guards/auth-guard';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  public user;
  constructor(public auth: AuthGuard, private userService: UserService) { }

  ngOnInit(): void {
    if (this.auth.getToken() != null){
      this.userService.updateUserInfo();
      this.user = this.auth.getUser();
    }
  }

}
