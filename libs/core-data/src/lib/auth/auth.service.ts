import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authenticated = new BehaviorSubject(false);

  get authenticated() {
    return this._authenticated.asObservable();
  }

  constructor( private http: HttpClient ) {
    if(localStorage.getItem('TOKEN'))
      this._authenticated.next(true);
  }

  getToken() {
    return localStorage.getItem('TOKEN');
  }

  isAuthenticated() {
    return localStorage.getItem('TOKEN');
  }

  accessGranted(code) {
    console.log(code);
    return this.http.post(`/auth-api/login/oauth/access_token?client_id=d2ba109f7b69458bc71e&client_secret=140194ef9916efd1a68bb0d3c524afb4eed54229&code=${code}`,
      {}, { headers: new HttpHeaders({ 'Accept': 'application/json' })
      });
  }

  authenticate({access_token}) {
   return this.http.get('api/user');
  }

  logout(): Observable<any> {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('REFRESH_TOKEN');
    this._authenticated.next(false);
    return of('ok');
  }
}
