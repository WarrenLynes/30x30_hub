import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { exhaustMap, map, switchMap } from 'rxjs/operators';
import {of, Observable} from 'rxjs';

const API_URL = 'api';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of([req.url, localStorage.getItem('ACCESS_TOKEN')]).pipe(
      switchMap(([url, access_token]) => {
        if(url.indexOf(API_URL) > -1) {
          if(access_token) {
            return next.handle(
              req.clone({headers: req.headers.append('Authorization', 'token ' + access_token)})
            )
          } else {
            return next.handle(req.clone());
          }
        } else {
          return next.handle(req.clone());
        }
      })
    );
  }
}
