import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule, Router } from '@angular/router';

import { HTTP_INTERCEPTORS } from '@angular/common/http';


import { CookieInterceptor } from './cookie.interceptor';
import { AuthGuard } from "./auth.guard";

import { AppComponent } from './app.component';

import { PartHeaderDefaultComponent } from './template/part/header/default/component';
import { PartNavMainComponent }       from './template/part/nav/main/component';

import { PageMainLoginComponent } from './template/page/main/login/component';
import { PageMainHomeComponent }  from './template/page/main/home/component';
import { PageMainAboutComponent }  from './template/page/main/about/component';
import { PageMainErrorComponent } from './template/page/main/error/component';




@NgModule({
  declarations: [
    AppComponent,

    AppComponent,

    PartHeaderDefaultComponent,

    PartNavMainComponent,

    PageMainLoginComponent,
    PageMainHomeComponent,
    PageMainAboutComponent,
    PageMainErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,

    HttpClientModule,

    AppRoutingModule,

    NgbModule,

    RouterModule.forRoot([
      { path: '', component: PageMainHomeComponent, canActivate: [AuthGuard]  },
      { path: 'about', component: PageMainAboutComponent, canActivate: [AuthGuard]  },

      { path: 'login', component: PageMainLoginComponent},
      { path: '**', component: PageMainErrorComponent},
    ]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CookieInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
