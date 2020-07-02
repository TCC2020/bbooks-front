import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/modals/login/login.component';
import { AuthGuard } from 'src/app/guards/auth-guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    public auth: AuthGuard,
    private router: Router) { }

  ngOnInit(): void {
  }

  openLoginDialog() {
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }

  isAuth(): boolean {
    return false ;
  }
}
