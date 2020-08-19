import { BrowserModule }                        from '@angular/platform-browser';

import { NgModule }                             from '@angular/core';

import { AppRoutingModule }                     from './app-routing.module';

import {HttpServiceModule}                      from "@CommonServiceHttpModule/http-service.module";

import {MsaModule}                              from "@MsaModule/widget/msa.module";
import {MsaRoutedModule}                        from "@MsaModule/routed/msa-routed.module";

import {DashboardDomainModule}                  from "@DashboardModule/widget/dashboard-domain.module";
import {DashboardRoutedModule}                  from "@DashboardModule/routed/dashboard-routed.module";

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
