import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule, Router } from '@angular/router';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {SelectModule} from 'ng2-select';


import { CookieInterceptor } from './cookie.interceptor';
import { AuthGuard } from "./auth.guard";

import { AppComponent } from './app.component';

import { PartHeaderDefaultComponent } from './template/part/header/default/component';
import { PartHeaderMsaComponent } from './template/part/header/msa/component';

import { PartNavMainComponent }       from './template/part/nav/main/component';
import { PartNavHomeComponent }       from './template/part/nav/home/component';

import { PartNavMsaComponent }       from './template/part/nav/service/msa/component';

import { PageMainLoginComponent } from './template/page/main/login/component';
import { PageMainHomeComponent }  from './template/page/main/home/component';
import { PageMainAboutComponent }  from './template/page/main/about/component';
import { PageMainErrorComponent } from './template/page/main/error/component';

import { PageServiceMsaRemdJournalComponent } from './template/page/service/msa/remdJournal/component';
import { PageServiceMsaTicketComponent } from './template/page/service/msa/ticket/component';
import { PageServiceMsaTicketJournalComponent } from './template/page/service/msa/ticketJournal/component';
import { PageServiceMsaTicketResultComponent } from './template/page/service/msa/ticketResult/component';
import { PageServiceMsaTicketResultItemComponent } from './template/page/service/msa/ticketResultItem/component';

import {TableTb1Component} from "./component/table/tb.1/component";

import { EntryWrapper }   from "./entry/wrapper";
import { EntryWrapper2 }   from "./entry/wrapper2";
import { EntryDirective } from "./entry/directive";

import {SelectS1Component}    from './entry/select/s.1/component';
import {InputI1Component}     from "./entry/input/i.1/component";
import {InputI2Component}     from "./entry/input/i.2/component";
import {TextareaT1Component}  from "./entry/textarea/t.1/component";
import {TableRowTbR1EntryComponent} from "./entry/table/tr.1/component";


@NgModule({
  declarations: [
    AppComponent,

    AppComponent,

    PartHeaderDefaultComponent,
    PartHeaderMsaComponent,

    PartNavMainComponent,
    PartNavHomeComponent,

    PartNavMsaComponent,

    PageMainLoginComponent,
    PageMainHomeComponent,
    PageMainAboutComponent,
    PageMainErrorComponent,

    PageServiceMsaRemdJournalComponent,
    PageServiceMsaTicketComponent,
    PageServiceMsaTicketJournalComponent,
    PageServiceMsaTicketResultComponent,
    PageServiceMsaTicketResultItemComponent,

    TableTb1Component,

    SelectS1Component,
    InputI1Component, InputI2Component,
    TextareaT1Component,
    TableRowTbR1EntryComponent,

    EntryWrapper,
    EntryWrapper2,
    EntryDirective
  ],

  entryComponents: [
    SelectS1Component,
    InputI1Component, InputI2Component,
    TextareaT1Component,
    TableRowTbR1EntryComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,

    HttpClientModule,

    AppRoutingModule,

    NgbModule,
    SelectModule,

    RouterModule.forRoot([
      { path: '', component: PageMainHomeComponent, canActivate: [AuthGuard]  },
      { path: 'about', component: PageMainAboutComponent, canActivate: [AuthGuard]  },

      // { path: 'service/msa/ticket', component: PageServiceMsaTicketComponent, canActivate: [AuthGuard /*,AuthorizationGuard*/]  },

      { path: 'login', component: PageMainLoginComponent},

      { path: 'service/msa/ticket', component: PageServiceMsaTicketComponent, canActivate: [AuthGuard] },
      { path: 'service/msa/journal', component: PageServiceMsaTicketJournalComponent, canActivate: [AuthGuard] },
      { path: 'service/msa/result', component: PageServiceMsaTicketResultComponent, canActivate: [AuthGuard] },
      { path: 'service/msa/result/item/:id', component: PageServiceMsaTicketResultItemComponent, canActivate: [AuthGuard] },
      { path: 'service/msa/remd', component: PageServiceMsaRemdJournalComponent, canActivate: [AuthGuard] },

      { path: '**', component: PageMainErrorComponent},
    ]),
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
