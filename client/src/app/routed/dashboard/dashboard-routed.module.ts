import { NgModule }                             from '@angular/core';
import { CommonModule }                         from '@angular/common';

import {NgbModule}                              from '@ng-bootstrap/ng-bootstrap';

import {DashboardModule}                        from "../../domain/dashboard/dashboard.module";

import {AppRoutingModule}                       from "../../app-routing.module";

import {PageDashboardAboutComponent}            from "./page/about/component";
import {PageDashboardErrorComponent}            from "./page/error/component";
import {PageDashboardHomeComponent}             from "./page/home/component";
import {PageDashboardLoginComponent}            from "./page/login/component";

import {PartHeaderComponent}                    from "./part/header/component";
import {PartNavHomeComponent}                   from "./part/nav/home/component";
import {PartNavMainComponent}                   from "./part/nav/main/component";


@NgModule({
  declarations: [
    PageDashboardAboutComponent,
    PageDashboardErrorComponent,
    PageDashboardHomeComponent,
    PageDashboardLoginComponent,

    PartHeaderComponent,
    PartNavHomeComponent,
    PartNavMainComponent
  ],
  imports: [
    NgbModule,

    DashboardModule,

    AppRoutingModule,
  ]
})
export class DashboardRoutedModule { }
