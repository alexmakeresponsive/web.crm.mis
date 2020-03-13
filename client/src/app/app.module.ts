import { BrowserModule }                        from '@angular/platform-browser';

import { NgModule }                             from '@angular/core';

import { AppRoutingModule }                     from './app-routing.module';

import {HttpServiceModule}                      from "./common/service/http/http-service.module";

import {MsaModule}                              from "./msa/domain/msa.module";
import {MsaRoutedModule}                        from "./msa/routed/msa-routed.module";

import {DashboardDomainModule}                  from "./dashboard/domain/dashboard-domain.module";
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

    DashboardDomainModule,
    DashboardRoutedModule,

    HttpServiceModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
