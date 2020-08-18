import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from "@CommonServiceAuthModule/auth.service";
import { StorageData } from "@CommonServiceStorageModule/storage.data";
import MsaResponse from "@MsaModule/domain/model/ticket/Response";

import tableHeaderData from './config/header';
import MsaResponseRemove from "@MsaModule/domain/model/ticket/ResponseRemove";

import {MsaTicketService} from "@MsaModule/service/http/msa-ticket.service";

@Component({
  selector: 'page-action-msa-result',
  templateUrl: './component.html',
  styleUrls: ['./component.styl']
})
export class PageServiceMsaTicketResultComponent {
  tableHeader = tableHeaderData;
  tableBody   = [];
  dataIsFetched:boolean = false;

  constructor(
    private authService: AuthService,
    private msaTicketService: MsaTicketService,
    private http: HttpClient,
    private storageData: StorageData
  ) {
    this.putData();
  }

  async putData() {
    await this.loadData();

    this.tableBody = Object.values(this.storageData.ticketResult);
  }

  async loadData() {
    await this.msaTicketService.getResultStream().toPromise()
      .then(
        res => {
          this.storageData.ticketResult = res.data;
          this.dataIsFetched = true;
        },
        rej => {

        }
      );
  }

  removeItem(id) {
    this.msaTicketService.getResultRemoveItemStream(id).toPromise()
      .then(
        res => {
          const id       = res.id_item;
          const storage  = this.storageData.ticketResult;

          delete storage[id];

          this.tableBody = Object.values(storage);

        },
        rej => {

        }
      );
  }
}
