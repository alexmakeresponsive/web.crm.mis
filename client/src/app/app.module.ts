import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule, Router } from '@angular/router';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {EntryModule}  from "./widget/entry/entry.module";


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
import { PageServiceMsaTicketJournalItemComponent } from './template/page/service/msa/ticketJournalItem/component';


import {Form088yComponent} from "./component/form/088/y/component";
import {DefaultModule} from "./widget/default/default.module";




@NgModule({
  declarations: [
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
    PageServiceMsaTicketJournalItemComponent,

    Form088yComponent,
  ],

  imports: [
    BrowserModule,

    FormsModule,
    ReactiveFormsModule,

    HttpClientModule,

    AppRoutingModule,

    NgbModule,

    EntryModule,
    DefaultModule,

    RouterModule.forRoot([
      { path: '', component: PageMainHomeComponent, canActivate: [AuthGuard]  },
      { path: 'about', component: PageMainAboutComponent, canActivate: [AuthGuard]  },

      { path: 'login', component: PageMainLoginComponent},

      { path: 'service/msa/ticket', component: PageServiceMsaTicketComponent, canActivate: [AuthGuard] },
      { path: 'service/msa/journal', component: PageServiceMsaTicketJournalComponent, canActivate: [AuthGuard] },
      { path: 'service/msa/journal/item/:id', component: PageServiceMsaTicketJournalItemComponent, canActivate: [AuthGuard] },
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
