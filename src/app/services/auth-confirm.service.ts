import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthConfirmService {

  api = environment.api + 'auth/';
  
  constructor(private http: HttpClient) { }

  confirm(loginTO) { 
    return this.http.post(this.api + 'confirm/', loginTO); 
  }

}
