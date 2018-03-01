import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutes } from './app.routes';
import { AppComponent } from './app.component';


import {AuthConfig, AuthHttp} from 'angular2-jwt';
import {Http, HttpModule} from '@angular/http';

import { AuthenticationService} from './services/auth.service';
import {UserService} from './services/user.service';
import {TOKEN_NAME} from './services/auth.const';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';

import {AuthGuard} from './guards/auth-guard';
import {AdminGuard} from './guards/admin-guard';
import {CheckResponseStatusService} from './services/check-resp-status.service';
import {FlowChartComponent} from './flowchart/flowchart.component';

export function authHttpServiceFactory(http: Http) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: 'Bearer',
    tokenName: TOKEN_NAME,
    globalHeaders: [{'Content-Type': 'application/json'}],
    noJwtError: false,
    noTokenScheme: true,
    tokenGetter: (() => localStorage.getItem(TOKEN_NAME))
  }), http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FlowChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutes
  ],
  providers: [
    {provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [Http]},
    AuthenticationService,
    UserService,
    AuthGuard,
    AdminGuard,
    CheckResponseStatusService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
