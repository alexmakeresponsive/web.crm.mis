import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import tableHeaderData from './config/header';
import {AuthService} from "@AppModule/common/service/auth/auth.service";
import {StorageData} from "@AppModule/common/service/storage/storage.data";
import MsaResponse from "@AppModule/msa/domain/model/ticket/Response";
import MsaResponseRemove from "@AppModule/msa/domain/model/ticket/ResponseRemove";
import {MsaTicketService} from "@MsaModule/service/http/msa-ticket.service";

@Component({
  selector: 'page-action-msa-journal',
  templateUrl: './component.html',
})
export class PageServiceMsaTicketJournalComponent implements OnDestroy {
  tableHeader = tableHeaderData;
  tableBody = [];
  dataIsFetched:boolean = false;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private msaTicketService: MsaTicketService,
    private storageData: StorageData
  ) {
    this.putData();
  }

  ngOnDestroy() {

  }

  async putData() {
    await this.loadData();

    this.tableBody = Object.values(this.storageData.ticketJournal);
  }

  async loadData() {
    await this.msaTicketService.getJournalStream().toPromise()
      .then(
        res => {
          this.storageData.ticketJournal = res.data;
          this.dataIsFetched = true;
        },
        rej => {

        }
      );
  }

  removeItem(id) {
    this.msaTicketService.getJournalRemoveItemStream(id).toPromise()
      .then(
        res => {
          const id       = res.id_item;
          const storage  = this.storageData.ticketJournal;

          delete storage[id];

          this.tableBody = Object.values(storage);

        },
        rej => {

        }
      );
  }
}
