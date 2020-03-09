import { BrowserModule }                        from '@angular/platform-browser';

import { HttpClientModule }                     from '@angular/common/http';
import { NgModule }                             from '@angular/core';

import { AppRoutingModule }                     from './app-routing.module';

import { HTTP_INTERCEPTORS }                    from '@angular/common/http';

import {MsaModule}                              from "./domain/msa/msa.module";
import {MsaRoutedModule}                        from "./routed/msa/msa-routed.module";

import {DashboardModule}                        from "./domain/dashboard/dashboard.module";
import {DashboardRoutedModule}                  from "./routed/dashboard/dashboard-routed.module";

import { CookieInterceptor }                    from './cookie.interceptor';

import { AppComponent }                         from './app.component';


@NgModule({
  declarations: [
    AppComponent,
  ],

  imports: [
    BrowserModule,

    HttpClientModule,

    AppRoutingModule,

    MsaModule,
    MsaRoutedModule,

    DashboardModule,
    DashboardRoutedModule,
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
