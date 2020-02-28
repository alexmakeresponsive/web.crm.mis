import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from "../../../../../auth.service";
import { StorageData } from "../../../../../storage.data";
import MsaResponse from "../../../../../model/msa/Response";

import tableHeaderData from './part/tableHeader';
import MsaResponseRemove from "../../../../../model/msa/ResponseRemove";

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
    // console.log('loadData...');

    const keychain = this.authService.getKeyChain();

    const token    = keychain.tokenAccessList !== null ? keychain.tokenAccessList.msa : '';

    let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + token);



    await this.http.post<MsaResponse>(
      'http://0.0.0.0:8203/ticket/result',
      {},
      {
        headers: headers
      }
    ).toPromise()
      .then(
        res => {
          this.storageData.ticketResult = res.data;
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
      'http://0.0.0.0:8203/ticket/result/remove',
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
          const storage  = this.storageData.ticketResult;

          delete storage[id];

          this.tableBody = Object.values(storage);

        },
        rej => {
          console.log("rej: ", rej);
        }
      );
  }
}
