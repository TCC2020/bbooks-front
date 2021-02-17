import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthGuard } from './auth-guard';
import { tap } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';
import { environment } from 'src/environments/environment';
import {AuthService} from '../services/auth.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private loader: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes(environment.api) || req.url.includes(environment.feedApi)) {
      if (!req.urlWithParams.includes('?async=true')) { this.loader.showLoader(); }
      const request = req.clone({
        setHeaders: {
          // 'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
           'Access-Control-Allow-Methods': 'GET, POST',
          Authorization: `Bearer ${this.auth.getToken()}`,
        },
      });
      return next.handle(request).pipe(
        tap((ev: HttpEvent<any>) => {
          if (ev instanceof HttpResponse) {
            if (!request.urlWithParams.includes('?async=true')) {
              if (!request.urlWithParams.includes('?async=true')) { this.loader.hideLoader(); }
            }
          }
        },
          (err: any) => {
            if (!request.urlWithParams.includes('?async=true')) {
              if (!request.urlWithParams.includes('?async=true')) { this.loader.hideLoader(); }
            }
          })
      );
    } else {
      const request = req.clone({});
      return next.handle(request).pipe(
        tap((ev: HttpEvent<any>) => {
          if (ev instanceof HttpResponse) {
            if (!request.urlWithParams.includes('?async=true')) {
              if (!request.urlWithParams.includes('?async=true')) { this.loader.hideLoader(); }
            }
          }
        },
          (err: any) => {
            if (!request.urlWithParams.includes('?async=true')) {
              if (!request.urlWithParams.includes('?async=true')) { this.loader.hideLoader(); }
            }
          })
      );
    }

  }

}
