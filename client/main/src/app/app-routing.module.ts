import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import {AuthGuard}                                        from "./common/service/auth/auth.guard";

import {PageDashboardHomeComponent}                       from "./dashboard/routed/page/home/component";
import {PageDashboardAboutComponent}                      from "./dashboard/routed/page/about/component";
import {PageDashboardLoginComponent}                      from "./dashboard/routed/page/login/component";
import {PageDashboardErrorComponent}                      from "./dashboard/routed/page/error/component";

import {PageServiceMsaTicketComponent}                    from "./msa/routed/page/ticket/component";
import {PageServiceMsaTicketJournalComponent}             from "./msa/routed/page/ticketJournal/component";
import {PageServiceMsaTicketJournalItemComponent}         from "./msa/routed/page/ticketJournalItem/component";
import {PageServiceMsaTicketResultComponent}              from "./msa/routed/page/ticketResult/component";
import {PageServiceMsaTicketResultItemComponent}          from "./msa/routed/page/ticketResultItem/component";
import {PageServiceMsaRemdJournalComponent}               from "./msa/routed/page/remdJournal/component";



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
