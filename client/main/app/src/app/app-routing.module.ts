import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import {AuthGuard}                                        from "@CommonServiceAuthModule/auth.guard";

import {PageDashboardHomeComponent}                       from "@DashboardModule/routed/page/home/component";
import {PageDashboardAboutComponent}                      from "@DashboardModule/routed/page/about/component";
import {PageDashboardLoginComponent}                      from "@DashboardModule/routed/page/login/component";
import {PageDashboardErrorComponent}                      from "@DashboardModule/routed/page/error/component";

import {PageServiceMsaTicketComponent}                    from "@MsaModule/routed/page/ticket/component";
import {PageServiceMsaTicketJournalComponent}             from "@MsaModule/routed/page/ticketJournal/component";
import {PageServiceMsaTicketJournalItemComponent}         from "@MsaModule/routed/page/ticketJournalItem/component";
import {PageServiceMsaTicketResultComponent}              from "@MsaModule/routed/page/ticketResult/component";
import {PageServiceMsaTicketResultItemComponent}          from "@MsaModule/routed/page/ticketResultItem/component";
import {PageServiceMsaRemdJournalComponent}               from "@MsaModule/routed/page/remdJournal/component";



const routes: Routes = [
  { path: '',                                         component: PageDashboardHomeComponent, canActivate: [AuthGuard]  },
  { path: 'about',                                    component: PageDashboardAboutComponent, canActivate: [AuthGuard]  },

  { path: 'login',                                    component: PageDashboardLoginComponent},

  { path: 'service/msa/ticket',                       component: PageServiceMsaTicketComponent, canActivate: [AuthGuard] },
  { path: 'service/msa/journal',                      component: PageServiceMsaTicketJournalComponent, canActivate: [AuthGuard] },
  { path: 'service/msa/journal/item/:id',             component: PageServiceMsaTicketJournalItemComponent, canActivate: [AuthGuard] },
  { path: 'service/msa/result',                       component: PageServiceMsaTicketResultComponent, canActivate: [AuthGuard] },
  { path: 'service/msa/result/item/:id',              component: PageServiceMsaTicketResultItemComponent, canActivate: [AuthGuard] },
  { path: 'service/msa/remd',                         component: PageServiceMsaRemdJournalComponent, canActivate: [AuthGuard] },

  { path: '**',                                       component: PageDashboardErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
