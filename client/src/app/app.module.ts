import { BrowserModule }                        from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }     from '@angular/forms';
import { HttpClientModule }                     from '@angular/common/http';
import { NgModule }                             from '@angular/core';

import {NgbModule}                              from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule }                     from './app-routing.module';

import { HTTP_INTERCEPTORS }                    from '@angular/common/http';

import {EntryModule}                            from "./widget/entry/entry.module";
import {DefaultModule}                          from "./widget/default/default.module";

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

    FormsModule,
    ReactiveFormsModule,

    HttpClientModule,

    AppRoutingModule,

    NgbModule,

    EntryModule,
    DefaultModule,

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
