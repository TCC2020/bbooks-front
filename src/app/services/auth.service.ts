import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api = environment.api + 'auth/';
  
  constructor(private http: HttpClient) { }

  login(loginTO) { 
    return this.http.post(this.api + 'login', loginTO); 
  }

}
