import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import {AuthGuard}                                        from "./service/security/auth.guard";

import {PageDashboardHomeComponent}                       from "./routed/dashboard/page/home/component";
import {PageDashboardAboutComponent}                      from "./routed/dashboard/page/about/component";
import {PageDashboardLoginComponent}                      from "./routed/dashboard/page/login/component";
import {PageDashboardErrorComponent}                      from "./routed/dashboard/page/error/component";

import {PageServiceMsaTicketComponent}                    from "./routed/msa/page/ticket/component";
import {PageServiceMsaTicketJournalComponent}             from "./routed/msa/page/ticketJournal/component";
import {PageServiceMsaTicketJournalItemComponent}         from "./routed/msa/page/ticketJournalItem/component";
import {PageServiceMsaTicketResultComponent}              from "./routed/msa/page/ticketResult/component";
import {PageServiceMsaTicketResultItemComponent}          from "./routed/msa/page/ticketResultItem/component";
import {PageServiceMsaRemdJournalComponent}               from "./routed/msa/page/remdJournal/component";



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
