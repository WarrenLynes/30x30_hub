import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AppFacade, AuthFacade} from '@hub/core-state';
import { Observable, Subject } from 'rxjs';
import { filter, first, map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '@hub/core-data';

@Component({
  selector: 'hub-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  authenticated$: Observable<boolean> = this.authFacade.authenticated$;
  destroy$: Subject<boolean> = new Subject();
  loading: boolean;

  private CODE: any;
  private ACCESS_CODE: any;

  links = [
    // {path: '', title: '', icon: ''},
  ];

  constructor(
    private authFacade: AuthFacade,
    private appFacade: AppFacade,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.appFacade.initialize();

    this.appFacade.loading$.pipe(takeUntil(this.destroy$)).subscribe((x) => {
      if (x !== this.loading) {
        this.loading = x;
        this.cdRef.detectChanges()
      }
    });

    this.route.queryParamMap.pipe(
      takeUntil(this.destroy$),
      filter((x) => x.has('code')),
      first(),
    ).subscribe((x) => {
      // this.fetchAccessToken(x.get('code'));
      this.authFacade.accessGranted({code: x.get('code')});
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  onLogout() {
    this.authFacade.logout();
  }

  async fetchAccessToken(code) {
    const url = '/auth-api/login/oauth/access_token?client_id=d2ba109f7b69458bc71e&client_secret=140194ef9916efd1a68bb0d3c524afb4eed54229&code=' + code;
    await this.http.post(url, null, {
      headers: new HttpHeaders({'Accept': 'application/json'})
    }).subscribe();
  }

  onAuthenticate() {
    const url = `https://github.com/login/oauth/authorize?client_id=${environment.GITHUB_CLIENT_ID}&scope=repo,user`;
    window.location.replace(url);
  }

}
