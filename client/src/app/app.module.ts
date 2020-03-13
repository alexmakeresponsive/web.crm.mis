import { BrowserModule }                        from '@angular/platform-browser';

import { NgModule }                             from '@angular/core';

import { AppRoutingModule }                     from './app-routing.module';

import {HttpServiceModule}                      from "./common/service/http/http-service.module";

import {MsaModule}                              from "./msa/domain/msa.module";
import {MsaRoutedModule}                        from "./msa/routed/msa-routed.module";

import {DashboardModule}                        from "./dashboard/domain/dashboard.module";
import {DashboardRoutedModule}                  from "./dashboard/routed/dashboard-routed.module";

import { AppComponent }                         from './app.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,

    AppRoutingModule,

    MsaModule,
    MsaRoutedModule,

    DashboardModule,
    DashboardRoutedModule,

    HttpServiceModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
