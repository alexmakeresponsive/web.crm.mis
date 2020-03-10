import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import tableHeaderData from './config/header';
import {AuthService} from "@SecurityServiceModule/auth.service";
import {StorageData} from "@StorageServiceModule/storage.data";
import MsaResponse from "@MsaDomainModule/model/ticket/Response";
import MsaResponseRemove from "@MsaDomainModule/model/ticket/ResponseRemove";

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
    private storageData: StorageData
  ) {
    this.putData();
  }

  ngOnDestroy() {
    // console.log('destroy PageServiceMsaTicketJournalComponent')
  }

  async putData() {
    await this.loadData();

    this.tableBody = Object.values(this.storageData.ticketJournal);
  }

  async loadData() {
    // console.log('loadData...');

    const keychain = this.authService.getKeyChain();

    const token    = keychain.tokenAccessList !== null ? keychain.tokenAccessList.msa : '';

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + token);



    await this.http.post<MsaResponse>(
      'http://0.0.0.0:8204/ticket/journal',
      {},
      {
        headers: headers
      }
    ).toPromise()
      .then(
        res => {
          this.storageData.ticketJournal = res.data;
          this.dataIsFetched = true;
        },
        rej => {
          console.log("rej: ", rej);
        }
      );
  }

  removeItem(id) {
    const keychain = this.authService.getKeyChain();

    const token    = keychain.tokenAccessList !== null ? keychain.tokenAccessList.msa : '';

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + token);


    this.http.post<MsaResponseRemove>(
      'http://0.0.0.0:8204/ticket/journal/remove',
      {
        id_item: id
      },
      {
        headers: headers
      }
    ).toPromise()
      .then(
        res => {
          console.log("res: ", res);

          const id       = res.id_item;
          const storage  = this.storageData.ticketJournal;

          delete storage[id];

          this.tableBody = Object.values(storage);

        },
        rej => {
          console.log("rej: ", rej);
        }
      );
  }
}
