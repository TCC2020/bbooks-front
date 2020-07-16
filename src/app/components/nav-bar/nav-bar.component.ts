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
  isLogged: boolean;
  constructor(
    public auth: AuthGuard,
    private router: Router) { }

  ngOnInit(): void {
    this.isLogged = this.auth.isLogged();
  }

  logout() {
    this.auth.logout();
    document.location.reload();
    this.router.navigateByUrl('/');
  }

}
