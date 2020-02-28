import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { CoreStateModule } from '@hub/core-state';
import { CoreDataModule } from '@hub/core-data';
import { UiModule } from '@hub/ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptor } from './auth.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { MainComponent } from './main/main.component';
import { MaterialModule } from '@hub/material';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticateComponent,
    MainComponent
  ],
  imports: [
    CoreStateModule,
    CoreDataModule,
    MaterialModule,
    UiModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
