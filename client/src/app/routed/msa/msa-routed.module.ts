import { NgModule }                             from '@angular/core';
import { CommonModule }                         from '@angular/common';

import {NgbModule}                              from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule}                       from "@AppModule/app-routing.module";

import {PageServiceMsaRemdJournalComponent}         from "./page/remdJournal/component";
import {PageServiceMsaTicketComponent}              from "./page/ticket/component";
import {PageServiceMsaTicketJournalComponent}       from "./page/ticketJournal/component";
import {PageServiceMsaTicketJournalItemComponent}   from "./page/ticketJournalItem/component";
import {PageServiceMsaTicketResultComponent}        from "./page/ticketResult/component";
import {PageServiceMsaTicketResultItemComponent}    from "./page/ticketResultItem/component";

import {PartNavMsaComponent}                        from "./part/nav/component";
import {PartHeaderMsaComponent}                     from "./part/header/component";
import {MsaModule}                                  from "@MsaDomainModule/msa.module";


@NgModule({
  declarations: [
    PageServiceMsaRemdJournalComponent,
    PageServiceMsaTicketComponent,
    PageServiceMsaTicketJournalComponent,
    PageServiceMsaTicketJournalItemComponent,
    PageServiceMsaTicketResultComponent,
    PageServiceMsaTicketResultItemComponent,

    PartNavMsaComponent,
    PartHeaderMsaComponent
  ],
  imports: [
    NgbModule,

    MsaModule,

    AppRoutingModule,
  ]
})
export class MsaRoutedModule { }
