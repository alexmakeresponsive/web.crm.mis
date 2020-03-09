import { NgModule }                             from '@angular/core';
import { CommonModule }                         from '@angular/common';

import {NgbModule}                              from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule}                       from "../../app-routing.module";

import {PageServiceMsaRemdJournalComponent}         from "./page/remdJournal/component";
import {PageServiceMsaTicketComponent}              from "./page/ticket/component";
import {PageServiceMsaTicketJournalComponent}       from "./page/ticketJournal/component";
import {PageServiceMsaTicketJournalItemComponent}   from "./page/ticketJournalItem/component";
import {PageServiceMsaTicketResultComponent}        from "./page/ticketResult/component";
import {PageServiceMsaTicketResultItemComponent}    from "./page/ticketResultItem/component";

import {PartNavMsaComponent}                        from "./part/nav/component";
import {PartHeaderMsaComponent}                     from "./part/header/component";
import {MsaModule} from "../../domain/msa/msa.module";

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

  exports: [
    PageServiceMsaRemdJournalComponent,
    PageServiceMsaTicketComponent,
    PageServiceMsaTicketJournalComponent,
    PageServiceMsaTicketJournalItemComponent,
    PageServiceMsaTicketResultComponent,
    PageServiceMsaTicketResultItemComponent,
  ],
  imports: [
    NgbModule,

    MsaModule,

    AppRoutingModule,
  ]
})
export class MsaRoutedModule { }
