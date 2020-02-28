import { Injectable, OnDestroy } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthFacade } from '@hub/core-state';
import { first, map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, OnDestroy {

  destroy$: Subject<boolean> = new Subject();

  constructor(private router: Router, private facade: AuthFacade) { }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean>|boolean {
    if (route.queryParamMap.has('code')) {
      this.facade.accessGranted({code: route.queryParamMap.get('code')})
    }

    return this.facade.authenticated$.pipe(
      takeUntil(this.destroy$), first(),
      map(x => {
        if(x) {
          return true;
        } else {
          this.router.navigate(['/home']);
          return false;
        }
      })
    );
  }
}
