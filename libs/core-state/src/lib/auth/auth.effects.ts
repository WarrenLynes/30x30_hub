import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '@hub/core-data';
import { AppState } from '../index';
import {
  accessGrantedAction,
  authenticate,
  authenticateFailure,
  authenticateSuccess,
  logout,
  logoutFailure,
  logoutSuccess
} from './auth.actions';
import { IUser } from './auth.reducer';
import { SnackbarService } from '@hub/core-data';
import {AppFacade} from '../app/app.facade';


@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private service: AuthService,
    private store: Store<AppState>,
    private router: Router,
    private snackbarService: SnackbarService,
    private route: ActivatedRoute,
    private appFacade: AppFacade
  ) {}

  accessGranted$ = createEffect(
    () => this.actions$.pipe(
      ofType(accessGrantedAction),
      switchMap(({type, code}) => {
        console.log(type, code);
        return this.service.accessGranted(code).pipe(
          map(({access_token}: any) => {
            return authenticate({access_token});
          }),
          catchError((err) => of(authenticateFailure({error: err})))
        )
      })
    )
  );


  authenticate$ = createEffect(
    () => this.actions$.pipe(
      ofType(authenticate),
      switchMap(({type, access_token}) => {
        console.log(access_token);
        localStorage.setItem('ACCESS_TOKEN', access_token);
        return this.service.authenticate({access_token}).pipe(
          map((user) => authenticateSuccess({user})),
          catchError(error => of(authenticateFailure({error})))
        )
      })
    )
  );

  logout$ = createEffect(
    () => this.actions$.pipe(
      ofType(logout),
      tap((type) => {
        this.appFacade.addLoad('[LOGOUT]');
        this.snackbarService.openSnackBar('adios!', 500)
      }),
      switchMap(() => {
        return this.service.logout().pipe(
          map((user: IUser) => logoutSuccess()),
          tap(() => this.snackbarService.openSnackBar('Logout Success')),
          catchError(error => of(logoutFailure()))
        )
      })
    )
  );

  logoutSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(logoutSuccess),
      tap(() => {
        this.appFacade.removeLoad('[LOGOUT]');
        this.router.navigateByUrl('/');
      })
    ), {dispatch: false});

  authenticateSuccess$ = createEffect(
    () => this.actions$.pipe(
      ofType(authenticateSuccess),
      tap(({user}) => {
        if(this.route.snapshot.queryParams['returnUrl']) {
          this.router.navigateByUrl(this.route.snapshot.queryParams['returnUrl'])
        } else {
          this.router.navigateByUrl('');
          this.snackbarService.openSnackBar(`Hello ${user.login}!`);
        }
      })
    )
    , {dispatch: false});
}
