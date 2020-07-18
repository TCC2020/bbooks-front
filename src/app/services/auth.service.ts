import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api = environment.api + 'auth/';

  constructor(
      private http: HttpClient,
      private authServiceSocial: SocialAuthService
  ) { }

  login(loginTO) {
    return this.http.post(this.api + 'login', loginTO);
  }

  sendResetPassEmail(dto) {
    return this.http.post(this.api + 'reset-pass', dto)
  }
  signInWithGoogle(): void {
    this.authServiceSocial.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authServiceSocial.signOut();
  }
}
