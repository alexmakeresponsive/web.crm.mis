import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {StorageData} from "@CommonServiceStorageModule/storage.data";
import {AuthService} from "@CommonServiceAuthModule/auth.service";
import {EventService} from "@CommonServiceEventModule/event.service";
import MsaResponse from "@MsaModule/widget/model/ticket/Response";

import {MsaTicketService} from "@MsaModule/service/http/msa-ticket.service";

@Component({
  selector: 'page-service-msa-journal-item',
  templateUrl: './component.html',
  styleUrls: ['./component.styl']
})
export class PageServiceMsaTicketJournalItemComponent {
  data: any;
  dataHead:any = {};
  dataIsFetched: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private eventService: EventService,
    private msaTicketService: MsaTicketService,
    private http: HttpClient,
    private storageData: StorageData
  )
  {

  }

  ngOnInit() {
    this.eventService.skipClicked.subscribe( value => {
      if(value) {
        this.refreshData();
      }
    });

    this.putData();
  }

  async putData() {
    // if browser refresh page
    if (this.storageData.ticketJournal.length === 0) {
      await this.loadData();
    }

    this.route.paramMap.subscribe(params => {

      this.data = this.storageData.ticketJournal[+params.get('id')];

      for (let key of Object.keys(this.data)) {
        if (key.match(/f_6_/i)) {
          this.dataHead[key] = this.data[key];
        }
      }

      this.dataIsFetched = true;
    });
  }

  async refreshData() {
    await this.loadData();

    this.route.paramMap.subscribe(params => {

      const data = this.storageData.ticketJournal[+params.get('id')];

      for (let key of Object.keys(data)) {
        if (key.match(/f_6_name_/i)) {
          this.dataHead[key] = data[key];
        }
      }

      this.dataIsFetched = true;
    });
  }

  async loadData() {
    await this.msaTicketService.getJournalStream().toPromise()
      .then(
        res => {
          this.storageData.ticketJournal = res.data;
        },
        rej => {

        }
      );
  }
}
