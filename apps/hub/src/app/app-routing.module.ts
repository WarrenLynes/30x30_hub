import { NgModule } from '@angular/core';
import { DetailComponent, UiModule } from '@hub/ui';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { NotFoundComponent } from '@hub/ui';
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [
    UiModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent},
      { path: 'login', component: AuthenticateComponent },
      { path: 'access-granted', component: AuthenticateComponent },
      { path: '404', component: NotFoundComponent },
      { path: '', canActivate: [AuthGuard], children: [
          { path: '', component: MainComponent},
          { path: ':id', component: DetailComponent }
      ]},
      { path: '**', redirectTo: '404', pathMatch: 'full' },
    ], { initialNavigation: 'enabled' })
  ]
})
export class AppRoutingModule {}
