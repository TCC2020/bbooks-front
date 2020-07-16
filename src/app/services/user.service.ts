import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthGuard } from '../guards/auth-guard';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  api: string = environment.api + 'users/';

  constructor(private http: HttpClient, private auth: AuthGuard) { }

  updateUserInfo(){
    this.http.get(this.api + 'info/').subscribe(response => {
      this.auth.setUser(response);
    })
  }
}
